import CopyButton from './CopyButton';

type Props = {
  code: string;
  language?: string | null;
  title?: string;
};

// Server component: render highlighted HTML on the server
export default async function CodeSnippet({ code, language, title }: Props) {
  const lang = (language || 'text').toLowerCase();
  const { default: Prism } = await import('prismjs');
  await import('prismjs/components/prism-markup');
  const alias: Record<string, string> = {
    js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
    html: 'markup', xml: 'markup', svg: 'markup', yml: 'yaml', sh: 'bash', shell: 'bash', ps: 'powershell', ps1: 'powershell', py: 'python'
  };
  const comp = alias[lang] || lang;
  try { await import(`prismjs/components/prism-${comp}`); } catch {}
  const grammar = Prism.languages[comp] || Prism.languages.markup;
  const html = Prism.highlight(code, grammar, comp);

  return (
    <figure className="code-snippet mb-6 not-prose rounded-lg overflow-hidden border border-slate-700">
      <figcaption className="flex items-center justify-between bg-slate-800 text-slate-100 px-3 py-2 text-xs">
        <span className="font-medium tracking-wide truncate">{title || 'Code Snippet'}</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-8 rounded-md bg-slate-700 px-2 font-mono text-xs uppercase leading-none">{comp}</span>
          <CopyButton code={code} />
        </div>
      </figcaption>
      <pre className={`bg-slate-900 text-slate-100 p-4 overflow-x-auto language-${comp}`}>
        <code className={`block font-mono text-sm leading-relaxed language-${comp}`} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  );
}
