import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.rankursite.com';

// Define static routes
const routes = [
  '/',
  '/services',
  '/case-studies',
  '/about',
  '/philosophy',
  '/certifications',
  '/process',
  '/blog',
  '/free-audit',
  '/contact'
];

// Helper to format date
const getTodayDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

const getValidDate = (dateString) => {
  if (!dateString) return getTodayDate();
  const parsed = Date.parse(dateString);
  if (isNaN(parsed)) return getTodayDate();
  return new Date(parsed).toISOString().split('T')[0];
};

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static routes
  routes.forEach(route => {
    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${BASE_URL}${route}</loc>\n`;
    sitemapContent += `    <lastmod>${getTodayDate()}</lastmod>\n`;
    sitemapContent += `    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>\n`;
    sitemapContent += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
    sitemapContent += `  </url>\n`;
  });

  // Read dynamic blog posts if index exists
  try {
    const dataPath = path.resolve(__dirname, '../src/data/blogs-index.json');
    if (fs.existsSync(dataPath)) {
      const blogIndex = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      blogIndex.forEach(post => {
        if (post.slug) {
          sitemapContent += `  <url>\n`;
          sitemapContent += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
          sitemapContent += `    <lastmod>${getValidDate(post.date)}</lastmod>\n`;
          sitemapContent += `    <changefreq>monthly</changefreq>\n`;
          sitemapContent += `    <priority>0.7</priority>\n`;
          sitemapContent += `  </url>\n`;
        }
      });
    }
  } catch (error) {
    console.warn('Could not read blog index for sitemap generation:', error.message);
  }

  sitemapContent += `</urlset>`;

  // Write to public directory
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generated at public/sitemap.xml');
}

generateSitemap();
