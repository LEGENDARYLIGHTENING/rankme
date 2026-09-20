import fs from 'fs';
import path from 'path';

const COUNTRY_SLUGS = new Set([
  'usa', 'uk', 'canada', 'australia', 'new-zealand',
  'ireland', 'uae', 'saudi-arabia', 'qatar', 'singapore', 'germany'
]);

export async function GET(request, { params }) {
  const resolvedParams = await params;
  let rawFilename = resolvedParams.filename || '';

  // Clean filename extension
  let cleanName = rawFilename.replace(/\.xml$/i, '');
  const sitemapDir = path.join(process.cwd(), 'public', 'sitemap');

  // Candidate file names to check in public/sitemap/
  const candidates = [
    `${cleanName}.xml`,
    `city-${cleanName}.xml`,
    `city-${cleanName}-us.xml`,
    `${cleanName}-us.xml`,
  ];

  if (cleanName.startsWith('city-')) {
    const stripped = cleanName.replace(/^city-/, '');
    candidates.push(`${stripped}.xml`, `${stripped}-us.xml`, `city-${stripped}-us.xml`);
  }

  // If cleanName is a country (e.g. 'uk', 'usa', 'germany') or country-prefixed
  if (COUNTRY_SLUGS.has(cleanName) || cleanName === 'countries' || cleanName.startsWith('country-')) {
    candidates.push('countries.xml');
  }

  let targetPath = null;
  for (const cand of candidates) {
    const fullPath = path.join(sitemapDir, cand);
    if (fs.existsSync(fullPath)) {
      targetPath = fullPath;
      break;
    }
  }

  if (!targetPath) {
    // Check if any file in public/sitemap loosely matches
    try {
      const files = fs.readdirSync(sitemapDir);
      const match = files.find(f => f.toLowerCase().includes(cleanName.toLowerCase()));
      if (match) {
        targetPath = path.join(sitemapDir, match);
      }
    } catch (e) {}
  }

  if (!targetPath) {
    let canonical = 'https://rankursite.com';
    const lower = cleanName.toLowerCase();
    if (lower.includes('uk') || lower.includes('london') || lower.includes('manchester') || lower.includes('belfast') || lower.includes('bristol')) {
      canonical = 'https://rankursite.com/uk';
    } else if (lower.includes('canada') || lower.includes('toronto') || lower.includes('montreal') || lower.includes('calgary')) {
      canonical = 'https://rankursite.com/canada';
    } else if (lower.includes('australia') || lower.includes('sydney') || lower.includes('melbourne') || lower.includes('brisbane')) {
      canonical = 'https://rankursite.com/australia';
    } else if (lower.includes('uae') || lower.includes('dubai') || lower.includes('abu-dhabi')) {
      canonical = 'https://rankursite.com/uae';
    } else if (lower.includes('germany') || lower.includes('berlin') || lower.includes('munich') || lower.includes('frankfurt')) {
      canonical = 'https://rankursite.com/germany';
    } else if (lower.includes('saudi') || lower.includes('riyadh')) {
      canonical = 'https://rankursite.com/saudi-arabia';
    } else if (lower.includes('qatar')) {
      canonical = 'https://rankursite.com/qatar';
    } else if (lower.includes('singapore')) {
      canonical = 'https://rankursite.com/singapore';
    } else if (lower.includes('ireland')) {
      canonical = 'https://rankursite.com/ireland';
    } else if (lower.includes('new-zealand')) {
      canonical = 'https://rankursite.com/new-zealand';
    } else if (lower.includes('us') || lower.includes('usa')) {
      canonical = 'https://rankursite.com/usa';
    } else {
      canonical = 'https://rankursite.com/locations';
    }

    const today = new Date().toISOString().split('T')[0];
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    return new Response(fallbackXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }

  const xml = fs.readFileSync(targetPath, 'utf-8');

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
