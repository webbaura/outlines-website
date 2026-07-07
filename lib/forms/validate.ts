import { validators, type FieldResult } from '@/lib/validation';
import type { Field } from './types';

export function validateField(field: Field, value: unknown): FieldResult<string> {
  // Hidden optional short text: sanitise, don't error. Used for values that
  // travel in the body but aren't user-facing form inputs (e.g. newsletter
  // `source`). We accept any string up to maxLength; anything else falls
  // back to `defaultValue`.
  if (field.hidden && field.kind === 'text' && field.required === false) {
    const max = field.maxLength ?? 64;
    const s =
      typeof value === 'string' && value.length <= max
        ? value
        : field.defaultValue ?? '';
    return { ok: true, value: s };
  }

  switch (field.kind) {
    case 'text': {
      if (field.required === false) {
        const s = typeof value === 'string' ? value.trim() : '';
        return { ok: true, value: s };
      }
      return validators.required(field.label, value);
    }
    case 'longtext':
      return validators.text(field.label, value, field.maxLength ?? 4000);
    case 'email':
      return validators.email(value);
    case 'phone':
      return validators.phone(value);
    case 'url':
      return validators.url(value);
    case 'optionalUrl':
      return validators.optionalUrl(value);
    case 'date':
      return validators.isoDate(value);
  }
}
