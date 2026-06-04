# Al Fajer Private School — Developer Guide

## Project Overview

**Al Fajer Private School (AFS)** is a non-profit, coeducational private school in Barbar, Bahrain. Founded in 2013, it offers a bilingual American and Ministry of Education curriculum from Kindergarten (KG1) to Grade 5. The school also provides French as a third language, making it trilingual. It serves approximately 480 students across 12+ nationalities.

**Website:** https://afs.edu.bh  
**Location:** Budaiya Highway, Barbar, Central Governorate, Bahrain  
**Phone:** +973 1761 2221  
**Email:** info@afs.edu.bh  
**Working branch:** `claude/school-website-design-NweIu`  
**Git remote:** `azzbr/afs`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Animations | Lenis smooth scroll, keyframe CSS animations |
| Icons | Lucide React |
| Fonts | Playfair Display (EN headings) + Cairo (body + Arabic) |
| Admin auth | HMAC-SHA256 signed tokens, edge middleware |
| Data store | JSON files in `src/data/` |

**Unused / legacy packages still in `package.json`:** `framer-motion`, `gsap`. Do not use them in new code — they add bundle weight and were part of the old over-animated design. Use CSS keyframes and the `data-reveal` scroll system instead.

### Commands

```bash
npm run dev       # development server on :3000
npm run build     # production build (run before every push)
npm run lint      # ESLint check
```

Always run `npm run build` before pushing to confirm zero TypeScript errors. The build generates 36 static pages.

---

## Design Philosophy

The site targets **upper-middle-class Bahraini and expat families** researching primary education. The design must feel:

- **Trustworthy and established** — like a school that has been doing this for decades
- **Editorial and calm** — think Financial Times, Repton Dubai, Blundell's: generous white space, strong typographic hierarchy, flat colors
- **Distinctly premium without being flashy** — no glow effects, no gradients, no animations that feel like a tech startup

**Inspiration:** reptondubai.org, blundells.org — clean editorial layouts with oversized serif type and strong use of negative space.

**Anti-patterns — never introduce these:**
- Gradients on backgrounds or text (`bg-gradient-*`, `from-*`, `to-*`, `text-gradient-*`)
- Glow effects (`glow-blue`, `glow-gold`, `shadow-brand`, `shadow-gold-lg`, any `rgba(0,40,255,*)` shadow)
- Animated backgrounds (`mesh-bg`, `noise`, `dot-pattern`, `animate-gradient`, `animate-pulse-glow`)
- Shimmer/ripple buttons (`shimmer-btn`, `ripple-btn`)
- Float or spin animations (`animate-float`, `animate-spin-slow`, `animate-bounce-in`)
- `rounded-2xl` or `rounded-3xl` on cards — use `rounded` (4px) or none
- `glassmorphism` cards with colored tinted backgrounds
- Colored icon backgrounds using dynamic `item.color` fields

---

## Design System

### Color Palette

All colors live as CSS custom properties in `src/app/globals.css`. Always use `var(--token)` syntax in Tailwind classes.

```
--brand-navy:      #0B1F3F   ← primary dark, hero backgrounds, nav, buttons
--brand-blue:      #1E3A8A   ← secondary blue (hover states only)
--brand-blue-mid:  #1D4ED8   ← accent (use sparingly)
--brand-gold:      #92702A   ← gold accent: section tags, rules, borders
--brand-gold-light:#B8902E   ← gold hover state
--cream:           #FAF8F3   ← warm off-white section background
--ink:             #0A0A0A   ← body text
--muted:           #6B7280   ← secondary text, captions
--border:          #E5E1D8   ← card borders, dividers
--transition:      0.25s cubic-bezier(0.4, 0, 0.2, 1)
```

In Tailwind: `bg-[var(--brand-navy)]`, `text-[var(--brand-gold)]`, `border-[var(--border)]`

### Section Backgrounds

Alternate sections through this palette to create visual rhythm:

| Class | Color | Usage |
|---|---|---|
| `hero-dark` | `#0B1F3F` (navy) | Page heroes, major CTAs, stat bars |
| `section-dark` | `#0F1F35` | Programs, alternate dark sections |
| `section-cream` | `#FAF8F3` | Warm alternating sections |
| `bg-white` | white | Default section background |

### Typography

**Headings (English):** Playfair Display — `font-playfair`  
**Body + Arabic:** Cairo — `font-cairo`  
**Body default:** Cairo is set as the default `body` font in globals.css

Pre-built type classes:

```css
.section-title        /* clamp(2rem, 5vw, 3.75rem), font-playfair, ink color */
.section-title-white  /* same but white — use on dark backgrounds */
.section-subtitle     /* 1.0625rem, muted color, max-w-[42rem] */
```

### Section Tag (Eyebrow Label)

Used above every section heading to label the section. Renders a gold horizontal rule before the text.

