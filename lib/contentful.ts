import type { CmsProject, TextBlock, ImageBlock, VideoBlock, CodeBlock, QuoteBlock, GalleryBlock, Tag } from '@/types/cms_project';

const SPACE = process.env.CONTENTFUL_SPACE_ID as string;
const TOKEN = process.env.CONTENTFUL_CDA_TOKEN as string;
const ENV = process.env.CONTENTFUL_ENV || 'master';

export const isContentfulConfigured = Boolean(SPACE && TOKEN);



async function cf<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!SPACE || !TOKEN) {
    throw new Error('Missing Contentful env vars: CONTENTFUL_SPACE_ID or CONTENTFUL_CDA_TOKEN');
  }
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENV}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
  // Pure SSG: build-time cache only
  cache: 'force-cache',
    }
  );

  if (!res.ok) throw new Error(`Contentful error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

type ProjectItemGQL = {
  title: string;
  excerpt?: string | null;
  slug: string;
  publishDate?: string | null;
  coverImage?: { url?: string | null; title?: string | null; description?: string | null } | null;
  contentBlocksCollection?: {
    items: Array<{
      __typename: string;
      body?: { json?: any } | string;
      image?: { url?: string | null; title?: string | null; description?: string | null };
      caption?: string;
  videoUrl?: string;
  videoFile?: { url?: string | null; contentType?: string | null; title?: string | null; description?: string | null } | null;
      code?: string;
      language?: string;
      quote?: string;
      author?: string;
      imagesCollection?: {
        items: Array<{ url?: string | null; title?: string | null; description?: string | null }>;
      };
    }>;
  } | null;
  tagsCollection?: {
    items: Array<{
      name: string;
      slug?: string;
      description?: string;
    }>;
  } | null;
};

export async function getAllProjects(): Promise<CmsProject[]> {
  if (!isContentfulConfigured) return [];
  
  const query = /* GraphQL */ `
  query GetAllProjectsEssentials {
      blogPostCollection(limit: 10) {
        items {
          title
          slug
          excerpt
      coverImage { url title description }
          publishDate
          tagsCollection {
            items {
              ... on Tag {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;
  
  try {
    console.log('Getting all projects (essentials only)...');
    const data = await cf<{ blogPostCollection: { items: ProjectItemGQL[] } }>(query);
    console.log('getAllProjects success, items count:', data.blogPostCollection.items?.length || 0);
    
    return (data.blogPostCollection.items || []).map((i) => ({
      type: 'blogPost',
      title: i.title,
      slug: i.slug,
      publishDate: i.publishDate ?? null,
      coverImage: i.coverImage?.url || '',
      coverImageTitle: i.coverImage?.title || undefined,
      coverImageDescription: i.coverImage?.description || undefined,
      excerpt: i.excerpt ?? '',
      contentBlocks: [], // Empty for overview - will be loaded in getProjectBySlug
      tags: (i.tagsCollection?.items || []).map(tag => ({
        type: 'tag' as const,
        name: tag.name,
        slug: tag.slug || ''
      }))
    }));
  } catch (error) {
    console.error('getAllProjects error:', error);
    return [];
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (!isContentfulConfigured) return [];
  const query = /* GraphQL */ `
    query GetSlugs {
      blogPostCollection {
        items {
          slug
        }
      }
    }
  `;
  try {
    const data = await cf<{ blogPostCollection: { items: { slug: string }[] } }>(query);
    return (data.blogPostCollection.items || []).map((i) => i.slug);
  } catch {
    return [];
  }
}

export type ProjectSlugWithDate = { slug: string; publishDate: string | null };

export async function getAllProjectSlugsWithDates(): Promise<ProjectSlugWithDate[]> {
  if (!isContentfulConfigured) return [];
  const query = /* GraphQL */ `
    query GetSlugsWithDates {
      blogPostCollection {
        items {
          slug
          publishDate
        }
      }
    }
  `;
  try {
    const data = await cf<{ blogPostCollection: { items: { slug: string; publishDate?: string | null }[] } }>(query);
    return (data.blogPostCollection.items || []).map((i) => ({ slug: i.slug, publishDate: i.publishDate ?? null }));
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<CmsProject | null> {
  if (!isContentfulConfigured) return null;
  
  console.log('Getting project by slug:', slug);
  
  const query = /* GraphQL */ `
    query GetProject($slug: String!) {
      blogPostCollection(where: { slug: $slug }, limit: 1) {
        items {
          title
          slug
          excerpt
          publishDate
          coverImage { url title description }
          contentBlocksCollection {
            items {
              __typename
              ... on TextBlock {
                body { json }
              }
              ... on ImageBlock {
                image { url title description }
                caption
              }
              ... on VideoBlock {
                videoUrl
                videoFile { url contentType title description }
              }
              ... on CodeBlock {
                code
                language
              }
              ... on QuoteBlock {
                quote
                author
              }
              ... on GalleryBlock {
                imagesCollection {
                  items { url title description }
                }
              }
            }
          }
          tagsCollection {
            items {
              ... on Tag {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;
  try {
    const data = await cf<{ blogPostCollection: { items: ProjectItemGQL[] } }>(query, { slug });
    const i = data.blogPostCollection.items?.[0];
    if (!i) {
      console.log('No project found for slug:', slug);
      return null;
    }
    
    console.log('Found project:', i.title);
    
    return {
      type: 'blogPost',
      title: i.title,
      slug: i.slug,
      publishDate: i.publishDate ?? null,
  coverImage: i.coverImage?.url || '',
  coverImageTitle: i.coverImage?.title || undefined,
  coverImageDescription: i.coverImage?.description || undefined,
      excerpt: i.excerpt ?? '',
      contentBlocks: (i.contentBlocksCollection?.items || []).map(block => {
        switch (block.__typename) {
          case 'TextBlock':
            return { 
              type: 'textBlock', 
              body: typeof block.body === 'object' && block.body?.json 
                ? JSON.stringify(block.body.json) 
                : (block.body as string) || ''
            } as TextBlock;
          case 'ImageBlock':
            return { 
              type: 'imageBlock', 
              image: block.image?.url || '', 
              caption: block.caption,
              imageTitle: block.image?.title || undefined,
              imageDescription: block.image?.description || undefined,
            } as ImageBlock;
          case 'VideoBlock':
            return { 
              type: 'videoBlock', 
              videoUrl: block.videoUrl || undefined,
              videoFile: block.videoFile?.url ? {
                url: block.videoFile.url || '',
                contentType: block.videoFile.contentType || undefined,
                title: block.videoFile.title || undefined,
                description: block.videoFile.description || undefined,
              } : undefined
            } as VideoBlock;
          case 'CodeBlock':
            return { 
              type: 'codeBlock', 
              code: block.code || '', 
              language: block.language 
            } as CodeBlock;
          case 'QuoteBlock':
            return { 
              type: 'quoteBlock', 
              quote: block.quote || '', 
              author: block.author 
            } as QuoteBlock;
          case 'GalleryBlock':
            return { 
              type: 'galleryBlock', 
              images: (block.imagesCollection?.items || []).map(img => ({
                url: img.url || '',
                title: img.title || undefined,
                description: img.description || undefined,
              })) 
            } as GalleryBlock;
          default:
            return null;
        }
      }).filter((block): block is TextBlock | ImageBlock | VideoBlock | CodeBlock | QuoteBlock | GalleryBlock => block !== null),
      tags: (i.tagsCollection?.items || []).map(tag => ({
        type: 'tag' as const,
        name: tag.name,
        slug: tag.slug || ''
      }))
    };
  } catch (error) {
    console.error('getProjectBySlug error:', error);
    return null;
  }
}

// Debug helper: return raw data and basic status to verify connectivity/fields
type DebugStatus = {
  configured: boolean;
  space: boolean;
  env: string;
  tokenPresent: boolean;
};

type DebugBlogPostItem = {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishDate?: string | null;
  tags?: string[] | null;
  coverImage?: { url?: string | null } | null;
};

type DebugData = {
  blogPostCollection: {
    total: number;
    items: DebugBlogPostItem[];
  };
};

type DebugResponse =
  | { ok: true; data: DebugData; status: DebugStatus }
  | { ok: false; error: string; status: DebugStatus };

export async function debugGetBlogPostsRaw(): Promise<DebugResponse> {
  const status: DebugStatus = {
    configured: isContentfulConfigured,
    space: Boolean(SPACE),
    env: ENV,
    tokenPresent: Boolean(TOKEN),
  };
  if (!isContentfulConfigured) {
    return { ok: false, error: 'Missing Contentful configuration', status };
  }
  const query = /* GraphQL */ `
    query DebugAllBlogPosts {
  blogPostCollection(order: [publishDate_DESC]) {
        total
        items {
          title
          slug
          excerpt
          publishDate
          coverImage { url }
        }
      }
    }
  `;
  try {
    const data = await cf<DebugData>(query);
    return { ok: true, data, status };
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e);
    return { ok: false, error, status };
  }
}

// Raw probe to inspect GraphQL errors/body even when HTTP status is 400
type ProbeStatus = {
  configured: boolean;
  space: boolean;
  env: string;
  tokenPresent: boolean;
};

type ProbeResponse = {
  ok: boolean;
  status: ProbeStatus;
  httpStatus: number | null;
  body: unknown;
  note?: string;
};

export async function debugProbeBlogPostsRaw(): Promise<ProbeResponse> {
  const status: ProbeStatus = {
    configured: isContentfulConfigured,
    space: Boolean(SPACE),
    env: ENV,
    tokenPresent: Boolean(TOKEN),
  };
  if (!isContentfulConfigured) {
    return { ok: false, status, httpStatus: null, body: null, note: 'Missing Contentful configuration' };
  }
  const query = `
    query ProbeBlogPostsMinimal {
      blogPostCollection(limit: 5) {
        total
        items { slug title }
      }
    }
  `;
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENV}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 0 },
    }
  );
  const httpStatus = res.status;
  const bodyText = await res.text();
  let body: unknown;
  try { body = JSON.parse(bodyText); } catch { body = bodyText; }
  const hasErrors = typeof body === 'object' && body !== null && 'errors' in body;
  const ok = res.ok && !hasErrors;
  return { ok, status, httpStatus, body };
}

// New function to discover available content types and fields
type DiscoveryResponse = {
  ok: boolean;
  status: ProbeStatus;
  httpStatus: number | null;
  body: unknown;
  note?: string;
};

export async function discoverContentTypes(): Promise<DiscoveryResponse> {
  const status: ProbeStatus = {
    configured: isContentfulConfigured,
    space: Boolean(SPACE),
    env: ENV,
    tokenPresent: Boolean(TOKEN),
  };
  if (!isContentfulConfigured) {
    return { ok: false, status, httpStatus: null, body: null, note: 'Missing Contentful configuration' };
  }
  
  // Use introspection query to discover available types
  const query = `
    query IntrospectionQuery {
      __schema {
        queryType {
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    }
  `;
  
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENV}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 0 },
    }
  );
  
  const httpStatus = res.status;
  const bodyText = await res.text();
  let body: unknown;
  try { body = JSON.parse(bodyText); } catch { body = bodyText; }
  const hasErrors = typeof body === 'object' && body !== null && 'errors' in body;
  const ok = res.ok && !hasErrors;
  return { ok, status, httpStatus, body };
}
