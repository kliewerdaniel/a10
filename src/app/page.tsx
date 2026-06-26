import { HeroBackground } from '@/components/three/HeroBackground';
import { BookButton, Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BookCTA } from '@/components/blog/BookCTA';
import { ProjectCard } from '@/components/projects/ProjectCard';
import Link from 'next/link';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

const problems = [
  { icon: '●', color: 'accent-pink', title: 'You Don\'t Own It', text: 'Every API call goes through someone else\'s server. They control pricing, access, and uptime.' },
  { icon: '●', color: 'accent-green', title: 'Your Data Isn\'t Yours', text: 'Prompts, documents, intellectual property — all flowing through servers you don\'t control.' },
  { icon: '●', color: 'accent-orange', title: 'Rent Forever', text: 'Monthly fees that scale with usage. You build on someone else\'s foundation. Try selling that.' },
  { icon: '●', color: 'accent-yellow', title: 'No Escape', text: 'Switch providers? Rewrite everything. Your workflows become prisoners of proprietary APIs.' },
];

const solutions = [
  { icon: '●', color: 'accent-pink', title: 'Run Locally', desc: 'Ollama, llama.cpp, quantized models. Your hardware. Your inference.' },
  { icon: '●', color: 'accent-green', title: 'Build Intelligence', desc: 'RAG pipelines, knowledge graphs, autonomous agents — all running on your machine.' },
  { icon: '●', color: 'accent-orange', title: 'Stay Private', desc: 'No data leaves your network. No third-party servers. No surprises.' },
  { icon: '●', color: 'accent-yellow', title: 'No Limits', desc: 'No rate limits. No usage caps. No monthly fees. Just intelligence.' },
];

const featuredProjects = [
  { name: 'workflow', description: 'Structured AI-Assisted Development Workflow — the methodology behind building sovereign systems at scale.', stars: 45, language: 'Markdown', url: 'https://github.com/kliewerdaniel/workflow' },
  { name: 'autoblog01', description: 'AI-powered blogging platform with RAG-driven content generation. Next.js + local LLMs.', stars: 22, language: 'Python', url: 'https://github.com/kliewerdaniel/autoblog01' },
  { name: 'sovereignBank', description: 'Cognitive memory system for agents. Seven-layer architecture for autonomous knowledge.', stars: 0, language: 'Python', url: 'https://github.com/kliewerdaniel/sovereignBank', blogSlug: '2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems' },
  { name: 'SynthInt', description: 'Dynamic Persona MoE RAG — sovereign synthetic intelligence. Data stays on your machine.', stars: 0, language: 'Python', url: 'https://github.com/kliewerdaniel/SynthInt' },
  { name: 'chrome-ai-filename-generator', description: 'Chrome extension that renames files intelligently using local AI. No cloud needed.', stars: 6, language: 'JavaScript', url: 'https://github.com/kliewerdaniel/chrome-ai-filename-generator' },
  { name: 'ConCreat', description: 'Multimedia content creation with AI text-to-speech. All local processing.', stars: 1, language: 'TypeScript', url: 'https://github.com/kliewerdaniel/ConCreat' },
];

