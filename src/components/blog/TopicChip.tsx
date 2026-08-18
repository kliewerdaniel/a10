import Link from 'next/link';

/**
 * Lightweight topic chip for discovery. Lowercase-kebab topics render as
 * human-readable labels (e.g. "local-first-ai" -> "Local First Ai").
 */
export function TopicChip({ topic, href = '#' }: { topic: string; href?: string }) {
  const label = topic
    .split('-')
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
  const inner = (
    <span className="inline-flex items-center font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2 py-0.5 border border-[var(--color-rule)] text-[var(--color-ink-3)] hover:text-[var(--color-green)] hover:border-[var(--color-green)] transition-colors">
      #{label}
    </span>
  );
  return href === '#' ? inner : <Link href={href}>{inner}</Link>;
}
