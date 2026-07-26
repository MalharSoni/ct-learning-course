import type { Metadata } from 'next';
import { AssessmentRunner } from '@/components/assessments/assessment-runner';
import { v5Unit1Test } from '@/lib/assessment-data';

export const metadata: Metadata = {
  title: v5Unit1Test.title,
};

export default function V5Unit1TestPage() {
  return <AssessmentRunner test={v5Unit1Test} />;
}
