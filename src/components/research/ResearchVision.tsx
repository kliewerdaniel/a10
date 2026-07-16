interface VisionStep {
  label: string;
  desc: string;
  color: 'green' | 'pink' | 'orange' | 'yellow' | 'ink';
}

const visionSteps: VisionStep[] = [
  { label: 'Human Knowledge', desc: 'The accumulated understanding of every profession, discipline, and generation.', color: 'ink' },
  { label: 'Knowledge Compilation', desc: 'Organizing and structuring knowledge before the question is asked.', color: 'green' },
  { label: 'Semantic Understanding', desc: 'Relationships made explicit, navigable, and inspectable — not buried in text.', color: 'orange' },
  { label: 'Lower Cost of Learning', desc: 'Acquiring professional knowledge becomes faster, clearer, and more durable.', color: 'yellow' },
  { label: 'More Qualified Professionals', desc: 'Education scales without lowering standards or replacing expertise.', color: 'green' },
  { label: 'More Scientific Discovery', desc: 'Researchers spend less time searching and more time discovering.', color: 'orange' },
  { label: 'Better Care', desc: 'More people with the time and capacity to care for one another.', color: 'pink' },
  { label: 'Human Flourishing', desc: 'A world where more people can learn, teach, and discover.', color: 'pink' },
];

const dotColors: Record<VisionStep['color'], string> = {
  green: 'bg-green',
  pink: 'bg-pink',
  orange: 'bg-orange',
  yellow: 'bg-yellow',
  ink: 'bg-ink',
};

export function ResearchVision({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-16 sm:py-24 px-5 relative reveal" id="research-vision">
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        {heading && (
          <div className="text-center mb-12">
            <span className="mono text-green text-xs mb-3 block">Research Vision</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">From Knowledge to Care</h2>
            <p className="text-ink-3 max-w-2xl mx-auto text-base sm:text-lg">
              Every project on this site is a step along one path. The destination is not a better
              model — it is a world where understanding human knowledge costs less.
            </p>
          </div>
        )}

        <div className="flex flex-col items-center gap-0">
          {visionSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center text-center px-6 py-4 border-4 border-ink bg-cream dark:bg-base shadow-brutalist-sm w-full max-w-lg">
                <span className={`w-3 h-3 rounded-full ${dotColors[step.color]} flex-shrink-0 mb-2`} />
                <h3 className="font-display text-ink text-base sm:text-lg">{step.label}</h3>
                <p className="text-xs text-ink-3 font-bold mt-1 leading-relaxed">{step.desc}</p>
              </div>
              {i < visionSteps.length - 1 && (
                <div className="w-0.5 h-6 bg-ink/20" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
