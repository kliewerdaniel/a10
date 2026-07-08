import type { Metadata } from 'next';
import { BookCover } from '@/components/ui/BookCover';
import { BookButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: 'Sovereign AI: Local-First Intelligence Architecture',
    template: '%s',
  },
  description: 'The Sovereign AI book examines local-first intelligence architecture — design principles, inference runtimes, memory systems, and autonomous agents for owner-built AI.',
};

const chapters = [
  { num: 1, title: 'The Case for Sovereign AI', desc: 'Why cloud-dependent intelligence is architecturally fragile.' },
  { num: 2, title: 'Local-First Architecture', desc: 'Designing systems for privacy, control, and resilience.' },
  { num: 3, title: 'Running Local LLMs', desc: 'Understanding and deploying local inference architectures.' },
  { num: 4, title: 'Knowledge Graphs', desc: 'Graph-based knowledge representation for AI reasoning.' },
  { num: 5, title: 'Building RAG Pipelines', desc: 'Retrieval-augmented generation as an architectural pattern.' },
  { num: 6, title: 'Autonomous AI Agents', desc: 'Agents that perceive, reason, and act within your infrastructure.' },
  { num: 7, title: 'MCP Server Integration', desc: 'Connecting AI systems to your tools via standardized protocols.' },
  { num: 8, title: 'Full-Stack AI Apps', desc: 'Complete application architectures for production AI systems.' },
  { num: 9, title: 'Persona-Based Systems', desc: 'Dynamic routing through specialized expert models.' },
  { num: 10, title: 'RLHF & Evaluation', desc: 'Measuring and improving system behavior systematically.' },
  { num: 11, title: 'Security & Privacy', desc: 'Hardening sovereign systems for production deployment.' },
];

const forWhom = [
  { title: 'Developers Questioning Dependencies', desc: 'Rate limits and API changes are symptoms of a deeper architectural constraint. This book examines the alternative.' },
  { title: 'Engineers Working with Sensitive Data', desc: 'Healthcare, legal, defense — domains where data boundaries are structural requirements, not preferences.' },
  { title: 'Architects Designing for Ownership', desc: 'Models, parameters, runtime behavior — every decision is yours when you own the full stack.' },
  { title: 'Founders Building on Their Own Terms', desc: 'Architectural independence means your margins and your roadmap are not subject to a provider\'s pricing decisions.' },
];

const baseUrl = 'https://www.danielkliewer.com';

const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Sovereign AI',
  alternateName: 'An Architectural Investigation into Local-First Intelligence',
  author: {
    '@type': 'Person',
    name: 'Daniel Kliewer',
    url: `${baseUrl}/about`,
  },
  isbn: '979-8184468617',
  bookFormat: 'Paperback',
  numberOfPages: 72,
  image: `${baseUrl}/SovereignAI_300dpi.png`,
  url: `${baseUrl}/book`,
  datePublished: '2026-06-26',
  description:
    'This book examines the architecture of intelligence that you own. From inference runtimes to memory systems to autonomous agents — each layer is designed, constructed, and understood by its operator.',
  inLanguage: 'en',
  offers: {
    '@type': 'Offer',
    price: '88.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.amazon.com/dp/B0H6RB7D9J',
  },
};

export default function BookPage() {
  return (
    <>
      <JsonLd data={bookSchema} />
      <div className="px-4 pt-8">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Book', url: '/book' },
          ]}
        />
      </div>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="mono inline-flex items-center gap-2 px-3 py-1 bg-cream border-4 border-ink text-ink text-sm mb-6">ISBN 979-8184468617 · 72 Pages</span>
              <h1 className="font-display text-4xl md:text-6xl mb-4 leading-[0.95]">Sovereign AI</h1>
              <p className="text-xl accent-green mb-2 font-bold">An Architectural Investigation into Local-First Intelligence</p>
              <p className="text-lg text-ink-3 mb-6 font-bold">by Daniel Kliewer</p>
              <p className="text-ink-3 mb-8 leading-relaxed text-lg">
                This book examines the architecture of intelligence that you own. From inference runtimes to memory systems to autonomous agents — each layer is designed, constructed, and understood by its operator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookButton size="lg" />
              </div>
            </div>
            <div className="flex justify-center">
              <BookCover />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface relative reveal">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-orange text-xs mb-4 block">Who It&apos;s For</span>
            <h2 className="font-display text-3xl">For Whom the Architecture Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forWhom.map((f) => (
              <Card key={f.title}>
                <h3 className="font-display text-lg mb-2">{f.title}</h3>
                <p className="text-ink-3 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="mono text-pink text-xs mb-4 block">Contents</span>
            <h2 className="font-display text-3xl">The Architectural Argument</h2>
          </div>
          <div className="space-y-3">
            {chapters.map((ch) => (
              <div key={ch.num} className="flex gap-4 p-5 border-4 border-ink bg-cream transition-all group shadow-brutalist">
                <div className="flex-shrink-0 w-11 h-11 bg-pink border-4 border-ink flex items-center justify-center group-hover:bg-pink-dark transition-colors">
                  <span className="text-cream font-bold text-sm">{ch.num}</span>
                </div>
                <div>
                  <h3 className="font-display text-ink group-hover:text-pink transition-colors">{ch.title}</h3>
                  <p className="text-sm text-ink-3 mt-1 font-bold">{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface relative reveal">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-green text-xs mb-4 block">Outcomes</span>
            <h2 className="font-display text-3xl">What the Framework Provides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {['A coherent architectural framework for local-first intelligence', 'RAG pipelines designed for your specific data boundaries', 'Knowledge graphs as structured reasoning substrates', 'Autonomous agents that operate within your infrastructure', 'Full-stack application patterns for sovereign AI', 'Security architectures for production deployment', 'Cloud independence as a structural property of the design'].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green mt-1.5 flex-shrink-0" />
                <span className="text-ink-3 font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 reveal">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-5">The Full Architectural Investigation</h2>
          <p className="text-ink-3 mb-10 text-lg">Available now. The reasoning is in the book. The implementation is in the code.</p>
          <BookButton size="lg" />
        </div>
      </section>

      <section className="py-20 px-4 bg-surface reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl">Related Essays</h2>
            <p className="text-ink-3 mt-2 font-bold">Free architectural deep dives that complement the book.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ slug: '2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems', title: 'Sovereign Memory Bank' }, { slug: '2026-03-28-sovereignty-manifesto', title: 'The Sovereignty Manifesto' }, { slug: '2026-03-10-breaking-free-from-chatgpt', title: 'Your First Local AI' }].map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block card-pointillist p-6 transition-all">
                <h3 className="font-display group-hover:text-pink transition-colors text-lg">{p.title}</h3>
                <p className="text-sm accent-pink mt-3 font-bold">Read on blog →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
