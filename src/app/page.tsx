import { Button } from '@/components/ui/Button';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { GraphWidget } from '@/components/blog/GraphWidget';
import { getAllBlogPosts } from '@/lib/blog';
import { getLayers } from '@/lib/projects';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';

const directions = [
  {
    title: 'Knowledge Compilation',
    desc: 'Organizing human knowledge into structured, navigable semantic artifacts before the question is asked.',
    href: '/fleet/knowledge-compilation',
  },
  {
    title: 'Compile-Time AI',
    desc: 'Reasoning performed once and compiled into representations people can explore, rather than rediscovered on every query.',
    href: '/fleet/compile-time-ai',
  },
  {
    title: 'Scientific Knowledge Systems',
    desc: 'Semantic infrastructure for preserving and accelerating scientific discovery.',
    href: '/fleet/scientific-knowledge-systems',
  },
  {
    title: 'Local-First AI',
    desc: 'Knowledge systems that run on your own hardware — transparent, inspectable, and yours to own.',
    href: '/fleet/local-first-ai',
  },
  {
    title: 'Cognitive Memory',
    desc: 'Persistent, structured memory that compounds understanding across sessions instead of forgetting it.',
    href: '/fleet/cognitive-memory',
  },
  {
    title: 'Decision Graphs',
    desc: 'Explicit representations of judgment that make reasoning inspectable and reusable.',
    href: '/fleet/decision-graphs',
  },
];

