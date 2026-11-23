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

  const jwt = getJwt("https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly");
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const { access_token } = await tokenRes.json();

  // 1. Check Sitemaps
  const sitemapsRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/sitemaps", {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const sitemaps = await sitemapsRes.json();
  console.log("=== SITEMAPS STATUS IN GSC ===");
  console.log(JSON.stringify(sitemaps, null, 2));

  // 2. Query Search Analytics: last 30 days
  const dateRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-10-23",
      endDate: "2026-11-22",
      dimensions: ["date"],
      rowLimit: 40
    })
  });
  const dateData = await dateRes.json();
  console.log("=== RECENT DAILY TRAFFIC (LAST 30 DAYS) ===");
  console.log(JSON.stringify(dateData.rows ? dateData.rows.slice(-15) : dateData, null, 2));

  // 3. Inspect specific URLs via URL Inspection API
  console.log("=== URL INSPECTION API CHECKS ===");
  const testUrls = [
    "https://rankursite.com/",
    "https://rankursite.com/services",
    "https://rankursite.com/free-audit",
    "https://rankursite.com/blog/saas-website-development-agency-us"
  ];

  for (const url of testUrls) {
    try {
      const inspectRes = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: "sc-domain:rankursite.com"
        })
      });
      const inspectData = await inspectRes.json();
      if (inspectData.inspectionResult) {
        const indexStatus = inspectData.inspectionResult.indexStatusResult;
        console.log(`[URL] ${url}`);
        console.log(`  Verdict: ${indexStatus.verdict}`);
        console.log(`  CoverageState: ${indexStatus.coverageState}`);
        console.log(`  RobotsTxtState: ${indexStatus.robotsTxtState}`);
        console.log(`  IndexingState: ${indexStatus.indexingState}`);
        console.log(`  LastCrawlTime: ${indexStatus.lastCrawlTime}`);
        console.log(`  PageFetchState: ${indexStatus.pageFetchState}`);
        console.log(`  UserCanonical: ${indexStatus.userCanonical}`);
        console.log(`  GoogleCanonical: ${indexStatus.googleCanonical}`);
      } else {
        console.log(`[URL] ${url} error:`, inspectData.error?.message || inspectData);
      }
    } catch (e) {
      console.log(`Failed to inspect ${url}:`, e.message);
    }
  }
}

run().catch(console.error);
