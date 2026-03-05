import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Wrench, Target, GraduationCap, Trophy } from 'lucide-react';
import Link from 'next/link';
import { learningCourse, projects } from '@/lib/curriculum-data';

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <Topbar title="Caution Tape Robotics - Learning Course" />
      <ContentWrapper>
        <div className="space-y-24">
          {/* Hero Section - Supabase Style */}
          <div className="relative -mt-8 -mx-8 px-8 pt-16 pb-20 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(62,207,142,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            <div className="relative space-y-8 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent border border-accent/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                VEX V5 Robotics & STEM Education
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.05]">
                Build Your Future with{' '}
                <span className="bg-gradient-to-r from-accent via-accent to-accent/70 bg-clip-text text-transparent">
                  Robotics
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                A comprehensive STEM learning platform for high school students. Master VEX V5 robotics,
                CAD design, programming, and build portfolio projects that matter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 text-base px-8"
                >
                  <Link href="/course/getting-started">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-base px-8"
                >
                  <Link href="/projects">
                    Explore Projects
                    <Wrench className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <Card className="border-t-[3px] border-t-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-[17px] font-bold">Structured Learning</CardTitle>
                <CardDescription className="text-[14px] leading-relaxed">
                  Progressive curriculum from safety basics to advanced competition-level techniques
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-[3px] border-t-green-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group md:delay-75">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-[17px] font-bold">Hands-On Projects</CardTitle>
                <CardDescription className="text-[14px] leading-relaxed">
                  Real-world STEM projects including BattleBots, robotic arms, and IoT systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-[3px] border-t-amber-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group md:delay-150">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="text-[17px] font-bold">Portfolio Building</CardTitle>
                <CardDescription className="text-[14px] leading-relaxed">
                  Document and showcase your projects for college applications and career opportunities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Learning Path */}
          <div className="space-y-7 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-[28px] font-black tracking-tight">Learning Path</h2>
            </div>

            <div className="space-y-4">
              {learningCourse.slice(0, 4).map((category, index) => (
                <Card
                  key={category.id}
                  className="hover:shadow-md transition-all duration-300 hover:border-accent/50 group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground font-black text-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                          </span>
                          <CardTitle className="text-[19px] font-bold">{category.title}</CardTitle>
                        </div>
                        <CardDescription className="text-[14px] ml-12 leading-relaxed">
                          {category.description}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <Link href={`/course/${category.slug}`}>
                          Start
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="ml-12 flex flex-wrap gap-2">
                      {category.sections.slice(0, 3).map((section) => (
                        <span
                          key={section.id}
                          className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-[11.5px] font-semibold text-muted-foreground hover:bg-muted-foreground/10 transition-colors"
                        >
                          {section.title}
                        </span>
                      ))}
                      {category.sections.length > 3 && (
                        <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-[11.5px] font-semibold text-muted-foreground">
                          +{category.sections.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              asChild
              className="w-full sm:w-auto font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              size="lg"
            >
              <Link href="/course/getting-started">
                Begin Learning Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Featured Projects */}
          <div className="space-y-7 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-[28px] font-black tracking-tight">Featured Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.slice(0, 4).map((project, idx) => (
                <Card
                  key={project.id}
                  className="flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  style={{ animationDelay: `${idx * 75}ms` }}
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-[17px] font-bold group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide shrink-0 ${
                          project.difficulty === 'beginner'
                            ? 'bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-400'
                            : project.difficulty === 'intermediate'
                            ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400'
                            : 'bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-400'
                        }`}
                      >
                        {project.difficulty}
                      </span>
                    </div>
                    <CardDescription className="text-[14px] leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] text-muted-foreground font-medium flex items-center gap-1.5">
                        <span className="text-accent">⏱️</span> {project.estimatedTime}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <Link href={`/projects/${project.slug}`}>
                          View Project
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95"
              size="lg"
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Getting Started */}
          <Card className="bg-gradient-to-br from-accent via-accent to-accent/90 text-accent-foreground border-accent shadow-xl animate-in fade-in slide-in-from-bottom-12 duration-700 delay-700 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            <CardHeader className="relative space-y-3">
              <CardTitle className="text-[24px] font-black tracking-tight">
                Ready to Start Building?
              </CardTitle>
              <CardDescription className="text-accent-foreground/90 text-[15px] leading-relaxed font-medium">
                Whether you&apos;re a complete beginner or have some robotics experience, our curriculum
                adapts to your skill level. Start with the fundamentals or jump into a project that
                excites you.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  asChild
                  size="lg"
                  className="font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Link href="/course/getting-started/intro-to-stem/what-is-stem">
                    Start from the Beginning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                  asChild
                >
                  <Link href="/projects/battlebots">
                    Jump to BattleBots Project
                    <Trophy className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentWrapper>
    </>
  );
}
