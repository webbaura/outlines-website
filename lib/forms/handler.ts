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
    const tag = `[forms:${config.table}]`;
    try {
      let body: Record<string, unknown>;
      try {
        body = await req.json();
      } catch {
        console.warn(`${tag} invalid JSON body`);
        return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
      }

      // Honeypot: bots fill every field. Accept silently so we don't tip them off.
      if (isLikelyBot(body)) {
        console.warn(`${tag} honeypot triggered — silently accepting`);
        return NextResponse.json({ ok: true });
      }

      const captcha = await verifyRecaptcha(body.recaptchaToken, config.recaptchaAction);
      if (!captcha.ok) {
        console.warn(`${tag} recaptcha failed action=${config.recaptchaAction}`);
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
        console.warn(`${tag} field errors ${JSON.stringify(fieldErrors)}`);
        return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
      }

      record.SubmittedAt = new Date().toISOString();

      const result = await insertRecord(config.table, record);
      if (!result.ok) {
        console.error(
          `${tag} insert failed endpoint=${config.endpoint} error=${result.error}`,
        );
        return NextResponse.json({ ok: false, error: 'Could not save submission' }, { status: 500 });
      }
      console.log(`${tag} insert ok`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error(`${tag} unhandled error`, err);
      return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
    }
  };
}
