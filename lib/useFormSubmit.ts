'use client';

import { useState, useCallback } from 'react';
import { loadRecaptcha, executeRecaptcha } from '@/lib/recaptcha-client';

type State =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

type SubmitResult =
  | { ok: true }
  | { ok: false; error?: string; fieldErrors?: Record<string, string> };

interface Options {
  recaptchaAction?: string;
}

export function useFormSubmit(endpoint: string, options: Options = {}) {
  const { recaptchaAction } = options;
  const [state, setState] = useState<State>({ status: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Call from the form's onFocus to preload the reCAPTCHA script the moment
  // a user starts filling the form — so by the time they hit submit the
  // token issues instantly (no perceptible delay).
  const warmCaptcha = useCallback(() => {
    if (recaptchaAction) {
      loadRecaptcha().catch(() => {
        // Silent — submit will retry and surface a friendly error if needed.
      });
    }
  }, [recaptchaAction]);

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      setState({ status: 'submitting' });
      setFieldErrors({});

      let recaptchaToken: string | undefined;
      if (recaptchaAction) {
        try {
          recaptchaToken = await executeRecaptcha(recaptchaAction);
        } catch {
          setState({
            status: 'error',
            message: 'Verification failed. Please try again.',
          });
          return false;
        }
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, recaptchaToken }),
        });
        const data = (await res.json().catch(() => ({}))) as SubmitResult;
        if (!res.ok || !data.ok) {
          if ('fieldErrors' in data && data.fieldErrors) setFieldErrors(data.fieldErrors);
          setState({
            status: 'error',
            message:
              ('error' in data && data.error) ||
              'Something went wrong. Please try again.',
          });
          return false;
        }
        setState({ status: 'success' });
        return true;
      } catch {
        setState({ status: 'error', message: 'Network error. Please try again.' });
        return false;
      }
    },
    [endpoint, recaptchaAction],
  );

  return { state, fieldErrors, submit, warmCaptcha };
}
