// Lightweight schema validation. No external dep — keeps bundle slim.
// Each validator returns { ok: true, value } or { ok: false, error }.

export type FieldResult<T> = { ok: true; value: T } | { ok: false; error: string };

const TRIM_EMPTY = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export const validators = {
  required(label: string, v: unknown): FieldResult<string> {
    const s = TRIM_EMPTY(v);
    return s ? { ok: true, value: s } : { ok: false, error: `${label} is required` };
  },

  email(v: unknown): FieldResult<string> {
    const s = TRIM_EMPTY(v).toLowerCase();
    // Pragmatic: covers >99% of real-world emails without false negatives.
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(s) ? { ok: true, value: s } : { ok: false, error: 'Enter a valid email' };
  },

  phone(v: unknown): FieldResult<string> {
    const s = TRIM_EMPTY(v).replace(/[\s()-]/g, '');
    // Accept +country prefix and 7–15 digits (E.164 range).
    const re = /^\+?\d{7,15}$/;
    return re.test(s) ? { ok: true, value: s } : { ok: false, error: 'Enter a valid phone number' };
  },

  url(v: unknown): FieldResult<string> {
    const s = TRIM_EMPTY(v);
    if (!s) return { ok: false, error: 'URL is required' };
    try {
      const u = new URL(s.startsWith('http') ? s : `https://${s}`);
      return { ok: true, value: u.toString() };
    } catch {
      return { ok: false, error: 'Enter a valid URL' };
    }
  },

  optionalUrl(v: unknown): FieldResult<string> {
    const s = TRIM_EMPTY(v);
    if (!s) return { ok: true, value: '' };
    return validators.url(s);
  },

  isoDate(v: unknown): FieldResult<string> {
    const s = TRIM_EMPTY(v);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      return { ok: false, error: 'Enter a valid date' };
    }
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return { ok: false, error: 'Enter a valid date' };
    return { ok: true, value: s };
  },

  text(label: string, v: unknown, max = 2000): FieldResult<string> {
    const s = TRIM_EMPTY(v);
    if (!s) return { ok: false, error: `${label} is required` };
    if (s.length > max) return { ok: false, error: `${label} too long` };
    return { ok: true, value: s };
  },
};

// Honeypot: bots fill every field. If `_hp` has content, silently reject.
export function isLikelyBot(body: Record<string, unknown>): boolean {
  const hp = body._hp;
  return typeof hp === 'string' && hp.trim().length > 0;
}
