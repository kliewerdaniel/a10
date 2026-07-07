import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getPostsByCategory, getCategoryBySlug } from '@/lib/blog';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export function generateStaticParams() {
  return getCategories().map((cat) => ({ category: cat.slug }));
}

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: 'Not Found' };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function ResearchCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Research', url: '/research' },
              { name: cat.name, url: `/research/${slug}` },
            ]}
          />
          <Link href="/research" className="text-sm font-bold accent-green hover:text-green-dark transition-colors mb-6 inline-block">
            ← Back to Research
          </Link>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{cat.name}</h1>
          <p className="text-ink-3 text-lg leading-relaxed max-w-2xl">{cat.description}</p>
          <p className="mono text-xs text-ink-3 mt-4">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-3 text-lg">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
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
          )}
        </div>
      </section>
    </main>
  );
}