const latestPosts = [
  { slug: '2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems', title: 'Sovereign Memory Bank', date: '06-14-2026', description: 'How I built an autonomous cognitive memory system that transforms documents into evolving knowledge — no cloud required.', tags: ['memory', 'ai-agents'] },
  { slug: '2026-03-28-sovereignty-manifesto', title: 'The Sovereignty Manifesto', date: '03-28-2026', description: 'Why data sovereignty is a fundamental right and why the future of AI is local.', tags: ['sovereignty', 'privacy'] },
  { slug: '2026-03-10-breaking-free-from-chatgpt', title: 'Your First Local AI', date: '03-10-2026', description: 'Stop paying per token. Run your own AI assistant on your laptop with Ollama.', tags: ['local-llm', 'ollama'] },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="mono inline-flex items-center gap-2.5 px-5 py-2.5 bg-cream border-4 border-ink text-ink text-sm backdrop-blur-sm" style={{ boxShadow: '4px 4px 0 #0F0F0F' }}>
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Available Now on Amazon
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-[5.5rem] mb-6 tracking-tighter leading-[0.85]">
            <span className="text-ink">Stop Renting</span>
            <br />
            <span className="accent-green">Intelligence.</span>
          </h1>

          <p className="text-xl md:text-2xl text-ink-3 mb-4 max-w-3xl mx-auto leading-relaxed">
            Build AI that runs on <span className="text-ink font-bold">your hardware</span>,
            keeps <span className="text-ink font-bold">your data</span> private, and
            answers only to <span className="text-ink font-bold">you</span>.
          </p>
          <p className="text-base text-ink-3/60 mb-10">
            The practical guide by <Link href="/about" className="accent-green font-bold transition-colors hover:text-green-dark">Daniel Kliewer</Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookButton size="lg" />
            <Button href="/book" variant="secondary" size="lg">
              See What&apos;s Inside
            </Button>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-ink-3 font-bold">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green" />72 Pages</div>
            <div className="w-1 h-1 rounded-full bg-ink hidden sm:block" />
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink" />11 Chapters</div>
            <div className="w-1 h-1 rounded-full bg-ink hidden sm:block" />
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange" />10+ Projects</div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-4 border-ink bg-cream flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-ink animate-pulse" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="mono text-green text-xs mb-4 block">The Problem</span>
            <h2 className="font-display text-4xl md:text-5xl mb-5">You Don&apos;t Own Your AI</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-lg">
              Every prompt you send to the cloud is a transfer of control. Here&apos;s what that costs you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((p) => (
              <Card key={p.title}>
                <div className={`text-2xl mb-4 ${p.color}`}>{p.icon}</div>
                <h3 className="font-display text-lg mb-2 text-ink">{p.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 px-4 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="mono text-pink text-xs mb-4 block">The Solution</span>
            <h2 className="font-display text-4xl md:text-5xl mb-5">Build Intelligence You Own</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-lg">
              Sovereign AI teaches you the complete local stack — from running models to deploying systems. No cloud.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((s) => (
              <Card key={s.title}>
                <div className={`text-2xl mb-4 ${s.color}`}>{s.icon}</div>
                <h3 className="font-display text-lg mb-2 text-ink">{s.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="mono text-orange text-xs mb-4 block">The Book</span>
            <h2 className="font-display text-4xl md:text-5xl">Everything You Need</h2>
          </div>
          <BookCTA />
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-24 px-4 bg-surface relative">
        <div className="absolute inset-0 dot-pattern-dense opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="mono text-green text-xs mb-4 block">Inside</span>
            <h2 className="font-display text-4xl md:text-5xl">What You&apos;ll Learn</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: 'Local LLMs', d: 'Ollama, llama.cpp, quantized models' },
              { t: 'RAG Pipelines', d: 'ChromaDB, local embeddings' },
              { t: 'Knowledge Graphs', d: 'Graph-based AI reasoning' },
              { t: 'AI Agents', d: 'Autonomous offline agents' },
              { t: 'MCP Servers', d: 'Tool integration protocol' },
              { t: 'Full-Stack AI', d: 'Django + Next.js apps' },
              { t: 'Persona Systems', d: 'Dynamic expert selection' },
              { t: 'RLHF & Eval', d: 'Fine-tuning and measurement' },
              { t: 'Security', d: 'Production privacy practices' },
            ].map((item) => (
              <div key={item.t} className="flex items-start gap-3 p-4 border-4 border-ink bg-cream">
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
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="mono text-orange text-xs mb-4 block">Open Source</span>
              <h2 className="font-display text-4xl">Projects</h2>
            </div>
            <Button href="https://github.com/kliewerdaniel" external variant="secondary" size="sm">All 222 Repos →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => <ProjectCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-4 bg-surface relative">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="mono text-pink text-xs mb-4 block">Blog</span>
              <h2 className="font-display text-4xl">Deep Dives</h2>
            </div>
            <Button href="/blog" variant="secondary" size="sm">All Posts →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block card-pointillist p-6 transition-all duration-200">
                <div className="flex items-center gap-3 mb-4 text-sm text-ink-3 font-bold">
                  <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                </div>
                <h3 className="font-display text-xl mb-3 group-hover:text-pink transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-ink-3 mb-4 line-clamp-2 leading-relaxed">{post.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => <span key={t} className="mono px-2.5 py-0.5 text-xs bg-cream border-2 border-ink text-ink font-bold">{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 glaze-all pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <span className="mono text-green text-xs mb-4 block">Ready?</span>
          <h2 className="font-display text-4xl mb-5">Your AI. Your Rules.</h2>
          <p className="text-ink-3 mb-10 text-lg">Get the book. Clone a project. Build today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <BookButton size="lg" />
            <Button href="/blog" variant="secondary" size="lg">Start with a Tutorial</Button>
          </div>

        </div>
      </section>
    </>
  );
}
