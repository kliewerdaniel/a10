import Link from 'next/link';
import Image from 'next/image';

const BOOK_URL = 'https://www.amazon.com/dp/B0H6RB7D9J';

export function BookCover({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'sm' ? 'w-32 h-44' : size === 'md' ? 'w-44 h-60' : 'w-56 h-[340px]';

  return (
    <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="block group">
      <div
        className={`${dims} border-4 border-ink bg-white overflow-hidden relative transition-transform duration-300 group-hover:scale-105 shadow-brutalist-xl`}
      >
        <Image
          src="/SovereignAI_300dpi.png"
          alt="Sovereign AI: Building Local-First Intelligent Systems by Daniel Kliewer"
          fill
          className="object-cover"
          sizes="224px"
          priority
        />
      </div>
    </a>
  );
}

export function BookCoverLink() {
  return (
    <Link href="/book" className="block group">
      <div className="relative">
        <BookCover />
        <div className="absolute -top-2 -right-2 mono text-[9px] bg-cream border-2 border-ink px-2 py-0.5 font-bold z-10">
          $88
        </div>
      </div>
    </Link>
  );
}
