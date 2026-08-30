# DecayCheck — V1 Technical Architecture

**Depends on:** `decaycheck-v1-prd.md` (frozen product requirements)
**Audience:** Antigravity implementation team

Guiding constraint from the product owner: the **core loop** (Detect → Prioritize → Explain → Refresh → Monitor → Measure → Resurface) is not a hypothesis and should be structurally stable. The **scoring numbers inside that loop** are hypotheses and must be changeable without touching the loop's plumbing. Every architectural decision below is made in service of that split.

---

## 1. System Architecture

```
User
  ↓
Frontend (Next.js — dashboard, page detail, onboarding, free report)
  ↓
Application/API layer (Next.js API routes / server actions)
  ↓
Auth (Supabase Auth — app login; separate Google OAuth for GSC data access)
  ↓
GSC Integration Layer (OAuth token mgmt, API client, quota-aware fetcher)
  ↓
Ingestion Pipeline (backfill + incremental sync jobs)
  ↓
Storage (Postgres via Supabase — raw metrics, aggregates, config)
  ↓
Decay Engine (qualification → scoring → diagnosis → explanation) — pure domain logic, no HTTP/DB coupling
  ↓
Priority/Dashboard read layer (materialized/cached views the API serves)
  ↓
Refresh Monitoring Engine (baseline freeze, checkpoint evaluation, resurfacing)
  ↓
Billing (Dodo Payments — webhook-driven entitlement sync, decoupled from app logic)
```

**Background jobs / scheduled processes** run alongside this, not inside request/response cycles:
- GSC incremental sync (per property, daily)
- Decay recalculation (after each sync, per property)
- Refresh-monitoring checkpoint evaluation (daily sweep)
- Free-diagnostic session cleanup (purge expired sessions/data)
- Billing reconciliation (webhook replay/verification safety net)

The single most important structural decision: **the Decay Engine is a standalone domain module with no dependency on HTTP handlers, React, or even Supabase client code.** It takes normalized metrics + a config object as input and returns qualification/score/diagnosis/explanation as output. This is what makes "change the algorithm without touching how users connect/view/refresh" achievable, and it's what makes fixture-based testing (Section 16) possible at all.

---

## 2. Technology Decisions

| Decision | Choice | Why this | Why not the obvious alternative | Problem it solves |
|---|---|---|---|---|
| Frontend + API | **Next.js (App Router) + TypeScript** | One codebase, one deploy, server components reduce client-side data-fetching complexity for a dashboard-heavy app; TypeScript gives the decay engine's config/threshold objects compile-time safety, which matters a lot given how many tunable numbers this product has | A separate SPA + API (e.g., React + Express) — more moving parts, more deploy surfaces, no real benefit for a solo developer at this scale | Keeps a solo developer shipping one thing, not coordinating two |
| Database | **Supabase (Postgres)** | Managed Postgres with built-in auth, RLS, and a generous free/low tier; Postgres gives real relational integrity for time-series metrics + real transactional guarantees for billing/entitlement state | A dedicated time-series DB (e.g., TimescaleDB, InfluxDB) — genuinely better for high-volume metrics, but DecayCheck's per-property, per-page daily volume is small (hundreds of pages × 1 row/day), so the operational overhead of a specialized DB isn't justified yet | Avoids infra sprawl; RLS gives a real security boundary instead of hand-rolled row filtering |
| GSC access | **Google Search Console API (Search Analytics + Sites endpoints) via OAuth 2.0** | Only viable source of this exact data; read-only scope (`webmasters.readonly`) directly satisfies the customer's stated trust requirement | None — this is the product's reason to exist | Core data source |
| Billing | **Dodo Payments** | Product owner's stated choice; webhook-based subscription model fits the entitlement-decoupling requirement | Stripe — equally valid technically, but not the owner's chosen provider; architecture below is written so swapping providers later only touches the billing adapter, not application logic | Subscription + entitlement management without hand-rolled billing logic |
| Background jobs | **Supabase Edge Functions + `pg_cron` (or a lightweight external scheduler like a Vercel Cron trigger calling API routes)** | No new infrastructure (queue, worker fleet) needed at this scale; `pg_cron` can trigger scheduled SQL/function calls directly against the same Postgres instance already in use | A dedicated queue (e.g., BullMQ + Redis, or a managed queue service) — real overkill for a handful of daily jobs processing at most a few hundred properties in V1; adds a service to operate for no volume-driven reason yet | Runs scheduled ingestion/recalculation without new infra to operate |
| Email | **Not required for V1** | Product owner explicitly excluded notifications/emails from V1 | — | N/A — deliberately deferred |
| Hosting | **Vercel (frontend/API) + Supabase (DB/Auth/Storage)** | Both are the "obvious pairing" for Next.js + Postgres, minimal ops burden, generous free tiers for a pre-revenue product | Self-hosted (e.g., a VPS with Docker) — more control, but meaningfully more ops work for a solo developer with no current need for that control | Ships fast, scales adequately for V1 volume without infra decisions becoming a distraction |

**Explicit non-decisions (deferred, not rejected):** a dedicated queue system, a specialized time-series store, and a third-party rank-tracking API are all things that could be justified later if volume or feature scope grows — but none are justified by V1's actual requirements, so none are built now.

