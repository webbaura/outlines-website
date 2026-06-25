// Server-side Google reCAPTCHA v3 verifier.
// Token comes from the client (grecaptcha.execute). We POST to siteverify
// with the secret + token, check success, score, and that the action matches.

const SCORE_THRESHOLD = 0.5;

interface SiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export type RecaptchaResult =
  | { ok: true; score: number }
  | { ok: false; reason: string };

export async function verifyRecaptcha(
  token: unknown,
  expectedAction: string,
): Promise<RecaptchaResult> {
  if (typeof token !== 'string' || token.length === 0) {
    return { ok: false, reason: 'missing-token' };
  }

  const secret = process.env.GOOGLE_CAPTCHA_SECRET_KEY;
  if (!secret) {
    // Fail-closed: if the server isn't configured, never trust the request.
    console.error('[recaptcha] GOOGLE_CAPTCHA_SECRET_KEY not set');
    return { ok: false, reason: 'server-misconfigured' };
  }

  let data: SiteVerifyResponse;
  try {
    const params = new URLSearchParams({ secret, response: token });
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      cache: 'no-store',
    });
    data = (await res.json()) as SiteVerifyResponse;
  } catch (err) {
    console.error('[recaptcha] siteverify request failed:', err);
    return { ok: false, reason: 'network' };
  }

  if (!data.success) {
    return { ok: false, reason: data['error-codes']?.join(',') ?? 'failed' };
  }
  if (data.action && data.action !== expectedAction) {
    return { ok: false, reason: `action-mismatch:${data.action}` };
  }
  const score = data.score ?? 0;
  if (score < SCORE_THRESHOLD) {
    return { ok: false, reason: `low-score:${score}` };
  }
  return { ok: true, score };
}
