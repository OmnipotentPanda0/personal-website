import type { MetadataRoute } from 'next';

import { getAllProjectSlugsWithDates, isContentfulConfigured } from '@/lib/contentful';

// Hardcode canonical site URL as requested
function getBaseUrl(): string {
  return 'https://johannsetzer.com';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
  { url: `${baseUrl}/articles`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy-sparkshare`, changeFrequency: 'yearly', priority: 0.3 },
    // Old projects section still present in the app
    { url: `${baseUrl}/projects-old`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/projects-old/chat-app`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/projects-old/dax-correlation`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/projects-old/financial`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  if (isContentfulConfigured) {
    try {
      const items = await getAllProjectSlugsWithDates();
      dynamicRoutes = items.map(({ slug, publishDate }) => ({
        url: `${baseUrl}/articles/${slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        lastModified: publishDate ? new Date(publishDate) : undefined,
      }));
    } catch (e) {
      // Fallback silently to static routes only
      console.warn('Sitemap: failed to load Contentful slugs, returning static routes only');
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
