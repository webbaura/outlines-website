'use client';

import './globals.css';

// Last resort: the root layout itself failed, so this replaces it and must
// render its own <html>/<body>. Deliberately dependency-free (no nav, no
// next/font, no shared components) so it can't fail for the same reason.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Montserrat, system-ui, sans-serif', background: '#000' }}>
        <title>Something went wrong — Outlines</title>
        <main className="min-h-svh flex items-center px-6">
          <div className="max-w-5xl mx-auto w-full">
            <p className="text-sm text-white/40 uppercase tracking-[0.15em] mb-8">Error</p>
            <h1 className="text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
              The music cut out.
            </h1>
            <p className="mt-8 text-white/60 text-lg max-w-xl leading-relaxed">
              Something went wrong on our end. Give it another go.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => unstable_retry()}
                className="inline-flex items-center justify-center text-white px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] border border-white/30 hover:bg-white hover:text-black transition-colors"
              >
                Try again
              </button>
              {/* Plain <a>: a full reload is the point when the app shell is broken. */}
              <a
                href="/"
                className="inline-flex items-center justify-center text-white px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] border border-white/30 hover:bg-white hover:text-black transition-colors"
              >
                Back home
              </a>
            </div>
            {error.digest && (
              <p className="mt-16 text-[11px] text-white/30 tracking-wide">Ref: {error.digest}</p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
