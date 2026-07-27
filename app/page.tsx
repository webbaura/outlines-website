import Link from 'next/link';
import { MapPin } from 'lucide-react';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ScrollReveal from '@/components/ScrollReveal';
import EmailSignup from '@/components/EmailSignup';
import { getUpcomingEvents, getPastEvents } from '@/lib/events';

export const revalidate = 300;

export default async function Home() {
  const [upcomingEvents, allPastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);
  const pastEvents = allPastEvents.slice(0, 3);
  return (
    <>
      <Hero />

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="py-28 sm:py-36 px-6">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
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

      {/* ── Marquee divider ──────────────────────────────────────── */}
      <Marquee
        items={['Good music', 'Good spaces', 'The right people']}
        bordered
        speed={75}
      />

      {/* ── What we do ───────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-6">
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

      {/* ── Cross-links: House Parties + DJs ─────────────────────── */}
      <section className="py-24 sm:py-32 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <Link
              href="/house-party"
              className="group bg-black hover:bg-white/[0.03] transition-colors p-10 sm:p-14 flex flex-col gap-3"
            >
              <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em]">
                New
              </span>
              <span className="text-3xl sm:text-4xl font-semibold leading-tight">
                House Party.
              </span>
              <span className="text-white/50 text-sm">
                Private spaces. Curated guests. Proper sound.
              </span>
              <span className="mt-4 text-sm font-[family-name:var(--font-montserrat)] uppercase tracking-[0.12em] text-white/80 group-hover:text-white transition-colors">
                Get invited →
              </span>
            </Link>
            <Link
              href="/djs"
              className="group bg-black hover:bg-white/[0.03] transition-colors p-10 sm:p-14 flex flex-col gap-3"
            >
              <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em]">
                Apply
              </span>
              <span className="text-3xl sm:text-4xl font-semibold leading-tight">
                DJ with Outlines.
              </span>
              <span className="text-white/50 text-sm">
                Sharp electronic music. The right rooms.
              </span>
              <span className="mt-4 text-sm font-[family-name:var(--font-montserrat)] uppercase tracking-[0.12em] text-white/80 group-hover:text-white transition-colors">
                Register interest →
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-6 border-t border-white/5">
        <ScrollReveal className="max-w-3xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-12 text-center">
            Upcoming Events
          </p>

          {upcomingEvents.length > 0 ? (
            <div className="space-y-0">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="border-t border-white/10 py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
                >
                  <div className="shrink-0 w-20">
                    <span className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-white/80">
                      {event.date.day}
                    </span>
                    {event.date.month && (
                      <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase ml-2">
                        {event.date.month.slice(0, 3)}
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
                      {[event.venue, event.location].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          ) : (
            <p className="text-center text-white/40 text-sm font-[family-name:var(--font-montserrat)] py-8">
              No upcoming events. Stay tuned.
            </p>
          )}

          {pastEvents.length > 0 && (
            <div className="mt-20">
              <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-10 text-center">
                Recently
              </p>
              <div className="space-y-0">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-t border-white/10 py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
                  >
                    <div className="shrink-0 w-20 opacity-50">
                      <span className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-white/80">
                        {event.date.day}
                      </span>
                      {event.date.month && (
                        <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase ml-2">
                          {event.date.month.slice(0, 3)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-[family-name:var(--font-montserrat)] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/20">
                          Past
                        </span>
                        <h3 className="text-xl font-semibold text-white/70">{event.name}</h3>
                      </div>
                      <p className="text-white/40 text-sm">{event.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/30 shrink-0">
                      <MapPin size={14} />
                      <span className="text-xs font-[family-name:var(--font-montserrat)]">
                        {[event.venue, event.location].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-white/10" />
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="text-sm font-[family-name:var(--font-montserrat)] text-white/60 hover:text-white uppercase tracking-[0.15em] underline underline-offset-4 transition-colors"
            >
              View all events
            </Link>
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
          <EmailSignup source="home" />
        </ScrollReveal>
      </section>
    </>
  );
}
