import { getLayerBySlug, getProjectsByLayer, getProjectCountByLayer } from '@/lib/projects';
import { StatusBadge } from '@/components/projects/StatusBadge';
import { TechTag } from '@/components/projects/TechTag';
import Link from 'next/link';

interface LayerPageProps {
  params: { layer: string };
}

export async function generateStaticParams() {
  const architectureData = await import('@/data/architecture.json');
  const layers = architectureData.default.layers;
  
  return layers.map((layer: any) => ({
    layer: layer.slug,
  }));
}
export async function generateMetadata({ params }: LayerPageProps) {
  const resolvedParams = await params;
  const layer = getLayerBySlug(resolvedParams.layer);
  if (!layer) {
    return {
      title: 'Layer Not Found',
      description: 'The requested layer does not exist.',
    };
  }

  return {
    title: `${layer.name} — Sovereign Intelligence Stack`,
    description: layer.description,
  };
}

export default async function LayerPage({ params }: LayerPageProps) {
  const resolvedParams = await params;
  const layer = getLayerBySlug(resolvedParams.layer);
  
  if (!layer) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Layer Not Found</h1>
          <p className="text-ink-3 mb-8">The requested layer does not exist.</p>
          <Link href="/projects" className="accent-pink font-bold hover:text-pink-dark transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const projects = getProjectsByLayer(resolvedParams.layer);
  const projectCounts = getProjectCountByLayer();

  return (
    <main className="min-h-screen">
      {/* Layer Header */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/projects" 
            className="text-sm text-ink-3 hover:text-ink transition-colors inline-block mb-6"
          >
            ← Back to Architecture
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-display text-4xl md:text-5xl">{layer.name}</h1>
            <span className="text-3xl">{layer.icon}</span>
          </div>
          
          <p className="text-xl text-ink-3 mb-6 leading-relaxed">{layer.description}</p>
          
          <div className="card-pointillist p-6 bg-cream">
            <h2 className="font-display text-2xl mb-3">Problem</h2>
            <p className="text-ink-3 leading-relaxed">{layer.problem}</p>
          </div>
          
          <div className="card-pointillist p-6 bg-surface mt-4">
            <h2 className="font-display text-2xl mb-3">Why It Matters</h2>
            <p className="text-ink-3 leading-relaxed">{layer.why_matters}</p>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20 px-4 reveal">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-8">
            {projects.length} Project{projects.length !== 1 ? 's' : ''} in {layer.name}
          </h2>

          <div className="space-y-6">
            {projects.map((project: any) => (
              <div key={project.slug} className="card-pointillist p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl mb-2 group-hover:text-ink transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-ink-3 mb-4 leading-relaxed">{project.summary}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {project.technologies.map((tech: string) => (
                    <TechTag key={tech} technology={tech} />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm accent-pink font-bold hover:text-pink-dark transition-colors"
                  >
                    Source ↗
                  </a>
                  <Link
                    href={`/projects/${project.layer}/${project.slug}`}
                    className="text-sm accent-pink font-bold hover:text-pink-dark transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
