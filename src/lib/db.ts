import { sql } from '@vercel/postgres';

export interface SubmissionRow {
  id: number;
  name: string;
  assessment_id: string;
  auto_score: number;
  auto_max: number;
  total_max: number;
  passing_score: number;
  answers: Record<string, number | string>;
  created_at: string;
}

/**
 * True when a Postgres connection string is configured. The Vercel Postgres
 * integration sets POSTGRES_URL automatically; locally you can copy it into
 * .env.local. When absent, the API routes return a clear 503 instead of
 * throwing an opaque connection error.
 */
export function isDbConfigured(): boolean {
  return Boolean(
    process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL
  );
}

let ensured = false;

async function ensureTable(): Promise<void> {
  if (ensured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS assessment_submissions (
      id            BIGSERIAL PRIMARY KEY,
      name          TEXT NOT NULL,
      assessment_id TEXT NOT NULL,
      auto_score    INTEGER NOT NULL,
      auto_max      INTEGER NOT NULL,
      total_max     INTEGER NOT NULL,
      passing_score INTEGER NOT NULL,
      answers       JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  ensured = true;
}

export interface NewSubmission {
  name: string;
  assessmentId: string;
  autoScore: number;
  autoMax: number;
  totalMax: number;
  passingScore: number;
  answers: Record<string, number | string>;
}

export async function insertSubmission(sub: NewSubmission): Promise<number> {
  await ensureTable();
  const result = await sql<{ id: number }>`
    INSERT INTO assessment_submissions
      (name, assessment_id, auto_score, auto_max, total_max, passing_score, answers)
    VALUES (
      ${sub.name},
      ${sub.assessmentId},
      ${sub.autoScore},
      ${sub.autoMax},
      ${sub.totalMax},
      ${sub.passingScore},
      ${JSON.stringify(sub.answers)}::jsonb
    )
    RETURNING id
  `;
  return result.rows[0].id;
}

export async function listSubmissions(
  assessmentId: string
): Promise<SubmissionRow[]> {
  await ensureTable();
  const result = await sql<SubmissionRow>`
    SELECT id, name, assessment_id, auto_score, auto_max, total_max,
           passing_score, answers, created_at
    FROM assessment_submissions
    WHERE assessment_id = ${assessmentId}
    ORDER BY created_at DESC
  `;
  return result.rows;
}
