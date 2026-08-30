import { getServiceRoleClient } from '@/lib/db/supabase';
import { getRolling90DayWindows } from '@/lib/gsc/date-window';
import { runQueryIngestion } from '@/lib/gsc/ingestion';
import { runDecayEngine } from './index';
import { EngineConfig, PageDecayInput, QueryImpact, WindowMetrics } from './types';

/**
 * Recomputes decay snapshots for all pages belonging to a property using the active engine config.
 */
export async function recalculatePropertyDecay(
  propertyId: string
): Promise<{ success: boolean; snapshotsCreated: number; qualifiedCount: number; error?: string }> {
  const supabase = getServiceRoleClient();

  // 1. Fetch active engine config
  const { data: configRow, error: configError } = await supabase
    .from('engine_config_versions')
    .select('*')
    .eq('is_active', true)
    .single();

  if (configError || !configRow) {
    return { success: false, snapshotsCreated: 0, qualifiedCount: 0, error: 'Active engine config missing' };
  }

  const activeConfig = configRow.config as EngineConfig;
  const configVersionId = configRow.id;

  // 2. Fetch property reliable data date
  const { data: property, error: propError } = await supabase
    .from('properties')
    .select('*')
    .eq('id', propertyId)
    .single();

  if (propError || !property) {
    return { success: false, snapshotsCreated: 0, qualifiedCount: 0, error: 'Property not found' };
  }

  const refDate = property.last_reliable_data_date ? new Date(property.last_reliable_data_date) : undefined;
  const windows = getRolling90DayWindows(refDate);

  // 3. Query current window daily metrics
  const { data: currentRows, error: currentErr } = await supabase
    .from('page_metrics_daily')
    .select('*')
    .eq('property_id', propertyId)
    .gte('date', windows.currentWindow.startDate)
    .lte('date', windows.currentWindow.endDate);

  if (currentErr) {
    return { success: false, snapshotsCreated: 0, qualifiedCount: 0, error: currentErr.message };
  }

  // 4. Query previous window daily metrics
  const { data: previousRows, error: previousErr } = await supabase
    .from('page_metrics_daily')
    .select('*')
    .eq('property_id', propertyId)
    .gte('date', windows.previousWindow.startDate)
    .lte('date', windows.previousWindow.endDate);

  if (previousErr) {
    return { success: false, snapshotsCreated: 0, qualifiedCount: 0, error: previousErr.message };
  }

  // 5. Aggregate metrics per page URL
  const pageMap = new Map<string, { current: WindowMetrics; previous: WindowMetrics }>();

  function getOrCreatePage(url: string) {
    if (!pageMap.has(url)) {
      pageMap.set(url, {
        current: { clicks: 0, impressions: 0, ctr: 0, avgPosition: 0, daysCount: 0 },
        previous: { clicks: 0, impressions: 0, ctr: 0, avgPosition: 0, daysCount: 0 },
      });
    }
    return pageMap.get(url)!;
  }

  (previousRows || []).forEach((row) => {
    const entry = getOrCreatePage(row.page_url);
    entry.previous.clicks += row.clicks;
    entry.previous.impressions += row.impressions;
    entry.previous.avgPosition += row.avg_position;
    entry.previous.daysCount += 1;
  });

  (currentRows || []).forEach((row) => {
    const entry = getOrCreatePage(row.page_url);
    entry.current.clicks += row.clicks;
    entry.current.impressions += row.impressions;
    entry.current.avgPosition += row.avg_position;
    entry.current.daysCount += 1;
  });

  // Normalize CTR & avgPosition for each window
  for (const [, metrics] of pageMap.entries()) {
    if (metrics.previous.daysCount > 0) {
      metrics.previous.avgPosition = Number((metrics.previous.avgPosition / metrics.previous.daysCount).toFixed(2));
      metrics.previous.ctr = metrics.previous.impressions > 0 ? Number((metrics.previous.clicks / metrics.previous.impressions).toFixed(4)) : 0;
    }
    if (metrics.current.daysCount > 0) {
      metrics.current.avgPosition = Number((metrics.current.avgPosition / metrics.current.daysCount).toFixed(2));
      metrics.current.ctr = metrics.current.impressions > 0 ? Number((metrics.current.clicks / metrics.current.impressions).toFixed(4)) : 0;
    }
  }

  // 6. Run Decay Engine for all pages
  const provisionalQualifiedUrls: string[] = [];
  const initialOutputs: any[] = [];

  for (const [pageUrl, metrics] of pageMap.entries()) {
    const input: PageDecayInput = {
      pageUrl,
      totalHistoryMonths: 12, // Default or calculated from earliest page_metrics_daily row
      currentWindow: metrics.current,
      previousWindow: metrics.previous,
    };

    const output = runDecayEngine(input, activeConfig);
    initialOutputs.push({ input, output });

    if (output.qualificationStatus === 'QUALIFIED') {
      provisionalQualifiedUrls.push(pageUrl);
    }
  }

  // 7. Trigger query ingestion for qualified pages
  if (provisionalQualifiedUrls.length > 0) {
    await runQueryIngestion(propertyId, provisionalQualifiedUrls);
  }

  // 8. Fetch query metrics & re-run Decay Engine with query evidence
  const snapshotPayloads: any[] = [];
  let finalQualifiedCount = 0;

  for (const item of initialOutputs) {
    let finalOutput = item.output;

    if (item.output.qualificationStatus === 'QUALIFIED') {
      finalQualifiedCount += 1;

      // Query database for query metrics for this page
      const { data: qRows } = await supabase
        .from('query_metrics_daily')
        .select('*')
        .eq('property_id', propertyId)
        .eq('page_url', item.input.pageUrl);

      if (qRows && qRows.length > 0) {
        // Group query metrics by query name
        const qMap = new Map<string, { currentClicks: number; previousClicks: number }>();

        qRows.forEach((r) => {
          if (!qMap.has(r.query)) qMap.set(r.query, { currentClicks: 0, previousClicks: 0 });
          const qEntry = qMap.get(r.query)!;
          if (r.date >= windows.currentWindow.startDate) {
            qEntry.currentClicks += r.clicks;
          } else {
            qEntry.previousClicks += r.clicks;
          }
        });

        const queryImpacts: QueryImpact[] = [];
        for (const [queryStr, qVals] of qMap.entries()) {
          queryImpacts.push({
            query: queryStr,
            previousClicks: qVals.previousClicks,
            currentClicks: qVals.currentClicks,
            clickLoss: Math.max(0, qVals.previousClicks - qVals.currentClicks),
            previousPosition: 0,
            currentPosition: 0,
          });
        }

        const inputWithQueries: PageDecayInput = {
          ...item.input,
          queries: queryImpacts,
        };

        finalOutput = runDecayEngine(inputWithQueries, activeConfig);
      }
    }

    snapshotPayloads.push({
      property_id: propertyId,
      page_url: finalOutput.pageUrl,
      computed_at: new Date().toISOString(),
      current_window_start: windows.currentWindow.startDate,
      current_window_end: windows.currentWindow.endDate,
      previous_window_start: windows.previousWindow.startDate,
      previous_window_end: windows.previousWindow.endDate,
      current_clicks: item.input.currentWindow.clicks,
      previous_clicks: item.input.previousWindow.clicks,
      absolute_click_loss: finalOutput.absoluteClickLoss,
      percent_click_loss: finalOutput.percentClickLoss,
      current_avg_position: finalOutput.currentAvgPosition,
      qualification_status: finalOutput.qualificationStatus,
      recoverability_band: finalOutput.recoverabilityBand || null,
      recoverability_multiplier: finalOutput.recoverabilityMultiplier || null,
      query_concentration_factor: finalOutput.queryConcentrationFactor || null,
      priority_score: finalOutput.priorityScore || null,
      priority_label: finalOutput.priorityLabel || null,
      diagnosis_category: finalOutput.diagnosisCategory || null,
      diagnosis_detail: finalOutput.diagnosisDetail,
      config_version_id: configVersionId,
    });
  }

  // 9. Insert snapshots
  if (snapshotPayloads.length > 0) {
    for (let i = 0; i < snapshotPayloads.length; i += 500) {
      const chunk = snapshotPayloads.slice(i, i + 500);
      await supabase.from('page_decay_snapshots').insert(chunk);
    }
  }

  return {
    success: true,
    snapshotsCreated: snapshotPayloads.length,
    qualifiedCount: finalQualifiedCount,
  };
}
