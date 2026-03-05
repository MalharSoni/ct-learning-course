import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Wrench, Target, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { learningCourse, projects } from '@/lib/curriculum-data';

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <Topbar title="Caution Tape Robotics - Learning Course" />
      <ContentWrapper>
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-[32px] font-black tracking-tight">
              Welcome to CT Learning Course
            </h1>
            <p className="text-[16px] text-muted-foreground leading-relaxed max-w-3xl">
              A comprehensive STEM learning platform designed for high school students (grades 9-12).
              Master VEX V5 robotics, CAD design, programming, and work on exciting hands-on projects
              that build your technical portfolio.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="border-t-[3px] border-t-blue-500">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle className="text-[16px]">Structured Learning</CardTitle>
                <CardDescription className="text-[13px]">
                  Progressive curriculum from safety basics to advanced competition-level techniques
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-[3px] border-t-green-500">
              <CardHeader>
                <Wrench className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle className="text-[16px]">Hands-On Projects</CardTitle>
                <CardDescription className="text-[13px]">
                  Real-world STEM projects including BattleBots, robotic arms, and IoT systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-t-[3px] border-t-amber-500">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-amber-500 mb-2" />
                <CardTitle className="text-[16px]">Portfolio Building</CardTitle>
                <CardDescription className="text-[13px]">
                  Document and showcase your projects for college applications and career opportunities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Learning Path */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-[24px] font-bold">Learning Path</h2>
            </div>

            <div className="space-y-4">
              {learningCourse.slice(0, 4).map((category, index) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                            {index + 1}
                          </span>
                          <CardTitle className="text-[18px]">{category.title}</CardTitle>
                        </div>
                        <CardDescription className="text-[13px] ml-11">
                          {category.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/course/${category.slug}`}>
                          Start
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="ml-11 flex flex-wrap gap-2">
                      {category.sections.slice(0, 3).map((section) => (
                        <span
                          key={section.id}
                          className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                        >
                          {section.title}
                        </span>
                      ))}
                      {category.sections.length > 3 && (
                        <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                          +{category.sections.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button asChild className="w-full sm:w-auto">
              <Link href="/course/getting-started">
                Begin Learning Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Featured Projects */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-primary" />
              <h2 className="text-[24px] font-bold">Featured Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.slice(0, 4).map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-[16px]">{project.title}</CardTitle>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          project.difficulty === 'beginner'
                            ? 'bg-green-100 text-green-800'
                            : project.difficulty === 'intermediate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {project.difficulty}
                      </span>
                    </div>
                    <CardDescription className="text-[13px]">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-muted-foreground">
                        ⏱️ {project.estimatedTime}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.slug}`}>View Project</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>

          {/* Getting Started */}
          <Card className="bg-primary text-primary-foreground border-primary">
            <CardHeader>
              <CardTitle className="text-[20px]">Ready to Start Building?</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-[14px]">
                Whether you&apos;re a complete beginner or have some robotics experience, our curriculum
                adapts to your skill level. Start with the fundamentals or jump into a project that
                excites you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" asChild>
                  <Link href="/course/getting-started/intro-to-stem/what-is-stem">
                    Start from the Beginning
                  </Link>
                </Button>
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/projects/battlebots">Jump to BattleBots Project</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentWrapper>
    </>
  );
}
