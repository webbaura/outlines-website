import Link from 'next/link';

// Shared shell for 404 and error pages. Same type scale as page heroes
// (eyebrow → large headline → muted body) so these read as part of the site.

export const statusButtonClass =
  'inline-flex items-center justify-center bg-black/40 backdrop-blur-sm text-white px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] border border-white/30 hover:bg-white hover:text-black hover:border-white transition-colors';

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  actions: React.ReactNode;
  // Quiet secondary links under the buttons.
  links?: readonly { href: string; label: string }[];
  footnote?: React.ReactNode;
};

export default function StatusPage({ eyebrow, title, body, actions, links, footnote }: Props) {
  return (
    <section className="min-h-[80svh] flex items-center px-6 pt-32 pb-20 sm:pt-40">
      <div className="max-w-5xl mx-auto w-full">
        <p className="hero-line text-sm text-white/40 uppercase tracking-[0.15em] mb-8">
          {eyebrow}
        </p>
        <h1 className="hero-line hero-line-2 text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
          {title}
        </h1>
        <p className="hero-line hero-line-3 mt-8 text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed">
          {body}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">{actions}</div>

        {links && links.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-white/45">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {footnote && <p className="mt-16 text-[11px] text-white/30 tracking-wide">{footnote}</p>}
      </div>
    </section>
  );
}
