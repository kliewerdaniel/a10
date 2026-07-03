import { HeroBackground } from '@/components/three/HeroBackground';
import { BookButton, Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BookCTA } from '@/components/blog/BookCTA';
import { ProjectCard } from '@/components/projects/ProjectCard';
import Link from 'next/link';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

const problems = [
  { icon: '●', color: 'accent-pink', title: 'Infrastructure Dependence', text: 'Every inference depends on infrastructure you do not control. This is an architectural constraint, not a feature limitation.' },
  { icon: '●', color: 'accent-green', title: 'Data Boundaries', text: 'Querying remote models means transmitting data outside your authority. This shapes what you can build and where.' },
  { icon: '●', color: 'accent-orange', title: 'Recurring Access', text: 'Per-token pricing makes long-running or autonomous systems economically fragile. Usage is metered by someone else\'s meter.' },
  { icon: '●', color: 'accent-yellow', title: 'Protocol Coupling', text: 'Provider-specific APIs tie your system to a single access path. Changing infrastructure requires rewriting the interface layer.' },
];

const solutions = [
  { icon: '●', color: 'accent-pink', title: 'Local Inference', desc: 'Models run on your hardware. Ollama, llama.cpp, and quantized architectures provide the runtime.' },
  { icon: '●', color: 'accent-green', title: 'Composable Systems', desc: 'RAG pipelines, knowledge graphs, and autonomous agents combine into architectures, not point solutions.' },
  { icon: '●', color: 'accent-orange', title: 'Data Authority', desc: 'Processing stays within your network. This is a structural property of the architecture.' },
  { icon: '●', color: 'accent-yellow', title: 'Unmetered Operation', desc: 'No rate limits or usage caps — there is no external gate. The only constraint is your hardware.' },
];

const featuredProjects = [
  { name: 'workflow', description: 'A structured methodology for integrating AI into software development. Explores how systems thinking can guide AI-assisted engineering.', stars: 45, language: 'Markdown', url: 'https://github.com/kliewerdaniel/workflow' },
  { name: 'autoblog01', description: 'Investigates RAG-driven content generation as an architectural pattern. Can local LLMs drive the full content pipeline end to end?', stars: 22, language: 'Python', url: 'https://github.com/kliewerdaniel/autoblog01' },
  { name: 'sovereignBank', description: 'Explores whether autonomous agents can maintain persistent, evolving memory without cloud infrastructure. A seven-layer cognitive architecture.', stars: 0, language: 'Python', url: 'https://github.com/kliewerdaniel/sovereignBank', blogSlug: '2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems' },
  { name: 'SynthInt', description: 'Examines mixture-of-experts routing through dynamic personas. Can synthetic intelligence emerge from locally-hosted specialized models?', stars: 0, language: 'Python', url: 'https://github.com/kliewerdaniel/SynthInt' },
  { name: 'chrome-ai-filename-generator', description: 'Studies the interface between local inference and everyday workflows. A concrete experiment in on-device AI utility.', stars: 6, language: 'JavaScript', url: 'https://github.com/kliewerdaniel/chrome-ai-filename-generator' },
  { name: 'ConCreat', description: 'Investigates local text-to-speech pipelines for multimedia content. What are the boundaries of fully offline content generation?', stars: 1, language: 'TypeScript', url: 'https://github.com/kliewerdaniel/ConCreat' },
];

