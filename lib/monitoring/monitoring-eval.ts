import { getServiceRoleClient } from '@/lib/db/supabase';
import { EngineConfig } from '@/lib/decay-engine/types';

export async function evaluateRefreshCheckpoints(): Promise<{ success: boolean; evaluatedCount: number; error?: string }> {
  const supabase = getServiceRoleClient();

  // 1. Fetch active engine config
  const { data: configRow } = await supabase
    .from('engine_config_versions')
    .select('*')
    .eq('is_active', true)
    .single();

  if (!configRow) {
    return { success: false, evaluatedCount: 0, error: 'Active engine config missing' };
  }

  const config = configRow.config as EngineConfig;
  const checkpoints = config.monitoring_checkpoints_days || [28, 56, 90];

  // 2. Fetch all active monitoring events
  const { data: activeEvents, error: eventsErr } = await supabase
    .from('refresh_events')
    .select('*, page_decay_snapshots(*)')
    .eq('status', 'MONITORING');

  if (eventsErr || !activeEvents) {
    return { success: false, evaluatedCount: 0, error: eventsErr?.message };
  }

  let evaluatedCount = 0;
  const now = new Date();

  for (const event of activeEvents) {
    const refreshedAt = new Date(event.refreshed_at);
    const elapsedDays = Math.floor((now.getTime() - refreshedAt.getTime()) / (1000 * 3600 * 24));

    // Check existing outcomes for this event
    const { data: existingOutcomes } = await supabase
      .from('refresh_outcomes')
      .select('checkpoint_day')
      .eq('refresh_event_id', event.id);

    const evaluatedDays = new Set((existingOutcomes || []).map((o) => o.checkpoint_day));

    for (const checkpointDay of checkpoints) {
      if (elapsedDays >= checkpointDay && !evaluatedDays.has(checkpointDay)) {
        // Evaluate outcome for this checkpoint
        const baselineSnapshot = event.page_decay_snapshots;
        const preRefreshClicks28d = Math.round((baselineSnapshot?.current_clicks || 0) * (28 / 90));

        // Query post-refresh page metrics for the 28 days ending now
        const startDate28d = new Date(now.getTime() - 28 * 24 * 3600 * 1000).toISOString().split('T')[0];
        const endDateToday = now.toISOString().split('T')[0];

        const { data: postRows } = await supabase
          .from('page_metrics_daily')
          .select('clicks')
          .eq('property_id', event.property_id)
          .eq('page_url', event.page_url)
          .gte('date', startDate28d)
          .lte('date', endDateToday);

        const postRefreshClicks28d = (postRows || []).reduce((sum, r) => sum + r.clicks, 0);

        // Determine outcome verdict per config thresholds
        let outcome: 'TOO_EARLY' | 'RECOVERED' | 'STABILIZED' | 'STILL_DECLINING' = 'TOO_EARLY';
        const recoveryRatioPct = preRefreshClicks28d > 0 ? (postRefreshClicks28d / preRefreshClicks28d) * 100 : 100;

        if (postRows && postRows.length < 20) {
          outcome = 'TOO_EARLY';
        } else if (recoveryRatioPct >= config.recovery_threshold_pct) {
          outcome = 'RECOVERED';
        } else if (recoveryRatioPct >= config.stabilization_threshold_pct) {
          outcome = 'STABILIZED';
        } else {
          outcome = 'STILL_DECLINING';
        }

        // Save outcome
        await supabase.from('refresh_outcomes').insert({
          refresh_event_id: event.id,
          checkpoint_day: checkpointDay,
          evaluated_at: now.toISOString(),
          post_refresh_clicks_28d: postRefreshClicks28d,
          pre_refresh_clicks_28d: preRefreshClicks28d,
          outcome,
          config_version_id: configRow.id,
        });

        evaluatedCount += 1;

        // If final 90-day checkpoint reached, mark refresh event resolved
        if (checkpointDay === 90) {
          await supabase
            .from('refresh_events')
            .update({ status: 'RESOLVED' })
            .eq('id', event.id);
        }
      }
    }
  }

  return { success: true, evaluatedCount };
}
