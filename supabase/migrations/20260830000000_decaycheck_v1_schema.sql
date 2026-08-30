-- DecayCheck V1 Schema Migration
-- Enables extensions and creates all 15 core tables with RLS and seed configuration.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  subscription_status TEXT NOT NULL DEFAULT 'free'
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own record" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own record" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- 2. Properties
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  gsc_site_url TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('domain', 'url_prefix')),
  display_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  disconnected_at TIMESTAMPTZ,
  last_synced_at TIMESTAMPTZ,
  last_reliable_data_date DATE
);

CREATE INDEX IF NOT EXISTS idx_properties_user_active ON public.properties(user_id, is_active);
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own properties" ON public.properties
  FOR ALL USING (auth.uid() = user_id);

-- 3. OAuth Connections
CREATE TABLE IF NOT EXISTS public.oauth_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'google',
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  scope TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.oauth_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own connection" ON public.oauth_connections
  FOR SELECT USING (auth.uid() = user_id);

-- 4. Page Metrics Daily
CREATE TABLE IF NOT EXISTS public.page_metrics_daily (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  date DATE NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(6,4) NOT NULL DEFAULT 0,
  avg_position NUMERIC(6,2) NOT NULL DEFAULT 0,
  CONSTRAINT unique_property_page_date UNIQUE (property_id, page_url, date)
);

CREATE INDEX IF NOT EXISTS idx_page_metrics_prop_date ON public.page_metrics_daily(property_id, date);
CREATE INDEX IF NOT EXISTS idx_page_metrics_prop_page_date ON public.page_metrics_daily(property_id, page_url, date);
ALTER TABLE public.page_metrics_daily ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access page metrics via property" ON public.page_metrics_daily
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = page_metrics_daily.property_id
      AND p.user_id = auth.uid()
    )
  );

-- 5. Query Metrics Daily (Qualified Pages Only)
CREATE TABLE IF NOT EXISTS public.query_metrics_daily (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  query TEXT NOT NULL,
  date DATE NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(6,4) NOT NULL DEFAULT 0,
  avg_position NUMERIC(6,2) NOT NULL DEFAULT 0,
  CONSTRAINT unique_property_page_query_date UNIQUE (property_id, page_url, query, date)
);

CREATE INDEX IF NOT EXISTS idx_query_metrics_prop_page_date ON public.query_metrics_daily(property_id, page_url, date);
ALTER TABLE public.query_metrics_daily ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access query metrics via property" ON public.query_metrics_daily
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = query_metrics_daily.property_id
      AND p.user_id = auth.uid()
    )
  );

-- 6. Engine Config Versions
CREATE TABLE IF NOT EXISTS public.engine_config_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  label TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  config JSONB NOT NULL,
  validation_status TEXT NOT NULL CHECK (validation_status IN ('INITIAL_NEEDS_VALIDATION', 'VALIDATED'))
);

ALTER TABLE public.engine_config_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read config" ON public.engine_config_versions FOR SELECT USING (true);

-- Seed initial configuration per Section 6 of spec
INSERT INTO public.engine_config_versions (label, is_active, validation_status, config)
VALUES (
  'v1-initial',
  true,
  'INITIAL_NEEDS_VALIDATION',
  '{
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
  }'::jsonb
)
ON CONFLICT DO NOTHING;

-- 7. Page Decay Snapshots
CREATE TABLE IF NOT EXISTS public.page_decay_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_window_start DATE NOT NULL,
  current_window_end DATE NOT NULL,
  previous_window_start DATE NOT NULL,
  previous_window_end DATE NOT NULL,
  current_clicks INTEGER NOT NULL,
  previous_clicks INTEGER NOT NULL,
  historical_peak_clicks INTEGER,
  absolute_click_loss INTEGER NOT NULL,
  percent_click_loss NUMERIC(6,2) NOT NULL,
  current_avg_position NUMERIC(6,2) NOT NULL,
  qualification_status TEXT NOT NULL CHECK (qualification_status IN ('QUALIFIED', 'INSUFFICIENT_HISTORY', 'BELOW_FLOOR', 'NOT_DECLINING')),
  recoverability_band TEXT,
  recoverability_multiplier NUMERIC(4,2),
  query_concentration_factor NUMERIC(4,2),
  priority_score NUMERIC(8,2),
  priority_label TEXT CHECK (priority_label IN ('High', 'Medium', 'Low')),
  diagnosis_category TEXT CHECK (diagnosis_category IN ('RANKING_DRIVEN', 'CTR_DRIVEN', 'BOTH', 'MIXED_UNCLEAR')),
  diagnosis_detail JSONB NOT NULL DEFAULT '{}'::jsonb,
  config_version_id UUID NOT NULL REFERENCES public.engine_config_versions(id)
);

