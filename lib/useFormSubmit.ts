'use client';

import { useState, useCallback } from 'react';

type State =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

type SubmitResult =
  | { ok: true }
  | { ok: false; error?: string; fieldErrors?: Record<string, string> };

export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      setState({ status: 'submitting' });
      setFieldErrors({});
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
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
    [endpoint],
  );

  return { state, fieldErrors, submit };
}
