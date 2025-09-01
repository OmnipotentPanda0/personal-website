'use client';

import React from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy code to clipboard"
      className="inline-flex items-center justify-center h-8 gap-1 rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-600 px-2 text-xs leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 focus:ring-offset-slate-900"
    >
      {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