```jsx
{/* CRITICAL: must be <div>, never <span> — ::before pseudo-element requires block context */}
<div className="section-tag">{c.section.tag}</div>
<div className="section-tag-light">{c.section.tag}</div>  {/* for dark backgrounds */}
```

For centered layout, wrap the parent in `text-center` or use flexbox with `items-center justify-center` on the parent — do **not** add `mx-auto` to the tag itself as it is `inline-flex`.

### Buttons

```jsx
<button className="btn-primary">Apply Now</button>    {/* navy fill → blue hover */}
<button className="btn-secondary">Learn More</button>  {/* gold fill */}
<button className="btn-outline">View Details</button>  {/* navy border */}
<button className="btn-ghost">Dismiss</button>         {/* white border, for dark bg */}
```

All buttons: `border-radius: 0.25rem` (no pill shapes), uppercase, letter-spaced, flat color — no shimmer or glow.

### Cards

```jsx
<div className="card p-6">...</div>               {/* white, 1px border, subtle hover */}
<div className="card-hover">...</div>             {/* hover lift utility only */}
```

Card borders: `border border-[var(--border)]`  
Card on dark background: `border border-white/10`  
Icon squares: `w-10 h-10 bg-[var(--brand-navy)] flex items-center justify-center` — always flat navy, never gradient

### Scroll Reveal Animations

Add to any element you want to animate in on scroll:

```jsx
<div data-reveal="fade">...</div>       {/* fade only */}
<div data-reveal="left">...</div>       {/* slide from left */}
<div data-reveal="right">...</div>      {/* slide from right */}
<div data-reveal>...</div>              {/* default: fade up */}
<div data-reveal data-delay="200">...</div>  {/* stagger delay */}
```

The `useScrollReveal()` hook must be called in the page component for these to work.

Available delays: `60, 80, 100, 120, 150, 200, 240, 300, 360, 400, 480, 500, 600, 700, 720, 800`

### Hero Section Pattern

```jsx
<section className="hero-dark relative overflow-hidden py-24 md:py-32">
  {/* Optional: subtle diagonal lines texture */}
  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage: 'repeating-linear-gradient(135deg, white 0, white 1px, transparent 0, transparent 50%)',
      backgroundSize: '28px 28px',
    }}
  />
  <div className="container-custom relative z-10">
    <div className="section-tag-light">{c.hero.tag}</div>
    <h1 className="section-title-white">{c.hero.h1}</h1>
    <p className="section-subtitle text-white/70">{c.hero.subtitle}</p>
    <div className="flex gap-4 mt-8">
      <Link href="/admissions" className="btn-primary">Apply Now</Link>
      <Link href="/about" className="btn-ghost">Learn More</Link>
    </div>
  </div>
</section>
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              ← root layout (fonts, metadata, global components)
│   ├── globals.css             ← SINGLE source of truth for design tokens
│   ├── page.tsx                ← homepage
│   ├── about/page.tsx
│   ├── academics/page.tsx
│   ├── admissions/page.tsx
│   ├── apply/page.tsx
│   ├── calendar/page.tsx
│   ├── careers/page.tsx
│   ├── contact/page.tsx
│   ├── fees/page.tsx
│   ├── gallery/page.tsx
│   ├── news/
│   │   ├── page.tsx            ← news listing
│   │   └── [slug]/page.tsx     ← individual article
│   ├── parents/page.tsx
│   ├── staff/page.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── admin/                  ← admin panel (protected by middleware)
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── calendar/
│   │   ├── careers/
│   │   ├── fees/
│   │   └── stats/
│   └── api/
│       ├── admin/              ← CRUD endpoints for admin data
│       ├── apply/              ← POST: admissions form submissions
│       ├── contact/            ← POST: contact form submissions
│       └── content/            ← GET: public content endpoints
├── components/
│   ├── Header/Header.tsx       ← sticky nav, language switch, dropdowns
│   ├── Footer/Footer.tsx       ← links, contact, social
│   ├── AnnouncementBanner/     ← top enrollment banner (dismissible)
│   ├── FloatingCTA/            ← sticky Apply + WhatsApp buttons
│   ├── ScrollProgress/         ← gold progress bar at top
│   └── SmoothScroll/           ← Lenis wrapper
├── hooks/
│   ├── useScrollReveal.ts      ← IntersectionObserver for data-reveal
│   ├── useCounter.ts           ← animated number counter
│   ├── useTypewriter.ts        ← cycling text animation
│   └── useMagneticButton.ts    ← cursor-follow effect (rarely needed)
├── lib/
│   ├── auth.ts                 ← HMAC token sign/verify
│   └── data.ts                 ← readData / writeData for JSON files
└── data/
    ├── fees.json               ← fee schedule by grade
    ├── stats.json              ← school statistics
    ├── calendar-events.json    ← school year events
    └── careers.json            ← job listings
```

