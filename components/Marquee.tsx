// Subtle horizontal-scroll text strip.
// `items` is the source list; we duplicate it so the loop is seamless.
// `speed` is roughly seconds-per-full-loop (higher = slower).

type Props = {
  items: string[];
  separator?: string;
  speed?: number;
  bordered?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

export default function Marquee({
  items,
  separator = '·',
  speed = 60,
  bordered = false,
  size = 'sm',
  className = '',
}: Props) {
  const sequence = items.flatMap((item, i) =>
    i === items.length - 1 ? [item, separator] : [item, separator],
  );
  // Repeat 3x — guarantees the duplicated track fills the viewport on wide screens.
  const tracks = Array.from({ length: 3 }).flatMap((_, t) =>
    sequence.map((w, j) => ({ key: `${t}-${j}`, w })),
  );

  const textSize = size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden ${bordered ? 'border-y border-white/5 py-3' : ''} ${className}`}
    >
      <div
        className="marquee text-white/20 font-[family-name:var(--font-montserrat)] uppercase tracking-[0.4em]"
        style={{ animationDuration: `${speed}s` }}
      >
        {tracks.map(({ key, w }) => (
          <span key={key} className={`px-6 shrink-0 ${textSize}`}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