---

## 3. Database Architecture

All tables use `uuid` primary keys (`gen_random_uuid()`) unless noted. Timestamps are `timestamptz`. RLS is enabled on every table containing user data; service-role bypass is used only by background jobs.

### `users`
Managed by Supabase Auth (`auth.users`); this app-level table extends it.
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK, = `auth.users.id`) | |
| `email` | text | |
| `created_at` | timestamptz | |
| `subscription_status` | text | denormalized cache of current entitlement state (`free`, `active`, `past_due`, `canceled`) — source of truth is `subscriptions`, this is a fast-read cache updated by the billing webhook handler |

RLS: user can read/update only their own row.

### `properties`
The site/property abstraction — **built multi-property-capable from day one even though V1 UI only ever surfaces one per user.**
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | |
| `gsc_site_url` | text | GSC's own identifier (domain property or URL-prefix property string) |
| `property_type` | text | `domain` \| `url_prefix` |
| `display_name` | text | |
| `is_active` | boolean | **exactly one `true` per user in V1**, enforced at application level, not a DB constraint — so lifting the limit later needs no migration |
| `connected_at` | timestamptz | |
| `disconnected_at` | timestamptz, nullable | |
| `last_synced_at` | timestamptz, nullable | |
| `last_reliable_data_date` | date, nullable | the freshness-indicator date shown in UI |

Index: `(user_id, is_active)`. RLS: user can read/write only their own properties.

### `oauth_connections`
Separate from `properties` because a token belongs to a Google account, not a single property — a Google account can grant access to several properties.
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | |
| `provider` | text | `google` (only value in V1) |
| `access_token` | text, **encrypted at rest** | short-lived |
| `refresh_token` | text, **encrypted at rest** | long-lived; the sensitive one |
| `scope` | text | must always equal the read-only GSC scope; validated on every token refresh |
| `expires_at` | timestamptz | |
| `revoked_at` | timestamptz, nullable | set on disconnect |
| `created_at` | timestamptz | |

RLS: user can read only their own row; only service-role can write `access_token`/`refresh_token` (writes happen in server-side token-refresh logic only).

### `page_metrics_daily`
Page-level GSC metrics.
| Column | Type | Notes |
|---|---|---|
| `id` | bigint (PK, identity) | high-volume table, use bigint not uuid |
| `property_id` | uuid (FK → properties) | |
| `page_url` | text | |
| `date` | date | |
| `clicks` | integer | |
| `impressions` | integer | |
| `ctr` | numeric(6,4) | stored even though derivable, avoids recompute-everywhere |
| `avg_position` | numeric(6,2) | |

Unique constraint: `(property_id, page_url, date)` — this is what prevents duplicate ingestion on re-sync/retry. Index: `(property_id, page_url, date)`, `(property_id, date)`.

### `query_metrics_daily`
Query-level GSC metrics — **only stored for pages that have cleared the qualification gate** (per PRD Section M), not site-wide.
| Column | Type | Notes |
|---|---|---|
| `id` | bigint (PK, identity) | |
| `property_id` | uuid (FK → properties) | |
| `page_url` | text | |
| `query` | text | |
| `date` | date | |
| `clicks` | integer | |
| `impressions` | integer | |
| `ctr` | numeric(6,4) | |
| `avg_position` | numeric(6,2) | |

Unique constraint: `(property_id, page_url, query, date)`. Index: `(property_id, page_url, date)`.

### `page_decay_snapshots`
The output of the Decay Engine for a given page, recomputed on each sync — **this table is the explainability record**, not just a score cache.
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `property_id` | uuid (FK → properties) | |
| `page_url` | text | |
| `computed_at` | timestamptz | |
| `current_window_start` / `current_window_end` | date | the rolling 90-day current period actually used |
| `previous_window_start` / `previous_window_end` | date | |
| `current_clicks` / `previous_clicks` | integer | |
| `historical_peak_clicks` | integer, nullable | up to 12-month context |
| `absolute_click_loss` | integer | |
| `percent_click_loss` | numeric(6,2) | stored for display only, never used in scoring |
| `current_avg_position` | numeric(6,2) | |
| `qualification_status` | text | `QUALIFIED` \| `INSUFFICIENT_HISTORY` \| `BELOW_FLOOR` \| `NOT_DECLINING` |
| `recoverability_band` | text, nullable | populated only if qualified |
| `recoverability_multiplier` | numeric, nullable | the actual value used, snapshotted (not just looked up live) so historical scores remain reproducible even if config changes later |
| `query_concentration_factor` | numeric, nullable | secondary adjustment value used |
| `priority_score` | numeric, nullable | final computed score |
| `priority_label` | text, nullable | `High` \| `Medium` \| `Low` |
| `diagnosis_category` | text, nullable | `RANKING_DRIVEN` \| `CTR_DRIVEN` \| `BOTH` \| `MIXED_UNCLEAR` |
| `diagnosis_detail` | jsonb | stores the component deltas + the exact evidence numbers used in the "why this page" explanation, so the UI never has to recompute or guess |
| `config_version_id` | uuid (FK → engine_config_versions) | **critical for explainability/audit**: which config values produced this snapshot |

