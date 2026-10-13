import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import EmailSignup from '@/components/EmailSignup';
import { getUpcomingEvents, getPastEvents, type EventItem } from '@/lib/events';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming Outlines house music events in Melbourne.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events — Outlines',
    description: 'Outlines house music events in Melbourne.',
    url: '/events',
    type: 'website',
  },
};

export const revalidate = 300;

function EventRow({ event, past = false }: { event: EventItem; past?: boolean }) {
  const hasLocation = event.venue || event.location;
  return (
    <div className="border-t border-white/10 py-10 flex flex-col sm:flex-row gap-6 sm:gap-10">
      <div className={`shrink-0 w-28 ${past ? 'opacity-50' : ''}`}>
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
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {past && (
            <span className="text-[10px] font-[family-name:var(--font-montserrat)] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/20">
              Past
            </span>
          )}
          <h2 className={`text-2xl font-semibold ${past ? 'text-white/70' : ''}`}>
            {event.name}
          </h2>
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-[family-name:var(--font-montserrat)] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/15 text-white/50"
            >
              {tag.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
        {event.subtitle && (
          <p className={`text-sm italic mb-3 ${past ? 'text-white/40' : 'text-white/70'}`}>
            {event.subtitle}
          </p>
        )}
        {event.description && (
          <p className={`text-sm mb-4 ${past ? 'text-white/40' : 'text-white/50'}`}>
            {event.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-white/30 text-xs font-[family-name:var(--font-montserrat)]">
          {hasLocation && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>{[event.venue, event.location].filter(Boolean).join(', ')}</span>
            </div>
          )}
          {event.time && <span>Time: {event.time}</span>}
          {past ? (
            <span>Tickets: {event.tickets || 'Closed'}</span>
          ) : event.ticketsUrl ? (
            <a
              href={event.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline underline-offset-4 transition-colors"
            >
              Tickets: {event.tickets || 'Buy'}
            </a>
          ) : (
            event.tickets && <span>Tickets: {event.tickets}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  const hasUpcoming = upcomingEvents.length > 0;
  const hasPast = pastEvents.length > 0;

  const eventJsonLd = upcomingEvents.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.isoStart,
    endDate: event.isoEnd,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.split(',')[0]?.trim(),
        addressRegion: 'VIC',
        addressCountry: 'AU',
      },
    },
    description: event.description,
    organizer: { '@type': 'Organization', name: 'Outlines', url: 'https://outlinesgroup.com' },
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
      <section className="pt-40 pb-16 sm:pt-48 sm:pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
            Events
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            What&apos;s on
          </h1>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {hasUpcoming ? (
            <div className="space-y-0">
              {upcomingEvents.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
              <div className="border-t border-white/10" />
            </div>
          ) : (
            <ScrollReveal className="text-center py-20">
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
                Sign up to be the first to know.
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {hasPast && (
        <section className="pb-24 sm:pb-32 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-8">
              Past events
            </p>
            <div className="space-y-0">
              {pastEvents.map((event) => (
                <EventRow key={event.id} event={event} past />
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </section>
      )}

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
          <EmailSignup source="events" />
        </ScrollReveal>
      </section>

      {eventJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}
    </>
  );
}
