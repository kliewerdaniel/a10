'use client';

import { Layer } from '@/lib/projects';
import { useRouter } from 'next/navigation';

export function ArchitectureDiagram({ layers }: { layers: Layer[] }) {
  const router = useRouter();

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        {layers.map((layer, index) => (
          <div
            key={layer.slug}
            className="relative flex items-center justify-center cursor-pointer"
            onClick={() => router.push(`/projects/${layer.slug}`)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-full max-w-2xl p-6 border-4 border-ink bg-cream transition-all duration-200 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border-4 border-ink bg-surface flex items-center justify-center text-lg">
                    {layer.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl">{layer.name}</h3>
                    <p className="text-sm text-ink-3">{layer.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{layer.projects?.length || 0}</div>
                  <div className="text-xs text-ink-3">projects</div>
                </div>
              </div>
            </div>

            {index < layers.length - 1 && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <svg className="w-6 h-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
