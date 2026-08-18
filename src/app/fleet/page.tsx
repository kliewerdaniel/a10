import type { Metadata } from 'next';
import { getLayers, getAllProjects, getArchitecture } from '@/lib/projects';
import { getCategoryArticleCounts } from '@/lib/blog';
import { FleetTrustBar } from '@/components/fleet/FleetTrustBar';
import { FleetDomainCard } from '@/components/fleet/FleetDomainCard';
import { FleetDiagram } from '@/components/fleet/FleetDiagram';
import { GraphWidget } from '@/components/blog/GraphWidget';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Fleet',
  description:
    'The Sovereign Agent Fleet: one frozen governance substrate, exercised across six domains, with zero security invariants depending on model behavior. Intelligence is the accumulated decisions that shaped it.',
  alternates: { canonical: '/fleet' },
};

export default function FleetPage() {
  const layers = getLayers();
  const projects = getAllProjects();
  const architecture = getArchitecture();
  const categoryCounts = getCategoryArticleCounts();

  const systemCountByLayer = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.layer] = (acc[p.layer] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-5 sm:px-8 pt-28 pb-16 max-w-6xl mx-auto">
        <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'The Fleet', url: '/fleet' }]} />
        <span className="kicker mb-4 block">The Sovereign Agent Fleet</span>
        <h1 className="font-serif font-medium text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
          One substrate.<br />Many minds.
        </h1>
        <p className="font-serif text-xl md:text-2xl text-[var(--color-ink-2)] leading-snug max-w-3xl mt-7">
          Intelligence is the accumulated decisions that shaped it. The Fleet is the empirical proof: a
          single frozen governance substrate, exercised across six domains, with zero security
          invariants depending on model behavior.
        </p>
        <p className="text-[var(--color-ink-3)] max-w-2xl leading-relaxed mt-4">{architecture.narrative}</p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button href="/mission" variant="primary" size="lg">Read the Mission</Button>
          <Button href="/research" variant="secondary" size="lg">Explore the Research</Button>
        </div>
      </section>

      {/* Trust numbers */}
      <section className="section-rule">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <FleetTrustBar />
        </div>
      </section>

      {/* Topology + graph */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <span className="kicker mb-3 block">Topology</span>
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-[-0.015em] text-[var(--color-ink)] mb-5">Many domains, one substrate</h2>
            <p className="text-[var(--color-ink-3)] leading-relaxed mb-7">
              Every domain below runs on the same frozen decision substrate. Proving a new domain requires
              zero edits to that substrate — that is the whole point.
            </p>
            <FleetDiagram layers={layers.map((l) => ({ slug: l.slug, name: l.name }))} />
          </div>
          <div>
            <span className="kicker mb-3 block">Compiled Knowledge Graph</span>
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-[-0.015em] text-[var(--color-ink)] mb-5">The accumulated record</h2>
            <p className="text-[var(--color-ink-3)] leading-relaxed mb-7">
              All research is compiled at build time into a static, inspectable graph — not rediscovered on
              every query.
            </p>
            <GraphWidget />
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="kicker mb-3 block">Fleet Domains</span>
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">Proven against the substrate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            {layers.map((layer) => (
              <FleetDomainCard
                key={layer.slug}
                slug={layer.slug}
                name={layer.name}
                description={layer.description}
                systemCount={systemCountByLayer[layer.slug] || 0}
                articleCount={categoryCounts[layer.slug] || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="section-rule section-pad">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-[-0.015em] text-[var(--color-ink)] mb-4">Where to begin</h2>
          <p className="text-[var(--color-ink-3)] mb-8">
            Start with the mission, or dive into the compiled research log.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/mission" variant="primary" size="lg">The Mission</Button>
            <Link href="/research" className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-[var(--color-green)] hover:underline self-center">
              Browse all 177 posts →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
