interface TechTagProps {
  technology: string;
}

export function TechTag({ technology }: TechTagProps) {
  return (
    <span className="px-2 py-1 text-xs font-bold border-2 border-ink bg-cream text-ink">
      {technology}
    </span>
  );
}
