import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLayerBySlug, getProjectsByLayer } from '@/lib/projects';
import { getPostsByCategory } from '@/lib/blog';
import { FleetSystemCard } from '@/components/fleet/FleetSystemCard';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export function generateStaticParams() {
  return require('@/data/architecture.json').layers.map((l: any) => ({ domain: l.slug }));
}

interface Props {
  params: Promise<{ domain: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const layer = getLayerBySlug(domain);
  if (!layer) return { title: 'Domain Not Found' };
  return {
    title: `${layer.name} — Fleet Domain`,
    description: layer.description,
    alternates: { canonical: `/fleet/${domain}` },
  };
}

export default async function FleetDomainPage({ params }: Props) {
  const { domain } = await params;
  const layer = getLayerBySlug(domain);
  if (!layer) notFound();

  const systems = getProjectsByLayer(domain);
  const posts = getPostsByCategory(domain).slice(0, 6);

  return (
    <div className="min-h-screen">
      <section className="px-5 sm:px-8 pt-28 pb-12 max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'The Fleet', url: '/fleet' },
            { name: layer.name, url: `/fleet/${domain}` },
          ]}
        />
        <Link href="/fleet" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline mb-6 inline-block">
          ← Back to the Fleet
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <span className="font-serif text-4xl text-[var(--color-green)]">{layer.icon}</span>
          <h1 className="font-serif font-medium text-4xl md:text-6xl tracking-[-0.02em] text-[var(--color-ink)]">{layer.name}</h1>
        </div>
        <p className="text-xl text-[var(--color-ink-3)] mb-8 leading-relaxed max-w-3xl">{layer.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
          <div className="bg-[var(--color-base)] p-7">
            <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-3">The problem it answers</h2>
            <p className="text-[var(--color-ink-3)] leading-relaxed">{layer.problem}</p>
          </div>
          <div className="bg-[var(--color-base)] p-7">
            <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-3">Why it matters</h2>
            <p className="text-[var(--color-ink-3)] leading-relaxed">{layer.why_matters}</p>
          </div>
        </div>
      </section>

      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">
              {systems.length} Fleet {systems.length === 1 ? 'Deployment' : 'Deployments'}
            </h2>
            <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">running on the frozen substrate</span>
          </div>
          {systems.length === 0 ? (
            <p className="text-[var(--color-ink-3)]">No registered systems in this domain yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {systems.map((sys) => (
                <FleetSystemCard
                  key={sys.slug}
                  slug={sys.slug}
                  layer={sys.layer}
                  name={sys.name}
                  summary={sys.summary}
                  status={sys.status}
                  technologies={sys.technologies}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section-rule section-pad">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">From the research log</h2>
              <Link href={`/research/${domain}`} className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">
                All posts in this domain →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </section>
      )}
    </div>
  );
}
