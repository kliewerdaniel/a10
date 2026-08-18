import Link from 'next/link';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', href, external, className = '', children }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-serif transition-colors duration-200 cursor-pointer border';

  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--color-green)] text-[var(--color-paper)] border-[var(--color-green)] hover:bg-[var(--color-green-dark)] hover:border-[var(--color-green-dark)]',
    secondary: 'bg-transparent text-[var(--color-ink)] border-[var(--color-rule)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]',
    ghost: 'bg-transparent text-[var(--color-ink-3)] border-transparent hover:text-[var(--color-green)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-[0.95rem]',
    lg: 'px-7 py-3.5 text-base',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button className={classes}>{children}</button>;
}

export function BookButton({ className = '', size = 'lg' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const pad = size === 'sm' ? 'px-4 py-2 text-sm' : size === 'md' ? 'px-5 py-2.5 text-[0.95rem]' : 'px-8 py-4 text-base';
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 font-serif bg-[var(--color-green)] text-[var(--color-paper)] border border-[var(--color-green)] hover:bg-[var(--color-green-dark)] transition-colors ${pad} ${className}`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
      Get the Book
    </a>
  );
}
