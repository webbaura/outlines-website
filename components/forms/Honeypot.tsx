// Visually hidden field that real users won't fill. Bots fill everything.
// Paired with `isLikelyBot` server-side in lib/validation.ts.
export default function Honeypot() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
    >
      <label>
        Leave this field empty
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
