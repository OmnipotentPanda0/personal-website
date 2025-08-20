import React from 'react';
import Image from 'next/image';
import { FaFileDownload } from 'react-icons/fa';
import type { CmsProject, TextBlock, ImageBlock, VideoBlock, CodeBlock, QuoteBlock, GalleryBlock } from '@/types/cms_project';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';
import CodeSnippet from './CodeSnippet';
import Gallery from './Gallery';

type Props = {
  project: CmsProject;
};

function formatDate(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function renderContentBlock(block: TextBlock | ImageBlock | VideoBlock | CodeBlock | QuoteBlock | GalleryBlock, index: number) {
  switch (block.type) {
    case 'textBlock':
      // The body is expected to be a JSON string of Contentful Rich Text Document.
      // Fallback: if it's not valid JSON, render as plain text.
      let richDoc: Document | null = null;
      try {
        const parsed = typeof block.body === 'string' ? JSON.parse(block.body) : block.body;
        if (parsed && typeof parsed === 'object' && parsed.nodeType === 'document') {
          richDoc = parsed as Document;
        }
      } catch {
        richDoc = null;
      }

      const options: Options = {
        renderMark: {
          [MARKS.BOLD]: (text) => <strong>{text}</strong>,
          [MARKS.ITALIC]: (text) => <em>{text}</em>,
          [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
          [MARKS.CODE]: (text) => (
            <code className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-900">
              {text}
            </code>
          ),
        },
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => (
            <p className="leading-6 sm:leading-7 md:leading-8 my-2 sm:my-3 text-sm sm:text-base">{children}</p>
          ),
          [BLOCKS.HEADING_1]: (_node, children) => (
            <h1 className="mt-6 sm:mt-8 mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-montserrat font-semibold">{children}</h1>
          ),
          [BLOCKS.HEADING_2]: (_node, children) => (
            <h2 className="mt-6 sm:mt-8 mb-1.5 sm:mb-2 text-lg sm:text-xl md:text-2xl font-montserrat font-semibold">{children}</h2>
          ),
          [BLOCKS.HEADING_3]: (_node, children) => (
            <h3 className="mt-4 sm:mt-6 mb-1.5 sm:mb-2 text-base sm:text-lg md:text-xl font-montserrat font-semibold">{children}</h3>
          ),
          [BLOCKS.HEADING_4]: (_node, children) => (
            <h4 className="mt-3 sm:mt-4 mb-1 sm:mb-1.5 text-sm sm:text-base md:text-lg font-montserrat font-semibold">{children}</h4>
          ),
          [BLOCKS.HEADING_5]: (_node, children) => <h5 className="mt-3 mb-1 font-montserrat font-semibold">{children}</h5>,
          [BLOCKS.HEADING_6]: (_node, children) => <h6 className="mt-3 mb-1 font-montserrat font-semibold">{children}</h6>,
          [BLOCKS.UL_LIST]: (_node, children) => (
            <ul className="my-3 sm:my-4 pl-4 sm:pl-6 md:pl-7 list-outside space-y-1.5 sm:space-y-2.5">{children}</ul>
          ),
          [BLOCKS.OL_LIST]: (_node, children) => (
            <ol className="my-3 sm:my-4 pl-4 sm:pl-6 md:pl-7 list-outside space-y-1.5 sm:space-y-2.5">{children}</ol>
          ),
          [BLOCKS.LIST_ITEM]: (_node, children) => (
            <li className="leading-6 sm:leading-7 md:leading-8 marker:text-[var(--kik)] [&>p]:my-0 [&_ul]:mt-2 [&_ol]:mt-2 text-sm sm:text-base">
              {children}
            </li>
          ),
          [BLOCKS.QUOTE]: (_node, children) => (
            <blockquote className="border-l-2 sm:border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 my-4 sm:my-6 italic text-sm sm:text-base">{children}</blockquote>
          ),
          [BLOCKS.HR]: () => <hr className="my-6 sm:my-8 border-gray-200" />,
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            // Optional: if Contentful provides assets inside rich text
            // Try to read URL/caption from node.data.target.fields
            const fields = (node as any)?.data?.target?.fields;
            const fileUrl = fields?.file?.url || fields?.file?.en?.url || fields?.file?.['en-US']?.url;
            const title = fields?.title || fields?.title?.en || fields?.title?.['en-US'];
            if (!fileUrl) return null;
            const src = fileUrl.startsWith('http') ? fileUrl : `https:${fileUrl}`;
            return (
              <figure>
                <Image src={src} alt={title || ''} width={1000} height={600} className="rounded w-full" />
                {title && <figcaption className="text-xs sm:text-sm mt-2 text-center italic font-roboto">{title}</figcaption>}
              </figure>
            );
          },
          [INLINES.HYPERLINK]: (node, children) => {
            const uri = (node.data as any)?.uri as string | undefined;
            return (
              <a
                href={uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 underline-offset-2 hover:underline"
              >
                {children}
              </a>
            );
          },
        },
      };

      return (
  <div
          key={index}
          className="prose max-w-none mb-6 sm:mb-8
      prose-headings:font-montserrat prose-headings:font-semibold prose-headings:text-[#2C3E50]
            prose-h1:mt-6 sm:prose-h1:mt-8 prose-h1:mb-2 sm:prose-h1:mb-3 prose-h1:text-xl sm:prose-h1:text-2xl md:prose-h1:text-3xl
            prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:mb-1.5 sm:prose-h2:mb-2 prose-h2:text-lg sm:prose-h2:text-xl md:prose-h2:text-2xl
            prose-h3:mt-4 sm:prose-h3:mt-6 prose-h3:mb-1.5 sm:prose-h3:mb-2 prose-h3:text-base sm:prose-h3:text-lg md:prose-h3:text-xl
            prose-h4:mt-3 sm:prose-h4:mt-4 prose-h4:mb-1 sm:prose-h4:mb-1.5 prose-h4:text-sm sm:prose-h4:text-base md:prose-h4:text-lg
      prose-p:leading-6 sm:prose-p:leading-7 md:prose-p:leading-8 prose-p:text-[#2C3E50] prose-p:font-roboto prose-p:text-sm sm:prose-p:text-base
      prose-li:text-[#2C3E50] prose-li:font-roboto prose-li:text-sm sm:prose-li:text-base
            prose-a:text-blue-700 hover:prose-a:text-blue-800 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#2C3E50]
            prose-code:bg-gray-100 prose-code:px-1 sm:prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm
      prose-ul:list-disc prose-ol:list-decimal
            prose-blockquote:border-l-2 sm:prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-3 sm:prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#2C3E50] prose-blockquote:text-sm sm:prose-blockquote:text-base
            prose-img:rounded-lg prose-img:w-full"
        >
          {richDoc ? (
            documentToReactComponents(richDoc, options)
          ) : (
            <pre className="whitespace-pre-wrap break-words">{block.body}</pre>
          )}
        </div>
      );
    
    case 'imageBlock':
      return (
        <div key={index} className="mb-4 sm:mb-6">
          <Image 
            src={block.image} 
            alt={block.imageTitle || block.caption || ''} 
            width={1000} 
            height={600} 
            className="w-full rounded-lg"
          />
          {(block.imageTitle || block.imageDescription || block.caption) && (
            <div className="mt-2 text-xs sm:text-sm">
              {(block.imageTitle || block.imageDescription) ? (
                <div className="flex items-center">
                  {block.imageTitle && (
                    <span className="font-medium">{block.imageTitle}</span>
                  )}
                  {block.imageDescription && (
                    <span className="ml-auto">{block.imageDescription}</span>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <span className="italic">{block.caption}</span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    
    case 'videoBlock':
      return (
        <div key={index} className="mb-4 sm:mb-6">
          <div className="aspect-video">
            {block.videoFile?.url ? (
              <video
                className="w-full h-full rounded-lg"
                src={block.videoFile.url.startsWith('http') ? block.videoFile.url : `https:${block.videoFile.url}`}
                controls
                playsInline
                preload="metadata"
                aria-label={block.videoFile.title}
              >
                {block.videoFile.contentType && (
                  <source
                    src={block.videoFile.url.startsWith('http') ? block.videoFile.url : `https:${block.videoFile.url}`}
                    type={block.videoFile.contentType}
                  />
                )}
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={block.videoUrl}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      );
    
    case 'codeBlock':
      return (
        <CodeSnippet key={index} code={block.code} language={block.language} />
      );
    
    case 'quoteBlock':
      return (
        <blockquote key={index} className="border-l-2 sm:border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 mb-4 sm:mb-6 italic font-roboto">
          <p className="text-base sm:text-lg">"{block.quote}"</p>
          {block.author && (
            <cite className="text-xs sm:text-sm mt-2 block opacity-70">— {block.author}</cite>
          )}
        </blockquote>
      );
    
    case 'galleryBlock':
      return (
        <div key={index} className="mb-6 sm:mb-8">
          <Gallery images={block.images} />
        </div>
      );
    
    default:
      return null;
  }
}

export default function CmsProjectSite({ project }: Props) {
  const { title, excerpt, coverImage, publishDate, contentBlocks, tags, coverImageTitle, coverImageDescription } = project;

  const src = coverImage?.startsWith('http') ? coverImage : (coverImage ? `/images/projects/${coverImage}` : '/images/projects/WebRTCApp.png');
  const dateText = formatDate(publishDate);

  return (
    <div className="flex w-full h-full justify-center px-4 sm:px-5 lg:px-8">
      {/* Responsive width with proper mobile padding */}
      <div className="w-full max-w-[750px] text-[#2C3E50] font-roboto">
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-24 mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-left leading-tight tracking-tight font-montserrat">{title}</h1>
          {(dateText || (tags && tags.length > 0)) && (
            <div className="mt-2 sm:mt-3 md:mt-4 flex justify-start items-center gap-2 flex-wrap text-xs sm:text-sm">
              {dateText && (
                <span title={publishDate || undefined}>{dateText}</span>
              )}
              {dateText && tags && tags.length > 0 && (
                <span>•</span>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 justify-start">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 sm:px-2.5 py-0.5 bg-blue-100 text-[#2C3E50] rounded-full text-xs sm:text-sm"
                      title={tag.description}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-3 sm:mt-4">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">{excerpt}</p>
        </div>
        
        {src && (
          <div className="overflow-hidden mt-4 sm:mt-6 -mx-4 sm:-mx-4 md:-mx-10 lg:-mx-20 xl:-mx-28">
            <Image className="w-full rounded-none sm:rounded-lg" src={src} width={2000} height={1200} alt={coverImageTitle || title} />
            {(coverImageTitle || coverImageDescription) && (
              <div className="mt-2 text-xs sm:text-sm font-roboto px-4 sm:px-0">
                <div className="flex items-center">
                  {coverImageTitle && (
                    <span className="font-medium">{coverImageTitle}</span>
                  )}
                  {coverImageDescription && (
                    <span className="ml-auto opacity-70">{coverImageDescription}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Blocks */}
        {contentBlocks && contentBlocks.length > 0 && (
          <div className="mt-6 sm:mt-8">
            {contentBlocks.map((block, index) => renderContentBlock(block, index))}
          </div>
        )}
      </div>
    </div>
  );
}
