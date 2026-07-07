import Link from 'next/link';
import { Badge } from '@/components/ui/Card';

interface ResearchCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  category?: string;
  featured?: boolean;
}

const categoryColors: Record<string, 'green' | 'pink' | 'orange' | 'yellow'> = {
  architecture: 'green',
  'memory-retrieval': 'pink',
  'agent-systems': 'orange',
  'local-ai': 'yellow',
  engineering: 'green',
  theory: 'pink',
  experiments: 'orange',
};

export function ResearchCard({ slug, title, date, description, tags, readingTime, category, featured }: ResearchCardProps) {
  const badgeColor = category ? (categoryColors[category] || 'green') : 'green';

  return (
    <Link href={`/blog/${slug}`} className="group block card-pointillist overflow-hidden transition-all duration-200">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-sm text-ink-3 font-bold">
          <time>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
          <span className="w-1 h-1 rounded-full bg-ink" />
          <span>{readingTime}</span>
          {featured && <Badge color="green">Featured</Badge>}
        </div>
        <h3 className="text-lg font-display text-ink mb-3 group-hover:text-pink transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-ink-3 mb-4 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} color={badgeColor}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
