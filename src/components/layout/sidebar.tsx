'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, BookOpen, ClipboardCheck, BarChart3, Wrench, Home } from 'lucide-react';
import { learningCourse, projects } from '@/lib/curriculum-data';
import { v5Assessments } from '@/lib/assessment-data';

export function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[280px] border-r border-border bg-card/50 backdrop-blur-xl supports-[backdrop-filter]:bg-card/80 transition-colors"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex h-14 items-center border-b border-border px-5 bg-background/50">
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform hover:scale-105 active:scale-95"
          aria-label="Home - CT Learning Course"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-black text-sm shadow-sm transition-all group-hover:shadow-md group-hover:bg-accent/90">
            CT
          </div>
          <span className="font-bold text-[15px] tracking-tight">Learning Course</span>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <nav className="space-y-1 p-3" aria-label="Course navigation">
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all duration-150',
              pathname === '/'
                ? 'bg-accent text-accent-foreground shadow-sm font-semibold'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.98]'
            )}
          >
            <Home size={16} className={cn(pathname === '/' && 'scale-110')} />
            Home
          </Link>

          <Separator className="my-3" />

          {/* Learning Course Section */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-muted-foreground" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Learning Course
              </h3>
            </div>
          </div>

          {learningCourse.map((category) => (
            <Collapsible
              key={category.id}
              open={openSections[category.id]}
              onOpenChange={() => toggleSection(category.id)}
            >
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[13.5px] font-semibold text-foreground transition-all duration-150 hover:bg-muted active:scale-[0.98]">
                <span className="flex items-center gap-2">
                  {category.title}
                </span>
                <ChevronRight
                  size={14}
                  className={cn(
                    'transition-all duration-200 text-muted-foreground group-hover:text-foreground',
                    openSections[category.id] && 'rotate-90'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-3 mt-1 space-y-1 border-l-2 border-border/60 pl-3 pb-2">
                {category.sections.map((section) => (
                  <Collapsible
                    key={section.id}
                    open={openSections[section.id]}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[13px] font-medium text-muted-foreground transition-all duration-150 hover:bg-muted/50 hover:text-foreground active:scale-[0.98]">
                      {section.title}
                      <ChevronRight
                        size={12}
                        className={cn(
                          'transition-all duration-200',
                          openSections[section.id] && 'rotate-90'
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-2 mt-1 space-y-0.5 pb-1">
                      {section.lessons.map((lesson) => {
                        const lessonPath = `/course/${category.slug}/${section.slug}/${lesson.slug}`;
                        const isActive = pathname === lessonPath;
                        return (
                          <Link
                            key={lesson.id}
                            href={lessonPath}
                            className={cn(
                              'block rounded-md px-2 py-1.5 text-[12.5px] transition-all duration-150',
                              isActive
                                ? 'bg-accent text-accent-foreground font-semibold shadow-sm scale-[1.02]'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground active:scale-[0.98]'
                            )}
                          >
                            {lesson.title}
                          </Link>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}

          <Separator className="my-3" />

          {/* Assessments Section */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={14} className="text-muted-foreground" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Assessments
              </h3>
            </div>
          </div>

          {/* One entry per unit — each unit is its own submission. */}
          {v5Assessments.map((test) => (
            <Link
              key={test.id}
              href={`/assessments/${test.slug}`}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 mb-1',
                pathname === `/assessments/${test.slug}`
                  ? 'bg-accent text-accent-foreground shadow-sm font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.98]'
              )}
            >
              <ClipboardCheck size={14} />
              {test.unitLabel} Test
            </Link>
          ))}

          <Link
            href="/assessments/v5-unit-1/results"
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] font-medium transition-all duration-150 mb-1',
              pathname.endsWith('/results')
                ? 'bg-accent text-accent-foreground shadow-sm font-semibold'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.98]'
            )}
          >
            <BarChart3 size={14} />
            Results (instructor)
          </Link>

          <Separator className="my-3" />

          {/* Projects Section */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <Wrench size={14} className="text-muted-foreground" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Projects
              </h3>
            </div>
          </div>

          <Link
            href="/projects"
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 mb-1',
              pathname === '/projects'
                ? 'bg-accent text-accent-foreground shadow-sm font-semibold'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.98]'
            )}
          >
            <BookOpen size={14} />
            All Projects
          </Link>

          {projects.map((project) => {
            const projectPath = `/projects/${project.slug}`;
            const isActive = pathname === projectPath;

            const difficultyColors = {
              beginner: 'text-green-600 dark:text-green-400',
              intermediate: 'text-amber-600 dark:text-amber-400',
              advanced: 'text-red-600 dark:text-red-400'
            };

            return (
              <Link
                key={project.id}
                href={projectPath}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.98]'
                )}
              >
                <Wrench
                  size={14}
                  className={cn(
                    'transition-colors',
                    !isActive && difficultyColors[project.difficulty as keyof typeof difficultyColors]
                  )}
                />
                <span className="flex-1">{project.title}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
