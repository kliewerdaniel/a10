import Link from 'next/link';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'green' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
}

export function Button({ variant = 'primary', size = 'md', href, external, className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer border-4 border-ink';

  const variants = {
    primary: 'bg-green text-cream hover:bg-green-dark active:scale-[0.98]',
    secondary: 'bg-cream text-ink hover:bg-surface active:scale-[0.98]',
    green: 'bg-green text-cream hover:bg-green-dark active:scale-[0.98]',
    ghost: 'border-4 border-transparent text-ink-3 hover:text-ink hover:bg-ink/5',
  };

  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button className={classes} {...props}>{children}</button>;
}

export function BookButton({ className = '', size = 'lg' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 font-bold transition-all duration-200 active:scale-[0.98] bg-green text-cream border-4 border-ink hover:bg-green-dark ${
        size === 'sm' ? 'px-4 py-2 text-sm' : size === 'md' ? 'px-5 py-2.5 text-sm' : 'px-8 py-4 text-base'
      } ${className}`}
      style={{ boxShadow: '4px 4px 0 #0F0F0F' }}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
      Get the Book — $88
    </a>
  );
}
