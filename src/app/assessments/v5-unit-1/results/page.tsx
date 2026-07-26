import type { Metadata } from 'next';
import { ResultsBoard } from '@/components/assessments/results-board';
import { v5Unit1Test } from '@/lib/assessment-data';

export const metadata: Metadata = {
  title: 'Unit 1 Test Results',
};

export default function V5Unit1ResultsPage() {
  return <ResultsBoard test={v5Unit1Test} />;
}
