import type { Metadata } from 'next';
import { ResultsBoard } from '@/components/assessments/results-board';
import { v5Unit3Test } from '@/lib/assessment-data';

export const metadata: Metadata = {
  title: 'Unit 3 Test Results',
};

export default function V5Unit3ResultsPage() {
  return <ResultsBoard test={v5Unit3Test} />;
}
