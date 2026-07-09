import type { Metadata } from 'next';
import { getAllBlogPosts, getCornerstonePosts, getCategoryArticleCounts } from '@/lib/blog';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { ResearchArchive } from '@/components/blog/ResearchSearch';
import { CategoryCard } from '@/components/blog/CategoryCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import categories from '@/data/research-categories.json';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Research',
  description: 'A knowledge base of architectural investigations into local-first AI, cognitive memory, graph reasoning, and computational sovereignty.',
};

export default async function ResearchPage() {
  const allPosts = getAllBlogPosts();
  const cornerstone = getCornerstonePosts();
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
  }));

  const categoryCards = categories.map((cat) => ({
    ...cat,
    articleCount: categoryCounts[cat.slug] || 0,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Research', url: '/research' },
            ]}
          />
          <span className="mono text-green text-xs mb-4 block">Knowledge Hub</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Research</h1>
          <p className="text-ink-3 max-w-2xl mx-auto text-lg leading-relaxed">
            Architectural investigations into local-first AI, cognitive memory, graph reasoning,
            and computational sovereignty.
          </p>
        </div>
      </section>

      {/* Featured Research */}
      {cornerstone.length > 0 && (
        <section className="py-16 px-4 bg-surface relative">
          <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-10">
              <span className="mono text-pink text-xs mb-3 block">Start Here</span>
              <h2 className="font-display text-2xl md:text-3xl">Start Here</h2>
              <p className="text-ink-3 mt-2 text-sm">The essential articles that introduce the architecture and connect the research.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cornerstone.map((post) => (
                <ResearchCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  description={post.description}
                  tags={post.tags}
                  readingTime={post.readingTime}
                  category={post.category}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Browser */}
      <section className="py-16 px-4 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-10">
            <span className="mono text-green text-xs mb-3 block">Browse by Topic</span>
            <h2 className="font-display text-2xl md:text-3xl">Category Browser</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="mono text-green text-xs mb-3 block">Full Archive</span>
            <h2 className="font-display text-2xl md:text-3xl">All Research</h2>
          </div>
          <ResearchArchive posts={litePosts} />
        </div>
      </section>
    </div>
  );
}
