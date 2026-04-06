import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import EmailSignup from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming Outlines events — house music events in Melbourne.',
};

const events = [
  {
    date: { dayOfWeek: 'Saturday', day: '19', month: 'April', year: '2026' },
    name: 'Outlines X Gambino Launch',
    subtitle: 'Our first chapter.',
    location: 'Glen Waverley, Melbourne',
    venue: 'Gambino Rooftop',
    description: 'A rooftop session shaped by house music, warm energy, and a sharper sense of atmosphere. Join us at Gambino Rooftop as we launch Outlines with a night built around the music and the people.',
    time: 'TBA',
    tickets: 'Coming soon',
  },
];

export default function EventsPage() {
  const hasEvents = events.length > 0;

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 sm:pt-48 sm:pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            Events
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            What&apos;s on
          </h1>
        </div>
      </section>

      {/* ── Events listing ───────────────────────────────────────── */}
      <section className="pb-24 sm:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          {hasEvents ? (
            <div className="space-y-0">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="border-t border-white/10 py-10 flex flex-col sm:flex-row gap-6 sm:gap-10"
                >
                  <div className="shrink-0 w-28">
                    {event.date.dayOfWeek && (
                      <div className="text-xs font-[family-name:var(--font-montserrat)] text-white/30 uppercase tracking-wide mb-1">
                        {event.date.dayOfWeek}
                      </div>
                    )}
                    <span className="text-3xl font-bold font-[family-name:var(--font-montserrat)]">
                      {event.date.day}
                    </span>
                    <div className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-wide">
                      {event.date.month} {event.date.year}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-1">{event.name}</h2>
                    {'subtitle' in event && event.subtitle && (
                      <p className="text-white/70 text-sm italic mb-3">{event.subtitle}</p>
                    )}
                    <p className="text-white/50 text-sm mb-4">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-white/30 text-xs font-[family-name:var(--font-montserrat)]">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>{event.venue}, {event.location}</span>
                      </div>
                      {'time' in event && event.time && (
                        <span>Time: {event.time}</span>
                      )}
                      {'tickets' in event && event.tickets && (
                        <span>Tickets: {event.tickets}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          ) : (
            /* ── Empty state ─────────────────────────────────────── */
            <ScrollReveal className="text-center py-20">
              {/* Decorative rings */}
              <div className="relative w-28 h-28 mx-auto mb-12">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-3 rounded-full border border-white/8" />
                <div className="absolute inset-6 rounded-full border border-white/6" />
                <div className="absolute inset-9 rounded-full border border-white/4" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                Something is coming
              </h2>
              <p className="text-white/50 text-sm font-[family-name:var(--font-montserrat)] mb-2">
                Sign up to be first.
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ── Sign Up ──────────────────────────────────────────────── */}
      <section className="py-28 sm:py-36 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-xl mx-auto text-center">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-6">
            Don&apos;t miss out
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Be the first to know
          </h2>
          <p className="text-white/50 text-sm mb-10">
            Event announcements, straight to your inbox.
          </p>
          <EmailSignup />
        </ScrollReveal>
      </section>
    </>
  );
}
