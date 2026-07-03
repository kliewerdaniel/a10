import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { BookCTA } from '@/components/blog/BookCTA';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source research through code — each project tests a specific architectural hypothesis about local-first intelligence.',
};

const projects = [
  {
    name: 'workflow',
    description: 'A methodology for structuring AI-assisted development. Explores how systems thinking guides human-AI collaboration in software engineering.',
    stars: 45,
    language: 'Markdown',
    url: 'https://github.com/kliewerdaniel/workflow',
  },
  {
    name: 'autoblog01',
    description: 'Investigates whether local LLMs can drive a complete content generation pipeline. RSS ingestion, RAG-based writing, and automated publishing on local hardware.',
    stars: 22,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/autoblog01',
  },
  {
    name: 'chrome-ai-filename-generator',
    description: 'Studies the interaction between local inference and everyday user workflows. A concrete experiment in unobtrusive on-device AI utility.',
    stars: 6,
    language: 'JavaScript',
    url: 'https://github.com/kliewerdaniel/chrome-ai-filename-generator',
  },
  {
    name: 'RedDiss',
    description: 'Explores the practical limits of local LLMs for content analysis. Built during the Loco Local LocalLLaMa Hackathon.',
    stars: 2,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/RedDiss',
  },
  {
    name: 'ConCreat',
    description: 'Examines local text-to-speech pipelines as a component in multimedia content creation. What does fully offline content generation look like?',
    stars: 1,
    language: 'TypeScript',
    url: 'https://github.com/kliewerdaniel/ConCreat',
  },
  {
    name: 'sovereignBank',
    description: 'Investigates whether agents can maintain persistent, self-evolving memory. A seven-layer cognitive architecture for autonomous knowledge synthesis — no cloud required.',
    stars: 0,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/sovereignBank',
    blogSlug: '2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems',
  },
  {
    name: 'SynthInt',
    description: 'Explores mixture-of-experts routing through dynamically selected personas. Can locally-hosted, specialized models compose into synthetic intelligence?',
    stars: 0,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/SynthInt',
    blogSlug: '2026-01-25-dynamic-persona-moe-rag-building-a-sovereign-synthetic-intelligence-system',
  },
  {
    name: 'basicbot',
    description: 'Examines GraphRAG as a retrieval architecture for document analysis. Compares graph-based reasoning against flat vector search.',
    stars: 0,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/basicbot',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Projects</h1>
            <p className="text-ink-3 max-w-2xl mx-auto font-bold">
              Each repository tests a specific architectural hypothesis. The code is the implementation,<br />
              the blog essays document the reasoning, and <em>Sovereign AI</em> provides the framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://github.com/kliewerdaniel?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-ink font-bold border-4 border-ink hover:bg-surface transition-colors shadow-brutalist-sm"
            >
              All Repositories on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <BookCTA />
        </div>
      </section>
    </>
  );
}
