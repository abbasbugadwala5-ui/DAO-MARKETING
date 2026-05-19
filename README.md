# Studio — Agency Site

A production-grade Next.js (App Router) agency site. It recreates the **interaction
engineering** of a modern award-style agency page — Lenis cinematic scroll, GSAP
sticky-stacking service cards, a bento client grid, masonry case cards, scroll-linked
testimonial rows, and a parallax dark footer — built as a clean, rebrandable template.

Branding, copy and client tiles are neutral placeholders. Drop in your own identity,
copy and media to make it yours.

---

## Stack

- **Next.js 15** (App Router) · React 19
- **Tailwind CSS v4** (CSS-first config in `globals.css`)
- **GSAP + ScrollTrigger** — reveals, stagger, scrub, parallax, stacking
- **Framer Motion** — hover scaling, mount transitions, micro-interactions
- **Lenis** — cinematic smooth scrolling, synced to the GSAP ticker

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
```

> Note: the Lenis package is now published as **`lenis`** (the old
> `@studio-freight/lenis` name is deprecated). `package.json` already uses `lenis`.

## Project structure

```
src/
├── app/
│   ├── layout.jsx          root layout · font · SmoothScroll wrapper
│   └── page.jsx            section composition
├── components/
│   ├── Navbar.jsx          floating pill nav
│   ├── Hero.jsx            animated word-reveal hero
│   ├── Services.jsx        sticky stacking-card section
│   ├── AnimatedCard.jsx    reusable stacking card
│   ├── Cases.jsx           "Latest cases" masonry + pointer tilt
│   ├── BentoGrid.jsx       "Selected clients" bento grid
│   ├── Testimonials.jsx    scroll-linked opposite-drift rows
│   ├── Footer.jsx          dark footer · parallax cards · wordmark
│   └── SmoothScroll.jsx    Lenis provider synced to GSAP
├── hooks/
│   └── useGSAP.js          scoped gsap.context with auto cleanup
├── lib/
│   └── utils.js            cn() — clsx + tailwind-merge
├── assets/
│   ├── images/             ← drop your images here
│   └── videos/             ← drop your videos here
└── styles/
    └── globals.css         design tokens + base styles
```

## Wiring in your own media

Every visual block currently renders an **abstract placeholder panel**. To use real
media, replace the placeholder inside each component's data array.

**Video** (autoplay loop, as required):

```jsx
<video
  autoPlay muted loop playsInline preload="metadata"
  className="absolute inset-0 h-full w-full object-cover"
>
  <source src="/your-clip.webm" type="video/webm" />
</video>
```

**Image** (next/image, lazy by default):

```jsx
import Image from 'next/image';
<Image src="/your-shot.jpg" alt="" fill className="object-cover" />
```

Files in `src/assets` are imported in JS; files in `public/` are served by URL.
For `<video>` and `next/image` the simplest path is `public/`.

Edit points:
- `Services.jsx` → `services[].media`
- `Cases.jsx` → `cases[].media`
- `BentoGrid.jsx` → `clients[]` (name / colour, or swap in a logo `<Image>`)
- `Footer.jsx` → the two `data-parallax` cards

## Design tokens

All colours, the card radius and the type scale live in the `@theme` block of
`src/styles/globals.css`. Change them there and the whole site follows.

## Notes

- `useGSAP` wraps setup in `gsap.context()` so tweens and ScrollTriggers are reverted
  on unmount — safe under React 19 strict mode.
- Lenis drives one RAF loop; ScrollTrigger reads from it, so scroll-linked animation
  stays in sync with no lag.
- Fully responsive (desktop / tablet / mobile) via Tailwind `max-*` breakpoints.
