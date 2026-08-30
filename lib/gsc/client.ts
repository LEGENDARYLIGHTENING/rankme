import { google } from 'googleapis';

/**
 * Scope required for DecayCheck: Read-only access to Search Console data.
 */
export const GSC_READONLY_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

/**
 * Creates an OAuth2 client configured with client ID, secret, and redirect URI.
 */
export function getGoogleOAuth2Client(redirectUri?: string) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const defaultRedirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || 'http://localhost:3000/api/oauth/google/callback';

  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET environment variables are required.');
  }

  return new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri || defaultRedirectUri
  );
}

/**
 * Generates the Google OAuth authorization URL requesting offline access to get a refresh token.
 */
export function generateGscAuthUrl(redirectUri?: string, state?: string): string {
  const oauth2Client = getGoogleOAuth2Client(redirectUri);
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // Ensures refresh_token is issued
    prompt: 'consent',     // Forces consent screen so refresh_token is issued consistently
    scope: [GSC_READONLY_SCOPE],
    state: state || '',
  });
}

/**
 * Exchanges an authorization code for access and refresh tokens.
 */
export async function exchangeCodeForTokens(code: string, redirectUri?: string) {
  const oauth2Client = getGoogleOAuth2Client(redirectUri);
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

/**
 * Creates an authenticated Search Console API client from access and refresh tokens.
 */
export function createAuthenticatedGscClient(accessToken: string, refreshToken?: string) {
  const oauth2Client = getGoogleOAuth2Client();
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: oauth2Client,
  });

  return { searchconsole, oauth2Client };
}

export interface GscProperty {
  siteUrl: string;
  permissionLevel: string;
  propertyType: 'domain' | 'url_prefix';
  displayName: string;
}

/**
 * Lists all Search Console properties accessible by the authenticated Google account.
 */
export async function listGscProperties(accessToken: string, refreshToken?: string): Promise<GscProperty[]> {
  const { searchconsole } = createAuthenticatedGscClient(accessToken, refreshToken);
  const response = await searchconsole.sites.list();

  if (!response.data.siteEntry) {
    return [];
  }

  return response.data.siteEntry.map((site) => {
    const siteUrl = site.siteUrl || '';
    const isDomain = siteUrl.startsWith('sc-domain:');
    const displayName = isDomain ? siteUrl.replace('sc-domain:', '') : siteUrl;

    return {
      siteUrl,
      permissionLevel: site.permissionLevel || 'siteUnknownPermission',
      propertyType: isDomain ? 'domain' : 'url_prefix',
      displayName,
    };
  });
}

export interface GscPageMetricRow {
  pageUrl: string;
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/**
 * Fetches page-level daily Search Analytics metrics from GSC.
 * Pagination via startRow; maximum rowLimit per call is 25,000.
 */
export async function fetchGscPageMetrics(
  accessToken: string,
  refreshToken: string | undefined,
  siteUrl: string,
  startDate: string,
  endDate: string,
  startRow: number = 0,
  rowLimit: number = 25000
): Promise<{ rows: GscPageMetricRow[]; hasMore: boolean }> {
  const { searchconsole } = createAuthenticatedGscClient(accessToken, refreshToken);

  const requestBody = {
    startDate,
    endDate,
    dimensions: ['page', 'date'],
    rowLimit,
    startRow,
    dataState: 'final', // Excludes unverified/fresh incomplete days
  };

  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody,
  });

  const rawRows = response.data.rows || [];
  const rows: GscPageMetricRow[] = rawRows.map((row) => {
    const pageUrl = row.keys?.[0] || '';
    const date = row.keys?.[1] || '';
    const clicks = Math.round(row.clicks || 0);
    const impressions = Math.round(row.impressions || 0);
    const rawCtr = row.ctr || 0;
    const computedCtr = impressions > 0 ? Number((clicks / impressions).toFixed(4)) : 0;
    const position = Number((row.position || 0).toFixed(2));

    return {
      pageUrl,
      date,
      clicks,
      impressions,
      ctr: computedCtr || Number(rawCtr.toFixed(4)),
      position,
    };
  });

  return {
    rows,
    hasMore: rawRows.length >= rowLimit,
  };
}

export interface GscQueryMetricRow {
  pageUrl: string;
  query: string;
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/**
 * Fetches query-level Search Analytics metrics for a specific page from GSC.
 */
export async function fetchGscQueryMetrics(
  accessToken: string,
  refreshToken: string | undefined,
  siteUrl: string,
  pageUrl: string,
  startDate: string,
  endDate: string,
  startRow: number = 0,
  rowLimit: number = 5000
): Promise<{ rows: GscQueryMetricRow[]; hasMore: boolean }> {
  const { searchconsole } = createAuthenticatedGscClient(accessToken, refreshToken);

  const requestBody = {
    startDate,
    endDate,
    dimensions: ['page', 'query', 'date'],
    dimensionFilterGroups: [
      {
        filters: [
          {
            dimension: 'page',
            operator: 'equals',
            expression: pageUrl,
          },
        ],
      },
    ],
    rowLimit,
    startRow,
    dataState: 'final',
  };

  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody,
  });

  const rawRows = response.data.rows || [];
  const rows: GscQueryMetricRow[] = rawRows.map((row) => {
    const rowPageUrl = row.keys?.[0] || pageUrl;
    const query = row.keys?.[1] || '';
    const date = row.keys?.[2] || '';
    const clicks = Math.round(row.clicks || 0);
    const impressions = Math.round(row.impressions || 0);
    const rawCtr = row.ctr || 0;
    const computedCtr = impressions > 0 ? Number((clicks / impressions).toFixed(4)) : 0;
    const position = Number((row.position || 0).toFixed(2));

    return {
      pageUrl: rowPageUrl,
      query,
      date,
      clicks,
      impressions,
      ctr: computedCtr || Number(rawCtr.toFixed(4)),
      position,
    };
  });

  return {
    rows,
    hasMore: rawRows.length >= rowLimit,
  };
}
