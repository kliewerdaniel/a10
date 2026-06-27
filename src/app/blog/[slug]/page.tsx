import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { BookCTA } from '@/components/blog/BookCTA';
import { Badge } from '@/components/ui/Card';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
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

  return (
    <article className="py-16 px-4">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-ink-3 font-bold">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{post.title}</h1>
          <p className="text-lg text-ink-3 mb-4">{post.description}</p>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-4 border-ink bg-green flex items-center justify-center">
              <span className="text-cream text-sm font-bold">DK</span>
            </div>
            <div>
              <p className="text-sm font-bold text-ink">{post.author}</p>
              <p className="mono text-[10px] text-ink-3">Author, Sovereign AI</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} color="green">{tag}</Badge>
            ))}
          </div>
        </header>

        <BookCTA variant="inline" />

        {post.image && (
          <div className="my-8 border-4 border-ink overflow-hidden" style={{ boxShadow: '8px 8px 0 #0F0F0F' }}>
            <img src={post.image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <div className="blog-content">
          <ReactMarkdown
            components={{
              code({ className, children, ...props }) {
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
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <BookCTA />

        <div className="mt-10 text-center">
          <Link href="/blog" className="accent-green hover:text-green-dark font-bold transition-colors">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
