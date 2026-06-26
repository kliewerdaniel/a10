import Link from 'next/link';
import { Badge } from '@/components/ui/Card';

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
  readingTime: string;
  featured?: boolean;
}

export function BlogCard({ slug, title, date, description, tags, image, readingTime, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="group block card-pointillist overflow-hidden md:col-span-2 transition-all duration-200">
        <div className="md:flex">
          <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/90 via-cream/20 to-transparent md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream/60 hidden md:block" />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Badge color="green">Featured</Badge>
            </div>
            <div className="flex items-center gap-3 mb-3 text-sm text-ink-3 font-bold">
              <time>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              <span className="w-1 h-1 rounded-full bg-ink" />
              <span>{readingTime}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display text-ink mb-4 group-hover:text-pink transition-colors leading-tight">
              {title}
            </h2>
            <p className="text-ink-3 mb-5 line-clamp-3 leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag) => (
                <Badge key={tag} color="orange">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className="group block card-pointillist overflow-hidden transition-all duration-200">
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-sm text-ink-3 font-bold">
          <time>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
          <span className="w-1 h-1 rounded-full bg-ink" />
          <span>{readingTime}</span>
        </div>
        <h3 className="text-lg font-display text-ink mb-3 group-hover:text-pink transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-ink-3 mb-4 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} color="yellow">{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
