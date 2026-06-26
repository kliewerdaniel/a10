import Link from 'next/link';

interface WikiLinkProps {
  slug: string;
  children: React.ReactNode;
}

export function WikiLink({ slug, children }: WikiLinkProps) {
  return (
    <Link
      href={`/wiki/${slug}`}
      className="inline-flex items-center gap-1 accent-green font-bold underline underline-offset-2 decoration-green/30 hover:decoration-green/60 transition-colors"
    >
      {children}
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </Link>
  );
}
