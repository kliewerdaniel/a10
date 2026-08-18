import Link from 'next/link';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

const fleetLinks: { href: string; label: string; external?: boolean }[] = [
  { href: '/mission', label: 'The Mission' },
  { href: '/fleet', label: 'The Fleet' },
  { href: '/research', label: 'Research Log' },
  { href: '/paper', label: 'Whitepaper' },
  { href: '/book', label: 'The Book' },
];

const aboutLinks: { href: string; label: string; external?: boolean }[] = [
  { href: '/about', label: 'About Daniel' },
  { href: '/press', label: 'Press & Media' },
  { href: 'https://github.com/kliewerdaniel', label: 'GitHub', external: true },
];

const legalLinks: { href: string; label: string; external?: boolean }[] = [
  { href: 'https://www.iubenda.com/privacy-policy/43314476', label: 'Privacy Policy', external: true },
  { href: 'https://www.iubenda.com/privacy-policy/43314476/cookie-policy', label: 'Cookie Policy', external: true },
  { href: 'https://www.iubenda.com/terms-and-conditions/43314476', label: 'Terms', external: true },
];

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-serif text-[0.9rem] text-[var(--color-ink-3)] hover:text-[var(--color-green)] transition-colors">
        {label} ↗
      </a>
    );
  }
  return (
    <Link href={href} className="font-serif text-[0.9rem] text-[var(--color-ink-3)] hover:text-[var(--color-green)] transition-colors">
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)] bg-[var(--color-base)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-xl font-medium tracking-tight text-[var(--color-ink)]">
              Daniel Kliewer
            </Link>
            <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[var(--color-green)] mt-1">
              Sovereign Agent Fleet
            </p>
            <p className="font-serif text-[0.92rem] leading-relaxed text-[var(--color-ink-3)] mt-5">
              One frozen governance substrate, exercised across many domains. Intelligence is the
              accumulated decisions that shaped it.
            </p>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-serif text-sm text-[var(--color-ink)] border-b border-[var(--color-green)] pb-0.5 mt-5 hover:text-[var(--color-green)] transition-colors"
            >
              The Book on Amazon →
            </a>
          </div>

          <div>
            <h3 className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-[var(--color-ink-3)] mb-5">Fleet</h3>
            <ul className="space-y-3">
              {fleetLinks.map((l) => (
                <li key={l.href}><FooterLink href={l.href} label={l.label} external={l.external} /></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-[var(--color-ink-3)] mb-5">About</h3>
            <ul className="space-y-3">
              {aboutLinks.map((l) => (
                <li key={l.href}><FooterLink href={l.href} label={l.label} external={l.external} /></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-[var(--color-ink-3)] mb-5">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}><FooterLink href={l.href} label={l.label} external={l.external} /></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-rule)] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-serif text-sm text-[var(--color-ink-3)]">© {new Date().getFullYear()} Daniel Kliewer.</p>
          <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[var(--color-ink-3)]">1 substrate · 6 domains · 0 model-dependent invariants</p>
        </div>
      </div>
    </footer>
  );
}
