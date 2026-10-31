import fs from 'fs';
import path from 'path';

const VALID_SITEMAP_SLUGS = new Set([
  'core', 'countries', 'blogs',
  'usa', 'uk', 'canada', 'australia', 'new-zealand',
  'ireland', 'uae', 'saudi-arabia', 'qatar', 'singapore', 'germany'
]);

export async function GET(request, { params }) {
  const resolvedParams = await params;
  let rawFilename = resolvedParams.filename || '';

  // Clean filename extension
  let cleanName = rawFilename.replace(/\.xml$/i, '').toLowerCase();
  const sitemapDir = path.join(process.cwd(), 'public', 'sitemap');

  if (!VALID_SITEMAP_SLUGS.has(cleanName)) {
    return new Response('Sitemap Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const targetPath = path.join(sitemapDir, `${cleanName}.xml`);

  if (!fs.existsSync(targetPath)) {
    return new Response('Sitemap Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
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