Index: `(property_id, computed_at)`, `(property_id, page_url, computed_at)`. This table is naturally append-only/historical — old snapshots aren't deleted, giving a free audit trail of how a page's status evolved.

### `engine_config_versions`
This is the table that makes "everything configurable, nothing hardcoded" real rather than aspirational.
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `created_at` | timestamptz | |
| `label` | text | e.g. `"v1-initial"`, `"v1-tuned-2026-09"` |
| `is_active` | boolean | exactly one active row at a time |
| `config` | jsonb | contains every tunable value: `minimum_history_months`, `traffic_floor_clicks`, `historical_peak_threshold`, `recoverability_bands` (array of `{min_position, max_position, multiplier}`), `query_concentration_weight`, `diagnosis_thresholds` (`{ranking_position_delta, ctr_drop_pct, impression_flat_band}`), `recovery_threshold_pct`, `stabilization_threshold_pct`, `monitoring_checkpoints_days` (`[28, 56, 90]`) |
| `validation_status` | text | `INITIAL_NEEDS_VALIDATION` \| `VALIDATED` — every value shipped at launch is `INITIAL_NEEDS_VALIDATION` per the product owner's instruction |

The Decay Engine always reads the currently-active config row at computation time and snapshots its `id` onto every `page_decay_snapshots` row it produces. Changing the algorithm = inserting a new config row and flipping `is_active` — no code deploy required for threshold tuning, only for genuinely new logic.

### `refresh_events`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `property_id` | uuid (FK → properties) | |
| `page_url` | text | |
| `refreshed_at` | timestamptz | |
| `note` | text, nullable | |
| `baseline_snapshot_id` | uuid (FK → page_decay_snapshots) | the exact snapshot in effect at mark-time — this **is** the frozen pre-refresh baseline |
| `status` | text | `MONITORING` \| `RESOLVED` |
| `superseded_by` | uuid, nullable (FK → refresh_events) | see multi-refresh handling in Section 8 |

Index: `(property_id, page_url, status)`.

### `refresh_outcomes`
One row per checkpoint evaluation, not one row per refresh — preserves the full evaluation history.
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `refresh_event_id` | uuid (FK → refresh_events) | |
| `checkpoint_day` | integer | `28` \| `56` \| `90` |
| `evaluated_at` | timestamptz | |
| `post_refresh_clicks_28d` | integer | rolling 28-day window ending at evaluation date |
| `pre_refresh_clicks_28d` | integer | from the frozen baseline snapshot's window |
| `outcome` | text | `TOO_EARLY` \| `RECOVERED` \| `STABILIZED` \| `STILL_DECLINING` |
| `config_version_id` | uuid (FK → engine_config_versions) | which thresholds produced this verdict |

### `subscriptions`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | |
| `dodo_customer_id` | text | |
| `dodo_subscription_id` | text | |
| `plan` | text | `free` \| `pro` |
| `status` | text | `active` \| `past_due` \| `canceled` \| `incomplete` |
| `current_period_end` | timestamptz | |
| `updated_at` | timestamptz | |

RLS: user reads their own row; only service-role (webhook handler) writes.

### `entitlements`
Deliberately separate from `subscriptions` — this is the app-facing table; `subscriptions` is the billing-facing mirror. This indirection is what lets billing providers change without touching application authorization checks.
| Column | Type | Notes |
|---|---|---|
| `user_id` | uuid (PK, FK → users) | |
| `has_ongoing_sync` | boolean | |
| `has_query_analysis` | boolean | |
| `has_refresh_tracking` | boolean | |
| `has_monitoring` | boolean | |
| `updated_at` | timestamptz | |

Recomputed (not just copied) from `subscriptions.status`/`plan` whenever a webhook fires — this table is what every API authorization check reads, never `subscriptions` directly.

### `diagnostic_sessions`
The free report — intentionally isolated from the authenticated-user data model.
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `created_at` | timestamptz | |
| `expires_at` | timestamptz | short-lived, e.g. 24–72h |
| `gsc_site_url` | text | |
| `oauth_access_token` | text, encrypted, nullable | **discarded, not stored long-term** — see Section 10 |
| `ip_address` | inet | for rate limiting |
| `email` | text, nullable | if captured for conversion follow-up (business decision, not yet made — flagged) |
| `result_payload` | jsonb | the top-5 result, so a returning visitor within the session window doesn't trigger a re-pull |
| `converted_to_user_id` | uuid, nullable (FK → users) | |

### `sync_jobs`
Job/state tracking, not a generic queue — small enough volume that a table is sufficient.
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `property_id` | uuid (FK → properties) | |
| `job_type` | text | `INITIAL_BACKFILL` \| `INCREMENTAL_SYNC` \| `DECAY_RECALC` \| `MONITORING_EVAL` |
| `status` | text | `PENDING` \| `RUNNING` \| `SUCCEEDED` \| `FAILED` |
| `started_at` / `completed_at` | timestamptz, nullable | |
| `error_detail` | text, nullable | |
| `retry_count` | integer | default 0 |

