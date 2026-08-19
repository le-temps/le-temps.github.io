import React, { useState } from 'react';
import { Twitter, Linkedin, Link, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? url || window.location.href : '';

  const shareOnTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedin = () => {
    const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(liUrl, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareOnTwitter}
        className="p-2 rounded-xl text-slate-500 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all border border-slate-200 dark:border-slate-800"
        title="分享至 Twitter / X"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={shareOnLinkedin}
        className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all border border-slate-200 dark:border-slate-800"
        title="分享至 LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-xl text-slate-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all border border-slate-200 dark:border-slate-800 flex items-center gap-1 text-xs"
        title="复制文章链接"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link className="w-4 h-4" />}
        <span className="text-[11px] font-medium">{copied ? '已复制' : '复制链接'}</span>
      </button>
    </div>
  );
}
