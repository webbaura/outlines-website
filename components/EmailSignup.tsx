'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { loadRecaptcha, executeRecaptcha } from '@/lib/recaptcha-client';
import { isCaptchaEnabled } from '@/lib/captcha-flag';
import { newsletterForm } from '@/lib/forms/newsletter';
import RecaptchaNotice from './forms/RecaptchaNotice';

interface Props {
  source?: string;
}

type State =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export default function EmailSignup({ source = 'unknown' }: Props) {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.kind === 'submitting') return;
    setState({ kind: 'submitting' });

    let recaptchaToken: string | undefined;
    if (isCaptchaEnabled()) {
      try {
        recaptchaToken = await executeRecaptcha(newsletterForm.recaptchaAction);
      } catch {
        setState({ kind: 'error', message: 'Verification failed. Try again.' });
        return;
      }
    }

    try {
      const res = await fetch(newsletterForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, recaptchaToken, _hp: hp }),
      });
      const data = (await res.json()) as
        | { ok: true }
        | { ok: false; error?: string; fieldErrors?: Record<string, string> };

      if (data.ok) {
        setState({ kind: 'success' });
        setEmail('');
        return;
      }
      const message =
        data.fieldErrors?.email ?? data.error ?? 'Something went wrong. Try again.';
      setState({ kind: 'error', message });
    } catch {
      setState({ kind: 'error', message: 'Network error. Try again.' });
    }
  };

  if (state.kind === 'success') {
    return (
      <div className="text-center">
        <p className="text-white/60 text-sm font-[family-name:var(--font-montserrat)]">
          You&apos;re in. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  const isSubmitting = state.kind === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => { if (isCaptchaEnabled()) loadRecaptcha().catch(() => {}); }}
      className="max-w-md mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="email-signup" className="sr-only">
          Email address
        </label>
        <input
          id="email-signup"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={isSubmitting}
          className="flex-1 bg-transparent border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-white/50 transition-colors disabled:opacity-50"
        />
        {/* Honeypot — hidden from users, sniffed by bots. */}
        <input
          type="text"
          name="_hp"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black px-6 py-3 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending…' : 'Stay in the loop'}
          {!isSubmitting && <ArrowRight size={16} />}
        </button>
      </div>
      {state.kind === 'error' && (
        <p className="mt-3 text-xs font-[family-name:var(--font-montserrat)] text-red-400/80 text-center">
          {state.message}
        </p>
      )}
      <div className="mt-4">
        <RecaptchaNotice />
      </div>
    </form>
  );
}
