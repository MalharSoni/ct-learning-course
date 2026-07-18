import { NextResponse } from 'next/server';
import { listSubmissions, isDbConfigured } from '@/lib/db';
import { checkKey } from '../route';

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

  const assessmentId = searchParams.get('assessment') || 'v5-foundation-test';
  const rows = await listSubmissions(assessmentId);

  const header = [
    'Name',
    'Auto score',
    'Auto max',
    'Auto %',
    'Passing score',
    'Passed auto',
    'Total max',
    'Submitted at',
  ];
  const lines = [header.join(',')];

  for (const r of rows) {
    const pct = r.auto_max > 0 ? Math.round((r.auto_score / r.auto_max) * 100) : 0;
    // Auto-graded pass check compares MCQ points earned against the full
    // passing score, since short answers are graded by hand afterward.
    const passedAuto = r.auto_score >= r.passing_score ? 'yes' : 'no';
    lines.push(
      [
        csvCell(r.name),
        r.auto_score,
        r.auto_max,
        pct,
        r.passing_score,
        passedAuto,
        r.total_max,
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
