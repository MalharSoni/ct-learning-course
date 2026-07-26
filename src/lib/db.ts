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
  /** Instructor marks for short answers, keyed by question id. */
  manual_scores: Record<string, number>;
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
  // Added after the first cohort had already submitted. Adding a column with a
  // default cannot touch existing answers or scores: every row that is already
  // there simply starts out with no marks recorded.
  await sql`
    ALTER TABLE assessment_submissions
    ADD COLUMN IF NOT EXISTS manual_scores JSONB NOT NULL DEFAULT '{}'::jsonb
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

/**
 * Rows left behind by tests that no longer exist, such as the combined V5
 * Foundation test before it was split per unit. Nothing else lists these, so
 * without this they would sit in the table forever with no way to clear them.
 */
export async function listOtherSubmissions(
  knownAssessmentIds: string[]
): Promise<SubmissionRow[]> {
  await ensureTable();
  const result = await sql.query<SubmissionRow>(
    `SELECT id, name, assessment_id, auto_score, auto_max, total_max,
            passing_score, answers, manual_scores, created_at
     FROM assessment_submissions
     WHERE NOT (assessment_id = ANY($1::text[]))
     ORDER BY created_at DESC`,
    [knownAssessmentIds]
  );
  return result.rows;
}

/**
 * Permanently removes the given submissions. Scoped to one assessment as well
 * as the ids, so a stale id from another unit cannot be deleted by accident.
 * Returns how many rows actually went, which may be fewer than the ids asked
 * for if someone already deleted them in another tab.
 */
export async function deleteSubmissions(
  assessmentId: string,
  ids: number[]
): Promise<number> {
  await ensureTable();
  if (ids.length === 0) return 0;
  const result = await sql.query(
    `DELETE FROM assessment_submissions
     WHERE assessment_id = $1 AND id = ANY($2::bigint[])`,
    [assessmentId, ids]
  );
  return result.rowCount ?? 0;
}

export async function listSubmissions(
  assessmentId: string
): Promise<SubmissionRow[]> {
  await ensureTable();
  const result = await sql<SubmissionRow>`
    SELECT id, name, assessment_id, auto_score, auto_max, total_max,
           passing_score, answers, manual_scores, created_at
    FROM assessment_submissions
    WHERE assessment_id = ${assessmentId}
    ORDER BY created_at DESC
  `;
  return result.rows;
}

/**
 * Records or clears one instructor mark on one submission. Pass null for points
 * to remove a mark that was entered by mistake, which is not the same as a mark
 * of zero: zero is a graded answer worth nothing, absent means not yet read.
 *
 * Only the one key changes. Marks on the other questions, and the student's own
 * answers, are never rewritten, so two people marking different questions on
 * the same paper cannot overwrite each other.
 */
export async function setManualScore(
  assessmentId: string,
  id: number,
  questionId: string,
  points: number | null
): Promise<Record<string, number> | null> {
  await ensureTable();
  const result =
    points === null
      ? await sql<{ manual_scores: Record<string, number> }>`
          UPDATE assessment_submissions
          SET manual_scores = manual_scores - ${questionId}
          WHERE id = ${id} AND assessment_id = ${assessmentId}
          RETURNING manual_scores
        `
      : await sql<{ manual_scores: Record<string, number> }>`
          UPDATE assessment_submissions
          SET manual_scores =
            manual_scores || jsonb_build_object(${questionId}::text, ${points}::numeric)
          WHERE id = ${id} AND assessment_id = ${assessmentId}
          RETURNING manual_scores
        `;
  return result.rows[0]?.manual_scores ?? null;
}
