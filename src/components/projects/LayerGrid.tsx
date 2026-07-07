'use client';

import { Layer } from '@/lib/projects';
import { LayerCard } from './LayerCard';
import { useState } from 'react';

interface LayerGridProps {
  layers: Layer[];
  projectCounts: Record<string, number>;
}

export function LayerGrid({ layers, projectCounts }: LayerGridProps) {
  const [filter, setFilter] = useState<string>('all');

  const statuses = ['all', 'production', 'active', 'experimental'];

  const filteredLayers = filter === 'all' 
    ? layers 
    : layers.filter(layer => {
        const projects = projectCounts[layer.slug] || 0;
        return projects > 0;
      });

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-xs font-bold transition-all duration-200 border-4 border-ink ${
              filter === status
                ? 'bg-ink text-cream shadow-brutalist'
                : 'bg-cream text-ink hover:bg-surface'
            }`}
          >
            {status === 'all' ? 'All Layers' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Layer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLayers.map((layer) => (
          <LayerCard key={layer.slug} layer={layer} projectCount={projectCounts[layer.slug] || 0} />
        ))}
      </div>

      {/* Legend */}
      <div className="bg-cream border-4 border-ink p-6 mt-8">
        <h3 className="font-display text-xl mb-4">Understanding the Layers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green mt-2 flex-shrink-0" />
            <div>
              <strong className="text-ink block">Production</strong>
              <p className="text-ink-3">Systems deployed and used in production. Fully tested and reliable.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-pink mt-2 flex-shrink-0" />
            <div>
              <strong className="text-ink block">Active</strong>
              <p className="text-ink-3">Systems under active development. Working but still evolving.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-orange mt-2 flex-shrink-0" />
            <div>
              <strong className="text-ink block">Experimental</strong>
              <p className="text-ink-3">Proof-of-concept systems exploring new ideas. Not yet stable.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-surface mt-2 flex-shrink-0" />
            <div>
              <strong className="text-ink block">Foundation</strong>
              <p className="text-ink-3">Base infrastructure. Every layer builds on Foundation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
