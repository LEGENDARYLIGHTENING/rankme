import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rankursite.com';

const coreRoutes = [
  '/',
  '/services',
  '/case-studies',
  '/about',
  '/locations',
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

function generateIndexXml(sitemaps) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const sitemapUrl of sitemaps) {
    xml += `  <sitemap>\n    <loc>${sitemapUrl}</loc>\n  </sitemap>\n`;
  }
  xml += `</sitemapindex>`;
  return xml;
}

async function generateSitemap() {
  console.log('--- Generating Clean, High-Authority Google Sitemaps with Full Legacy Compatibility ---');

  const publicDir = path.resolve(__dirname, '../public');
  const sitemapDir = path.join(publicDir, 'sitemap');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  if (!fs.existsSync(sitemapDir)) {
    fs.mkdirSync(sitemapDir, { recursive: true });
  }

  let allValidUrls = [];

  // 1. Generate Core Pages Sitemap
  const coreUrls = coreRoutes.map(route => {
    const fullUrl = `${BASE_URL}${route === '/' ? '' : route}`;
    allValidUrls.push(fullUrl);
    return {
      url: fullUrl,
      lastModified: getTodayDate(),
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? '1.0' : '0.9'
    };
  });
  fs.writeFileSync(path.join(sitemapDir, 'core.xml'), generateXml(coreUrls));
  console.log(`✓ Generated sitemap/core.xml (${coreUrls.length} URLs)`);

  // 2. Generate Authoritative Country Silos Sitemap
  let countryUrls = [];
  const countriesPath = path.resolve(__dirname, '../countries.json');
  let countriesList = [];
  try {
    if (fs.existsSync(countriesPath)) {
      countriesList = JSON.parse(fs.readFileSync(countriesPath, 'utf-8'));
      countryUrls = countriesList.map(c => {
        const fullUrl = `${BASE_URL}/${c.slug}`;
        allValidUrls.push(fullUrl);
        return {
          url: fullUrl,
          lastModified: getTodayDate(),
          changeFrequency: 'weekly',
          priority: '0.85'
        };
      });
    }
  } catch (err) {
    console.warn('Could not read countries.json:', err.message);
  }
  fs.writeFileSync(path.join(sitemapDir, 'countries.xml'), generateXml(countryUrls));
  console.log(`✓ Generated sitemap/countries.xml (${countryUrls.length} Country Silos)`);

  // 3. Generate Individual Country Sitemaps (Resolves GSC 404/Error for uk.xml, usa.xml, etc.)
  for (const c of countriesList) {
    const cUrl = `${BASE_URL}/${c.slug}`;
    const singleCountryXml = generateXml([
      {
        url: cUrl,
        lastModified: getTodayDate(),
        changeFrequency: 'weekly',
        priority: '0.85'
      }
    ]);
    fs.writeFileSync(path.join(sitemapDir, `${c.slug}.xml`), singleCountryXml);
  }
  console.log(`✓ Generated ${countriesList.length} individual country sitemaps (uk.xml, usa.xml, etc.)`);

  // 4. Generate Canonical Blogs Sitemap
  let blogUrls = [];
  try {
    const dataPath = path.resolve(__dirname, '../src/data/blogs-index.json');
    if (fs.existsSync(dataPath)) {
      const blogIndex = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      blogUrls = blogIndex
        .filter(post => post.slug)
        .map(post => {
          const fullUrl = `${BASE_URL}/blog/${post.slug}`;
          allValidUrls.push(fullUrl);
          return {
            url: fullUrl,
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
  console.log(`✓ Generated sitemap/blogs.xml (${blogUrls.length} Canonical Articles)`);

  // 5. Generate Master Root Sitemap Index
  const masterSitemaps = [
    `${BASE_URL}/sitemap/core.xml`,
    `${BASE_URL}/sitemap/countries.xml`,
    `${BASE_URL}/sitemap/blogs.xml`
  ];
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateIndexXml(masterSitemaps));
  console.log(`✓ Generated master public/sitemap.xml index pointing to 3 clean authoritative sitemaps`);

  // 6. Update public/urls.txt with verified indexable URLs
  fs.writeFileSync(path.join(publicDir, 'urls.txt'), allValidUrls.join('\n') + '\n');
  console.log(`✓ Updated public/urls.txt with ${allValidUrls.length} valid canonical URLs`);

  console.log('--- Sitemap Generation Complete: High-authority sitemaps generated without crawl traps ---');
}

generateSitemap().catch(console.error);
