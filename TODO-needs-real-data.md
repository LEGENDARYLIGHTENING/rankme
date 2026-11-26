# Real Data Requirements & Verification Tracking

This document logs every item on rankursite.com where real client metrics, measured performance telemetry, or approved contact information are required before publication.

All placeholder phrases and inline TODO strings have been removed from user-facing copy and code so visitors never see unfinished placeholders.

---

## 1. Homepage & Infrastructure Performance Metrics

- **File**: `src/views/Home.jsx`
  - **What is needed**: Real measured page load speed and edge delivery time (e.g. mobile LCP in seconds, mobile TTFB) to back performance statements.
  - **Who supplies it**: Moksh Parjapati (measured via Google PageSpeed Insights on mobile or webpagetest.org).
  - **Current status**: Displays plain Next.js SSR architecture wording. Local Lighthouse 13.6.0 Lab Data (5-run idle medians against local `next start` on `perf-fixes`, 2026-11-26) is **available, awaiting Moksh's approval to publish** (Baseline -> After: Mobile Perf 82 -> 91, LCP 1.32s -> 1.28s, CLS 0 -> 0, TBT 710ms -> 376ms; Desktop Perf 100 -> 100, LCP 0.51s -> 0.34s, CLS 0.022 -> 0, TBT 40ms -> 0ms; see `audit/performance-before-after.md`). Note: earlier desktop figure of 77 overlapped with a build and has been replaced.

- **File**: `src/components/TechStackBar.jsx`
  - **What is needed**: Measured Core Web Vitals LCP benchmark under edge network deployment.
  - **Who supplies it**: Moksh Parjapati.
  - **Current status**: Displays plain category "Web Performance Auditing". Lab Data medians are **available, awaiting Moksh's approval to publish** in `audit/performance-before-after.md`.

---

## 2. Wafa Educational & Charitable Trust Case Study

- **File**: `src/views/CaseStudies.jsx`
  - **What is needed**:
    1. **Detailed Features Built**: Specific list of functional deliverables implemented for Wafa (e.g. direct donation flow, programs directory, community healthcare portal, contact routing).
    2. **Measured PageSpeed/Lighthouse**: Exact mobile and desktop scores (Performance, Accessibility, Best Practices, SEO), test date, and device cohort.
    3. **Indexed Pages & Growth**: Total indexed URLs count and before/after traffic metrics from Google Search Console or Google Analytics 4.
    4. **Named Signatory**: Approved individual person name and official leadership title/designation from Wafa to accompany the testimonial quote.
  - **Who supplies it**: Moksh Parjapati and Wafa Trust Leadership.
  - **Current status**: Shows verified live platform link (https://www.wafatrustindia.org/) and architectural breakdown with zero invented numbers.

- **File**: `src/data/testimonials.js`
  - **What is needed**: Approved individual person name and official role from Wafa Educational & Charitable Trust.
  - **Who supplies it**: Wafa Trust Leadership and Moksh Parjapati.
  - **Current status**: Attributed to "Wafa Educational & Charitable Trust" under "Client Feedback".

---

## 3. Social Media & Identity Schema

- **File**: `app/layout.jsx` (Organization and Person JSON-LD Schema `sameAs`)
  - **What is needed**: Confirmation of official public profile URLs for Moksh Parjapati and Rankur.
  - **Who supplies it**: Moksh Parjapati.
  - **Current status**: Schema includes only the two profiles linked on the site (`https://linkedin.com/in/moksh-parjapati` and `https://twitter.com/moksh_rankur`). Unlinked Crunchbase and GitHub entries have been removed.

---

## 4. Operational & Lead Capture Integrations

- **File**: `src/components/LeadMagnet.jsx`
  - **What is needed**: Destination email marketing provider configuration (e.g. Mailchimp, ConvertKit, Web3Forms, or Resend API) to automate delivery of the B2B Website Conversion Checklist.
  - **Who supplies it**: Moksh Parjapati.
  - **Current status**: Captures email and displays instant on-page confirmation.

- **File**: `src/components/Guarantee.jsx`
  - **What is needed**: Final contractual terms for client satisfaction and milestone sign-off policies.
  - **Who supplies it**: Moksh Parjapati.
  - **Current status**: Neutral statement: "Milestone-based sign-off, terms in proposal."
