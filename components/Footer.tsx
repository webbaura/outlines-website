import Image from 'next/image';

const mobileSocials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/outlinesgroup_',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@outlinesgroup_',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.64a6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 3.76.92V6.19a4.85 4.85 0 0 1-.01.5z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@outlinesgroup.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22,4 12,13 2,4" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/brand/outlines-transparent.webp"
              alt="Outlines"
              width={64}
              height={70}
              className="h-7 w-auto opacity-80 select-none"
            />
            <span className="text-white/40 text-xs font-[family-name:var(--font-montserrat)] uppercase tracking-[0.15em]">
              Outlines Group
            </span>
          </div>

          {/* Mobile-only socials — desktop uses the SocialRail */}
          <div className="flex items-center gap-5 md:hidden">
            {mobileSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={s.label}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5 text-[11px] font-[family-name:var(--font-montserrat)]">
            <p className="text-white/30">&copy; {year} Outlines</p>
            <p className="text-white/20">
              Built by{' '}
              <a
                href="https://webbaura.com"
                className="hover:text-white/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Webbaura
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
