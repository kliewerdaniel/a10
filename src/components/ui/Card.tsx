import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  href?: string;
}

export function Card({ children, className = '', hover = true, href }: CardProps) {
  const base = `card-pointillist p-6 ${className}`;

  if (href) {
    return <Link href={href} className={`${base} block`}>{children}</Link>;
  }
  return <div className={base}>{children}</div>;
}

export function Badge({ children, color = 'green', className = '' }: { children: React.ReactNode; color?: 'green' | 'pink' | 'orange' | 'yellow' | 'ink'; className?: string }) {
  const colors = {
    green: 'bg-green/10 text-green border-2 border-ink',
    pink: 'bg-pink/10 text-pink border-2 border-ink',
    orange: 'bg-orange/10 text-orange border-2 border-ink',
    yellow: 'bg-yellow/10 text-ink border-2 border-ink',
    ink: 'bg-ink text-cream border-2 border-ink',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 font-bold text-xs ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
