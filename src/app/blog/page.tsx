import Link from 'next/link';
import { getAllBlogPosts, getCategoryArticleCounts } from '@/lib/blog';
import categories from '@/data/research-categories.json';
import { Badge } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const POSTS_PER_PAGE = 20;

export const dynamic = 'force-static';

export const metadata = {
  title: 'Blog',
  description: 'Chronological essays and field notes on sovereign AI, local-first architecture, agent systems, and knowledge infrastructure.',
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();
  const counts = getCategoryArticleCounts();
  const current = posts.slice(0, POSTS_PER_PAGE);

  const categoryMeta = categories.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    count: counts[cat.slug] || 0,
  }));

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
            ]}
          />
          <span className="mono text-pink text-xs mb-3 block">Journal</span>
          <h1 className="font-display text-4xl md:text-5xl mb-4">Blog</h1>
          <p className="text-ink-3 max-w-2xl text-lg leading-relaxed">
            Chronological essays and field notes on sovereign AI, local-first architecture,
            agent systems, and knowledge infrastructure.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {categoryMeta.map((cat) => (
              <span
                key={cat.slug}
                className="mono text-[10px] px-2 py-1 border-2 border-ink bg-cream text-ink"
              >
                {cat.name}: {cat.count}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="mono text-green text-xs mb-3 block">Full Blog Feed</span>
            <h2 className="font-display text-2xl md:text-3xl">All Posts</h2>
            <p className="text-ink-3 mt-2 text-sm">
              {posts.length} articles in chronological order.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {current.map((post) => (
              <article
                key={post.slug}
                className="border-4 border-ink bg-cream dark:bg-base p-6 shadow-brutalist-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutalist-lg"
              >
                <div className="flex items-center gap-3 mb-3 text-xs text-ink-3 font-bold">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <h3 className="font-display text-xl text-ink group-hover:text-pink transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-ink-3 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge color="green">{post.category}</Badge>
                    {post.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} color="green">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length > POSTS_PER_PAGE && (
            <div className="mt-10 flex items-center justify-center">
              <Link
                href="/research"
                className="mono px-4 py-2 text-sm font-bold border-2 border-ink bg-cream text-ink hover:bg-surface transition-colors"
              >
                Browse categorized archive →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
