import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';
import Image from 'next/image';

function getFieldValue(value: any) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return value['en-US'] ?? value.en ?? Object.values(value)[0] ?? '';
  }
  return '';
}

// Simplified rich text renderer with minimal classes to reduce style calculation overhead
export function renderSimpleRichText(richDoc: Document, index: number) {
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
      [MARKS.CODE]: (text) => (
        <code className="bg-gray-200 text-gray-900 px-1 py-0.5 rounded text-sm">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node, children) => (
        <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node, children) => (
        <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node, children) => (
        <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node, children) => (
        <h4 className="text-base font-bold mt-3 mb-2">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node, children) => <h5 className="font-bold mt-3 mb-1">{children}</h5>,
      [BLOCKS.HEADING_6]: (_node, children) => <h6 className="font-bold mt-3 mb-1">{children}</h6>,
      [BLOCKS.UL_LIST]: (_node, children) => (
        <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => (
        <li className="leading-relaxed [&_p]:mb-0">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node, children) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic">{children}</blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-6 border-gray-200" />,
      [BLOCKS.TABLE]: (_node, children) => (
        <div className="my-6 -mx-6 sm:-mx-8 md:-mx-14 lg:-mx-20 overflow-x-auto rounded-lg border border-gray-400">
          <table className="min-w-full border-collapse text-left text-sm">{children}</table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (_node, children) => <tr className="border-b border-gray-400">{children}</tr>,
      [BLOCKS.TABLE_CELL]: (_node, children) => (
        <td className="border-r border-gray-400 px-4 py-3 align-top last:border-r-0">{children}</td>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
        <th className="border-r border-gray-400 bg-gray-100 px-4 py-3 align-top font-semibold last:border-r-0">
          {children}
        </th>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const fields = (node as any)?.data?.target?.fields;
        const fileUrl = getFieldValue(fields?.file?.url) || getFieldValue(fields?.file);
        const title = getFieldValue(fields?.title);
        if (!fileUrl) return null;
        const src = fileUrl.startsWith('http') ? fileUrl : `https:${fileUrl}`;
        return (
          <figure className="my-4">
            <Image src={src} alt={title || ''} width={800} height={500} loading="lazy" decoding="async" className="rounded w-full" />
            {title && <figcaption className="text-sm mt-2 text-center italic">{title}</figcaption>}
          </figure>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = (node.data as any)?.uri as string | undefined;
        return (
          <a href={uri} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline">
            {children}
          </a>
        );
      },
    },
    renderText: (text) =>
      text.split('\n').flatMap((part, index) =>
        index === 0 ? part : [<br key={index} />, part]
      ),
  };

  return (
    <div key={index} className="mb-6 text-gray-800">
      {documentToReactComponents(richDoc, options)}
    </div>
  );
}
