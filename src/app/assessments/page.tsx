import type { Metadata } from 'next';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Card, CardContent } from '@/components/ui/card';
import {
  assessmentAutoGradedPoints,
  assessmentQuestionCount,
  v5Assessments,
} from '@/lib/assessment-data';
import { ArrowRight, ClipboardList, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'V5 Foundation Tests',
};

export default function AssessmentsIndexPage() {
  return (
    <>
      <Sidebar />
      <Topbar title="V5 Foundation Tests" />
      <main className="ml-[280px] min-h-screen transition-colors" role="main">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8 lg:py-12 space-y-5">
          <div>
            <h1 className="text-[26px] font-black tracking-tight">V5 Foundation Tests</h1>
            <p className="text-[14px] text-muted-foreground mt-1">
              Each unit is submitted separately, so pick the one your instructor assigned. You
              can take them on different days.
            </p>
          </div>

          <div className="space-y-3">
            {v5Assessments.map((test) => {
              const autoMax = assessmentAutoGradedPoints(test);
              return (
                <Card key={test.id} className="overflow-hidden pt-0 transition-shadow hover:shadow-md">
                  <div className="h-2.5 bg-accent" />
                  <CardContent className="pt-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                        {test.unitLabel}
                      </span>
                      <h2 className="text-[18px] font-bold tracking-tight mt-0.5">
                        {test.title}
                      </h2>
                      <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
                        {test.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <ClipboardList size={14} />
                        {test.totalPoints} pts · {test.passingScore} to pass
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {test.timeLimitMinutes} min
                      </span>
                      <span>
                        {assessmentQuestionCount(test)} questions · {autoMax} auto-graded
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Link
                        href={`/assessments/${test.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[13px] font-semibold text-accent-foreground transition-opacity hover:opacity-[.88] active:scale-[.97]"
                      >
                        Start {test.unitLabel} test
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        href={`/assessments/${test.slug}/results`}
                        className="text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Instructor results →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
