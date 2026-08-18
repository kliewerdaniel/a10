import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';

export const metadata = { title: 'Redirecting…', robots: { index: false, follow: true } };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ layer: p.layer, slug: p.slug }));
}

interface ProjectRedirectProps {
  params: { layer: string; slug: string };
}

/** /projects/<layer>/<slug> → /fleet/<layer>/<slug> */
export default function ProjectRedirect({ params }: ProjectRedirectProps) {
  const target = `/fleet/${params.layer}/${params.slug}`;
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
