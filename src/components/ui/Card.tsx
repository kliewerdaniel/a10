import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  href?: string;
}

export function Card({ children, className = '', hover = true, href }: CardProps) {
  const base = `${hover ? 'card-ed' : 'card-ed'} p-7 ${className}`;

  if (href) {
    return <Link href={href} className={`${base} block`}>{children}</Link>;
  }
  return <div className={base}>{children}</div>;
}

export function Badge({ children, color = 'green', className = '' }: { children: React.ReactNode; color?: 'green' | 'pink' | 'orange' | 'yellow' | 'ink'; className?: string }) {
  const colors: Record<string, string> = {
    green: 'text-[var(--color-green)] border-[var(--color-green)]',
    pink: 'text-[var(--color-pink)] border-[var(--color-pink)]',
    orange: 'text-[var(--color-orange)] border-[var(--color-orange)]',
    yellow: 'text-[var(--color-yellow)] border-[var(--color-yellow)]',
    ink: 'text-[var(--color-ink)] border-[var(--color-ink)]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 font-mono text-[0.6rem] tracking-[0.14em] uppercase border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
