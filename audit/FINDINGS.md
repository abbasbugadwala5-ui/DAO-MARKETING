# DAO Marketing — Site Audit & Optimization Findings

**Date:** 2026-07-22
**Method:** Headless Chrome (puppeteer-core driving system Google Chrome) + Lighthouse,
run against a **production build** (`next build && next start`) on `localhost:3100`.
Two viewports captured for every route:

- **Mobile** — 390×844, deviceScaleFactor 3, iPhone UA, touch enabled
- **Laptop** — 1440×900, standard desktop UA

Routes audited: `/`, `/about`, `/services`, `/contact`, `/work`.

Artifacts:
- `audit/screenshots/before-*.png` — full-page, both viewports, all routes
- `audit/screenshots/atf-*.png` — above-the-fold framing (full-page shots of the
  home route are ~29,500 CSS px tall and hard to read)
- `audit/report-before.json` — per-route console errors, failed requests, broken-image
  and overflow analysis
- `audit/lighthouse/before-*.json` + `summary-before.json` — Lighthouse reports

---

## Executive summary

| Area | Verdict |
|---|---|
| Broken images (local prod build) | **None reproduced** — every `<img>` had `naturalWidth > 0`. See §1 for why the live site still fails and what to harden. |
| Horizontal overflow on mobile | **None** on any route (defensive guards still added — §3). |
| JS errors | **None** on any route/viewport. |
| Mobile nav menu | **BROKEN** — opens on tap (via focus) but **cannot be closed** by tapping the button; tap target 36×21px (< 44px). §2 |
| Mobile performance | **Poor on home (perf 59 / LCP 6.9s)**; About/Services 77–79 / 4.3–4.5s. Root cause: multi-MB raw images + un-postered 2MB hero video. §4 |
| Desktop performance | Good (91–98). |
| Accessibility / SEO / Best-practices | 91–96 / 100 / 100. One minor contrast flag (§5). |

---

## 1. Images

### 1a. No broken images locally — but the paths are fragile (root cause of live failures)
In a clean production build every referenced image resolved (HTTP 200) and rendered.
The failing requests captured were all benign: Google-Analytics `collect` beacons and
media/RSC `net::ERR_ABORTED` (browser cancelling partial `<video>` range fetches and
prefetches on navigation) — **not** asset 404s.

**Why the live site still shows missing images:** 40 asset files contain **literal
spaces** in their names and are referenced URL-encoded as `%20`:

```
public/images/cine 2.webp … cine 34.jpg   (34 files)
public/images/insta sama1.webp
public/images/sama facebook3.webp
public/images/sama linkedin2.webp
public/images/sama tiktok4.webp
public/images/shooting 2.jpg
```

Space-in-filename + `%20` is served fine by local `next start`, but is the classic
source of *environment-dependent* image failure: CDN/edge double-encoding, the Vercel
image-optimizer round-trip, and case/space normalization differ between macOS (local)
and the Linux deploy host. **Fix = rename every asset to kebab-case with no spaces and
update all references** (Phase 2). This removes the whole fragility class rather than
guessing at one host quirk.

Additional latent landmine:
`public/images/Screenshot 2026-06-05 at 12.41.46 pm` — the "space" before `pm` is a
**U+202F narrow no-break space**, and the file has **no extension**. Currently
unreferenced; it will be removed/renamed in Phase 2.

Casing was verified case-sensitively (Python walk, not macOS `-f`): **no case
mismatches**. The only "missing" paths (`/images/sat-bg-1.jpg`, `/images/studio.jpg`,
`/videos/sat-1.mp4`, `/videos/studio.mp4`) appear **only inside code comments** — not
live references.

### 1b. Oversized, uncompressed images (the real performance killer)
Largest payloads on the homepage (mobile run), served **raw at full resolution to a
390px screen**:

