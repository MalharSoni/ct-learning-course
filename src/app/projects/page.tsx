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
        <div className="space-y-12">
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent-foreground border border-accent/20">
              <Wrench className="h-3.5 w-3.5" />
              Portfolio Projects
            </div>
            <h1 className="text-[42px] font-black tracking-tighter leading-[1.1] bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Hands-On STEM Projects
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-3xl font-medium">
              Build your technical portfolio with real-world projects that combine robotics, programming,
              3D printing, and electronics. Each project includes detailed phases, learning objectives,
              and portfolio deliverables.
            </p>
          </div>

          <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2 text-[18px] font-bold">
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                  <Target className="h-5 w-5" />
                </div>
                How to Choose a Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[14px] space-y-4 leading-relaxed">
              <p className="font-medium text-blue-900 dark:text-blue-300">Select projects based on:</p>
              <ul className="space-y-2 ml-2">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong className="text-blue-900 dark:text-blue-300">Difficulty Level:</strong> <span className="text-muted-foreground">Match your current skill level (Beginner, Intermediate, Advanced)</span></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong className="text-blue-900 dark:text-blue-300">Time Commitment:</strong> <span className="text-muted-foreground">Consider how much time you have (2-8 weeks)</span></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong className="text-blue-900 dark:text-blue-300">Interest Area:</strong> <span className="text-muted-foreground">Choose topics that excite you (combat robots, AI, IoT, etc.)</span></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong className="text-blue-900 dark:text-blue-300">Portfolio Goals:</strong> <span className="text-muted-foreground">Select projects that align with your college/career interests</span></span>
                </li>
              </ul>
              <p className="font-semibold mt-4 text-blue-900 dark:text-blue-300">
                We recommend starting with <Link href="/projects/battlebots" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">BattleBots</Link> or <Link href="/projects/line-follower" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Line Follower</Link>!
              </p>
            </CardContent>
          </Card>

          {/* Filter by Difficulty */}
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="text-[26px] font-black tracking-tight">Beginner Projects (2-3 weeks)</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {projects.filter(p => p.difficulty === 'beginner').map((project, idx) => (
                <Card
                  key={project.id}
                  className="flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-l-2 border-l-green-500"
                  style={{ animationDelay: `${idx * 75}ms` }}
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-[19px] font-bold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-400 shrink-0">
                        Beginner
                      </span>
                    </div>
                    <CardDescription className="text-[14px] leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-4">
                    <div className="flex items-center gap-4 text-[13px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-green-500" />
                        {project.estimatedTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-lg bg-muted px-2.5 py-1 text-[11.5px] font-semibold text-muted-foreground hover:bg-muted-foreground/10 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-semibold"
                      asChild
                    >
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
