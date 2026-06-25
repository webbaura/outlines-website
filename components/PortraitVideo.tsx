// Portrait (9:16) video. Accepts either:
//   - `src` for a direct video file (MP4/WebM) — renders <video>
//   - `embedUrl` for a third-party player (Vimeo, YouTube, Drive) — renders <iframe>
// Pass `poster` to avoid CLS and improve LCP when using <video>.

type Common = {
  caption?: string;
  poster?: string;
  className?: string;
};

type Props = Common &
  (
    | { src: string; embedUrl?: never }
    | { embedUrl: string; src?: never }
  );

export default function PortraitVideo({ src, embedUrl, caption, poster, className = '' }: Props) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-white/[0.03] border border-white/10">
        {src ? (
          <video
            src={src}
            poster={poster}
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
            controls
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <iframe
            src={embedUrl}
            title={caption ?? 'Video'}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
      {caption && (
        <figcaption className="text-white/40 text-xs font-[family-name:var(--font-montserrat)] uppercase tracking-[0.12em]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
