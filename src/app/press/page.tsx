import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Card';
import { BookCTA } from '@/components/blog/BookCTA';

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'Press kit, interview materials, bios, and speaking information for Daniel Kliewer — author of Sovereign AI.',
};

const interviewTopics = [
  'What "Sovereign AI" actually means',
  'Why local AI matters',
  'Open-source vs proprietary AI',
  'Running LLMs on consumer hardware',
  'Building practical RAG systems',
  'AI memory architectures',
  'Knowledge graphs and semantic search',
  'Agentic AI beyond chatbots',
  'Designing resilient AI systems',
  'The future of AI ownership',
  'Building AI products as a solo developer',
  'Open-source AI ecosystems',
  'Lessons learned writing Sovereign AI',
];

const questionsAboutTheBook = [
  'What inspired you to write Sovereign AI?',
  'Who is this book for?',
  'What misconceptions about AI do you hope to challenge?',
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
            Everything you need for podcasts, conferences, interviews, articles, and speaking engagements.
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
              Daniel Kliewer is a software engineer, AI researcher, writer, and open-source developer focused on building AI systems that users truly own. His work explores local-first AI, Retrieval-Augmented Generation (RAG), AI agents, knowledge graphs, long-term memory systems, and open-source large language models.
            </p>
            <p>
              Drawing from years of hands-on software development and experimentation with modern AI infrastructure, Daniel advocates for an architectural approach that emphasizes ownership, transparency, and resilience over dependence on proprietary services. His projects examine how developers can build intelligent systems that continue to function regardless of changes in commercial APIs or cloud platforms.
            </p>
            <p>
              He is the author of <strong className="text-ink">Sovereign AI</strong>, a book exploring the philosophy and engineering principles behind building AI that remains under the user&apos;s control.
            </p>
          </div>
        </div>
      </section>

      {/* About Sovereign AI */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">About Sovereign AI</h2>
          <p className="text-ink-3 text-lg font-bold mb-8 max-w-3xl">
            Sovereign AI explores how developers can move beyond simply using AI APIs to building intelligent systems they own and understand.
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
          <p className="text-ink-3 text-lg font-bold mb-8">Daniel is available for a range of speaking formats. Topics can be tailored for technical, business, or general audiences.</p>
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
                Daniel Kliewer is a software engineer, AI researcher, and author of Sovereign AI. His work focuses on local AI, Retrieval-Augmented Generation (RAG), AI agents, knowledge graphs, and open-source AI systems designed around ownership rather than dependence.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl mb-3 accent-pink">Medium Bio (100 Words)</h3>
              <p className="text-ink-3 font-bold leading-relaxed">
                Daniel Kliewer is a software engineer, AI researcher, and author specializing in local-first artificial intelligence. His work explores open-source LLMs, Retrieval-Augmented Generation (RAG), knowledge graphs, AI agents, and long-term memory architectures. Through his writing and software projects, he advocates for building AI systems that users own, understand, and control. His book, Sovereign AI, examines the technologies and architectural principles that enable developers to create resilient, privacy-conscious AI applications independent of proprietary cloud services.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl mb-3 accent-orange">Long Bio (250 Words)</h3>
              <p className="text-ink-3 font-bold leading-relaxed">
                Daniel Kliewer is a software engineer, AI researcher, open-source contributor, and author focused on the emerging field of sovereign artificial intelligence. His work centers on the belief that the future of AI should be defined not only by increasingly capable models but also by the ability of individuals and organizations to own, understand, and control the intelligent systems they build.
              </p>
              <p className="text-ink-3 font-bold leading-relaxed mt-4">
                His research and development span local large language models, Retrieval-Augmented Generation (RAG), knowledge graphs, semantic search, AI agents, long-term memory systems, and local-first architectures. By combining these technologies, he explores practical approaches to creating AI systems that remain resilient in the face of changing APIs, evolving cloud services, and rapidly shifting commercial ecosystems.
              </p>
              <p className="text-ink-3 font-bold leading-relaxed mt-4">
                As the author of Sovereign AI, Daniel presents a technical and philosophical framework for designing AI infrastructure around ownership, transparency, and sustainability. His work encourages developers to think beyond prompt engineering and consider the broader architecture that supports intelligent software over the long term.
              </p>
              <p className="text-ink-3 font-bold leading-relaxed mt-4">
                In addition to writing, Daniel develops open-source software, publishes technical articles, and shares practical insights into building modern AI systems. His mission is to help developers move from simply consuming AI services to creating intelligent systems they truly own.
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