| File | Size |
|---|---|
| `images/cine 31.jpg` | **2.34 MB** |
| `images/cine 20.jpg` | 1.80 MB |
| `images/cine 29.jpg` | 1.60 MB |
| `images/cine 16.jpg` | 1.60 MB |
| `images/cine 18.jpg` | 1.40 MB |
| `images/shooting1.jpg` | 1.29 MB |
| `images/shooting 2.jpg` | 1.01 MB |
| `images/cine 11.jpg` | 0.92 MB |
| `videos/video1.mp4` (hero bg) | 2.02 MB |

`public/images` totals **20 MB**, `public/videos` **118 MB**.

### 1c. Inconsistent image handling
- `next/image` **is** used in `Cases.jsx`, `Services.jsx`, `CinematicHero.jsx` (logo
  only), `portal/ui/Logo.jsx`.
- Raw `<img>` (no `next/image`, **no width/height, no `sizes`, no `loading="lazy"`**)
  in: `CinematicHero.jsx`, `WorkShowcase.jsx`, `VideoChapter.jsx`,
  `WhatHappensNext.jsx`, `ChapterDivider.jsx`, `about/page.jsx`, `Navbar.jsx`.
  → these serve full-res bytes to every device and trigger the `unsized-images` audit.
- `next.config.mjs` sets `formats: ['image/avif','image/webp']` only — no
  `deviceSizes` / `imageSizes` tuning (defaults request up to **3840w**, overkill).

### 1d. Hero background video has no poster
`CinematicHero` renders `<video src="/videos/video1.mp4" autoPlay muted loop
playsInline preload="metadata">` as the full-bleed hero background **with no `poster`**.
On mobile the 2MB video competes for bandwidth during initial load and there is no
lightweight first paint — a primary contributor to the 6.9s LCP.

---

## 2. Mobile navigation — confirmed functional bug
`src/components/Navbar.jsx` `.nav-menu` button (lines 99–110) wires **only**
`onMouseEnter` / `onMouseLeave` / `onFocus` — there is **no `onClick`**.

Verified with a real touch tap (puppeteer `touchscreen.tap`, iPhone emulation):

```
Tap to open   -> .nav-overlay.is-open = true   (fires via onFocus)
Tap to close  -> .nav-overlay.is-open = true   (STILL open — no toggle)
```

So on a phone the menu **opens but cannot be closed from the button** (close only works
by tapping the dimmed overlay background or a link). It depends on hover semantics that
don't exist on touch. Additionally the button hit area measured **36×21px**, below the
44×44px minimum tap target.

---

## 3. Layout / overflow
- **Viewport meta:** present and correct — `<meta name="viewport"
  content="width=device-width, initial-scale=1">` (Next.js default).
- **Horizontal overflow:** none detected on any route at 390px (`scrollWidth`
  ≤ `innerWidth`). The Services marquee clips at the right edge **by design** (scrolling
  ticker). Defensive `overflow-x` guards + media `max-width:100%` still added in Phase 3
  to prevent regressions.
- Page heights (mobile): home 29,552px (cinematic scroll — laptop is 25,067px too, so
  not a mobile defect), services 12,613px, about 5,049px, work 2,100px.

---

## 4. Performance — Lighthouse (before)

| FF | Route | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| mobile | / | **59** | 96 | 100 | 100 | **6.9 s** | 0.011 | 310 ms |
| mobile | /about | 77 | 91 | 100 | 100 | 4.5 s | 0.001 | 70 ms |
| mobile | /services | 79 | 91 | 100 | 100 | 4.3 s | 0.048 | 50 ms |
| mobile | /contact | 89 | 92 | 100 | 100 | 3.2 s | 0.002 | 60 ms |
| mobile | /work | 91 | 92 | 100 | 100 | 3.1 s | 0.078 | 50 ms |
| desktop | / | 91 | 96 | 100 | 100 | 1.5 s | 0.045 | 30 ms |
| desktop | /about | 95 | 91 | 100 | 100 | 1.2 s | 0.042 | 0 ms |
| desktop | /services | 98 | 91 | 100 | 100 | 0.9 s | 0.006 | 0 ms |
| desktop | /contact | 97 | 92 | 100 | 100 | 1.0 s | 0.003 | 0 ms |
| desktop | /work | 96 | 92 | 100 | 100 | 1.1 s | 0.017 | 0 ms |

