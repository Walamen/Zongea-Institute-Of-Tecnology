# ZIT Site — Performance & Spacing Overhaul Design

**Date:** 2026-06-12  
**Scope:** Full clean sweep — performance first, then consistent spacing applied to every section  
**Approach chosen:** A — One structured plan covering both in a single branch

---

## Decisions Made

| Question | Decision |
|---|---|
| Dead deps (Three.js, Daily.js) | Remove both completely |
| Animations (framer-motion + custom) | Remove all animations entirely |
| Approach | Full clean sweep — performance + spacing together |
| Framer-motion | Uninstall; replace motion.div with plain div |
| Spacing strategy | Unified two-layer pattern across all sections |

---

## Part 1 — Performance Architecture

### 1.1 Dead Code & Dependencies

**Delete these files:**
- `client/src/components/ArchitectureScene.tsx` — Three.js 3D scene, never imported anywhere
- `client/src/animations/variants.ts` — framer-motion animation variants, becomes unused
- `client/src/components/common/AnimateOnScroll.tsx` — custom scroll animation, all usages replaced with plain divs
- `client/src/components/ParallaxSection.tsx` — framer-motion parallax, never needed
- `client/src/components/FloatingElement.tsx` — framer-motion infinite float, never rendered

**Uninstall from `client/package.json`:**
- `@react-three/fiber` (~600KB)
- `@react-three/drei` (~400KB)
- `three` (~1.4MB)
- `@daily-co/daily-js` (~2MB) — video conferencing, never imported
- `@daily-co/daily-react` — never imported
- `framer-motion` (~140KB)

**Total estimated bundle reduction: ~3.5MB+ off the build**

### 1.2 Components That Use framer-motion — Migration

Each component gets `motion.div` replaced with a plain `div`. All `variants`, `initial`, `animate`, `whileInView`, `whileHover`, and `transition` props are removed.

| Component | Change |
|---|---|
| `GlassCard.tsx` | `motion.div` → `div`, remove all motion props |
| `HowWeTeach.tsx` | Remove `motion.div`, `variants`, `staggerContainer`, `fadeInUp` |
| `GroundWork.tsx` | Remove all framer-motion usage |
| `Carousel.tsx` | Remove framer-motion slide animations |
| `GradientText.tsx` | Remove any motion wrapper if present |

All imports of `AnimateOnScroll` across the codebase are replaced with their plain child content (the wrapper div is kept, the animation logic removed).

### 1.3 Payment Providers — Scope to Donation Route Only

**Problem:** Stripe is initialized in both `main.tsx` and `App.tsx` (double load). `PayPalScriptProvider` and `Elements` wrap the entire app in `App.tsx`, loading payment scripts on every page.

**`DonationPage.tsx` already self-contains its own `<Elements>` and `<PayPalScriptProvider>` — no changes needed there.**

**`main.tsx` — remove Stripe wrapper:**
```tsx
// Before
<Elements stripe={stripePromise}>
  <App />
</Elements>

// After
<App />
```
Remove `loadStripe`, `Elements` import, `stripePublicKey` guard — keep only the `createRoot` render.

**`App.tsx` — remove global payment wrappers:**
```tsx
// Before
<PayPalScriptProvider ...>
  <Elements stripe={stripePromise}>
    <BrowserRouter>...</BrowserRouter>
  </Elements>
</PayPalScriptProvider>

// After
<BrowserRouter>...</BrowserRouter>
```
Remove `loadStripe`, `stripePromise`, `PayPalScriptProvider`, `Elements` imports and declarations from `App.tsx`.

### 1.4 Image Optimization

**Add `loading="lazy"` and `decoding="async"` to every `<img>` tag** across all components:
- `TutorshipSection.tsx` — 4 card images
- `TTM.tsx` — tab images (mentor, tutor, teach)
- `StudySucceed/index.tsx` — 3 images (including Unsplash)
- `Instructors/InstructorCard.tsx` — instructor photos
- `TeachingAtZit/hero.tsx`, `TutorShipComponent/hero.tsx`, etc.
- All other components with `<img>` tags

