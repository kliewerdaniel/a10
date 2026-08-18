import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { CodeBlock } from '@/components/ui/CodeBlock';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const PAPER_PATH = path.join(
  process.cwd(),
  'content',
  'whitepaper',
  'sovereign-knowledge-systems.md',
);

function loadPaper() {
  if (!fs.existsSync(PAPER_PATH)) return null;
  const raw = fs.readFileSync(PAPER_PATH, 'utf-8');
  const { data, content } = matter(raw);
  return { data, content };
}

export async function generateMetadata(): Promise<Metadata> {
  const paper = loadPaper();
  if (!paper) return { title: 'Not Found' };
  const { data } = paper;
  return {
    title: `${data.title} — Daniel Kliewer`,
    description: typeof data.abstract === 'string' ? data.abstract : String(data.abstract ?? ''),
    alternates: { canonical: '/paper' },
    openGraph: {
      title: data.title,
      description: typeof data.abstract === 'string' ? data.abstract : String(data.abstract ?? ''),
      type: 'article',
      authors: [data.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: typeof data.abstract === 'string' ? data.abstract : String(data.abstract ?? ''),
    },
  };
}

export default function PaperPage() {
  const paper = loadPaper();
  if (!paper) notFound();

  const { data, content } = paper;
  const abstract = typeof data.abstract === 'string' ? data.abstract : String(data.abstract ?? '');
  const baseUrl = 'https://www.danielkliewer.com';
  const postUrl = `${baseUrl}/paper`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: abstract,
    datePublished: String(data.date ?? ''),
    dateModified: String(data.date ?? ''),
    author: { '@type': 'Person', name: data.author, url: `${baseUrl}/about` },
    publisher: { '@type': 'Organization', name: 'Daniel Kliewer', url: baseUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  };

  const markdownComponents = {
    code({ className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      if (match) return <CodeBlock code={codeString} language={match[1]} />;
      if (codeString.includes('\n')) return <CodeBlock code={codeString} language="text" />;
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
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
              { name: 'Whitepaper', url: '/paper' },
            ]}
          />
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4 text-sm text-[var(--color-ink-3)] font-medium">
              <span>Research Whitepaper</span>
              <span>·</span>
              <span>v{String(data.version ?? '1.0')}</span>
              <span>·</span>
              <time dateTime={String(data.date ?? '')}>{String(data.date ?? '')}</time>
            </div>
            <h1 className="font-serif font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] text-[var(--color-ink)] mb-4">
              {data.title}
            </h1>
            <p className="font-serif text-xl text-[var(--color-ink-3)] mb-5 leading-relaxed">
              {abstract}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-green)] flex items-center justify-center">
                <span className="text-[var(--color-paper)] text-sm font-medium">DK</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">{data.author}</p>
                <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">
                  Author, Sovereign AI
                </p>
              </div>
            </div>
          </header>

          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/research"
              className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline"
            >
              ← Back to all research
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
