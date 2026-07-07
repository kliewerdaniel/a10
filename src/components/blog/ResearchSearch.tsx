'use client';

import { useState, useMemo } from 'react';
import { ResearchCard } from './ResearchCard';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  category: string;
  featured?: boolean;
}

interface ResearchSearchProps {
  posts: Post[];
  allPostsCount?: number;
}

export function ResearchSearch({ posts, allPostsCount }: ResearchSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagMap = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      }
    }
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    if (query.trim()) {
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      result = result.filter((p) => {
        const haystack = `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase();
        return terms.every((term) => haystack.includes(term));
      });
    }

    return result;
  }, [posts, query, selectedTag]);

  return (
    <div>
      <div className="mb-8">
        <div className="relative">
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-ink-3 pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all research..."
            className="w-full pl-14 pr-12 py-5 bg-cream border-4 border-ink text-ink placeholder-ink-3 focus:outline-none focus:bg-surface transition-colors font-bold text-xl"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`mono px-3 py-1.5 text-xs font-bold border-2 border-ink transition-colors ${
            selectedTag === null ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-surface'
          }`}
        >
          All
        </button>
        {allTags.slice(0, 20).map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`mono px-3 py-1.5 text-xs font-bold border-2 border-ink transition-colors ${
              selectedTag === tag ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-surface'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-3 mb-2 font-bold text-lg">No articles found</p>
          <p className="text-sm text-ink-3 font-bold">
            {query ? `No results for "${query}"` : 'Try a different tag filter'}
          </p>
        </div>
      ) : (
        <>
          <p className="mono text-xs text-ink-3 mb-4">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <ResearchCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
                readingTime={post.readingTime}
                category={post.category}
                featured={post.featured}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
