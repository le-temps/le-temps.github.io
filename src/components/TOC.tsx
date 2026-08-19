import React, { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';

export interface HeadingItem {
  depth: number;
  slug: string;
  text: string;
}

interface TOCProps {
  headings: HeadingItem[];
}

export default function TOC({ headings }: TOCProps) {
  const [activeSlug, setActiveSlug] = useState<string>('');

  // Filter only h2 and h3
  const tocHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);

  useEffect(() => {
    if (tocHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    tocHeadings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (tocHeadings.length === 0) {
    return null;
  }

  return (
    <nav className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 text-xs">
      <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
        <AlignLeft className="w-3.5 h-3.5 text-brand-500" />
        目录 · Table of Contents
      </div>
      <ul className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
        {tocHeadings.map((h) => {
          const isActive = activeSlug === h.slug;
          return (
            <li
              key={h.slug}
              style={{ paddingLeft: `${(h.depth - 2) * 0.75}rem` }}
              className="transition-all"
            >
              <a
                href={`#${h.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(h.slug);
                  if (target) {
                    window.scrollTo({
                      top: target.getBoundingClientRect().top + window.scrollY - 80,
                      behavior: 'smooth',
                    });
                    history.pushState(null, '', `#${h.slug}`);
                    setActiveSlug(h.slug);
                  }
                }}
                className={`block py-1 line-clamp-1 rounded-md transition-colors ${
                  isActive
                    ? 'text-brand-500 dark:text-brand-400 font-semibold pl-1 border-l-2 border-brand-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
