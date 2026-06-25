import { NextResponse } from 'next/server';
import { validators, isLikelyBot } from '@/lib/validation';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { insertRecord } from '@/lib/nocodb';

type HostBody = Record<string, unknown>;

export async function POST(req: Request) {
  let body: HostBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  if (isLikelyBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const captcha = await verifyRecaptcha(body.recaptchaToken, 'house_party_host');
  if (!captcha.ok) {
    return NextResponse.json(
      { ok: false, error: 'Verification failed. Please try again.' },
      { status: 400 },
    );
  }

  const name = validators.required('Name', body.name);
  const phone = validators.phone(body.phone);
  const email = validators.email(body.email);

  const fieldErrors: Record<string, string> = {};
  if (!name.ok) fieldErrors.name = name.error;
  if (!phone.ok) fieldErrors.phone = phone.error;
  if (!email.ok) fieldErrors.email = email.error;

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const result = await insertRecord('hosts', {
    Name: (name as { value: string }).value,
    Phone: (phone as { value: string }).value,
    Email: (email as { value: string }).value,
    SubmittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: 'Could not save submission' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
