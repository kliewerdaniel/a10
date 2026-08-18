import Link from 'next/link';
import { StatusPill } from './StatusPill';
import { TopicChip } from './TopicChip';

interface ResearchCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  category?: string;
  featured?: boolean;
  status?: string;
  topics?: string[];
}

export function ResearchCard({ slug, title, date, description, tags, readingTime, category, featured, status = 'observed', topics = [] }: ResearchCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block card-ed p-6 hover:border-[var(--color-green)] transition-colors">
      <div className="flex items-center gap-3 mb-3">
        {status && <StatusPill status={status} />}
        {category && (
          <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">
            {category.replace('-', ' ')}
          </span>
        )}
      </div>
      <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-ink-3)] mt-3 line-clamp-2 leading-relaxed">{description}</p>
      <div className="flex items-center gap-3 text-xs text-[var(--color-ink-3)] font-mono tracking-[0.1em] uppercase mt-4">
        <time>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
        <span className="w-1 h-1 rounded-full bg-[var(--color-ink-3)]" />
        <span>{readingTime}</span>
      </div>
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {topics.slice(0, 3).map((t) => (
            <TopicChip key={t} topic={t} />
          ))}
        </div>
      )}
    </Link>
  );
}
