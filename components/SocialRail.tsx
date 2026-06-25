'use client';

import { useEffect, useState } from 'react';

type Social = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const socials: Social[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/outlinesgroup_',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.64a6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 3.76.92V6.19a4.85 4.85 0 0 1-.01.5z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@outlinesgroup.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22,4 12,13 2,4" />
      </svg>
    ),
  },
];

export default function SocialRail() {
  // Mount-fade so it doesn't pop in on initial paint
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <aside
      aria-label="Social links"
      className="fixed right-5 top-1/2 z-30 hidden md:flex flex-col items-center gap-3"
      style={{
        transform: `translateY(-50%) translateX(${mounted ? 0 : 8}px)`,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span aria-hidden="true" className="h-8 w-px bg-white/15" />

      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          aria-label={s.label}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full text-white/65 hover:text-white border border-white/10 hover:border-white/25 bg-white/[0.04] hover:bg-white/[0.10] backdrop-blur-sm transition-[color,background-color,border-color,transform] duration-300 ease-out hover:scale-[1.06]"
        >
          {s.icon}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 text-[11px] font-[family-name:var(--font-montserrat)] uppercase tracking-[0.15em] text-white/85 bg-black/60 border border-white/10 backdrop-blur-sm opacity-0 translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300 ease-out"
          >
            {s.label}
          </span>
        </a>
      ))}

      <span aria-hidden="true" className="h-8 w-px bg-white/15" />
    </aside>
  );
}
