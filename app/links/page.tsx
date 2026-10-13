import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import { Globe, Youtube, AudioLines, Radio, Instagram, Mail } from 'lucide-react';
import LinkRow from './LinkRow';
import FeaturedLink from './FeaturedLink';

// Link-in-bio page for the Instagram profile. Standalone: it sits outside the
// (site) route group, so no nav, footer or WebGL background. Not indexed —
// it duplicates the nav for search engines and exists for IG traffic only.
export const metadata: Metadata = {
  title: 'Links',
  description: 'Outlines — events, house parties, and Outlines Records.',
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  viewportFit: 'cover',
};

// Swap the featured event here when the next one is announced.
const featured = {
  eyebrow: 'Next up',
  title: "Cafe Disco at Baba's Deli",
  cta: 'Get tickets',
  href: 'https://yourkind.io/e/cafe-disco-at-babas-deli-3c95c1',
};

const ICON = 20;

const links = [
  { label: 'Outlines website', href: 'https://outlinesgroup.com/', icon: <Globe size={ICON} /> },
];

const listen = [
  { label: 'YouTube',    href: 'https://www.youtube.com/@OutlinesRecords',   icon: <Youtube size={ICON} /> },
  { label: 'SoundCloud', href: 'https://soundcloud.com/outlinesrecords',     icon: <AudioLines size={ICON} /> },
  { label: 'Mixcloud',   href: 'https://www.mixcloud.com/outlinesrecords/', icon: <Radio size={ICON} /> },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/outlinesgroup_', icon: <Instagram size={18} /> },
  { label: 'Email',     href: 'mailto:hello@outlinesgroup.com',           icon: <Mail size={18} /> },
];

// Entrance stagger, ms between items.
const STEP = 70;

export default function LinksPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-black">
      {/* ── Background: 2 MB centre-cropped loop of the house party reel.
            The poster paints first and stays put when autoplay is blocked
            (iOS Low Power Mode) or reduced motion is on. ── */}
      <div aria-hidden="true" className="fixed inset-0">
        <Image
          src="/links/house-party-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          src="/links/house-party-loop.mp4"
          poster="/links/house-party-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        />
        {/* Readability scrim: light at the top so the footage reads, heavy at
            the bottom where the links sit. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/90" />
      </div>

      {/* ── Content ── */}
      <main
        className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col px-5"
        style={{
          paddingTop: 'max(2.25rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        }}
      >
        <header className="links-rise flex flex-col items-center text-center" style={{ animationDelay: '0ms' }}>
          <Image
            src="/assets/brand/outlines-transparent.webp"
            alt="Outlines"
            width={120}
            height={130}
            priority
            className="h-14 w-auto select-none"
          />
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
            Melbourne
          </p>
          <h1 className="mt-2 text-lg font-semibold tracking-tight text-white/95">
            Outlining electronic music culture.
          </h1>
        </header>

        {/* Push the links toward the thumb zone on tall phones. */}
        <div className="flex-1 min-h-6" />

        <nav aria-label="Links" className="flex flex-col gap-2.5">
          <FeaturedLink {...featured} delay={STEP * 1} />

          {links.map((l, i) => (
            <LinkRow key={l.href} {...l} delay={STEP * (2 + i)} />
          ))}

          <p
            className="links-rise mt-2 mb-0.5 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-white/50"
            style={{ animationDelay: `${STEP * (2 + links.length)}ms` }}
          >
            <span aria-hidden="true" className="block h-px w-6 bg-white/25" />
            Listen
            <span aria-hidden="true" className="block h-px w-6 bg-white/25" />
          </p>

          {listen.map((l, i) => (
            <LinkRow key={l.href} {...l} delay={STEP * (3 + links.length + i)} />
          ))}
        </nav>

        <footer
          className="links-rise mt-5 flex items-center justify-center gap-6 text-white/50"
          style={{ animationDelay: `${STEP * (3 + links.length + listen.length)}ms` }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-white"
            >
              {s.icon}
            </a>
          ))}
        </footer>
      </main>
    </div>
  );
}
