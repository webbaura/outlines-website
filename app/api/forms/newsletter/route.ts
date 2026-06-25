import { NextResponse } from 'next/server';
import { validators, isLikelyBot } from '@/lib/validation';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { insertRecord } from '@/lib/nocodb';

type NewsletterBody = Record<string, unknown>;

export async function POST(req: Request) {
  let body: NewsletterBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  if (isLikelyBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const captcha = await verifyRecaptcha(body.recaptchaToken, 'newsletter');
  if (!captcha.ok) {
    return NextResponse.json(
      { ok: false, error: 'Verification failed. Please try again.' },
      { status: 400 },
    );
  }

  const email = validators.email(body.email);
  if (!email.ok) {
    return NextResponse.json(
      { ok: false, fieldErrors: { email: email.error } },
      { status: 400 },
    );
  }

  const source = typeof body.source === 'string' && body.source.length <= 64
    ? body.source
    : 'unknown';

  const result = await insertRecord('newsletter', {
    Email: email.value,
    Source: source,
    SubmittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: 'Could not save submission' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
