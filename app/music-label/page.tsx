import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import Marquee from '@/components/Marquee';
import SchemaForm from '@/components/forms/SchemaForm';
import { labelForm } from '@/lib/forms/label';

export const metadata: Metadata = {
  title: 'Music Label',
  description:
    'Outlines Records is an electronic music label focused on timeless dance music.',
  alternates: { canonical: '/music-label' },
  openGraph: {
    title: 'Music Label',
    description:
      'Outlines Records is an electronic music label focused on timeless dance music.',
    url: '/music-label',
    type: 'website',
  },
};

export default function MusicLabelPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 sm:pt-48 sm:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            Music Label
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Outlining timeless music.
          </h1>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <section className="pb-24 sm:pb-32 px-6">
        <div className="max-w-5xl mx-auto space-y-20">
          <ScrollReveal>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Outlines Records is an electronic music label focused on timeless dance music.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Every release is backed by thoughtful curation, strategic promotion and a growing community that extends beyond streaming into clubs, events, and culture.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl">
              For artists driven by taste and intention.
            </p>
          </ScrollReveal>

          {/* ── Logo ───────────────────────────────────────────────── */}
          <ScrollReveal className="flex justify-center pt-4">
            <Image
              src="/assets/brand/outlines-transparent.webp"
              alt="Outlines"
              width={240}
              height={266}
              className="w-28 sm:w-36 h-auto opacity-85 select-none"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Marquee divider ──────────────────────────────────────── */}
      <Marquee
        items={['Timeless music', 'Thoughtful curation', 'Built to last']}
        bordered
        speed={80}
      />

      {/* ── Form ─────────────────────────────────────────────────── */}
      <section className="pb-28 sm:pb-36 px-6 pt-16 sm:pt-24">
        <ScrollReveal className="max-w-5xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-4">
            Submit
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-6">
            Send us your music.
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-12">
            For artists driven by taste and intention. Share your track links and tell us about the release.
          </p>
          <SchemaForm config={labelForm} />
        </ScrollReveal>
      </section>
    </>
  );
}
