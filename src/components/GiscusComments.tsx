import React, { useEffect, useRef } from 'react';

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Check if dark mode is active
    const isDark = document.documentElement.classList.contains('dark');
    const theme = isDark ? 'dark_dimmed' : 'light';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'le-temps/le-temps.github.io');
    script.setAttribute('data-repo-id', 'R_kgDONXXXXXXXXX');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDONXXXXXXXXX');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', 'zh-CN');
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.innerHTML = '';
    ref.current.appendChild(script);
  }, []);

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        💬 评论与讨论 · Comments
      </h3>
      <div ref={ref} className="min-h-[200px]" />
    </div>
  );
}
