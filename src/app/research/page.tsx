import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, getCornerstonePosts } from '@/lib/blog';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { ResearchSearch } from '@/components/blog/ResearchSearch';

const POSTS_PER_PAGE = 20;

interface ResearchPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: ResearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);

  const title = page === 1 ? 'Research' : `Research — Page ${page}`;
  const description = 'A knowledge base of architectural investigations into local-first AI, cognitive memory, graph reasoning, and computational sovereignty.';

  return {
    title,
    description,
    alternates: {
      canonical: page === 1 ? '/research' : `/research?page=${page}`,
    },
  };
}

export default async function ResearchPage({ searchParams }: ResearchPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);

  const allPosts = getAllBlogPosts();
  const cornerstone = getCornerstonePosts();
  const latestPosts = allPosts.slice(0, 6);
  const archivePosts = allPosts.slice(6);

  const totalPages = Math.ceil(archivePosts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = archivePosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const litePosts = currentPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description,
    tags: p.tags,
    readingTime: p.readingTime,
    category: p.category,
    featured: p.featured,
  }));

  const prevUrl = page > 1 ? (page === 2 ? '/research' : `/research?page=${page - 1}`) : null;
  const nextUrl = page < totalPages ? `/research?page=${page + 1}` : null;

  return (
    <main className="min-h-screen">
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}
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
            <p className="text-ink-3 mt-2 text-sm">
              Showing {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, archivePosts.length)} of {archivePosts.length} articles.
            </p>
          </div>
          <ResearchSearch posts={litePosts} allPostsCount={archivePosts.length} />

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
              {page > 1 && (
                <Link
                  href={page === 2 ? '/research' : `/research?page=${page - 1}`}
                  className="mono px-4 py-2 text-sm font-bold border-2 border-ink bg-cream text-ink hover:bg-surface transition-colors"
                  rel="prev"
                >
                  ← Prev
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const href = p === 1 ? '/research' : `/research?page=${p}`;
                const isCurrent = p === page;

                if (totalPages <= 7 || Math.abs(p - page) <= 1 || p === 1 || p === totalPages) {
                  return (
                    <Link
                      key={p}
                      href={href}
                      className={`mono px-3 py-2 text-sm font-bold border-2 border-ink transition-colors ${
                        isCurrent
                          ? 'bg-ink text-cream'
                          : 'bg-cream text-ink hover:bg-surface'
                      }`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {p}
                    </Link>
                  );
                }

                if (Math.abs(p - page) === 2) {
                  return (
                    <span key={p} className="mono px-2 py-2 text-sm text-ink-3">
                      …
                    </span>
                  );
                }

                return null;
              })}

              {page < totalPages && (
                <Link
                  href={`/research?page=${page + 1}`}
                  className="mono px-4 py-2 text-sm font-bold border-2 border-ink bg-cream text-ink hover:bg-surface transition-colors"
                  rel="next"
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
