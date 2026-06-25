import { NextResponse } from 'next/server';
import { validators, isLikelyBot } from '@/lib/validation';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { insertRecord } from '@/lib/nocodb';

type DjBody = Record<string, unknown>;

export async function POST(req: Request) {
  let body: DjBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  if (isLikelyBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const captcha = await verifyRecaptcha(body.recaptchaToken, 'dj_application');
  if (!captcha.ok) {
    return NextResponse.json(
      { ok: false, error: 'Verification failed. Please try again.' },
      { status: 400 },
    );
  }

  const fullName = validators.required('Full name', body.fullName);
  const djName = validators.required('DJ name', body.djName);
  const dob = validators.isoDate(body.dob);
  const email = validators.email(body.email);
  const phone = validators.phone(body.phone);
  const genres = validators.required('Genres', body.genres);
  const instagram = validators.required('Instagram', body.instagram);
  const tiktok = validators.optionalUrl(body.tiktok);
  const soundcloud = validators.url(body.soundcloud);
  const experience = validators.text('Previous experience', body.experience, 4000);
  const support = validators.text('How can you support', body.support, 4000);

  const fieldErrors: Record<string, string> = {};
  if (!fullName.ok) fieldErrors.fullName = fullName.error;
  if (!djName.ok) fieldErrors.djName = djName.error;
  if (!dob.ok) fieldErrors.dob = dob.error;
  if (!email.ok) fieldErrors.email = email.error;
  if (!phone.ok) fieldErrors.phone = phone.error;
  if (!genres.ok) fieldErrors.genres = genres.error;
  if (!instagram.ok) fieldErrors.instagram = instagram.error;
  if (!tiktok.ok) fieldErrors.tiktok = tiktok.error;
  if (!soundcloud.ok) fieldErrors.soundcloud = soundcloud.error;
  if (!experience.ok) fieldErrors.experience = experience.error;
  if (!support.ok) fieldErrors.support = support.error;

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  // Type narrowing — all validators returned ok above.
  const value = <T>(r: { ok: true; value: T } | { ok: false; error: string }): T => {
    if (!r.ok) throw new Error('unreachable');
    return r.value;
  };

  const result = await insertRecord('djs', {
    FullName: value(fullName),
    DJName: value(djName),
    DOB: value(dob),
    Email: value(email),
    Phone: value(phone),
    Genres: value(genres),
    Instagram: value(instagram),
    TikTok: value(tiktok),
    SoundCloud: value(soundcloud),
    Experience: value(experience),
    Support: value(support),
    SubmittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: 'Could not save submission' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
