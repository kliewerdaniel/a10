import Link from 'next/link';
import { StatusPill } from './StatusPill';
import { TopicChip } from './TopicChip';

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
  readingTime: string;
  featured?: boolean;
  status?: string;
  topics?: string[];
}

export function BlogCard({ slug, title, date, description, tags, image, readingTime, featured = false, status = 'observed', topics = [] }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="group block card-ed overflow-hidden md:col-span-2 hover:border-[var(--color-green)] transition-colors">
        <div className="md:flex">
          <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden bg-[var(--color-paper-2)]">
            <img src={image} alt={title} width={640} height={360} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-green)]">Featured</span>
              <StatusPill status={status} />
            </div>
            <div className="flex items-center gap-3 mb-3 text-sm text-[var(--color-ink-3)] font-mono tracking-[0.1em] uppercase">
              <time>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              <span className="w-1 h-1 rounded-full bg-[var(--color-ink-3)]" />
              <span>{readingTime}</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-4 group-hover:text-[var(--color-green)] transition-colors leading-tight">
              {title}
            </h2>
            <p className="text-[var(--color-ink-3)] mb-5 line-clamp-3 leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-2">
              {(topics.length > 0 ? topics : tags).slice(0, 4).map((tag) => (
                <TopicChip key={tag} topic={tag} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className="group block card-ed overflow-hidden hover:border-[var(--color-green)] transition-colors">
      <div className="aspect-video relative overflow-hidden bg-[var(--color-paper-2)]">
        <img src={image} alt={title} width={640} height={360} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-sm text-[var(--color-ink-3)] font-mono tracking-[0.1em] uppercase">
          <time>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
          <span className="w-1 h-1 rounded-full bg-[var(--color-ink-3)]" />
          <span>{readingTime}</span>
        </div>
        <div className="mb-3">
          <StatusPill status={status} />
        </div>
        <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-green)] transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-ink-3)] mb-4 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {(topics.length > 0 ? topics : tags).slice(0, 3).map((tag) => (
            <TopicChip key={tag} topic={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
