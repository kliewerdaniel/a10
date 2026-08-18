import Link from 'next/link';
import { getGraph } from '@/lib/artifacts';
import type { GraphJson, GraphNode } from '@/lib/artifacts';

/**
 * Editorial knowledge-atlas plate. Static SVG, computed deterministically at
 * build time from graph.json — no client force-simulation, renders with JS off.
 * Articles in an outer ring, highest-degree entity hubs in an inner ring, related
 * edges between them. `large` widens the canvas and shows the legend.
 */

const W_BASE = 560;
const H_BASE = 420;

function buildLayout(graph: GraphJson, maxArticles = 14) {
  const articles = graph.nodes
    .filter((n) => n.type === 'article')
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, maxArticles);

  const degree = new Map<string, number>();
  for (const e of graph.edges) {
    degree.set(e.from, (degree.get(e.from) ?? 0) + 1);
    degree.set(e.to, (degree.get(e.to) ?? 0) + 1);
  }
  const entities = graph.nodes
    .filter((n) => n.type === 'entity')
    .sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0))
    .slice(0, 8);

  const nodes: GraphNode[] = [...articles, ...entities];
  const idset = new Set(nodes.map((n) => n.id));
  const edges = graph.edges.filter(
    (e) => e.label === 'related' && idset.has(e.from) && idset.has(e.to),
  );

  const W = W_BASE;
  const H = H_BASE;
  const cx = W / 2;
  const cy = H / 2;
  const rOuter = Math.min(W, H) / 2 - 36;
  const positions = new Map<string, { x: number; y: number }>();
  articles.forEach((a, i) => {
    const ang = (i / Math.max(articles.length, 1)) * Math.PI * 2 - Math.PI / 2;
    positions.set(a.id, { x: cx + Math.cos(ang) * rOuter, y: cy + Math.sin(ang) * rOuter });
  });
  const rInner = rOuter * 0.46;
  entities.forEach((e, i) => {
    const ang = (i / Math.max(entities.length, 1)) * Math.PI * 2 + 0.4;
    positions.set(e.id, { x: cx + Math.cos(ang) * rInner, y: cy + Math.sin(ang) * rInner });
  });

  return { nodes, edges, positions, cx, cy, rOuter, rInner };
}

export function GraphWidget({ className = '', large = false }: { className?: string; large?: boolean }) {
  const graph = getGraph();
  if (!graph) return null;

  const { nodes, edges, positions, cx, cy, rOuter, rInner } = buildLayout(graph, large ? 18 : 14);
  const W = large ? 760 : W_BASE;
  const H = large ? 560 : H_BASE;

  return (
    <figure className={`m-0 ${className}`}>
      <div className="border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label="Static atlas of the knowledge graph linking related research posts"
        >
          {/* faint concentric guide rings */}
          <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="var(--color-rule)" strokeWidth={1} />
          <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="var(--color-rule)" strokeWidth={1} strokeDasharray="2 4" />
          {edges.map((e, i) => {
            const a = positions.get(e.from);
            const b = positions.get(e.to);
            if (!a || !b) return null;
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--color-ink-3)" strokeOpacity={0.16} strokeWidth={0.75} />;
          })}
          {nodes.filter((n) => n.type === 'entity').map((n) => {
            const p = positions.get(n.id);
            if (!p) return null;
            return <circle key={n.id} cx={p.x} cy={p.y} r={4} fill="var(--color-pink)" stroke="var(--color-paper-2)" strokeWidth={1.5}><title>{n.label}</title></circle>;
          })}
          {nodes.filter((n) => n.type === 'article').map((n) => {
            const p = positions.get(n.id);
            if (!p) return null;
            return (
              <Link key={n.id} href={`/blog/${n.slug}`}>
                <circle cx={p.x} cy={p.y} r={6} fill="var(--color-green)" stroke="var(--color-paper-2)" strokeWidth={2} />
                <title>{n.label}</title>
              </Link>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">
          {graph.nodes.length} nodes · {graph.edges.length} links
        </span>
        {large && (
          <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">
            green · posts &nbsp; pink · entities
          </span>
        )}
      </figcaption>
    </figure>
  );
}
