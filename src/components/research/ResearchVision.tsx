interface VisionStep {
  label: string;
  desc: string;
}

const visionSteps: VisionStep[] = [
  { label: 'Human Knowledge', desc: 'The accumulated understanding of every profession, discipline, and generation.' },
  { label: 'Knowledge Compilation', desc: 'Organizing and structuring knowledge before the question is asked.' },
  { label: 'Semantic Understanding', desc: 'Relationships made explicit, navigable, and inspectable — not buried in text.' },
  { label: 'Lower Cost of Learning', desc: 'Acquiring professional knowledge becomes faster, clearer, and more durable.' },
  { label: 'More Qualified Professionals', desc: 'Education scales without lowering standards or replacing expertise.' },
  { label: 'More Scientific Discovery', desc: 'Researchers spend less time searching and more time discovering.' },
  { label: 'Better Care', desc: 'More people with the time and capacity to care for one another.' },
  { label: 'Human Flourishing', desc: 'A world where more people can learn, teach, and discover.' },
];

export function ResearchVision({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section-rule section-pad" id="research-vision">
      <div className="max-w-5xl mx-auto">
        {heading && (
          <div className="text-center mb-12">
            <span className="kicker mb-3 block">Research Vision</span>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-[var(--color-ink)]">From Knowledge to Care</h2>
            <p className="text-[var(--color-ink-3)] max-w-2xl mx-auto text-base sm:text-lg mt-4">
              Every project on this site is a step along one path. The destination is not a better
              model — it is a world where understanding human knowledge costs less.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
          {visionSteps.map((step, i) => (
            <div key={step.label} className="bg-[var(--color-base)] p-6">
              <div className="font-mono text-[0.6rem] tracking-[0.14em] text-[var(--color-green)] mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-[var(--color-ink)] text-lg font-medium mb-2">{step.label}</h3>
              <p className="text-xs text-[var(--color-ink-3)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
