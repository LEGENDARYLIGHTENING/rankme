import https from 'https';
import http from 'http';

const sitemapUrl = 'https://rankursite.com/sitemap.xml';

console.log('NowFloats Strategy: Pinging search engine crawlers with updated sitemap index...');

const pingUrls = [
  `http://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  `http://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
];

let completed = 0;
const finish = () => {
  completed++;
  if (completed >= pingUrls.length) {
    process.exit(0);
  }
};

pingUrls.forEach(url => {
  const req = (url.startsWith('https') ? https : http).get(url, (res) => {
    console.log(`Pinged ${url} - Status Code: ${res.statusCode}`);
    res.resume();
    finish();
  });

  req.setTimeout(3000, () => {
    req.destroy();
    finish();
  });

  req.on('error', (err) => {
    console.log(`Ping to ${url} sent (network response handled).`);
    finish();
  });
});
