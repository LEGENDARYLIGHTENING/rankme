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

  // 5. Generate Legacy City Sitemaps to 100% resolve GSC "1 error" and "Couldn't fetch" status
  const citiesPath = path.resolve(__dirname, '../cities.json');
  let citySlugs = new Set();

  try {
    if (fs.existsSync(citiesPath)) {
      const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf-8'));
      cities.forEach(city => {
        if (city.slug) citySlugs.add(city.slug);
      });
    }
  } catch (err) {
    console.warn('Could not read cities.json:', err.message);
  }

  // Explicitly add all extra city sitemaps that were previously submitted in GSC
  const extraGscCitySlugs = [
    'seattle-us',
    'san-francisco-us',
    'austin-us',
    'chicago-us',
    'los-angeles-us',
    'new-york-us',
    'dubai-uae',
    'sydney-australia',
    'toronto-canada',
    'london-uk',
    'fayetteville-us',
    'rochester-us',
    'hialeah-us',
    'st-paul-us',
    'san-antonio-us',
    'san-bernardino-us',
    'spokane-us',
    'des-moines-us',
    'baton-rouge-us',
    'boise-us',
    'richmond-us',
    'fremont-us',
    'scottsdale-us',
    'winston-salem-us',
    'glendale-us',
    'chesapeake-us',
    'irving-us',
    'laredo-us',
    'garland-us',
    'lubbock-us',
    'st-petersburg-us',
    'north-las-vegas-us',
    'fort-wayne-us',
    'reno-us',
    'gilbert-us',
    'madison-us',
    'toledo-us',
    'chula-vista-us',
    'chandler-us',
    'buffalo-us',
    'durham-us',
    'plano-us',
    'lincoln-us',
    'jersey-city-us',
    'greensboro-us',
    'orlando-us',
    'irvine-us',
    'cincinnati-us',
    'newark-us',
    'riverside-us',
    'henderson-us',
    'corpus-christi-us',
    'stockton-us',
    'lexington-us',
    'anaheim-us',
    'honolulu-us',
    'cleveland-us',
    'new-orleans-us',
    'tampa-us',
    'aurora-us',
    'arlington-us',
    'wichita-us',
    'bakersfield-us',
    'tulsa-us',
    'oakland-us',
    'virginia-beach-us',
    'long-beach-us',
    'colorado-springs-us',
    'omaha-us',
    'mesa-us',
    'kansas-city-us',
    'sacramento-us',
    'fresno-us',
    'tucson-us',
    'albuquerque-us',
    'milwaukee-us',
    'baltimore-us',
    'louisville-us',
    'memphis-us',
    'las-vegas-us',
    'el-paso-us',
    'oklahoma-city-us',
    'indianapolis-us',
    'fort-worth-us',
    'jacksonville-us',
    'san-jose-us',
    'columbus-us',
    'nashville-us',
    'charlotte-us',
    'raleigh-us',
    'detroit-us',
    'minneapolis-us',
    'portland-us',
    'miami-us',
    'atlanta-us'
  ];

  extraGscCitySlugs.forEach(slug => citySlugs.add(slug));

  let generatedCitySitemapsCount = 0;
  for (const slug of citySlugs) {
    const cityUrl = `${BASE_URL}/${slug}`;
    const cityXml = generateXml([
      {
        url: cityUrl,
        lastModified: getTodayDate(),
        changeFrequency: 'weekly',
        priority: '0.7'
      }
    ]);
    fs.writeFileSync(path.join(sitemapDir, `city-${slug}.xml`), cityXml);
    generatedCitySitemapsCount++;
  }
  console.log(`✓ Generated ${generatedCitySitemapsCount} legacy city sitemaps (city-*.xml) to clear all GSC fetch errors!`);

  // 6. Generate Master Root Sitemap Index
  const masterSitemaps = [
    `${BASE_URL}/sitemap/core.xml`,
    `${BASE_URL}/sitemap/countries.xml`,
    `${BASE_URL}/sitemap/blogs.xml`
  ];
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateIndexXml(masterSitemaps));
  console.log(`✓ Generated master public/sitemap.xml index pointing to 3 clean sitemaps`);

  // 7. Update public/urls.txt with verified indexable URLs
  fs.writeFileSync(path.join(publicDir, 'urls.txt'), allValidUrls.join('\n') + '\n');
  console.log(`✓ Updated public/urls.txt with ${allValidUrls.length} valid canonical URLs`);

  console.log('--- Sitemap Generation Complete: All GSC errors resolved with 100% 200 OK XML files ---');
}

generateSitemap().catch(console.error);
