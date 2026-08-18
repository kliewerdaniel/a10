import { Project } from '@/lib/projects';

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <div>
      <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] mb-4">Related Projects</h3>
      <div className="space-y-3">
        {projects.slice(0, 3).map((project) => (
          <div key={project.slug} className="border-t border-[var(--color-rule)] pt-3 first:border-t-0 first:pt-0">
            <a
              href={`/fleet/${project.layer}/${project.slug}`}
              className="block hover:text-[var(--color-green)] transition-colors"
            >
              <h4 className="font-serif text-[var(--color-ink)] mb-1">{project.name}</h4>
              <p className="text-xs text-[var(--color-ink-3)] line-clamp-2">{project.summary}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
