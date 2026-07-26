import { NextResponse } from 'next/server';
import { listSubmissions, isDbConfigured } from '@/lib/db';
import { checkKey } from '../route';
import {
  assessmentAutoGradedPoints,
  assessmentShortAnswers,
  assessmentWrittenPoints,
  v5Assessments,
  writtenScore,
} from '@/lib/assessment-data';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function csvCell(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!checkKey(searchParams)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Score storage is not configured on the server.' },
      { status: 503 }
    );
  }

  const assessmentId = searchParams.get('assessment') || 'v5-unit-1-cad';
  const rows = await listSubmissions(assessmentId);
  const test = v5Assessments.find((a) => a.id === assessmentId);
  const shortAnswers = test ? assessmentShortAnswers(test) : [];

  const header = [
    'Name',
    'Multiple choice',
    'Multiple choice max',
    ...shortAnswers.map((q) => `Q${q.id} mark (max ${q.points})`),
    'Written total',
    'Written max',
    'Final score',
    'Total max',
    'Final %',
    'Passing score',
    'Result',
    'Submitted at',
  ];
  const lines = [header.join(',')];

  for (const r of rows) {
    const written = test ? writtenScore(test, r.manual_scores) : null;
    const totalMax = test?.totalPoints ?? r.total_max;
    const passing = test?.passingScore ?? r.passing_score;
    // A paper has no result until every written answer carries a mark, so an
    // unfinished one says so rather than reporting a fail it has not earned.
    const final = written ? r.auto_score + written.total : null;
    const complete = Boolean(written?.complete);

    lines.push(
      [
        csvCell(r.name),
        r.auto_score,
        test ? assessmentAutoGradedPoints(test) : r.auto_max,
        ...shortAnswers.map((q) => {
          const v = r.manual_scores?.[q.id];
          return typeof v === 'number' ? v : '';
        }),
        written ? written.total : '',
        test ? assessmentWrittenPoints(test) : '',
        complete && final !== null ? final : '',
        totalMax,
        complete && final !== null && totalMax > 0
          ? Math.round((final / totalMax) * 100)
          : '',
        passing,
        complete && final !== null ? (final >= passing ? 'pass' : 'fail') : 'not marked',
        csvCell(new Date(r.created_at).toISOString()),
      ].join(',')
    );
  }

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${assessmentId}-results.csv"`,
    },
  });
}
