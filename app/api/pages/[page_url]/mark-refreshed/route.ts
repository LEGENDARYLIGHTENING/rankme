import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ page_url: string }> }
) {
  try {
    const resolvedParams = await params;
    const rawPageUrl = decodeURIComponent(resolvedParams.page_url);
    const body = await request.json().catch(() => ({}));
    const { note, propertyId, userId = '00000000-0000-0000-0000-000000000001' } = body;

    const supabase = getServiceRoleClient();

    // 1. Get active property
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
      return NextResponse.json({ error: 'No active property found' }, { status: 404 });
    }

    // 2. Fetch page's most recent snapshot to freeze as baseline
    const { data: baselineSnap, error: snapErr } = await supabase
      .from('page_decay_snapshots')
      .select('id')
      .eq('property_id', propIdToUse)
      .eq('page_url', rawPageUrl)
      .order('computed_at', { ascending: false })
      .limit(1)
      .single();

    if (snapErr || !baselineSnap) {
      return NextResponse.json(
        { error: 'Cannot mark as refreshed: No pre-refresh decay snapshot found for this page.' },
        { status: 400 }
      );
    }

    // 3. Handle active refresh supersession (Section 8 of spec)
    const { data: existingActive } = await supabase
      .from('refresh_events')
      .select('id')
      .eq('property_id', propIdToUse)
      .eq('page_url', rawPageUrl)
      .eq('status', 'MONITORING')
      .maybeSingle();

    // 4. Create new refresh_events row
    const { data: newRefresh, error: insertErr } = await supabase
      .from('refresh_events')
      .insert({
        property_id: propIdToUse,
        page_url: rawPageUrl,
        refreshed_at: new Date().toISOString(),
        note: note || null,
        baseline_snapshot_id: baselineSnap.id,
        status: 'MONITORING',
      })
      .select()
      .single();

    if (insertErr || !newRefresh) {
      return NextResponse.json({ error: `Failed to record refresh event: ${insertErr?.message}` }, { status: 500 });
    }

    // If an existing monitoring event was active, close it and link superseded_by
    if (existingActive) {
      await supabase
        .from('refresh_events')
        .update({
          status: 'RESOLVED',
          superseded_by: newRefresh.id,
        })
        .eq('id', existingActive.id);
    }

    // 5. Log audit event
    await supabase.from('audit_events').insert({
      user_id: userId,
      event_type: 'REFRESH_MARKED',
      detail: { page_url: rawPageUrl, refresh_event_id: newRefresh.id, note },
    });

    return NextResponse.json({
      success: true,
      refresh_event_id: newRefresh.id,
      status: 'MONITORING',
      message: 'Page marked as refreshed. Pre-refresh baseline frozen successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
