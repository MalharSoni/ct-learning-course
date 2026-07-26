import { NextResponse } from 'next/server';
import { insertSubmission, isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface SubmitBody {
  name?: unknown;
  assessmentId?: unknown;
  autoScore?: unknown;
  autoMax?: unknown;
  totalMax?: unknown;
  passingScore?: unknown;
  answers?: unknown;
}

function asInt(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.round(value)
    : null;
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Score storage is not configured on the server.' },
      { status: 503 }
    );
  }

  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const assessmentId =
    typeof body.assessmentId === 'string' ? body.assessmentId : '';
  const autoScore = asInt(body.autoScore);
  const autoMax = asInt(body.autoMax);
  const totalMax = asInt(body.totalMax);
  const passingScore = asInt(body.passingScore);
  const answers =
    body.answers && typeof body.answers === 'object'
      ? (body.answers as Record<string, number | string>)
      : {};

  if (!name || name.length > 120) {
    return NextResponse.json(
      { error: 'A valid full name is required.' },
      { status: 400 }
    );
  }
  if (
    !assessmentId ||
    autoScore === null ||
    autoMax === null ||
    totalMax === null ||
    passingScore === null
  ) {
    return NextResponse.json(
      { error: 'Missing required score fields.' },
      { status: 400 }
    );
  }

  try {
    const id = await insertSubmission({
      name,
      assessmentId,
      autoScore,
      autoMax,
      totalMax,
      passingScore,
      answers,
    });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('Failed to store submission', err);
    return NextResponse.json(
      { error: 'Could not save the submission.' },
      { status: 500 }
    );
  }
}
