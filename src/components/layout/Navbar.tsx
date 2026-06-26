'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/book', label: 'Book' },
  { href: '/blog', label: 'Blog' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/projects', label: 'Projects' },
];

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
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
              <span className="font-display text-base leading-tight tracking-tight text-ink">
                SOVEREIGN <span className="accent-green">AI</span>
              </span>
              <span className="mono text-[9px] text-ink-3 leading-none">Your Rules. Your AI.</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-ink-3 hover:text-ink transition-colors hover:bg-ink/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l-4 border-ink">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-green text-cream font-bold text-sm border-4 border-ink hover:bg-green-dark transition-all"
                style={{ boxShadow: '4px 4px 0 #0F0F0F' }}
              >
                Get the Book
              </a>
            </div>
          </div>

          <button
            className="md:hidden text-ink p-2 border-4 border-ink bg-cream"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t-4 border-ink">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ink-3 hover:text-ink transition-colors px-4 py-3 hover:bg-ink/5 font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 px-4">
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-2.5 bg-green text-cream font-bold text-sm border-4 border-ink hover:bg-green-dark transition-colors"
                  style={{ boxShadow: '4px 4px 0 #0F0F0F' }}
                >
                  Get the Book
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
