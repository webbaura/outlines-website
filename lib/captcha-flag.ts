// Single source of truth for the captcha on/off toggle.
//
// Default: enabled. Production stays protected if the operator forgets to
// set the env var. To disable, set `NEXT_PUBLIC_CAPTCHA_ENABLED=false` in
// .env.local (or in the deployment env) and rebuild — the flag is inlined
// at build time on the client.
//
// Server code can read the same env (Next.js exposes NEXT_PUBLIC_* to both
// runtimes), so one flag controls both sides.

export function isCaptchaEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CAPTCHA_ENABLED !== 'false';
}
