/**
 * FleetTrustBar — the constitutive Fleet invariants.
 * One frozen governance substrate, exercised across many domains, with ZERO
 * security invariants depending on model behavior.
 */

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: '1', label: 'Frozen governance substrate — fleet.epistemic.decide()' },
  { value: '6', label: 'Domains proven on the same substrate, zero substrate edits' },
  { value: '0', label: 'Security invariants depending on model behavior' },
  { value: '177', label: 'Research posts compiled into provenanced artifacts' },
];

export function FleetTrustBar({ className = '' }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)] ${className}`}>
      {STATS.map((s) => (
        <div key={s.label} className="bg-[var(--color-base)] p-6 sm:p-8">
          <div className="font-serif font-medium text-5xl sm:text-6xl text-[var(--color-ink)] leading-none">{s.value}</div>
          <dd className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)] mt-4 leading-relaxed">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
