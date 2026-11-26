# Wafa Site (`https://www.wafatrustindia.org/`) Performance Patch Plan (Step 4)

**Repository Status**: The Wafa Educational & Charitable Trust repository is **not** present in this workspace or on local disk (`/Users/mokshparjapati/Desktop/FREELANCE WEBSITE` contains only `prototype` and `decaycheck`). Per instructions, no code was guessed or fabricated. Below is the exact patch description derived strictly from the measured Lighthouse Lab Data (`audit/pagespeed/lh-wafatrust-mobile-run3.json`: Mobile Perf `59`, LCP `5.06s`, TBT `913ms`).

---

## Exact Patch Description (To Apply in the Wafa Repository)

1. **Convert Hero & Project/Blog JPGs to WebP/AVIF with Explicit Dimensions**
   - **Target assets** (observed in `network-requests`):
     - `/assets/hero.jpg` (`133.1 KB`, LCP element)
     - `/assets/project-water-well.jpg` (`1,112.6 KB`)
     - `/assets/blog2.jpg` (`280.2 KB`), `/assets/project-hand-pump.jpg` (`280.1 KB`), `/assets/project-wazu-khana.jpg` (`265.0 KB`), `/assets/project-food-aid.jpg` (`245.9 KB`), `/assets/mosques.jpg` (`241.4 KB`), `/assets/project-water-tanker.jpg` (`216.2 KB`), `/assets/project-quran-dist.jpg` (`143.8 KB`), `/assets/blog4.jpg` (`143.8 KB`)
   - **Change**: Convert to WebP/AVIF sized to rendered dimensions, use `next/image` with `priority` on the hero image and `loading="lazy"` + `sizes` on below-the-fold project/blog cards.

2. **Preload the Hero Image**
   - **Change**: Add `<link rel="preload" as="image" href="/assets/hero.webp" />` (or `priority` on `next/image` for the hero slide) and avoid client-side JS slider opacity hiding on slide 1 so `/assets/hero` begins downloading immediately without waiting for `419.8ms` element render delay.

3. **Consolidate Render-Blocking Google Fonts (`Inter`, `Poppins`, `Manrope`)**
   - **Target** (observed in `render-blocking-insight`): 3 separate `fonts.googleapis.com` CSS requests (`853ms` wasted on `Inter` alone).
   - **Change**: Remove the external `<link>` tags and load only the font families and weights actually used via `next/font/google` with `display: 'swap'`.

4. **Eliminate Render-Blocking `font-awesome` CSS**
   - **Target** (observed in `render-blocking-insight`): `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css` (`19.4 KB`, `1,084ms` wasted).
   - **Change**: Replace Font Awesome classes with lightweight inline SVGs or tree-shaken `lucide-react` icons, and remove the `cdnjs` `<link>` stylesheet from `<head>`.

5. **Verification After Applying**
   - Run 5 idle mobile + 5 idle desktop Lighthouse audits before and after on a separate branch in the Wafa repo, reporting medians and min-max ranges without publishing any numbers until approved.