---

## Bilingual Support (EN / AR)

Every public page accepts an optional `lang` prop and renders bilingual content via a content object.

**Standard page pattern:**

```tsx
'use client'
import { clsx } from 'clsx'

interface PageProps { lang?: 'en' | 'ar' }

const en = { hero: { tag: 'Our School', h1: 'About Us', ... }, ... }
const ar = { hero: { tag: 'مدرستنا', h1: 'من نحن', ... }, ... }

export default function Page({ lang = 'en' }: PageProps) {
  const c = lang === 'ar' ? ar : en
  const isRTL = lang === 'ar'

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'}>
      <section className={clsx('section-padding bg-white', isRTL && 'text-right')}>
        ...
      </section>
    </main>
  )
}
```

**Font:** Cairo handles both English and Arabic well. Use it for body text. Playfair Display is Latin-only — do not apply `font-playfair` to Arabic text.

**RTL layout flips:** Use `clsx` with `isRTL` to flip flex direction, text alignment, padding, etc. Example: `clsx('flex gap-4', isRTL ? 'flex-row-reverse' : 'flex-row')`.

---

## Custom Hooks

### `useScrollReveal()`

Activates the `data-reveal` / `data-revealed` animation system. Call once per page component.

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal'
export default function Page() {
  useScrollReveal()
  return <div data-reveal="fade">Animates in on scroll</div>
}
```

### `useCounter(target, options?)`

Animated number that counts up when the element enters the viewport.

```tsx
import { useCounter } from '@/hooks/useCounter'
function Stat({ value }: { value: number }) {
  const { count, ref } = useCounter(value)
  return <span ref={ref} className="counter-num">{count}</span>
}
```

### `useTypewriter(phrases, options?)`

Cycles through an array of phrases with type/delete animation.

```tsx
import { useTypewriter } from '@/hooks/useTypewriter'
const text = useTypewriter(['Excellence', 'Innovation', 'Community'])
return <span>{text}</span>
```

---

## School Facts (For Content)

| Fact | Value |
|---|---|
| Founded | 2013 |
| Grades | KG1, KG2, KG3, Grade 1–5 |
| Students | ~480 |
| Teachers | 38 |
| Nationalities | 12+ |
| Curriculum | American + Bahrain MOE |
| Languages | Arabic, English, French |
| Parent satisfaction | 97% |
| Type | Non-profit, coeducational |
| Accreditation | Bahrain Ministry of Education |

**Fee schedule (BHD/year):**

| Grade | Annual Fee | Registration |
|---|---|---|
| KG1–KG2 | 1,800 | 150 |
| KG3 | 1,900 | 150 |
| Grade 1–2 | 2,000 | 175 |
| Grade 3–4 | 2,100 | 175 |
| Grade 5 | 2,200 | 200 |

10% sibling discount. Two installment payment plan available.

---

## Admin System

**URL:** `/admin` (redirects to `/admin/login` if unauthenticated)  
**Username:** `admin`  
**Password:** `AFS@Admin2025!`  
**Session secret:** stored in `.env.local` as `SESSION_SECRET`

**How auth works:** HMAC-SHA256 signs a JSON payload into a base64url token, stored in cookie `afs-admin-session`. Middleware at `src/middleware.ts` verifies it on every `/admin/*` request (except `/admin/login`) using the Web Crypto API — fully edge-compatible.

**Admin pages and their data files:**

| Admin route | Data file | Public API |
|---|---|---|
| `/admin/fees` | `src/data/fees.json` | `GET /api/content/fees` |
| `/admin/stats` | `src/data/stats.json` | `GET /api/content/stats` |
| `/admin/calendar` | `src/data/calendar-events.json` | `GET /api/admin/calendar` |
| `/admin/careers` | `src/data/careers.json` | `GET /api/content/careers` |

The `readData` / `writeData` helpers in `src/lib/data.ts` handle all JSON file I/O for API routes.

---

## Component Reference

### Header

- Top info strip: `bg-[var(--brand-navy)]` with contact info + social links
- Sticky nav with `glass` class applied when scrolled (white/92 + blur)
- Active nav link: `border-b-2 border-[var(--brand-gold)]`
- Dropdown: opens below nav, `h-[2px] bg-[var(--brand-gold)]` top rule, no rounded corners
- Mobile: hamburger menu with slide-down panel
- Language toggle: switches between `en` and `ar` content

### Footer

- `bg-[var(--brand-navy)]` with `h-[3px] bg-[var(--brand-gold)]` top rule
- Four columns: About | Quick Links | Academics | Contact
- Social links: Facebook, Instagram, Twitter
- Copyright with MOE licensing note

### AnnouncementBanner

- Appears at top, above the header
- Dismissible (persists dismissal in `sessionStorage` with key `afs-banner-dismissed-v1`)
- Contains enrollment CTA linking to `/admissions`

### FloatingCTA

- Fixed to bottom-right (bottom-left in RTL)
- "Apply Now" button: appears after scrolling 400px, `bg-[var(--brand-navy)]`
- WhatsApp button: always visible, `bg-[#25D366]`
- WhatsApp number: `+97317612221`

### ScrollProgress

- `h-[2px] bg-[var(--brand-gold)]` fixed bar at top of viewport, `z-[200]`

---

## Page Patterns

### Standard Internal Page Structure

```tsx
<main>
  {/* 1. Hero: hero-dark, section-tag-light, white type */}
  <section className="hero-dark py-24 md:py-32">...</section>

  {/* 2. First content section: bg-white */}
  <section className="section-padding bg-white">...</section>

  {/* 3. Alternate: section-cream */}
  <section className="section-padding section-cream">...</section>

  {/* 4. Dark feature block: section-dark or hero-dark */}
  <section className="section-padding section-dark">...</section>

  {/* 5. Final CTA: hero-dark */}
  <section className="hero-dark section-padding">...</section>