const latestPosts = [
  { slug: '2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems', title: 'Sovereign Memory Bank', date: '06-14-2026', description: 'An autonomous cognitive memory system that transforms documents into evolving knowledge graphs — no cloud required.', tags: ['memory', 'ai-agents'] },
  { slug: '2026-03-28-sovereignty-manifesto', title: 'The Sovereignty Manifesto', date: '03-28-2026', description: 'Why computational sovereignty is a prerequisite for meaningful AI ownership and why local-first is an architectural necessity.', tags: ['sovereignty', 'privacy'] },
  { slug: '2026-03-10-breaking-free-from-chatgpt', title: 'Your First Local AI', date: '03-10-2026', description: 'Running your own AI on your laptop with Ollama. A practical entry point into local-first intelligence.', tags: ['local-llm', 'ollama'] },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <div className="mb-6 sm:mb-8">
            <span className="mono inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-cream border-4 border-ink text-ink text-xs sm:text-sm backdrop-blur-sm shadow-brutalist-sm">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Available Now on Amazon
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] mb-4 sm:mb-6 tracking-tighter leading-[0.85]">
            <span className="text-ink">Architectures for</span>
            <br />
            <span className="accent-green">Intelligence You Own</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-ink-3 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
            Investigating local-first AI systems, cognitive memory architectures,
            <br />
            graph-based reasoning, and computational sovereignty.
          </p>
          <p className="text-sm sm:text-base text-ink-3/60 mb-8 sm:mb-10">
            An ongoing investigation by <Link href="/about" className="accent-green font-bold transition-colors hover:text-green-dark">Daniel Kliewer</Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <BookButton size="lg" />
            <Button href="/book" variant="secondary" size="lg">
              The Architectural Investigation
            </Button>
          </div>

          <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-ink-3 font-bold">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green" />72 Pages</div>
            <div className="w-1 h-1 rounded-full bg-ink hidden sm:block" />
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink" />11 Chapters</div>
            <div className="w-1 h-1 rounded-full bg-ink hidden sm:block" />
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange" />10+ Projects</div>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-4 border-ink bg-cream flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-ink animate-pulse" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-24 px-5 relative">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10 sm:mb-16">
            <span className="mono text-green text-xs mb-3 sm:mb-4 block">The Architectural Constraint</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5">Dependence Is a Design Decision</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-base sm:text-lg">
              Most AI today is built on infrastructure someone else controls. These are the structural implications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {problems.map((p) => (
              <Card key={p.title}>
                <div className={`text-2xl mb-3 sm:mb-4 ${p.color}`}>{p.icon}</div>
                <h3 className="font-display text-base sm:text-lg mb-2 text-ink">{p.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10 sm:mb-16">
            <span className="mono text-pink text-xs mb-3 sm:mb-4 block">A Different Foundation</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5">Architectures for Sovereignty</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-base sm:text-lg">
              Rebuilding the stack so every layer — from inference to memory — is owned and understood by its operator.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {solutions.map((s) => (
              <Card key={s.title}>
                <div className={`text-2xl mb-3 sm:mb-4 ${s.color}`}>{s.icon}</div>
                <h3 className="font-display text-base sm:text-lg mb-2 text-ink">{s.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="py-16 sm:py-24 px-5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="mono text-orange text-xs mb-3 sm:mb-4 block">The Book</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Everything You Need</h2>
          </div>
          <BookCTA />
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 dot-pattern-dense opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10 sm:mb-14">
            <span className="mono text-green text-xs mb-3 sm:mb-4 block">Scope of Investigation</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Architectural Layers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { t: 'Foundation Models', d: 'Understanding and running local LLMs' },
              { t: 'Retrieval Architectures', d: 'RAG pipelines with local embeddings' },
              { t: 'Structured Knowledge', d: 'Graph-based reasoning systems' },
              { t: 'Agent Systems', d: 'Autonomous, offline agent architectures' },
              { t: 'Tool Integration', d: 'Connecting AI via standardized protocols' },
              { t: 'Full-Stack AI', d: 'Complete application architectures' },
              { t: 'Persona Routing', d: 'Dynamic expert selection across models' },
              { t: 'Evaluation', d: 'Measuring and improving system behavior' },
              { t: 'Production Security', d: 'Privacy-preserving deployment architectures' },
            ].map((item) => (
              <div key={item.t} className="flex items-start gap-3 p-3 sm:p-4 border-4 border-ink bg-cream">
                <span className="w-2 h-2 rounded-full bg-pink mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-display text-ink text-sm">{item.t}</h4>
                  <p className="text-xs text-ink-3 mt-0.5 font-bold">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-24 px-5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="mono text-orange text-xs mb-3 sm:mb-4 block">Open Source</span>
              <h2 className="font-display text-3xl sm:text-4xl">Research Through Code</h2>
            </div>
            <Button href="https://github.com/kliewerdaniel" external variant="secondary" size="sm">All Repositories →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProjects.map((p) => <ProjectCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="mono text-pink text-xs mb-3 sm:mb-4 block">Technical Essays</span>
              <h2 className="font-display text-3xl sm:text-4xl">Architectural Investigations</h2>
            </div>
            <Button href="/blog" variant="secondary" size="sm">All Essays →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block card-pointillist p-5 sm:p-6 transition-all duration-200">
                <div className="flex items-center gap-3 mb-3 sm:mb-4 text-sm text-ink-3 font-bold">
                  <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                </div>
                <h3 className="font-display text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-pink transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-ink-3 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{post.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => <span key={t} className="mono px-2 py-0.5 text-xs bg-cream border-2 border-ink text-ink font-bold">{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-5 relative overflow-hidden">
        <div className="absolute inset-0 glaze-all pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <span className="mono text-green text-xs mb-3 sm:mb-4 block">The Work Is Open</span>
          <h2 className="font-display text-3xl sm:text-4xl mb-4 sm:mb-5">The Architecture Is Yours</h2>
          <p className="text-ink-3 mb-8 sm:mb-10 text-base sm:text-lg">The book documents the architecture. The code implements it. What you build from them is your own.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <BookButton size="lg" />
            <Button href="/blog" variant="secondary" size="lg">Read the Technical Essays</Button>
          </div>
        </div>
      </section>
    </>
  );
}
