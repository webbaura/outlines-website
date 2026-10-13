'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import StatusPage, { statusButtonClass } from '@/components/StatusPage';

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

// Body of the route-level error boundaries (app/error.tsx and
// app/(site)/error.tsx). Server errors arrive with a generic message and a
// `digest`; we show the digest as a reference that matches the Vercel log.
export default function ErrorView({ error, unstable_retry }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      eyebrow="Error"
      title="The music cut out."
      body="Something went wrong on our end. Give it another go, or head back home."
      actions={
        <>
          <button type="button" onClick={() => unstable_retry()} className={statusButtonClass}>
            Try again
          </button>
          <Link href="/" className={statusButtonClass}>Back home</Link>
        </>
      }
      footnote={error.digest ? `Ref: ${error.digest}` : undefined}
    />
  );
}