### `audit_events`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid, nullable | |
| `event_type` | text | `OAUTH_GRANTED`, `OAUTH_REVOKED`, `PROPERTY_DISCONNECTED`, `DATA_DELETED`, `REFRESH_MARKED`, `SUBSCRIPTION_CHANGED` |
| `detail` | jsonb | |
| `created_at` | timestamptz | |

---

## 4. GSC Ingestion Architecture

```
Google OAuth (consent, read-only scope)
  → property discovery (list Search Console sites the account can access)
  → property selection (user picks one; row created in `properties`, `is_active = true`)
  → initial sync (INITIAL_BACKFILL job)
      - fetch up to 16 months of page + query-level data (GSC's own retention limit)
      - stored to `page_metrics_daily` (all pages) — query-level deferred until qualification is known
  → decay recalculation (DECAY_RECALC job) runs immediately after backfill completes
      - determines qualifying pages
      - triggers query-level backfill only for qualifying pages
  → daily incremental sync (INCREMENTAL_SYNC job, scheduled)
      - fetches only new/updated dates since `last_synced_at`, respecting GSC's own 2–3 day data-lag
      - upserts into `page_metrics_daily` (unique constraint handles idempotency/dedup automatically — safe to re-run)
  → normalization: CTR is recomputed from clicks/impressions at read time for display consistency, but GSC's own reported CTR is also stored (they can differ slightly due to rounding — store both raw and computed if they diverge, log the divergence for observability)
  → aggregation: 90-day rolling windows are computed on read (via a SQL window function / materialized view), not pre-aggregated into a separate table — at V1 volume (hundreds of pages, one property) this is cheap enough not to need pre-aggregation, and avoids a second source of truth to keep in sync
  → decay calculation: DECAY_RECALC job runs after every incremental sync, recomputing `page_decay_snapshots` for all pages (cheap at this scale — no need to compute only "changed" pages in V1)
```

