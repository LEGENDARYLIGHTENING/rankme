import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || '00000000-0000-0000-0000-000000000001';

    const supabase = getServiceRoleClient();

    // 1. Get active property
    const { data: prop, error: propErr } = await supabase
      .from('properties')
      .select('id, gsc_site_url')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (propErr || !prop) {
      return NextResponse.json({ error: 'Active property not found' }, { status: 404 });
    }

    const now = new Date().toISOString();

    // 2. Mark property disconnected
    await supabase
      .from('properties')
      .update({
        is_active: false,
        disconnected_at: now,
      })
      .eq('id', prop.id);

    // 3. Mark OAuth connection revoked
    await supabase
      .from('oauth_connections')
      .update({ revoked_at: now })
      .eq('user_id', userId);

    // 4. Log audit event
    await supabase.from('audit_events').insert({
      user_id: userId,
      event_type: 'PROPERTY_DISCONNECTED',
      detail: { property_id: prop.id, gsc_site_url: prop.gsc_site_url, disconnected_at: now },
    });

    const deletionScheduled = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();

    return NextResponse.json({
      status: 'disconnected',
      data_deletion_scheduled_for: deletionScheduled,
      message: 'Property disconnected successfully. OAuth access revoked.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Disconnect failed' }, { status: 500 });
  }
}
