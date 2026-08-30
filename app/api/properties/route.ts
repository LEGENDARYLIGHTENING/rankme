import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
  }

  const supabase = getServiceRoleClient();
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ properties: properties || [] });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, gscSiteUrl, propertyType, displayName } = body;

    if (!userId || !gscSiteUrl) {
      return NextResponse.json({ error: 'Missing userId or gscSiteUrl' }, { status: 400 });
    }

    const supabase = getServiceRoleClient();

    // V1 single-property rule: Set all previous user properties to is_active = false
    await supabase
      .from('properties')
      .update({ is_active: false })
      .eq('user_id', userId);

    const isDomain = gscSiteUrl.startsWith('sc-domain:');
    const computedType = propertyType || (isDomain ? 'domain' : 'url_prefix');
    const computedName = displayName || (isDomain ? gscSiteUrl.replace('sc-domain:', '') : gscSiteUrl);

    // Insert new active property
    const { data: property, error: insertError } = await supabase
      .from('properties')
      .insert({
        user_id: userId,
        gsc_site_url: gscSiteUrl,
        property_type: computedType,
        display_name: computedName,
        is_active: true,
        connected_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: `Failed to connect property: ${insertError.message}` }, { status: 500 });
    }

    // Queue INITIAL_BACKFILL sync job
    const { data: job } = await supabase
      .from('sync_jobs')
      .insert({
        property_id: property.id,
        job_type: 'INITIAL_BACKFILL',
        status: 'PENDING',
      })
      .select()
      .single();

    return NextResponse.json({
      success: true,
      propertyId: property.id,
      jobId: job?.id,
      status: 'backfill_queued',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Property selection failed' }, { status: 500 });
  }
}
