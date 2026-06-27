import Link from 'next/link';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

export function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-surface relative">
      <div className="absolute inset-0 pointillism-layer opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 border-4 border-ink bg-cream flex items-center justify-center">
                <div className="grid grid-cols-3 gap-[2px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-green" />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink" />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green" />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink" />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink" />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base leading-tight text-ink">
                  SOVEREIGN <span className="accent-green">AI</span>
                </span>
                <span className="mono text-[9px] text-ink-3 leading-none">Your Rules. Your AI.</span>
              </div>
            </Link>
            <p className="text-sm text-ink-3 mb-5 leading-relaxed">
              The complete guide to building AI systems you actually own.
            </p>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold accent-green hover:text-green-dark transition-colors"
            >
              Get the Book on Amazon →
            </a>
          </div>

          <div>
            <h3 className="font-display text-ink mb-5 text-xs">Navigate</h3>
            <ul className="space-y-3">
              {[{ href: '/', label: 'Home' }, { href: '/book', label: 'The Book' }, { href: '/blog', label: 'Blog' }].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-3 hover:text-ink transition-colors font-bold">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-ink mb-5 text-xs">Resources</h3>
            <ul className="space-y-3">
              {[{ href: '/projects', label: 'GitHub Projects' }, { href: '/about', label: 'About Daniel' }].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-3 hover:text-ink transition-colors font-bold">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-ink mb-5 text-xs">Connect</h3>
            <div className="flex gap-3">
              <a href="https://github.com/kliewerdaniel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-4 border-ink bg-cream flex items-center justify-center text-ink hover:bg-pink hover:text-cream transition-all" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://x.com/kliewer_daniel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-4 border-ink bg-cream flex items-center justify-center text-ink hover:bg-orange hover:text-cream transition-all" aria-label="X">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/daniel-kliewer-42691944/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-4 border-ink bg-cream flex items-center justify-center text-ink hover:bg-green hover:text-cream transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t-4 border-ink flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ink-3 font-bold">© {new Date().getFullYear()} Daniel Kliewer.</p>
          <div className="flex gap-6 text-sm text-ink-3 font-bold">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
