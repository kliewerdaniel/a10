import Link from 'next/link';
import Image from 'next/image';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

export function BookCTA({ variant = 'banner' }: { variant?: 'banner' | 'inline' }) {
  if (variant === 'inline') {
    return (
      <div className="my-8 flex flex-col sm:flex-row items-center gap-4 card-ed p-5">
        <div className="flex-shrink-0 w-14 h-20 border border-[var(--color-rule)] bg-white overflow-hidden relative">
          <picture>
            <source srcSet="/images/formats/SovereignAI.avif" type="image/avif" />
            <source srcSet="/images/formats/SovereignAI.webp" type="image/webp" />
            <Image
              src="/SovereignAI_300dpi.png"
              alt="Sovereign AI book cover"
              fill
              className="object-cover"
              sizes="56px"
            />
          </picture>
        </div>
        <div className="text-center sm:text-left flex-1">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--color-green)] mb-1">From the Book</p>
          <p className="font-serif text-[var(--color-ink)] text-sm">
            This is from <strong>Sovereign AI: An Architectural Investigation into Local-First Intelligence</strong>.
          </p>
        </div>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green)] text-[var(--color-paper)] font-medium hover:opacity-80 transition-opacity text-sm"
        >
          Get the Book — $88
        </a>
      </div>
    );
  }

  return (
    <div className="my-8 sm:my-12 p-5 sm:p-8 md:p-10 card-ed">
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        <div className="flex-shrink-0 w-44 h-60 border border-[var(--color-rule)] bg-white overflow-hidden relative">
          <picture>
            <source srcSet="/images/formats/SovereignAI.avif" type="image/avif" />
            <source srcSet="/images/formats/SovereignAI.webp" type="image/webp" />
            <Image
              src="/SovereignAI_300dpi.png"
              alt="Sovereign AI: An Architectural Investigation into Local-First Intelligence by Daniel Kliewer"
              fill
              className="object-cover"
              sizes="176px"
            />
          </picture>
        </div>

        <div className="text-center md:text-left flex-1">
          <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-ink)] mb-3 leading-tight">
            Sovereign AI: An Architectural Investigation into Local-First Intelligence
          </h3>
          <p className="text-[var(--color-ink-3)] mb-1 font-medium">by Daniel Kliewer · Paperback · 72 pages</p>
          <p className="text-[var(--color-ink-3)] mb-6 leading-relaxed">
            An examination of the architecture of intelligence that you own — from first principles through production deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[var(--color-green)] text-[var(--color-paper)] font-medium hover:opacity-80 transition-opacity text-base"
            >
              Buy on Amazon — $88
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-paper-2)] text-[var(--color-ink)] font-medium border border-[var(--color-rule)] hover:border-[var(--color-ink)] transition-colors"
            >
              See Inside
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
