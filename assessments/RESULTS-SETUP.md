# Centralized Score Collection — Setup

Student multiple-choice scores are saved to a **Vercel Postgres** database and
shown on the instructor dashboard at `/assessments/v5-foundation-test/results`.

## What happens automatically

- Students enter their **full name** on the intro screen before starting.
- On submit, the auto-graded multiple-choice score is POSTed to
  `/api/assessments/submit` and stored in the `assessment_submissions` table
  (created automatically on first write).
- The instructor dashboard lists every submission with score, percentage,
  pass/fail against the cutoff, and submission time — searchable, sortable, and
  exportable to CSV.

Short-answer points are **not** auto-scored; grade those by hand. The dashboard's
pass/fail badge reflects only the multiple-choice cutoff.

## One-time setup on Vercel

1. In your Vercel project: **Storage → Create Database → Postgres**, and connect
   it to this project. Vercel injects the connection env vars automatically
   (`POSTGRES_URL`, etc.) on the next deploy — no code changes needed.
2. Redeploy. The table is created on the first student submission.

### Optional: protect the results page

Set an environment variable **`INSTRUCTOR_PASSCODE`** to any secret string.
When set, the dashboard and CSV export require that passcode. If unset, results
are visible to anyone with the link (fine for an unlisted/private deployment).

## Running locally

Add the connection string to `.env.local` (copy it from the Vercel dashboard,
Storage → your DB → `.env.local` tab):

```
POSTGRES_URL="postgres://..."
# optional
INSTRUCTOR_PASSCODE="choose-a-passcode"
```

Without `POSTGRES_URL`, the quiz still works and grades locally, but submissions
can't be saved — the student sees a "could not be saved" note and the dashboard
shows a "storage not configured" message.

## Data model

`assessment_submissions`:

| column        | type        | notes                                  |
|---------------|-------------|----------------------------------------|
| id            | bigserial   | primary key                            |
| name          | text        | student full name                      |
| assessment_id | text        | e.g. `v5-foundation-test`              |
| auto_score    | int         | multiple-choice points earned          |
| auto_max      | int         | max auto-graded points (68)            |
| total_max     | int         | full test points (100)                 |
| passing_score | int         | cutoff (80)                            |
| answers       | jsonb       | per-question responses                 |
| created_at    | timestamptz | submission time                        |
