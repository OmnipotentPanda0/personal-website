import React from 'react';
import Image from 'next/image';
import { FaFileDownload } from 'react-icons/fa';
import type { CmsProject, TextBlock, ImageBlock, VideoBlock, CodeBlock, QuoteBlock, GalleryBlock } from '@/types/cms_project';
import { type Document } from '@contentful/rich-text-types';
import CodeSnippet from './CodeSnippet';
import Gallery from './Gallery';
import { renderSimpleRichText } from './SimpleRichText';

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
      // Parse rich text document
      let richDoc: Document | null = null;
      try {
        const parsed = typeof block.body === 'string' ? JSON.parse(block.body) : block.body;
        if (parsed && typeof parsed === 'object' && parsed.nodeType === 'document') {
          richDoc = parsed as Document;
        }
      } catch {
        richDoc = null;
      }

      if (richDoc) {
        return renderSimpleRichText(richDoc, index);
      } else {
        return (
          <div key={index} className="mb-6">
            <pre className="whitespace-pre-wrap break-words text-gray-800">{block.body}</pre>
          </div>
        );
      }
    
    case 'imageBlock':
      return (
        <div key={index} className="mb-4 sm:mb-6">
          <Image 
            src={block.image} 
            alt={block.imageTitle || block.caption || ''} 
            width={1000} 
            height={600} 
            loading="lazy"
            decoding="async"
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
                preload="none"
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
  const src = coverImage?.startsWith('http')
    ? coverImage
    : (coverImage ? `/images/projects/${coverImage}` : '/images/projects/WebRTCApp.png');
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
            <Image
              className="w-full rounded-none sm:rounded-lg"
              src={src}
              width={2000}
              height={1200}
              alt={coverImageTitle || title}
              loading="eager"
              decoding="async"
              sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1000px, (min-width: 768px) 90vw, 100vw"
            />
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
