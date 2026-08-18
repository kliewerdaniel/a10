import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/blog';

export function BlogThemeBanner({ category }: { category: string }) {
  const cat = getCategoryBySlug(category);
  if (!cat) return null;

  const toneMap: Record<string, string> = {
    green: 'text-[var(--color-green)] border-[var(--color-green)]',
    pink: 'text-[var(--color-pink)] border-[var(--color-pink)]',
    orange: 'text-[var(--color-orange)] border-[var(--color-orange)]',
    yellow: 'text-[var(--color-yellow)] border-[var(--color-yellow)]',
  };
  const tone = toneMap[cat.color] || 'text-[var(--color-ink)] border-[var(--color-rule)]';

  return (
    <Link
      href={`/research/${cat.slug}`}
      className={`inline-flex items-center gap-2 border px-3 py-1.5 mb-8 hover:opacity-70 transition-opacity ${tone}`}
    >
      <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase font-medium">Research Theme</span>
      <span className="font-serif text-sm">{cat.name}</span>
      <span className="text-sm">→</span>
    </Link>
  );
}
