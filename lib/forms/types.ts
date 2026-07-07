// Single source of truth for a form's fields. Consumed by:
//   - the shared API-route handler (lib/forms/handler.ts)
//   - the shared client renderer (components/forms/SchemaForm.tsx)
//   - the NocoDB setup + verify scripts (scripts/*.ts)
//
// Adding a field = one entry in a form config. Removing = delete that entry.

import type { NocoTable } from '@/lib/nocodb';

export type FieldKind =
  | 'text'         // trimmed string
  | 'longtext'     // trimmed string, renders as <textarea>
  | 'email'
  | 'phone'
  | 'url'          // required URL
  | 'optionalUrl'  // may be empty
  | 'date';        // ISO yyyy-mm-dd

export interface Field {
  readonly key: string;         // form state key, e.g. 'fullName'
  readonly column: string;      // NocoDB column, e.g. 'FullName'
  readonly label: string;
  readonly kind: FieldKind;

  // For text/longtext: required defaults to true. optionalUrl is always
  // optional. email/phone/url/date are always required (empty rejected by the
  // validator itself).
  readonly required?: boolean;

  // Not rendered on the client. Used for values that come in via the request
  // body but should never surface as a form input (e.g. newsletter `source`
  // set by <EmailSignup source="…" />). Currently only supported for
  // kind: 'text' with required: false — sanitises with maxLength, falls back
  // to `defaultValue`.
  readonly hidden?: boolean;
  readonly defaultValue?: string;

  // UI hints (ignored for hidden fields).
  readonly autoComplete?: string;
  readonly placeholder?: string;
  readonly hint?: string;
  readonly layout?: 'half' | 'full'; // half = 2-col grid; full = own row
  readonly rows?: number;            // longtext
  readonly maxLength?: number;       // text/longtext
}

export interface SuccessCopy {
  readonly title: string;
  readonly body: string;
}

export interface FormConfig<T extends readonly Field[] = readonly Field[]> {
  readonly endpoint: string;         // POST target
  readonly table: NocoTable;         // NocoDB target
  readonly recaptchaAction: string;
  readonly submitLabel: string;
  readonly successCopy: SuccessCopy;
  readonly fields: T;
  // Visual density hint for SchemaForm. 'lg' = full-page form (more air),
  // 'sm' = modal-embedded (tighter). Defaults to 'sm'.
  readonly gap?: 'sm' | 'lg';
}

// Identity helper. The `const T` type parameter (TS 5+) infers `fields`
// as a readonly tuple of literals, so `typeof form.fields[number]['key']`
// resolves to a literal union at the call site.
export function defineForm<const T extends readonly Field[]>(
  config: FormConfig<T>,
): FormConfig<T> {
  return config;
}

// True unless the field's kind or explicit flag says otherwise. Used by both
// server validation and client rendering so the required-marker matches what
// the server enforces.
export function isRequired(field: Field): boolean {
  if (field.kind === 'optionalUrl') return false;
  if (field.kind === 'text' || field.kind === 'longtext') return field.required ?? true;
  return true;
}
