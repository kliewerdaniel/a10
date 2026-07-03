import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Card';
import { BookCTA } from '@/components/blog/BookCTA';

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'Press kit, interview topics, bios, and speaking information for Daniel Kliewer — investigating architectures for computational sovereignty.',
};

const interviewTopics = [
  'The architectural meaning of computational sovereignty',
  'Why local inference changes the design space for AI systems',
  'Open-source models and proprietary infrastructure',
  'Running LLMs on consumer hardware — what is actually possible',
  'RAG architectures for production systems',
  'Memory architectures for persistent intelligence',
  'Knowledge graphs and graph-based reasoning',
  'Agentic AI: architectures beyond chatbots',
  'Designing resilient, inspectable AI systems',
  'The future of AI ownership and control',
  'Solo development in the AI ecosystem',
  'Open-source AI ecosystems and their evolution',
  'Writing Sovereign AI: synthesizing a research program into a book',
];

const questionsAboutTheBook = [
  'What question does Sovereign AI investigate?',
  'Who is this book for?',
  'What misconceptions about AI architecture do you hope to challenge?',
  'What surprised you most while writing the book?',
];

const questionsInfrastructure = [
  'Why are local models becoming increasingly important?',
  'How should developers think about AI ownership?',
  'What role does RAG play in production systems?',
  'Are knowledge graphs making a comeback?',
  'How do you approach long-term AI memory?',
];

const questionsIndustry = [
  'Where do you think AI is heading over the next five years?',
  'Which open-source AI projects excite you the most?',
  'What advice would you give developers entering AI today?',
];

const questionsPersonal = [
  'How did you become interested in AI?',
  'What does your development workflow look like?',
  'What are you building next?',
];

const topics = [
  'Local LLMs',
  'Retrieval-Augmented Generation (RAG)',
  'Knowledge Graphs',
  'AI Agents',
  'Long-Term Memory',
  'Open-Source AI',
  'Local-First Architecture',
  'AI Infrastructure',
  'Autonomous Systems',
];

