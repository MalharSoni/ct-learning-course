import { ReactNode } from 'react';

interface ContentWrapperProps {
  children: ReactNode;
}

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <main className="ml-[280px] min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12 lg:py-12">
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-[28px] prose-h1:tracking-tight prose-h2:text-[22px] prose-h2:mt-10 prose-h3:text-[18px] prose-p:text-[14px] prose-p:leading-relaxed prose-li:text-[14px] prose-code:text-[13px] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-muted prose-pre:border prose-pre:border-border">
          {children}
        </article>
      </div>
    </main>
  );
}
