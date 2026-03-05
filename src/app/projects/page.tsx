import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Clock } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/curriculum-data';

export default function ProjectsPage() {
  return (
    <>
      <Sidebar />
      <Topbar title="Projects" />
      <ContentWrapper>
        <div className="space-y-8">
          <div>
            <h1 className="text-[32px] font-black tracking-tight mb-3">
              Hands-On STEM Projects
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-3xl">
              Build your technical portfolio with real-world projects that combine robotics, programming,
              3D printing, and electronics. Each project includes detailed phases, learning objectives,
              and portfolio deliverables.
            </p>
          </div>

          <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Target className="h-5 w-5" />
                How to Choose a Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[14px] space-y-3">
              <p>Select projects based on:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
                <li><strong>Difficulty Level:</strong> Match your current skill level (Beginner, Intermediate, Advanced)</li>
                <li><strong>Time Commitment:</strong> Consider how much time you have (2-8 weeks)</li>
                <li><strong>Interest Area:</strong> Choose topics that excite you (combat robots, AI, IoT, etc.)</li>
                <li><strong>Portfolio Goals:</strong> Select projects that align with your college/career interests</li>
              </ul>
              <p className="font-semibold mt-4">
                We recommend starting with <Link href="/projects/battlebots" className="text-blue-600 hover:underline">BattleBots</Link> or <Link href="/projects/line-follower" className="text-blue-600 hover:underline">Line Follower</Link>!
              </p>
            </CardContent>
          </Card>

          {/* Filter by Difficulty */}
          <section>
            <h2 className="text-[24px] font-bold mb-4">Beginner Projects (2-3 weeks)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.filter(p => p.difficulty === 'beginner').map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-[18px]">{project.title}</CardTitle>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-800">
                        Beginner
                      </span>
                    </div>
                    <CardDescription className="text-[13px]">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-3">
                    <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {project.estimatedTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        View Project Details
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4">Intermediate Projects (3-6 weeks)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.filter(p => p.difficulty === 'intermediate').map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-[18px]">{project.title}</CardTitle>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800">
                        Intermediate
                      </span>
                    </div>
                    <CardDescription className="text-[13px]">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-3">
                    <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {project.estimatedTime}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.prerequisites.slice(0, 2).map((prereq) => (
                          <span
                            key={prereq}
                            className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-400"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        View Project Details
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4">Advanced Projects (6-8 weeks)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.filter(p => p.difficulty === 'advanced').map((project) => (
                <Card key={project.id} className="flex flex-col border-l-2 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-[18px]">{project.title}</CardTitle>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-red-100 text-red-800">
                        Advanced
                      </span>
                    </div>
                    <CardDescription className="text-[13px]">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-3">
                    <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {project.estimatedTime}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.prerequisites.map((prereq) => (
                          <span
                            key={prereq}
                            className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-400"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        View Project Details
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Card className="bg-primary text-primary-foreground border-primary">
            <CardHeader>
              <CardTitle className="text-[20px]">Ready to Start Your First Project?</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-[14px]">
                Choose a project that excites you and begin building your technical portfolio!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" asChild>
                  <Link href="/projects/battlebots">
                    Start with BattleBots
                  </Link>
                </Button>
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/course/getting-started">Review Learning Modules First</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentWrapper>
    </>
  );
}
