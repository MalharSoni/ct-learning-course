import type { Metadata } from 'next';
import { AssessmentRunner } from '@/components/assessments/assessment-runner';
import { v5Unit3Test } from '@/lib/assessment-data';

export const metadata: Metadata = {
  title: v5Unit3Test.title,
};

export default function V5Unit3TestPage() {
  return <AssessmentRunner test={v5Unit3Test} />;
}
