'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '/mission', label: 'Mission' },
  { href: '/fleet', label: 'The Fleet' },
  { href: '/research', label: 'Research' },
  { href: '/paper', label: 'Whitepaper' },
  { href: '/about', label: 'About' },
];

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('theme') === 'dark';
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(getInitialDark);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (dark) document.documentElement.classList.add('dark');
    }
  }, [dark]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-glass-bg)] backdrop-blur-md border-b border-[var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-lg font-medium tracking-tight text-[var(--color-ink)] hover:text-[var(--color-green)] transition-colors">
            Daniel Kliewer
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-[0.95rem] text-[var(--color-ink-2)] hover:text-[var(--color-green)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="w-8 h-8 flex items-center justify-center text-[var(--color-ink-3)] hover:text-[var(--color-green)] transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            <Link
              href="/book"
              className="hidden sm:inline-flex font-serif text-sm text-[var(--color-ink)] border-b border-[var(--color-green)] pb-0.5 hover:text-[var(--color-green)] transition-colors"
            >
              The Book
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--color-ink-3)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-glass-bg)] backdrop-blur-md border-b border-[var(--color-rule)]">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-serif text-base text-[var(--color-ink-2)] hover:text-[var(--color-green)] py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="block font-serif text-base text-[var(--color-green)] py-2"
            >
              The Book
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
