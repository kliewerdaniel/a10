import Link from 'next/link';

interface FleetDiagramProps {
  layers: { slug: string; name: string; color?: string }[];
}

/**
 * Build-time SVG of the Fleet: one frozen substrate (center) exercising N domains
 * (satellites). No client JS — layout is deterministic. Each domain links to its
 * fleet page. Depicts the thesis: many minds, one substrate.
 */
export function FleetDiagram({ layers }: FleetDiagramProps) {
  const W = 720;
  const H = 460;
  const cx = W / 2;
  const cy = H / 2;
  const rSat = Math.min(W, H) / 2 - 70;
  const n = layers.length;
  const pts = layers.map((l, i) => {
    const ang = (i / Math.max(n, 1)) * Math.PI * 2 - Math.PI / 2;
    return { ...l, x: cx + Math.cos(ang) * rSat, y: cy + Math.sin(ang) * rSat };
  });

  return (
    <div className="border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--color-ink-3)]">Fleet Topology</h3>
        <span className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-[var(--color-ink-3)]">1 substrate · {n} domains</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="The Fleet: one substrate exercising many domains">
        {pts.map((p) => (
          <line key={`e-${p.slug}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--color-rule)" strokeOpacity={0.8} strokeWidth={1} />
        ))}
        {pts.map((p) => (
          <Link key={`n-${p.slug}`} href={`/fleet/${p.slug}`}>
            <circle cx={p.x} cy={p.y} r={10} fill="var(--color-green)" stroke="var(--color-paper-2)" strokeWidth={2} />
            <title>{p.name}</title>
          </Link>
        ))}
        <circle cx={cx} cy={cy} r={20} fill="var(--color-ink)" />
        <text x={cx} y={cy + 4} textAnchor="middle" className="fill-paper" style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
          SUBSTRATE
        </text>
      </svg>
      <p className="mt-2 font-mono text-[0.58rem] tracking-[0.14em] uppercase text-[var(--color-ink-3)]">
        Center = frozen governance substrate · satellites = proven domains
      </p>
    </div>
  );
}
