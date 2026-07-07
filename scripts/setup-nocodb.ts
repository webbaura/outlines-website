/**
 * NocoDB table bootstrap.
 *
 * Creates the tables this site relies on. Form tables (djs, house_party_guests,
 * house_party_hosts, newsletter) are derived from the form configs in
 * lib/forms/* — one source of truth for column names. The events table isn't
 * a form, so its schema stays inline here.
 *
 * Idempotent: skips a table if a table with the same title already exists in
 * the base. Never alters or deletes existing tables.
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

import { TABLE_META, type NocoTable } from '../lib/nocodb';
import { FORM_CONFIGS } from '../lib/forms';
import type { Field, FieldKind, FormConfig } from '../lib/forms/types';

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
  envKey: string;
}

// Field kind → NocoDB column type. Used to derive form tables from configs.
const KIND_TO_UIDT: Record<FieldKind, UIType> = {
  text: 'SingleLineText',
  longtext: 'LongText',
  email: 'Email',
  phone: 'PhoneNumber',
  url: 'URL',
  optionalUrl: 'URL',
  date: 'Date',
};

function fieldColumn(field: Field): ColumnSpec {
  return { title: field.column, uidt: KIND_TO_UIDT[field.kind] };
}

function formToTableSpec(config: FormConfig): TableSpec {
  const meta = TABLE_META[config.table];
  return {
    title: meta.title,
    envKey: meta.envKey,
    columns: [
      ...config.fields.map(fieldColumn),
      { title: 'SubmittedAt', uidt: 'DateTime' },
    ],
  };
}

// events is not driven by a form config — declared inline.
const EVENTS_META = TABLE_META['events' as NocoTable];
const EVENTS_TABLE: TableSpec = {
  title: EVENTS_META.title,
  envKey: EVENTS_META.envKey,
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
};

const TABLES: TableSpec[] = [
  ...FORM_CONFIGS.map(formToTableSpec),
  EVENTS_TABLE,
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
