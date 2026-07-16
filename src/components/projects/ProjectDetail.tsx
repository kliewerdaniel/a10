import Link from 'next/link';
import { Project } from '@/lib/projects';
import { StatusBadge } from './StatusBadge';
import { TechTag } from './TechTag';
import { RelatedProjects } from './RelatedProjects';

interface ProjectDetailProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectDetail({ project, relatedProjects }: ProjectDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link 
            href={`/projects/${project.layer}`} 
            className="text-sm text-ink-3 hover:text-ink transition-colors"
          >
            ← Back to {project.layer.charAt(0).toUpperCase() + project.layer.slice(1)}
          </Link>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl mb-4">{project.name}</h1>
        <p className="text-xl text-ink-3 leading-relaxed mb-6">{project.summary}</p>
        
        <div className="flex items-center gap-3 flex-wrap">
          <StatusBadge status={project.status} />
          {project.technologies.map(tech => (
            <TechTag key={tech} technology={tech} />
          ))}
        </div>
      </div>

      {/* Mission Context */}
      {project.mission_context && (
        <div className="mt-6 border-l-4 border-green bg-surface px-5 py-4">
          <p className="mono text-xs text-green font-bold mb-2">In Service of the Mission</p>
          <p className="text-ink-3 leading-relaxed">{project.mission_context}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Problem */}
          <div className="card-pointillist p-6">
            <h2 className="font-display text-2xl mb-4">Problem</h2>
            <p className="text-ink-3 leading-relaxed">{project.problem}</p>
          </div>

          {/* Why It Matters */}
          <div className="card-pointillist p-6 bg-surface">
            <h2 className="font-display text-2xl mb-4">Why It Matters</h2>
            <p className="text-ink-3 leading-relaxed">{project.why_matters}</p>
          </div>

          {/* Core Ideas */}
          <div className="card-pointillist p-6">
            <h2 className="font-display text-2xl mb-4">Core Ideas</h2>
            <ul className="space-y-3">
              {project.core_ideas.map((idea, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-pink mt-2 flex-shrink-0"></span>
                  <span className="text-ink-3 leading-relaxed">{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Metadata */}
          <div className="card-pointillist p-6">
            <h3 className="font-display text-lg mb-4">Metadata</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-ink-3 font-bold">Layer:</span>
                <Link 
                  href={`/projects/${project.layer}`}
                  className="accent-pink font-bold ml-1"
                >
                  {project.layer.charAt(0).toUpperCase() + project.layer.slice(1)}
                </Link>
              </div>
              <div>
                <span className="text-ink-3 font-bold">Status:</span>
                <StatusBadge status={project.status} />
              </div>
              <div>
                <span className="text-ink-3 font-bold">Created:</span>
                {new Date(project.created).toLocaleDateString()}
              </div>
              <div>
                <span className="text-ink-3 font-bold">Last Updated:</span>
                {new Date(project.last_updated).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="card-pointillist p-6">
            <h3 className="font-display text-lg mb-4">Links</h3>
            <div className="space-y-3">
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm accent-pink font-bold transition-colors hover:text-pink-dark"
              >
                Source ↗
              </a>
              <div className="text-sm text-ink-3">
                <span className="font-bold">Repository:</span>
                <div className="mt-1">{project.repository}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <RelatedProjects projects={relatedProjects} />

      {/* Roadmap (if available) */}
      {project.roadmap && project.roadmap.length > 0 && (
        <div className="mt-8 pt-6 border-t-4 border-ink">
          <h2 className="font-display text-2xl mb-4">Roadmap</h2>
          <ul className="space-y-3">
            {project.roadmap.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green mt-2 flex-shrink-0"></span>
                <span className="text-ink-3 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
