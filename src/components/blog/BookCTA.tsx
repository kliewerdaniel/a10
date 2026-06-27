import Link from 'next/link';
import Image from 'next/image';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

export function BookCTA({ variant = 'banner' }: { variant?: 'banner' | 'inline' }) {
  if (variant === 'inline') {
    return (
      <div className="my-8 p-5 border-4 border-ink bg-cream relative overflow-hidden shadow-brutalist">
        <div className="absolute inset-0 dot-green opacity-30 pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <div className="flex-shrink-0 w-14 h-20 border-4 border-ink bg-white overflow-hidden relative">
            <Image
              src="/SovereignAI_300dpi.png"
              alt="Sovereign AI book cover"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="mono text-xs accent-green font-bold mb-1">From the Book</p>
            <p className="text-ink font-bold text-sm">
              This is from <strong>Sovereign AI: Building Local-First Intelligent Systems</strong>.
            </p>
          </div>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-green text-cream font-bold border-4 border-ink hover:bg-green-dark transition-all text-sm shadow-brutalist-sm"
          >
            Get the Book — $88
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 sm:my-12 p-5 sm:p-8 md:p-10 border-4 border-ink bg-cream relative overflow-hidden shadow-brutalist-xl">
      <div className="absolute inset-0 pointillism-layer opacity-60 pointer-events-none" />
      <div className="absolute inset-0 glaze-all pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative z-10">
        <div className="flex-shrink-0 w-44 h-60 border-4 border-ink bg-white overflow-hidden relative">
          <Image
            src="/SovereignAI_300dpi.png"
            alt="Sovereign AI book cover"
            fill
            className="object-cover"
            sizes="176px"
          />
        </div>

        <div className="text-center md:text-left flex-1">
          <h3 className="text-2xl md:text-3xl font-display text-ink mb-3 leading-tight">
            Sovereign AI: Building Local-First Intelligent Systems
          </h3>
          <p className="text-ink-3 mb-1 font-bold">by Daniel Kliewer · Paperback · 72 pages</p>
          <p className="text-ink-3 mb-6 leading-relaxed">
            The hands-on guide to building AI that runs on your hardware, keeps your data private, and eliminates cloud dependence. Working code included.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-green text-cream font-display border-4 border-ink hover:bg-green-dark transition-all text-base shadow-brutalist"
            >
              Buy on Amazon — $88
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-cream text-ink font-bold border-4 border-ink hover:bg-surface transition-all shadow-brutalist"
            >
              See Inside
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
