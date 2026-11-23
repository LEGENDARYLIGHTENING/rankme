import fs from "fs";
import crypto from "crypto";

async function run() {
  const sa = JSON.parse(fs.readFileSync("prototype/ig-autoposter-492409-8cab7cfccdd4.json", "utf8"));
  
  function getJwt(scope) {
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
    const now = Math.floor(Date.now() / 1000);
    const claim = Buffer.from(JSON.stringify({
      iss: sa.client_email,
      scope: scope,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now
    })).toString("base64url");
    
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(`${header}.${claim}`);
    const signature = sign.sign(sa.private_key, "base64url");
    return `${header}.${claim}.${signature}`;
  }

  // Get token for GSC
  const jwtGsc = getJwt("https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly");
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwtGsc}`
  });
  const { access_token } = await tokenRes.json();

  // 1. Check remaining sitemaps
  const sitemapsRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/sitemaps", {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const sitemaps = await sitemapsRes.json();
  console.log("=== REMAINING SITEMAPS IN GSC ===");
  console.log(JSON.stringify(sitemaps, null, 2));

  // 2. Query Search Analytics: last 90 days by date
  const dateRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-08-01",
      endDate: "2026-11-21",
      dimensions: ["date"],
      rowLimit: 150
    })
  });
  const dateData = await dateRes.json();
  console.log("=== DATE TRAFFIC SUMMARY ===");
  if (dateData.rows) {
    console.log(`Total days: ${dateData.rows.length}`);
    const totalImpr = dateData.rows.reduce((sum, r) => sum + r.impressions, 0);
    const totalClicks = dateData.rows.reduce((sum, r) => sum + r.clicks, 0);
    console.log(`Total Impressions (since Aug 1): ${totalImpr}, Total Clicks: ${totalClicks}`);
    console.log("Recent 20 days:", JSON.stringify(dateData.rows.slice(-20), null, 2));
  }

  // 3. Top queries
  const queryRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-08-01",
      endDate: "2026-11-21",
      dimensions: ["query"],
      rowLimit: 50
    })
  });
  const queryData = await queryRes.json();
  console.log("=== TOP QUERIES ===");
  console.log(JSON.stringify(queryData.rows, null, 2));

  // 4. Top pages
  const pageRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-08-01",
      endDate: "2026-11-21",
      dimensions: ["page"],
      rowLimit: 50
    })
  });
  const pageData = await pageRes.json();
  console.log("=== TOP PAGES ===");
  console.log(JSON.stringify(pageData.rows, null, 2));

  // 5. Query device distribution
  const deviceRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-08-01",
      endDate: "2026-11-21",
      dimensions: ["device"]
    })
  });
  const deviceData = await deviceRes.json();
  console.log("=== DEVICE BREAKDOWN ===");
  console.log(JSON.stringify(deviceData.rows, null, 2));

  // 6. Query country distribution
  const countryRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-08-01",
      endDate: "2026-11-21",
      dimensions: ["country"],
      rowLimit: 20
    })
  });
  const countryData = await countryRes.json();
  console.log("=== COUNTRY BREAKDOWN ===");
  console.log(JSON.stringify(countryData.rows, null, 2));

  // 7. Check Google Analytics (GA4) API access with this service account
  console.log("=== CHECKING GA4 ACCESS ===");
  const jwtGa = getJwt("https://www.googleapis.com/auth/analytics.readonly");
  const gaTokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwtGa}`
  });
  const gaToken = await gaTokenRes.json();
  if (gaToken.access_token) {
    const accountsRes = await fetch("https://analyticsadmin.googleapis.com/v1alpha/accountSummaries", {
      headers: { Authorization: `Bearer ${gaToken.access_token}` }
    });
    const accounts = await accountsRes.json();
    console.log("GA4 Account Summaries:", JSON.stringify(accounts, null, 2));
  } else {
    console.log("Could not obtain GA4 token:", gaToken);
  }
}

run().catch(console.error);
