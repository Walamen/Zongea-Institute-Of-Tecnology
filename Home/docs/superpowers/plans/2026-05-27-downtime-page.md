# Downtime / Maintenance Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a branded "under maintenance / coming soon" page at `/maintenance` that replaces the public-facing site during downtime.

**Architecture:** Single self-contained server component at `app/maintenance/page.tsx` — no sub-components, no data fetching, no client interactivity. To activate during maintenance, the contents of `app/page.tsx` are swapped to render `MaintenancePage` directly (the original page is preserved on a git branch). Social links are plain `<a>` tags with placeholder `href` values to be filled before deploy.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS (existing config), Lucide React

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `app/maintenance/page.tsx` | Full maintenance page — layout, all sections, metadata |
| Modify | `app/page.tsx` | Swap to render maintenance page when going live (Task 6) |

---

## Task 1: Create page scaffold and verify TypeScript compiles

**Files:**
- Create: `app/maintenance/page.tsx`

- [ ] **Step 1: Create the file with metadata and an empty shell**

```tsx
// app/maintenance/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coming Soon — Zongea Institute of Technology',
  description: 'Our website is currently under maintenance. We will be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-canvas">
      <p>placeholder</p>
    </div>
  )
}
```

- [ ] **Step 2: Run a TypeScript build check**

```bash
cd Home && npx tsc --noEmit
```

Expected: no errors. If you get path alias errors, confirm `tsconfig.json` has `"paths": { "@/*": ["./*"] }`.

- [ ] **Step 3: Commit**

```bash
git add Home/app/maintenance/page.tsx
git commit -m "feat: scaffold maintenance page"
```

---

## Task 2: Full-page shell — gradient bar + background grid

**Files:**
- Modify: `app/maintenance/page.tsx`

- [ ] **Step 1: Replace the placeholder div with the full page shell**

```tsx
// app/maintenance/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coming Soon — Zongea Institute of Technology',
  description: 'Our website is currently under maintenance. We will be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-canvas overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,84,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,84,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Navy → gold gradient bar */}
      <div
        className="w-full flex-shrink-0"
        style={{ height: '4px', background: 'linear-gradient(90deg, #000054 0%, #D4900A 100%)' }}
      />

      {/* Page sections will go here */}
      <div className="relative flex-1 flex flex-col z-10">
        <p className="text-stone p-8">sections coming…</p>
      </div>

    </div>
  )
}
```

- [ ] **Step 2: Start the dev server and verify the page loads at `/maintenance`**

```bash
cd Home && pnpm dev
```

Open `http://localhost:3000/maintenance`. You should see a warm off-white page with a thin navy-to-gold bar at the top and a faint grid texture.

- [ ] **Step 3: Commit**

```bash
git add Home/app/maintenance/page.tsx
git commit -m "feat: add page shell with gradient bar and grid background"
```

---

## Task 3: Navbar strip

**Files:**
- Modify: `app/maintenance/page.tsx`

- [ ] **Step 1: Replace the placeholder sections comment with a Navbar section**

Replace this block inside the `<div className="relative flex-1 flex flex-col z-10">`:

```tsx
        {/* Navbar */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-primary/10">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
              <span className="font-display font-black text-secondary text-xl leading-none">
                Z
              </span>
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-2xs uppercase tracking-widest text-primary">
                Zongea
              </p>
              <p className="text-2xs uppercase tracking-wider text-stone">
                Institute of Technology
              </p>
            </div>
          </a>

          {/* Status badge */}
          <span className="text-2xs font-bold uppercase tracking-widest text-secondary border border-secondary/40 px-3 py-1.5 flex-shrink-0">
            Under Maintenance
          </span>
        </header>
```

The full file at this point:

```tsx
// app/maintenance/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coming Soon — Zongea Institute of Technology',
  description: 'Our website is currently under maintenance. We will be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-canvas overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,84,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,84,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Navy → gold gradient bar */}
      <div
        className="w-full flex-shrink-0"
        style={{ height: '4px', background: 'linear-gradient(90deg, #000054 0%, #D4900A 100%)' }}
      />

      <div className="relative flex-1 flex flex-col z-10">

        {/* Navbar */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-primary/10">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
              <span className="font-display font-black text-secondary text-xl leading-none">
                Z
              </span>
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-2xs uppercase tracking-widest text-primary">
                Zongea
              </p>
              <p className="text-2xs uppercase tracking-wider text-stone">
                Institute of Technology
              </p>
            </div>
          </a>

          <span className="text-2xs font-bold uppercase tracking-widest text-secondary border border-secondary/40 px-3 py-1.5 flex-shrink-0">
            Under Maintenance
          </span>
        </header>

      </div>

    </div>
  )
}
```

