# Downtime / Maintenance Page — Design Spec

**Date:** 2026-05-27  
**Project:** Zongea Institute of Technology  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide React

---

## Purpose

A standalone page that replaces the main site while it is under maintenance. It communicates:
1. The site is temporarily offline for maintenance
2. It will be back soon (no specific date)
3. Where visitors can follow for updates (social links)

---

## Design Direction: Clean Canvas (Option C)

Light warm background (`#F8F5EF`) with structured navy/gold brand accents. Calm, professional, and trustworthy — consistent with the brand identity without duplicating the immersive hero layout.

---

## Layout & Structure

### Top gradient bar
- 4px horizontal bar spanning full width
- CSS gradient: left `#000054` (primary) → right `#D4900A` (secondary/gold)
- Fixed at the very top of the viewport

### Navbar strip
- Same logo as the main site: `Z` box (`bg-primary`, gold letter) + "Zongea" / "Institute of Technology" wordmark
- Right side: "Under Maintenance" status badge — outlined in gold (`border-secondary`, `text-secondary`)
- Separated from main content by a subtle `border-b` (`border-primary/10`)

### Main content (centered, vertical flex)
- Gear/settings icon in a subtle circular ring (`border-primary/10`, `bg-primary/5`)
- Small gold label: `SITE MAINTENANCE` (uppercase, tracking-widest, `text-secondary`)
- 3px gold accent line below label
- Headline: **"We're Coming Back Soon."** — Plus Jakarta Sans, 900 weight, ~56px (clamped), `text-primary`, tight tracking
- Body copy (2–3 lines): explains scheduled maintenance, "building something better for you", check back shortly — `text-stone`, Inter, light
- Dot-divider (line · dot · line) in muted navy
- Social section label: `FOLLOW US FOR UPDATES` (small caps, `text-stone`)
- Social buttons row: LinkedIn, Instagram, Twitter/X — outlined (`border-primary/20`, `text-primary`), hover fills solid navy

### Footer strip
- Left: `© 2025 Zongea Institute of Technology. All rights reserved.` — small, `text-stone`
- Right: `100% Tuition-Free · Liberia` — small, `text-secondary`, uppercase
- Separated by a `border-t` (`border-primary/10`)

---

## Visual Design Tokens (from existing Tailwind config)

| Token | Value | Usage |
|---|---|---|
| `primary` | `#000054` | Headlines, icon ring, social buttons, nav logo box |
| `secondary` | `#D4900A` | Gradient bar endpoint, gold line, label, status badge, footer note |
| `canvas` | `#F8F5EF` | Page background |
| `stone` | `#6B6660` | Body copy, footer copyright, social section label |
| `font-display` | Plus Jakarta Sans | Headline, logo wordmark |
| `font-body` | Inter | Body copy, labels, footer |

---

## Subtle Background Detail

A faint grid overlay (CSS `background-image` with `linear-gradient` lines at `rgba(0,0,84,0.03)`, 40px grid) gives the canvas texture without visual noise.

---

## Copy

- **Status badge:** `Under Maintenance`
- **Label:** `Site Maintenance`
- **Headline:** `We're Coming Back Soon.`
- **Body:** `Our website is currently undergoing scheduled maintenance. We're building something better for you — please check back shortly.`
- **Social label:** `Follow us for updates`
- **Footer left:** `© 2025 Zongea Institute of Technology. All rights reserved.`
- **Footer right:** `100% Tuition-Free · Liberia`

---

## Social Links

Three buttons shown: **LinkedIn**, **Instagram**, **Twitter / X**. Each is an `<a>` tag with `href` set to a placeholder (to be filled in with real URLs before deploy). Icons sourced from Lucide React (`Linkedin`, `Instagram`, `Twitter`).

---

## Implementation Notes

- **File location:** `app/maintenance/page.tsx` (or swap `app/page.tsx` content during maintenance)
- **No router dependencies** — fully static, no data fetching
- **`'use client'`** directive needed only if framer-motion animations are added (optional subtle fade-in on mount)
- **Responsive:** single-column centered layout, social buttons wrap on mobile
- **No email signup**, **no countdown timer** — intentionally open-ended

---

## What This Is NOT

- Not a redirect — it replaces the root page during maintenance
- Not animated with a full slideshow (unlike the Hero) — calm and static by design
- Not a 404 or error page — it's a deliberate, branded holding page
