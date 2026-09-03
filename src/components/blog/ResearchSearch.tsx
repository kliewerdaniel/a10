'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
  status?: string;
  topics?: string[];
}

interface ResearchArchiveProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 20;

function getPageNumbers(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (currentPage > 3) {
    pages.push('...');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);
  return pages;
}

export function ResearchArchive({ posts }: ResearchArchiveProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const [page, setPage] = useState(initialPage);
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Update document title for pagination pages to avoid duplicate titles
  useEffect(() => {
    if (page > 1) {
      document.title = `Research (Page ${page}) | Daniel Kliewer`;
    } else {
      document.title = 'Research | Daniel Kliewer';
    }
  }, [page]);

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

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const safePage = Math.min(Math.max(1, page), totalPages || 1);
  const startIdx = (safePage - 1) * POSTS_PER_PAGE;
  const currentPosts = filtered.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const navigate = useCallback(
    (newPage: number) => {
      setPage(newPage);
      const params = new URLSearchParams(searchParams.toString());
      if (newPage === 1) {
        params.delete('page');
      } else {
        params.set('page', String(newPage));
      }
      const qs = params.toString();
      router.push(qs ? `/research?${qs}` : '/research', { scroll: false });
      window.scrollTo({ top: document.getElementById('all-research')?.offsetTop ?? 0, behavior: 'smooth' });
    },
    [router, searchParams],
  );

  const handleTagSelect = useCallback(
    (tag: string | null) => {
      setSelectedTag((prev) => (prev === tag ? null : tag));
      setPage(1);
    },
    [],
  );

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setPage(1);
  }, []);

  return (
    <div id="all-research">
      <div className="mb-8">
        <div className="relative">
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--color-ink-3)] pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search all research..."
            className="w-full pl-14 pr-12 py-5 bg-[var(--color-paper-2)] border border-[var(--color-rule)] text-[var(--color-ink)] placeholder-[var(--color-ink-3)] focus:outline-none focus:border-[var(--color-ink)] transition-colors font-serif text-xl"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
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
          onClick={() => handleTagSelect(null)}
          className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase px-3 py-1.5 border transition-colors ${
            selectedTag === null ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]' : 'bg-[var(--color-paper-2)] text-[var(--color-ink-3)] border-[var(--color-rule)] hover:border-[var(--color-ink)]'
          }`}
        >
          All
        </button>
        {allTags.slice(0, 20).map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => handleTagSelect(tag)}
            className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase px-3 py-1.5 border transition-colors ${
              selectedTag === tag ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]' : 'bg-[var(--color-paper-2)] text-[var(--color-ink-3)] border-[var(--color-rule)] hover:border-[var(--color-ink)]'
            }`}
          >
            {tag} <span className="opacity-50">{count}</span>
          </button>
        ))}
      </div>

      <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)] mb-4">
        {startIdx + 1}–{Math.min(startIdx + POSTS_PER_PAGE, filtered.length)} of {filtered.length} article{filtered.length !== 1 ? 's' : ''}
      </p>

      {currentPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--color-ink)] mb-2 font-serif text-lg">No articles found</p>
          <p className="text-sm text-[var(--color-ink-3)]">
            {query ? `No results for "${query}"` : 'Try a different tag filter'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentPosts.map((post) => (
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
              status={post.status}
              topics={post.topics}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
          {safePage > 1 && (
            <button
              onClick={() => navigate(safePage - 1)}
              className="font-mono text-[0.6rem] tracking-[0.14em] uppercase px-4 py-2 border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
            >
              ← Prev
            </button>
          )}

          {getPageNumbers(safePage, totalPages).map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="font-mono px-2 py-2 text-sm text-[var(--color-ink-3)]">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase px-3 py-2 border transition-colors ${
                  p === safePage
                    ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                    : 'bg-[var(--color-paper-2)] text-[var(--color-ink)] border-[var(--color-rule)] hover:border-[var(--color-ink)]'
                }`}
                aria-current={p === safePage ? 'page' : undefined}
              >
                {p}
              </button>
            ),
          )}

          {safePage < totalPages && (
            <button
              onClick={() => navigate(safePage + 1)}
              className="font-mono text-[0.6rem] tracking-[0.14em] uppercase px-4 py-2 border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
            >
              Next →
            </button>
          )}
        </nav>
      )}

      {/* Static page links for crawlers — client nav is invisible to search engines */}
      {totalPages > 1 && (
        <nav className="sr-only" aria-label="Page links">
          <ul className="list-none">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p}>
                <Link href={p === 1 ? '/research' : `/research?page=${p}`}>
                  Page {p}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