- [ ] **Step 2: Verify in browser at `http://localhost:3000/maintenance`**

You should see the navbar with the `Z` logo on the left and the gold "Under Maintenance" badge on the right, separated by a subtle border.

- [ ] **Step 3: Commit**

```bash
git add Home/app/maintenance/page.tsx
git commit -m "feat: add navbar to maintenance page"
```

---

## Task 4: Main content — icon, label, headline, body copy

**Files:**
- Modify: `app/maintenance/page.tsx`

- [ ] **Step 1: Add the Settings icon import and the main section**

Add the import at the top of the file:
```tsx
import { Settings } from 'lucide-react'
```

Then add a `<main>` block after the `</header>`, still inside `<div className="relative flex-1 flex flex-col z-10">`:

```tsx
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">

          {/* Gear icon in ring */}
          <div className="w-16 h-16 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center mb-8">
            <Settings size={28} strokeWidth={1.5} className="text-primary" />
          </div>

          {/* Label + gold accent line */}
          <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-3">
            Site Maintenance
          </p>
          <div className="w-10 h-[3px] bg-secondary mb-6" />

          {/* Headline */}
          <h1 className="font-display font-black text-primary leading-[1.05] tracking-tight text-[clamp(32px,5vw,56px)] mb-5">
            We&rsquo;re Coming<br className="hidden sm:block" /> Back Soon.
          </h1>

          {/* Body copy */}
          <p className="text-sm sm:text-base font-light text-stone leading-relaxed max-w-md mb-10">
            Our website is currently undergoing scheduled maintenance.
            We&rsquo;re building something{' '}
            <strong className="font-semibold text-primary">better for you</strong>{' '}
            — please check back shortly.
          </p>

        </main>
```

- [ ] **Step 2: Verify in browser**

The page should show the gear icon in a circle, gold label, accent line, large navy headline, and body copy, all centered vertically in the viewport.

- [ ] **Step 3: Run TypeScript check**

```bash
cd Home && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add Home/app/maintenance/page.tsx
git commit -m "feat: add main content section to maintenance page"
```

---

## Task 5: Dot divider + social buttons

**Files:**
- Modify: `app/maintenance/page.tsx`

- [ ] **Step 1: Add social icon imports**

Update the lucide-react import line:

```tsx
import { Settings, Linkedin, Instagram, Twitter } from 'lucide-react'
```

- [ ] **Step 2: Add the dot divider and social buttons inside `<main>`, after the body copy `</p>` and before `</main>`**

```tsx
          {/* Dot divider */}
          <div className="flex items-center gap-3 w-48 mb-8">
            <div className="flex-1 h-px bg-primary/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          {/* Social label */}
          <p className="text-2xs font-bold uppercase tracking-widest text-stone mb-4">
            Follow us for updates
          </p>

          {/* Social buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Linkedin size={13} strokeWidth={2} />
              LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Instagram size={13} strokeWidth={2} />
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Twitter size={13} strokeWidth={2} />
              Twitter / X
            </a>
          </div>
```

- [ ] **Step 3: Verify in browser**

Below the body copy you should see a dot-divider, a "Follow us for updates" label, and three outlined navy buttons that fill solid on hover.

- [ ] **Step 4: Commit**

```bash
git add Home/app/maintenance/page.tsx
git commit -m "feat: add social buttons to maintenance page"
```

---

## Task 6: Footer strip

**Files:**
- Modify: `app/maintenance/page.tsx`

- [ ] **Step 1: Add the footer after the closing `</div>` of the main content wrapper (still inside the `z-10` div, after `</main>`)**

```tsx
        {/* Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 px-6 sm:px-10 py-4 border-t border-primary/10">
          <p className="text-2xs text-stone tracking-wide">
            © 2026 Zongea Institute of Technology. All rights reserved.
          </p>
          <p className="text-2xs font-semibold uppercase tracking-widest text-secondary">
            100% Tuition-Free · Liberia
          </p>
        </footer>
```

- [ ] **Step 2: Verify in browser**

The footer should sit at the bottom of the page (or below the fold on short viewports), with copyright on the left and the mission note in gold on the right. On mobile both lines stack centered.

- [ ] **Step 3: Run final TypeScript check and build**

```bash
cd Home && npx tsc --noEmit && pnpm build
```

Expected: no TypeScript errors, build succeeds with no warnings about `app/maintenance/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add Home/app/maintenance/page.tsx
git commit -m "feat: add footer to maintenance page"
```

---

