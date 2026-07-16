import type { Metadata } from 'next';
import { ResearchVision } from '@/components/research/ResearchVision';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Mission — Reducing the Cost of Understanding Human Knowledge',
  description: 'A research manifesto: why I study knowledge compilation, compile-time AI, and local-first cognitive tools — and why reducing the cost of understanding human knowledge is one of the highest-leverage problems we can solve.',
  alternates: {
    canonical: '/mission',
  },
  openGraph: {
    title: 'The Mission — Reducing the Cost of Understanding Human Knowledge',
    description: 'Why this research exists: making human knowledge cheaper to understand, preserve, and share.',
    type: 'article',
  },
};

const sections = [
  {
    id: 'the-question',
    kicker: 'The Question',
    heading: 'What is this work for?',
    body: [
      'Over the past several years I have spent much of my time with artificial intelligence — knowledge representation, retrieval systems, semantic search, and what I now call Compile-Time AI. As these ideas matured, a larger question began to overtake the technical one.',
      'What is the purpose of this work?',
      'The question has grown more urgent as AI has rapidly expanded into military applications. Like every foundational technology in history, AI can be used to improve lives or to increase humanity’s capacity for conflict. Watching that unfold has forced me to reconsider why I keep building these systems at all.',
      'The answer I have reached is surprisingly simple. I want to reduce the cost of understanding human knowledge. I believe it is one of the highest-leverage problems we can solve.',
    ],
  },
  {
    id: 'the-bottleneck',
    kicker: 'The Bottleneck',
    heading: 'Knowledge is the constraint',
    body: [
      'Every profession depends on knowledge someone else already discovered. A nurse learns from generations of medical practice. An engineer builds on centuries of mathematics and physics. A software developer stands on decades of accumulated experience. Scientists spend years learning what is already known before they can finally add something new.',
      'Civilization, in many ways, is a system for transferring accumulated knowledge from one generation to the next. The efficiency of that transfer determines how quickly society can progress.',
      'Today, acquiring professional knowledge remains expensive. It demands years of education, experienced instructors, textbooks, mentorship, certification, and continual practice — because many professions require genuine competence before someone can safely perform the work.',
      'The result is that knowledge becomes a bottleneck. When knowledge is expensive to acquire, qualified professionals become scarce. Scarcity raises the cost of hiring. Higher costs limit how many people organizations can employ. And so each individual must care for more patients, teach more students, manage more systems, or serve more customers. Time becomes the scarce resource.',
    ],
  },
  {
    id: 'the-cost',
    kicker: 'A Concrete Case',
    heading: 'Consider nursing',
    body: [
      'Many countries face chronic nursing shortages — not because the work lacks value, but because educating and training qualified nurses requires substantial time, resources, and infrastructure. Hospitals cannot simply hire more nurses if qualified candidates do not exist.',
      'Now imagine reducing the cost of acquiring that knowledge. Not by lowering standards. Not by replacing expertise. But by making the accumulated knowledge of the profession dramatically easier to understand, navigate, and retain.',
      'If educational materials became more interactive, personalized, and semantically organized, educators could spend less time helping students locate information and more time teaching judgment, practical skills, and patient care. Students could move through the theoretical foundations of their profession more efficiently, while still completing the rigorous clinical training that safe practice demands.',
      'Over time, lowering the cost of learning could increase the capacity of educational institutions. More graduates would enter professions experiencing shortages. Greater supply could reduce hiring costs while allowing organizations to employ more professionals.',
      'The most important outcome is not lower wages or lower costs. It is more time. Imagine hospitals where doctors are no longer responsible for impossible patient loads. Imagine nurses with enough colleagues that twelve-hour shifts become the exception. Imagine teachers with class sizes small enough to give every student individual attention. The ultimate purpose is not efficiency for its own sake — it is creating more opportunities for people to care for other people.',
    ],
  },
  {
    id: 'beyond-medicine',
    kicker: 'Beyond Medicine',
    heading: 'The same logic, everywhere',
    body: [
      'This idea extends far beyond medicine. As robotics and automation reduce the amount of repetitive physical labor performed by humans, society will increasingly depend on occupations requiring judgment, communication, creativity, technical expertise, and specialized knowledge. The primary obstacle preventing workers from moving into these new careers will not necessarily be intelligence or motivation.',
      'It will be the cost of learning.',
      'If we can dramatically reduce the effort required to understand existing human knowledge, then more people can participate in professions currently constrained by shortages of qualified workers.',
      'This is why I have become interested in technologies that organize knowledge rather than merely generate text. Large language models are remarkable, but much of today’s AI focuses on producing answers in response to questions. My own work has increasingly moved toward a different problem: organizing human knowledge before the question is ever asked.',
    ],
  },
  {
    id: 'the-mechanisms',
    kicker: 'The Mechanisms',
    heading: 'Compile-time, not query-time',
    body: [
      'Compile-Time AI, the Sovereign Knowledge Compiler, and related projects are all motivated by this philosophy. Rather than repeatedly asking a model to rediscover relationships hidden within thousands of documents, these systems perform much of that reasoning once, compile the results into structured semantic representations, and make that knowledge easier for people to explore.',
      'The objective is not merely faster search. The objective is reducing the cognitive cost of understanding.',
      'Every hour researchers spend searching for information is an hour not spent making discoveries. Every hour students spend organizing disconnected material is an hour not spent mastering concepts. Every hour professionals spend searching through documentation is an hour not spent helping another person. Reducing those costs compounds across millions of people.',
    ],
  },
  {
    id: 'the-choice',
    kicker: 'The Choice',
    heading: 'Cooperation or conflict',
    body: [
      'This has become the reason I continue pursuing artificial intelligence. Like every powerful technology, AI can be directed toward conflict or toward cooperation. History suggests that technological advantages are often centralized, and that nations naturally seek to use those advantages to increase their own power. That reality is difficult to ignore.',
      'But knowledge possesses a unique property. Unlike physical resources, knowledge can be shared without being consumed. When one person learns something, everyone else can still learn it as well.',
      'If advances in artificial intelligence can make human knowledge easier to understand, easier to preserve, and easier to distribute, then every scientific discovery, engineering breakthrough, educational resource, and medical advancement becomes more accessible to everyone.',
      'That is one reason I publish my research openly. It is why I contribute to open-source software. It is why I believe local-first, transparent, inspectable knowledge systems are important.',
    ],
  },
  {
    id: 'the-hope',
    kicker: 'The Hope',
    heading: 'A future worth building',
    body: [
      'My hope is not to build machines that replace human intelligence. My hope is to build tools that make humanity’s collective knowledge easier for every person to understand.',
      'If we can reduce the cost of understanding human knowledge, we do not simply create better software. We create a world where more people can learn, more people can teach, more people can discover, and more people can devote their time to caring for one another.',
      'That, to me, is a future worth building.',
    ],
  },
];

