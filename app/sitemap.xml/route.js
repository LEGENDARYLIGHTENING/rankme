import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');

  if (fs.existsSync(filePath)) {
    const xml = fs.readFileSync(filePath, 'utf-8');
    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }

  const fallbackIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://rankursite.com/sitemap/core.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://rankursite.com/sitemap/countries.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://rankursite.com/sitemap/blogs.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(fallbackIndex, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
