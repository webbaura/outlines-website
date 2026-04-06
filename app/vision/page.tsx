import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Vision',
  description: 'The why behind Outlines — house music culture, community, bringing good music to people.',
};

export default function VisionPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 sm:pt-48 sm:pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            Vision
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Starting with events. Building a culture platform.
          </h1>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <section className="pb-28 sm:pb-36 px-6">
        <div className="max-w-2xl mx-auto space-y-20">
          <ScrollReveal>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
              Outlines came from a genuine love of electronic music and the kind of nights that stay with you long after they end. After years of being around music, events and spaces that felt like they were missing something, the idea was simple: create the kind of experience we would actually want to be at.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
              For us, it starts with taste. Good music, the right setting and people who are there for the right reasons. Not overcomplicated, not overbranded, and not built around noise for the sake of it.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
              Outlines is our way of bringing that taste into the real world and building something with long-term meaning around it.
            </p>
          </ScrollReveal>

          {/* ── Ring motif ─────────────────────────────────────────── */}
          <ScrollReveal className="flex justify-center pt-8">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-3 rounded-full border border-white/8" />
              <div className="absolute inset-6 rounded-full border border-white/6" />
              <div className="absolute inset-9 rounded-full border border-white/4" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