**Hero images (first slide):** first image uses `loading="eager"` (above the fold). Slides 2 and 3 use `loading="lazy"`.

**Install `vite-plugin-imagemin`** for automatic WebP conversion at build time:
```ts
// vite.config.ts
import viteImagemin from 'vite-plugin-imagemin'

plugins: [
  react(),
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    mozjpeg: { quality: 80 },
    pngquant: { quality: [0.8, 0.9] },
    webp: { quality: 80 },
  }),
]
```

### 1.5 Hero Slideshow — GPU-Accelerated Crossfade

**Problem:** Current implementation sets `style.backgroundImage` on a single `<section>` element. CSS cannot transition `background-image` — the browser does a full repaint on every slide change, no GPU compositing.

**Fix:** Stack all three images as absolutely-positioned `<img>` elements. Toggle `opacity` between them. Opacity transitions are GPU-composited.

```tsx
// HeroSection.tsx — replace backgroundImage style prop with:
<section className="h-[90vh] md:h-[80vh] relative flex items-end overflow-hidden">
  {images.map((img, i) => (
    <img
      key={i}
      src={img}
      alt=""
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        i === currentIndex ? 'opacity-100' : 'opacity-0'
      }`}
      loading={i === 0 ? 'eager' : 'lazy'}
      decoding="async"
    />
  ))}
  {/* dark overlay */}
  <div className="absolute inset-0 bg-primary/10" />
  {/* content box */}
  <div className="relative z-10 container mb-8">
    ...existing content...
  </div>
</section>
```

### 1.6 Suspense Boundaries

**`App.tsx`** — wrap the `<Routes>` block in a `<Suspense>` with a minimal fallback:
```tsx
<Suspense fallback={<div className="min-h-screen bg-primary" />}>
  <Routes>
    ...all routes...
  </Routes>
</Suspense>
```

### 1.7 Vite Bundle Splitting

**`vite.config.ts`** — add manual chunks to keep heavy async vendors out of the main bundle:
```ts
build: {
  outDir: 'dist',
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        'vendor-stripe': ['@stripe/react-stripe-js', '@stripe/stripe-js'],
        'vendor-paypal': ['@paypal/react-paypal-js'],
        'vendor-swiper': ['swiper'],
        'vendor-utils': ['axios', 'lucide-react'],
      },
    },
  },
},
// Remove: optimizeDeps: { exclude: ['lucide-react'] }
```

---

## Part 2 — Spacing System

### 2.1 The Unified Pattern

Every section across the entire site uses this exact two-layer structure:

```tsx
<section className="py-16 md:py-24 bg-[color]">
  <div className="container">
    {/* content */}
  </div>
</section>
```

- **`py-16 md:py-24`** — 64px vertical padding on mobile, 96px on desktop. Consistent breathing room.
- **`container`** — already defined in `index.css` as `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. All sections use this, no exceptions.
- Background color (`bg-white`, `bg-gray-50`, `bg-gray-100`, `bg-primary`) varies per section — that is intentional and stays.

**Hero is a special case** — it stays full-bleed with the image background, but its inner content box moves into a `container` div.

### 2.2 Section-by-Section Changes

#### HomePage sections

| Section | Current padding | After |
|---|---|---|
| `HeroSection` | `md:px-31` (invalid), `md:ml-[8%]` | content box inside `container` |
| `OurApproach` | `container mx-auto px-4` (close, needs `py`) | `py-16 md:py-24` + `container` |
| `StudyAtZit` | unknown | `py-16 md:py-24` + `container` |
| `ProgramsWeOffer` | unknown | `py-16 md:py-24` + `container` |
| `TTM` | `px-4 md:px-28 py-20` | `py-16 md:py-24` + `container` |
| `TutorshipSection` | `px-6 md:px-16 lg:px-28 py-16` | `py-16 md:py-24` + `container` |
| `ReadyToStartSec` | unknown | `py-16 md:py-24` + `container` |
| `TeachSomeone` | unknown | `py-16 md:py-24` + `container` |
| `HowWeTeach` (via Section) | `py-6 pb-14` + `container px-4` | `py-16 md:py-24` + `container` |
| `SuccessStory` | unknown | `py-16 md:py-24` + `container` |
| `UpComingEvent` | unknown | `py-16 md:py-24` + `container` |

