import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens, listGscProperties, fetchGscPageMetrics } from '@/lib/gsc/client';
import { runDecayEngine } from '@/lib/decay-engine/index';
import { getRolling90DayWindows } from '@/lib/gsc/date-window';
import { EngineConfig, PageDecayInput, WindowMetrics } from '@/lib/decay-engine/types';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oauthCode } = body;

    if (!oauthCode) {
      return NextResponse.json({ error: 'Missing oauthCode' }, { status: 400 });
    }

    // 1. One-shot code exchange
    const tokens = await exchangeCodeForTokens(oauthCode);
    const accessToken = tokens.access_token;
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to retrieve GSC access token' }, { status: 502 });
    }

    // 2. Discover property
    const properties = await listGscProperties(accessToken, tokens.refresh_token);
    if (properties.length === 0) {
      return NextResponse.json({ error: 'No GSC properties found for this account' }, { status: 404 });
    }

    const primarySiteUrl = properties[0].siteUrl;

    // 3. Fetch rolling 90-day page metrics
    const windows = getRolling90DayWindows();
    const { rows } = await fetchGscPageMetrics(
      accessToken,
      tokens.refresh_token,
      primarySiteUrl,
      windows.previousWindow.startDate,
      windows.currentWindow.endDate,
      0,
      10000
    );

    // 4. Aggregate metrics
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

    rows.forEach((row) => {
      const entry = getOrCreatePage(row.pageUrl);
      if (row.date >= windows.currentWindow.startDate) {
        entry.current.clicks += row.clicks;
        entry.current.impressions += row.impressions;
        entry.current.avgPosition += row.position;
        entry.current.daysCount += 1;
      } else {
        entry.previous.clicks += row.clicks;
        entry.previous.impressions += row.impressions;
        entry.previous.avgPosition += row.position;
        entry.previous.daysCount += 1;
      }
    });

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

    // 5. Fetch default engine config
    const supabase = getServiceRoleClient();
    const { data: configRow } = await supabase
      .from('engine_config_versions')
      .select('*')
      .eq('is_active', true)
      .single();

    const activeConfig = configRow.config as EngineConfig;

    // 6. Run Decay Engine for top 5 teaser
    const opportunities: any[] = [];

    for (const [pageUrl, metrics] of pageMap.entries()) {
      const input: PageDecayInput = {
        pageUrl,
        totalHistoryMonths: 12,
        currentWindow: metrics.current,
        previousWindow: metrics.previous,
      };

      const output = runDecayEngine(input, activeConfig);
      if (output.qualificationStatus === 'QUALIFIED') {
        opportunities.push(output);
      }
    }

    // Sort opportunities by priorityScore DESC and take top 5
    opportunities.sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));
    const top5Teaser = opportunities.slice(0, 5);

    // 7. Save result payload to diagnostic_sessions WITH EXPIRY (24 hours) AND DISCARD ACCESS TOKEN
    const expiresAt = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
    const { data: session, error: sessErr } = await supabase
      .from('diagnostic_sessions')
      .insert({
        expires_at: expiresAt,
        gsc_site_url: primarySiteUrl,
        oauth_access_token: null, // DISCARDED IMMEDIATELY per spec invariant
        result_payload: {
          site_url: primarySiteUrl,
          reliable_end_date: windows.reliableEndDate,
          top_opportunities: top5Teaser,
          total_qualifying_found: opportunities.length,
        },
      })
      .select()
      .single();

    if (sessErr || !session) {
      return NextResponse.json({ error: `Failed to create diagnostic session: ${sessErr?.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      session_id: session.id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Diagnostic execution failed' }, { status: 500 });
  }
}
