import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  let rawFilename = resolvedParams.filename;

  // Clean filename extension
  let cleanName = rawFilename.replace(/\.xml$/, '');
  
  // Possible file candidates in public/sitemap/
  const candidates = [
    `${cleanName}.xml`,
    cleanName.startsWith('city-') ? `${cleanName.replace(/^city-/, '')}.xml` : `city-${cleanName}.xml`,
  ];

  let targetPath = null;
  for (const cand of candidates) {
    const fullPath = path.join(process.cwd(), 'public', 'sitemap', cand);
    if (fs.existsSync(fullPath)) {
      targetPath = fullPath;
      break;
    }
  }

  if (!targetPath) {
    return new Response(`City Sitemap '${rawFilename}' Not Found`, { status: 404 });
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
