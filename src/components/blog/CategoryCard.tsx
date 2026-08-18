import Link from 'next/link';

interface CategoryCardProps {
  slug: string;
  name: string;
  description: string;
  color: string;
  articleCount: number;
  featuredArticle?: {
    slug: string;
    title: string;
    description: string;
  };
}

const dotMap: Record<string, string> = {
  green: 'bg-[var(--color-green)]',
  pink: 'bg-[var(--color-pink)]',
  orange: 'bg-[var(--color-orange)]',
  yellow: 'bg-[var(--color-yellow)]',
};

export function CategoryCard({ slug, name, description, color, articleCount, featuredArticle }: CategoryCardProps) {
  const dot = dotMap[color] || 'bg-[var(--color-green)]';

  return (
    <Link
      href={`/research/${slug}`}
      className="group block card-ed p-7 hover:border-[var(--color-green)] transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
          <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors">{name}</h3>
        </div>
        <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">{articleCount} article{articleCount !== 1 ? 's' : ''}</span>
      </div>
      <p className="text-sm text-[var(--color-ink-3)] leading-relaxed mb-4">{description}</p>
      {featuredArticle && (
        <div className="border-t border-[var(--color-rule)] pt-3">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)] mb-1">Featured</p>
          <p className="text-sm font-serif text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors line-clamp-1">{featuredArticle.title}</p>
        </div>
      )}
    </Link>
  );
}
