import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import Marquee from '@/components/Marquee';
import CafeDiscoRSVP from './CafeDiscoRSVP';

export const metadata: Metadata = {
  title: 'Cafe Disco',
  description:
    'Disco music. Good coffee. Better company. Cafe Disco brings DJs, coffee and good people together to local cafes. RSVP for the next one.',
  alternates: { canonical: '/cafe-disco' },
  openGraph: {
    title: 'Cafe Disco',
    description:
      'Your local cafe. With a little more rhythm. RSVP for the next one.',
    url: '/cafe-disco',
    type: 'website',
  },
};

const pillars = [
  { label: 'Disco music' },
  { label: 'Good coffee' },
  { label: 'Better company' },
];

export default function CafeDiscoPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 sm:pt-48 sm:pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            Cafe Disco
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            Weekend morning routine.
          </h1>
          <p className="mt-10 text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Disco music. Good coffee. Better company.
          </p>
        </div>
      </section>

      {/* ── Marquee divider ──────────────────────────────────────── */}
      <Marquee
        items={['Disco music', 'Good coffee', 'Better company']}
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

      {/* ── Body copy ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Your local cafe.
            <br />
            With a little more rhythm.
          </h2>
          <p className="mt-8 text-white/60 text-lg leading-relaxed">
            Cafe Disco brings DJs, coffee and good people together to local cafes. Come by after your run, bring a friend, or turn up on your own. Stay for a cup. Stay for a dance. Start your weekend right.
          </p>
        </ScrollReveal>
      </section>

      {/* ── RSVP CTA (form in modal) ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-6">
              Doors open
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              See you Saturday morning.
            </h2>
          </div>
          <CafeDiscoRSVP />
        </ScrollReveal>
      </section>
    </>
  );
}