## Task 7: Activate — swap app/page.tsx to serve the maintenance page

> **When ready to go live with the maintenance page**, follow these steps. Do NOT do this during development unless you intend to take down the main site.

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Create a backup branch preserving the live homepage**

```bash
git checkout -b backup/live-homepage
git push origin backup/live-homepage
git checkout main
```

- [ ] **Step 2: Replace `app/page.tsx` contents**

```tsx
// app/page.tsx
export { default } from '@/app/maintenance/page'
```

This re-exports `MaintenancePage` as the root route, so visiting `/` shows the maintenance page. The original page is safe on `backup/live-homepage`.

- [ ] **Step 3: Verify build**

```bash
cd Home && pnpm build
```

Expected: build succeeds. Visit `http://localhost:3000` (after `pnpm start` or on deploy) — the maintenance page appears at the root.

- [ ] **Step 4: Fill in real social URLs before deploying**

In `app/maintenance/page.tsx`, replace each `href="#"` on the social buttons with the real links:

```tsx
// LinkedIn
href="https://linkedin.com/company/zongea-institute-of-technology"

// Instagram
href="https://instagram.com/zongeainstituteoftechnology"

// Twitter / X
href="https://twitter.com/zongeatech"
```

Update with the actual handles.

- [ ] **Step 5: Commit**

```bash
git add Home/app/page.tsx Home/app/maintenance/page.tsx
git commit -m "feat: activate maintenance page at root route"
```

- [ ] **Step 6: To restore the live site later**

```bash
git checkout backup/live-homepage -- Home/app/page.tsx
git commit -m "chore: restore live homepage after maintenance"
```

---

## Complete File — `app/maintenance/page.tsx`

For reference, the finished file after all tasks:

```tsx
import type { Metadata } from 'next'
import { Settings, Linkedin, Instagram, Twitter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coming Soon — Zongea Institute of Technology',
  description: 'Our website is currently under maintenance. We will be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-canvas overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,84,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,84,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Navy → gold gradient bar */}
      <div
        className="w-full flex-shrink-0"
        style={{ height: '4px', background: 'linear-gradient(90deg, #000054 0%, #D4900A 100%)' }}
      />

      <div className="relative flex-1 flex flex-col z-10">

        {/* Navbar */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-primary/10">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
              <span className="font-display font-black text-secondary text-xl leading-none">
                Z
              </span>
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-2xs uppercase tracking-widest text-primary">
                Zongea
              </p>
              <p className="text-2xs uppercase tracking-wider text-stone">
                Institute of Technology
              </p>
            </div>
          </a>

          <span className="text-2xs font-bold uppercase tracking-widest text-secondary border border-secondary/40 px-3 py-1.5 flex-shrink-0">
            Under Maintenance
          </span>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">

          {/* Gear icon in ring */}
          <div className="w-16 h-16 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center mb-8">
            <Settings size={28} strokeWidth={1.5} className="text-primary" />
          </div>

          {/* Label + gold accent line */}
          <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-3">
            Site Maintenance
          </p>
          <div className="w-10 h-[3px] bg-secondary mb-6" />

          {/* Headline */}
          <h1 className="font-display font-black text-primary leading-[1.05] tracking-tight text-[clamp(32px,5vw,56px)] mb-5">
            We&rsquo;re Coming<br className="hidden sm:block" /> Back Soon.
          </h1>

          {/* Body copy */}
          <p className="text-sm sm:text-base font-light text-stone leading-relaxed max-w-md mb-10">
            Our website is currently undergoing scheduled maintenance.
            We&rsquo;re building something{' '}
            <strong className="font-semibold text-primary">better for you</strong>{' '}
            — please check back shortly.
          </p>

          {/* Dot divider */}
          <div className="flex items-center gap-3 w-48 mb-8">
            <div className="flex-1 h-px bg-primary/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          {/* Social label */}
          <p className="text-2xs font-bold uppercase tracking-widest text-stone mb-4">
            Follow us for updates
          </p>

          {/* Social buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Linkedin size={13} strokeWidth={2} />
              LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Instagram size={13} strokeWidth={2} />
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Twitter size={13} strokeWidth={2} />
              Twitter / X
            </a>
          </div>

        </main>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 px-6 sm:px-10 py-4 border-t border-primary/10">
          <p className="text-2xs text-stone tracking-wide">
            © 2026 Zongea Institute of Technology. All rights reserved.
          </p>
          <p className="text-2xs font-semibold uppercase tracking-widest text-secondary">
            100% Tuition-Free · Liberia
          </p>
        </footer>

      </div>

    </div>
  )
}
```
