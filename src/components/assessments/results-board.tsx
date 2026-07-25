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
  created_at: string;
}

type SortKey = 'score' | 'name' | 'date';
type View = 'summary' | 'questions' | 'people';

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
  texts: { name: string; text: string }[];
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

  const [key, setKey] = useState('');
  const [submitted, setSubmitted] = useState<Submission[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('score');
  const [view, setView] = useState<View>('summary');
  const [openStudent, setOpenStudent] = useState<number | null>(null);

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

  const stats = useMemo(() => {
    if (!submitted || submitted.length === 0) return null;
    const scores = submitted.map((s) => s.auto_score);
    const passed = submitted.filter((s) => s.auto_score >= autoBar).length;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return {
      count: submitted.length,
      avg: autoMax > 0 ? Math.round((avg / autoMax) * 100) : 0,
      passed,
      passRate: Math.round((passed / submitted.length) * 100),
    };
  }, [submitted, autoMax, autoBar]);

  /** Per-question tallies across every submission. */
  const questionStats = useMemo<QuestionStat[]>(() => {
    const subs = submitted ?? [];
    return flatQuestions.map(({ question, sectionTitle }, i) => {
      let answered = 0;
      let correct = 0;
      const optionCounts =
        question.kind === 'multiple-choice' ? question.options.map(() => 0) : [];
      const texts: { name: string; text: string }[] = [];

      for (const s of subs) {
        const a = s.answers?.[question.id];
        if (question.kind === 'multiple-choice') {
          if (typeof a === 'number' && a >= 0 && a < optionCounts.length) {
            answered++;
            optionCounts[a]++;
            if (a === question.correctIndex) correct++;
          }
        } else if (typeof a === 'string' && a.trim()) {
          answered++;
          texts.push({ name: s.name, text: a.trim() });
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
    if (sort === 'score') sorted.sort((a, b) => b.auto_score - a.auto_score);
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return sorted;
  }, [submitted, query, sort]);

  const student = useMemo(
    () => (openStudent === null ? null : submitted?.find((s) => s.id === openStudent) ?? null),
    [openStudent, submitted]
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
              {test.title}. Multiple choice is scored automatically ({autoMax} pts). Short answers
              are shown here for you to read and grade by hand.
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
                <StatTile label="Average" value={`${stats.avg}%`} />
                <StatTile label="On track" value={`${stats.passed}`} />
                <StatTile label="Pass rate" value={`${stats.passRate}%`} />
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
                        <span className="shrink-0 text-[12px]" style={{ color: MUTED }}>
                          Graded by hand
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
                        {q.texts.length === 0 && (
                          <p className="text-[13px]" style={{ color: MUTED }}>
                            No written answers yet.
                          </p>
                        )}
                        {q.texts.map((t, i) => (
                          <div
                            key={i}
                            className="rounded-lg border border-border p-3 text-[13.5px]"
                          >
                            <div className="text-[12px] font-semibold" style={{ color: MUTED }}>
                              {t.name}
                            </div>
                            <p className="mt-1 whitespace-pre-wrap">{t.text}</p>
                          </div>
                        ))}
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
                  <option value="name">Sort: Name (A to Z)</option>
                  <option value="date">Sort: Newest</option>
                </select>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13.5px]">
                    <thead>
                      <tr className="border-b border-border text-left" style={{ color: MUTED }}>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Score</th>
                        <th className="px-4 py-3 font-semibold">%</th>
                        <th className="px-4 py-3 font-semibold">Result (auto)</th>
                        <th className="px-4 py-3 font-semibold">Submitted</th>
                        <th className="px-4 py-3 font-semibold" />
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((s) => {
                        const pct =
                          s.auto_max > 0 ? Math.round((s.auto_score / s.auto_max) * 100) : 0;
                        const onTrack = s.auto_score >= autoBar;
                        return (
                          <tr
                            key={s.id}
                            className="border-b border-border/60 last:border-0 cursor-pointer hover:bg-[#F4F4F5]"
                            onClick={() => setOpenStudent(s.id)}
                          >
                            <td className="px-4 py-3 font-medium">{s.name}</td>
                            <td className="px-4 py-3 tabular-nums">
                              {s.auto_score} / {s.auto_max}
                            </td>
                            <td className="px-4 py-3 tabular-nums">{pct}%</td>
                            <td className="px-4 py-3">
                              <span
                                className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                                style={
                                  onTrack
                                    ? { background: GREEN_SOFT, color: '#194330' }
                                    : { background: '#FEF3C7', color: '#92400E' }
                                }
                              >
                                {onTrack ? 'On track' : 'Below pace'}
                              </span>
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
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <StatTile
                      label="Auto score"
                      value={`${student.auto_score} / ${student.auto_max}`}
                    />
                    <StatTile
                      label="Percent"
                      value={`${
                        student.auto_max > 0
                          ? Math.round((student.auto_score / student.auto_max) * 100)
                          : 0
                      }%`}
                    />
                    <StatTile
                      label="Short answers to grade"
                      value={`${test.totalPoints - autoMax} pts`}
                    />
                  </div>
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
                          <span
                            className="shrink-0 text-[12px] font-semibold"
                            style={{ color: MUTED }}
                          >
                            {qq.points} pts
                          </span>
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

          <p className="text-[12px]" style={{ color: MUTED }}>
            &ldquo;Result (auto)&rdquo; compares multiple-choice points against {autoBar} of{' '}
            {autoMax}, the same percentage pace as the {test.passingScore}-point cutoff for the
            whole test. It is not the final result: the {test.totalPoints - autoMax} short-answer
            points you grade by hand still count.
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
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
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
    </div>
  );
}
