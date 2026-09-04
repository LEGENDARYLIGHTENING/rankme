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
    return new Response(`Sitemap '${rawFilename}' Not Found`, { status: 404 });
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