export default function MissionPage() {
  return (
    <article className="pb-10">
      <div className="px-4 pt-8">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Mission', url: '/mission' },
          ]}
        />
      </div>

      {/* Opening */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="mono text-green text-xs mb-4 block">Research Manifesto</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-[0.95]">
            Reducing the Cost of <span className="accent-green">Understanding Human Knowledge</span>
          </h1>
          <p className="text-lg text-ink-3 leading-relaxed max-w-2xl mx-auto">
            A note on why this research exists — and why making knowledge cheaper to understand may
            be one of the highest-leverage problems of our time.
          </p>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, i) => (
        <section key={section.id} className="py-12 px-4 reveal" id={section.id}>
          <div className="max-w-3xl mx-auto">
            <span className="mono text-pink text-xs mb-2 block">{section.kicker}</span>
            <h2 className="font-display text-2xl md:text-3xl mb-6 text-ink">{section.heading}</h2>
            <div className="space-y-5 text-ink-3 leading-relaxed text-lg font-bold">
              {section.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Vision */}
      <ResearchVision />

      {/* Closing CTA */}
      <section className="py-16 sm:py-24 px-5 relative overflow-hidden reveal">
        <div className="absolute inset-0 glaze-all pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <span className="mono text-green text-xs mb-3 block">Where To Begin</span>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">Explore the Research</h2>
          <p className="text-ink-3 mb-8 sm:mb-10 text-base sm:text-lg">
            The mission is one thread. The work is many projects — each a different approach toward
            the same goal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button href="/research" variant="primary" size="lg">Explore Research</Button>
            <Button href="/projects" variant="secondary" size="lg">View Projects</Button>
          </div>
        </div>
      </section>
    </article>
  );
}
