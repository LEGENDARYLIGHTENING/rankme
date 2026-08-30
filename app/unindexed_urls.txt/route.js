import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'unindexed_urls.txt');

  if (!fs.existsSync(filePath)) {
    return new Response('Unindexed URLs List Not Found', { status: 404 });
  }

  const text = fs.readFileSync(filePath, 'utf-8');

  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
