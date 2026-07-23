'use client';

import { useMemo, useState } from 'react';
import FormField from './FormField';
import FormTextarea from './FormTextarea';
import UrlList from './UrlList';
import SubmitButton from './SubmitButton';
import Honeypot from './Honeypot';
import RecaptchaNotice from './RecaptchaNotice';
import { useFormSubmit } from '@/lib/useFormSubmit';
import { isRequired, type Field, type FieldKind, type FormConfig } from '@/lib/forms/types';

// HTML input `type` per field kind. Missing entries fall back to 'text'.
// optionalUrl stays 'text' because those inputs (e.g. tiktok) accept
// handles like "@name" as well as URLs.
const INPUT_TYPE: Partial<Record<FieldKind, string>> = {
  email: 'email',
  phone: 'tel',
  url: 'url',
  date: 'date',
};

type Row =
  | { readonly kind: 'grid'; readonly fields: readonly Field[] }
  | { readonly kind: 'single'; readonly field: Field };

// Group consecutive `layout: 'half'` fields into a 2-column grid; everything
// else — longtext, `layout: 'full'` (default), hidden — renders as its own row.
function toRows(fields: readonly Field[]): Row[] {
  const rows: Row[] = [];
  let grid: Field[] = [];
  const flush = () => {
    if (grid.length) {
      rows.push({ kind: 'grid', fields: grid });
      grid = [];
    }
  };
  for (const f of fields) {
    if (f.hidden) continue;
    if (f.kind !== 'longtext' && f.kind !== 'urlList' && f.layout === 'half') {
      grid.push(f);
    } else {
      flush();
      rows.push({ kind: 'single', field: f });
    }
  }
  flush();
  return rows;
}

export default function SchemaForm({ config }: { config: FormConfig }) {
  const [form, setForm] = useState<Record<string, string | string[]>>(() => {
    const out: Record<string, string | string[]> = {};
    for (const f of config.fields) {
      if (f.hidden) continue;
      out[f.key] = f.kind === 'urlList' ? [''] : '';
    }
    return out;
  });

  const { state, fieldErrors, submit, warmCaptcha } = useFormSubmit(config.endpoint, {
    recaptchaAction: config.recaptchaAction,
  });

  const rows = useMemo(() => toRows(config.fields), [config.fields]);
  const gap = config.gap ?? 'sm';

  const onChange =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onListChange = (key: string) => (next: string[]) =>
    setForm((prev) => ({ ...prev, [key]: next }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    await submit({ ...form, _hp: fd.get('_hp') });
  };

  if (state.status === 'success') {
    return (
      <div className={gap === 'lg' ? 'text-center py-16' : 'text-center py-12'}>
        <p className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-4">
          {config.successCopy.title}
        </p>
        <p className="text-white/70 max-w-md mx-auto">{config.successCopy.body}</p>
      </div>
    );
  }

  const submitting = state.status === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={warmCaptcha}
      className={gap === 'lg' ? 'flex flex-col gap-7' : 'flex flex-col gap-6'}
      noValidate
    >
      <Honeypot />

      {rows.map((row, i) => {
        if (row.kind === 'grid') {
          return (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {row.fields.map((field) => (
                <FieldNode
                  key={field.key}
                  field={field}
                  value={(form[field.key] as string) ?? ''}
                  error={fieldErrors[field.key]}
                  onChange={onChange(field.key)}
                  disabled={submitting}
                />
              ))}
            </div>
          );
        }
        const field = row.field;
        if (field.kind === 'urlList') {
          const value = form[field.key];
          const listValue = Array.isArray(value) ? value : [''];
          return (
            <UrlList
              key={i}
              label={field.label}
              name={field.key}
              values={listValue}
              onChange={onListChange(field.key)}
              disabled={submitting}
              required={isRequired(field)}
              error={fieldErrors[field.key]}
              hint={field.hint}
              placeholder={field.placeholder}
              maxItems={field.maxItems}
              addLabel={field.addLabel}
            />
          );
        }
        return (
          <FieldNode
            key={i}
            field={field}
            value={(form[field.key] as string) ?? ''}
            error={fieldErrors[field.key]}
            onChange={onChange(field.key)}
            disabled={submitting}
          />
        );
      })}

      {state.status === 'error' && (
        <p className="text-white/70 text-sm border border-white/15 px-4 py-3" role="alert">
          {state.message}
        </p>
      )}

      <div className={gap === 'lg' ? 'pt-4 flex flex-col gap-4' : 'pt-2 flex flex-col gap-4'}>
        <SubmitButton label={config.submitLabel} loading={submitting} />
        <RecaptchaNotice />
      </div>
    </form>
  );
}

interface NodeProps {
  field: Field;
  value: string;
  error: string | undefined;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function FieldNode({ field, value, error, disabled, onChange }: NodeProps) {
  const required = isRequired(field);
  const common = {
    label: field.label,
    name: field.key,
    required,
    disabled,
    value,
    onChange,
    error,
    placeholder: field.placeholder,
    autoComplete: field.autoComplete,
    hint: field.hint,
  } as const;

  if (field.kind === 'longtext') {
    return <FormTextarea {...common} rows={field.rows ?? 4} />;
  }

  return (
    <FormField
      {...common}
      type={INPUT_TYPE[field.kind] ?? 'text'}
      inputMode={field.kind === 'url' ? 'url' : undefined}
    />
  );
}
