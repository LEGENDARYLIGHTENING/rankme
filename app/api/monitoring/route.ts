import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const userId = searchParams.get('userId') || '00000000-0000-0000-0000-000000000001';

  const supabase = getServiceRoleClient();

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
    return NextResponse.json({ events: [] });
  }

  const { data: events, error } = await supabase
    .from('refresh_events')
    .select('*, refresh_outcomes(*), page_decay_snapshots(*)')
    .eq('property_id', propIdToUse)
    .order('refreshed_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ events: events || [] });
}
