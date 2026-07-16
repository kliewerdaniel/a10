import { getProjectBySlug, getLayerBySlug, getRelatedProjects } from '@/lib/projects';
import { StatusBadge } from '@/components/projects/StatusBadge';
import { TechTag } from '@/components/projects/TechTag';
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

interface ProjectPageProps {
  params: {
    layer: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const projectsData = await import('@/data/projects.json');
  const projects = projectsData.default;
  
  return projects.map((project: any) => ({
    layer: project.layer,
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project does not exist.',
    };
  }

  return {
    title: `${project.name} — ${project.summary}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
          <p className="text-ink-3 mb-8">The requested project does not exist.</p>
          <Link href="/projects" className="accent-pink font-bold hover:text-pink-dark transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = getRelatedProjects(project);
  const layer = getLayerBySlug(project.layer);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-8 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Projects', url: '/projects' },
              { name: layer?.name || project.layer, url: `/projects/${project.layer}` },
              { name: project.name, url: `/projects/${project.layer}/${project.slug}` },
            ]}
          />
        </div>
      </section>

      {/* Project Header */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <h1 className="font-display text-4xl md:text-5xl">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          
          <p className="text-xl text-ink-3 mb-8 leading-relaxed">{project.summary}</p>
          
          <div className="flex items-center gap-2 flex-wrap">
            {project.technologies.map((tech) => (
              <TechTag key={tech} technology={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Context */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-green bg-surface px-6 py-5">
            <p className="mono text-xs text-green font-bold mb-2">In Service of the Mission</p>
            <p className="text-ink-3 leading-relaxed">
              {project.mission_context}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 reveal">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problem */}
            <div className="card-pointillist p-6 bg-cream">
              <h2 className="font-display text-2xl mb-4">Problem</h2>
              <p className="text-ink-3 leading-relaxed">{project.problem}</p>
            </div>

            {/* Why It Matters */}
            <div className="card-pointillist p-6 bg-surface">
              <h2 className="font-display text-2xl mb-4">Why It Matters</h2>
              <p className="text-ink-3 leading-relaxed">{project.why_matters}</p>
            </div>

            {/* Core Ideas */}
            <div className="card-pointillist p-6 bg-cream">
              <h2 className="font-display text-2xl mb-4">Core Ideas</h2>
              <ul className="space-y-3">
                {project.core_ideas.map((idea, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink mt-2 flex-shrink-0" />
                    <span className="text-ink-3">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Roadmap */}
            {project.roadmap && project.roadmap.length > 0 && (
              <div className="card-pointillist p-6 bg-surface">
                <h2 className="font-display text-2xl mb-4">Roadmap</h2>
                <ul className="space-y-3">
                  {project.roadmap.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green mt-2 flex-shrink-0" />
                      <span className="text-ink-3">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Links */}
            <div className="card-pointillist p-6 bg-cream">
              <h3 className="font-display text-xl mb-4">Links</h3>
              <div className="space-y-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ink font-bold hover:text-pink-dark transition-colors"
                >
                  Source Repository ↗
                </a>
                {project.blog_slugs && project.blog_slugs.length > 0 && (
                  <p className="text-sm text-ink-3">
                    Related: {project.blog_slugs.length} article{project.blog_slugs.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="card-pointillist p-6 bg-surface">
              <h3 className="font-display text-xl mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-ink-3 block mb-1">Layer</span>
                  <Link 
                    href={`/projects/${project.layer}`} 
                    className="text-ink font-bold hover:text-pink-dark transition-colors"
                  >
                    {layer?.name || project.layer}
                  </Link>
                </div>
                <div>
                  <span className="text-ink-3 block mb-1">Created</span>
                  <time className="text-ink">
                    {new Date(project.created).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </time>
                </div>
                {project.last_updated && project.last_updated !== project.created && (
                  <div>
                    <span className="text-ink-3 block mb-1">Last Updated</span>
                    <time className="text-ink">
                      {new Date(project.last_updated).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </time>
                  </div>
                )}
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="card-pointillist p-6 bg-cream">
                <RelatedProjects projects={relatedProjects} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
