import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/blog';

export function BlogThemeBanner({ category }: { category: string }) {
  const cat = getCategoryBySlug(category);
  if (!cat) return null;

  const colorMap: Record<string, string> = {
    green: 'border-green bg-green/10 text-green',
    pink: 'border-pink bg-pink/10 text-pink',
    orange: 'border-orange bg-orange/10 text-orange',
    yellow: 'border-yellow bg-yellow/10 text-ink',
  };
  const tone = colorMap[cat.color] || 'border-ink bg-surface text-ink';

  return (
    <Link
      href={`/research/${cat.slug}`}
      className={`inline-flex items-center gap-2 border-2 px-3 py-1.5 mb-8 hover:shadow-brutalist-sm transition-all ${tone}`}
    >
      <span className="mono text-[10px] font-bold uppercase tracking-wider">Research Theme</span>
      <span className="text-sm font-bold">{cat.name}</span>
      <span className="text-sm font-bold">→</span>
    </Link>
  );
}
