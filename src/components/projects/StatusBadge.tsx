interface StatusBadgeProps {
  status: 'production' | 'active' | 'experimental' | 'archived';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<string, string> = {
    'production': 'bg-green text-green-dark',
    'active': 'bg-pink text-pink-dark',
    'experimental': 'bg-orange text-orange-dark',
    'archived': 'bg-surface text-ink-3',
  };

  const textColorMap: Record<string, string> = {
    'production': 'text-green-dark',
    'active': 'text-pink-dark',
    'experimental': 'text-orange-dark',
    'archived': 'text-ink-3',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold border-2 border-ink ${colorMap[status]} ${textColorMap[status]}`}>
      <div className="w-2 h-2 rounded-full bg-current" />
      {status}
    </span>
  );
}
