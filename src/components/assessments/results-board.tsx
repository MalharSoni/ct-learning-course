'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  assessmentAutoGradedPoints,
  v5Assessments,
  type Assessment,
} from '@/lib/assessment-data';
import { Download, Lock, RefreshCw, Search, Users } from 'lucide-react';

interface Submission {
  id: number;
  name: string;
  auto_score: number;
  auto_max: number;
  total_max: number;
  passing_score: number;
  created_at: string;
}

type SortKey = 'score' | 'name' | 'date';

/**
 * Instructor view for one test's submissions. Each unit test has its own
 * assessment id, so this board only ever shows that unit's rows; the tab row
 * links across to the other units.
 */
export function ResultsBoard({ test }: { test: Assessment }) {
  const autoMax = useMemo(() => assessmentAutoGradedPoints(test), [test]);

  const [key, setKey] = useState('');
  const [submitted, setSubmitted] = useState<Submission[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('score');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ assessment: test.id });
      if (key) params.set('key', key);
      const res = await fetch(`/api/assessments/results?${params.toString()}`);
      if (res.status === 401) {
        setNeedsKey(true);
        setSubmitted(null);
        setError('Incorrect passcode.');
        return;
      }
      if (res.status === 503) {
        setError(
          'Score storage is not configured yet. Set the Vercel Postgres env vars and redeploy.'
        );
        setSubmitted(null);
        return;
      }
      if (!res.ok) {
        setError('Could not load results.');
        setSubmitted(null);
        return;
      }
      const data = await res.json();
      setNeedsKey(false);
      setSubmitted(data.submissions as Submission[]);
    } catch {
      setError('Network error loading results.');
    } finally {
      setLoading(false);
    }
  }, [key, test.id]);

  // Try an unauthenticated load on mount; if a passcode is required the API
  // answers 401 and we show the passcode form.
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.id]);

  const stats = useMemo(() => {
    if (!submitted || submitted.length === 0) return null;
    const scores = submitted.map((s) => s.auto_score);
    const passed = submitted.filter((s) => s.auto_score >= s.passing_score).length;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return {
      count: submitted.length,
      avg: autoMax > 0 ? Math.round((avg / autoMax) * 100) : 0,
      passed,
      passRate: Math.round((passed / submitted.length) * 100),
    };
  }, [submitted, autoMax]);

  const rows = useMemo(() => {
    if (!submitted) return [];
    const filtered = submitted.filter((s) =>
      s.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    const sorted = [...filtered];
    if (sort === 'score') sorted.sort((a, b) => b.auto_score - a.auto_score);
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return sorted;
  }, [submitted, query, sort]);

  const exportHref = `/api/assessments/results/export?assessment=${test.id}${
    key ? `&key=${encodeURIComponent(key)}` : ''
  }`;

  return (
    <>
      <Sidebar />
      <Topbar title={`${test.unitLabel} Test Results`} />
      <main className="ml-[280px] min-h-screen transition-colors" role="main">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-12 space-y-5">
          <div>
            <h1 className="text-[26px] font-black tracking-tight">
              {test.unitLabel} Test Results
            </h1>
            <p className="text-[14px] text-muted-foreground mt-1">
              {test.title} — auto-graded multiple-choice scores ({autoMax} pts). Short answers
              are graded by hand and are not scored here.
            </p>
          </div>

          {/* Each unit is a separate submission, so results live on separate boards. */}
          <nav className="flex items-center gap-2" aria-label="Test results by unit">
            {v5Assessments.map((a) => {
              const active = a.id === test.id;
              return (
                <Link
                  key={a.id}
                  href={`/assessments/${a.slug}/results`}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg border px-3.5 py-1.5 text-[13px] font-semibold transition-colors',
                    active
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  {a.unitLabel}
                </Link>
              );
            })}
          </nav>

          {needsKey && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[16px]">
                  <Lock size={16} /> Instructor passcode
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && load()}
                  placeholder="Enter passcode"
                  className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2 text-[14px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <Button onClick={load} disabled={loading}>
                  Unlock
                </Button>
              </CardContent>
            </Card>
          )}

          {error && !needsKey && (
            <Card className="border-red-500/50">
              <CardContent className="pt-6 text-[13.5px] text-red-600 dark:text-red-400">
                {error}
              </CardContent>
            </Card>
          )}

          {stats && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile icon={<Users size={15} />} label="Submissions" value={`${stats.count}`} />
              <StatTile label="Average" value={`${stats.avg}%`} />
              <StatTile label="Passed (auto)" value={`${stats.passed}`} />
              <StatTile label="Pass rate" value={`${stats.passRate}%`} />
            </div>
          )}

          {submitted && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-xs">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name"
                  className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-[13.5px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-accent"
                >
                  <option value="score">Sort: Score (high→low)</option>
                  <option value="name">Sort: Name (A→Z)</option>
                  <option value="date">Sort: Newest</option>
                </select>
                <Button variant="outline" size="sm" onClick={load} disabled={loading}>
                  <RefreshCw size={14} className={cn('mr-1.5', loading && 'animate-spin')} />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={exportHref}>
                    <Download size={14} className="mr-1.5" />
                    CSV
                  </a>
                </Button>
              </div>
            </div>
          )}

          {submitted && submitted.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-[14px] text-muted-foreground">
                No {test.unitLabel} submissions yet. Scores appear here as students submit this
                test.
              </CardContent>
            </Card>
          )}

          {submitted && submitted.length > 0 && (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13.5px]">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Score</th>
                      <th className="px-4 py-3 font-semibold">%</th>
                      <th className="px-4 py-3 font-semibold">Result (auto)</th>
                      <th className="px-4 py-3 font-semibold">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s) => {
                      const pct = s.auto_max > 0 ? Math.round((s.auto_score / s.auto_max) * 100) : 0;
                      const passed = s.auto_score >= s.passing_score;
                      return (
                        <tr key={s.id} className="border-b border-border/60 last:border-0">
                          <td className="px-4 py-3 font-medium">{s.name}</td>
                          <td className="px-4 py-3 tabular-nums">
                            {s.auto_score} / {s.auto_max}
                          </td>
                          <td className="px-4 py-3 tabular-nums">{pct}%</td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                                passed
                                  ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                              )}
                            >
                              {passed ? 'Pass' : 'Below cutoff'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {new Date(s.created_at).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          <p className="text-[12px] text-muted-foreground">
            &ldquo;Result (auto)&rdquo; compares multiple-choice points to the {test.passingScore}
            -point cutoff. Final pass/fail also depends on the {test.totalPoints - autoMax}{' '}
            short-answer points you grade by hand.
          </p>
        </div>
      </main>
    </>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-[22px] font-black tracking-tight">{value}</div>
    </div>
  );
}
