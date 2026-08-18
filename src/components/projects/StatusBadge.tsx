interface StatusBadgeProps {
  status: 'production' | 'active' | 'experimental' | 'archived';
}

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
  production: { label: 'Production', dot: 'bg-[var(--color-green)]', text: 'text-[var(--color-green)]' },
  active: { label: 'Active', dot: 'bg-[var(--color-pink)]', text: 'text-[var(--color-pink)]' },
  experimental: { label: 'Experimental', dot: 'bg-[var(--color-orange)]', text: 'text-[var(--color-orange)]' },
  archived: { label: 'Archived', dot: 'bg-[var(--color-ink-3)]', text: 'text-[var(--color-ink-3)]' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.archived;
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.14em] uppercase border border-[var(--color-rule)] bg-[var(--color-paper-2)] ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