</main>
```

### Content Object Convention

Every page defines bilingual content as two typed objects at the top of the file:

```tsx
const en = {
  hero: { tag: 'Admissions', h1: 'Join Our Community', subtitle: '...' },
  steps: [
    { title: 'Apply Online', body: '...' },
  ],
}
const ar = {
  hero: { tag: 'القبول', h1: 'انضم إلى مجتمعنا', subtitle: '...' },
  steps: [
    { title: 'التقديم عبر الإنترنت', body: '...' },
  ],
}
```

Then: `const c = lang === 'ar' ? ar : en`

---

## SEO

- `metadataBase` is set to `https://afs.edu.bh` in `layout.tsx`
- Every page should export a `metadata` object or `generateMetadata` function
- `sitemap.ts` auto-generates XML sitemap for all public routes
- `robots.ts` allows indexing of all public routes, disallows `/admin/*` and `/api/*`

---

## Image Handling

- `next/image` is configured to allow remote images from `afs.edu.bh`
- Local images go in `public/`
- Where actual photos don't exist, use `bg-[var(--cream)]` placeholder divs with a subtle border — never emoji backgrounds or gradient fills
- OG image: `public/og-image.jpg` (1200×630)

---

## Coding Conventions

**Imports:** Use `@/` path alias for everything under `src/`. Example: `@/hooks/useScrollReveal`

**Class composition:** Use `clsx` for conditional classes. Import: `import { clsx } from 'clsx'`

**No inline styles** except for CSS properties that Tailwind cannot express (e.g., `backgroundImage` for the diagonal-lines texture in heroes).

**`'use client'` directive:** Required on any component or page that uses React hooks (`useState`, `useEffect`, custom hooks). Server components (no hooks) don't need it.

**Section tag element:** Always `<div className="section-tag">`, never `<span>` — the `::before` pseudo-element requires a block/flex context.

**No `rounded-2xl` or `rounded-3xl`** on content cards. Use `rounded` (4px) at most.

**No `Sparkles`, `Zap`, `Star`, or decoration icons** for section headers — use the `section-tag` pattern instead.

**Remove before merging:**
- `console.log` statements
- Commented-out old code blocks
- Unused imports

---

## Deployment

The site deploys from the `main` branch. The current development branch is `claude/school-website-design-NweIu`. After all pages are confirmed building cleanly, merge to `main` for deployment.

```bash
git push -u origin claude/school-website-design-NweIu
```

The hosting environment reads from `main`. No CI/CD pipeline is configured — deploy is manual.

---

## Quick Reference: What To Use

| Task | Use |
|---|---|
| Dark section background | `hero-dark` or `section-dark` |
| Warm light section | `section-cream` |
| Section eyebrow (dark bg) | `<div className="section-tag-light">` |
| Section eyebrow (light bg) | `<div className="section-tag">` |
| Large heading | `section-title` / `section-title-white` |
| Supporting text | `section-subtitle` |
| Primary CTA button | `btn-primary` |
| Secondary CTA button | `btn-secondary` |
| Outline button (light bg) | `btn-outline` |
| Ghost button (dark bg) | `btn-ghost` |
| Card with border | `border border-[var(--border)] p-6` |
| Card on dark bg | `border border-white/10 p-6` |
| Icon box | `w-10 h-10 bg-[var(--brand-navy)] flex items-center justify-center` |
| Gold accent line | `<div className="rule-gold" />` |
| Scroll animation | `data-reveal="fade"` + `useScrollReveal()` |
| Animated counter | `useCounter(value)` |
| Standard section spacing | `section-padding` |
| Max-width container | `container-custom` |
| Gold scrollbar/selection | Already global in `globals.css` |
