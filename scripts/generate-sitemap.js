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

async function generateSitemap() {
  console.log('Generating NowFloats City-Wise Chunked Sitemaps...');
  
  const publicDir = path.resolve(__dirname, '../public');
  const sitemapDir = path.join(publicDir, 'sitemap');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(sitemapDir)) {
    fs.mkdirSync(sitemapDir, { recursive: true });
  }

  const sitemapChunkIds = ['core', 'blogs'];
  let allUrlsTxtContent = '';

  // 1. Generate Core Sitemap
  const coreUrls = coreRoutes.map(route => {
    const fullUrl = `${BASE_URL}${route === '/' ? '' : route}`;
    allUrlsTxtContent += `${fullUrl}\n`;
    return {
      url: fullUrl,
      lastModified: getTodayDate(),
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? '1.0' : '0.8'
    };
  });
  fs.writeFileSync(path.join(sitemapDir, 'core.xml'), generateXml(coreUrls));

  // 2. Generate Global Blogs Sitemap
  let blogUrls = [];
  let blogIndex = [];
  try {
    const dataPath = path.resolve(__dirname, '../src/data/blogs-index.json');
    if (fs.existsSync(dataPath)) {
      blogIndex = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      blogUrls = blogIndex
        .filter(post => post.slug)
        .map(post => {
          const fullUrl = `${BASE_URL}/blog/${post.slug}`;
          allUrlsTxtContent += `${fullUrl}\n`;
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

  // 3. Load Cities & Services Datasets
  let citiesList = [];
  let countriesList = [];
  let servicesList = [];

  try {
    const citiesPath = path.resolve(__dirname, '../cities.json');
    if (fs.existsSync(citiesPath)) {
      citiesList = JSON.parse(fs.readFileSync(citiesPath, 'utf-8'));
    }
  } catch (error) {}

  try {
    const countriesPath = path.resolve(__dirname, '../countries.json');
    if (fs.existsSync(countriesPath)) {
      countriesList = JSON.parse(fs.readFileSync(countriesPath, 'utf-8'));
    }
  } catch (error) {}

  try {
    const servicesPath = path.resolve(__dirname, '../src/data/servicesData.json');
    if (fs.existsSync(servicesPath)) {
      servicesList = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));
    }
  } catch (error) {}

  // 4. Generate DEDICATED CITY-WISE Sitemaps (City Hub + 10 Services + Local Blogs + Core Subpages)
  console.log(`Generating dedicated city-wise sitemaps for ${citiesList.length} cities...`);

  citiesList.forEach(city => {
    if (!city.slug) return;

    const cityUrls = [];
    
    // A. Main City Landing Page URL
    const mainCityUrl = `${BASE_URL}/${city.slug}`;
    allUrlsTxtContent += `${mainCityUrl}\n`;
    cityUrls.push({
      url: mainCityUrl,
      lastModified: getTodayDate(),
      changeFrequency: 'weekly',
      priority: '0.9'
    });

    // B. Matrix Service-City URLs (10 Services x City)
    servicesList.forEach(service => {
      const matrixUrl = `${BASE_URL}/${city.slug}/${service.slug}`;
      allUrlsTxtContent += `${matrixUrl}\n`;
      cityUrls.push({
        url: matrixUrl,
        lastModified: getTodayDate(),
        changeFrequency: 'weekly',
        priority: '0.85'
      });
    });

    // C. Hyper-Localized City-Blog URLs for this specific city
    const topBlogsForCity = blogIndex.filter(b => b.slug).slice(0, 15);
    topBlogsForCity.forEach(blog => {
      const cityBlogUrl = `${BASE_URL}/blog/${blog.slug}/in/${city.slug}`;
      allUrlsTxtContent += `${cityBlogUrl}\n`;
      cityUrls.push({
        url: cityBlogUrl,
        lastModified: getTodayDate(),
        changeFrequency: 'monthly',
        priority: '0.75'
      });
    });

    // D. Core Localized Subpages for City
    const coreSubpages = ['services', 'free-audit', 'case-studies', 'about', 'contact'];
    coreSubpages.forEach(sub => {
      const subUrl = `${BASE_URL}/${city.slug}/${sub}`;
      allUrlsTxtContent += `${subUrl}\n`;
      cityUrls.push({
        url: subUrl,
        lastModified: getTodayDate(),
        changeFrequency: 'weekly',
        priority: '0.7'
      });
    });

    // Save city sitemaps under BOTH filenames: city-[slug].xml AND [slug].xml
    const cityFileName = `city-${city.slug}.xml`;
    const aliasFileName = `${city.slug}.xml`;

    const xmlData = generateXml(cityUrls);
    fs.writeFileSync(path.join(sitemapDir, cityFileName), xmlData);
    fs.writeFileSync(path.join(sitemapDir, aliasFileName), xmlData);

    sitemapChunkIds.push(`city-${city.slug}`);
  });

  // 5. Generate Country Sitemaps (sitemap/countries.xml)
  if (countriesList.length > 0) {
    const countryUrls = countriesList.filter(c => c.slug).map(country => {
      const fullUrl = `${BASE_URL}/${country.slug}`;
      allUrlsTxtContent += `${fullUrl}\n`;
      return {
        url: fullUrl,
        lastModified: getTodayDate(),
        changeFrequency: 'weekly',
        priority: '0.8'
      };
    });
    fs.writeFileSync(path.join(sitemapDir, 'countries.xml'), generateXml(countryUrls));
    sitemapChunkIds.push('countries');
  }

  // 6. Generate Master Sitemap Index (sitemap.xml)
  let sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const chunkId of sitemapChunkIds) {
    sitemapIndexXml += `  <sitemap>\n    <loc>${BASE_URL}/sitemap/${chunkId}.xml</loc>\n  </sitemap>\n`;
  }
  sitemapIndexXml += `</sitemapindex>`;
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml);
  console.log(`Master Sitemap Index generated at public/sitemap.xml referencing ${sitemapChunkIds.length} city-wise and core XML feeds.`);

  // 7. Save urls.txt
  fs.writeFileSync(path.join(publicDir, 'urls.txt'), allUrlsTxtContent.trim() + '\n');
  console.log(`URLs list generated at public/urls.txt with ${allUrlsTxtContent.trim().split('\n').length} total URLs.`);
}

generateSitemap();
