# Performance Diagnosis: `rankursite.com` and `wafatrustindia.org` (Report Only)

No site code or copy was modified in this step. All numbers below are **Lab Data** from local Lighthouse CLI (`13.6.0`).

---

## 1. Idle-Machine Mobile Lighthouse Runs (`https://rankursite.com/`)

All 5 runs below were executed sequentially on an idle machine with no builds or parallel heavy tasks running.

| Run | Performance Score | LCP | CLS | TBT (Lab INP proxy) | Timestamp (UTC) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Run 1 | 73 | 1.41s | 0 | 1,276ms | 2026-11-26T10:19:50Z |
| Run 2 | 83 | 2.75s | 0 | 358ms | 2026-11-26T10:21:05Z |
| **Run 3 (Median)** | **81** | **2.63s** | **0** | **432ms** | 2026-11-26T10:22:20Z |
| Run 4 | 79 | 2.50s | 0 | 579ms | 2026-11-26T10:23:35Z |
| Run 5 | 86 | 2.19s | 0 | 407ms | 2026-11-26T10:24:50Z |
| **5-Run Median** | **81** | **2.50s** | **0** | **432ms** | - |

- **Did earlier runs overlap with builds?**:
  - Earlier `rankursite` **desktop** runs 1 & 2 (`15:23-15:24 IST` / `09:53-09:54 UTC`) **did overlap** directly with `task-7874` (`next build`, `15:22-15:26 IST`), which explains the desktop Run 2 outlier (`Perf 44, TBT 982ms` vs Run 3 `Perf 99, TBT 52ms`).
  - Earlier `rankursite` **mobile** runs (`23:29-23:31 IST`) did not overlap with `next build`, though Run 2 had a severe outlier (`Perf 27, TBT 5,333ms`). On a clean idle run, mobile median improves from **72 (TBT 1,198ms)** to **81 (TBT 432ms)**.

---

## 2. Top Contributors (Median Run: `lh-rankursite-mobile-idle-run3.json`)

### Main-Thread Work Breakdown
- **Style & Layout**: 3,553 ms
- **Other**: 1,800 ms
- **Script Evaluation**: 935 ms
- **Rendering**: 539 ms
- **Script Parsing & Compilation**: 101 ms
- **Parse HTML & CSS**: 34 ms

### Long Tasks (> 50 ms)
- `https://rankursite.com/` (inline/document): `1,531 ms` (start 1,024 ms), `352 ms` (start 2,555 ms), `71 ms` (start 3,037 ms)
- `_next/static/immutable/chunks/0v93spgzu686z.js`: `173 ms`, `95 ms`
- `_next/static/immutable/chunks/353rupzidu9vw.js`: `108 ms`, `88 ms`, `76 ms`, `70 ms`

### Unused JavaScript
- `_next/static/immutable/chunks/353rupzidu9vw.js`: `71.2 KB` total, **`29.0 KB` wasted (41%)**

### Render-Blocking Resources (`render-blocking-insight`)
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap` (`1.2 KB`, **`837 ms` wasted**)
- Multiple small Next.js CSS chunks (`1ab9zk8jpfk8a.css` `0.8 KB`, `1_xbljz5ni-0w.css` `1.6 KB`, `25pdim8gjljl9.css` `1.1 KB`, `0zmfaxodpod_9.css` `1.3 KB`, `1w2srtv3nt4rc.css` `1.6 KB`, `2fqhvadzr1xaj.css` `2.5 KB`, `0lm-g4zlzz1ls.css` `1.2 KB`, `2twprau488j8h.css` `3.0 KB`, `23f0qz71-9jyu.css` `1.0 KB`).

### LCP Element & Subparts
- **LCP Element**: `<h1 class="hero__title animate-in animate-delay-1">Stop Losing Qualified Leads to a Website That Looks Busy But Converts Nothing</h1>`
- **Time to First Byte (TTFB)**: `84.8 ms`
- **Element Render Delay**: `1,141.3 ms`

---

## 3. Homepage JS Bundle Analysis (`.next/static/chunks/`)

`9` JS chunks are referenced directly in `.next/server/app/index.html`. Top 10 largest JS chunks in `.next/static/chunks/`:

| Rank | Chunk File | Size (KB) | Loaded on Homepage HTML | Primary Libraries / Modules |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `2iv477swe84rz.js` | 222.6 KB | Yes | `react-dom`, `home-view` |
| 2 | `1m53g0wpu6-am.js` | 173.2 KB | No | `app-components`, `home-view` |
| 3 | `0kj2w5k7-_mwu.js` | 161.9 KB | Yes | `turbopack/next-core` |
| 4 | `0cz1d0mv5g_q7.js` | 110.0 KB | Yes | `vendor/shared` |
| 5 | `17-n_e8b8ndnt.js` | 45.4 KB | Yes | `three.js` / UI components, `home-view` |
| 6 | `3nobys2s4dv2p.js` | 32.8 KB | No | `app-components`, `home-view` |
| 7 | `0mpa6tq-_iot5.js` | 31.9 KB | Yes | `app-components`, `home-view` |
| 8 | `1d8durn3f0db4.js` | 28.2 KB | Yes | `turbopack/next-core` |
| 9 | `01y-u7fh6u1cv.js` | 23.6 KB | No | `turbopack/next-core` |
| 10 | `3r5amzcgysv63.js` | 17.2 KB | No | `turbopack/next-core` |

---

## 4. Third-Party Scripts & External Resources on Homepage

| Resource / Provider | Type | Transfer Size | Loaded Before Interaction? | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `fonts.googleapis.com` (`Inter` CSS) | Stylesheet | 1.2 KB | **Yes** (`<head>` link) | Render-blocking (`837 ms` wasted in Lighthouse) |
| `fonts.gstatic.com` (`Inter` woff2) | Font | 47.3 KB | **Yes** (1,215-1,249 ms) | Triggered after Google Fonts CSS parses |
| Google Analytics (`gtag.js` `G-L49CTLKWYS`) | Analytics | 0 KB on initial load | **No** | Gated in `ConsentBanner.jsx`; loads only after user clicks Accept |
| Pixels / Chat widgets / Embeds | - | 0 KB | **No** | None present on homepage |

---

## 5. Ranked Fixes for `rankursite.com` (Proposed Only - Do Not Implement Yet)

1. **Replace render-blocking Google Fonts `<link>` with `next/font/google`**
   - **Target**: `app/layout.jsx` (`https://fonts.googleapis.com/css2?family=Inter...`).
   - **Expected Effect**: Eliminates `837 ms` render-blocking waterfall (**measured** from `render-blocking-insight`) and cuts external font DNS/TLS roundtrips, reducing hero `<h1>` element render delay (`1,141 ms`) toward sub-2s mobile LCP (**inference**).
