'use client';

import { ArrowRight } from 'lucide-react';

type Props = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
};

export default function SubmitButton({ label, loading, disabled }: Props) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="group bg-white text-black px-8 py-4 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Sending…' : label}
      {!loading && (
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}
