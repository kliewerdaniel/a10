import { Project } from '@/lib/projects';

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-xl mb-4">Related Projects</h3>
      <div className="space-y-3">
        {projects.slice(0, 3).map((project) => (
          <div key={project.slug} className="border-t border-ink pt-3 mt-3">
            <a
              href={`/projects/${project.layer}/${project.slug}`}
              className="block hover:text-pink-dark transition-colors"
            >
              <h4 className="font-display text-ink mb-1">{project.name}</h4>
              <p className="text-xs text-ink-3 line-clamp-2">{project.summary}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
