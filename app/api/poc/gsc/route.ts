import { NextRequest, NextResponse } from 'next/server';
import {
  generateGscAuthUrl,
  exchangeCodeForTokens,
  listGscProperties,
  fetchGscPageMetrics,
  fetchGscQueryMetrics,
} from '@/lib/gsc/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'auth_url';

  try {
    if (action === 'auth_url') {
      const redirectUri = searchParams.get('redirect_uri') || undefined;
      const authUrl = generateGscAuthUrl(redirectUri);
      return NextResponse.json({
        success: true,
        action: 'auth_url',
        authUrl,
        instructions: 'Navigate to authUrl in browser to authorize GSC access and receive code parameter.',
      });
    }

    return NextResponse.json(
      { error: `Unknown GET action: ${action}. Use action=auth_url` },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, code, accessToken, refreshToken, siteUrl, pageUrl, startDate, endDate } = body;

    if (action === 'exchange_code') {
      if (!code) {
        return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
      }
      const tokens = await exchangeCodeForTokens(code);
      return NextResponse.json({
        success: true,
        action: 'exchange_code',
        tokens: {
          access_token: tokens.access_token ? '[PRESENT]' : null,
          refresh_token: tokens.refresh_token ? '[PRESENT]' : null,
          expiry_date: tokens.expiry_date,
          scope: tokens.scope,
        },
        rawTokens: tokens,
      });
    }

    if (action === 'list_properties') {
      if (!accessToken) {
        return NextResponse.json({ error: 'Missing accessToken' }, { status: 400 });
      }
      const properties = await listGscProperties(accessToken, refreshToken);
      return NextResponse.json({
        success: true,
        action: 'list_properties',
        count: properties.length,
        properties,
      });
    }

    if (action === 'fetch_page_metrics') {
      if (!accessToken || !siteUrl || !startDate || !endDate) {
        return NextResponse.json(
          { error: 'Missing required params: accessToken, siteUrl, startDate, endDate' },
          { status: 400 }
        );
      }
      const result = await fetchGscPageMetrics(accessToken, refreshToken, siteUrl, startDate, endDate);
      return NextResponse.json({
        success: true,
        action: 'fetch_page_metrics',
        siteUrl,
        dateRange: { startDate, endDate },
        totalRows: result.rows.length,
        hasMore: result.hasMore,
        sampleRows: result.rows.slice(0, 5),
      });
    }

    if (action === 'fetch_query_metrics') {
      if (!accessToken || !siteUrl || !pageUrl || !startDate || !endDate) {
        return NextResponse.json(
          { error: 'Missing required params: accessToken, siteUrl, pageUrl, startDate, endDate' },
          { status: 400 }
        );
      }
      const result = await fetchGscQueryMetrics(accessToken, refreshToken, siteUrl, pageUrl, startDate, endDate);
      return NextResponse.json({
        success: true,
        action: 'fetch_query_metrics',
        siteUrl,
        pageUrl,
        dateRange: { startDate, endDate },
        totalRows: result.rows.length,
        hasMore: result.hasMore,
        sampleRows: result.rows.slice(0, 10),
      });
    }

    return NextResponse.json({ error: `Invalid action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, stack: err.stack }, { status: 500 });
  }
}
