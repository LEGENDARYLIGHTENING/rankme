import fs from "fs";
import crypto from "crypto";

async function main() {
  const sa = JSON.parse(fs.readFileSync("prototype/ig-autoposter-492409-8cab7cfccdd4.json", "utf8"));
  
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

  // 1. Get Access Token
  const scopes = [
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
  const accessToken = tokenData.access_token;
  console.log("Token obtained successfully.");

  // 2. Test Indexing API for Article 20
  console.log("\n--- TESTING GOOGLE INDEXING API PING ---");
  const targetUrl = "https://rankursite.com/blog/voice-search-optimization-b2b-decision-makers";
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: targetUrl,
      type: "URL_UPDATED"
    })
  });
  const data = await res.json();
  console.log("HTTP Status:", res.status);
  console.log("Response:", JSON.stringify(data, null, 2));

  // 3. Inspect queries and pages in GSC for nutraceutical
  console.log("\n--- PULLING ALL QUERIES & MATCHING PAGES FROM GSC ---");
  const today = new Date();
  const pastDate = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
  const formatDate = d => d.toISOString().split("T")[0];
  const startDate = formatDate(pastDate);
  const endDate = formatDate(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000));

  const gscRes = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Arankursite.com/searchAnalytics/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ["query", "page"],
      rowLimit: 50
    })
  });
  const gscData = await gscRes.json();
  console.log("Total query-page pairs found:", gscData.rows ? gscData.rows.length : 0);
  if (gscData.rows) {
    for (const row of gscData.rows) {
      console.log(`Query: "${row.keys[0]}" -> Page: ${row.keys[1]} (Impr: ${row.impressions}, Clicks: ${row.clicks}, Pos: ${row.position.toFixed(1)})`);
    }
  }
}

main().catch(console.error);
