import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');

  if (!fs.existsSync(filePath)) {
    return new Response('Sitemap Index Not Found', { status: 404 });
  }

  const xml = fs.readFileSync(filePath, 'utf-8');

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
