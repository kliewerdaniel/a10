import Link from 'next/link';

interface ProjectCardProps {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  blogSlug?: string;
}

export function ProjectCard({ name, description, stars, language, url, blogSlug }: ProjectCardProps) {
  return (
    <div className="card-pointillist p-6 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-4 border-ink bg-cream flex items-center justify-center group-hover:bg-pink group-hover:text-cream transition-all relative overflow-hidden">
            <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <h3 className="font-display text-lg group-hover:text-pink transition-colors">{name}</h3>
        </div>
        {stars > 0 && (
          <div className="flex items-center gap-1.5 text-sm font-bold bg-cream border-2 border-ink px-2.5 py-1">
            <svg className="w-3.5 h-3.5 text-yellow" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span>{stars}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-ink-3 mb-5 line-clamp-3 leading-relaxed">{description}</p>
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-1 text-xs font-bold bg-cream border-2 border-ink text-ink-3">{language}</span>
        <div className="flex gap-3">
          {blogSlug && <Link href={`/blog/${blogSlug}`} className="text-xs accent-pink font-bold transition-colors">Read More →</Link>}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-3 hover:text-ink font-bold transition-colors">Source ↗</a>
        </div>
      </div>
    </div>
  );
}
