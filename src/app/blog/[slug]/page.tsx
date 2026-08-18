import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { getSidecar, getRelatedMap, getArtifactIndexMap } from '@/lib/artifacts';
import { BookCTA } from '@/components/blog/BookCTA';
import { BlogThemeBanner } from '@/components/blog/BlogThemeBanner';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { StatusPill } from '@/components/blog/StatusPill';
import { TopicChip } from '@/components/blog/TopicChip';
import { ProvenancePanel } from '@/components/blog/ProvenancePanel';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonicalUrl ?? `/blog/${post.slug}`,
      types: {
        'text/plain': `/blog-txt/${post.slug}.txt`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const sidecar = getSidecar(slug);
  const relatedMap = getRelatedMap();
  const indexMap = getArtifactIndexMap();
  const relatedSlugs = (relatedMap.get(slug) || [])
    .map((s) => indexMap.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 5);

  const baseUrl = 'https://www.danielkliewer.com';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;

  function toIsoDate(dateStr: string): string {
    if (!dateStr || typeof dateStr !== 'string') return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr;
    const match = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})/);
    if (match) return `${match[3]}-${match[1]}-${match[2]}`;
    return dateStr;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.lastmod),
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${baseUrl}/about`,
    },
    image: imageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Daniel Kliewer',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <article className="section-pad">
      <ReadingProgress />
      <JsonLd data={articleSchema} />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="max-w-3xl mx-auto lg:max-w-none lg:flex-1 min-w-0">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Research', url: '/research' },
              { name: post.title, url: `/blog/${post.slug}` },
            ]}
          />
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-[var(--color-ink-3)] font-medium">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-serif font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] text-[var(--color-ink)] mb-4">{post.title}</h1>
          <p className="font-serif text-xl text-[var(--color-ink-3)] mb-5 leading-relaxed">{post.description}</p>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--color-green)] flex items-center justify-center">
              <span className="text-[var(--color-paper)] text-sm font-medium">DK</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-ink)]">{post.author}</p>
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">Author, Sovereign AI</p>
            </div>
            <StatusPill status={post.status} className="ml-auto" />
          </div>
          <div className="flex flex-wrap gap-2">
            {(post.topics.length > 0 ? post.topics : post.tags).map((tag) => (
              <TopicChip key={tag} topic={tag} />
            ))}
          </div>
        </header>

        <BlogThemeBanner category={post.category} />

        <BookCTA variant="inline" />

        {post.image && (
          <div className="my-8 border border-[var(--color-rule)] overflow-hidden">
            <img src={post.image} alt={post.title} width={1200} height={630} className="w-full h-auto" loading="lazy" decoding="async" />
          </div>
        )}

        {(() => {
          const markdownComponents = {
            code({ className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              const codeString = String(children).replace(/\n$/, '');

              if (match) {
                return <CodeBlock code={codeString} language={match[1]} />;
              }

              if (codeString.includes('\n')) {
                return <CodeBlock code={codeString} language="text" />;
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          };

          return (
            <>
              <div className="blog-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </>
          );
        })()}

        <BookCTA />

        {/* Related articles — graph neighbors from the compiled knowledge graph */}
        {relatedSlugs.length > 0 && (
          <section className="mt-14 border-t border-[var(--color-rule)] pt-10">
            <span className="kicker mb-3 block">Connected Research</span>
            <h2 className="font-serif font-medium text-2xl tracking-[-0.015em] text-[var(--color-ink)] mb-5">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
              {relatedSlugs.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block bg-[var(--color-base)] p-5 hover:bg-[var(--color-paper-2)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <StatusPill status={rp.status} />
                  </div>
                  <h3 className="font-serif text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors leading-snug">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 text-center">
          <Link href="/research" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">
            ← Back to all research
          </Link>
        </div>
      </div>

      {/* Provenance rail — compiled artifact metadata for this post */}
      <aside className="lg:w-80 w-full">
        <div className="lg:sticky lg:top-24">
          <ProvenancePanel sidecar={sidecar} />
        </div>
      </aside>
    </div>
    </article>
  );
}
