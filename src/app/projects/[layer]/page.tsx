import Link from 'next/link';
import { getLayers } from '@/lib/projects';

export const metadata = { title: 'Redirecting…', robots: { index: false, follow: true } };

export function generateStaticParams() {
  return getLayers().map((l) => ({ layer: l.slug }));
}

interface LayerRedirectProps {
  params: { layer: string };
}

/** /projects/<layer> → /fleet/<layer> */
export default function LayerRedirect({ params }: LayerRedirectProps) {
  const target = `/fleet/${params.layer}`;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <div className="text-center">
        <p className="text-ink-3 mb-4">Moved to the Fleet map.</p>
        <Link href={target} className="font-bold accent-green hover:text-green-dark transition-colors">
          Continue →
        </Link>
      </div>
    </div>
  );
}
