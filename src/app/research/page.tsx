import type { Metadata } from 'next';
import { getAllBlogPosts, getCornerstonePosts } from '@/lib/blog';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { ResearchSearch } from '@/components/blog/ResearchSearch';

export const metadata: Metadata = {
  title: 'Research',
  description: 'A knowledge base of architectural investigations into local-first AI, cognitive memory, graph reasoning, and computational sovereignty.',
};

export default function ResearchPage() {
  const allPosts = getAllBlogPosts();
  const cornerstone = getCornerstonePosts();
  const latestPosts = allPosts.slice(0, 6);

  const litePosts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description,
    tags: p.tags,
    readingTime: p.readingTime,
    category: p.category,
    featured: p.featured,
  }));

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="mono text-green text-xs mb-4 block">Knowledge Base</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Research</h1>
          <p className="text-ink-3 max-w-2xl mx-auto text-lg leading-relaxed">
            Architectural investigations into local-first AI, cognitive memory, graph reasoning,
            and computational sovereignty. Start with the cornerstone articles or explore by topic.
          </p>
        </div>
      </section>

      {/* Featured Research — Cornerstone Articles */}
      {cornerstone.length > 0 && (
        <section className="py-16 px-4 bg-surface relative">
          <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-10">
              <span className="mono text-pink text-xs mb-3 block">Start Here</span>
              <h2 className="font-display text-2xl md:text-3xl">Featured Research</h2>
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

      {/* Latest Research */}
      <section className="py-16 px-4 reveal">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="mono text-green text-xs mb-3 block">Latest Work</span>
            <h2 className="font-display text-2xl md:text-3xl">Recent Research</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <ResearchCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
                readingTime={post.readingTime}
                category={post.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Articles — Search & Filter */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="mono text-green text-xs mb-3 block">Archive</span>
            <h2 className="font-display text-2xl md:text-3xl">All Articles</h2>
            <p className="text-ink-3 mt-2 text-sm">Search and filter the complete research archive.</p>
          </div>
          <ResearchSearch posts={litePosts} />
        </div>
      </section>
    </main>
  );
}
