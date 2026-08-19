import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { Search, X, Hash, Folder, Calendar, ArrowRight } from 'lucide-react';

export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
}

interface SearchModalProps {
  items: SearchItem[];
}

export default function SearchModal({ items }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useRef(
    new Fuse(items, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.15 },
        { name: 'category', weight: 0.05 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    })
  );

  useEffect(() => {
    fuse.current.setCollection(items);
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(items.slice(0, 5));
    } else {
      const searchRes = fuse.current.search(query);
      setResults(searchRes.map((r) => r.item));
    }
    setSelectedIndex(0);
  }, [query, items]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = `/blog/${results[selectedIndex].slug}`;
    }
  };

  return (
    <>
      {/* 导航栏搜索触发按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 text-xs transition-all shadow-sm"
        title="搜索全站文章 (Cmd + K)"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">搜索文章...</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* 模态框 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 搜索输入栏 */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
              <Search className="w-5 h-5 text-brand-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="输入关键词搜索标题、内容、标签或分类..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 搜索结果列表 */}
            <div className="max-h-96 overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-400">
                  没有找到与 "{query}" 相关的文章
                </div>
              ) : (
                <div className="space-y-1">
                  {!query && (
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      最新推荐文章
                    </div>
                  )}
                  {results.map((item, idx) => (
                    <a
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className={`block p-3 rounded-xl transition-all ${
                        idx === selectedIndex
                          ? 'bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {item.title}
                        </h4>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Folder className="w-3 h-3 text-brand-500" /> {item.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </span>
                        {item.tags.slice(0, 2).map((t) => (
                          <span key={t} className="flex items-center gap-0.5 text-slate-400">
                            <Hash className="w-2.5 h-2.5" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 底部按键提示 */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>↑↓ 选择 · Enter 跳转</span>
              <span>ESC 关闭</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
