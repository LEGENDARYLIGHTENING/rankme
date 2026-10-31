import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(getFiles(full));
    else results.push(full);
  });
  return results;
}

const rootDirs = [
  path.resolve('promotions'),
  path.resolve('prototype/promotions'),
  path.resolve('backlinks')
];

let allFiles = [];
rootDirs.forEach(d => {
  allFiles = allFiles.concat(getFiles(d));
});

const textFiles = allFiles.filter(f => f.endsWith('.md') || f.endsWith('.txt') || f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json'));

const urls = new Set();
textFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const matches = content.match(/https?:\/\/rankursite\.com\/[^\s\)\"\'>]+/g) || [];
  matches.forEach(m => urls.add(m));
});

console.log('Total unique rankursite.com URLs found in promotional/backlink assets:', urls.size);

const urlList = Array.from(urls);
const blogUrls = urlList.filter(u => u.includes('/blog/'));
const coreUrls = urlList.filter(u => !u.includes('/blog/'));

console.log('Blog URLs count:', blogUrls.length);
console.log('Core/Other URLs count:', coreUrls.length);

console.log('\nAll Core/Other URLs:');
coreUrls.forEach(u => console.log(' -', u));

const doorwayUrls = urlList.filter(u => u.includes('/in/') || u.includes('-us') || u.includes('-uk'));
console.log('\nDoorway URLs found in promos:', doorwayUrls.length);
doorwayUrls.forEach(u => console.log(' - Doorway:', u));

