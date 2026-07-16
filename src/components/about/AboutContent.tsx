import { BookCTA } from '@/components/blog/BookCTA';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const purpose = [
  {
    title: 'Who I am',
    body: [
      'I am a computer scientist and AI researcher based in Austin, Texas. For several years my work has centered on a single question that has steadily overtaken the purely technical ones: how do we make human knowledge cheaper to understand?',
      'I publish the research openly — the code on GitHub, the reasoning in the blog, the synthesis in the book. If you are investigating similar questions, the work is yours to build on.',
    ],
  },
  {
    title: 'The problem I am trying to solve',
    body: [
      'Civilization is, in many ways, a system for transferring accumulated knowledge from one generation to the next. The efficiency of that transfer determines how quickly society can progress. Today, acquiring professional knowledge remains expensive — years of education, scarce instructors, fragmented material — which makes qualified expertise rare and leaves essential work understaffed.',
      'I want to reduce the cost of understanding human knowledge: making it easier to learn a profession, easier to do better research, easier to preserve what institutions already know.',
    ],
  },
  {
    title: 'Why reducing the cost of understanding matters',
    body: [
      'When knowledge is expensive to acquire, qualified people become scarce, and the people who remain must each care for more patients, teach more students, and serve more customers. Time becomes the scarce resource.',
      'Lower the cost of learning and you do not merely create efficiency. You create more time — for care, for teaching, for discovery. The aim is a world where more people can learn, teach, and devote their time to one another.',
    ],
  },
  {
    title: 'How my projects contribute',
    body: [
      'None of my projects are the destination. They are experiments toward the same end.',
      'Knowledge compilation organizes human knowledge into structured, navigable artifacts before the question is asked. Compile-time AI performs reasoning once and compiles it into representations people can explore. Decision graphs make judgment inspectable. Sovereign memory preserves understanding across sessions. Local-first systems keep that knowledge transparent and under the user’s control.',
      'Each is a different approach to reducing the cognitive cost of understanding.',
    ],
  },
];

const researchPhilosophy = [
  { title: 'Knowledge over text', desc: 'The goal is not to generate more language but to organize what already exists — making relationships explicit, navigable, and inspectable.' },
  { title: 'Compile-time, not query-time', desc: 'Much of the hard reasoning should happen once, ahead of time, and be compiled into structures people can explore — not rediscovered on every query.' },
  { title: 'Local-first and inspectable', desc: 'Knowledge systems should run on the user’s own hardware, be transparent, and remain theirs to own and verify.' },
  { title: 'Understanding compounds', desc: 'Every hour saved from searching is an hour returned to discovery, teaching, and care. The savings multiply across millions of people.' },
];

const openSource = [
  { title: 'Publish openly', desc: 'Research advances are shared as writing and code so that others can build on them without permission or payment.' },
  { title: 'Build in the open', desc: 'Hundreds of repositories, each testing a specific architectural question, available for inspection and reuse.' },
  { title: 'Local-first by default', desc: 'Tools that run without a third party’s cloud keep knowledge under the control of the person who depends on it.' },
];

const timeline = [
  { year: '2026', title: 'Mission in Focus', desc: 'The research converges on one explicit aim: reducing the cost of understanding human knowledge — from first principles through production systems.' },
  { year: '2025', title: 'Cognitive Memory Architecture', desc: 'Sovereign Memory Bank showed that persistent agent memory requires a multi-layered architecture: raw documents to synthesized abstractions.' },
  { year: '2025', title: 'Knowledge Compilation', desc: 'The Sovereign Knowledge Compiler turned heterogeneous corpora into static, navigable semantic artifacts — understanding ahead of the query.' },
  { year: '2025', title: 'Compositional Intelligence', desc: 'Dynamic Persona MoE RAG demonstrated that routing between specialized local models produces more coherent reasoning than any single model.' },
  { year: '2024', title: 'Open Investigation Begins', desc: 'Started publishing research in public. The blog and GitHub became the laboratory for systematic exploration.' },
];

export function AboutContent() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 relative">
              <div className="w-36 h-36 border-4 border-ink overflow-hidden relative shadow-brutalist-lg">
                <picture>
                  <source srcSet="/images/formats/profile.avif" type="image/avif" />
                  <source srcSet="/images/formats/profile.webp" type="image/webp" />
                  <Image
                    src="/images/profile.jpeg"
                    alt="Daniel Kliewer"
                    fill
                    className="object-cover"
                    sizes="144px"
                    priority
                  />
                </picture>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-display text-4xl md:text-5xl mb-3">Daniel Kliewer</h1>
              <p className="text-xl accent-green mb-2 font-bold">Reducing the Cost of Understanding Human Knowledge</p>
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

      {/* Purpose */}
      <section className="py-20 px-4 bg-surface relative reveal">
        <div className="absolute inset-0 pointillism-layer opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <span className="mono text-green text-xs mb-3 block">Purpose</span>
          <h2 className="font-display text-3xl mb-10">Why I Do This Work</h2>
          <div className="space-y-10">
            {purpose.map((s) => (
              <div key={s.title}>
                <h3 className="font-display text-2xl mb-3 text-ink">{s.title}</h3>
                <div className="space-y-4 text-ink-3 leading-relaxed text-lg font-bold">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Philosophy */}
      <section className="py-20 px-4 reveal">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-8">Research Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchPhilosophy.map((s) => (
              <Card key={s.title}>
                <h3 className="font-display text-ink mb-3">{s.title}</h3>
                <p className="text-sm text-ink-3 font-bold leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Philosophy */}
      <section className="py-20 px-4 bg-surface relative reveal">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="font-display text-3xl mb-8">Open Source Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openSource.map((s) => (
              <Card key={s.title}>
                <h3 className="font-display text-ink mb-3">{s.title}</h3>
                <p className="text-sm text-ink-3 font-bold leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 reveal">
        <div className="max-w-4xl mx-auto">
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

      <section className="py-20 px-4 bg-surface reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4">The Mission, in Full</h2>
          <p className="text-ink-3 mb-8 text-lg font-bold max-w-2xl mx-auto">
            The complete argument for why this work matters — and what a world with cheaper understanding looks like.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/mission" variant="primary" size="lg">Read the Mission</Button>
            <Button href="https://github.com/kliewerdaniel" external variant="secondary" size="lg">GitHub ↗</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 reveal">
        <div className="max-w-4xl mx-auto"><BookCTA /></div>
      </section>
    </>
  );
}
