import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <>
      <Sidebar />
      <Topbar title="Getting Started" />
      <ContentWrapper>
        <div className="space-y-8">
          <div>
            <h1 className="text-[32px] font-black tracking-tight mb-3">
              Getting Started with STEM
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-3xl">
              Welcome to the CT Learning Course! This module introduces you to STEM fields,
              the engineering design process, and how to approach technical problem-solving.
            </p>
          </div>

          <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-400">Module Overview</CardTitle>
            </CardHeader>
            <CardContent className="text-[14px] space-y-3">
              <p>
                <strong>Duration:</strong> 1 week
              </p>
              <p>
                <strong>Topics Covered:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
                <li>What is STEM and why it matters</li>
                <li>STEM careers and opportunities</li>
                <li>Engineering Design Process (EDP)</li>
                <li>Problem-solving and critical thinking</li>
                <li>How to document technical work for portfolios</li>
              </ul>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-[24px] font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Lessons in This Module
            </h2>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-[18px]">Lesson 1: What is STEM?</CardTitle>
                      <CardDescription className="text-[13px]">
                        Explore the four pillars of STEM (Science, Technology, Engineering, Mathematics)
                        and how they interconnect in modern careers and innovation.
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/course/getting-started/intro-to-stem/what-is-stem">
                        Start
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-[18px]">Lesson 2: STEM Careers & Opportunities</CardTitle>
                      <CardDescription className="text-[13px]">
                        Discover the vast landscape of STEM careers, from robotics engineering to software
                        development, and how your skills apply to real-world jobs.
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/course/getting-started/intro-to-stem/stem-careers">
                        Start
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-[18px]">Lesson 3: Engineering Design Process</CardTitle>
                      <CardDescription className="text-[13px]">
                        Master the iterative problem-solving framework used by professional engineers:
                        Define, Research, Ideate, Prototype, Test, and Iterate.
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/course/getting-started/intro-to-stem/engineering-design-process">
                        Start
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-[18px]">Lesson 4: Problem Solving & Critical Thinking</CardTitle>
                      <CardDescription className="text-[13px]">
                        Develop systematic approaches to technical challenges, learn debugging strategies,
                        and cultivate a growth mindset for tackling complex problems.
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/course/getting-started/intro-to-stem/problem-solving">
                        Start
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </section>

          <div className="flex items-center justify-between pt-8 border-t border-border">
            <Button variant="outline" asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
            <Button asChild>
              <Link href="/course/getting-started/intro-to-stem/what-is-stem">
                Start First Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
