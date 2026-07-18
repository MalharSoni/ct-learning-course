import { NextResponse } from 'next/server';
import { listSubmissions, isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Optional light gate. Set INSTRUCTOR_PASSCODE in the environment to require a
 * matching ?key= on results requests. If it is unset, results are open to
 * anyone with the link (fine for a private deployment, but set it if the site
 * is public).
 */
export function checkKey(searchParams: URLSearchParams): boolean {
  const expected = process.env.INSTRUCTOR_PASSCODE;
  if (!expected) return true;
  return searchParams.get('key') === expected;
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

  try {
    const rows = await listSubmissions(assessmentId);
    return NextResponse.json({
      passcodeRequired: Boolean(process.env.INSTRUCTOR_PASSCODE),
      submissions: rows,
    });
  } catch (err) {
    console.error('Failed to list submissions', err);
    return NextResponse.json(
      { error: 'Could not load submissions.' },
      { status: 500 }
    );
  }
}