CREATE INDEX IF NOT EXISTS idx_snapshots_prop_time ON public.page_decay_snapshots(property_id, computed_at DESC);
CREATE INDEX IF NOT EXISTS idx_snapshots_prop_page_time ON public.page_decay_snapshots(property_id, page_url, computed_at DESC);
ALTER TABLE public.page_decay_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access snapshots via property" ON public.page_decay_snapshots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = page_decay_snapshots.property_id
      AND p.user_id = auth.uid()
    )
  );

-- 8. Refresh Events
CREATE TABLE IF NOT EXISTS public.refresh_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  refreshed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  note TEXT,
  baseline_snapshot_id UUID NOT NULL REFERENCES public.page_decay_snapshots(id),
  status TEXT NOT NULL DEFAULT 'MONITORING' CHECK (status IN ('MONITORING', 'RESOLVED')),
  superseded_by UUID REFERENCES public.refresh_events(id)
);

CREATE INDEX IF NOT EXISTS idx_refresh_prop_page_status ON public.refresh_events(property_id, page_url, status);
ALTER TABLE public.refresh_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access refresh events via property" ON public.refresh_events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = refresh_events.property_id
      AND p.user_id = auth.uid()
    )
  );

-- 9. Refresh Outcomes
CREATE TABLE IF NOT EXISTS public.refresh_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  refresh_event_id UUID NOT NULL REFERENCES public.refresh_events(id) ON DELETE CASCADE,
  checkpoint_day INTEGER NOT NULL CHECK (checkpoint_day IN (28, 56, 90)),
  evaluated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  post_refresh_clicks_28d INTEGER NOT NULL,
  pre_refresh_clicks_28d INTEGER NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN ('TOO_EARLY', 'RECOVERED', 'STABILIZED', 'STILL_DECLINING')),
  config_version_id UUID NOT NULL REFERENCES public.engine_config_versions(id)
);

ALTER TABLE public.refresh_outcomes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access refresh outcomes via refresh event" ON public.refresh_outcomes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.refresh_events re
      JOIN public.properties p ON p.id = re.property_id
      WHERE re.id = refresh_outcomes.refresh_event_id
      AND p.user_id = auth.uid()
    )
  );

-- 10. Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  dodo_customer_id TEXT,
  dodo_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete')),
  current_period_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- 11. Entitlements
CREATE TABLE IF NOT EXISTS public.entitlements (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  has_ongoing_sync BOOLEAN NOT NULL DEFAULT false,
  has_query_analysis BOOLEAN NOT NULL DEFAULT false,
  has_refresh_tracking BOOLEAN NOT NULL DEFAULT false,
  has_monitoring BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own entitlements" ON public.entitlements FOR SELECT USING (auth.uid() = user_id);

-- 12. Diagnostic Sessions (Anonymous Free Report)
CREATE TABLE IF NOT EXISTS public.diagnostic_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  gsc_site_url TEXT NOT NULL,
  oauth_access_token TEXT,
  ip_address INET,
  email TEXT,
  result_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  converted_to_user_id UUID REFERENCES public.users(id)
);

ALTER TABLE public.diagnostic_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access diagnostic session by id" ON public.diagnostic_sessions FOR SELECT USING (true);

-- 13. Sync Jobs
CREATE TABLE IF NOT EXISTS public.sync_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK (job_type IN ('INITIAL_BACKFILL', 'INCREMENTAL_SYNC', 'DECAY_RECALC', 'MONITORING_EVAL')),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_detail TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.sync_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users access sync jobs via property" ON public.sync_jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = sync_jobs.property_id
      AND p.user_id = auth.uid()
    )
  );

-- 14. Audit Events
CREATE TABLE IF NOT EXISTS public.audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  detail JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own audit events" ON public.audit_events FOR SELECT USING (auth.uid() = user_id);

-- 15. Processed Webhook Events (Billing Idempotency)
CREATE TABLE IF NOT EXISTS public.processed_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL UNIQUE,
  provider TEXT NOT NULL DEFAULT 'dodo',
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.processed_webhook_events ENABLE ROW LEVEL SECURITY;
