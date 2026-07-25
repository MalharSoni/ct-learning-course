import { NextResponse } from 'next/server';
import { listSubmissions, deleteSubmissions, isDbConfigured } from '@/lib/db';

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

/**
 * Stricter gate for destructive requests. Unlike reads, deleting fails closed:
 * with no passcode configured nobody can delete, because an unset env var
 * should never hand the whole class's work to anyone with the link.
 */
function checkKeyForDelete(searchParams: URLSearchParams): boolean {
  const expected = process.env.INSTRUCTOR_PASSCODE;
  if (!expected) return false;
  return searchParams.get('key') === expected;
}

interface DeleteBody {
  assessmentId?: unknown;
  ids?: unknown;
}

/** Removes selected responses. Body: { assessmentId: string, ids: number[] }. */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!checkKeyForDelete(searchParams)) {
    return NextResponse.json(
      { error: 'The instructor passcode is required to delete responses.' },
      { status: 401 }
    );
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Score storage is not configured on the server.' },
      { status: 503 }
    );
  }

  let body: DeleteBody;
  try {
    body = (await request.json()) as DeleteBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const assessmentId =
    typeof body.assessmentId === 'string' ? body.assessmentId : '';
  // Postgres returns BIGSERIAL ids as strings, so accept either form.
  const ids = Array.isArray(body.ids)
    ? body.ids
        .map((v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v))
        .filter(
          (v): v is number => typeof v === 'number' && Number.isInteger(v) && v > 0
        )
    : [];

  if (!assessmentId) {
    return NextResponse.json({ error: 'Missing assessment id.' }, { status: 400 });
  }
  if (ids.length === 0) {
    return NextResponse.json({ error: 'No responses selected.' }, { status: 400 });
  }
  if (ids.length > 1000) {
    return NextResponse.json(
      { error: 'Too many responses in one request.' },
      { status: 400 }
    );
  }

  try {
    const deleted = await deleteSubmissions(assessmentId, ids);
    return NextResponse.json({ ok: true, deleted });
  } catch (err) {
    console.error('Failed to delete submissions', err);
    return NextResponse.json(
      { error: 'Could not delete the selected responses.' },
      { status: 500 }
    );
  }
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
