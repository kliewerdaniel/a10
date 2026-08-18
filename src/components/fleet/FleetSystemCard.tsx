import Link from 'next/link';
import { StatusBadge } from '@/components/projects/StatusBadge';

interface FleetSystemCardProps {
  slug: string;
  layer: string;
  name: string;
  summary: string;
  status: 'production' | 'active' | 'experimental' | 'archived';
  technologies: string[];
}

/** A "fleet deployment": a concrete system that exercises the substrate in a domain. */
export function FleetSystemCard({ slug, layer, name, summary, status, technologies }: FleetSystemCardProps) {
  return (
    <div className="card-ed p-6 hover:border-[var(--color-green)] transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <Link
          href={`/fleet/${layer}/${slug}`}
          className="font-serif text-xl font-medium text-[var(--color-ink)] hover:text-[var(--color-green)] transition-colors"
        >
          {name}
        </Link>
        <StatusBadge status={status} />
      </div>
      <p className="text-sm text-[var(--color-ink-3)] leading-relaxed mb-4">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.slice(0, 5).map((tech) => (
          <span key={tech} className="px-2 py-1 font-mono text-[0.58rem] tracking-[0.1em] uppercase border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-3)]">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
