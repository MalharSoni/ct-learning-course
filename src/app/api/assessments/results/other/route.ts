import { NextResponse } from 'next/server';
import { listOtherSubmissions, isDbConfigured } from '@/lib/db';
import { v5Assessments } from '@/lib/assessment-data';
import { checkKey } from '../route';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Responses stored against a test that is no longer in the app. Kept separate
 * from the per-unit boards so old rows never distort a unit's statistics.
 */
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

  try {
    const rows = await listOtherSubmissions(v5Assessments.map((a) => a.id));
    return NextResponse.json({
      submissions: rows.map((r) => ({
        id: r.id,
        name: r.name,
        assessment_id: r.assessment_id,
        auto_score: r.auto_score,
        auto_max: r.auto_max,
        created_at: r.created_at,
      })),
    });
  } catch (err) {
    console.error('Failed to list other submissions', err);
    return NextResponse.json(
      { error: 'Could not load older responses.' },
      { status: 500 }
    );
  }
}
