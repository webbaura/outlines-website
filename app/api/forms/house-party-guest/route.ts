import { NextResponse } from 'next/server';
import { validators, isLikelyBot } from '@/lib/validation';
import { insertRecord } from '@/lib/nocodb';

// Fields here must match NocoDB column names exactly. See README.
type GuestBody = Record<string, unknown>;

export async function POST(req: Request) {
  let body: GuestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  if (isLikelyBot(body)) {
    // Silently accept — don't tip off the bot.
    return NextResponse.json({ ok: true });
  }

  const name = validators.required('Name', body.name);
  const phone = validators.phone(body.phone);
  const email = validators.email(body.email);
  const instagram = validators.required('Instagram', body.instagram);

  const fieldErrors: Record<string, string> = {};
  if (!name.ok) fieldErrors.name = name.error;
  if (!phone.ok) fieldErrors.phone = phone.error;
  if (!email.ok) fieldErrors.email = email.error;
  if (!instagram.ok) fieldErrors.instagram = instagram.error;

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const result = await insertRecord('guests', {
    Name: (name as { value: string }).value,
    Phone: (phone as { value: string }).value,
    Email: (email as { value: string }).value,
    Instagram: (instagram as { value: string }).value,
    SubmittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: 'Could not save submission' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
