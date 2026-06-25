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
  // Build [item, sep, item, sep, ...] then repeat 3x for seamless looping.
  const sequence = items.flatMap((item) => [
    { text: item, isSep: false },
    { text: separator, isSep: true },
  ]);
  const tracks = Array.from({ length: 3 }).flatMap((_, t) =>
    sequence.map((s, j) => ({ key: `${t}-${j}`, ...s })),
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
        {tracks.map(({ key, text, isSep }) => (
          <span
            key={key}
            className={
              isSep
                ? `px-6 shrink-0 ${textSize}`
                : `px-6 shrink-0 ${textSize} hover:text-white transition-colors duration-200`
            }
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
