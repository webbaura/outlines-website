/**
 * NocoDB schema drift check.
 *
 * Read-only. Fetches every configured form table's metadata and compares its
 * columns against what the code expects. Reports two directions:
 *   - MISSING: code will write to this column, but it's not in NocoDB (data drops)
 *   - EXTRA:   NocoDB has this column, code never writes to it (harmless, but flagged)
 *
 * Does not create, alter, or delete anything. Safe to run in CI or pre-deploy.
 *
 * Usage:
 *   Reads env vars from your shell (or .env.local via `dotenv -e`).
 *   Requires: NOCODB_URL, NOCODB_TOKEN, and each NOCODB_TABLE_* var used below.
 *
 *   npx tsx scripts/verify-nocodb.ts
 */

import { TABLE_META, type NocoTable } from '../lib/nocodb';
import { FORM_CONFIGS } from '../lib/forms';
import type { FormConfig } from '../lib/forms/types';

// NocoDB adds these system columns to every table. They're not written by the
// app, so we filter them out when reporting "extras."
const SYSTEM_COLUMN_TITLES = new Set([
  'Id',
  'CreatedAt',
  'UpdatedAt',
  'nc_created_at',
  'nc_updated_at',
  'nc_created_by',
  'nc_updated_by',
  'CreatedBy',
  'UpdatedBy',
]);

interface Column {
  title: string;
  system?: boolean;
}

interface TableMetaResponse {
  columns: Column[];
}

function readEnv(): { baseUrl: string; token: string } {
  const baseUrl = process.env.NOCODB_URL?.replace(/\/+$/, '');
  const token = process.env.NOCODB_TOKEN;
  if (!baseUrl || !token) {
    console.error('Missing env. Required: NOCODB_URL, NOCODB_TOKEN');
    process.exit(1);
  }
  return { baseUrl, token };
}

async function fetchColumns(
  baseUrl: string,
  token: string,
  tableId: string,
): Promise<string[]> {
  const res = await fetch(`${baseUrl}/api/v2/meta/tables/${tableId}`, {
    headers: { 'xc-token': token },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} — ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as TableMetaResponse;
  return data.columns
    .filter((c) => !c.system && !SYSTEM_COLUMN_TITLES.has(c.title))
    .map((c) => c.title);
}

function expectedColumns(config: FormConfig): string[] {
  return [...config.fields.map((f) => f.column), 'SubmittedAt'];
}

async function verifyOne(
  baseUrl: string,
  token: string,
  config: FormConfig,
): Promise<{ ok: boolean; label: string }> {
  const meta = TABLE_META[config.table as NocoTable];
  const tableId = process.env[meta.envKey];
  if (!tableId) {
    console.log(`✗ ${meta.title}: env var ${meta.envKey} not set`);
    return { ok: false, label: meta.title };
  }

  let actual: string[];
  try {
    actual = await fetchColumns(baseUrl, token, tableId);
  } catch (err) {
    console.log(`✗ ${meta.title}: fetch failed — ${(err as Error).message}`);
    return { ok: false, label: meta.title };
  }

  const expected = expectedColumns(config);
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);

  const missing = expected.filter((c) => !actualSet.has(c));
  const extra = actual.filter((c) => !expectedSet.has(c));

  if (missing.length === 0 && extra.length === 0) {
    console.log(`✓ ${meta.title}: matched (${expected.length} columns)`);
    return { ok: true, label: meta.title };
  }

  // Missing = hard fail (writes silently drop). Extra = warning (code
  // ignores the column, but it's a signal that schema and code have drifted).
  const marker = missing.length ? '✗' : '!';
  console.log(`\n${marker} ${meta.title}`);
  if (missing.length) {
    console.log(`    MISSING in NocoDB (writes will drop): ${missing.join(', ')}`);
  }
  if (extra.length) {
    console.log(`    EXTRA in NocoDB (not written by code): ${extra.join(', ')}`);
  }
  return { ok: missing.length === 0 && extra.length === 0, label: meta.title };
}

async function main() {
  const { baseUrl, token } = readEnv();
  console.log(`→ Verifying against ${baseUrl}\n`);

  const results = await Promise.all(
    FORM_CONFIGS.map((c) => verifyOne(baseUrl, token, c)),
  );

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} tables clean.`);
  if (failed.length > 0) {
    console.log(`Drift: ${failed.map((r) => r.label).join(', ')}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('\n✗ Verify failed:', err.message);
  process.exit(1);
});
