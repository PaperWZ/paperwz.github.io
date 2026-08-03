'use client';

import { useState } from 'react';

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded bg-slate-700/60 px-2.5 py-1 text-xs text-slate-200 transition-colors hover:bg-slate-700 hover:text-white border border-slate-600"
    >
      {copied ? '已复制' : '复制代码'}
    </button>
  );
}