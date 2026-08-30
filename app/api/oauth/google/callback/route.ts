import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens, listGscProperties } from '@/lib/gsc/client';
import { encryptToken } from '@/lib/crypto';
import { getServiceRoleClient } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, userId } = body;

    if (!code || !userId) {
      return NextResponse.json({ error: 'Missing code or userId parameter' }, { status: 400 });
    }

    // Exchange auth code for tokens
    const tokens = await exchangeCodeForTokens(code);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to retrieve access token from Google' }, { status: 502 });
    }

    const encryptedAccess = encryptToken(accessToken);
    const encryptedRefresh = refreshToken ? encryptToken(refreshToken) : '';
    const expiresAt = new Date(tokens.expiry_date || Date.now() + 3600 * 1000).toISOString();

    const supabase = getServiceRoleClient();

    // Store encrypted tokens in oauth_connections table
    const { error: dbError } = await supabase.from('oauth_connections').upsert({
      user_id: userId,
      provider: 'google',
      access_token: encryptedAccess,
      refresh_token: encryptedRefresh,
      scope: tokens.scope || 'https://www.googleapis.com/auth/webmasters.readonly',
      expires_at: expiresAt,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      return NextResponse.json({ error: `Database error storing tokens: ${dbError.message}` }, { status: 500 });
    }

    // Fetch accessible properties using the new access token
    const properties = await listGscProperties(accessToken, refreshToken);

    return NextResponse.json({
      success: true,
      properties,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'OAuth callback failed' }, { status: 500 });
  }
}
