import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getLayerBySlug, getRelatedProjects } from '@/lib/projects';
import { StatusBadge } from '@/components/projects/StatusBadge';
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export function generateStaticParams() {
  const projects = require('@/data/projects.json');
  return projects.map((p: any) => ({ domain: p.layer, system: p.slug }));
}

interface Props {
  params: Promise<{ domain: string; system: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { system } = await params;
  const project = getProjectBySlug(system);
  if (!project) return { title: 'System Not Found' };
  return {
    title: `${project.name} — Fleet Deployment`,
    description: project.summary,
    alternates: { canonical: `/fleet/${project.layer}/${project.slug}` },
  };
}

export default async function FleetSystemPage({ params }: Props) {
  const { domain, system } = await params;
  const project = getProjectBySlug(system);
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const layer = getLayerBySlug(project.layer);

  return (
    <div className="min-h-screen">
      <section className="px-5 sm:px-8 pt-28 pb-8 max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'The Fleet', url: '/fleet' },
            { name: layer?.name || project.layer, url: `/fleet/${project.layer}` },
            { name: project.name, url: `/fleet/${project.layer}/${project.slug}` },
          ]}
        />
      </section>

      <section className="section-rule pb-14">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="flex items-start justify-between gap-6 mb-5">
            <h1 className="font-serif font-medium text-4xl md:text-5xl tracking-[-0.02em] text-[var(--color-ink)]">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-xl text-[var(--color-ink-3)] mb-8 leading-relaxed">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.1em] uppercase border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-3)]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="border-l-2 border-[var(--color-green)] pl-6">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-green)] mb-2">In Service of the Fleet</p>
            <p className="text-[var(--color-ink-2)] leading-relaxed">{project.mission_context}</p>
          </div>
        </div>
      </section>

      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-3">Problem</h2>
              <p className="text-[var(--color-ink-3)] leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-3">Why It Matters</h2>
              <p className="text-[var(--color-ink-3)] leading-relaxed">{project.why_matters}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-3">Core Ideas</h2>
              <ul className="space-y-3">
                {project.core_ideas.map((idea: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-pink)] mt-2.5 flex-shrink-0" />
                    <span className="text-[var(--color-ink-3)]">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
            {project.roadmap && project.roadmap.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-3">Roadmap</h2>
                <ul className="space-y-3">
                  {project.roadmap.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] mt-2.5 flex-shrink-0" />
                      <span className="text-[var(--color-ink-3)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="card-ed p-7">
              <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] mb-4">Links</h3>
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 font-serif text-[var(--color-ink)] hover:text-[var(--color-pink)] transition-colors">
                Source Repository ↗
              </a>
              {project.blog_slugs && project.blog_slugs.length > 0 && (
                <p className="text-sm text-[var(--color-ink-3)] mt-3">Related: {project.blog_slugs.length} article{project.blog_slugs.length !== 1 ? 's' : ''}</p>
              )}
            </div>
            <div className="card-ed p-7">
              <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-[var(--color-ink-3)] block mb-1">Domain</span>
                  <Link href={`/fleet/${project.layer}`} className="font-serif text-[var(--color-ink)] hover:text-[var(--color-pink)] transition-colors">
                    {layer?.name || project.layer}
                  </Link>
                </div>
                <div>
                  <span className="text-[var(--color-ink-3)] block mb-1">Created</span>
                  <time className="text-[var(--color-ink)]">{new Date(project.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</time>
                </div>
                {project.last_updated && project.last_updated !== project.created && (
                  <div>
                    <span className="text-[var(--color-ink-3)] block mb-1">Last Updated</span>
                    <time className="text-[var(--color-ink)]">{new Date(project.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</time>
                  </div>
                )}
              </div>
            </div>
            {related.length > 0 && (
              <div className="card-ed p-7">
                <RelatedProjects projects={related} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
