import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { BlogSearch } from '@/components/blog/BlogSearch';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Deep dives into local-first AI, sovereignty, and building intelligent systems by Daniel Kliewer.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const litePosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description,
    tags: p.tags,
    image: p.image,
    readingTime: p.readingTime,
  }));

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Blog</h1>
          <p className="text-ink-3 max-w-2xl mx-auto font-bold">
            Deep dives into local-first AI, data sovereignty, and building intelligent systems.
            Every post references concepts from <em>Sovereign AI</em>.
          </p>
        </div>

        <BlogSearch posts={litePosts} />
      </div>
    </section>
  );
}
