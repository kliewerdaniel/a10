import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Redirecting…',
  robots: { index: false, follow: true },
};

/**
 * /blog is consolidated into /research (the unified writing hub).
 * Static-export-safe redirect via meta refresh + client nav fallback.
 */
export default function BlogRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <meta httpEquiv="refresh" content="0; url=/research" />
      <div className="text-center">
        <p className="text-ink-3 mb-4">The journal now lives under the research log.</p>
        <Link href="/research" className="font-bold accent-green hover:text-green-dark transition-colors">
          Continue to Research →
        </Link>
      </div>
    </div>
  );
}
