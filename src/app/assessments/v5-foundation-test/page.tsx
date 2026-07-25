import { redirect } from 'next/navigation';

/**
 * The single combined test was split into a per-unit test in July 2026. Links
 * to the old URL are already out with students, so keep them working by
 * sending them to the picker.
 */
export default function LegacyV5FoundationTestPage() {
  redirect('/assessments');
}
