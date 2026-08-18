import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Bento grid (ADR-UI §3). 6-column on desktop, collapses to 1 col on mobile.
 * Cells opt into spans via className (e.g. "lg:col-span-4").
 */
export function BentoGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 ${className}`}>
      {children}
    </div>
  );
}

interface BentoCellProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  href?: string;
}

/**
 * A single bento cell: brutalist bordered box (card-creative style) with optional
 * glass modifier and optional link wrapper.
 */
export function BentoCell({ children, className = '', glass = false, href }: BentoCellProps) {
  const surface = glass ? 'glass' : 'bg-cream dark:bg-base';
  const box = `border-4 border-ink ${surface} p-5 sm:p-6 shadow-brutalist relative overflow-hidden`;
  const interactive = 'transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutalist-lg';

  if (href) {
    return (
      <Link href={href} className={`group block ${box} ${interactive} ${className}`}>
        {children}
      </Link>
    );
  }
  return <div className={`${box} ${className}`}>{children}</div>;
}
