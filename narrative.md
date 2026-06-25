# Outlines — Site Narrative

## Who they are
Outlines is a Melbourne music events company. They put on house music events. That's it. No pretence, no brand-speak — just good music, good people, good nights out. The logo is concentric rings (white on black), which doubles as the visual identity's core motif.

## The feeling
Walking into a dark room where the music is already going. You don't need to be told it's good — you can feel it. The site should carry that same energy: confident, unhurried, deliberate. Every element earns its place through restraint, not addition.

Reference world: Untitled Group's editorial minimalism. Big type. Massive negative space. Let the content breathe like a set that builds slowly.

## Design system

### Colour
Pure monochrome. #000000 background, #ffffff text. Nothing else. No greys for "variation" — use opacity and font-weight to create hierarchy. If something needs emphasis, make it bolder or bigger, not coloured.

### Typography
- **Space Grotesk** — headings. Geometric, modern, slightly industrial. Feels like it belongs on a flyer.
- **Space Mono** — accents, labels, metadata (dates, locations, form labels). Monospace = utilitarian, gives a slight technical edge.
- Scale: go big on headings. Think 6xl-8xl for hero text. Let the type do the heavy lifting.

### Layout philosophy
- Maximum negative space. Sections should breathe.
- Full-viewport hero. Logo centred, tagline below, nothing else.
- Content widths narrow — 3xl to 5xl max for text blocks. Don't spread thin.
- Vertical rhythm generous — py-24 to py-32 between sections minimum.

### Motif
The concentric rings from the logo. Not reproduced literally everywhere, but echoed:
- Circular border elements
- Ring-shaped decorative accents (CSS, not images)
- Rounded containers where they feel natural

### Icons
Lucide React only. Used sparingly — for functional UI (menu, arrow, mail), not decoration.

## Pages

### / (Home)
**Hero** — Full viewport height. Black. Logo centred (large, ~200px). Tagline "Outlining electronic music culture" below in Space Grotesk, tracked out slightly. Maybe a subtle scroll indicator at the bottom. That's it. Pure negative space.

**Mission** — One block of text. 2-3 sentences. "We bring good house music culture to light. Melbourne-based, community-driven, no agenda beyond the music." Something like that but better. Space Grotesk heading, body in the same. Keep it tight.

**What we do** — Brief description of their events. Not a services grid. Just a short paragraph or two lines explaining they put on house music events in Melbourne. Casual, warm.

**Upcoming events** — Designed as a proper events list even with placeholder data. Each event: date (prominent, monospace), name, location. Clean horizontal lines separating entries. When empty/placeholder, the design should still look intentional. 2-3 placeholder events that feel real.

**Sign up** — Email capture. "Stay in the loop" — simple form. Email input + submit button. Maybe a one-liner above: "Get event announcements before anyone else" or similar. Not pushy.

### /vision
**Editorial page.** The why behind Outlines. Not a wall of text. Think:
- A big opening line — almost a quote. Something about why house music matters, why community matters.
- Then 2-3 short paragraphs. The Melbourne scene. The ethos. What Outlines means.
- Feels like reading a magazine spread, not a corporate about page.

### /events
**Events listing.** Clean card/list layout. Each event card: date block (day + month, prominent), event name, venue/location, brief description.

**Empty state** — When no real events exist yet: "Something is coming. Sign up to be first to know." — styled intentionally, not like an error. The sign-up form repeated here.

## Navigation
Minimal top nav. Logo left, links right. Three items: Home, Vision, Events. Mobile: hamburger menu, full-screen dark overlay with links centred.

## Footer
Simple. Logo mark (small). "Outlines — Melbourne" and maybe a copyright line. Social links if they exist (Instagram likely). Keep it barely there.

## Technical approach
- Next.js 16 (App Router) — already scaffolded
- Tailwind v4 — CSS theme tokens
- Google Fonts: Space Grotesk + Space Mono via next/font
- Lucide React for icons
- No external UI libraries. No framer-motion — CSS transitions only.
- Server components by default. Client components only where needed (mobile menu toggle, scroll animations, form).

## Copy tone guide
- First person plural but sparingly. "We" not "Outlines believes that..."
- Short sentences. Fragments are fine.
- No exclamation marks. No "amazing" or "incredible" or "vibrant".
- Think: how would you describe this to a friend at a bar? That's the register.
- Allowed words: good, real, music, community, Melbourne, house, culture, sound
- Banned energy: startup pitch, festival marketing, corporate values page
