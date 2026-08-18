import Link from 'next/link';
import Image from 'next/image';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

export function BookCover({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'sm' ? 'w-32 h-44' : size === 'md' ? 'w-44 h-60' : 'w-56 h-[340px]';

  return (
    <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="block group">
      <div
        className={`${dims} border border-[var(--color-rule)] bg-white overflow-hidden relative transition-transform duration-300 group-hover:scale-[1.03]`}
      >
        <picture>
          <source srcSet="/images/formats/SovereignAI.avif" type="image/avif" />
          <source srcSet="/images/formats/SovereignAI.webp" type="image/webp" />
          <Image
            src="/SovereignAI_300dpi.png"
            alt="Sovereign AI: An Architectural Investigation into Local-First Intelligence by Daniel Kliewer"
            fill
            className="object-cover"
            sizes="224px"
            priority
          />
        </picture>
      </div>
    </a>
  );
}

export function BookCoverLink() {
  return (
    <Link href="/book" className="block group">
      <div className="relative">
        <BookCover />
        <div className="absolute -top-2 -right-2 font-mono text-[0.6rem] tracking-[0.14em] uppercase bg-[var(--color-paper-2)] border border-[var(--color-rule)] px-2 py-0.5">$88</div>
      </div>
    </Link>
  );
}
