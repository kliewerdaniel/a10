import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Card';
import { BookCTA } from '@/components/blog/BookCTA';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'Press kit, interview topics, bios, and speaking information for Daniel Kliewer — researching how to reduce the cost of understanding human knowledge through knowledge compilation, compile-time AI, and local-first systems.',
};

const interviewTopics = [
  'Why the cost of understanding human knowledge is a leverage problem',
  'Knowledge transfer as the engine of civilization — and its bottleneck',
  'Compile-time AI: doing the reasoning once, exploring it forever',
  'Knowledge compilation: organizing knowledge before the question is asked',
  'Local-first AI as a precondition for trustworthy, inspectable knowledge',
  'Decision graphs as inspectable representations of human judgment',
  'Cognitive memory: compounding understanding across sessions',
  'Why more text is not the goal — reducing cognitive cost is',
  'How knowledge can be shared without being consumed',
  'Open research as a public good',
  'Building a twenty-year research program as a solo investigator',
  'Why human-centered AI is a question of access, not capability',
  'Writing Sovereign AI: synthesizing a research program into a book',
];

const questionsAboutTheMission = [
  'What does "reducing the cost of understanding human knowledge" mean?',
  'Why frame AI around understanding rather than generation?',
  'What is the bottleneck you are trying to remove?',
  'How does this connect to professions like nursing, teaching, and medicine?',
];

const questionsResearch = [
  'What is compile-time AI, and how is it different from retrieval?',
  'What does it mean to compile knowledge instead of searching it?',
  'Why are local-first and open systems important to this work?',
  'How do decision graphs make reasoning inspectable?',
  'What have you learned from compiling an entire blog into a decision graph?',
];

const questionsIndustry = [
  'Where do you think AI is heading over the next five years?',
  'Which open-source AI projects excite you the most?',
  'What advice would you give developers entering AI today?',
];

const questionsPersonal = [
  'How did you become interested in knowledge and understanding?',
  'What does your research workflow look like?',
  'What are you building next?',
];

