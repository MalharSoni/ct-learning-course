import { redirect } from 'next/navigation';

/** Legacy results URL — the boards are now per unit and link across to each other. */
export default function LegacyV5FoundationResultsPage() {
  redirect('/assessments/v5-unit-1/results');
}
