import type { ArtifactStatus } from '@/lib/artifacts';

const STATUS_META: Record<ArtifactStatus, { label: string; color: string }> = {
  observed: { label: 'Observed', color: 'text-[var(--color-ink-3)]' },
  designed: { label: 'Designed', color: 'text-[var(--color-blue)]' },
  proposed: { label: 'Proposed', color: 'text-[var(--color-orange)]' },
  experiment: { label: 'Experiment', color: 'text-[var(--color-purple)]' },
};

export function StatusPill({ status, className = '' }: { status: string; className?: string }) {
  const meta = STATUS_META[(status as ArtifactStatus) in STATUS_META ? (status as ArtifactStatus) : 'observed'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] uppercase px-2 py-0.5 border border-[var(--color-rule)] ${meta.color} ${className}`}
      title={`Epistemic status: ${meta.label}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