const topics = [
  'Knowledge Compilation',
  'Compile-Time AI',
  'Cognitive Memory',
  'Decision Graphs',
  'Local-First AI',
  'Semantic Infrastructure',
  'Open Research',
  'Human-Centered AI',
  'Learning Systems',
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
      <section className="section-pad">
        <div className="max-w-4xl mx-auto text-center">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Press', url: '/press' },
            ]}
          />
          <h1 className="font-serif font-medium text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-[var(--color-ink)] mb-4">Press & Media</h1>
          <p className="text-[var(--color-ink-3)] text-lg max-w-2xl mx-auto">
            Resources for podcasts, conferences, interviews, and speaking engagements covering one question: how do we reduce the cost of understanding human knowledge?
          </p>
        </div>
      </section>

      {/* About Daniel */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">About Daniel Kliewer</h2>
          <div className="space-y-5 text-[var(--color-ink-3)] leading-relaxed text-lg">
            <p>
              Daniel Kliewer researches how to reduce the cost of understanding human knowledge. His work examines knowledge compilation, compile-time AI, cognitive memory, decision graphs, and the local-first systems that make knowledge easier to preserve, navigate, and share.
            </p>
            <p>
              Rather than treating AI as a generator of more text, his work treats it as infrastructure for understanding — systems that organize what we already know so more people can learn it, teach it, and build on it. Each project tests a specific hypothesis about how knowledge transfers between people.
            </p>
            <p>
              He is the author of <strong className="text-[var(--color-ink)]">Sovereign AI</strong>, a book that traces this reasoning from first principles to working systems, and he publishes his research openly so the knowledge itself can be shared without being consumed.
            </p>
          </div>
        </div>
      </section>

      {/* About the Research Mission */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">About the Research</h2>
          <p className="text-[var(--color-ink-3)] text-lg mb-8 max-w-3xl">
            The research program asks a single question: how do we make humanity&apos;s accumulated knowledge cheaper to understand? It explores compile-time AI, knowledge compilation, semantic infrastructure, and the tools that turn static documents into navigable, inspectable understanding.
          </p>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Badge key={topic} color="green">{topic}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Media */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">Downloadable Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            <div className="bg-[var(--color-base)] p-7">
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-3">Author Photo</h3>
              <p className="text-[var(--color-ink-3)] text-sm mb-4">High-resolution headshot for use in articles, event listings, and promotional materials.</p>
              <a href="/images/profile.jpeg" download className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">Download Photo ↓</a>
            </div>
            <div className="bg-[var(--color-base)] p-7">
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-3">Book Cover</h3>
              <p className="text-[var(--color-ink-3)] text-sm mb-4">Available in multiple formats for different use cases.</p>
              <div className="flex flex-col gap-2">
                <a href="/SovereignAI_300dpi.png" download className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">High-Resolution PNG ↓</a>
                <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-ink-3)]">3D Mockup — Coming Soon</span>
                <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-ink-3)]">Amazon-Sized Cover — Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Interview Topics */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">Suggested Interview Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            {interviewTopics.map((topic) => (
              <div key={topic} className="bg-[var(--color-base)] p-5 flex items-center gap-3">
                <span className="text-[var(--color-green)] text-lg">→</span>
                <span className="text-[var(--color-ink)]">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Interview Questions */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">Sample Interview Questions</h2>
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-xl font-medium text-[var(--color-green)] mb-4">About the Mission</h3>
              <ul className="space-y-3">
                {questionsAboutTheMission.map((q) => (
                  <li key={q} className="flex gap-3 text-[var(--color-ink)]">
                    <span className="text-[var(--color-pink)] flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[var(--color-pink)] mb-4">The Research</h3>
              <ul className="space-y-3">
                {questionsResearch.map((q) => (
                  <li key={q} className="flex gap-3 text-[var(--color-ink)]">
                    <span className="text-[var(--color-orange)] flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[var(--color-orange)] mb-4">Industry</h3>
              <ul className="space-y-3">
                {questionsIndustry.map((q) => (
                  <li key={q} className="flex gap-3 text-[var(--color-ink)]">
                    <span className="text-[var(--color-green)] flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[var(--color-green)] mb-4">Personal</h3>
              <ul className="space-y-3">
                {questionsPersonal.map((q) => (
                  <li key={q} className="flex gap-3 text-[var(--color-ink)]">
                    <span className="text-[var(--color-pink)] flex-shrink-0">Q.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Talks & Interviews */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">Previous Talks & Interviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            <div className="bg-[var(--color-base)] p-7"><h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">Videos</h3><p className="text-[var(--color-ink-3)] text-sm">Coming soon.</p></div>
            <div className="bg-[var(--color-base)] p-7"><h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">Podcasts</h3><p className="text-[var(--color-ink-3)] text-sm mb-3">Interview about Sovereign AI</p><a href="/interviewSovereignAI.mp3" download className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">Download Interview ↓</a></div>
            <div className="bg-[var(--color-base)] p-7"><h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">Conference Talks</h3><p className="text-[var(--color-ink-3)] text-sm">Coming soon.</p></div>
            <div className="bg-[var(--color-base)] p-7"><h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">Blog Articles</h3><p className="text-[var(--color-ink-3)] text-sm">Coming soon.</p></div>
            <div className="bg-[var(--color-base)] p-7"><h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">GitHub Projects</h3><p className="text-[var(--color-ink-3)] text-sm">222+ repositories on GitHub.</p></div>
          </div>
        </div>
      </section>

      {/* Speaking */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-4">Speaking</h2>
          <p className="text-[var(--color-ink-3)] text-lg mb-8">Daniel speaks on reducing the cost of understanding human knowledge — compile-time AI, knowledge compilation, cognitive memory, decision graphs, and local-first systems. Topics can be tailored for technical, educational, or general audiences.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            {availability.map((item) => (
              <div key={item.type} className="bg-[var(--color-base)] p-4 flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-[var(--color-ink)] text-sm">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
            <div className="bg-[var(--color-base)] p-7">
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">Website</h3>
              <a href="https://www.danielkliewer.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">danielkliewer.com ↗</a>
            </div>
            <div className="bg-[var(--color-base)] p-7">
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">Book</h3>
              <a href="https://www.danielkliewer.com/book" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">danielkliewer.com/book ↗</a>
            </div>
            <div className="bg-[var(--color-base)] p-7">
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">GitHub</h3>
              <a href="https://github.com/kliewerdaniel" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">github.com/kliewerdaniel ↗</a>
            </div>
            <div className="bg-[var(--color-base)] p-7">
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">LinkedIn</h3>
              <a href="https://www.linkedin.com/in/daniel-kliewer-42691944/" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">LinkedIn Profile ↗</a>
            </div>
            <div className="bg-[var(--color-base)] p-7">
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">Email</h3>
              <a href="mailto:danielkliewer@gmail.com" className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-[var(--color-green)] hover:underline">danielkliewer@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Bios */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-medium text-3xl tracking-[-0.015em] text-[var(--color-ink)] mb-8">Bios</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-medium text-[var(--color-green)] mb-3">Short Bio (50 Words)</h3>
              <p className="text-[var(--color-ink-3)] leading-relaxed">
                Daniel Kliewer researches how to reduce the cost of understanding human knowledge. His work examines knowledge compilation, compile-time AI, cognitive memory, and local-first systems. He is the author of Sovereign AI, a book on building infrastructure for understanding rather than generation.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[var(--color-pink)] mb-3">Medium Bio (100 Words)</h3>
              <p className="text-[var(--color-ink-3)] leading-relaxed">
                Daniel Kliewer researches how to reduce the cost of understanding human knowledge. His work spans knowledge compilation, compile-time AI, cognitive memory, decision graphs, and local-first inference. He approaches AI as infrastructure for understanding rather than a generator of more text — systems that organize what we know so more people can learn it. His book, Sovereign AI, traces this reasoning from first principles to working systems. He documents his investigations through open-source code, technical writing, and public research.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[var(--color-orange)] mb-3">Long Bio (250 Words)</h3>
              <p className="text-[var(--color-ink-3)] leading-relaxed">
                Daniel Kliewer researches how to reduce the cost of understanding human knowledge — the idea that human progress depends on how efficiently what we already know can move from one person to the next. His work examines how knowledge compilation, compile-time AI, cognitive memory, and decision graphs turn static documents into navigable, inspectable understanding.
              </p>
              <p className="text-[var(--color-ink-3)] leading-relaxed mt-4">
                Rather than treating AI as a generator of more text, his work treats it as infrastructure for understanding, where every layer is owned, local-first, and inspectable. The central question: what changes when knowledge is compiled once and explored by everyone? The answers are architectural — structured semantic artifacts replacing ad-hoc retrieval, graph reasoning replacing flat search, persistent memory replacing context windows, and local systems replacing cloud dependence as the default.
              </p>
              <p className="text-[var(--color-ink-3)] leading-relaxed mt-4">
                Each project tests a specific hypothesis. The Sovereign Knowledge Compiler explores whether a corpus can be compiled into a decision graph that people navigate instead of re-deriving. Knowledge Compiler SDK makes that compilation programmable. These are not products. They are answers to specific questions about how understanding is made cheaper.
              </p>
              <p className="text-[var(--color-ink-3)] leading-relaxed mt-4">
                As the author of Sovereign AI, Daniel presents the synthesis of this investigation — chapters that trace the logic from first principles through working systems. He documents his work publicly: the code on GitHub, the reasoning in the blog, the synthesis in the book. The work is ongoing. The questions remain open.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="section-rule section-pad">
        <div className="max-w-4xl mx-auto">
          <BookCTA />
        </div>
      </section>
    </>
  );
}
