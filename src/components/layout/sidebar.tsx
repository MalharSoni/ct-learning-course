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
import { ChevronRight, BookOpen, Wrench } from 'lucide-react';
import { learningCourse, projects } from '@/lib/curriculum-data';

export function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-border bg-card">
      <div className="flex h-14 items-center border-b border-border px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
            CT
          </div>
          <span className="font-bold text-[15px]">Learning Course</span>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="space-y-1 p-3">
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2.5 rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors',
              pathname === '/'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
            )}
          >
            <BookOpen size={16} />
            Home
          </Link>

          <Separator className="my-3" />

          {/* Learning Course Section */}
          <div className="px-3 py-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Learning Course
            </h3>
          </div>

          {learningCourse.map((category) => (
            <Collapsible
              key={category.id}
              open={openSections[category.id]}
              onOpenChange={() => toggleSection(category.id)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-[13.5px] font-semibold text-foreground transition-colors hover:bg-accent/50">
                {category.title}
                <ChevronRight
                  size={14}
                  className={cn(
                    'transition-transform',
                    openSections[category.id] && 'rotate-90'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-3 mt-1 space-y-1 border-l-2 border-border pl-2">
                {category.sections.map((section) => (
                  <Collapsible
                    key={section.id}
                    open={openSections[section.id]}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent/30 hover:text-foreground">
                      {section.title}
                      <ChevronRight
                        size={12}
                        className={cn(
                          'transition-transform',
                          openSections[section.id] && 'rotate-90'
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-2 mt-1 space-y-0.5">
                      {section.lessons.map((lesson) => {
                        const lessonPath = `/course/${category.slug}/${section.slug}/${lesson.slug}`;
                        const isActive = pathname === lessonPath;
                        return (
                          <Link
                            key={lesson.id}
                            href={lessonPath}
                            className={cn(
                              'block rounded-md px-2 py-1.5 text-[12.5px] transition-colors',
                              isActive
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-muted-foreground hover:bg-accent/20 hover:text-foreground'
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

          {/* Projects Section */}
          <div className="px-3 py-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Projects
            </h3>
          </div>

          {projects.map((project) => {
            const projectPath = `/projects/${project.slug}`;
            const isActive = pathname === projectPath;
            return (
              <Link
                key={project.id}
                href={projectPath}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                <Wrench size={14} />
                {project.title}
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
