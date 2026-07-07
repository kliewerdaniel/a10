interface StatusBadgeProps {
  status: 'production' | 'active' | 'experimental' | 'archived';
}

const statusConfig: Record<string, { label: string; dotClass: string; borderClass: string; bgClass: string }> = {
  'production': {
    label: 'Production',
    dotClass: 'bg-green',
    borderClass: 'border-l-green',
    bgClass: 'bg-green/10',
  },
  'active': {
    label: 'Active',
    dotClass: 'bg-pink',
    borderClass: 'border-l-pink',
    bgClass: 'bg-pink/10',
  },
  'experimental': {
    label: 'Experimental',
    dotClass: 'bg-orange',
    borderClass: 'border-l-orange',
    bgClass: 'bg-orange/10',
  },
  'archived': {
    label: 'Archived',
    dotClass: 'bg-ink-3',
    borderClass: 'border-l-ink-3',
    bgClass: 'bg-ink-3/10',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold border-2 border-ink/15 border-l-4 ${config.borderClass} ${config.bgClass} text-ink`}>
      <div className={`w-2 h-2 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
}
