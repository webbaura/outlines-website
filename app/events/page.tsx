import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import EmailSignup from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming Outlines house music events in Melbourne. Next up: Outlines x Gambino King’s Birthday Eve, Sunday 7 June at Gambino Rooftop, Glen Waverley.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events — Outlines',
    description:
      'Outlines x Gambino King’s Birthday Eve — Sunday 7 June, Gambino Rooftop, Glen Waverley. House music, rooftop energy, no Monday alarm.',
    url: '/events',
    type: 'website',
  },
};

type EventItem = {
  date: { dayOfWeek?: string; day: string; month: string; year: string };
  name: string;
  subtitle?: string;
  location: string;
  venue: string;
  description: string;
  time: string;
  tickets: string;
  ticketsUrl?: string;
};

const upcomingEvents: EventItem[] = [
  {
    date: { dayOfWeek: 'Sunday', day: '07', month: 'June', year: '2026' },
    name: 'Outlines x Gambino King’s Birthday Eve',
    subtitle: 'No Monday alarm.',
    location: 'Glen Waverley, Melbourne',
    venue: 'Gambino Rooftop',
    description:
      'Outlines returns to Gambino Rooftop for King’s Birthday Eve. A curated lineup of local selectors, house music carrying from sunset into late, and the rare Sunday night where nobody needs to worry about Monday morning.',
    time: '5 PM – 11 PM',
    tickets: 'On sale now',
    ticketsUrl:
      'https://www.eventbrite.com/e/outlines-x-gambino-kings-birthday-eve-tickets-1989298861445',
  },
];

const pastEvents: EventItem[] = [
  {
    date: { dayOfWeek: 'Saturday', day: '19', month: 'April', year: '2026' },
    name: 'Outlines X Gambino Launch',
    subtitle: 'Our first chapter.',
    location: 'Glen Waverley, Melbourne',
    venue: 'Gambino Rooftop',
    description:
      'A rooftop session shaped by house music, warm energy, and a sharper sense of atmosphere. Our first chapter at Gambino Rooftop — the night that set the tone.',
    time: 'Past event',
    tickets: 'Closed',
  },
];

function EventRow({ event, muted = false }: { event: EventItem; muted?: boolean }) {
  return (
    <div
      className={`border-t border-white/10 py-10 flex flex-col sm:flex-row gap-6 sm:gap-10 ${
        muted ? 'opacity-60' : ''
      }`}
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
        {event.subtitle && (
          <p className="text-white/70 text-sm italic mb-3">{event.subtitle}</p>
        )}
        <p className="text-white/50 text-sm mb-4">{event.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-white/30 text-xs font-[family-name:var(--font-montserrat)]">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>
              {event.venue}, {event.location}
            </span>
          </div>
          {event.time && <span>Time: {event.time}</span>}
          {event.ticketsUrl ? (
            <a
              href={event.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline underline-offset-4 transition-colors"
            >
              Tickets: {event.tickets}
            </a>
          ) : (
            event.tickets && <span>Tickets: {event.tickets}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const hasUpcoming = upcomingEvents.length > 0;
  const hasPast = pastEvents.length > 0;

  const eventJsonLd = upcomingEvents.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: '2026-06-07T17:00:00+10:00',
    endDate: '2026-06-07T23:00:00+10:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Glen Waverley',
        addressRegion: 'VIC',
        addressCountry: 'AU',
      },
    },
    description: event.description,
    organizer: { '@type': 'Organization', name: 'Outlines', url: 'https://outlines.com.au' },
    offers: event.ticketsUrl
      ? {
          '@type': 'Offer',
          url: event.ticketsUrl,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  }));

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

      {/* ── Upcoming ─────────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {hasUpcoming ? (
            <div className="space-y-0">
              {upcomingEvents.map((event, i) => (
                <EventRow key={i} event={event} />
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

      {/* ── Past events ──────────────────────────────────────────── */}
      {hasPast && (
        <section className="pb-24 sm:pb-32 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
              Past events
            </p>
            <div className="space-y-0">
              {pastEvents.map((event, i) => (
                <EventRow key={i} event={event} muted />
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </section>
      )}

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </>
  );
}