**Fetch cadence:** once daily per property (matches the product's "continuous but not real-time" requirement — daily is far more than enough given the product surfaces a monthly-review workflow).

**How far back:** GSC's API itself only retains ~16 months of history — this is a hard external constraint, not a product choice. Initial backfill pulls the maximum available.

**What gets recomputed vs. stored:** raw daily metrics are stored once and never recomputed (they're historical fact). Everything downstream — 90-day windows, qualification, scores, diagnosis — is recomputed from raw metrics on every `DECAY_RECALC` run, using whatever `engine_config_versions` row is currently active. This means re-tuning thresholds later requires zero data re-ingestion, only a recalculation pass.

**Failed syncs / retries:** `sync_jobs.status = FAILED` with `error_detail` populated; retry via exponential backoff up to a fixed cap (e.g., 5 attempts over 24h), then the property's `last_synced_at` simply stops advancing and the dashboard's freshness indicator naturally reflects the staleness ("Last reliable analysis: 6 days ago") rather than silently failing — this is the honest degradation path the product owner already asked for.

**Duplicate prevention:** the `(property_id, page_url, date)` unique constraint on `page_metrics_daily` makes every ingestion write an upsert — re-running a sync (including retries) is always safe.

**Quota respect:** GSC API quotas are per-project and generous for this data volume; the ingestion job processes properties sequentially with a small delay between API calls rather than firing all requests in parallel, keeping well under any realistic quota ceiling for a single-property-per-user V1.

---

## 5. Decay Engine (Isolated Domain Module)

```
Input: raw daily metrics for one page (from `page_metrics_daily`/`query_metrics_daily`) + active `engine_config_versions.config`
  ↓
Qualification: determines QUALIFIED / INSUFFICIENT_HISTORY / BELOW_FLOOR / NOT_DECLINING
  ↓
Scoring: (only if QUALIFIED) computes Lost Value × Recoverability, adjusted by the secondary query-concentration factor
  ↓
Diagnosis: (only if QUALIFIED) classifies RANKING_DRIVEN / CTR_DRIVEN / BOTH / MIXED_UNCLEAR
  ↓
Explanation: assembles the evidence object (exact numbers) that both the UI and the score itself are derived from — the explanation is not generated after the fact from the score, it's the same computation the score is built on, so it can never disagree with the score
  ↓
Output: a plain object matching the `page_decay_snapshots` schema — no DB writes happen inside the engine itself
```

This module is pure (no I/O): given the same metrics + config, it always produces the same output. That purity is what makes it fixture-testable (Section 16) and what makes "improve the algorithm without touching the rest of the product" actually true — a caller (a background job) fetches data, calls the engine, and persists the result; the engine itself never touches Postgres, HTTP, or Next.js.

**Query concentration as a secondary adjustment (per product owner's Section 1 decision):** the primary score is `absolute_click_loss × recoverability_multiplier`. Query concentration then applies a bounded secondary multiplier (e.g., a value between roughly 0.9 and 1.1, configurable) — high concentration (most of the loss traced to 1–3 queries) nudges the score up slightly; a very spread-out loss nudges it down slightly. The bound is enforced in code (not just convention) so a low-value page's concentration factor can never push it above a genuinely stronger opportunity — this is a config-value ceiling on the adjustment's range, not just a design intention.

---

## 6. Configuration-Driven Algorithm

The `engine_config_versions.config` JSON shape (all values `INITIAL_NEEDS_VALIDATION` at launch):

```json
{
  "minimum_history_months": 6,
  "traffic_floor_clicks_per_month": 35,
  "historical_peak_qualifying_clicks": 200,
  "recoverability_bands": [
    {"min_position": 1, "max_position": 10, "multiplier": 1.0},
    {"min_position": 11, "max_position": 15, "multiplier": 0.8},
    {"min_position": 16, "max_position": 20, "multiplier": 0.55},
    {"min_position": 21, "max_position": 30, "multiplier": 0.3},
    {"min_position": 31, "max_position": 999, "multiplier": 0.15}
  ],
  "query_concentration_adjustment_range": {"min": 0.9, "max": 1.1},
  "diagnosis_thresholds": {
    "position_worsened_delta": 1.0,
    "ctr_drop_pct": 15,
    "impression_flat_band_pct": 10
  },
  "recovery_threshold_pct": 90,
  "stabilization_threshold_pct": 50,
  "monitoring_checkpoints_days": [28, 56, 90]
}
```

This entire object lives in one table, editable via a single admin action (a Supabase Studio row edit is sufficient for V1 — no admin UI needs to be built). Antigravity should treat this JSON shape as the single obvious place to change algorithm behavior, per the product owner's explicit instruction.

---

## 7. Explainability

Every `page_decay_snapshots.diagnosis_detail` field stores a structured evidence object, not prose:

```json
{
  "absolute_click_loss": 842,
  "position_change": {"from": 7.2, "to": 11.4},
  "top_query": {"query": "...", "click_loss": 190},
  "recoverability_band": "11-15",
  "recoverability_note": "current position remains within recoverable range"
}
```

The API never returns a bare `priority_score` without this object alongside it — the frontend contract (Section 13) makes the evidence object a required field, not optional, so it's structurally impossible to ship a screen with "Priority Score: 87" and nothing else.

---

## 8. Refresh Monitoring Architecture

```
Mark as Refreshed
  → freeze baseline: create `refresh_events` row, `baseline_snapshot_id` = the page's current (most recent) `page_decay_snapshots` row
  → status = MONITORING
  → checkpoints (28/56/90 days) evaluated by a daily MONITORING_EVAL job that checks: "any refresh_events with status=MONITORING where refreshed_at + checkpoint_day has passed and no refresh_outcomes row exists for that checkpoint yet"
  → evaluate: compute rolling 28-day post-refresh clicks vs. the baseline snapshot's pre-refresh 28-day clicks; classify TOO_EARLY / RECOVERED / STABILIZED / STILL_DECLINING per config thresholds
  → outcome persisted to `refresh_outcomes`
  → at the 90-day checkpoint, if outcome = STILL_DECLINING: `refresh_events.status = RESOLVED`, and the page becomes eligible again for the main "act now" list on the next DECAY_RECALC run (no extra flag needed — the decay engine naturally re-qualifies it since it's no longer excluded by an active MONITORING status)
```

**Multiple refreshes on the same page while monitoring is active:** a new "Mark as Refreshed" action while an existing `refresh_events` row for that page has `status = MONITORING` does **not** create a second independent monitoring cycle. Instead: the existing row is closed (`status = RESOLVED`, treated as superseded — the customer effectively re-refreshed before the verdict was in), a new `refresh_events` row is created with `superseded_by` left null on the new row but pointing *from* the old row *to* the new one, and the new row's baseline snapshot is the page's current state at the moment of the second mark. This means a second refresh always restarts the clock rather than corrupting the original baseline — the product owner's stated concern.

---

## 9. Billing Architecture

```
Checkout (Dodo-hosted or embedded checkout)
  → payment
  → Dodo sends a webhook (subscription.created / subscription.updated / subscription.canceled / payment.failed, etc.)
  → webhook handler verifies signature, is idempotent (checks a stored `dodo_event_id` to ignore duplicate deliveries)
  → updates `subscriptions` row
  → recomputes `entitlements` row from the new `subscriptions` state
  → application-facing authorization checks read only from `entitlements`, never from Dodo or `subscriptions` directly
```

**Duplicate webhook:** every incoming webhook's provider-side event ID is checked against a `processed_webhook_events` table (id, event_id unique, processed_at) before any state change is applied — duplicates are logged and no-op'd.

**Failed payment:** `subscriptions.status = past_due`; `entitlements` downgraded to free-tier flags after a grace period (config value, e.g. 7 days) to avoid punishing a single transient card failure immediately.

**Cancellation:** `subscriptions.status = canceled`; entitlements remain active until `current_period_end`, then downgrade — standard "access through the period you paid for" behavior.

**Renewal:** webhook updates `current_period_end`; no entitlement change needed if already active.

**Refund:** treated as an explicit downgrade event triggered by its own webhook type; entitlements revoked immediately rather than at period end, since a refund implies the period wasn't actually paid for.

**Downgrade (e.g., a future multi-tier world):** entitlements table is granular per-capability specifically so a future tier change only means writing different boolean combinations, not restructuring the table.

---

## 10. Free Diagnostic Architecture

```
Diagnostic session created (anonymous, `diagnostic_sessions` row, expiry set)
  → temporary GSC OAuth (same Google consent screen, same read-only scope, but the resulting access token is used once, immediately, and never persisted beyond the session's short TTL)
  → data pull (single fetch, no ongoing sync scheduled — no `properties` row, no `oauth_connections` row created)
  → analysis (same Decay Engine, called directly with the pulled data — full reuse of the same qualification/scoring/diagnosis logic, not a separate simplified algorithm)
  → top 5 results + 1–3 teaser queries per page persisted to `diagnostic_sessions.result_payload` (so revisiting the same session link doesn't re-trigger a Google consent flow or re-pull data)
  → conversion: if the visitor signs up, `converted_to_user_id` is set and the *first real* `properties`/`oauth_connections` rows are created fresh through the normal authenticated flow — the diagnostic session's token is never promoted into a permanent connection, it's simply discarded after the session expires (or immediately after conversion, whichever comes first)
```

**What is retained:** the `result_payload` (analysis output only — no raw daily metrics are persisted from a diagnostic session). **What is discarded:** the OAuth access token, always, and any raw metrics fetched, immediately after analysis completes.

**Abuse prevention (per product owner's Section 4 instruction):**
- Rate limit diagnostic session creation per IP address (e.g., N per day, config value)
- Rate limit per Google account (a user could rotate IPs but not easily rotate verified GSC-owning accounts)
- Session TTL keeps stale sessions from accumulating
- No diagnostic session can trigger a background sync job — it only ever runs the one-shot pull-and-analyze path, so even if abused, it cannot become a source of ongoing GSC API load

---

## 11. Security

- **OAuth tokens:** encrypted at rest (Postgres column-level encryption or Supabase Vault); `refresh_token` never returned in any API response, ever, including to the authenticated owner's own client.
- **Token compromise/revocation:** if a refresh token is revoked externally (user removes DecayCheck's access from their Google account), the next sync attempt fails with an auth error; the job marks the property `last_synced_at` as stalled, sets `oauth_connections.revoked_at`, and the dashboard surfaces a clear "reconnect your Google account" state rather than silently failing forever.
- **GSC data:** covered by RLS — a user's `page_metrics_daily`/`query_metrics_daily`/`page_decay_snapshots` rows are only readable via their owning `property_id`, itself scoped to `user_id`.
- **Database:** RLS enabled on every table with user data; service-role key (which bypasses RLS) is used only in background job contexts, never exposed to the frontend.
- **API endpoints:** every authenticated route validates the Supabase session server-side; no endpoint trusts a client-supplied `user_id`.
- **Billing webhooks:** signature-verified against Dodo's webhook secret; requests without a valid signature are rejected before any parsing.
- **Diagnostic sessions:** no authentication (by design — it's a pre-signup flow), but rate-limited and short-lived as above; session IDs are unguessable UUIDs, not sequential.
- **Secrets:** all provider credentials (Google OAuth client secret, Dodo API key, DB service role key) live in environment variables, never committed, never exposed to the client bundle.
- **Logs:** GSC data content (page URLs, click numbers) is not excluded from logs by policy necessity, but access tokens and refresh tokens must never appear in any log line — enforced by never passing the raw token object to a generic logger, only to the specific fetch call that needs it.

---

## 12. Background Jobs

| Job | Trigger | Input | Output | Retry | Idempotency | Failure state |
|---|---|---|---|---|---|---|
| `INITIAL_BACKFILL` | Property connected | `property_id` | populated `page_metrics_daily` | up to 5x, exponential backoff | safe — unique constraint dedupes | `sync_jobs.status=FAILED`; property shows "sync pending" |
| `INCREMENTAL_SYNC` | Daily cron, per active property | `property_id`, `last_synced_at` | new rows in `page_metrics_daily` | up to 5x | safe — upsert on unique constraint | `last_synced_at` stops advancing; freshness indicator reflects staleness |
| `DECAY_RECALC` | After successful sync (chained) | `property_id` | new `page_decay_snapshots` rows for all pages | up to 3x | safe — always a fresh full recompute, no partial-state risk | prior snapshot remains visible (stale but not wrong) until recalc succeeds |
| `MONITORING_EVAL` | Daily cron | all `refresh_events` with `status=MONITORING` past a checkpoint | new `refresh_outcomes` rows | up to 3x | safe — checks for existing outcome row at that checkpoint before creating one | logged; re-attempted next day |
| `DIAGNOSTIC_SESSION_CLEANUP` | Daily cron | expired `diagnostic_sessions` | deleted rows | n/a | safe — deleting an already-deleted row is a no-op | logged only |
| `BILLING_RECONCILIATION` | Daily cron (safety net, not primary path) | active subscriptions | corrects any `entitlements` drift vs. Dodo's actual state | n/a | safe — recomputation, not accumulation | logged; alerts if drift found repeatedly |

---

## 13. API Contracts

All authenticated endpoints require a valid Supabase session; `401` on missing/invalid session.

**`POST /api/oauth/google/callback`**
- Auth: session required
- Request: `{ code: string }` (OAuth authorization code)
- Response: `{ properties: [{ gsc_site_url, property_type, display_name }] }`
- Errors: `400` invalid code, `502` Google API failure

**`POST /api/properties`** — select and connect one property
- Auth: session required
- Request: `{ gsc_site_url: string }`
- Response: `{ property_id: string, status: "backfill_queued" }`
- Errors: `409` if user already has an active property (V1 single-property rule), `400` invalid site

**`GET /api/dashboard`**
- Auth: session required
- Response:
```json
{
  "last_reliable_data_date": "2026-08-27",
  "opportunities": [
    {
      "page_url": "...",
      "priority_label": "High",
      "priority_score": 71.2,
      "absolute_click_loss": 842,
      "percent_click_loss": 34.1,
      "diagnosis_category": "RANKING_DRIVEN",
      "evidence": { "position_change": {"from": 7.2, "to": 11.4}, "top_query": {"query": "...", "click_loss": 190} },
      "refresh_status": null
    }
  ],
  "total_qualifying_count": 14
}
```
- Errors: `404` no active property connected yet

**`GET /api/pages/:page_url/detail`** (page_url URL-encoded)
- Auth: session required
- Response: full snapshot + top-10 query table + refresh history
- Errors: `404` page not found for this property

**`POST /api/pages/:page_url/mark-refreshed`**
- Auth: session required, `entitlements.has_refresh_tracking = true`
- Request: `{ note?: string }`
- Response: `{ refresh_event_id: string, status: "MONITORING" }`
- Errors: `403` not entitled, `404` page not found

**`GET /api/monitoring`** — the secondary "in progress" view
- Auth: session required
- Response: list of `refresh_events` with `status=MONITORING`, current checkpoint status

**`POST /api/diagnostic/start`**
- Auth: none (rate-limited by IP)
- Request: `{ oauth_code: string }`
- Response: `{ session_id: string }`
- Errors: `429` rate limited, `400` invalid code

**`GET /api/diagnostic/:session_id`**
- Auth: none (session_id is the credential; unguessable UUID)
- Response: top-5 result payload
- Errors: `404` expired/not found

**`POST /api/billing/webhook`**
- Auth: Dodo signature header verification (not a user session)
- Request: raw Dodo webhook payload
- Response: `200` (always, once verified and processed/no-op'd) to prevent provider retry storms
- Errors: `400` invalid signature

**`POST /api/properties/:id/disconnect`**
- Auth: session required, owns the property
- Response: `{ status: "disconnected", data_deletion_scheduled_for: "..." }`
- Errors: `404`

---

## 14. Frontend Architecture

**Routes:**
- `/` — marketing/free-report entry
- `/report/:session_id` — free diagnostic result
- `/onboarding` — Google connect + property selection
- `/dashboard` — main prioritized list (the core screen)
- `/dashboard/pages/:page_url` — page detail
- `/dashboard/monitoring` — secondary monitoring view
- `/settings/billing`, `/settings/account` (includes disconnect)

**Components** are organized around the product's decision hierarchy (Priority → Opportunity → Evidence → Score), not around generic UI atoms — e.g., an `OpportunityCard` component always renders in that fixed order, so no screen can accidentally lead with a bare score.

**State management:** server components + React Server Actions for mutations (mark-as-refreshed, disconnect); no global client state library needed at this scope — the dashboard's data is fetched server-side per request, which also naturally respects RLS without duplicating auth logic client-side.

**Data fetching:** direct server-side Supabase queries in server components for reads; API routes only where a client-triggered action (mutation, webhook, OAuth callback) requires them.

**Loading/error/empty states:**
- Dashboard loading → skeleton rows
- Dashboard empty (zero qualifying pages) → the explicit positive empty state from the PRD
- Property not yet synced → "first sync in progress" state, not a blank dashboard
- Sync stalled/stale → freshness indicator + a visible (non-alarming) "reconnect" prompt if the OAuth token itself has failed
- Diagnostic session expired → clear "this report has expired, run a new one" state, not a generic 404

---

## 15. Observability

Log/monitor at minimum:
- GSC sync failures (per property, with `error_detail`) — alert if a property fails 3+ consecutive days
- Stale properties (`last_synced_at` older than 48h) — dashboard shows this to the user regardless, but it should also be an internal metric
- API quota issues (rate-limit responses from Google) — logged distinctly from generic failures so they're diagnosable
- Background job failures (any `sync_jobs.status=FAILED`) — aggregated count per day
- Billing webhook failures (signature failures, processing errors) — these are high-priority alerts, billing correctness matters
- Algorithm errors (Decay Engine throwing on malformed/unexpected input) — should never silently produce a wrong score; a computation error should skip that page's snapshot update and log loudly, not fall back to a stale or fabricated value
- Unusually empty datasets (a property syncing successfully but returning zero pages of data) — could indicate a GSC permission issue rather than a genuinely tiny site

---

## 16. Testing Strategy

**Decay Engine (highest priority — pure functions, fully fixture-testable):**
- Qualification: fixtures for each status (`QUALIFIED`, `INSUFFICIENT_HISTORY`, `BELOW_FLOOR`, `NOT_DECLINING`), including boundary cases (exactly at the floor, exactly at 6 months)
- Priority score: fixtures reproducing the customer's own Page A / Page B / Page C examples from discovery, asserting the ranking order the product owner specified
- Recoverability: one fixture per band boundary
- Query concentration: fixtures for high-concentration vs. spread-out loss on otherwise-identical pages, asserting the adjustment stays within the configured bound and never inverts a stronger-vs-weaker ranking
- Diagnosis: fixtures for each of the four categories plus deliberately ambiguous input asserting `MIXED_UNCLEAR` is returned rather than a forced guess
- Date-window calculations: fixtures asserting rolling (not calendar-quarter) 90-day windows, correct handling of the "last reliable data date" boundary and the GSC data-lag buffer

**Refresh outcomes:** fixtures for `TOO_EARLY`/`RECOVERED`/`STABILIZED`/`STILL_DECLINING` at each checkpoint, plus a fixture for the multi-refresh supersession behavior in Section 8.

**GSC sync:** integration tests against a mocked GSC API client — verifying upsert/dedup behavior (re-running the same sync twice produces no duplicate rows), and verifying a partial failure mid-backfill doesn't leave `sync_jobs` in a state where the job appears to have "succeeded."

**Billing webhooks:** fixtures for duplicate delivery (asserting no double-processing), out-of-order delivery, and signature-verification failure.

**Duplicate data / multiple refreshes:** explicit tests for the unique-constraint-driven idempotency of daily metrics ingestion, and the supersession chain for repeated refreshes on one page.

All Decay Engine fixtures should live alongside the engine code as the primary test suite Antigravity runs before any threshold change is considered safe to ship.

---

## 17. Antigravity Implementation Blueprint

### Project structure
```
/app                    — Next.js App Router routes
/lib/decay-engine        — pure domain module (qualification, scoring, diagnosis, explanation) — no imports from /app or Supabase client
/lib/gsc                 — GSC API client, OAuth token management
/lib/billing             — Dodo webhook handling, entitlement recomputation
/lib/db                  — Supabase client setup, typed query helpers
/jobs                    — background job entry points (called by cron)
/tests/decay-engine      — fixture-based tests (highest priority test coverage)
/supabase/migrations     — schema migrations
```

### Environment variables
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `DODO_API_KEY`, `DODO_WEBHOOK_SECRET`, `TOKEN_ENCRYPTION_KEY`

### Database migrations
One migration per table in Section 3, in dependency order (`users` → `properties`/`oauth_connections` → metrics tables → `engine_config_versions` → `page_decay_snapshots` → `refresh_events`/`refresh_outcomes` → `subscriptions`/`entitlements` → `diagnostic_sessions` → `sync_jobs`/`audit_events`). Seed `engine_config_versions` with the Section 6 initial config as part of the first migration, not a manual post-deploy step.

### Implementation order (development phases)
1. Schema + RLS policies
2. GSC OAuth + property connection flow (no scoring yet — just prove data lands in `page_metrics_daily`)
3. Decay Engine as a standalone, fully-tested module (no UI yet — prove it against fixtures)
4. Wire engine into `DECAY_RECALC` job, populate `page_decay_snapshots` from real synced data
5. Dashboard + page detail UI reading from snapshots
6. Mark-as-Refreshed + monitoring engine + resurfacing
7. Billing integration + entitlement gating
8. Free diagnostic flow (reuses the engine built in step 3 — should be a thin wrapper, not new logic)
9. Observability, error states, polish

### Definition of done (per phase)
Each phase is done when its fixture/integration tests pass **and** the relevant PRD acceptance criteria (see PRD document, Section "Acceptance Criteria") for that area are demonstrably true against seeded test data — not just "the code runs."

### Seed/test data
A seed script should generate at least: one page matching each qualification status, one page matching each diagnosis category, one page at each recoverability band boundary, and one full refresh-event lifecycle reaching each outcome state — so the dashboard and page-detail UI can be developed and reviewed against realistic, varied data from day one rather than only the developer's own live GSC account.

### Important invariants (must never be violated)
- The Decay Engine never performs I/O.
- `page_decay_snapshots` are never overwritten — always inserted fresh, snapshotting the config version used.
- `entitlements` is the only table application authorization logic reads.
- A diagnostic session never creates a `properties` or `oauth_connections` row, and never persists a raw OAuth token past the session's analysis step.
- Raw daily metrics (`page_metrics_daily`, `query_metrics_daily`) are never deleted or mutated except via the retention-policy cleanup job — they are historical fact, not a cache.

### Things Antigravity MUST NOT change without product-owner sign-off
- The four diagnosis categories (adding a fifth is a product decision, not an implementation detail)
- The core loop's shape (Detect → Prioritize → Explain → Refresh → Monitor → Measure → Resurface)
- The causality-guardrail UI copy patterns (never asserting *why* Google's behavior changed)
- The free report's scope boundaries (no refresh tracking, no full query table, no persistent connection)

### Things Antigravity can decide
- Exact recoverability band boundaries and multiplier values (already marked `INITIAL_NEEDS_VALIDATION` — tunable via config, no sign-off needed to adjust within that mechanism)
- Internal code organization within `/lib/decay-engine` beyond the input/output contract
- Choice of specific UI component library/styling approach, provided the decision-hierarchy ordering (Priority → Opportunity → Evidence → Score) is preserved
- Exact rate-limit numbers for diagnostic session abuse prevention

---

**This document, together with `decaycheck-v1-prd.md`, constitutes the complete pre-implementation package.**
