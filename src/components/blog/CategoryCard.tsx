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

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  green: { border: 'border-green', bg: 'bg-green/5', text: 'accent-green', dot: 'bg-green' },
  pink: { border: 'border-pink', bg: 'bg-pink/5', text: 'accent-pink', dot: 'bg-pink' },
  orange: { border: 'border-orange', bg: 'bg-orange/5', text: 'accent-orange', dot: 'bg-orange' },
  yellow: { border: 'border-yellow', bg: 'bg-yellow/5', text: 'accent-yellow', dot: 'bg-yellow' },
};

export function CategoryCard({ slug, name, description, color, articleCount, featuredArticle }: CategoryCardProps) {
  const c = colorMap[color] || colorMap.green;

  return (
    <Link
      href={`/research/${slug}`}
      className={`group block border-4 border-ink ${c.bg} p-6 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutalist-lg`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
          <h3 className="font-display text-ink text-lg group-hover:text-pink transition-colors">{name}</h3>
        </div>
        <span className="mono text-xs text-ink-3">{articleCount} article{articleCount !== 1 ? 's' : ''}</span>
      </div>
      <p className="text-sm text-ink-3 leading-relaxed mb-4">{description}</p>
      {featuredArticle && (
        <div className="border-t-2 border-ink/10 pt-3">
          <p className="mono text-[10px] text-ink-3 mb-1">Featured</p>
          <p className="text-sm font-bold text-ink group-hover:text-pink transition-colors line-clamp-1">{featuredArticle.title}</p>
        </div>
      )}
    </Link>
  );
}
