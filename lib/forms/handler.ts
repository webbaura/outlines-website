import { NextResponse } from 'next/server';
import { isLikelyBot } from '@/lib/validation';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { insertRecord } from '@/lib/nocodb';
import type { FormConfig } from './types';
import { validateField } from './validate';

// Builds the POST handler for a form config. The shape of the request/response
// exactly matches the hand-written routes it replaces — same body keys, same
// { ok, error, fieldErrors } response, same status codes.
export function handleFormSubmit(config: FormConfig) {
  return async function POST(req: Request): Promise<Response> {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
    }

    // Honeypot: bots fill every field. Accept silently so we don't tip them off.
    if (isLikelyBot(body)) {
      return NextResponse.json({ ok: true });
    }

    const captcha = await verifyRecaptcha(body.recaptchaToken, config.recaptchaAction);
    if (!captcha.ok) {
      return NextResponse.json(
        { ok: false, error: 'Verification failed. Please try again.' },
        { status: 400 },
      );
    }

    const fieldErrors: Record<string, string> = {};
    const record: Record<string, unknown> = {};

    for (const field of config.fields) {
      const result = validateField(field, body[field.key]);
      if (!result.ok) {
        fieldErrors[field.key] = result.error;
      } else {
        record[field.column] = result.value;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
    }

    record.SubmittedAt = new Date().toISOString();

    const result = await insertRecord(config.table, record);
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: 'Could not save submission' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  };
}
