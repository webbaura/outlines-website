// Client-side reCAPTCHA v3 loader + executor.
// Loads the script on demand (not on initial page load), then exposes
// executeRecaptcha(action) which returns a token to send to the server.

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY ?? '';

let loadPromise: Promise<void> | null = null;

export function isRecaptchaConfigured(): boolean {
  return SITE_KEY.length > 0;
}

export function loadRecaptcha(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('recaptcha: window unavailable'));
  }
  if (!SITE_KEY) {
    return Promise.reject(new Error('recaptcha: NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY not set'));
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => resolve());
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!window.grecaptcha) {
        reject(new Error('recaptcha: script loaded but grecaptcha missing'));
        return;
      }
      window.grecaptcha.ready(() => resolve());
    };
    script.onerror = () => reject(new Error('recaptcha: script failed to load'));
    document.head.appendChild(script);
  });
  return loadPromise;
}

export async function executeRecaptcha(action: string): Promise<string> {
  await loadRecaptcha();
  if (!window.grecaptcha) throw new Error('recaptcha: grecaptcha unavailable');
  return window.grecaptcha.execute(SITE_KEY, { action });
}
