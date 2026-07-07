import Link from 'next/link';
import { Layer } from '@/lib/projects';

interface LayerCardProps {
  layer: Layer;
  projectCount: number;
}

export function LayerCard({ layer, projectCount }: LayerCardProps) {
  const colorMap: Record<string, string> = {
    'accent-blue': 'border-blue-500',
    'accent-green': 'border-green-500',
    'accent-cyan': 'border-cyan-500',
    'accent-yellow': 'border-yellow-500',
    'accent-orange': 'border-orange-500',
    'accent-pink': 'border-pink-500',
    'accent-purple': 'border-purple-500',
  };

  const bgColorMap: Record<string, string> = {
    'accent-blue': 'bg-blue-50',
    'accent-green': 'bg-green-50',
    'accent-cyan': 'bg-cyan-50',
    'accent-yellow': 'bg-yellow-50',
    'accent-orange': 'bg-orange-50',
    'accent-pink': 'bg-pink-50',
    'accent-purple': 'bg-purple-50',
  };

  const textColorMap: Record<string, string> = {
    'accent-blue': 'text-blue-600',
    'accent-green': 'text-green-600',
    'accent-cyan': 'text-cyan-600',
    'accent-yellow': 'text-yellow-600',
    'accent-orange': 'text-orange-600',
    'accent-pink': 'text-pink-600',
    'accent-purple': 'text-purple-600',
  };

  const borderColor = colorMap[layer.color] || 'border-gray-500';
  const bgColor = bgColorMap[layer.color] || 'bg-gray-50';
  const textColor = textColorMap[layer.color] || 'text-gray-600';

  return (
    <Link href={`/projects/${layer.slug}`}>
      <div className={`card-pointillist p-6 transition-all duration-200 group hover:scale-105 cursor-pointer ${bgColor}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 border-4 ${borderColor} bg-cream flex items-center justify-center text-2xl`}>
              {layer.icon}
            </div>
            <h3 className="font-display text-lg group-hover:text-ink transition-colors">{layer.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold bg-cream border-2 border-ink px-2.5 py-1">
            <span className={textColor}>{projectCount}</span>
            <span className="text-xs text-ink-3">projects</span>
          </div>
        </div>
        <p className="text-sm text-ink-3 mb-3 line-clamp-3 leading-relaxed">{layer.description}</p>
        <p className="text-xs text-ink-3/60 italic">{layer.problem}</p>
      </div>
    </Link>
  );
}
