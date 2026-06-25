// Single source of truth for events. Reads from NocoDB (table: events),
// classifies upcoming vs past against the current request time, and shapes
// records into the EventItem the UI renders. The home page proof strip,
// the home page next-event card, and /events all read from here.

import { fetchEvents, type EventRecord } from '@/lib/nocodb';

export type EventItem = {
  id: number;
  date: { dayOfWeek?: string; day: string; month: string; year: string };
  isoStart?: string;
  isoEnd?: string;
  name: string;
  subtitle?: string;
  location: string;
  venue: string;
  description: string;
  time: string;
  tickets: string;
  ticketsUrl?: string;
  tags: string[];
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toEventItem(record: EventRecord): EventItem | null {
  if (!record.StartDate) return null;
  const start = new Date(record.StartDate);
  if (Number.isNaN(start.getTime())) return null;

  const tags = record.Tags
    ? record.Tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return {
    id: record.Id,
    date: {
      dayOfWeek: DAYS[start.getDay()],
      day: String(start.getDate()).padStart(2, '0'),
      month: MONTHS[start.getMonth()],
      year: String(start.getFullYear()),
    },
    isoStart: start.toISOString(),
    isoEnd: record.EndDate ? new Date(record.EndDate).toISOString() : undefined,
    name: record.Name,
    subtitle: record.Subtitle ?? undefined,
    location: record.Location ?? '',
    venue: record.Venue ?? '',
    description: record.Description ?? '',
    time: record.TimeDisplay ?? '',
    tickets: record.TicketStatus ?? '',
    ticketsUrl: record.TicketsUrl ?? undefined,
    tags,
  };
}

async function loadAll(): Promise<EventItem[]> {
  try {
    const records = await fetchEvents();
    return records
      .map(toEventItem)
      .filter((e): e is EventItem => e !== null);
  } catch (err) {
    console.error('[events] fetch failed:', err);
    return [];
  }
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  const now = Date.now();
  const events = await loadAll();
  return events
    .filter((e) => e.isoStart && new Date(e.isoStart).getTime() >= now)
    .sort((a, b) => new Date(a.isoStart!).getTime() - new Date(b.isoStart!).getTime());
}

export async function getPastEvents(): Promise<EventItem[]> {
  const now = Date.now();
  const events = await loadAll();
  return events
    .filter((e) => e.isoStart && new Date(e.isoStart).getTime() < now)
    .sort((a, b) => new Date(b.isoStart!).getTime() - new Date(a.isoStart!).getTime());
}

// Optional filter by tag, e.g. getEventsByTag('house_party').
export async function getEventsByTag(tag: string): Promise<EventItem[]> {
  const events = await loadAll();
  return events.filter((e) => e.tags.includes(tag));
}
