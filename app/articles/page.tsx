import PageTemplate from '@/app/components/PageTemplate';
import ProjectCard from '@/app/components/projects/ProjectCard';
import { getAllProjects } from '@/lib/contentful';

export const revalidate = 3600;

export default async function Page() {
  const projects = await getAllProjects();

  return (
    <PageTemplate selected="Articles" animate={false}>
      <div className="flex justify-center pt-10 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              basePath="/articles"
              link={p.slug}
              title={p.title}
              description={p.excerpt}
              image={p.coverImage}
              tags={p.tags}
            />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-gray-600">
              Keine Inhalte gefunden. Prüfe ENV (.env.local) und dass dein Blog Post veröffentlicht ist.
            </div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
