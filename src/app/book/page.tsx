import type { Metadata } from 'next';
import { BookCover } from '@/components/ui/BookCover';
import { BookButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Book',
  description: 'Sovereign AI: Building Local-First Intelligent Systems — 72 pages of practical guidance for building AI you own.',
};

const chapters = [
  { num: 1, title: 'The Case for Sovereign AI', desc: 'Why cloud-dependent AI is a trap.' },
  { num: 2, title: 'Local-First Architecture', desc: 'Designing for privacy, control, and resilience.' },
  { num: 3, title: 'Running Local LLMs', desc: 'Ollama, llama.cpp, and quantization.' },
  { num: 4, title: 'Knowledge Graphs', desc: 'Structured knowledge for AI reasoning.' },
  { num: 5, title: 'Building RAG Pipelines', desc: 'Retrieval with ChromaDB and local embeddings.' },
  { num: 6, title: 'Autonomous AI Agents', desc: 'Agents that perceive, reason, and act.' },
  { num: 7, title: 'MCP Server Integration', desc: 'Connecting AI to your tools.' },
  { num: 8, title: 'Full-Stack AI Apps', desc: 'Django + Next.js for production.' },
  { num: 9, title: 'Persona-Based Systems', desc: 'Dynamic expert selection.' },
  { num: 10, title: 'RLHF & Evaluation', desc: 'Measuring what matters.' },
  { num: 11, title: 'Security & Privacy', desc: 'Hardening sovereign systems.' },
];

const forWhom = [
  { title: 'Developers Tired of APIs', desc: 'Rate limits, surprise pricing, vendor lock-in. Build systems that answer to you.' },
  { title: 'Engineers Who Value Privacy', desc: 'Healthcare, legal, defense — where data sovereignty isn\'t optional.' },
  { title: 'Builders Who Want Control', desc: 'Choose your models, your parameters, your behavior. No black boxes.' },
  { title: 'Founders Building AI', desc: 'Owning your stack means owning your margins and your moat.' },
];

export default function BookPage() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="mono inline-flex items-center gap-2 px-3 py-1 bg-cream border-4 border-ink text-ink text-sm mb-6">ISBN 979-8184468617 · 72 Pages</span>
              <h1 className="font-display text-4xl md:text-6xl mb-4 leading-[0.95]">Sovereign AI</h1>
              <p className="text-xl accent-green mb-2 font-bold">Building Local-First Intelligent Systems</p>
              <p className="text-lg text-ink-3 mb-6 font-bold">by Daniel Kliewer</p>
              <p className="text-ink-3 mb-8 leading-relaxed text-lg">
                Most developers rely on cloud APIs they don&apos;t control. This book shows you how to build AI that runs on <strong className="text-ink">your infrastructure</strong>, keeps <strong className="text-ink">your data private</strong>, and eliminates cloud dependence.
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

      <section className="py-20 px-4 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-orange text-xs mb-4 block">Who It&apos;s For</span>
            <h2 className="font-display text-3xl">Built for Builders</h2>
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

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="mono text-pink text-xs mb-4 block">Contents</span>
            <h2 className="font-display text-3xl">11 Chapters. One Stack.</h2>
          </div>
          <div className="space-y-3">
            {chapters.map((ch) => (
              <div key={ch.num} className="flex gap-4 p-5 border-4 border-ink bg-cream transition-all group" style={{ boxShadow: '6px 6px 0 #0F0F0F' }}>
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

      <section className="py-20 px-4 bg-surface relative">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-green text-xs mb-4 block">Outcomes</span>
            <h2 className="font-display text-3xl">What You&apos;ll Walk Away With</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {['A working local AI stack deployed today', 'RAG pipelines for your private documents', 'Knowledge graphs for structured intelligence', 'Autonomous agents that work offline', 'Full-stack AI applications (Django + Next.js)', 'Production security and privacy', 'Freedom from cloud dependence forever'].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green mt-1.5 flex-shrink-0" />
                <span className="text-ink-3 font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-5">Ready to Stop Renting?</h2>
          <p className="text-ink-3 mb-10 text-lg">The book is available now. Start building today.</p>
          <BookButton size="lg" />
        </div>
      </section>

      <section className="py-20 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl">Read Before You Buy</h2>
            <p className="text-ink-3 mt-2 font-bold">Free deep dives into the book&apos;s concepts.</p>
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
