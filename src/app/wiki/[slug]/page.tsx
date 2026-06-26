import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWikiEntry, getAllWikiSlugs } from '@/lib/wiki';
import { Badge } from '@/components/ui/Card';
import { BookCTA } from '@/components/blog/BookCTA';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllWikiSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWikiEntry(slug);
  if (!entry) return { title: 'Not Found' };

  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function WikiEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getWikiEntry(slug);
  if (!entry) notFound();

  return (
    <article className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-ink-3 mb-4 font-bold">
            <Link href="/wiki" className="hover:text-ink transition-colors">Wiki</Link>
            <span>/</span>
            <span className="text-ink">{entry.title}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{entry.title}</h1>
          <p className="text-lg text-ink-3 mb-4">{entry.description}</p>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Badge key={tag} color="green">{tag}</Badge>
            ))}
          </div>
        </header>

        {entry.bookChapter && (
          <div className="mb-6 p-4 border-4 border-orange bg-cream">
            <p className="text-sm font-bold">
              <span className="accent-orange">Book Reference:</span>{' '}
              This concept is covered in Chapter {entry.bookChapter} of{' '}
              <Link href="/book" className="accent-green hover:underline">Sovereign AI</Link>.
            </p>
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
                return <code className={className} {...props}>{children}</code>;
              },
            }}
          >
            {entry.content}
          </ReactMarkdown>
        </div>

        {entry.relatedPosts.length > 0 && (
          <div className="mt-8 p-6 border-4 border-ink bg-cream">
            <h3 className="font-display mb-3">Related Blog Posts</h3>
            <div className="space-y-2">
              {entry.relatedPosts.map((postSlug) => (
                <Link
                  key={postSlug}
                  href={`/blog/${postSlug}`}
                  className="block text-sm accent-green hover:text-green-dark transition-colors font-bold"
                >
                  {postSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ')} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {entry.relatedWiki.length > 0 && (
          <div className="mt-4 p-6 border-4 border-ink bg-cream">
            <h3 className="font-display mb-3">Related Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {entry.relatedWiki.map((wikiSlug) => (
                <Link
                  key={wikiSlug}
                  href={`/wiki/${wikiSlug}`}
                  className="mono px-3 py-1.5 bg-surface border-2 border-ink text-sm accent-green hover:bg-surface transition-colors"
                >
                  {wikiSlug.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        )}

        <BookCTA />

        <div className="mt-10 text-center">
          <Link href="/wiki" className="accent-green hover:text-green-dark font-bold transition-colors">
            ← Back to wiki
          </Link>
        </div>
      </div>
    </article>
  );
}
