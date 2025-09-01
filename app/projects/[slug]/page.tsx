import { notFound } from 'next/navigation';
import PageTemplate from '@/app/components/PageTemplate';
import CmsProjectSite from '@/app/components/projects/CmsProjectSite';
// import LocoProvider from '@/app/components/LocoProvider';
import { getAllProjectSlugs, getProjectBySlug, isContentfulConfigured } from '@/lib/contentful';

// Strict SSG: no ISR or on-demand generation
export const revalidate = false;
export const dynamicParams = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  if (!isContentfulConfigured) return [];
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    // <LocoProvider>
    <PageTemplate selected="Projects" animate={false}>
      <CmsProjectSite project={project} />
    </PageTemplate>
    // </LocoProvider>
  );
}
