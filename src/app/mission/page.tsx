import type { Metadata } from 'next';
import { ResearchVision } from '@/components/research/ResearchVision';
import { FleetTrustBar } from '@/components/fleet/FleetTrustBar';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Mission',
  description:
    'Intelligence is the accumulated decisions that shaped it. The Sovereign Agent Fleet is the empirical proof: one frozen governance substrate, exercised across many domains, with zero security invariants depending on model behavior.',
  alternates: { canonical: '/mission' },
  openGraph: {
    title: 'The Mission — Sovereign Agent Fleet',
    description: 'Intelligence is the accumulated decisions that shaped it. The Fleet is the empirical proof.',
    type: 'article',
  },
};

const sections = [
  {
    id: 'the-thesis',
    kicker: 'The Thesis',
    heading: 'Intelligence is the accumulated decisions that shaped it.',
    body: [
      'Not the model. Not the prompt. Not the dataset on its own. What makes a system intelligent is the accumulation of decisions it has carried forward — the judgments it preserved, reused, and improved instead of rediscovering from scratch each time.',
      'A single conversation is not intelligent. A system that remembers what it decided, why it decided it, and can be held to that decision across domains — that is intelligence. The architecture is the accumulated decisions that shaped it.',
    ],
  },
  {
    id: 'the-fleet',
    kicker: 'The Empirical Proof',
    heading: 'One substrate. Many minds.',
    body: [
      'The Sovereign Agent Fleet is how we test that thesis in practice. We built one frozen governance substrate — fleet.epistemic.decide() — and proved it across six domains without editing the substrate a single time.',
      'Six domains. One frozen implementation. Zero security invariants that depend on what the model happens to do. That is the claim, and it is falsifiable: show a domain that requires a substrate edit, and the thesis weakens.',
    ],
  },
  {
    id: 'compile-time',
    kicker: 'The Mechanism',
    heading: 'Compile-time, not query-time',
    body: [
      'Large language models are remarkable at producing answers on demand. But much of today’s AI rediscovers the same relationships on every query — re-deriving what was already known, burning time and tokens to reach a conclusion someone reached before.',
      'The Fleet does the reasoning once and compiles it. Knowledge is organized before the question is asked: into decision graphs, semantic artifacts, and a static knowledge graph emitted at build time. The objective is not faster search. It is reducing the cognitive cost of understanding.',
    ],
  },
  {
    id: 'the-bottleneck',
    kicker: 'Why It Matters',
    heading: 'Knowledge is the constraint',
    body: [
      'Every profession depends on knowledge someone else already discovered. Civilization is, in many ways, a system for transferring accumulated knowledge from one generation to the next — and the efficiency of that transfer determines how quickly society progresses.',
      'When knowledge is expensive to acquire, qualified people become scarce; scarcity raises cost; cost limits how many we can employ; and each individual must care for more patients, teach more students, manage more systems. Time becomes the scarce resource.',
      'Reduce the cost of understanding, and you return time to the people who care for other people.',
    ],
  },
  {
    id: 'the-choice',
    kicker: 'The Choice',
    heading: 'Cooperation or conflict',
    body: [
      'Like every powerful technology, AI can be directed toward conflict or toward cooperation. History suggests technological advantage is often centralized and weaponized. That reality is difficult to ignore — especially as AI expands into military application.',
      'But knowledge has a unique property: unlike physical resources, it can be shared without being consumed. If we make human knowledge easier to understand, preserve, and distribute, then every discovery, breakthrough, and advancement becomes more accessible to everyone.',
      'That is why this work is local-first, open, and inspectable. The substrate is frozen so you can audit it. The knowledge graph is compiled so you can read it. Nothing here asks you to trust a model you cannot see.',
    ],
  },
  {
    id: 'the-hope',
    kicker: 'The Hope',
    heading: 'A future worth building',
    body: [
      'My hope is not to build machines that replace human intelligence. It is to build tools that make humanity’s collective knowledge easier for every person to understand — and a fleet of agents whose intelligence is the accumulated, inspectable decisions we chose to keep.',
      'That, to me, is a future worth building.',
    ],
  },
];

export default function MissionPage() {
  return (
    <article className="pb-10">
      <div className="px-5 sm:px-8 pt-28">
        <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Mission', url: '/mission' }]} />
      </div>

      <section className="section-pad">
        <div className="max-w-3xl mx-auto text-center">
          <span className="kicker mb-4 block">The Mission</span>
          <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.02em] text-[var(--color-ink)]">
            Intelligence is the <span className="text-[var(--color-green)]">accumulated decisions</span> that shaped it.
          </h1>
          <p className="text-lg text-[var(--color-ink-3)] leading-relaxed max-w-2xl mx-auto mt-7">
            The Sovereign Agent Fleet is the empirical proof. One frozen governance substrate, exercised
            across many domains — with zero security invariants depending on model behavior.
          </p>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id} className="section-rule section-pad" id={section.id}>
          <div className="max-w-3xl mx-auto">
            <span className="kicker mb-3 block">{section.kicker}</span>
            <h2 className="font-serif font-medium text-2xl md:text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-6">{section.heading}</h2>
            <div className="space-y-5 text-[var(--color-ink-3)] leading-relaxed text-lg">
              {section.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* The Fleet, encoded as the proof */}
      <section className="section-rule section-pad">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 max-w-3xl">
            <span className="kicker mb-3 block">The Proof, In Numbers</span>
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-[-0.015em] text-[var(--color-ink)]">The Fleet invariants</h2>
          </div>
          <FleetTrustBar />
          <div className="mt-8">
            <Button href="/fleet" variant="primary" size="lg">Meet the Fleet</Button>
          </div>
        </div>
      </section>

      <ResearchVision />

      <section className="section-rule section-pad">
        <div className="max-w-2xl mx-auto text-center">
          <span className="kicker mb-3 block">Where To Begin</span>
          <h2 className="font-serif font-medium text-3xl sm:text-4xl tracking-[-0.015em] text-[var(--color-ink)] mb-4">Explore the work</h2>
          <p className="text-[var(--color-ink-3)] mb-8">
            The mission is one thread. The Fleet is the proof. The research log is the record.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/fleet" variant="primary" size="lg">Meet the Fleet</Button>
            <Link href="/research" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline self-center">
              Browse all 177 posts →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
