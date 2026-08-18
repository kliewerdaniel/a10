import type { Metadata } from 'next';
import { getAllBlogPosts, getCategoryArticleCounts } from '@/lib/blog';
import { getSearchIndex } from '@/lib/artifacts';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { CategoryCard } from '@/components/blog/CategoryCard';
import { ResearchArchive } from '@/components/blog/ResearchSearch';
import { ArticleSearch, type SearchItem } from '@/components/blog/ArticleSearch';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FleetTrustBar } from '@/components/fleet/FleetTrustBar';
import categories from '@/data/research-categories.json';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'The Sovereign Agent Fleet research log — 177 posts compiled at build time into provenanced, inspectable artifacts, organized by the questions they explore, not by date.',
  alternates: { canonical: '/research' },
};

export default async function ResearchPage() {
  const allPosts = getAllBlogPosts();
  const categoryCounts = getCategoryArticleCounts();

  const litePosts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description.length > 120 ? p.description.slice(0, 117) + '...' : p.description,
    tags: p.tags,
    readingTime: p.readingTime,
    category: p.category,
    featured: p.featured,
    status: p.status,
    topics: p.topics,
  }));

  const categoryCards = categories.map((cat) => ({
    ...cat,
    articleCount: categoryCounts[cat.slug] || 0,
  }));

  const searchItems: SearchItem[] =
    getSearchIndex()?.entries.map((e) => ({ slug: e.slug, title: e.title, excerpt: e.excerpt })) ??
    allPosts.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.description }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-5 sm:px-8 pt-28 pb-16 max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Research', url: '/research' },
          ]}
        />
        <span className="kicker mb-4 block">The Research Log</span>
        <h1 className="font-serif font-medium text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
          The accumulated<br />record.
        </h1>
        <p className="text-[var(--color-ink-3)] max-w-2xl text-lg leading-relaxed mt-7">
          {allPosts.length} posts, compiled at build time into provenanced, inspectable artifacts —
          organized by the questions they explore, not by date. Every entry carries an epistemic
          status and a content hash you can verify.
        </p>
        <div className="max-w-md mt-8">
          <ArticleSearch items={searchItems} />
        </div>
      </section>

      {/* The Fleet invariants — research is the empirical record */}
      <section className="section-rule">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <FleetTrustBar />
        </div>
      </section>

      {/* Category Browser */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="kicker mb-3 block">Browse by Question</span>
            <h2 className="font-serif font-medium text-2xl md:text-3xl tracking-[-0.015em] text-[var(--color-ink)]">Fleet Domains &amp; Topics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            {categoryCards.map((cat) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                description={cat.description}
                color={cat.color}
                articleCount={cat.articleCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search & Explore — client-side pagination over full archive */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="kicker mb-3 block">Full Archive</span>
            <h2 className="font-serif font-medium text-2xl md:text-3xl tracking-[-0.015em] text-[var(--color-ink)]">All Research</h2>
          </div>
          <ResearchArchive posts={litePosts} />
        </div>
      </section>
    </div>
  );
}
