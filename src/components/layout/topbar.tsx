'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { Github, Menu, Moon, Sun } from 'lucide-react';

interface TopbarProps {
  title?: string;
}

export function Topbar({ title = 'Learning Course' }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 ml-[280px] transition-colors">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu size={20} />
        </Button>
        <h1 className="text-[20px] font-extrabold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 transition-transform hover:scale-105 active:scale-95"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon size={18} className="transition-all" />
          ) : (
            <Sun size={18} className="transition-all" />
          )}
        </Button>

        <Button variant="outline" size="sm" asChild>
          <a
            href="https://github.com/your-org/ct-learning-course"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
