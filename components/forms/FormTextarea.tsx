'use client';

import { type TextareaHTMLAttributes, type ReactNode } from 'react';

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
};

export default function FormTextarea({ label, name, error, hint, required, rows = 4, ...rest }: Props) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-[family-name:var(--font-montserrat)] text-white/60 uppercase tracking-[0.12em]"
      >
        {label}
        {required && <span className="text-white/30 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="bg-transparent border border-white/20 text-white placeholder:text-white/25 px-4 py-3 text-base focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50 resize-y"
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-white/40 text-xs leading-relaxed">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-white/70 text-xs">{error}</p>
      )}
    </div>
  );
}
