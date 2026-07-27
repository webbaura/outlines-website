import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import Marquee from '@/components/Marquee';
import PortraitVideo from '@/components/PortraitVideo';
import HousePartiesCTA from './HousePartiesCTA';

export const metadata: Metadata = {
  title: 'House Party',
  description:
    'Outlines is bringing back the house party. Private spaces, curated guests, proper sound. Apply to host or get invited.',
  alternates: { canonical: '/house-party' },
  openGraph: {
    title: 'House Party',
    description:
      'Private spaces. Curated guests. Proper sound. Apply to host or get invited.',
    url: '/house-party',
    type: 'website',
  },
};

// Drop your portrait video URLs here when ready. Each item supports either
// `src` (direct .mp4) or `embedUrl` (Vimeo/YouTube/Drive iframe).
type Reel = { caption?: string; src?: string; embedUrl?: string };
const videos: Reel[] = [
  { embedUrl: 'https://drive.google.com/file/d/1UiOWKAYQO8DbStPyaucNVMIv7iM6b9hy/preview' },
];

const pillars = [
  { label: 'Private spaces' },
  { label: 'Curated guests' },
  { label: 'Proper sound' },
];

export default function HousePartiesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            House Party
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            Bringing back the house party.
          </h1>
          <p className="mt-10 text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Everyone loves a house party. We&apos;re throwing the best. You bring the good vibes, we take care of the rest.
          </p>
        </div>
      </section>

      {/* ── Marquee divider ──────────────────────────────────────── */}
      <Marquee
        items={['Private spaces', 'Curated guests', 'Proper sound']}
        bordered
        speed={75}
      />

      {/* ── Three pillars ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6">
        <ScrollReveal className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
            {pillars.map((p) => (
              <div key={p.label} className="flex flex-col gap-3">
                <div className="h-px w-10 bg-white/30" />
                <p className="text-2xl sm:text-3xl font-semibold leading-tight">
                  {p.label}.
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Video reel (portrait — featured 1-up or compact grid 2+) ──── */}
      {videos.length > 0 && (
        <section className="relative py-20 sm:py-28 px-6 border-t border-white/5 overflow-hidden">
          {/* Architectural verticals — same language as the hero */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-8 sm:left-14 w-px bg-white/[0.06]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-8 sm:right-14 w-px bg-white/[0.06]" />

          <ScrollReveal className="relative max-w-6xl mx-auto">
            <p className="text-[10px] sm:text-xs font-[family-name:var(--font-montserrat)] text-white/45 uppercase tracking-[0.4em] mb-10 sm:mb-14 flex items-center justify-center gap-3">
              <span aria-hidden="true" className="block h-px w-6 bg-white/25" />
              Inside the room
              <span aria-hidden="true" className="block h-px w-6 bg-white/25" />
            </p>

            {videos.length === 1 ? (
              /* Featured single — centred portrait, max 380px so it reads
                 cinematic rather than stretched */
              <div className="mx-auto w-full max-w-[380px]">
                {videos[0].src ? (
                  <PortraitVideo src={videos[0].src} caption={videos[0].caption} />
                ) : videos[0].embedUrl ? (
                  <PortraitVideo embedUrl={videos[0].embedUrl} caption={videos[0].caption} />
                ) : null}
              </div>
            ) : (
              /* Compact grid — 2-up on tablet, 3-up on desktop. Tighter max-width
                 than the single case so portrait cells stay proportional. */
              <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1100px]">
                {videos.map((v, i) =>
                  v.src ? (
                    <PortraitVideo key={i} src={v.src} caption={v.caption} />
                  ) : v.embedUrl ? (
                    <PortraitVideo key={i} embedUrl={v.embedUrl} caption={v.caption} />
                  ) : null,
                )}
              </div>
            )}
          </ScrollReveal>
        </section>
      )}

      {/* ── Two-CTA split (forms in modals) ──────────────────────── */}
      <section className="py-20 sm:py-28 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-6">
              Two ways in
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Be in the room. Or open one up.
            </h2>
          </div>
          <HousePartiesCTA />
        </ScrollReveal>
      </section>
    </>
  );
}
