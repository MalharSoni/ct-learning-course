import { NextResponse } from 'next/server';
import {
  listSubmissions,
  deleteSubmissions,
  setManualScore,
  isDbConfigured,
} from '@/lib/db';
import { v5Assessments } from '@/lib/assessment-data';

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

interface MarkBody {
  assessmentId?: unknown;
  id?: unknown;
  questionId?: unknown;
  points?: unknown;
}

/**
 * Records one instructor mark on one short answer.
 * Body: { assessmentId, id, questionId, points }, where points is a number or
 * null to clear the mark.
 *
 * Like delete, this fails closed when no passcode is configured: marks decide
 * whether a student passed, so they should never be writable by anyone holding
 * the link.
 */
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!checkKeyForDelete(searchParams)) {
    return NextResponse.json(
      { error: 'The instructor passcode is required to save marks.' },
      { status: 401 }
    );
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Score storage is not configured on the server.' },
      { status: 503 }
    );
  }

  let body: MarkBody;
  try {
    body = (await request.json()) as MarkBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const assessmentId =
    typeof body.assessmentId === 'string' ? body.assessmentId : '';
  const id =
    typeof body.id === 'number'
      ? body.id
      : typeof body.id === 'string'
        ? Number(body.id)
        : NaN;
  const questionId =
    typeof body.questionId === 'string' ? body.questionId : '';

  const test = v5Assessments.find((a) => a.id === assessmentId);
  if (!test) {
    return NextResponse.json({ error: 'Unknown test.' }, { status: 400 });
  }
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid response id.' }, { status: 400 });
  }

  // The question has to be a hand-marked one on this test. That rules out
  // marks landing on a multiple-choice question, which is scored on submit,
  // and on a question belonging to some other unit.
  const question = test.sections
    .flatMap((s) => s.questions)
    .find((q) => q.id === questionId && q.kind === 'short-answer');
  if (!question) {
    return NextResponse.json(
      { error: 'That question is not marked by hand on this test.' },
      { status: 400 }
    );
  }

  let points: number | null;
  if (body.points === null) {
    points = null;
  } else if (typeof body.points === 'number' && Number.isFinite(body.points)) {
    points = body.points;
    if (points < 0 || points > question.points) {
      return NextResponse.json(
        { error: `Marks for this question run from 0 to ${question.points}.` },
        { status: 400 }
      );
    }
    // Half marks are allowed, finer slices are not.
    if (Math.round(points * 2) !== points * 2) {
      return NextResponse.json(
        { error: 'Marks go in steps of 0.5.' },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ error: 'Invalid mark.' }, { status: 400 });
  }

  try {
    const manualScores = await setManualScore(assessmentId, id, questionId, points);
    if (manualScores === null) {
      return NextResponse.json(
        { error: 'That response no longer exists.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, manualScores });
  } catch (err) {
    console.error('Failed to save mark', err);
    return NextResponse.json({ error: 'Could not save the mark.' }, { status: 500 });
  }
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
