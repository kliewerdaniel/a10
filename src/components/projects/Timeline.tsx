import { Project } from '@/lib/projects';
import { StatusBadge } from './StatusBadge';
import { TechTag } from './TechTag';
import Link from 'next/link';

interface TimelineProps {
  projects: Project[];
}

export function Timeline({ projects }: TimelineProps) {
  // Sort projects by creation date
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  // Group by year
  const byYear: Record<string, Project[]> = {};
  sortedProjects.forEach((project) => {
    const year = new Date(project.created).getFullYear().toString();
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(project);
  });

  const years = Object.keys(byYear).sort().reverse();

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ink/20" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {years.map((year) => (
          <div key={year} className="relative">
            {/* Year Marker */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-4 h-4 rounded-full bg-ink border-4 border-cream z-10 relative" />
              <h3 className="font-display text-3xl md:text-4xl">{year}</h3>
            </div>

            {/* Projects */}
            <div className="ml-8 space-y-4">
              {byYear[year].map((project) => (
                <div
                  key={project.slug}
                  className="card-pointillist p-4 hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Link
                      href={`/projects/${project.layer}/${project.slug}`}
                      className="font-display text-lg hover:text-pink-dark transition-colors"
                    >
                      {project.name}
                    </Link>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-sm text-ink-3 mb-2 line-clamp-2">{project.summary}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <TechTag key={tech} technology={tech} />
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-ink-3">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
