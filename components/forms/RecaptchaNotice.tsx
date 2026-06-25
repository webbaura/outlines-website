// Per Google ToS, when the v3 badge is hidden you must show this attribution.
// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge
//
// When captcha is disabled via NEXT_PUBLIC_CAPTCHA_ENABLED=false, reCAPTCHA
// isn't actually loaded — so the notice is unnecessary and we render nothing.

import { isCaptchaEnabled } from '@/lib/captcha-flag';

export default function RecaptchaNotice() {
  if (!isCaptchaEnabled()) return null;

  return (
    <p className="text-[10px] font-[family-name:var(--font-montserrat)] text-white/30 leading-relaxed text-center">
      Protected by reCAPTCHA. Google{' '}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-white/60"
      >
        Privacy
      </a>{' '}
      &{' '}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-white/60"
      >
        Terms
      </a>
      .
    </p>
  );
}
