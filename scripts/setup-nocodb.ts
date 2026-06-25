/**
 * NocoDB table bootstrap.
 *
 * Creates the three tables this site relies on, with the exact columns the
 * API routes expect. Idempotent: skips a table if a table with the same name
 * already exists in the base.
 *
 * Usage:
 *   NOCODB_URL=https://app.nocodb.com \
 *   NOCODB_TOKEN=xxxxxxxx \
 *   NOCODB_BASE_ID=pXXXXXXXX \
 *   npx tsx scripts/setup-nocodb.ts
 *
 * Find your base ID: open the base in NocoDB → look at the URL
 *   .../dashboard/#/nc/<BASE_ID>/...   (the segment after `/nc/`)
 */

type UIType =
  | 'SingleLineText'
  | 'LongText'
  | 'Email'
  | 'PhoneNumber'
  | 'URL'
  | 'Date'
  | 'DateTime'
  | 'Checkbox'
  | 'SingleSelect'
  | 'MultiSelect';

interface ColumnSpec {
  title: string;
  uidt: UIType;
  options?: string[]; // for SingleSelect / MultiSelect
}

interface TableSpec {
  title: string;
  columns: ColumnSpec[];
  envKey: string; // env var name to print at the end
}

const TABLES: TableSpec[] = [
  {
    title: 'house_party_guests',
    envKey: 'NOCODB_TABLE_HOUSE_PARTY_GUESTS',
    columns: [
      { title: 'Name', uidt: 'SingleLineText' },
      { title: 'Phone', uidt: 'PhoneNumber' },
      { title: 'Email', uidt: 'Email' },
      { title: 'Instagram', uidt: 'SingleLineText' },
      { title: 'SubmittedAt', uidt: 'DateTime' },
    ],
  },
  {
    title: 'house_party_hosts',
    envKey: 'NOCODB_TABLE_HOUSE_PARTY_HOSTS',
    columns: [
      { title: 'Name', uidt: 'SingleLineText' },
      { title: 'Phone', uidt: 'PhoneNumber' },
      { title: 'Email', uidt: 'Email' },
      { title: 'SubmittedAt', uidt: 'DateTime' },
    ],
  },
  {
    title: 'djs',
    envKey: 'NOCODB_TABLE_DJS',
    columns: [
      { title: 'FullName', uidt: 'SingleLineText' },
      { title: 'DJName', uidt: 'SingleLineText' },
      { title: 'DOB', uidt: 'Date' },
      { title: 'Email', uidt: 'Email' },
      { title: 'Phone', uidt: 'PhoneNumber' },
      { title: 'Genres', uidt: 'SingleLineText' },
      { title: 'Instagram', uidt: 'SingleLineText' },
      { title: 'TikTok', uidt: 'URL' },
      { title: 'SoundCloud', uidt: 'URL' },
      { title: 'Experience', uidt: 'LongText' },
      { title: 'Support', uidt: 'LongText' },
      { title: 'SubmittedAt', uidt: 'DateTime' },
    ],
  },
  {
    title: 'newsletter',
    envKey: 'NOCODB_TABLE_NEWSLETTER',
    columns: [
      { title: 'Email', uidt: 'Email' },
      { title: 'Source', uidt: 'SingleLineText' },
      { title: 'SubmittedAt', uidt: 'DateTime' },
    ],
  },
  {
    title: 'events',
    envKey: 'NOCODB_TABLE_EVENTS',
    columns: [
      { title: 'Name', uidt: 'SingleLineText' },
      { title: 'Subtitle', uidt: 'SingleLineText' },
      { title: 'StartDate', uidt: 'DateTime' },
      { title: 'EndDate', uidt: 'DateTime' },
      { title: 'Venue', uidt: 'SingleLineText' },
      { title: 'Location', uidt: 'SingleLineText' },
      { title: 'Description', uidt: 'LongText' },
      { title: 'TimeDisplay', uidt: 'SingleLineText' },
      { title: 'TicketStatus', uidt: 'SingleLineText' },
      { title: 'TicketsUrl', uidt: 'URL' },
      {
        title: 'Tags',
        uidt: 'MultiSelect',
        options: ['general', 'house_party', 'launch', 'takeover', 'rooftop'],
      },
      { title: 'Published', uidt: 'Checkbox' },
    ],
  },
];

function readEnv(): { baseUrl: string; token: string; baseId: string } {
  const baseUrl = process.env.NOCODB_URL?.replace(/\/+$/, '');
  const token = process.env.NOCODB_TOKEN;
  const baseId = process.env.NOCODB_BASE_ID;
  if (!baseUrl || !token || !baseId) {
    console.error('Missing env. Required: NOCODB_URL, NOCODB_TOKEN, NOCODB_BASE_ID');
    process.exit(1);
  }
  return { baseUrl, token, baseId };
}

async function api<T>(
  baseUrl: string,
  token: string,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'xc-token': token,
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${path} — ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

interface TableListResponse {
  list: Array<{ id: string; title: string }>;
}

interface TableCreated {
  id: string;
  title: string;
}

async function listExisting(baseUrl: string, token: string, baseId: string) {
  const data = await api<TableListResponse>(
    baseUrl,
    token,
    `/api/v2/meta/bases/${baseId}/tables`,
  );
  return new Map(data.list.map((t) => [t.title, t.id]));
}

async function createTable(
  baseUrl: string,
  token: string,
  baseId: string,
  spec: TableSpec,
): Promise<TableCreated> {
  // NocoDB requires at least one column on create; we pass them all up-front.
  return api<TableCreated>(
    baseUrl,
    token,
    `/api/v2/meta/bases/${baseId}/tables`,
    {
      method: 'POST',
      body: JSON.stringify({
        title: spec.title,
        table_name: spec.title,
        columns: spec.columns.map((c) => {
          const column: Record<string, unknown> = {
            title: c.title,
            column_name: c.title,
            uidt: c.uidt,
          };
          if (c.options && (c.uidt === 'SingleSelect' || c.uidt === 'MultiSelect')) {
            column.colOptions = {
              options: c.options.map((title) => ({ title })),
            };
          }
          return column;
        }),
      }),
    },
  );
}

async function main() {
  const { baseUrl, token, baseId } = readEnv();
  console.log(`→ Connecting to ${baseUrl}`);
  console.log(`→ Base: ${baseId}\n`);

  const existing = await listExisting(baseUrl, token, baseId);
  const out: Record<string, string> = {};

  for (const spec of TABLES) {
    const existingId = existing.get(spec.title);
    if (existingId) {
      console.log(`✓ ${spec.title} (already exists)`);
      out[spec.envKey] = existingId;
      continue;
    }
    const created = await createTable(baseUrl, token, baseId, spec);
    console.log(`+ ${spec.title} → ${created.id}`);
    out[spec.envKey] = created.id;
  }

  console.log('\nPaste these into your .env.local and Vercel env:');
  console.log('────────────────────────────────────────────────');
  for (const [k, v] of Object.entries(out)) console.log(`${k}=${v}`);
  console.log('────────────────────────────────────────────────');
}

main().catch((err) => {
  console.error('\n✗ Setup failed:', err.message);
  process.exit(1);
});
