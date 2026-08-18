import Link from 'next/link';

export const metadata = { title: 'Redirecting…', robots: { index: false, follow: true } };

/** Consolidated into /fleet (the Sovereign Agent Fleet system map). */
export default function ProjectsRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <meta httpEquiv="refresh" content="0; url=/fleet" />
      <div className="text-center">
        <p className="text-ink-3 mb-4">The Fleet map now lives under <span className="accent-green font-bold">/fleet</span>.</p>
        <Link href="/fleet" className="font-bold accent-green hover:text-green-dark transition-colors">
          Continue to The Fleet →
        </Link>
      </div>
    </div>
  );
}