2. **Remove `animate-in animate-delay-1` opacity/delay animation on above-the-fold Hero `<h1>`**
   - **Target**: `src/components/HeroSection.jsx` / CSS (`<h1 class="hero__title animate-in animate-delay-1">`).
   - **Expected Effect**: Eliminates artificial paint delay on the LCP element (`1,141 ms` element render delay **measured**; cutting animation delay immediately improves LCP paint timing **inference**).
3. **Code-split / lazy-load heavy interactive UI & animation bundles (`17-n_e8b8ndnt.js` 45.4 KB, `SpotlightCard`, below-fold sections)**
   - **Target**: `src/views/Home.jsx` and below-the-fold interactive cards (`dynamic(..., { ssr: false })` or CSS-only hover effects instead of JS mouse-tracking / animation state).
   - **Expected Effect**: Cuts main-thread `Style & Layout` (`3,553 ms` **measured**) and `Script Evaluation` (`935 ms` **measured**), and removes the `29.0 KB` (`41%`) unused JS in `353rupzidu9vw.js` (**measured**), lowering mobile TBT (`432 ms` -> <200 ms **inference**).
4. **Consolidate small CSS chunks & trim off-screen DOM depth (`589` elements, depth `14`)**
   - **Target**: Component CSS files and `<main>` height (`17,061 px` on mobile).
   - **Expected Effect**: Reduces `Style & Layout` recalculation overhead (`3,553 ms` **measured**) on mobile CPUs (**inference**).
5. **Images (`moksh_parjapati.jpg` / founder portrait & SVGs)**:
   - **Expected Effect**: Convert founder portrait to WebP/AVIF via `next/image` with explicit `sizes` and `loading="lazy"` (below the fold) to keep transfer minimal (**inference**; currently not the LCP element because `<h1>` is LCP).
6. **Third-party scripts**:
   - **Expected Effect**: `gtag.js` is already deferred behind consent (`0 KB` before interaction **measured**). No further third-party script deferral needed once Google Fonts is self-hosted via `next/font/google`.

---

## 6. Wafa Site (`https://www.wafatrustindia.org/`) Mobile LCP (`5.06s`) Diagnosis

From `audit/pagespeed/lh-wafatrust-mobile-run3.json` (median mobile run: Perf `59`, LCP `5.06s`, TBT `913ms`):

- **LCP Element**: `<img src="/assets/hero.jpg" alt="Be A Voice For Poor People">` (`133.1 KB`, inside `main > section.hero > div.hero-slide > img`).
- **What Delays It (Measured)**:
  1. **Render-blocking external CSS (`790 ms` estimated savings)**:
     - `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css` (`19.4 KB`, `1,084 ms` wasted)
     - Three separate Google Fonts CSS requests (`Inter`, `Poppins`, `Manrope` — `853 ms` wasted on `Inter` alone)
     - `_next/static/chunks/41hcn3bw21tzq.css` (`9.1 KB`, `153 ms` wasted)
  2. **Competing unoptimized JPG images loaded eagerly**:
     - `project-water-well.jpg` (**`1,112.6 KB`**), `blog2.jpg` (`280.2 KB`), `project-hand-pump.jpg` (`280.1 KB`), `project-wazu-khana.jpg` (`265.0 KB`), `project-food-aid.jpg` (`245.9 KB`), `mosques.jpg` (`241.4 KB`), `project-water-tanker.jpg` (`216.2 KB`) — over `2.6 MB` of raw JPGs competing with `hero.jpg` on throttled 4G mobile.
  3. **Element render delay (`419.8 ms`) & JS bootup (`0.8 s`)**:
     - Client JS chunks `0iec5q4ack_04.js` (`340.8 ms` scripting) and `07u_h6i539_wj.js` (`339.6 ms` scripting) delay hero slider/image render.