#### Other pages
All GuidingHand, MentorShipComponent, TutorShipComponent, MotivationPage, CoursesPage, ContactPage, AdmissionPage, MakeImpact, and Course detail pages get the same treatment — scan every `<section>` and apply the two-layer pattern.

### 2.3 The `Section` Component

The existing `Section` component (`components/Section.tsx`) currently applies `.section` (which is `py-6 pb-14` — inconsistent). Update it to apply the new rhythm:

```tsx
// Section.tsx — update className
<section
  id={id}
  className={clsx('py-16 md:py-24', className)}
>
  <div className="container">
    {children}
  </div>
</section>
```

Remove the `fade-in` class (animation system being removed) and the nested `container` div that was inside Section previously.

### 2.4 Tailwind Config — Optional Spacing Tokens

Add named tokens so the rhythm can be changed site-wide in one place:

```js
// tailwind.config.js
theme: {
  extend: {
    spacing: {
      'section': '4rem',      // 64px — mobile section padding
      'section-lg': '6rem',   // 96px — desktop section padding
    },
    // existing colors + fonts unchanged
  }
}
```

If tokens are added, sections use `py-section md:py-section-lg` instead of `py-16 md:py-24`. Either approach is valid — the implementation plan will pick one and apply it consistently.

### 2.5 Global CSS Cleanup

In `index.css`:
- Remove `.fade-in` and `.fade-in.visible` rules (animation system gone)
- Update `.section` to `py-section md:py-section-lg` (or remove it entirely since sections won't use the `.section` class anymore)
- Keep `.container`, `body`, heading rules, and `#cta` unchanged

---

## Files Touched — Full List

### Deleted
- `client/src/components/ArchitectureScene.tsx`
- `client/src/animations/variants.ts`
- `client/src/components/common/AnimateOnScroll.tsx`
- `client/src/components/ParallaxSection.tsx`
- `client/src/components/FloatingElement.tsx`

### Modified — Performance
- `client/package.json` — uninstall 7 packages
- `client/vite.config.ts` — add imagemin plugin, manual chunks, remove lucide exclusion
- `client/src/main.tsx` — remove Stripe wrapper
- `client/src/App.tsx` — remove PayPal + Stripe global providers, add Suspense
- `client/src/components/GlassCard.tsx` — motion.div → div
- `client/src/components/HowWeTeach.tsx` — remove all framer-motion
- `client/src/components/MotivationPage/GroundWork.tsx` — remove framer-motion
- `client/src/components/Carousel.tsx` — remove framer-motion
- `client/src/components/GradientText.tsx` — remove motion if present
- `client/src/components/HomePageComponent/HeroSection.tsx` — GPU crossfade
- All `<img>` tags across codebase — add `loading="lazy" decoding="async"`
- All `AnimateOnScroll` usages — replace wrapper with plain `div`

### Modified — Spacing
- `client/tailwind.config.js` — add spacing tokens
- `client/src/index.css` — clean up fade-in, update .section
- `client/src/components/Section.tsx` — update to new rhythm
- All section components across all pages — apply `py-16 md:py-24` + `container` pattern

---

## Success Criteria

- [ ] `npm run build` completes with no errors
- [ ] No Three.js, Daily.js, framer-motion in `node_modules` (uninstalled)
- [ ] Bundle main chunk is under 300KB gzipped
- [ ] All images have `loading="lazy"` (except hero first slide)
- [ ] Hero slideshow crossfades smoothly with no repaint flash
- [ ] Payment providers only initialize when `/donate` is visited
- [ ] Every section's content edges align to the same horizontal column
- [ ] No section uses ad-hoc `px-28`, `px-16`, `ml-[8%]` or invalid `px-31`
- [ ] Vertical gap between all sections feels consistent as you scroll