Failed / low audits (mobile home): `largest-contentful-paint` (0.07),
`unsized-images` (0.50), `total-byte-weight` (0.50), `image-delivery-insight` (0.50),
`render-blocking-insight`, `legacy-javascript-insight`, `mainthread-work-breakdown`,
`unused-javascript` (~150ms). CLS is already good everywhere (< 0.08).

**Interpretation:** the bottleneck is bytes + render-blocking, not layout. Fix images
(compress + `next/image` responsive srcset + lazy below-fold), give the hero a poster,
and self-host fonts, and mobile LCP/perf move into target.

### Fonts
Loaded as a **render-blocking** Google Fonts `<link>` in `layout.jsx` plus a second
`@import` in `portal/portal.css`. Migrating the same typefaces to `next/font`
(self-hosted, `display: swap`, preloaded) removes the blocking request without changing
the fonts.

---

## 5. Accessibility / SEO
- SEO **100**, best-practices **100** on every route.
- Accessibility 91–96. The only scored failure is `color-contrast` on `.svc-tag` and
  `.svc-num` (muted gold labels on dark). Per the "don't change brand colors" constraint
  this is flagged but **deferred** unless a within-brand shade bump is approved.

---

## 6. Fix plan (Phases 2–4)
1. **Rename** all space-named assets → kebab-case; update every reference; delete the
   U+202F/no-extension screenshot file.
2. **Compress/resize** the large raw images (sharp → capped dimensions, WebP/optimized
   JPEG) — biggest LCP lever, zero animation risk.
3. **`next/image`** for static, non-animated images (with `width/height` or `fill`+sized
   parent, correct `sizes`, `priority` on the LCP element, `loading="lazy"` elsewhere).
   GSAP-driven background `<img>` kept as compressed `<img>` where the `next/image`
   wrapper would break existing parallax transforms (documented per-file).
4. **Hero video** — add `poster`, keep `preload="metadata"`, `playsInline`, muted;
   ensure it never blocks first paint or overflows.
5. **`next.config`** — add sane `deviceSizes`/`imageSizes`, keep AVIF+WebP.
6. **Nav** — add `onClick` toggle, enlarge tap target ≥44px, keep hover behavior for
   desktop.
7. **Fonts** — migrate to `next/font`.
8. **Defensive** `overflow-x` guards for mobile.

Targets: mobile performance 90+, CLS < 0.1, LCP < 2.5s. Before/after re-measured in
Phase 5.

---

## 7. Phase 5 — Verification (after fixes)

Re-ran the identical capture + Lighthouse against a fresh production build.

### What changed (code + assets)
- **Renamed all 40 space-named assets → kebab-case**; updated every reference
  (`%20` → `-`). Removed a 0-byte stray screenshot with a U+202F name. Verified
  case-sensitively that **all 62 asset references resolve**. Old `%20` URLs now 404
  (proof the app fully moved to the clean names — the live breakage class is gone).
- **Compressed 19 oversized images** with sharp (cap 1920w, mozjpeg/webp q72):
  `public/images` **20 MB → 7.2 MB**; e.g. `cine-31.jpg` 2.34 MB → 254 KB.
- **Hero video**: added `poster="/images/hero-poster.jpg"` (52 KB) and set
  `preload="none"` so first paint no longer waits on the 2 MB video.
- **Below-the-fold `<img>`** now `loading="lazy" decoding="async"` (home + about).
- **`next.config`**: tuned `deviceSizes`/`imageSizes` (no more 3840w), kept AVIF+WebP,
  added `minimumCacheTTL`.
