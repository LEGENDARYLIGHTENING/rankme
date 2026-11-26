# Local Lighthouse Benchmark Summary (Lab Data)

All measurements below are **Lab Data** collected via local Lighthouse CLI (`13.6.0`), running 3 iterations per URL per device and reporting the median. Raw JSON outputs are stored in `audit/pagespeed/lh-*.json`.

---

## Median Results (3 Runs Each)

| URL | Device | Data Type | Test Date (UTC) | Performance Score (Median) | LCP (Median) | CLS (Median) | TBT (Median) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `https://rankursite.com/` | Mobile | Lab Data | 2026-11-25T17:58:35Z | 72 | 2.24s | 0 | 1,198ms |
| `https://rankursite.com/` | Desktop | Lab Data | 2026-11-26T09:52:15Z | 77 | 1.44s | 0.008 | 216ms |
| `https://www.wafatrustindia.org/` | Mobile | Lab Data | 2026-11-26T09:58:05Z | 59 | 5.06s | 0 | 913ms |
| `https://www.wafatrustindia.org/` | Desktop | Lab Data | 2026-11-26T10:01:15Z | 97 | 1.17s | 0 | 8ms |

*(Note: Local Lighthouse reports Total Blocking Time (TBT) as the lab proxy for Interaction to Next Paint (INP). Field/CrUX data is not included because the PageSpeed Insights API returned HTTP 429 `RATE_LIMIT_EXCEEDED` on project `583797351490`.)*
