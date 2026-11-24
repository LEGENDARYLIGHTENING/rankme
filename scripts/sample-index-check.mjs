import fs from "fs";
import crypto from "crypto";

async function checkIndexBatch() {
  const sa = JSON.parse(fs.readFileSync("prototype/ig-autoposter-492409-8cab7cfccdd4.json", "utf8"));
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const claim = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  })).toString("base64url");
  
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${claim}`);
  const signature = sign.sign(sa.private_key, "base64url");
  const jwt = `${header}.${claim}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const { access_token } = await tokenRes.json();

  const blogs = JSON.parse(fs.readFileSync("prototype/src/data/blogs-index.json", "utf8"));
  const sampleSlugs = [
    blogs[0]?.slug,
    blogs[10]?.slug,
    blogs[25]?.slug,
    blogs[50]?.slug,
    blogs[100]?.slug,
    blogs[150]?.slug,
    blogs[200]?.slug
  ].filter(Boolean);

  console.log("Checking indexing status for sample of blogs across the library:\n");
  for (const slug of sampleSlugs) {
    const url = `https://rankursite.com/blog/${slug}`;
    const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
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
    const data = await res.json();
    if (data.inspectionResult) {
      const idx = data.inspectionResult.indexStatusResult;
      console.log(`[${idx.verdict}] ${url}`);
      console.log(`   Coverage: ${idx.coverageState}`);
      console.log(`   Last Crawled: ${idx.lastCrawlTime || "Never"}\n`);
    } else {
      console.log(`[ERROR] ${url}:`, data.error?.message || data);
    }
  }
}

checkIndexBatch().catch(console.error);
