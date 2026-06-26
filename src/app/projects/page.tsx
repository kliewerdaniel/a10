import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { BookCTA } from '@/components/blog/BookCTA';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source projects and tools by Daniel Kliewer — AI agents, knowledge graphs, RAG systems, and more.',
};

const projects = [
  {
    name: 'workflow',
    description: 'Structured AI-Assisted Development Workflow Guide. A comprehensive methodology for integrating AI into software development processes.',
    stars: 45,
    language: 'Markdown',
    url: 'https://github.com/kliewerdaniel/workflow',
  },
  {
    name: 'autoblog01',
    description: 'Professional Next.js blogging platform with advanced AI-driven content generation. Leverages RSS feed analysis and Retrieval-Augmented Generation (RAG) to create high-quality, SEO-optimized blog content.',
    stars: 22,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/autoblog01',
  },
  {
    name: 'chrome-ai-filename-generator',
    description: 'Chrome extension that uses AI to generate meaningful filenames from page content. Solves the problem of cryptic default filenames.',
    stars: 6,
    language: 'JavaScript',
    url: 'https://github.com/kliewerdaniel/chrome-ai-filename-generator',
  },
  {
    name: 'RedDiss',
    description: 'Entry for Loco Local LocalLLaMa Hackathon. Exploring local LLM capabilities for practical applications.',
    stars: 2,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/RedDiss',
  },
  {
    name: 'ConCreat',
    description: 'Modern web application for creating and managing multimedia content, featuring AI-powered text-to-speech capabilities using Chatterbox.',
    stars: 1,
    language: 'TypeScript',
    url: 'https://github.com/kliewerdaniel/ConCreat',
  },
  {
    name: 'sovereignBank',
    description: 'Autonomous cognitive memory system for agent reasoning and knowledge synthesis. Transforms markdown documents into a continuously evolving seven-layer memory architecture.',
    stars: 0,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/sovereignBank',
    blogSlug: '2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems',
  },
  {
    name: 'SynthInt',
    description: 'Dynamic Persona Mixture-of-Experts RAG system. Builds sovereign synthetic intelligence with local-first architecture and data sovereignty.',
    stars: 0,
    language: 'Python',
    url: 'https://github.com/kliewerdaniel/SynthInt',
    blogSlug: '2026-01-25-dynamic-persona-moe-rag-building-a-sovereign-synthetic-intelligence-system',
  },
  {
    name: 'basicbot',
    description: 'Sophisticated Research Assistant powered by GraphRAG technology for analyzing documents and research data.',
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
              Open-source tools, experiments, and systems built by Daniel Kliewer.
              Many of these projects are featured in the blog and <em>Sovereign AI</em>.
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-ink font-bold border-4 border-ink hover:bg-surface transition-colors"
              style={{ boxShadow: '4px 4px 0 #0F0F0F' }}
            >
              View All 222 Repositories on GitHub ↗
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
