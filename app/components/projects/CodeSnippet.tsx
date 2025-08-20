"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import Prism from 'prismjs';
// Prism core comes without all languages; we'll dynamically load common ones.
// Note: Prism needs the markup (HTML) language in many cases; include core ones once.
// We won't import CSS theme here; it's included in globals.css.

type Props = {
  code: string;
  language?: string | null;
  title?: string;
};

async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback below
  }
  // Fallback for older browsers/insecure context
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function CodeSnippet({ code, language, title }: Props) {
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const lang = (language || 'text').toLowerCase();
  const codeId = React.useId();

  const onCopy = useCallback(async () => {
    const ok = await copyText(code);
    if (ok) {
      setCopied(true);
    }
  }, [code]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  // Map aliases to Prism component names
  const resolvePrismComponent = (l: string) => {
    const map: Record<string, string> = {
      js: 'javascript',
      mjs: 'javascript',
      cjs: 'javascript',
      jsx: 'jsx',
      ts: 'typescript',
      tsx: 'tsx',
      html: 'markup',
      xml: 'markup',
      svg: 'markup',
      yml: 'yaml',
      sh: 'bash',
      shell: 'bash',
      ps: 'powershell',
      ps1: 'powershell',
      py: 'python',
    };
    return map[l] || l;
  };

  useEffect(() => {
    let cancelled = false;
    async function loadAndHighlight() {
      const comp = resolvePrismComponent(lang);
      try {
        // Load language component if available; ignore errors
        await import(
          /* webpackChunkName: "prism-[request]" */
          `prismjs/components/prism-${comp}`
        );
      } catch {}
      if (!cancelled) {
        setReady(true);
        // Highlight specific element by id to avoid re-highlighting whole page
        const el = document.getElementById(codeId);
        if (el) {
          Prism.highlightElement(el as Element);
        } else {
          Prism.highlightAllUnder(document);
        }
      }
    }
    loadAndHighlight();
    return () => {
      cancelled = true;
    };
    // re-run when language or code changes
  }, [lang, code, codeId]);

  return (
    <figure className="code-snippet mb-6 not-prose rounded-lg overflow-hidden border border-slate-700">
      <figcaption className="flex items-center justify-between bg-slate-800 text-slate-100 px-3 py-2 text-xs">
        <span className="font-medium tracking-wide truncate">
          {title || 'Code Snippet'}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-8 rounded-md bg-slate-700 px-2 font-mono text-xs uppercase leading-none">
            {lang}
          </span>
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy code to clipboard"
            className="inline-flex items-center justify-center h-8 gap-1 rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-600 px-2 text-xs leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 focus:ring-offset-slate-900"
          >
            {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </figcaption>
  <pre className={`bg-slate-900 text-slate-100 p-4 overflow-x-auto language-${lang}`}>
        <code
          id={codeId}
          className={`block font-mono text-sm leading-relaxed language-${lang}`}
        >
          {code}
        </code>
      </pre>
    </figure>
  );
}
