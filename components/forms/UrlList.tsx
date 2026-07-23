'use client';

import { type ReactNode } from 'react';
import { Plus, X } from 'lucide-react';

type Props = {
  label: string;
  name: string;
  values: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  placeholder?: string;
  maxItems?: number;
  addLabel?: string;
};

export default function UrlList({
  label,
  name,
  values,
  onChange,
  disabled,
  required,
  error,
  hint,
  placeholder,
  maxItems = 20,
  addLabel = 'Add another',
}: Props) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const rows = values.length === 0 ? [''] : values;
  const atMax = rows.length >= maxItems;

  const setAt = (i: number, v: string) => {
    const next = rows.slice();
    next[i] = v;
    onChange(next);
  };

  const removeAt = (i: number) => {
    if (rows.length <= 1) {
      onChange(['']);
      return;
    }
    onChange(rows.filter((_, idx) => idx !== i));
  };

  const addOne = () => {
    if (atMax) return;
    onChange([...rows, '']);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`${id}-0`}
        className="text-xs font-[family-name:var(--font-montserrat)] text-white/60 uppercase tracking-[0.12em]"
      >
        {label}
        {required && <span className="text-white/30 ml-1">*</span>}
      </label>

      <div className="flex flex-col gap-3">
        {rows.map((v, i) => {
          const canRemove = rows.length > 1 || v !== '';
          return (
            <div key={i} className="flex items-center gap-3">
              <input
                id={`${id}-${i}`}
                name={`${name}[${i}]`}
                type="url"
                inputMode="url"
                value={v}
                onChange={(e) => setAt(i, e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                aria-invalid={i === 0 ? !!error : undefined}
                aria-describedby={i === 0 ? describedBy : undefined}
                className="flex-1 bg-transparent border-b border-white/20 text-white placeholder:text-white/25 px-0 py-3 text-base focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                disabled={disabled || !canRemove}
                aria-label={`Remove link ${i + 1}`}
                className="text-white/40 hover:text-white/90 transition-colors disabled:opacity-20 disabled:hover:text-white/40 p-1"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addOne}
        disabled={disabled || atMax}
        className="self-start mt-3 inline-flex items-center gap-2 text-xs font-[family-name:var(--font-montserrat)] text-white/60 hover:text-white uppercase tracking-[0.12em] transition-colors disabled:opacity-40 disabled:hover:text-white/60"
      >
        <Plus size={14} strokeWidth={2} />
        {addLabel}
      </button>

      {hint && !error && (
        <p id={`${id}-hint`} className="text-white/40 text-xs leading-relaxed mt-1">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-white/70 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
