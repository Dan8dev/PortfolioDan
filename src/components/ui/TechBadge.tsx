interface TechBadgeProps {
  label: string;
  tone?: 'aurora' | 'sky' | 'muted';
}

const toneClass = {
  aurora: 'border-aurora/70 text-aurora',
  sky: 'border-sky/70 text-sky',
  muted: 'border-muted/50 text-muted',
} as const;

export function TechBadge({ label, tone = 'aurora' }: TechBadgeProps) {
  return (
    <li
      className={`border-2 bg-night-950/60 px-2 py-1 font-pixel text-[0.55rem] leading-relaxed uppercase sm:text-[0.6rem] ${toneClass[tone]}`}
    >
      {label}
    </li>
  );
}

export function TechList({ items, tone }: { items: string[]; tone?: TechBadgeProps['tone'] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
      {items.map((item) => (
        <TechBadge key={item} label={item} tone={tone} />
      ))}
    </ul>
  );
}
