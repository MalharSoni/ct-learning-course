'use client';

import { Button } from '@/components/ui/button';
import { Github, Menu } from 'lucide-react';

interface TopbarProps {
  title?: string;
}

export function Topbar({ title = 'Learning Course' }: TopbarProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu size={20} />
        </Button>
        <h1 className="text-[20px] font-extrabold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <a
            href="https://github.com/your-org/ct-learning-course"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