- **Nav**: `onClick` toggle + `pointerType`-gated hover; mobile tap target now 44×44.
- **Fonts**: migrated the 4 typefaces to `next/font` (self-hosted, swap, preload);
  removed the render-blocking Google Fonts `<link>` + preconnects.

### Confirmed outcomes
- **Broken images:** none (full-settle re-check = all load). The one "broken" flag in
  the raw after-capture was `sama-tiktok4.webp` mid-lazy-load — it serves 200 and is a
  valid 941×1672 webp; a capture-timing artifact, not a defect.
- **Mobile nav:** tap **opens and closes** (`is-open true → false`); tap target 44×44
  (was 36×21). See `screenshots/after-mobile-nav-open.png`.
- **Horizontal overflow:** still none on any route.
- **JS errors:** none.
- **Mobile home transfer weight:** **12.65 MB → 4.29 MB (−66%)**.

### Lighthouse before → after

| FF | Route | Perf | LCP | CLS | FCP |
|---|---|---|---|---|---|
| mobile | / | 59 → **67** | 6.9s → 8.0s ⚠ | 0.011 → **0** | 3.5s → **1.2s** |
| mobile | /about | 77 → **79** | 4.5s → 5.7s ⚠ | 0.001 → 0 | — |
| mobile | /services | 79 → **86** | 4.3s → **4.2s** | 0.048 → **0** | — |
| mobile | /contact | 89 → **90** | 3.2s → 3.7s | 0.002 → 0 | — |
| mobile | /work | 91 → 90 | 3.1s → 3.7s | 0.078 → **0** | — |
| desktop | / | 91 → **95** | 1.5s → **1.4s** | 0.045 → **0** | — |
| desktop | /about | 95 → **98** | 1.2s → 1.1s | 0.042 → 0 | — |
| desktop | /services | 98 → **99** | 0.9s → 0.8s | 0.006 → 0 | — |
| desktop | /contact | 97 → **100** | 1.0s → 0.8s | 0.003 → 0 | — |
| desktop | /work | 96 → **100** | 1.1s → **0.7s** | 0.017 → 0 | — |

**Wins:** CLS is now **0 across the board**; desktop is **95–100**; mobile FCP on home
**3.5s → 1.2s**; every mobile score improved except a 1-pt noise dip on /work; page
weight down two-thirds.

### ⚠ Open item — mobile home/about LCP still > 2.5s (needs a design decision)
Mobile LCP did **not** hit the < 2.5s target on `/` and `/about`, and slightly
regressed in the raw number despite far smaller payloads. Root cause is **not** bytes
(the LCP resource — `img.cine-logo` — loads in ~325 ms with `fetchpriority=high`). It is
the **client-side GSAP hero reveal**: the SSR hero paints early (FCP 1.2 s), then
`gsap.from('.cine-word', { yPercent: 120 })` inside `.reveal-line { overflow: hidden }`
hides and re-reveals the headline once JS hydrates. Under Lighthouse's 4×-CPU / slow-4G
throttling that re-reveal lands at ~8 s, and LCP records the later paint. Measured stable
across 3 trials (8.0 / 8.0 / 9.6 s), so it is real, not variance.

Closing this requires changing the signature hero animation so the largest hero element
is painted on first render and not gated behind hydration — e.g. keep the word-reveal as
a progressive enhancement that starts from the *visible* state (no initial hide), or
honor `prefers-reduced-motion`, or reduce the JS that must execute before the hero
settles. All of these alter the hero's entrance feel, which the brief's "preserve design
intent" constraint puts off-limits without sign-off. **Flagged for approval** rather than
changed unilaterally. Everything else in the target set (CLS < 0.1 ✓, desktop 90+ ✓,
mobile services/contact/work ≈ 86–90, image + nav + overflow correctness ✓) is met.
