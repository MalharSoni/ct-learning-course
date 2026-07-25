'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClipboardCheck, BarChart3 } from 'lucide-react';
import { v5Assessments } from '@/lib/assessment-data';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[280px] border-r border-border bg-card/50 backdrop-blur-xl supports-[backdrop-filter]:bg-card/80 transition-colors"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex h-14 items-center border-b border-border px-5 bg-background/50">
        <Link
          href="/assessments"
          className="flex items-center gap-2.5 group transition-transform hover:scale-105 active:scale-95"
          aria-label="V5 Foundation Tests"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-black text-sm shadow-sm transition-all group-hover:shadow-md group-hover:bg-accent/90">
            CT
          </div>
          <span className="font-bold text-[15px] tracking-tight">V5 Foundation</span>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <nav className="space-y-1 p-3" aria-label="Test navigation">
          {/* Tests only. The learning-course and projects nav is parked until
              those lessons exist as real pages. */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={14} className="text-muted-foreground" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Tests
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
        </nav>
      </ScrollArea>
    </aside>
  );
}
