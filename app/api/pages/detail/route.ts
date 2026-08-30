import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageUrl = searchParams.get('pageUrl');
  const propertyId = searchParams.get('propertyId');
  const userId = searchParams.get('userId') || '00000000-0000-0000-0000-000000000001';

  if (!pageUrl) {
    return NextResponse.json({ error: 'Missing pageUrl parameter' }, { status: 400 });
  }

  const supabase = getServiceRoleClient();

  // Find active property if propertyId not supplied
  let propIdToUse = propertyId;
  if (!propIdToUse) {
    const { data: prop } = await supabase
      .from('properties')
      .select('id')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    propIdToUse = prop?.id;
  }

  if (!propIdToUse) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  // 1. Fetch latest snapshot for this page
  const { data: snapshot } = await supabase
    .from('page_decay_snapshots')
    .select('*')
    .eq('property_id', propIdToUse)
    .eq('page_url', pageUrl)
    .order('computed_at', { ascending: false })
    .limit(1)
    .single();

  // 2. Fetch top 10 declining queries for this page
  const { data: qMetrics } = await supabase
    .from('query_metrics_daily')
    .select('*')
    .eq('property_id', propIdToUse)
    .eq('page_url', pageUrl);

  // Group queries into current vs previous window
  const queryGroupMap = new Map<string, { query: string; prevClicks: number; currClicks: number; prevPos: number; currPos: number }>();

  (qMetrics || []).forEach((r) => {
    if (!queryGroupMap.has(r.query)) {
      queryGroupMap.set(r.query, { query: r.query, prevClicks: 0, currClicks: 0, prevPos: 0, currPos: 0 });
    }
    const entry = queryGroupMap.get(r.query)!;
    if (snapshot && r.date >= snapshot.current_window_start) {
      entry.currClicks += r.clicks;
      entry.currPos = r.avg_position;
    } else {
      entry.prevClicks += r.clicks;
      entry.prevPos = r.avg_position;
    }
  });

  const topDecliningQueries = Array.from(queryGroupMap.values())
    .map((q) => ({
      query: q.query,
      previous_clicks: q.prevClicks,
      current_clicks: q.currClicks,
      click_loss: Math.max(0, q.prevClicks - q.currClicks),
      previous_position: q.prevPos,
      current_position: q.currPos,
    }))
    .filter((q) => q.click_loss > 0)
    .sort((a, b) => b.click_loss - a.click_loss)
    .slice(0, 10);

  // 3. Fetch refresh history for this page
  const { data: refreshHistory } = await supabase
    .from('refresh_events')
    .select('*, refresh_outcomes(*)')
    .eq('property_id', propIdToUse)
    .eq('page_url', pageUrl)
    .order('refreshed_at', { ascending: false });

  return NextResponse.json({
    page_url: pageUrl,
    snapshot,
    top_declining_queries: topDecliningQueries,
    refresh_history: refreshHistory || [],
  });
}
