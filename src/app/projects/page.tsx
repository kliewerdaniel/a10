import { getArchitecture, getLayers, getProjectCountByLayer, getAllProjects } from '@/lib/projects';
import { LayerGrid } from '@/components/projects/LayerGrid';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { Timeline } from '@/components/projects/Timeline';

export const metadata = {
  title: 'Projects — Sovereign Intelligence Stack',
  description: 'One evolving architecture. Seven layers. Eighty repositories testing one hypothesis: intelligence can be locally owned.',
};

export default function ProjectsPage() {
  const architecture = getArchitecture();
  const layers = getLayers();
  const projectCounts = getProjectCountByLayer();
  const allProjects = getAllProjects();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            {architecture.title}
          </h1>
          <p className="text-xl md:text-2xl text-ink-3 mb-8 max-w-3xl mx-auto leading-relaxed">
            {architecture.subtitle}
          </p>
          <p className="text-lg text-ink-3/80 max-w-2xl mx-auto">
            {architecture.narrative}
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">
            The Architecture
          </h2>
          <p className="text-center text-ink-3 mb-12 max-w-2xl mx-auto">
            Click any layer to explore the projects within it.
          </p>
          <ArchitectureDiagram layers={layers} />
        </div>
      </section>

      {/* Layer Grid */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">
            Seven Layers
          </h2>
          <p className="text-center text-ink-3 mb-12 max-w-2xl mx-auto">
            Each layer builds on the one below it, creating a complete sovereignty stack.
          </p>
          <LayerGrid layers={layers} projectCounts={projectCounts} />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">
            Evolution
          </h2>
          <p className="text-center text-ink-3 mb-12 max-w-2xl mx-auto">
            From early experiments to production systems. The architecture emerged from the work itself.
          </p>
          <Timeline projects={allProjects} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-surface">
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
            <a
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 bg-cream text-ink font-bold border-4 border-ink hover:bg-surface transition-colors shadow-brutalist-sm"
            >
              Read the Essays →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