export default function Home() {
  const recentPosts = getAllBlogPosts().slice(0, 4);
  const layers = getLayers();

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Daniel Kliewer',
    url: 'https://www.danielkliewer.com',
    logo: 'https://www.danielkliewer.com/logo.png',
    description: 'A Sovereign Agent Fleet: one frozen governance substrate, exercised across many domains.',
    founder: {
      '@type': 'Person',
      name: 'Daniel Kliewer',
    },
    sameAs: [
      'https://github.com/kliewerdaniel',
      'https://x.com/kliewer_daniel',
      'https://www.linkedin.com/in/daniel-kliewer-42691944/',
    ],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      {/* ── HERO: editorial thesis, atlas plate on the right ── */}
      <section className="px-5 sm:px-8 pt-32 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <p className="kicker mb-7">A Sovereign Agent Fleet — by Daniel Kliewer</p>
            <h1 className="font-serif font-medium text-[2.9rem] sm:text-[4rem] lg:text-[4.6rem] leading-[0.98] tracking-[-0.02em] text-[var(--color-ink)]">
              Intelligence is the <span className="italic text-[var(--color-green)]">accumulated</span> decisions that shaped it.
            </h1>
            <p className="font-serif text-xl sm:text-2xl leading-snug text-[var(--color-ink-2)] mt-8 max-w-xl">
              The Fleet is the empirical proof: one frozen governance substrate, exercised across six
              domains, with zero security invariants depending on model behavior.
            </p>
            <p className="text-[var(--color-ink-3)] leading-relaxed mt-5 max-w-xl">
              We compile knowledge into provenanced, inspectable artifacts at build time — not prompts
              rediscovered on every query. Every claim carries a hash. Every link is explicit. The
              structure beneath the prose is the product.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Button href="/research" variant="primary" size="lg">Read the Research Log</Button>
              <Button href="/fleet" variant="secondary" size="lg">Meet the Fleet</Button>
              <Button href="/contact" variant="secondary" size="lg">Contact</Button>
            </div>
          </div>

          <div className="lg:pl-2">
            <GraphWidget />
          </div>
        </div>
      </section>

      {/* ── THE FLEET: trust numbers, lede the story ── */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="kicker mb-3 block">The Fleet</span>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">
              One substrate. Many minds.
            </h2>
            <p className="text-[var(--color-ink-3)] mt-4 text-base sm:text-lg leading-relaxed">
              A governed fleet of sovereign agents, each specialized, all accountable to a single frozen
              decision substrate. The invariant that matters: no external action is authorized by model
              output alone.
            </p>
          </div>

          <FleetLedger />
        </div>
      </section>

      {/* ── THE KNOWLEDGE ATLAS ── */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="kicker mb-3 block">The Atlas</span>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">
              A map of the corpus
            </h2>
            <p className="text-[var(--color-ink-3)] mt-4 text-base sm:text-lg leading-relaxed">
              177 articles · 510 entities · 3,025 links — computed at build, not query time. The graph on
              the left is the same one behind every article page.
            </p>
          </div>
          <GraphWidget large />
        </div>
      </section>

      {/* ── FLEET DOMAINS ── */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="kicker mb-3 block">One Substrate, Many Directions</span>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">
              Fleet Domains
            </h2>
            <p className="text-[var(--color-ink-3)] mt-4 text-base sm:text-lg leading-relaxed">
              Each domain is a different approach to the same goal — knowledge that costs less to
              understand, preserve, and own.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            {layers.map((d, i) => (
              <Link key={d.slug} href={`/fleet/${d.slug}`} className="bg-[var(--color-base)] p-8 hover:bg-[var(--color-paper-2)] transition-colors group">
                <div className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--color-green)] mb-3">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors">
                  {d.name}
                </h3>
                <p className="text-sm text-[var(--color-ink-3)] mt-3 leading-relaxed">{d.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM THE RESEARCH LOG ── */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <span className="kicker mb-3 block">The Record</span>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">
                From the Research Log
              </h2>
            </div>
            <Link href="/research" className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-[var(--color-green)] hover:underline">All 177 →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <ResearchCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
                readingTime={post.readingTime}
                category={post.category}
                status={post.status}
                topics={post.topics}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVACY & TERMS ── */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="kicker mb-3 block">Legal</span>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl tracking-[-0.015em] text-[var(--color-ink)]">
              Privacy & Terms
            </h2>
            <p className="text-[var(--color-ink-3)] mt-4 text-base sm:text-lg leading-relaxed">
              This site uses privacy-first analytics. No cookies, no tracking, no user accounts.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="/privacy" className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-[var(--color-green)] hover:underline">Privacy Policy →</Link>
              <Link href="/terms" className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-[var(--color-green)] hover:underline">Terms of Use →</Link>
              <Link href="/contact" className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-[var(--color-green)] hover:underline">Contact →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="section-rule section-pad">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p className="font-serif italic text-2xl sm:text-3xl leading-snug text-[var(--color-ink)] tracking-[-0.01em]">
            “Reasoning compiled once, at build time, is <span className="italic text-[var(--color-green)]">knowledge</span>.
            Reasoning rediscovered per query is merely <span className="italic">text</span>.”
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-rule section-pad">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <span className="kicker mb-3 block">The Work Is Open</span>
          <h2 className="font-serif font-medium text-3xl sm:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">
            A twenty-year research agenda
          </h2>
          <p className="text-[var(--color-ink-3)] mt-5 text-base sm:text-lg leading-relaxed">
            The book documents the architecture. The code implements it. What you build from them is your own.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-9">
            <Button href="/mission" variant="primary" size="lg">Read the Mission</Button>
            <Button href="/fleet" variant="secondary" size="lg">Meet the Fleet</Button>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * The constitutive Fleet invariants. One frozen substrate, six domains, zero
 * security invariants depending on model behavior.
 */
function FleetLedger() {
  const stats = [
    { value: '6', label: 'Domains, one frozen substrate' },
    { value: '1', label: 'Governance substrate (fleet.epistemic.decide)' },
    { value: '0', label: 'Model-dependent security invariants' },
    { value: '177', label: 'Compiled research posts' },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
      {stats.map((s) => (
        <div key={s.label} className="bg-[var(--color-base)] p-8">
          <div className="font-serif font-medium text-5xl sm:text-6xl text-[var(--color-ink)] leading-none">{s.value}</div>
          <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)] mt-4 leading-relaxed">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