const availability = [
  { type: 'Podcasts', icon: '🎙' },
  { type: 'Conference Talks', icon: '🎤' },
  { type: 'Meetups', icon: '👥' },
  { type: 'University Presentations', icon: '🎓' },
  { type: 'Corporate Workshops', icon: '💼' },
  { type: 'Panel Discussions', icon: '🗣' },
  { type: 'Technical Interviews', icon: '⌨' },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">Press & Media</h1>
          <p className="text-ink-3 text-lg font-bold max-w-2xl mx-auto">
            Resources for podcasts, conferences, interviews, and speaking engagements covering computational sovereignty and local-first AI architectures.
          </p>
        </div>
      </section>

      {/* About Daniel */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">About Daniel Kliewer</h2>
          <div className="space-y-5 text-ink-3 leading-relaxed text-lg font-bold">
            <p>
              Daniel Kliewer investigates architectures for intelligence that remains under its user&apos;s control. His work examines local-first AI, cognitive memory systems, graph-based reasoning, autonomous agents, and the engineering principles that make sovereign intelligence possible.
            </p>
            <p>
              Rather than treating AI as a service to consume, his work treats it as a system to construct — one where every layer, from inference runtime to memory architecture, is owned and understood by its operator. Each project tests a specific architectural hypothesis.
            </p>
            <p>
              He is the author of <strong className="text-ink">Sovereign AI</strong>, a book that traces this architectural reasoning from first principles to production deployment across eleven chapters.
            </p>
          </div>
        </div>
      </section>

      {/* About Sovereign AI */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">About Sovereign AI</h2>
          <p className="text-ink-3 text-lg font-bold mb-8 max-w-3xl">
            Sovereign AI examines the architecture of intelligence that you own. From first principles — why local inference matters structurally — through production deployment patterns for autonomous agents, memory systems, and secure, sovereign infrastructure.
          </p>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Badge key={topic} color="green">{topic}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Media */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">Downloadable Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-display text-ink mb-3">Author Photo</h3>
              <p className="text-ink-3 font-bold text-sm mb-4">High-resolution headshot for use in articles, event listings, and promotional materials.</p>
              <a href="/images/profile.jpeg" download className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">Download Photo ↓</a>
            </Card>
            <Card>
              <h3 className="font-display text-ink mb-3">Book Cover</h3>
              <p className="text-ink-3 font-bold text-sm mb-4">Available in multiple formats for different use cases.</p>
              <div className="flex flex-col gap-2">
                <a href="/SovereignAI_300dpi.png" download className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">High-Resolution PNG ↓</a>
                <span className="mono text-sm text-ink-3 font-bold">3D Mockup — Coming Soon</span>
                <span className="mono text-sm text-ink-3 font-bold">Amazon-Sized Cover — Coming Soon</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Suggested Interview Topics */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">Suggested Interview Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interviewTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 p-4 border-4 border-ink bg-cream">
                <span className="text-green text-lg">→</span>
                <span className="text-ink font-bold">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Interview Questions */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">Sample Interview Questions</h2>
          <div className="space-y-10">
            <div>
              <h3 className="font-display text-xl mb-4 accent-green">About the Book</h3>
              <ul className="space-y-3">
                {questionsAboutTheBook.map((q) => (
                  <li key={q} className="flex gap-3 text-ink font-bold">
                    <span className="text-pink flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4 accent-pink">AI Infrastructure</h3>
              <ul className="space-y-3">
                {questionsInfrastructure.map((q) => (
                  <li key={q} className="flex gap-3 text-ink font-bold">
                    <span className="text-orange flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4 accent-orange">Industry</h3>
              <ul className="space-y-3">
                {questionsIndustry.map((q) => (
                  <li key={q} className="flex gap-3 text-ink font-bold">
                    <span className="text-green flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4 accent-green">Personal</h3>
              <ul className="space-y-3">
                {questionsPersonal.map((q) => (
                  <li key={q} className="flex gap-3 text-ink font-bold">
                    <span className="text-pink flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Talks & Interviews */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">Previous Talks & Interviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card><h3 className="font-display text-ink mb-2">Videos</h3><p className="text-ink-3 font-bold text-sm">Coming soon.</p></Card>
            <Card><h3 className="font-display text-ink mb-2">Podcasts</h3><p className="text-ink-3 font-bold text-sm mb-3">Interview about Sovereign AI</p><a href="/interviewSovereignAI.mp3" download className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">Download Interview ↓</a></Card>
            <Card><h3 className="font-display text-ink mb-2">Conference Talks</h3><p className="text-ink-3 font-bold text-sm">Coming soon.</p></Card>
            <Card><h3 className="font-display text-ink mb-2">Blog Articles</h3><p className="text-ink-3 font-bold text-sm">Coming soon.</p></Card>
            <Card><h3 className="font-display text-ink mb-2">GitHub Projects</h3><p className="text-ink-3 font-bold text-sm">222+ repositories on GitHub.</p></Card>
          </div>
        </div>
      </section>

      {/* Speaking */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-4">Speaking</h2>
          <p className="text-ink-3 text-lg font-bold mb-8">Daniel speaks on computational sovereignty, local-first AI architectures, cognitive memory systems, and the engineering of autonomous intelligence. Topics can be tailored for technical, business, or general audiences.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {availability.map((item) => (
              <div key={item.type} className="flex items-center gap-3 p-4 border-4 border-ink bg-cream">
                <span className="text-xl">{item.icon}</span>
                <span className="text-ink font-bold text-sm">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="font-display text-ink mb-2">Website</h3>
              <a href="https://www.danielkliewer.com" target="_blank" rel="noopener noreferrer" className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">danielkliewer.com ↗</a>
            </Card>
            <Card>
              <h3 className="font-display text-ink mb-2">Book</h3>
              <a href="https://www.danielkliewer.com/book" target="_blank" rel="noopener noreferrer" className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">danielkliewer.com/book ↗</a>
            </Card>
            <Card>
              <h3 className="font-display text-ink mb-2">GitHub</h3>
              <a href="https://github.com/kliewerdaniel" target="_blank" rel="noopener noreferrer" className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">github.com/kliewerdaniel ↗</a>
            </Card>
            <Card>
              <h3 className="font-display text-ink mb-2">LinkedIn</h3>
              <a href="https://www.linkedin.com/in/daniel-kliewer-42691944/" target="_blank" rel="noopener noreferrer" className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">LinkedIn Profile ↗</a>
            </Card>
            <Card>
              <h3 className="font-display text-ink mb-2">Email</h3>
              <a href="mailto:danielkliewer@gmail.com" className="mono text-sm accent-green hover:text-green-dark font-bold transition-colors">danielkliewer@gmail.com</a>
            </Card>
          </div>
        </div>
      </section>

      {/* Bios */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">Bios</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl mb-3 accent-green">Short Bio (50 Words)</h3>
              <p className="text-ink-3 font-bold leading-relaxed">
                Daniel Kliewer investigates architectures for computational sovereignty. His work examines local-first AI, cognitive memory, graph-based reasoning, and autonomous agents. He is the author of Sovereign AI, a book tracing the architecture of intelligence you own.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl mb-3 accent-pink">Medium Bio (100 Words)</h3>
              <p className="text-ink-3 font-bold leading-relaxed">
                Daniel Kliewer investigates architectures for intelligence that remains under its user&apos;s control. His work spans cognitive memory systems, graph-based reasoning, local inference, and autonomous agent architectures. He approaches AI as a system to construct rather than a service to consume — each layer owned and understood by its operator. His book, Sovereign AI, traces this architectural reasoning from first principles to production deployment. He documents his investigations through open-source code, technical writing, and public research.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl mb-3 accent-orange">Long Bio (250 Words)</h3>
              <p className="text-ink-3 font-bold leading-relaxed">
                Daniel Kliewer investigates architectures for computational sovereignty — the design and engineering of intelligence infrastructure that answers to its user rather than a third party. His work examines how cognitive memory systems, graph-based reasoning, local inference, and modular agent architectures compose into intelligence that persists independently of cloud infrastructure.
              </p>
              <p className="text-ink-3 font-bold leading-relaxed mt-4">
                Rather than treating AI as an API to call, his work treats it as a system to construct, where every architectural layer is owned and inspectable. The central investigation: what changes when intelligence infrastructure belongs entirely to the person using it? The answers are architectural — explicit memory replacing context windows, graph reasoning replacing flat retrieval, modular cognition replacing monolithic models, and local-first computing replacing cloud dependence as the default position.
              </p>
              <p className="text-ink-3 font-bold leading-relaxed mt-4">
                Each project tests a specific hypothesis. Sovereign Memory Bank explores whether agents can maintain self-evolving, persistent knowledge. Dynamic Persona MoE RAG examines whether routed specialist models outperform monolithic reasoning. These are not products. They are answers to specific architectural questions.
              </p>
              <p className="text-ink-3 font-bold leading-relaxed mt-4">
                As the author of Sovereign AI, Daniel presents the synthesis of this architectural investigation — eleven chapters that trace the logic from first principles through production deployment. He documents his work publicly: the code on GitHub, the reasoning in the blog, the synthesis in the book. The work is ongoing. The questions remain open.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <BookCTA />
        </div>
      </section>
    </>
  );
}
