'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
}

/**
 * Lexical (client-side) search over the compiled search.json entries. No runtime
 * server, no embeddings — ranking is a simple term-overlap score. Progressive
 * enhancement: the full list renders without JS; typing filters it live.
 */
export function ArticleSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(false);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items.slice(0, 12);
    const terms = query.split(/\s+/).filter(Boolean);
    const scored = items
      .map((it) => {
        const hay = `${it.title} ${it.excerpt}`.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (it.title.toLowerCase().includes(t)) score += 3;
          if (hay.includes(t)) score += 1;
        }
        return { it, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
    return scored.map((r) => r.it);
  }, [q, items]);

  return (
    <div className="article-search">
      <input
        type="search"
        value={q}
        onFocus={() => setActive(true)}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search the research log…"
        aria-label="Search articles"
        className="w-full font-mono text-xs px-3 py-2 border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-3)] focus:outline-none focus:border-[var(--color-ink)]"
      />
      {active && (
        <ul className="mt-3 space-y-1.5 max-h-80 overflow-auto">
          {results.length === 0 && (
            <li className="font-mono text-[10px] text-[var(--color-ink-3)] px-1">No matches.</li>
          )}
          {results.map((it) => (
            <li key={it.slug}>
              <Link
                href={`/blog/${it.slug}`}
                className="block border border-[var(--color-rule)] hover:border-[var(--color-ink)] hover:bg-[var(--color-paper-2)] px-3 py-2 transition-colors"
              >
                <span className="font-serif text-sm text-[var(--color-ink)] leading-snug block">{it.title}</span>
                <span className="font-mono text-[9px] text-[var(--color-ink-3)]">{it.excerpt.slice(0, 90)}…</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
