// NocoDB REST client.
// All env vars are read at call-time so missing config fails per-request, not at boot.

type NocoTable = 'guests' | 'hosts' | 'djs' | 'events' | 'newsletter';

const TABLE_ENV: Record<NocoTable, string> = {
  guests:     'NOCODB_TABLE_HOUSE_PARTY_GUESTS',
  hosts:      'NOCODB_TABLE_HOUSE_PARTY_HOSTS',
  djs:        'NOCODB_TABLE_DJS',
  events:     'NOCODB_TABLE_EVENTS',
  newsletter: 'NOCODB_TABLE_NEWSLETTER',
};

function readEnv(): { baseUrl: string; token: string } {
  const baseUrl = process.env.NOCODB_URL?.replace(/\/+$/, '');
  const token = process.env.NOCODB_TOKEN;
  if (!baseUrl || !token) {
    throw new Error('NocoDB env not configured (NOCODB_URL, NOCODB_TOKEN)');
  }
  return { baseUrl, token };
}

function tableId(table: NocoTable): string {
  const id = process.env[TABLE_ENV[table]];
  if (!id) throw new Error(`Missing env: ${TABLE_ENV[table]}`);
  return id;
}

export interface EventRecord {
  Id: number;
  Name: string;
  Subtitle: string | null;
  StartDate: string | null;
  EndDate: string | null;
  Venue: string | null;
  Location: string | null;
  Description: string | null;
  TimeDisplay: string | null;
  TicketStatus: string | null;
  TicketsUrl: string | null;
  Tags: string | null; // comma-separated from MultiSelect
  Published: boolean | number | null;
}

interface ListResponse<T> {
  list: T[];
  pageInfo?: { totalRows: number; page: number; pageSize: number; isLastPage: boolean };
}

// Fetch published events, sorted by StartDate ascending. Past/upcoming
// classification is left to the caller so it can use a single "now".
export async function fetchEvents(): Promise<EventRecord[]> {
  const { baseUrl, token } = readEnv();
  const url = new URL(`${baseUrl}/api/v2/tables/${tableId('events')}/records`);
  url.searchParams.set('limit', '100');
  url.searchParams.set('sort', 'StartDate');
  url.searchParams.set('where', '(Published,eq,true)');

  const res = await fetch(url.toString(), {
    headers: { 'xc-token': token },
    next: { revalidate: 300, tags: ['events'] },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`NocoDB ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as ListResponse<EventRecord>;
  return data.list;
}

export async function insertRecord<T extends Record<string, unknown>>(
  table: NocoTable,
  record: T,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const { baseUrl, token } = readEnv();
    const url = `${baseUrl}/api/v2/tables/${tableId(table)}/records`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': token,
      },
      body: JSON.stringify(record),
      // No caching for writes.
      cache: 'no-store',
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, error: `NocoDB ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
