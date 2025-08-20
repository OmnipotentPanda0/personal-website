// Type is always the corresponding type id in contentful

export type TextBlock = {
    type: 'textBlock';
    body: string;
};


export type GalleryBlock = {
    type: 'galleryBlock';
    images: Array<{ url: string; title?: string; description?: string }>;
};

export type ImageBlock = {
    type: 'imageBlock';
    image: string;
    caption?: string;
    imageTitle?: string;
    imageDescription?: string;
};

export type VideoBlock = {
    type: 'videoBlock';
    // Either an external URL (YouTube, Vimeo, etc.)
    videoUrl?: string;
    // Or an uploaded asset from Contentful
    videoFile?: {
        url: string;
        contentType?: string;
        title?: string;
        description?: string;
    };
};

export type CodeBlock = {
    type: 'codeBlock';
    code: string;
    language?: string;
};

export type QuoteBlock = {
    type: 'quoteBlock';
    quote: string;
    author?: string;
};

export type Tag = {
    type: 'tag';
    name: string;
    slug?: string;
    description?: string;
};

export type CmsProject = {
    type: "blogPost";
    title: string;
    slug: string;
    publishDate?: string | null;
    coverImage: string;
    coverImageTitle?: string;
    coverImageDescription?: string;
    excerpt?: string;
    contentBlocks?: Array<TextBlock | ImageBlock | VideoBlock | CodeBlock | QuoteBlock | GalleryBlock>; // später kannst du hier weitere Block-Typen ergänzen
    tags?: Tag[];
};

