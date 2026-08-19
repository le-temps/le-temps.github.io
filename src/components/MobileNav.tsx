import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, FolderGit2, User, Archive } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Archive', href: '/archive', icon: Archive },
  { name: 'Projects', href: '/#projects', icon: FolderGit2 },
  { name: 'About', href: '/about', icon: User },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl p-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="space-y-3">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 transition-all"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-brand-500" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
