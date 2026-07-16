import { getArchitecture, getLayers, getAllProjects } from '@/lib/projects';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import Link from 'next/link';

export const metadata = {
  title: {
    default: 'Research Directions',
    template: '%s',
  },
  description:
    'The projects on this site, grouped by the larger questions they explore — knowledge compilation, compile-time AI, local-first systems, cognitive memory, and more. All working toward one mission: reducing the cost of understanding human knowledge.',
};

export default function ProjectsPage() {
  const architecture = getArchitecture();
  const layers = getLayers();
  const projects = getAllProjects();
  const sorted = [...projects].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );
  const byYear = sorted.reduce<Record<string, typeof projects>>((acc, project) => {
    const year = new Date(project.created).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort().reverse();

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="mono text-green text-xs mb-4 block">One Mission, Many Directions</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            {architecture.title}
          </h1>
          <p className="text-xl md:text-2xl text-ink-3 mb-6 max-w-3xl mx-auto leading-relaxed">
            {architecture.subtitle}
          </p>
          <p className="text-lg text-ink-3/80 max-w-2xl mx-auto">
            {architecture.narrative}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center">
            The Architecture
          </h2>
          <ArchitectureDiagram layers={layers} />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center">
            Evolution
          </h2>
          <p className="text-center text-ink-3 mb-12 max-w-2xl mx-auto">
            From early experiments to production systems.
          </p>
          <div className="space-y-10">
            {years.map((year) => (
              <div key={year}>
                <h3 className="font-display text-3xl md:text-4xl mb-4">
                  {year}
                </h3>
                <div className="space-y-4">
                  {byYear[year].map((project) => (
                    <div
                      key={project.slug}
                      className="border-4 border-ink bg-cream p-4"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <Link
                          href={`/projects/${project.layer}/${project.slug}`}
                          className="font-display text-lg hover:text-pink-dark transition-colors"
                        >
                          {project.name}
                        </Link>
                        <span className="inline-flex items-center border-2 border-ink px-2 py-1 text-xs font-bold uppercase">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-ink-3 mb-2">
                        {project.summary}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-bold border-2 border-ink bg-cream text-ink"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
