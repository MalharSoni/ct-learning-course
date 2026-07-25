'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LegacyResponses } from '@/components/assessments/legacy-responses';
import { cn } from '@/lib/utils';
import {
  assessmentAutoGradedPoints,
  assessmentShortAnswers,
  assessmentWrittenPoints,
  formatPoints,
  v5Assessments,
  writtenScore,
  type Assessment,
  type AssessmentQuestion,
} from '@/lib/assessment-data';
import {
  ArrowLeft,
  BarChart3,
  Check,
  Download,
  ListChecks,
  Lock,
  Minus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react';

interface Submission {
  id: number;
  name: string;
  auto_score: number;
  auto_max: number;
  total_max: number;
  passing_score: number;
  answers: Record<string, number | string>;
  manual_scores: Record<string, number> | null;
  created_at: string;
}

type SortKey = 'score' | 'name' | 'date' | 'unmarked';
type View = 'summary' | 'questions' | 'people';
type SaveState = 'saving' | 'saved' | 'error';

/** Explicit colours: this app's theme tokens do not resolve, so bg-accent and
 *  friends render as nothing. Anything that must be visible is stated here. */
const GREEN = '#279B67';
const GREEN_SOFT = '#E2F8EE';
const GREY_BAR = '#E4E4E7';
const MUTED = '#71717A';

interface QuestionStat {
  question: AssessmentQuestion;
  sectionTitle: string;
  number: number;
  answered: number;
  skipped: number;
  correct: number;
  correctPct: number;
  optionCounts: number[];
  texts: { id: number; name: string; text: string }[];
  /** Short answers only: how many of the written answers carry a mark. */
  marked: number;
}

/**
 * Instructor view for one test's submissions, in three tabs: a summary, a
 * question-by-question breakdown, and the individual responses.
 *
 * Every tab is derived from the same rows the API already returns, including
 * each student's raw answers, so opening a student's paper costs no extra
 * request.
 */
export function ResultsBoard({ test }: { test: Assessment }) {
  const autoMax = useMemo(() => assessmentAutoGradedPoints(test), [test]);

  /**
   * The stored passing score covers the whole test, including the short answers
   * graded by hand, so it cannot be compared against a multiple-choice score.
   * Scale it to the auto-graded share instead: hitting this bar means a student
   * is on the same percentage pace as the real cutoff.
   */
  const autoBar = useMemo(
    () =>
      test.totalPoints > 0 ? Math.ceil((autoMax * test.passingScore) / test.totalPoints) : autoMax,
    [autoMax, test.passingScore, test.totalPoints]
  );

  const writtenMax = useMemo(() => assessmentWrittenPoints(test), [test]);
  const shortAnswers = useMemo(() => assessmentShortAnswers(test), [test]);

  /** One student's standing: auto score, marks entered, and the final result. */
  const scoreOf = useCallback(
    (s: Submission) => {
      const written = writtenScore(test, s.manual_scores);
      return {
        ...written,
        auto: s.auto_score,
        final: s.auto_score + written.total,
        passed: s.auto_score + written.total >= test.passingScore,
      };
    },
    [test]
  );

  const [key, setKey] = useState('');
  const [submitted, setSubmitted] = useState<Submission[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('score');
  const [view, setView] = useState<View>('summary');
  const [openStudent, setOpenStudent] = useState<number | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletedNote, setDeletedNote] = useState<string | null>(null);
  const [saving, setSaving] = useState<Record<string, SaveState>>({});
  const [markError, setMarkError] = useState<string | null>(null);

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

  useEffect(() => {
    setSelected(new Set());
    setConfirmingDelete(false);
    setDeleteError(null);
    setDeletedNote(null);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.id]);

  const flatQuestions = useMemo(
    () =>
      test.sections.flatMap((s) =>
        s.questions.map((q) => ({ question: q, sectionTitle: s.title }))
      ),
    [test]
  );

  /**
   * Until the written answers are marked there is no final score, so the
   * summary reports on whichever basis is honest: finished papers once any
   * exist, and the multiple-choice pace before that.
   */
  const stats = useMemo(() => {
    if (!submitted || submitted.length === 0) return null;
    const finished = submitted.map(scoreOf).filter((r) => r.complete);

    if (finished.length > 0) {
      const avg =
        finished.reduce((sum, r) => sum + r.final, 0) / finished.length;
      const passed = finished.filter((r) => r.passed).length;
      return {
        basis: 'final' as const,
        count: submitted.length,
        marked: finished.length,
        avg: test.totalPoints > 0 ? Math.round((avg / test.totalPoints) * 100) : 0,
        passed,
        passRate: Math.round((passed / finished.length) * 100),
      };
    }

    const avg =
      submitted.reduce((sum, s) => sum + s.auto_score, 0) / submitted.length;
    const passed = submitted.filter((s) => s.auto_score >= autoBar).length;
    return {
      basis: 'auto' as const,
      count: submitted.length,
      marked: 0,
      avg: autoMax > 0 ? Math.round((avg / autoMax) * 100) : 0,
      passed,
      passRate: Math.round((passed / submitted.length) * 100),
    };
  }, [submitted, autoMax, autoBar, scoreOf, test.totalPoints]);

  /** How many papers are completely marked, for the marking-progress tile. */
  const fullyMarked = useMemo(
    () => (submitted ?? []).filter((s) => scoreOf(s).complete).length,
    [submitted, scoreOf]
  );

  /** Per-question tallies across every submission. */
  const questionStats = useMemo<QuestionStat[]>(() => {
    const subs = submitted ?? [];
    return flatQuestions.map(({ question, sectionTitle }, i) => {
      let answered = 0;
      let correct = 0;
      let marked = 0;
      const optionCounts =
        question.kind === 'multiple-choice' ? question.options.map(() => 0) : [];
      const texts: { id: number; name: string; text: string }[] = [];

      for (const s of subs) {
        const a = s.answers?.[question.id];
        if (question.kind === 'multiple-choice') {
          if (typeof a === 'number' && a >= 0 && a < optionCounts.length) {
            answered++;
            optionCounts[a]++;
            if (a === question.correctIndex) correct++;
          }
        } else {
          // Skipped written answers still need a mark of zero recorded, so
          // every paper is listed here, not only the ones with text in them.
          const text = typeof a === 'string' ? a.trim() : '';
          if (text) answered++;
          texts.push({ id: s.id, name: s.name, text });
          if (typeof s.manual_scores?.[question.id] === 'number') marked++;
        }
      }

      return {
        question,
        sectionTitle,
        number: i + 1,
        answered,
        skipped: subs.length - answered,
        correct,
        correctPct: answered > 0 ? Math.round((correct / answered) * 100) : 0,
        optionCounts,
        texts,
        marked,
      };
    });
  }, [flatQuestions, submitted]);

  const hardest = useMemo(
    () =>
      questionStats
        .filter((q) => q.question.kind === 'multiple-choice' && q.answered > 0)
        .sort((a, b) => a.correctPct - b.correctPct)
        .slice(0, 5),
    [questionStats]
  );

  const rows = useMemo(() => {
    if (!submitted) return [];
    const filtered = submitted.filter((s) =>
      s.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    const sorted = [...filtered];
    if (sort === 'score')
      sorted.sort((a, b) => scoreOf(b).final - scoreOf(a).final);
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'unmarked')
      // Marking queue: papers with the most left to mark come first.
      sorted.sort(
        (a, b) =>
          scoreOf(a).marked - scoreOf(b).marked ||
          a.name.localeCompare(b.name)
      );
    else sorted.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return sorted;
  }, [submitted, query, sort, scoreOf]);

  const student = useMemo(
    () => (openStudent === null ? null : submitted?.find((s) => s.id === openStudent) ?? null),
    [openStudent, submitted]
  );

  /** Selection is scoped to what the search box is currently showing. */
  const allVisibleSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const toggleRow = useCallback((id: number) => {
    setDeleteError(null);
    setConfirmingDelete(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAllVisible = useCallback(() => {
    setDeleteError(null);
    setConfirmingDelete(false);
    setSelected((prev) => {
      const next = new Set(prev);
      const everyOn = rows.length > 0 && rows.every((r) => next.has(r.id));
      for (const r of rows) {
        if (everyOn) next.delete(r.id);
        else next.add(r.id);
      }
      return next;
    });
  }, [rows]);

  const clearSelection = useCallback(() => {
    setSelected(new Set());
    setConfirmingDelete(false);
    setDeleteError(null);
  }, []);

  const deleteSelected = useCallback(async () => {
    const ids = [...selected];
    if (ids.length === 0) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const params = new URLSearchParams();
      if (key) params.set('key', key);
      const res = await fetch(`/api/assessments/results?${params.toString()}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        // Ids arrive from Postgres as strings; send them as numbers.
        body: JSON.stringify({ assessmentId: test.id, ids: ids.map(Number) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setDeleteError(data.error || 'Could not delete the selected responses.');
        return;
      }
      // Drop them locally so the table updates even if the reload is slow.
      setSubmitted((prev) => (prev ? prev.filter((s) => !selected.has(s.id)) : prev));
      setDeletedNote(
        `Deleted ${data.deleted} ${data.deleted === 1 ? 'response' : 'responses'}.`
      );
      setSelected(new Set());
      setConfirmingDelete(false);
      if (openStudent !== null && ids.includes(openStudent)) setOpenStudent(null);
      load();
    } catch {
      setDeleteError('Network error while deleting.');
    } finally {
      setDeleting(false);
    }
  }, [selected, key, test.id, openStudent, load]);

  /**
   * Saves one mark. The row updates on screen first so marking never waits on
   * the network, and rolls back with a message if the save is refused.
   */
  const saveMark = useCallback(
    async (
      submissionId: number,
      questionId: string,
      points: number | null,
      /** The mark before this edit, so a refused save can put it back. */
      previousPoints: number | undefined
    ) => {
      const slot = `${submissionId}:${questionId}`;

      // Rewriting one key is idempotent, so it does not matter how many times
      // React replays this updater.
      const applyMark = (value: number | null) => (prev: Submission[] | null) => {
        if (!prev) return prev;
        return prev.map((s) => {
          if (s.id !== submissionId) return s;
          const next = { ...(s.manual_scores ?? {}) };
          if (value === null) delete next[questionId];
          else next[questionId] = value;
          return { ...s, manual_scores: next };
        });
      };
      const rollback = applyMark(previousPoints ?? null);

      setSubmitted(applyMark(points));
      setSaving((prev) => ({ ...prev, [slot]: 'saving' }));

      try {
        const params = new URLSearchParams();
        if (key) params.set('key', key);
        const res = await fetch(`/api/assessments/results?${params.toString()}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentId: test.id,
            id: Number(submissionId),
            questionId,
            points,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setSubmitted(rollback);
          setSaving((prev) => ({ ...prev, [slot]: 'error' }));
          setMarkError(data.error || 'Could not save that mark.');
          return;
        }
        setSaving((prev) => ({ ...prev, [slot]: 'saved' }));
        setMarkError(null);
      } catch {
        setSubmitted(rollback);
        setSaving((prev) => ({ ...prev, [slot]: 'error' }));
        setMarkError('Network error while saving that mark.');
      }
    },
    [key, test.id]
  );

  const exportHref = `/api/assessments/results/export?assessment=${test.id}${
    key ? `&key=${encodeURIComponent(key)}` : ''
  }`;

  const hasRows = Boolean(submitted && submitted.length > 0);

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
            <p className="text-[14px] mt-1" style={{ color: MUTED }}>
              {test.title}. Multiple choice is scored automatically ({autoMax} pts). Type a mark
              on each short answer ({writtenMax} pts) and it is added to the final score.
            </p>
          </div>

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
                      ? 'border-[#279B67] bg-[#E2F8EE] text-[#194330]'
                      : 'border-border hover:bg-[#F4F4F5]'
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
                  className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2 text-[14px] outline-none focus:border-[#279B67]"
                />
                <Button onClick={load} disabled={loading}>
                  Unlock
                </Button>
              </CardContent>
            </Card>
          )}

          {error && !needsKey && (
            <Card className="border-red-500/50">
              <CardContent className="pt-6 text-[13.5px] text-red-600">{error}</CardContent>
            </Card>
          )}

          {markError && (
            <Card className="border-red-500/50">
              <CardContent className="flex items-center justify-between gap-3 pt-6 text-[13.5px] text-red-600">
                <span>{markError}</span>
                <button
                  type="button"
                  onClick={() => setMarkError(null)}
                  className="text-[12px] font-semibold"
                  style={{ color: MUTED }}
                >
                  Dismiss
                </button>
              </CardContent>
            </Card>
          )}

          {hasRows && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-lg border border-border p-0.5">
                {(
                  [
                    ['summary', 'Summary', <BarChart3 key="i" size={14} />],
                    ['questions', 'Questions', <ListChecks key="i" size={14} />],
                    ['people', 'Responses', <Users key="i" size={14} />],
                  ] as [View, string, React.ReactNode][]
                ).map(([id, label, icon]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setView(id);
                      setOpenStudent(null);
                    }}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-semibold transition-colors',
                      view === id ? 'bg-[#E2F8EE] text-[#194330]' : 'hover:bg-[#F4F4F5]'
                    )}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
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
              <CardContent className="pt-6 text-[14px]" style={{ color: MUTED }}>
                No {test.unitLabel} submissions yet. Responses appear here as students submit this
                test.
              </CardContent>
            </Card>
          )}

          {/* ---------------------------------------------------------- Summary */}
          {hasRows && view === 'summary' && stats && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatTile icon={<Users size={15} />} label="Responses" value={`${stats.count}`} />
                <StatTile
                  label="Marked"
                  value={`${fullyMarked} / ${stats.count}`}
                  note={fullyMarked === stats.count ? 'all done' : 'papers finished'}
                />
                <StatTile
                  label="Average"
                  value={`${stats.avg}%`}
                  note={stats.basis === 'final' ? 'of marked papers' : 'multiple choice only'}
                />
                <StatTile
                  label={stats.basis === 'final' ? 'Pass rate' : 'On pace'}
                  value={`${stats.passRate}%`}
                  note={stats.basis === 'final' ? `${stats.passed} passed` : 'before marking'}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[16px]">Questions students found hardest</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hardest.length === 0 && (
                    <p className="text-[13.5px]" style={{ color: MUTED }}>
                      No multiple-choice answers yet.
                    </p>
                  )}
                  {hardest.map((q) => (
                    <button
                      key={q.question.id}
                      type="button"
                      onClick={() => setView('questions')}
                      className="block w-full text-left"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[13.5px]">
                          <span className="font-semibold">{q.number}.</span> {q.question.prompt}
                        </span>
                        <span className="shrink-0 tabular-nums text-[13px] font-semibold">
                          {q.correctPct}% correct
                        </span>
                      </div>
                      <Bar pct={q.correctPct} />
                    </button>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {/* -------------------------------------------------------- Questions */}
          {hasRows && view === 'questions' && (
            <div className="space-y-3">
              {questionStats.map((q) => {
                const qq = q.question;
                return (
                <Card key={qq.id}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className="text-[11px] font-semibold uppercase tracking-wide"
                          style={{ color: MUTED }}
                        >
                          {q.sectionTitle}
                        </div>
                        <p className="text-[14px] font-medium mt-1">
                          {q.number}. {qq.prompt}
                        </p>
                      </div>
                      {qq.kind === 'multiple-choice' ? (
                        <span className="shrink-0 tabular-nums text-[13px] font-semibold">
                          {q.correctPct}% correct
                        </span>
                      ) : (
                        <span
                          className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                          style={
                            q.marked > 0 && q.marked === q.texts.length
                              ? { background: GREEN_SOFT, color: '#194330' }
                              : { background: '#F4F4F5', color: MUTED }
                          }
                        >
                          {q.marked} of {q.texts.length} marked
                        </span>
                      )}
                    </div>

                    {qq.kind === 'multiple-choice' ? (
                      <div className="space-y-2">
                        {qq.options.map((opt, i) => {
                          const count = q.optionCounts[i] ?? 0;
                          const pct = q.answered > 0 ? Math.round((count / q.answered) * 100) : 0;
                          const isCorrect = i === qq.correctIndex;
                          return (
                            <div key={i}>
                              <div className="flex items-baseline justify-between gap-3 text-[13px]">
                                <span className="flex items-start gap-1.5">
                                  {isCorrect && (
                                    <Check
                                      size={14}
                                      className="mt-0.5 shrink-0"
                                      style={{ color: GREEN }}
                                    />
                                  )}
                                  <span className={cn(isCorrect && 'font-semibold')}>{opt}</span>
                                </span>
                                <span className="shrink-0 tabular-nums" style={{ color: MUTED }}>
                                  {count} · {pct}%
                                </span>
                              </div>
                              <Bar pct={pct} correct={isCorrect} />
                            </div>
                          );
                        })}
                        <p className="text-[12px]" style={{ color: MUTED }}>
                          {q.answered} answered, {q.skipped} skipped
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <details className="text-[13px]">
                          <summary
                            className="cursor-pointer font-semibold"
                            style={{ color: MUTED }}
                          >
                            Model answer
                          </summary>
                          <p className="mt-1.5 whitespace-pre-wrap" style={{ color: MUTED }}>
                            {qq.modelAnswer}
                          </p>
                        </details>

                        {q.texts.length === 0 && (
                          <p className="text-[13px]" style={{ color: MUTED }}>
                            No responses yet.
                          </p>
                        )}
                        {q.texts.map((t) => {
                          const sub = submitted?.find((s) => s.id === t.id);
                          return (
                            <div
                              key={t.id}
                              className="rounded-lg border border-border p-3 text-[13.5px]"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="text-[12px] font-semibold" style={{ color: MUTED }}>
                                  {t.name}
                                </div>
                                <MarkInput
                                  value={sub?.manual_scores?.[qq.id]}
                                  max={qq.points}
                                  state={saving[`${t.id}:${qq.id}`]}
                                  label={`Mark for ${t.name} on question ${q.number}`}
                                  onSave={(points) => saveMark(t.id, qq.id, points, sub?.manual_scores?.[qq.id])}
                                />
                              </div>
                              <p className="mt-1 whitespace-pre-wrap">
                                {t.text || (
                                  <span style={{ color: MUTED }}>Skipped, nothing written</span>
                                )}
                              </p>
                            </div>
                          );
                        })}
                        <p className="text-[12px]" style={{ color: MUTED }}>
                          {q.answered} answered, {q.skipped} skipped
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                );
              })}
            </div>
          )}

          {/* -------------------------------------------------------- Responses */}
          {hasRows && view === 'people' && !student && (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-xs">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: MUTED }}
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name"
                    className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-[13.5px] outline-none focus:border-[#279B67]"
                  />
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-[13px] outline-none"
                >
                  <option value="score">Sort: Score (high to low)</option>
                  <option value="unmarked">Sort: Still to mark</option>
                  <option value="name">Sort: Name (A to Z)</option>
                  <option value="date">Sort: Newest</option>
                </select>
              </div>

              {/* Selection and delete. Sits above the table so the count and the
                  action stay in view while scrolling a long list. */}
              {selected.size > 0 && (
                <Card style={{ borderColor: confirmingDelete ? '#DC2626' : undefined }}>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                    {confirmingDelete ? (
                      <>
                        <div>
                          <p className="text-[14px] font-semibold text-red-600">
                            Delete {selected.size}{' '}
                            {selected.size === 1 ? 'response' : 'responses'}? This cannot be
                            undone.
                          </p>
                          <p className="text-[12.5px] mt-0.5" style={{ color: MUTED }}>
                            Download the CSV first if you want a copy.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmingDelete(false)}
                            disabled={deleting}
                          >
                            Cancel
                          </Button>
                          <button
                            type="button"
                            onClick={deleteSelected}
                            disabled={deleting}
                            className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                            style={{ background: '#DC2626' }}
                          >
                            <Trash2 size={14} />
                            {deleting ? 'Deleting…' : `Delete ${selected.size}`}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-[13.5px] font-semibold">
                          {selected.size} selected
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={clearSelection}>
                            Clear
                          </Button>
                          <button
                            type="button"
                            onClick={() => setConfirmingDelete(true)}
                            className="flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-[13px] font-semibold transition-colors hover:bg-red-50"
                            style={{ borderColor: '#DC2626', color: '#DC2626' }}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {deleteError && (
                <Card className="border-red-500/50">
                  <CardContent className="pt-6 text-[13.5px] text-red-600">
                    {deleteError}
                  </CardContent>
                </Card>
              )}

              {deletedNote && selected.size === 0 && !confirmingDelete && (
                <Card>
                  <CardContent className="flex items-center justify-between gap-3 pt-6 text-[13.5px]">
                    <span>{deletedNote}</span>
                    <button
                      type="button"
                      onClick={() => setDeletedNote(null)}
                      className="text-[12px] font-semibold"
                      style={{ color: MUTED }}
                    >
                      Dismiss
                    </button>
                  </CardContent>
                </Card>
              )}

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13.5px]">
                    <thead>
                      <tr className="border-b border-border text-left" style={{ color: MUTED }}>
                        <th className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            checked={allVisibleSelected}
                            onChange={toggleAllVisible}
                            aria-label="Select all responses"
                            className="h-4 w-4 cursor-pointer align-middle"
                            style={{ accentColor: GREEN }}
                          />
                        </th>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Auto</th>
                        <th className="px-4 py-3 font-semibold">Written</th>
                        <th className="px-4 py-3 font-semibold">Final</th>
                        <th className="px-4 py-3 font-semibold">%</th>
                        <th className="px-4 py-3 font-semibold">Result</th>
                        <th className="px-4 py-3 font-semibold">Submitted</th>
                        <th className="px-4 py-3 font-semibold" />
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((s) => {
                        const r = scoreOf(s);
                        // Before a paper is fully marked its percentage is not
                        // a result yet, so it is shown against the auto part.
                        const pct = r.complete
                          ? Math.round((r.final / test.totalPoints) * 100)
                          : s.auto_max > 0
                            ? Math.round((s.auto_score / s.auto_max) * 100)
                            : 0;
                        const onTrack = s.auto_score >= autoBar;
                        return (
                          <tr
                            key={s.id}
                            className="border-b border-border/60 last:border-0 cursor-pointer hover:bg-[#F4F4F5]"
                            onClick={() => setOpenStudent(s.id)}
                          >
                            {/* Ticking a box must not also open the paper. */}
                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={selected.has(s.id)}
                                onChange={() => toggleRow(s.id)}
                                aria-label={`Select ${s.name}`}
                                className="h-4 w-4 cursor-pointer align-middle"
                                style={{ accentColor: GREEN }}
                              />
                            </td>
                            <td className="px-4 py-3 font-medium">{s.name}</td>
                            <td className="px-4 py-3 tabular-nums">
                              {s.auto_score} / {s.auto_max}
                            </td>
                            <td className="px-4 py-3 tabular-nums">
                              {r.marked === 0 ? (
                                <span style={{ color: MUTED }}>not marked</span>
                              ) : (
                                <span style={{ color: r.complete ? undefined : MUTED }}>
                                  {formatPoints(r.total)} / {writtenMax}
                                  {!r.complete && ` (${r.marked} of ${r.of})`}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 tabular-nums font-semibold">
                              {r.complete ? (
                                `${formatPoints(r.final)} / ${test.totalPoints}`
                              ) : (
                                <span className="font-normal" style={{ color: MUTED }}>
                                  &ndash;
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 tabular-nums">{pct}%</td>
                            <td className="px-4 py-3">
                              {r.complete ? (
                                <span
                                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                                  style={
                                    r.passed
                                      ? { background: GREEN_SOFT, color: '#194330' }
                                      : { background: '#FEE2E2', color: '#991B1B' }
                                  }
                                >
                                  {r.passed ? 'Pass' : 'Fail'}
                                </span>
                              ) : (
                                <span
                                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                                  style={
                                    onTrack
                                      ? { background: '#F4F4F5', color: '#52525B' }
                                      : { background: '#FEF3C7', color: '#92400E' }
                                  }
                                >
                                  {onTrack ? 'To mark' : 'To mark, below pace'}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3" style={{ color: MUTED }}>
                              {new Date(s.created_at).toLocaleString()}
                            </td>
                            <td
                              className="px-4 py-3 text-[12px] font-semibold"
                              style={{ color: GREEN }}
                            >
                              View
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}

          {/* One student's full paper. */}
          {hasRows && view === 'people' && student && (
            <>
              <div className="flex items-center justify-between gap-4">
                <Button variant="outline" size="sm" onClick={() => setOpenStudent(null)}>
                  <ArrowLeft size={14} className="mr-1.5" />
                  All responses
                </Button>
                <div className="text-[13px]" style={{ color: MUTED }}>
                  {new Date(student.created_at).toLocaleString()}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[20px]">{student.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(() => {
                    const r = scoreOf(student);
                    return (
                      <>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <StatTile
                            label="Multiple choice"
                            value={`${student.auto_score} / ${autoMax}`}
                          />
                          <StatTile
                            label="Written"
                            value={`${formatPoints(r.total)} / ${writtenMax}`}
                            note={r.complete ? 'all marked' : `${r.marked} of ${r.of} marked`}
                          />
                          <StatTile
                            label="Final"
                            value={
                              r.complete
                                ? `${formatPoints(r.final)} / ${test.totalPoints}`
                                : '–'
                            }
                            note={r.complete ? undefined : 'mark every written answer'}
                          />
                          <StatTile
                            label="Result"
                            value={r.complete ? (r.passed ? 'Pass' : 'Fail') : '–'}
                            note={`pass mark ${test.passingScore}`}
                          />
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>

              <div className="space-y-3">
                {questionStats.map((q) => {
                  const qq = q.question;
                  const a = student.answers?.[qq.id];
                  if (qq.kind === 'multiple-choice') {
                    const picked = typeof a === 'number' ? a : null;
                    const right = picked === qq.correctIndex;
                    return (
                      <Card key={qq.id}>
                        <CardContent className="pt-6 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[14px] font-medium">
                              {q.number}. {qq.prompt}
                            </p>
                            <Verdict state={picked === null ? 'skipped' : right ? 'right' : 'wrong'} />
                          </div>
                          <div className="text-[13.5px]">
                            <span style={{ color: MUTED }}>Answered: </span>
                            {picked === null ? (
                              <span style={{ color: MUTED }}>skipped</span>
                            ) : (
                              <span className={cn(!right && 'line-through')}>
                                {qq.options[picked]}
                              </span>
                            )}
                          </div>
                          {!right && (
                            <div className="text-[13.5px]">
                              <span style={{ color: MUTED }}>Correct: </span>
                              <span style={{ color: GREEN }} className="font-medium">
                                {qq.options[qq.correctIndex]}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  }
                  const text = typeof a === 'string' ? a.trim() : '';
                  return (
                    <Card key={qq.id}>
                      <CardContent className="pt-6 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[14px] font-medium">
                            {q.number}. {qq.prompt}
                          </p>
                          <MarkInput
                            value={student.manual_scores?.[qq.id]}
                            max={qq.points}
                            state={saving[`${student.id}:${qq.id}`]}
                            label={`Mark for question ${q.number}`}
                            onSave={(points) => saveMark(student.id, qq.id, points, student.manual_scores?.[qq.id])}
                          />
                        </div>
                        <div className="rounded-lg border border-border p-3 text-[13.5px] whitespace-pre-wrap">
                          {text || <span style={{ color: MUTED }}>Skipped</span>}
                        </div>
                        <details className="text-[13px]">
                          <summary className="cursor-pointer font-semibold" style={{ color: MUTED }}>
                            Model answer
                          </summary>
                          <p className="mt-1.5 whitespace-pre-wrap" style={{ color: MUTED }}>
                            {qq.modelAnswer}
                          </p>
                        </details>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {/* Shown on the first unit only, so the cleanup block appears once. */}
          {!needsKey && test.id === v5Assessments[0].id && <LegacyResponses passcode={key} />}

          <p className="text-[12px]" style={{ color: MUTED }}>
            A paper gets a final result once all {shortAnswers.length} written answers carry a
            mark. Until then it reads &ldquo;To mark&rdquo;, and &ldquo;below pace&rdquo; means the
            multiple-choice score is under {autoBar} of {autoMax}, the same percentage pace as the{' '}
            {test.passingScore}-point cutoff. Marks save as you type them. An empty box means not
            yet read, which is not the same as a mark of 0.
          </p>
        </div>
      </main>
    </>
  );
}

function Bar({ pct, correct = false }: { pct: number; correct?: boolean }) {
  return (
    <div className="mt-1 h-2 w-full rounded-full" style={{ background: '#F4F4F5' }}>
      <div
        className="h-2 rounded-full transition-all"
        style={{ width: `${Math.max(pct, 0)}%`, background: correct ? GREEN : GREY_BAR }}
      />
    </div>
  );
}

function Verdict({ state }: { state: 'right' | 'wrong' | 'skipped' }) {
  if (state === 'skipped')
    return (
      <span
        className="flex shrink-0 items-center gap-1 text-[12px] font-semibold"
        style={{ color: MUTED }}
      >
        <Minus size={13} /> Skipped
      </span>
    );
  if (state === 'right')
    return (
      <span
        className="flex shrink-0 items-center gap-1 text-[12px] font-semibold"
        style={{ color: GREEN }}
      >
        <Check size={13} /> Correct
      </span>
    );
  return (
    <span
      className="flex shrink-0 items-center gap-1 text-[12px] font-semibold"
      style={{ color: '#DC2626' }}
    >
      <X size={13} /> Incorrect
    </span>
  );
}

function StatTile({
  icon,
  label,
  value,
  note,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-lg border border-border p-3" style={{ background: '#FAFAFA' }}>
      <div
        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: MUTED }}
      >
        {icon}
        {label}
      </div>
      <div className="mt-1 text-[22px] font-black tracking-tight">{value}</div>
      {note && (
        <div className="text-[11.5px] leading-tight" style={{ color: MUTED }}>
          {note}
        </div>
      )}
    </div>
  );
}

/**
 * The mark box for one written answer on one paper. Whole and half marks only,
 * typed or stepped, saved as soon as the value settles. An empty box means the
 * answer has not been read yet, which is deliberately different from a 0.
 */
function MarkInput({
  value,
  max,
  state,
  onSave,
  label,
}: {
  value: number | undefined;
  max: number;
  state?: SaveState;
  onSave: (points: number | null) => void;
  label: string;
}) {
  const [draft, setDraft] = useState(value === undefined ? '' : String(value));

  // Follow the stored value when it changes elsewhere, such as a reload or the
  // same paper being marked from the other tab.
  useEffect(() => {
    setDraft(value === undefined ? '' : String(value));
  }, [value]);

  const commit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (trimmed === '') {
        if (value !== undefined) onSave(null);
        return;
      }
      const n = Number(trimmed);
      if (!Number.isFinite(n)) {
        setDraft(value === undefined ? '' : String(value));
        return;
      }
      const clamped = Math.min(Math.max(Math.round(n * 2) / 2, 0), max);
      setDraft(String(clamped));
      if (clamped !== value) onSave(clamped);
    },
    [max, onSave, value]
  );

  const marked = value !== undefined;

  return (
    <div className="flex shrink-0 items-center gap-2">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        max={max}
        step={0.5}
        value={draft}
        aria-label={label}
        placeholder="–"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
        }}
        className="w-[62px] rounded-lg border px-2 py-1.5 text-center text-[14px] font-semibold tabular-nums outline-none focus:border-[#279B67]"
        style={{
          borderColor: marked ? GREEN : '#D4D4D8',
          background: marked ? GREEN_SOFT : '#FFFFFF',
          color: marked ? '#194330' : undefined,
        }}
      />
      <span className="text-[12.5px] whitespace-nowrap" style={{ color: MUTED }}>
        / {max}
      </span>
      <span className="w-[14px] shrink-0">
        {state === 'saving' && (
          <RefreshCw size={13} className="animate-spin" style={{ color: MUTED }} />
        )}
        {state === 'saved' && <Check size={14} style={{ color: GREEN }} />}
        {state === 'error' && <X size={14} style={{ color: '#DC2626' }} />}
      </span>
    </div>
  );
}
