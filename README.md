# Outlines Website

Next.js 16 (App Router) + Tailwind v4. Pure monochrome theme. Deployed on Vercel.

## Development

```bash
npm install
cp .env.example .env.local   # then fill in NocoDB values
npm run dev
```

Open <http://localhost:3000>.

## Structure

```
app/
  api/forms/                 # Form submission endpoints (server-only)
    house-party-guest/
    house-party-host/
    dj/
  house-party/               # /house-party — guest + host CTAs
  djs/                       # /djs — DJ application form
  events/  vision/           # existing pages
components/
  forms/                     # Reusable form primitives
  Hero.tsx                   # Home hero
  Modal.tsx                  # Accessible modal (focus trap, esc, click-out)
  PortraitVideo.tsx          # 9:16 video (direct file OR iframe embed)
lib/
  nocodb.ts                  # NocoDB REST client (server-only)
  validation.ts              # Shared field validators + honeypot check
  useFormSubmit.ts           # Client hook: submission + state machine
```

## Form backend (NocoDB)

Forms write to **NocoDB Cloud** (free tier). The Next.js API routes are the only
thing that talks to NocoDB — the token never reaches the browser.

### One-time setup

1. Create a free account at <https://app.nocodb.com>.
2. Create a new **base** (workspace). Suggested name: `Outlines`.
3. **API token** — Account menu (top-right) → *Tokens* → *Create new token*.
   Copy it once; you can't see it again.
4. **Base ID** — Open the base; in the URL, the segment after `/nc/` is the base ID.
5. Run the bootstrap script — it creates all 3 tables with the right columns and
   prints the env var lines for you:

```bash
NOCODB_URL=https://app.nocodb.com \
NOCODB_TOKEN=<api-token> \
NOCODB_BASE_ID=<base-id> \
npm run setup:nocodb
```

The script is idempotent: rerunning it skips tables that already exist.

### Table schema (what the script creates)

Form tables are derived from the configs in `lib/forms/*.ts` — one source of
truth. To add or remove a field:

1. Edit the field list in the relevant form config (e.g. `lib/forms/dj.ts`).
2. Add/remove the column in NocoDB (either manually, or re-run
   `npm run setup:nocodb` — it only creates missing tables, never alters
   existing ones).
3. Run `npm run verify:nocodb` to confirm the code and NocoDB agree.

The client renderer (`SchemaForm`), the API route handler, and the setup
script all read from the same config, so a field appears everywhere at once.

Current tables (created by the script):

**`house_party_guests`** — `Name`, `Phone`, `Email`, `Instagram`, `SubmittedAt`
**`house_party_hosts`** — `Name`, `Phone`, `Email`, `SubmittedAt`
**`djs`** — `FullName`, `DJName`, `DOB`, `Email`, `Phone`, `Genres`, `Instagram`,
`TikTok`, `SoundCloud`, `Experience`, `Support`, `SubmittedAt`
**`newsletter`** — `Email`, `Source`, `SubmittedAt`

### Environment variables

Set in `.env.local` for development, and in Vercel → Project → Settings →
Environment Variables for production.

```env
NOCODB_URL=https://app.nocodb.com
NOCODB_TOKEN=<api-token>
NOCODB_TABLE_HOUSE_PARTY_GUESTS=<table-id>
NOCODB_TABLE_HOUSE_PARTY_HOSTS=<table-id>
NOCODB_TABLE_DJS=<table-id>
```

### API requirements summary

What the integration relies on, in one place:

- **Endpoint**: `POST {NOCODB_URL}/api/v2/tables/{tableId}/records`
- **Auth header**: `xc-token: {NOCODB_TOKEN}`
- **Content-Type**: `application/json`
- **Body**: a flat object whose keys exactly match column names listed above
- **Success**: any 2xx response — body ignored
- **Failure**: anything else; the route returns a generic 500 to the client and
  logs the upstream body server-side

If you self-host NocoDB later, swap `NOCODB_URL` only — the rest works identically.

## Adding portrait videos to /house-party

Edit `app/house-party/page.tsx`. The `videos` array supports either a direct
file or an embed URL:

```ts
const videos: Reel[] = [
  { src: '/videos/house-1.mp4', caption: 'Last night, Fitzroy.' },
  { embedUrl: 'https://player.vimeo.com/video/123456789', caption: 'Rooftop, Brunswick.' },
];
```

Direct MP4s go in `public/videos/`. CSP already allows Vimeo, YouTube, and
Drive iframe sources (see `next.config.ts`).

## Deployment

Push to `main` → Vercel deploys automatically. First deploy: add the env vars
above before pushing, or the API routes will 500 on submit.

## Stack

- Next.js 16, React 19, Tailwind v4
- TypeScript strict
- Montserrat (next/font)
- lucide-react icons
- NocoDB Cloud (form backend)
