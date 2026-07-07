import { HeroBackground } from '@/components/three/HeroBackground';
import { Button, BookButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { getCornerstonePosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';
import Link from 'next/link';

const flowSteps = [
  { label: 'Research', color: 'bg-green', desc: 'Investigating architectural questions' },
  { label: 'Architecture', color: 'bg-pink', desc: 'Designing sovereign systems' },
  { label: 'Software', color: 'bg-orange', desc: 'Implementing the stack' },
  { label: 'Autonomous Systems', color: 'bg-yellow', desc: 'Deploying intelligence you own' },
  { label: 'New Research', color: 'bg-green', desc: 'Feeding insights back' },
];

const philosophy = [
  { title: 'Computational Sovereignty', desc: 'Intelligence infrastructure answers to its user, not a third party. Every architectural decision flows from this principle.' },
  { title: 'Memory as Architecture', desc: 'Persistent, structured knowledge — not stateless prompting — is the foundation of genuine intelligence.' },
  { title: 'Modular Cognition', desc: 'Intelligence is not monolithic. Specialized models, dynamic routing, and inspectable decisions produce coherent systems.' },
  { title: 'Local-First by Default', desc: 'The default position is local. Cloud is a deployment choice, not an architectural requirement.' },
];

const timeline = [
  { year: '2024', label: 'Learning', desc: 'First experiments with local LLMs, RAG pipelines, and persona-based systems.' },
  { year: '2025', label: 'Local AI', desc: 'Ollama integrations, knowledge graphs, and the beginning of sovereign memory.' },
  { year: '2025', label: 'Retrieval', desc: 'GraphRAG, vector embeddings, and multi-layer memory architectures.' },
  { year: '2026', label: 'Sovereign Intelligence', desc: 'The complete stack: from inference to orchestration to autonomous evaluation.' },
  { year: '2026', label: 'Current Work', desc: 'Synthesizing the architecture into a coherent framework. Publishing the research.' },
];

export default function Home() {
  const featuredPosts = getCornerstonePosts().slice(0, 3);
  const allProjects = getAllProjects();
  const featuredProjects = allProjects
    .filter((p) => p.status === 'production' || p.status === 'active')
    .sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime())
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] mb-6 tracking-tighter leading-[0.85]">
            <span className="text-ink">Building</span>
            <br />
            <span className="accent-green">Sovereign AI Systems</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-ink-3 mb-3 max-w-3xl mx-auto leading-relaxed">
            Researching, designing, and building intelligence you own.
          </p>
          <p className="text-sm sm:text-base text-ink-3/60 mb-10">
            Local-first AI, cognitive memory, graph reasoning, and computational sovereignty.
            <br className="hidden sm:block" />
            An ongoing investigation by{' '}
            <Link href="/about" className="accent-green font-bold transition-colors hover:text-green-dark">
              Daniel Kliewer
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button href="/research" variant="primary" size="lg">
              Explore Research
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              View Projects
            </Button>
            <Button href="/book" variant="ghost" size="lg">
              Read the Book
            </Button>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-4 border-ink bg-cream dark:bg-base flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-ink animate-pulse" />
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 sm:py-24 px-5 relative reveal">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-green text-xs mb-3 block">How It Connects</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">One Larger System</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-base sm:text-lg">
              Every project and article is part of one architecture. Research informs design. Design becomes software. Software generates new questions.
            </p>
          </div>

          <div className="flex flex-col items-center gap-0">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <div className="flex items-center gap-4 px-6 py-4 border-4 border-ink bg-cream dark:bg-base shadow-brutalist-sm w-full max-w-md">
                  <span className={`w-3 h-3 rounded-full ${step.color} flex-shrink-0`} />
                  <div>
                    <h3 className="font-display text-ink text-sm">{step.label}</h3>
                    <p className="text-xs text-ink-3 font-bold">{step.desc}</p>
                  </div>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="w-0.5 h-6 bg-ink/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research */}
      {featuredPosts.length > 0 && (
        <section className="py-16 sm:py-24 px-5 bg-surface relative reveal">
          <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="mono text-pink text-xs mb-3 block">Cornerstone Research</span>
                <h2 className="font-display text-3xl sm:text-4xl">Featured Articles</h2>
              </div>
              <Button href="/research" variant="secondary" size="sm">All Research →</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {featuredPosts.map((post) => (
                <ResearchCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  description={post.description}
                  tags={post.tags}
                  readingTime={post.readingTime}
                  category={post.category}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      <section className="py-16 sm:py-24 px-5 relative reveal">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="mono text-orange text-xs mb-3 block">Sovereign Intelligence Stack</span>
              <h2 className="font-display text-3xl sm:text-4xl">Featured Projects</h2>
            </div>
            <Button href="/projects" variant="secondary" size="sm">All Projects →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.layer}/${project.slug}`}
                className="group block border-4 border-ink bg-cream dark:bg-base p-5 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutalist-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-ink text-sm group-hover:text-pink transition-colors">{project.name}</h3>
                  <span
                    className={`mono text-[10px] px-2 py-0.5 border-2 border-ink font-bold ${
                      project.status === 'production'
                        ? 'bg-green/10 text-green'
                        : project.status === 'active'
                          ? 'bg-pink/10 text-pink'
                          : 'bg-orange/10 text-orange'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-ink-3 line-clamp-2 leading-relaxed mb-3">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="mono text-[10px] px-1.5 py-0.5 border border-ink/30 text-ink-3">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Research Philosophy */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative reveal">
        <div className="absolute inset-0 dot-pattern-dense opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-green text-xs mb-3 block">Research Direction</span>
            <h2 className="font-display text-3xl sm:text-4xl">Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {philosophy.map((p) => (
              <Card key={p.title}>
                <h3 className="font-display text-base sm:text-lg mb-2 text-ink">{p.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 px-5 relative reveal">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="mono text-pink text-xs mb-3 block">Evolution</span>
            <h2 className="font-display text-3xl sm:text-4xl">Research Timeline</h2>
          </div>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-16 sm:w-20 text-right pt-1">
                  <span className="mono text-xs font-bold accent-green">{t.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-ink flex-shrink-0 mt-1.5" />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-ink/15" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-ink text-base sm:text-lg">{t.label}</h3>
                  <p className="text-sm text-ink-3 mt-1 font-bold leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-5 relative overflow-hidden reveal">
        <div className="absolute inset-0 glaze-all pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <span className="mono text-green text-xs mb-3 block">The Work Is Open</span>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">The Architecture Is Yours</h2>
          <p className="text-ink-3 mb-8 sm:mb-10 text-base sm:text-lg">
            The book documents the architecture. The code implements it. What you build from them is your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <BookButton size="lg" />
            <Button href="/research" variant="secondary" size="lg">Read the Research</Button>
          </div>
        </div>
      </section>
    </>
  );
}
