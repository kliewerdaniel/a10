import Link from 'next/link';

interface FleetDomainCardProps {
  slug: string;
  name: string;
  description: string;
  color?: string;
  articleCount?: number;
  systemCount?: number;
}

/** A "fleet domain": a question the Fleet's substrate has been proven against. */
export function FleetDomainCard({ slug, name, description, articleCount, systemCount }: FleetDomainCardProps) {
  return (
    <Link
      href={`/fleet/${slug}`}
      className="group block card-ed p-7 hover:border-[var(--color-green)] transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors">
          {name}
        </h3>
        <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">{systemCount ?? 0} systems</span>
      </div>
      <p className="text-sm text-[var(--color-ink-3)] leading-relaxed mb-5">{description}</p>
      <div className="border-t border-[var(--color-rule)] pt-3 flex items-center justify-between">
        <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">{articleCount ?? 0} posts</span>
        <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-green)] group-hover:underline">Enter domain →</span>
      </div>
    </Link>
  );
}
