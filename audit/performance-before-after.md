# Performance Before & After: `rankursite.com` (`perf-fixes` Branch)

**Measurement Environment (Lab Data)**:
- **Tool**: Lighthouse CLI `13.6.0`
- **Machine**: Local macOS (Apple Silicon), idle machine during all runs (no builds or parallel heavy tasks)
- **Server**: Local production build served via `npx next start -p 3100` (`http://localhost:3100/`)
- **Methodology**: 5 sequential idle runs per device; reporting median and min-max range because run-to-run variance on mobile is significant.

---

## 1. Summary Comparison (5-Run Medians & Ranges)

| Device | Metric | Baseline Median (Range) | After Median (Range) | Delta |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | Performance Score | **82** (79 - 96) | **91** (78 - 98) | **+9** |
| **Mobile** | LCP (Lab) | **1.32s** (1.25s - 2.01s) | **1.28s** (1.24s - 1.30s) | **-0.04s** |
| **Mobile** | CLS (Lab) | **0** (0 - 0) | **0** (0 - 0) | **0** |
| **Mobile** | TBT (Lab) | **710ms** (159ms - 907ms) | **376ms** (152ms - 1,022ms) | **-334ms** |
| **Desktop** | Performance Score | **100** (99 - 100) | **100** (100 - 100) | **0** |
| **Desktop** | LCP (Lab) | **0.51s** (0.47s - 0.62s) | **0.34s** (0.34s - 0.42s) | **-0.17s** |
| **Desktop** | CLS (Lab) | **0.022** (0.022 - 0.022) | **0** (0 - 0) | **-0.022** |
| **Desktop** | TBT (Lab) | **40ms** (7ms - 44ms) | **0ms** (0ms - 18ms) | **-40ms** |

---

## 2. All Individual Runs

### Baseline (`perf-fixes` at `41e66f2` before changes)

| Device | Run | Performance | LCP | CLS | TBT |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mobile | Run 1 | 79 | 1.32s | 0 | 907ms |
| Mobile | Run 2 | 96 | 2.01s | 0 | 159ms |
| Mobile | Run 3 | 80 | 1.25s | 0 | 835ms |
| Mobile | Run 4 | 84 | 1.65s | 0 | 577ms |
| Mobile | Run 5 | 82 | 1.25s | 0 | 710ms |
| Desktop | Run 1 | 100 | 0.47s | 0.022 | 40ms |
| Desktop | Run 2 | 100 | 0.57s | 0.022 | 42ms |
| Desktop | Run 3 | 99 | 0.62s | 0.022 | 7ms |
| Desktop | Run 4 | 100 | 0.50s | 0.022 | 44ms |
| Desktop | Run 5 | 100 | 0.51s | 0.022 | 9ms |

### After Fixes (`perf-fixes` at `d99a669`)

| Device | Run | Performance | LCP | CLS | TBT |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mobile | Run 1 | 78 | 1.28s | 0 | 1,022ms |
| Mobile | Run 2 | 82 | 1.30s | 0 | 734ms |
| Mobile | Run 3 | 91 | 1.30s | 0 | 376ms |
| Mobile | Run 4 | 98 | 1.26s | 0 | 152ms |
| Mobile | Run 5 | 97 | 1.24s | 0 | 205ms |
| Desktop | Run 1 | 100 | 0.34s | 0 | 0ms |
| Desktop | Run 2 | 100 | 0.34s | 0 | 2ms |
| Desktop | Run 3 | 100 | 0.34s | 0 | 18ms |
| Desktop | Run 4 | 100 | 0.40s | 0 | 0ms |
| Desktop | Run 5 | 100 | 0.42s | 0 | 0ms |

---

## 3. Commits & What Was Not Changed

- **`c31dec7` (`perf(step2.1)`)**: Self-hosted `Inter` (`400, 500, 700`, `display: 'swap'`) via `next/font/google` in `app/layout.jsx` and `src/styles/variables.css`; removed the 3 external `fonts.googleapis.com` / `fonts.gstatic.com` `<link>` tags (verified 0 external font render-blocking requests).
- **`e89faf4` (`perf(step2.2)`)**: Removed `animate-in animate-delay-1` (`opacity: 0` + `0.1s` delay) from `<h1 className="hero__title">` in `src/components/HeroSection.jsx` so the LCP heading paints immediately (element render delay dropped from `1,141ms` on live prod to `496ms` locally).
- **`d99a669` (`perf(step2.5)`)**: Added `content-visibility: auto; contain-intrinsic-size: auto 600px;` to 6 below-the-fold sections in `src/views/Home.css` (`.services-overview`, `.case-teaser`, `.niche-strip`, `.home-process`, `.home-blog-section`, `.home-cta-block`). CLS remained `0`.
- **Left untouched**:
  - `three.js`: Not present in `package.json` or imported anywhere in `src/` or `app/`.
  - Unused JS (`2iv477swe84rz.js`, 41% unused): Identified as Next.js/React's core `react-dom` client hydration runtime, not an unnecessary user import.
