'use client';

import { BookCTA } from '@/components/blog/BookCTA';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const principles = [
  { title: 'Computational Sovereignty', desc: 'Intelligence infrastructure answers to its user, not a third party. This constrains every architectural decision.' },
  { title: 'Explicit Memory & Graph Reasoning', desc: 'Agents remember deliberately. Vector stores, knowledge graphs, and structured recall form the substrate of persistent cognition.' },
  { title: 'Modular Cognition & Inspectability', desc: 'Intelligence is not monolithic. Specialized models route dynamically, and every decision traces to its source.' },
  { title: 'Local-First & Recursive Improvement', desc: 'The default position is local. Systems examine their own outputs and refine iteratively — architectures improve as they run.' },
];

const timeline = [
  { year: '2026', title: 'Framework Synthesis', desc: 'Sovereign AI synthesizes years of architectural investigation into a coherent framework — from first principles through production deployment.' },
  { year: '2025', title: 'Cognitive Memory Architecture', desc: 'Sovereign Memory Bank discovered that persistent agent memory requires a multi-layered architecture: raw documents to synthesized abstractions.' },
  { year: '2025', title: 'Compositional Intelligence', desc: 'Dynamic Persona MoE RAG demonstrated that routing between specialized local models produces more coherent reasoning than any single model.' },
  { year: '2025', title: 'Everyday Inference', desc: 'Chrome AI Filename Generator tested whether local inference integrates into practical user workflows. Proved on-device AI can be unobtrusive.' },
  { year: '2024', title: 'Open Investigation Begins', desc: 'Started publishing research in public. The blog and GitHub became the laboratory for systematic architectural exploration.' },
];

export function AboutContent() {
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
              <p className="text-xl accent-green mb-2 font-bold">Investigating Architectures for Intelligence</p>
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

      <section className="py-20 px-4 bg-surface relative reveal">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">The Investigation</h2>
          <div className="space-y-5 text-ink-3 leading-relaxed text-lg font-bold">
            <p>
              My work investigates a central question: what happens when intelligence infrastructure belongs entirely to the person using it? The answers are architectural — explicit memory replacing implicit context, graph reasoning replacing flat retrieval, modular cognition replacing monolithic models, and local-first computing replacing cloud dependence as the default.
            </p>
            <p>
              This question shapes every project. Cognitive memory systems that evolve their own knowledge graphs. Mixture-of-experts routing through specialized local models. RAG pipelines designed for inspectability rather than benchmark scores. Each project tests a specific architectural hypothesis.
            </p>
            <p>
              <strong className="text-ink">Sovereign AI</strong> synthesizes these investigations into a coherent framework. Eleven chapters trace the architectural logic from first principles — why local inference matters structurally, how knowledge graphs change the retrieval problem, what agent architectures require for persistence — through production deployment patterns.
            </p>
            <p>
              I document the work publicly: the code on GitHub, the reasoning in the blog, the synthesis in the book. If you are investigating similar questions, the work is open.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 reveal">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((s) => (
              <Card key={s.title}>
                <h3 className="font-display text-ink mb-3">{s.title}</h3>
                <p className="text-sm text-ink-3 font-bold leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface relative reveal">
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

      <section className="py-20 px-4 reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4">Open Source</h2>
          <p className="text-ink-3 mb-8 text-lg font-bold">Hundreds of repositories. Each one tests a specific architectural question.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="https://github.com/kliewerdaniel" external variant="secondary" size="lg">GitHub ↗</Button>
            <Button href="/projects" variant="secondary" size="lg">Project Index</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface reveal">
        <div className="max-w-4xl mx-auto"><BookCTA /></div>
      </section>
    </>
  );
}
