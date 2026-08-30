import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const userId = searchParams.get('userId') || '00000000-0000-0000-0000-000000000001';

  const supabase = getServiceRoleClient();

  // 1. Get active property
  let propIdToUse = propertyId;
  if (!propIdToUse) {
    const { data: prop } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (!prop) {
      return NextResponse.json({ error: 'No active property connected yet', code: 'NO_PROPERTY' }, { status: 404 });
    }
    propIdToUse = prop.id;
  }

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', propIdToUse)
    .single();

  // 2. Fetch latest snapshot per page for this property
  const { data: snapshots, error: snapErr } = await supabase
    .from('page_decay_snapshots')
    .select('*')
    .eq('property_id', propIdToUse)
    .order('computed_at', { ascending: false });

  if (snapErr) {
    return NextResponse.json({ error: snapErr.message }, { status: 500 });
  }

  // Deduplicate to keep only the most recent snapshot per page_url
  const latestMap = new Map<string, any>();
  (snapshots || []).forEach((snap) => {
    if (!latestMap.has(snap.page_url)) {
      latestMap.set(snap.page_url, snap);
    }
  });

  // Filter to QUALIFIED pages only and sort by priority_score DESC
  const qualifiedSnapshots = Array.from(latestMap.values())
    .filter((s) => s.qualification_status === 'QUALIFIED')
    .sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));

  // 3. Fetch active refresh events for status mapping
  const { data: activeRefreshes } = await supabase
    .from('refresh_events')
    .select('page_url, status')
    .eq('property_id', propIdToUse)
    .eq('status', 'MONITORING');

  const activeRefreshMap = new Map<string, string>();
  (activeRefreshes || []).forEach((r) => activeRefreshMap.set(r.page_url, r.status));

  // Format opportunities response
  const opportunities = qualifiedSnapshots.map((s) => ({
    page_url: s.page_url,
    priority_label: s.priority_label,
    priority_score: s.priority_score,
    absolute_click_loss: s.absolute_click_loss,
    percent_click_loss: s.percent_click_loss,
    current_avg_position: s.current_avg_position,
    diagnosis_category: s.diagnosis_category,
    evidence: s.diagnosis_detail,
    refresh_status: activeRefreshMap.get(s.page_url) || null,
  }));

  return NextResponse.json({
    property: {
      id: property?.id,
      displayName: property?.display_name,
      gscSiteUrl: property?.gsc_site_url,
      lastSyncedAt: property?.last_synced_at,
    },
    last_reliable_data_date: property?.last_reliable_data_date || new Date().toISOString().split('T')[0],
    opportunities,
    total_qualifying_count: opportunities.length,
  });
}
