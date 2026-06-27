'use client';

import { BookCTA } from '@/components/blog/BookCTA';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const skills = [
  { category: 'AI / ML', items: ['Ollama', 'llama.cpp', 'RAG', 'Knowledge Graphs', 'AI Agents', 'MCP', 'RLHF', 'ChromaDB', 'Sentence Transformers'] },
  { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Rust', 'SQL'] },
  { category: 'Frameworks', items: ['Next.js', 'Django', 'React', 'FastAPI', 'Three.js'] },
  { category: 'Tools', items: ['Docker', 'Git', 'VS Code', 'Linux', 'PostgreSQL', 'Redis'] },
];

const timeline = [
  { year: '2026', title: 'Published Sovereign AI', desc: 'Released the book through Amazon KDP. 72 pages covering the full local-first AI stack — from Ollama to production deployment.' },
  { year: '2025', title: 'Built Sovereign Memory Bank', desc: 'Open-sourced a seven-layer cognitive memory system for autonomous agent reasoning. Python, local embeddings, knowledge graphs.' },
  { year: '2025', title: 'Dynamic Persona MoE RAG', desc: 'Developed a mixture-of-experts RAG system that routes queries to specialized personas. All local, no API calls.' },
  { year: '2025', title: 'Chrome AI Filename Generator', desc: 'Chrome extension that renames downloads using local LLM inference. Published to Chrome Web Store.' },
  { year: '2024', title: 'Started Building in Public', desc: 'Began open-sourcing AI projects on GitHub. Content generation systems, research assistants, graph-based retrieval.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 relative">
              <div className="w-36 h-36 border-4 border-ink overflow-hidden relative shadow-brutalist-lg">
                <Image
                  src="/images/profile.jpeg"
                  alt="Daniel Kliewer"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-display text-4xl md:text-5xl mb-3">Daniel Kliewer</h1>
              <p className="text-xl accent-green mb-2 font-bold">Author & AI Engineer</p>
              <p className="text-ink-3 mb-4 font-bold">Austin, TX</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://github.com/kliewerdaniel" target="_blank" rel="noopener noreferrer" className="text-sm accent-pink hover:text-pink-dark font-bold transition-colors">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/daniel-kliewer-42691944/" target="_blank" rel="noopener noreferrer" className="text-sm accent-green hover:text-green-dark font-bold transition-colors">LinkedIn ↗</a>
                <a href="https://x.com/kliewer_daniel" target="_blank" rel="noopener noreferrer" className="text-sm accent-orange hover:text-orange font-bold transition-colors">X ↗</a>
                <a href="mailto:danielkliewer@gmail.com" className="text-sm accent-green hover:text-green-dark font-bold transition-colors">Email ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">What I Do</h2>
          <div className="space-y-5 text-ink-3 leading-relaxed text-lg font-bold">
            <p>
              I build AI systems that run locally — no cloud APIs, no subscription fees, no data leaving my machine.
              That means Ollama for inference, ChromaDB for vector storage, knowledge graphs for structured reasoning,
              and agents that operate entirely offline.
            </p>
            <p>
              Most of what I build ends up on GitHub. I&apos;ve published over 200 repositories covering everything from
              RAG pipelines and persona-based systems to Chrome extensions and content generation tools.
              Every project is working code, not demos.
            </p>
            <p>
              <strong className="text-ink">Sovereign AI</strong> is the book I wrote because I couldn&apos;t find one that
              covered the full local stack. It walks through 11 chapters of practical implementation —
              running models, building pipelines, deploying agents, securing systems. No hand-waving.
            </p>
            <p>
              By day I work with AI systems. By night I write about them and open-source the results.
              If you&apos;re building something local-first, I&apos;m probably interested.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((s) => (
              <Card key={s.category}>
                <h3 className="font-display text-ink mb-3">{s.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((i) => <span key={i} className="mono px-3 py-1.5 bg-surface border-2 border-ink text-sm text-ink-3">{i}</span>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface relative">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">Timeline</h2>
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-20 text-right"><span className="mono text-sm font-bold accent-green">{t.year}</span></div>
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-green/50 to-transparent" />
                <div className="pb-2">
                  <h3 className="font-display text-ink text-lg">{t.title}</h3>
                  <p className="text-ink-3 mt-1 font-bold">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4">Open Source</h2>
          <p className="text-ink-3 mb-8 text-lg font-bold">200+ repositories. Working code for every concept in the book.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="https://github.com/kliewerdaniel" external variant="secondary" size="lg">GitHub ↗</Button>
            <Button href="/projects" variant="secondary" size="lg">View Projects</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto"><BookCTA /></div>
      </section>
    </>
  );
}
