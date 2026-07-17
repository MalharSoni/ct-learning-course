'use client';

import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  v5FoundationTest,
  assessmentAutoGradedPoints,
  assessmentQuestionCount,
  type AssessmentQuestion,
} from '@/lib/assessment-data';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  Hourglass,
  RotateCcw,
  Send,
  XCircle,
} from 'lucide-react';

type Answers = Record<string, number | string | undefined>;

const test = v5FoundationTest;
const autoGradedPoints = assessmentAutoGradedPoints(test);
const manualPoints = test.totalPoints - autoGradedPoints;

export default function V5FoundationTestPage() {
  // stage: -1 = intro, 0..n-1 = section index, n = submitted/results
  const [stage, setStage] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [showErrors, setShowErrors] = useState(false);

  const totalQuestions = useMemo(
    () => test.sections.reduce((sum, s) => sum + s.questions.length, 0),
    []
  );
  const answeredCount = useMemo(
    () =>
      test.sections
        .flatMap((s) => s.questions)
        .filter((q) => isAnswered(q, answers)).length,
    [answers]
  );

  const isSubmitted = stage === test.sections.length;

  const setAnswer = (id: string, value: number | string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const sectionComplete = (sectionIndex: number) =>
    test.sections[sectionIndex].questions.every((q) => isAnswered(q, answers));

  const goNext = () => {
    if (!sectionComplete(stage)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStage(stage + 1);
    window.scrollTo({ top: 0 });
  };

  const goBack = () => {
    setShowErrors(false);
    setStage(stage - 1);
    window.scrollTo({ top: 0 });
  };

  const retake = () => {
    setAnswers({});
    setShowErrors(false);
    setStage(-1);
    window.scrollTo({ top: 0 });
  };

  const score = useMemo(() => {
    let earned = 0;
    for (const q of test.sections.flatMap((s) => s.questions)) {
      if (q.kind === 'multiple-choice' && answers[q.id] === q.correctIndex) {
        earned += q.points;
      }
    }
    return earned;
  }, [answers]);

  return (
    <>
      <Sidebar />
      <Topbar title="V5 Foundation Unit Test" />
      <main className="ml-[280px] min-h-screen transition-colors" role="main">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8 lg:py-12 space-y-4">
          {stage === -1 && <IntroCard onStart={() => setStage(0)} />}

          {stage >= 0 && !isSubmitted && (
            <>
              <ProgressHeader
                sectionIndex={stage}
                answeredCount={answeredCount}
                totalQuestions={totalQuestions}
              />
              <SectionForm
                sectionIndex={stage}
                answers={answers}
                setAnswer={setAnswer}
                showErrors={showErrors}
              />
              <div className="flex items-center justify-between pt-2">
                {stage > 0 ? (
                  <Button variant="outline" onClick={goBack}>
                    <ArrowLeft size={15} className="mr-1.5" />
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                {stage < test.sections.length - 1 ? (
                  <Button onClick={goNext}>
                    Next
                    <ArrowRight size={15} className="ml-1.5" />
                  </Button>
                ) : (
                  <Button onClick={goNext}>
                    <Send size={15} className="mr-1.5" />
                    Submit
                  </Button>
                )}
              </div>
            </>
          )}

          {isSubmitted && (
            <ResultsView answers={answers} score={score} onRetake={retake} />
          )}
        </div>
      </main>
    </>
  );
}

function isAnswered(q: AssessmentQuestion, answers: Answers): boolean {
  const value = answers[q.id];
  if (q.kind === 'multiple-choice') return typeof value === 'number';
  return typeof value === 'string' && value.trim().length > 0;
}

function IntroCard({ onStart }: { onStart: () => void }) {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="h-2.5 bg-accent" />
      <CardHeader className="pt-6">
        <CardTitle className="text-[26px] font-black tracking-tight leading-tight">
          {test.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-[14px] text-muted-foreground leading-relaxed">{test.description}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <InfoTile
            icon={<ClipboardList size={16} />}
            label="Points"
            value={`${test.totalPoints} total · ${test.passingScore} to pass`}
          />
          <InfoTile
            icon={<Clock size={16} />}
            label="Time limit"
            value={`${test.timeLimitMinutes} minutes`}
          />
          <InfoTile
            icon={<CheckCircle2 size={16} />}
            label="Sections"
            value={`${test.sections.length} sections · ${assessmentQuestionCount(test)} questions`}
          />
        </div>
        <ul className="space-y-1.5 text-[13px] text-muted-foreground">
          <li>• All questions are required.</li>
          <li>• Multiple choice ({autoGradedPoints} pts) is graded instantly when you submit.</li>
          <li>• Short answers ({manualPoints} pts) are reviewed by your instructor.</li>
          <li>• You can go back to previous sections before submitting.</li>
        </ul>
        <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
          Start test
          <ArrowRight size={16} className="ml-1.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-[13px] font-medium">{value}</div>
    </div>
  );
}

function ProgressHeader({
  sectionIndex,
  answeredCount,
  totalQuestions,
}: {
  sectionIndex: number;
  answeredCount: number;
  totalQuestions: number;
}) {
  const percent = Math.round((answeredCount / totalQuestions) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[12.5px] text-muted-foreground">
        <span className="font-semibold">
          Section {sectionIndex + 1} of {test.sections.length}
        </span>
        <span>
          {answeredCount} of {totalQuestions} answered
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function SectionForm({
  sectionIndex,
  answers,
  setAnswer,
  showErrors,
}: {
  sectionIndex: number;
  answers: Answers;
  setAnswer: (id: string, value: number | string) => void;
  showErrors: boolean;
}) {
  const section = test.sections[sectionIndex];
  let questionNumber = 0;
  for (let i = 0; i < sectionIndex; i++) {
    questionNumber += test.sections[i].questions.length;
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden pt-0">
        <div className="h-2.5 bg-accent" />
        <CardHeader className="pt-5 pb-5">
          <CardTitle className="text-[20px] font-bold tracking-tight">{section.title}</CardTitle>
          <p className="text-[13px] text-muted-foreground mt-1">{section.description}</p>
        </CardHeader>
      </Card>

      {section.questions.map((q, i) => {
        const number = questionNumber + i + 1;
        const missing = showErrors && !isAnswered(q, answers);
        return (
          <Card
            key={q.id}
            className={cn('transition-colors', missing && 'border-red-500/70')}
          >
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[14px] font-medium leading-relaxed">
                  {number}. {q.prompt}
                  <span className="text-red-500 ml-1" aria-label="required">
                    *
                  </span>
                </p>
                <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {q.points} pts
                </span>
              </div>

              {q.kind === 'multiple-choice' ? (
                <div className="space-y-2" role="radiogroup" aria-label={`Question ${number}`}>
                  {q.options.map((option, optionIndex) => {
                    const selected = answers[q.id] === optionIndex;
                    return (
                      <button
                        key={optionIndex}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setAnswer(q.id, optionIndex)}
                        className={cn(
                          'flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[13.5px] transition-all duration-150',
                          selected
                            ? 'border-accent bg-accent/10 font-medium'
                            : 'border-border hover:bg-muted/50 active:scale-[0.995]'
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                            selected ? 'border-accent' : 'border-muted-foreground/50'
                          )}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-accent" />}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <textarea
                  value={(answers[q.id] as string) ?? ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder="Enter your answer"
                  rows={4}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] leading-relaxed outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  aria-label={`Question ${number} answer`}
                />
              )}

              {missing && (
                <p className="text-[12.5px] font-medium text-red-500">
                  This question is required.
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ResultsView({
  answers,
  score,
  onRetake,
}: {
  answers: Answers;
  score: number;
  onRetake: () => void;
}) {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden pt-0">
        <div className="h-2.5 bg-accent" />
        <CardHeader className="pt-6">
          <CardTitle className="flex items-center gap-2 text-[22px] font-black tracking-tight">
            <CheckCircle2 size={22} className="text-green-500" />
            Your response was submitted
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <div className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
              Auto-graded score (multiple choice)
            </div>
            <div className="mt-1 text-[32px] font-black tracking-tight">
              {score}
              <span className="text-[18px] font-semibold text-muted-foreground">
                {' '}
                / {autoGradedPoints} pts
              </span>
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Short answers ({manualPoints} pts) are pending instructor review. Passing score for
              the full test is {test.passingScore} / {test.totalPoints}.
            </p>
          </div>
          <Button variant="outline" onClick={onRetake}>
            <RotateCcw size={15} className="mr-1.5" />
            Retake test
          </Button>
        </CardContent>
      </Card>

      {test.sections.map((section, sectionIndex) => {
        const offset = test.sections
          .slice(0, sectionIndex)
          .reduce((sum, s) => sum + s.questions.length, 0);
        return (
          <div key={section.id} className="space-y-3">
            <h2 className="pt-2 text-[16px] font-bold tracking-tight">{section.title}</h2>
            {section.questions.map((q, questionIndex) => (
              <ResultCard
                key={q.id}
                question={q}
                number={offset + questionIndex + 1}
                answers={answers}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function ResultCard({
  question,
  number,
  answers,
}: {
  question: AssessmentQuestion;
  number: number;
  answers: Answers;
}) {
  if (question.kind === 'short-answer') {
    return (
      <Card>
        <CardContent className="pt-6 space-y-3">
          <ResultHeader
            number={number}
            prompt={question.prompt}
            badge={
              <span className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                <Hourglass size={11} />
                Instructor graded · {question.points} pts
              </span>
            }
          />
          <div className="rounded-lg border border-border bg-muted/40 p-3 text-[13px] leading-relaxed whitespace-pre-wrap">
            {(answers[question.id] as string) || '—'}
          </div>
          <details className="text-[13px]">
            <summary className="cursor-pointer font-semibold text-muted-foreground hover:text-foreground">
              View model answer
            </summary>
            <p className="mt-2 text-muted-foreground leading-relaxed">{question.modelAnswer}</p>
          </details>
        </CardContent>
      </Card>
    );
  }

  const selected = answers[question.id] as number | undefined;
  const correct = selected === question.correctIndex;
  return (
    <Card className={cn(correct ? 'border-green-500/40' : 'border-red-500/40')}>
      <CardContent className="pt-6 space-y-3">
        <ResultHeader
          number={number}
          prompt={question.prompt}
          badge={
            correct ? (
              <span className="flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-green-600 dark:text-green-400">
                <CheckCircle2 size={11} />
                {question.points} / {question.points} pts
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 dark:text-red-400">
                <XCircle size={11} />0 / {question.points} pts
              </span>
            )
          }
        />
        <div className="space-y-1.5">
          {question.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex;
            const isCorrect = optionIndex === question.correctIndex;
            return (
              <div
                key={optionIndex}
                className={cn(
                  'flex items-start gap-2.5 rounded-lg border px-3.5 py-2 text-[13px]',
                  isCorrect
                    ? 'border-green-500/60 bg-green-500/10 font-medium'
                    : isSelected
                      ? 'border-red-500/60 bg-red-500/10'
                      : 'border-border/60 text-muted-foreground'
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green-500" />
                ) : isSelected ? (
                  <XCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
                ) : (
                  <span className="mt-0.5 h-[15px] w-[15px] shrink-0" />
                )}
                <span>
                  {option}
                  {isSelected && (
                    <span className="ml-1.5 text-[11px] font-semibold text-muted-foreground">
                      (your answer)
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-[12.5px] text-muted-foreground leading-relaxed">
          {question.explanation}
        </p>
      </CardContent>
    </Card>
  );
}

function ResultHeader({
  number,
  prompt,
  badge,
}: {
  number: number;
  prompt: string;
  badge: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-[14px] font-medium leading-relaxed">
        {number}. {prompt}
      </p>
      <div className="shrink-0">{badge}</div>
    </div>
  );
}
