import Image from 'next/image';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import EmailSignup from '@/components/EmailSignup';

const placeholderEvents = [
  {
    date: { day: '19', month: 'APR' },
    name: 'Outlines X Gambino Launch',
    location: 'Gambino Rooftop, Glen Waverley',
    description: 'Our first chapter. A rooftop session shaped by house music, warm energy, and a sharper sense of atmosphere.',
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/assets/brand/logo-dark.jpg"
            alt="Outlines"
            width={200}
            height={200}
            className="rounded-full"
            priority
          />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <ChevronDown size={24} className="text-white/30 animate-bounce" />
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="py-28 sm:py-36 px-6">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-4">
            Outlining electronic music culture
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-8">
            About
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            Outlines started with a shared love of electronic music and a desire to create the kind of events we actually want to be at.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            Good music, good spaces, and the right people in the room.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            That is the whole point.
          </p>
        </ScrollReveal>
      </section>

      {/* ── What we do ───────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            What we do
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            We curate electronic events across Melbourne that are shaped by the music, the space, and the people in the room.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            From intimate rooftops to late-night club settings, the focus is always on doing things properly.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-3xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-12 text-center">
            Upcoming Events
          </p>

          <div className="space-y-0">
            {placeholderEvents.map((event, i) => (
              <div
                key={i}
                className="border-t border-white/10 py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
              >
                <div className="shrink-0 w-20">
                  <span className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-white/80">
                    {event.date.day}
                  </span>
                  {event.date.month && (
                    <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase ml-2">
                      {event.date.month}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
                  <p className="text-white/50 text-sm">{event.description}</p>
                </div>

                <div className="flex items-center gap-1.5 text-white/30 shrink-0">
                  <MapPin size={14} />
                  <span className="text-xs font-[family-name:var(--font-montserrat)]">
                    {event.location}
                  </span>
                </div>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Sign Up ──────────────────────────────────────────────── */}
      <section className="py-28 sm:py-36 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-xl mx-auto text-center">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-6">
            Stay updated
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Get event announcements before anyone else
          </h2>
          <p className="text-white/50 text-sm mb-10">
            No spam. Just the good stuff.
          </p>
          <EmailSignup />
        </ScrollReveal>
      </section>
    </>
  );
}
