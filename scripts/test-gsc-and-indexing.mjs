import fs from "fs";
import crypto from "crypto";

async function main() {
  const sa = JSON.parse(fs.readFileSync("prototype/ig-autoposter-492409-8cab7cfccdd4.json", "utf8"));
  console.log("Service Account:", sa.client_email);

  function getJwt(scopes) {
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
    const now = Math.floor(Date.now() / 1000);
    const claim = Buffer.from(JSON.stringify({
      iss: sa.client_email,
      scope: scopes.join(" "),
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now
    })).toString("base64url");
    
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(`${header}.${claim}`);
    const signature = sign.sign(sa.private_key, "base64url");
    return `${header}.${claim}.${signature}`;
  }

  // 1. Get Access Token for Webmasters & Indexing API
  const scopes = [
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/indexing"
  ];
  const jwt = getJwt(scopes);
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    console.error("Token error:", tokenData);
    return;
  }
  const accessToken = tokenData.access_token;
  console.log("Successfully retrieved Google OAuth Access Token.");

  // 2. Fetch Sitemaps
  console.log("\n=================== 1. SITEMAP STATUS IN GSC ===================");
  try {
    const sitemapsRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/sitemaps", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const sitemaps = await sitemapsRes.json();
    console.log(JSON.stringify(sitemaps, null, 2));
  } catch (err) {
    console.error("Sitemaps error:", err);
  }

  // 3. Fetch Search Analytics (last 28 days aggregated & by query / page)
  console.log("\n=================== 2. SEARCH ANALYTICS (AGGREGATED) ===================");
  const today = new Date();
  const pastDate = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
  const formatDate = d => d.toISOString().split("T")[0];
  const startDate = formatDate(pastDate);
  const endDate = formatDate(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)); // GSC has ~2-3 days lag

  try {
    const analyticsRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 30
      })
    });
    const analyticsData = await analyticsRes.json();
    console.log(`Date range: ${startDate} to ${endDate}`);
    if (analyticsData.rows) {
      console.log(`Total active days reported: ${analyticsData.rows.length}`);
      const totals = analyticsData.rows.reduce((acc, row) => {
        acc.clicks += row.clicks;
        acc.impressions += row.impressions;
        return acc;
      }, { clicks: 0, impressions: 0 });
      console.log(`Total 28-day Clicks: ${totals.clicks}, Total Impressions: ${totals.impressions}`);
      console.log("Latest daily data points:");
      console.log(JSON.stringify(analyticsData.rows.slice(-7), null, 2));
    } else {
      console.log("No daily rows returned or response:", analyticsData);
    }

    // Top Pages
    const pagesRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 10
      })
    });
    const pagesData = await pagesRes.json();
    console.log("\nTop Pages by Impressions:");
    console.log(JSON.stringify(pagesData.rows || pagesData, null, 2));

    // Top Queries
    const queriesRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 10
      })
    });
    const queriesData = await queriesRes.json();
    console.log("\nTop Queries:");
    console.log(JSON.stringify(queriesData.rows || queriesData, null, 2));

  } catch (err) {
    console.error("Search Analytics error:", err);
  }

  // 4. URL Inspection for Core & Article 20
  console.log("\n=================== 3. URL INSPECTION STATUS ===================");
  const urlsToInspect = [
    "https://rankursite.com/",
    "https://rankursite.com/services",
    "https://rankursite.com/blog/voice-search-optimization-b2b-decision-makers",
    "https://rankursite.com/blog/b2b-saas-website-architecture"
  ];

  for (const url of urlsToInspect) {
    try {
      const inspectRes = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: "sc-domain:rankursite.com"
        })
      });
      const inspectData = await inspectRes.json();
      if (inspectData.inspectionResult) {
        const idx = inspectData.inspectionResult.indexStatusResult;
        console.log(`\nURL: ${url}`);
        console.log(`  Verdict: ${idx.verdict}`);
        console.log(`  CoverageState: ${idx.coverageState}`);
        console.log(`  RobotsTxtState: ${idx.robotsTxtState}`);
        console.log(`  IndexingState: ${idx.indexingState}`);
        console.log(`  LastCrawlTime: ${idx.lastCrawlTime || 'Not crawled yet'}`);
        console.log(`  PageFetchState: ${idx.pageFetchState}`);
        console.log(`  GoogleCanonical: ${idx.googleCanonical || 'None'}`);
      } else {
        console.log(`URL: ${url} error:`, inspectData.error?.message || inspectData);
      }
    } catch (e) {
      console.log(`Failed inspecting ${url}:`, e.message);
    }
  }

  // 5. Test Google Indexing API Publish
  console.log("\n=================== 4. TESTING GOOGLE INDEXING API ===================");
  const testPublishUrl = "https://rankursite.com/blog/voice-search-optimization-b2b-decision-makers";
  try {
    const indexingRes = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: testPublishUrl,
        type: "URL_UPDATED"
      })
    });
    const indexingData = await indexingRes.json();
    console.log("Publish Response for:", testPublishUrl);
    console.log("Status Code:", indexingRes.status);
    console.log("Response Body:", JSON.stringify(indexingData, null, 2));

    // Also check notification status if supported
    const notifyRes = await fetch(`https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(testPublishUrl)}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const notifyData = await notifyRes.json();
    console.log("\nMetadata Query Status Code:", notifyRes.status);
    console.log("Metadata Response:", JSON.stringify(notifyData, null, 2));
  } catch (e) {
    console.error("Indexing API exception:", e.message);
  }
}

main().catch(console.error);
