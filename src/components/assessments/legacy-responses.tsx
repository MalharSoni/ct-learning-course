'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Archive, Trash2 } from 'lucide-react';

const GREEN = '#279B67';
const MUTED = '#71717A';

interface OtherRow {
  id: number;
  name: string;
  assessment_id: string;
  auto_score: number;
  auto_max: number;
  created_at: string;
}

/**
 * Responses left over from a test that no longer exists in the app, with a way
 * to clear them. Renders nothing when there are none, which is the normal case
 * once the old rows have been cleaned up.
 */
export function LegacyResponses({ passcode }: { passcode: string }) {
  const [rows, setRows] = useState<OtherRow[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (passcode) params.set('key', passcode);
      const res = await fetch(`/api/assessments/results/other?${params.toString()}`);
      if (!res.ok) return;
      const data = await res.json();
      setRows(data.submissions as OtherRow[]);
    } catch {
      // Silent: this block is a cleanup aid, not core to reading results.
    }
  }, [passcode]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = (id: number) => {
    setConfirming(false);
    setError(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setConfirming(false);
    setError(null);
    setSelected((prev) =>
      prev.size === rows.length ? new Set() : new Set(rows.map((r) => r.id))
    );
  };

  const deleteSelected = async () => {
    setBusy(true);
    setError(null);
    try {
      // Ids can span more than one retired test, and the delete endpoint is
      // scoped to a single assessment, so send one request per group.
      const groups = new Map<string, number[]>();
      for (const r of rows) {
        if (!selected.has(r.id)) continue;
        groups.set(r.assessment_id, [...(groups.get(r.assessment_id) ?? []), r.id]);
      }
      const params = new URLSearchParams();
      if (passcode) params.set('key', passcode);

      for (const [assessmentId, ids] of groups) {
        const res = await fetch(`/api/assessments/results?${params.toString()}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          // Ids arrive from Postgres as strings; send them as numbers.
          body: JSON.stringify({ assessmentId, ids: ids.map(Number) }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Could not delete the selected responses.');
          return;
        }
      }
      setSelected(new Set());
      setConfirming(false);
      await load();
    } catch {
      setError('Network error while deleting.');
    } finally {
      setBusy(false);
    }
  };

  if (rows.length === 0) return null;

  return (
    <Card style={{ borderColor: confirming ? '#DC2626' : undefined }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[16px]">
          <Archive size={16} />
          Older responses ({rows.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-[13px]" style={{ color: MUTED }}>
          These were submitted against an earlier version of the test that is no longer in the
          app. They are not counted in any unit above.
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left" style={{ color: MUTED }}>
                <th className="w-10 px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={selected.size === rows.length}
                    onChange={toggleAll}
                    aria-label="Select all older responses"
                    className="h-4 w-4 cursor-pointer align-middle"
                    style={{ accentColor: GREEN }}
                  />
                </th>
                <th className="px-4 py-2.5 font-semibold">Name</th>
                <th className="px-4 py-2.5 font-semibold">Score</th>
                <th className="px-4 py-2.5 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2.5">
                    <input
                      type="checkbox"
                      checked={selected.has(r.id)}
                      onChange={() => toggle(r.id)}
                      aria-label={`Select ${r.name}`}
                      className="h-4 w-4 cursor-pointer align-middle"
                      style={{ accentColor: GREEN }}
                    />
                  </td>
                  <td className="px-4 py-2.5 font-medium">{r.name}</td>
                  <td className="px-4 py-2.5 tabular-nums">
                    {r.auto_score} / {r.auto_max}
                  </td>
                  <td className="px-4 py-2.5" style={{ color: MUTED }}>
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        {selected.size > 0 &&
          (confirming ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13.5px] font-semibold text-red-600">
                Delete {selected.size} {selected.size === 1 ? 'response' : 'responses'}? This
                cannot be undone.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirming(false)}
                  disabled={busy}
                >
                  Cancel
                </Button>
                <button
                  type="button"
                  onClick={deleteSelected}
                  disabled={busy}
                  className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: '#DC2626' }}
                >
                  <Trash2 size={14} />
                  {busy ? 'Deleting…' : `Delete ${selected.size}`}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13.5px] font-semibold">{selected.size} selected</span>
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-[13px] font-semibold transition-colors hover:bg-red-50"
                style={{ borderColor: '#DC2626', color: '#DC2626' }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
