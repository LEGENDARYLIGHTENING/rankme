import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rankursite.com';

// Define static routes
const coreRoutes = [
  '/',
  '/services',
  '/case-studies',
  '/about',
  '/philosophy',
  '/certifications',
  '/process',
  '/blog',
  '/free-audit',
  '/contact',
  '/saas-websites'
];

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

function generateXml(urls) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const item of urls) {
    xml += `  <url>\n    <loc>${item.url}</loc>\n`;
    if (item.lastModified) xml += `    <lastmod>${item.lastModified}</lastmod>\n`;
    if (item.changeFrequency) xml += `    <changefreq>${item.changeFrequency}</changefreq>\n`;
    if (item.priority) xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `</urlset>`;
  return xml;
}

async function generateSitemap() {
  console.log('Generating chunked sitemaps...');
  
  const publicDir = path.resolve(__dirname, '../public');
  const sitemapDir = path.join(publicDir, 'sitemap');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(sitemapDir)) {
    fs.mkdirSync(sitemapDir, { recursive: true });
  }

  const sitemaps = ['core', 'blogs'];
  let allUrlsTxtContent = '';

  // 1. Generate Core Sitemap
  const coreUrls = coreRoutes.map(route => {
    allUrlsTxtContent += `${BASE_URL}${route === '/' ? '/' : route}\n`;
    return {
      url: `${BASE_URL}${route}`,
      lastModified: getTodayDate(),
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? '1.0' : '0.8'
    };
  });
  fs.writeFileSync(path.join(sitemapDir, 'core.xml'), generateXml(coreUrls));

  // 2. Generate Blogs Sitemap
  let blogUrls = [];
  try {
    const dataPath = path.resolve(__dirname, '../src/data/blogs-index.json');
    if (fs.existsSync(dataPath)) {
      const blogIndex = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      blogUrls = blogIndex.filter(post => post.slug).map(post => {
        allUrlsTxtContent += `${BASE_URL}/blog/${post.slug}\n`;
        return {
          url: `${BASE_URL}/blog/${post.slug}`,
          lastModified: getValidDate(post.date),
          changeFrequency: 'monthly',
          priority: '0.7'
        };
      });
    }
  } catch (error) {
    console.warn('Could not read blog index for sitemap generation:', error.message);
  }
  fs.writeFileSync(path.join(sitemapDir, 'blogs.xml'), generateXml(blogUrls));

  // 3. Generate Cities / Countries Sitemaps
  // We'll read both cities.json and countries.json to maintain backwards compatibility 
  // with any existing city pages, plus the new countries.
  const targetRegions = [];
  
  try {
    const citiesPath = path.resolve(__dirname, '../cities.json');
    if (fs.existsSync(citiesPath)) {
      const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf-8'));
      targetRegions.push(...cities);
    }
  } catch (error) {}

  try {
    const countriesPath = path.resolve(__dirname, '../countries.json');
    if (fs.existsSync(countriesPath)) {
      const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf-8'));
      targetRegions.push(...countries);
    }
  } catch (error) {}

  // Generate a sitemap chunk for each region (city or country)
  targetRegions.forEach(region => {
    if (region.slug) {
      const regionRoutes = coreRoutes.map(route => {
        const fullUrl = `${BASE_URL}/${region.slug}${route === '/' ? '' : route}`;
        allUrlsTxtContent += `${fullUrl}\n`;
        return {
          url: fullUrl,
          lastModified: getTodayDate(),
          changeFrequency: 'weekly',
          priority: '0.7'
        };
      });
      
      fs.writeFileSync(path.join(sitemapDir, `${region.slug}.xml`), generateXml(regionRoutes));
      sitemaps.push(region.slug);
    }
  });

  // 4. Generate Sitemap Index
  let sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const id of sitemaps) {
    sitemapIndexXml += `  <sitemap>\n    <loc>${BASE_URL}/sitemap/${id}.xml</loc>\n  </sitemap>\n`;
  }
  sitemapIndexXml += `</sitemapindex>`;
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml);
  console.log('Sitemap Index generated at public/sitemap.xml');

  // Generate urls.txt for easy manual indexing
  fs.writeFileSync(path.join(publicDir, 'urls.txt'), allUrlsTxtContent.trim() + '\n');
  console.log('URLs list generated at public/urls.txt');
}

generateSitemap();
