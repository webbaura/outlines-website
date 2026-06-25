import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import Marquee from '@/components/Marquee';
import DJApplicationForm from '@/components/forms/DJApplicationForm';

export const metadata: Metadata = {
  title: 'DJ with Outlines',
  description:
    'Outlines is looking for DJs who want to play good electronic music in the right rooms. Register your interest.',
  alternates: { canonical: '/djs' },
  openGraph: {
    title: 'DJ with Outlines',
    description:
      'Outlines is looking for DJs who want to play good electronic music in the right rooms. Register your interest.',
    url: '/djs',
    type: 'website',
  },
};

export default function DJsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-40 pb-12 sm:pt-48 sm:pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            Proper Sound
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
            Proper Sound. Right Room.
          </h1>
        </div>
      </section>

      {/* ── Intro copy ───────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-white/60 text-lg leading-relaxed">
            Outlines is looking for DJs who want to play good electronic music in the right rooms.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            We work with DJs who are not just looking for a set, but are willing to support the event, bring energy, promote properly, and treat Outlines like something they are helping build.
          </p>
        </div>
      </section>

      {/* ── Marquee divider ──────────────────────────────────────── */}
      <Marquee
        items={['Proper sound', 'Real support', 'Built together']}
        bordered
        speed={80}
      />

      {/* ── Form ─────────────────────────────────────────────────── */}
      <section className="pb-28 sm:pb-36 px-6 pt-16 sm:pt-24">
        <ScrollReveal className="max-w-3xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-4">
            Apply
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-12">
            Register your interest.
          </h2>
          <DJApplicationForm />
        </ScrollReveal>
      </section>
    </>
  );
}
