import { getArchitecture, getLayers, getAllProjects } from '@/lib/projects';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { Timeline } from '@/components/projects/Timeline';
import { StatusBadge } from '@/components/projects/StatusBadge';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'Projects — Sovereign Intelligence Stack',
  description: 'One evolving architecture. Seven layers. Eighty repositories testing one hypothesis: intelligence can be locally owned.',
};

export default function ProjectsPage() {
  const architecture = getArchitecture();
  const layers = getLayers();
  const allProjects = getAllProjects();

  const productionCount = allProjects.filter((p) => p.status === 'production').length;
  const activeCount = allProjects.filter((p) => p.status === 'active').length;
  const experimentalCount = allProjects.filter((p) => p.status === 'experimental').length;

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Projects', url: '/projects' },
            ]}
          />
          <span className="mono text-orange text-xs mb-4 block">Projects</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            {architecture.title}
          </h1>
          <p className="text-xl md:text-2xl text-ink-3 mb-6 max-w-3xl mx-auto leading-relaxed">
            {architecture.subtitle}
          </p>
          <p className="text-lg text-ink-3/80 max-w-2xl mx-auto mb-8">
            {architecture.narrative}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 border-4 border-ink bg-cream">
              <StatusBadge status="production" />
              <span className="text-2xl font-display">{productionCount}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 border-4 border-ink bg-cream">
              <StatusBadge status="active" />
              <span className="text-2xl font-display">{activeCount}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 border-4 border-ink bg-cream">
              <StatusBadge status="experimental" />
              <span className="text-2xl font-display">{experimentalCount}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-surface relative reveal">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center">
            The Architecture
          </h2>
          <p className="text-center text-ink-3 mb-12 max-w-2xl mx-auto">
            Click any layer to explore the projects within it.
          </p>
          <ArchitectureDiagram layers={layers} />
        </div>
      </section>

      <section className="py-16 px-4 bg-surface relative reveal">
        <div className="absolute inset-0 pointillism-layer opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center">
            Evolution
          </h2>
          <p className="text-center text-ink-3 mb-12 max-w-2xl mx-auto">
            From early experiments to production systems. The architecture emerged from the work itself.
          </p>
          <Timeline projects={allProjects} />
        </div>
      </section>

      <section className="py-16 px-4 reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            The Work Is Open
          </h2>
          <p className="text-lg text-ink-3 mb-8 max-w-2xl mx-auto">
            The architecture documents the design. The code implements it. What you build from them is your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/kliewerdaniel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-cream text-ink font-bold border-4 border-ink hover:bg-surface transition-colors shadow-brutalist-sm"
            >
              All Repositories on GitHub ↗
            </a>
            <Link
              href="/research"
              className="inline-flex items-center justify-center px-6 py-3 bg-cream text-ink font-bold border-4 border-ink hover:bg-surface transition-colors shadow-brutalist-sm"
            >
              Read the Research →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
