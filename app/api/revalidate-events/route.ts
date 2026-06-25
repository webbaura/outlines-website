// On-demand revalidation for the events cache. Hit this endpoint to invalidate
// the cached NocoDB response + force the home/events pages to regenerate on
// the next request. Without this, an event edit in NocoDB takes up to the
// page-level `revalidate` window (5 min) to appear on the live site.
//
// Wire to a NocoDB webhook (events table: insert/update/delete) so updates
// flow instantly:
//   URL:     https://outlinesgroup.com/api/revalidate-events
//   Method:  POST
//   Headers: Authorization: Bearer <REVALIDATE_SECRET>

import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

function authorize(req: Request): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false; // Fail-closed if not configured.
  const auth = req.headers.get('authorization');
  if (auth === `Bearer ${secret}`) return true;
  // Also accept ?secret=... for one-off browser/manual triggers.
  const url = new URL(req.url);
  return url.searchParams.get('secret') === secret;
}

function doRevalidate() {
  // Next 16 requires a second arg. `{ expire: 0 }` forces immediate expiration,
  // which is what we want for webhook-driven invalidation (vs. the default
  // stale-while-revalidate semantics of `'max'`).
  revalidateTag('events', { expire: 0 });
  revalidatePath('/');
  revalidatePath('/events');
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  doRevalidate();
  return NextResponse.json({
    ok: true,
    revalidated: { tag: 'events', paths: ['/', '/events'] },
    at: new Date().toISOString(),
  });
}

// GET form is for manual testing — POST is the production path.
export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  doRevalidate();
  return NextResponse.json({
    ok: true,
    revalidated: { tag: 'events', paths: ['/', '/events'] },
    at: new Date().toISOString(),
  });
}
