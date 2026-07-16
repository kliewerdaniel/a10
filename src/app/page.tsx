import { HeroBackground } from '@/components/three/HeroBackground';
import { Button, BookButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { ResearchVision } from '@/components/research/ResearchVision';
import { getAllBlogPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';
import Link from 'next/link';

const manifesto = [
  {
    title: 'Knowledge transfer is the engine of civilization',
    desc: 'Every profession stands on knowledge someone else already discovered. The speed at which that knowledge moves from one person to the next determines how quickly society can progress.',
  },
  {
    title: 'Today, understanding is expensive',
    desc: 'Years of education, scarce instructors, and fragmented material make qualified expertise rare. Scarcity drives up cost and leaves essential work — care, teaching, discovery — understaffed.',
  },
  {
    title: 'AI should lower the cost of understanding',
    desc: 'Not merely generate more text, but make accumulated knowledge easier to navigate, preserve, and retain. The aim is faster learning, better research, and more time to care.',
  },
];

const directions = [
  {
    title: 'Knowledge Compilation',
    desc: 'Organizing human knowledge into structured, navigable semantic artifacts before the question is asked.',
    color: 'green',
    dot: 'bg-green',
    href: '/projects/knowledge-compilation',
  },
  {
    title: 'Compile-Time AI',
    desc: 'Reasoning performed once and compiled into representations people can explore, rather than rediscovered on every query.',
    color: 'orange',
    dot: 'bg-orange',
    href: '/projects/compile-time-ai',
  },
  {
    title: 'Scientific Knowledge Systems',
    desc: 'Semantic infrastructure for preserving and accelerating scientific discovery.',
    color: 'yellow',
    dot: 'bg-yellow',
    href: '/projects/scientific-knowledge-systems',
  },
  {
    title: 'Local-First AI',
    desc: 'Knowledge systems that run on your own hardware — transparent, inspectable, and yours to own.',
    color: 'pink',
    dot: 'bg-pink',
    href: '/projects/local-first-ai',
  },
  {
    title: 'Cognitive Memory',
    desc: 'Persistent, structured memory that compounds understanding across sessions instead of forgetting it.',
    color: 'green',
    dot: 'bg-green',
    href: '/projects/cognitive-memory',
  },
  {
    title: 'Decision Graphs',
    desc: 'Explicit representations of judgment that make reasoning inspectable and reusable.',
    color: 'orange',
    dot: 'bg-orange',
    href: '/projects/decision-graphs',
  },
];

export default function Home() {
  const recentPosts = getAllBlogPosts().slice(0, 3);
  const allProjects = getAllProjects();
  const recentProjects = allProjects
    .sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime())
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="mono text-green text-xs mb-8 hero-fade-in hero-delay-1">
            A research program by Daniel Kliewer
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] mb-8 tracking-tighter leading-[0.95] hero-fade-in hero-delay-2">
            <span className="text-ink">Reducing the Cost of</span>
            <br />
            <span className="accent-green">Understanding Human Knowledge</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ink-3 mb-12 max-w-2xl mx-auto leading-relaxed hero-fade-in hero-delay-3">
            This research explores compile-time AI, semantic knowledge systems, and local-first
            AI to make humanity’s accumulated knowledge easier to understand, preserve, and share.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-14 hero-fade-in hero-delay-4">
            <Button href="/research" variant="primary" size="lg">
              Explore Research
            </Button>
            <Button href="/mission" variant="secondary" size="lg">
              Read the Mission
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 hero-fade-in hero-delay-5">
            {['Knowledge Compilation', 'Compile-Time AI', 'Semantic Infrastructure', 'Cognitive Tools', 'Local-First AI', 'Learning Systems'].map((specialty) => (
              <span key={specialty} className="mono text-[11px] text-ink-3/70 tracking-wider">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-16 sm:py-24 px-5 relative reveal">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-green text-xs mb-3 block">Why This Exists</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">The Hypothesis</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-base sm:text-lg">
              Human progress depends on how efficiently knowledge can be transferred between people.
              My work asks one question: how do we make that transfer cost less?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {manifesto.map((m) => (
              <Card key={m.title}>
                <h3 className="font-display text-base sm:text-lg mb-3 text-ink">{m.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Vision */}
      <ResearchVision />

      {/* Research Directions */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative reveal">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="mono text-green text-xs mb-3 block">One Mission, Many Directions</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">Research Directions</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-base sm:text-lg">
              The projects on this site are not isolated experiments. Each is a different approach
              toward the same goal — reducing the cost of understanding human knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directions.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="group block border-4 border-ink bg-cream dark:bg-base p-5 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutalist-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-3 h-3 rounded-full ${d.dot} flex-shrink-0`} />
                  <h3 className="font-display text-ink text-sm group-hover:text-pink transition-colors">{d.title}</h3>
                </div>
                <p className="text-sm text-ink-3 leading-relaxed">{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Writing */}
      {recentPosts.length > 0 && (
        <section className="py-16 sm:py-24 px-5 relative reveal">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="mono text-pink text-xs mb-3 block">From the Research Log</span>
                <h2 className="font-display text-3xl sm:text-4xl">Recent Writing</h2>
              </div>
              <Button href="/research" variant="secondary" size="sm">All Research →</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {recentPosts.map((post) => (
                <ResearchCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  description={post.description}
                  tags={post.tags}
                  readingTime={post.readingTime}
                  category={post.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Projects */}
      <section className="py-16 sm:py-24 px-5 bg-surface relative reveal">
        <div className="absolute inset-0 pointillism-layer opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="mono text-orange text-xs mb-3 block">From the Lab</span>
              <h2 className="font-display text-3xl sm:text-4xl">Recent Projects</h2>
            </div>
            <Button href="/projects" variant="secondary" size="sm">All Projects →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
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

      {/* CTA */}
      <section className="py-16 sm:py-24 px-5 relative overflow-hidden reveal">
        <div className="absolute inset-0 glaze-all pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <span className="mono text-green text-xs mb-3 block">The Work Is Open</span>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">A Twenty-Year Research Agenda</h2>
          <p className="text-ink-3 mb-8 sm:mb-10 text-base sm:text-lg">
            The book documents the architecture. The code implements it. What you build from them
            is your own. Read the full argument for why this matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button href="/mission" variant="primary" size="lg">Read the Mission</Button>
            <Button href="/research" variant="secondary" size="lg">Explore the Research</Button>
          </div>
        </div>
      </section>
    </>
  );
}
