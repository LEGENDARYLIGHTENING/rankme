import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ session_id: string }> }
) {
  const resolvedParams = await params;
  const sessionId = resolvedParams.session_id;

  const supabase = getServiceRoleClient();
  const { data: session, error } = await supabase
    .from('diagnostic_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (error || !session) {
    return NextResponse.json({ error: 'Diagnostic session expired or not found' }, { status: 404 });
  }

  // Check expiry
  if (new Date(session.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: 'This free report session has expired. Please run a new audit.' }, { status: 410 });
  }

  return NextResponse.json({
    session_id: session.id,
    created_at: session.created_at,
    expires_at: session.expires_at,
    payload: session.result_payload,
  });
}
