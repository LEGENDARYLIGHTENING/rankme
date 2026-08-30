import { getServiceRoleClient } from '@/lib/db/supabase';
import { decryptToken } from '@/lib/crypto';
import { fetchGscPageMetrics, fetchGscQueryMetrics } from '@/lib/gsc/client';
import { getRolling90DayWindows, subtractDays, formatDateISO } from '@/lib/gsc/date-window';

/**
 * Executes historical backfill for a newly connected property (up to 16 months of page metrics).
 */
export async function runInitialBackfill(propertyId: string): Promise<{ success: boolean; rowsIngested: number; error?: string }> {
  const supabase = getServiceRoleClient();

  // 1. Fetch property details
  const { data: property, error: propError } = await supabase
    .from('properties')
    .select('*, user_id')
    .eq('id', propertyId)
    .single();

  if (propError || !property) {
    return { success: false, rowsIngested: 0, error: `Property not found: ${propError?.message}` };
  }

  // 2. Fetch OAuth connection tokens
  const { data: oauthConn, error: oauthError } = await supabase
    .from('oauth_connections')
    .select('*')
    .eq('user_id', property.user_id)
    .eq('provider', 'google')
    .single();

  if (oauthError || !oauthConn) {
    return { success: false, rowsIngested: 0, error: `OAuth connection missing: ${oauthError?.message}` };
  }

  const accessToken = decryptToken(oauthConn.access_token);
  const refreshToken = decryptToken(oauthConn.refresh_token);

  // 3. Compute 16-month historical date range ending at reliable date
  const windows = getRolling90DayWindows();
  const endDate = windows.reliableEndDate;
  const startDateDate = subtractDays(new Date(endDate), 480); // ~16 months
  const startDate = formatDateISO(startDateDate);

  let totalIngested = 0;
  let startRow = 0;
  let hasMore = true;

  try {
    while (hasMore) {
      const { rows, hasMore: moreRows } = await fetchGscPageMetrics(
        accessToken,
        refreshToken,
        property.gsc_site_url,
        startDate,
        endDate,
        startRow,
        25000
      );

      if (rows.length > 0) {
        // Prepare batch for upsert
        const dbPayload = rows.map((r) => ({
          property_id: propertyId,
          page_url: r.pageUrl,
          date: r.date,
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          avg_position: r.position,
        }));

        // Upsert in chunks of 1000 to prevent payload size errors
        for (let i = 0; i < dbPayload.length; i += 1000) {
          const chunk = dbPayload.slice(i, i + 1000);
          const { error: upsertError } = await supabase
            .from('page_metrics_daily')
            .upsert(chunk, { onConflict: 'property_id,page_url,date' });

          if (upsertError) {
            console.error('Error upserting page metrics chunk:', upsertError.message);
          }
        }

        totalIngested += rows.length;
      }

      hasMore = moreRows;
      startRow += rows.length;
    }

    // Update property sync state
    await supabase
      .from('properties')
      .update({
        last_synced_at: new Date().toISOString(),
        last_reliable_data_date: endDate,
      })
      .eq('id', propertyId);

    return { success: true, rowsIngested: totalIngested };
  } catch (err: any) {
    return { success: false, rowsIngested: totalIngested, error: err.message };
  }
}

/**
 * Fetches query metrics for qualified pages only and stores them in query_metrics_daily.
 */
export async function runQueryIngestion(
  propertyId: string,
  qualifiedPageUrls: string[]
): Promise<{ success: boolean; rowsIngested: number; error?: string }> {
  if (!qualifiedPageUrls || qualifiedPageUrls.length === 0) {
    return { success: true, rowsIngested: 0 };
  }

  const supabase = getServiceRoleClient();

  const { data: property, error: propError } = await supabase
    .from('properties')
    .select('*, user_id')
    .eq('id', propertyId)
    .single();

  if (propError || !property) {
    return { success: false, rowsIngested: 0, error: `Property not found` };
  }

  const { data: oauthConn } = await supabase
    .from('oauth_connections')
    .select('*')
    .eq('user_id', property.user_id)
    .single();

  if (!oauthConn) {
    return { success: false, rowsIngested: 0, error: 'OAuth credentials missing' };
  }

  const accessToken = decryptToken(oauthConn.access_token);
  const refreshToken = decryptToken(oauthConn.refresh_token);

  const windows = getRolling90DayWindows();
  const startDate = windows.currentWindow.startDate;
  const endDate = windows.currentWindow.endDate;

  let totalIngested = 0;

  for (const pageUrl of qualifiedPageUrls) {
    try {
      const { rows } = await fetchGscQueryMetrics(
        accessToken,
        refreshToken,
        property.gsc_site_url,
        pageUrl,
        startDate,
        endDate,
        0,
        5000
      );

      if (rows.length > 0) {
        const dbPayload = rows.map((r) => ({
          property_id: propertyId,
          page_url: r.pageUrl,
          query: r.query,
          date: r.date,
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          avg_position: r.position,
        }));

        for (let i = 0; i < dbPayload.length; i += 1000) {
          const chunk = dbPayload.slice(i, i + 1000);
          await supabase
            .from('query_metrics_daily')
            .upsert(chunk, { onConflict: 'property_id,page_url,query,date' });
        }

        totalIngested += rows.length;
      }
    } catch (err: any) {
      console.error(`Query ingestion failed for page ${pageUrl}:`, err.message);
    }
  }

  return { success: true, rowsIngested: totalIngested };
}
