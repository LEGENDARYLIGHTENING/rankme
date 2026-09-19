import fs from 'fs';
import path from 'path';

const gscPath = 'E:/FREELANCE WEBSITE/rankursite.com-Performance-on-Search-2026-09-18';

// Chart summary
const chartLines = fs.readFileSync(path.join(gscPath, 'Chart.csv'), 'utf-8').trim().split('\n').slice(1);
let totalClicks = 0;
let totalImpressions = 0;
chartLines.forEach(l => {
  const parts = l.split(',');
  if (parts.length >= 3) {
    totalClicks += parseInt(parts[1] || 0, 10);
    totalImpressions += parseInt(parts[2] || 0, 10);
  }
});
console.log('TOTAL CLICKS (Last 3 Mo):', totalClicks);
console.log('TOTAL IMPRESSIONS (Last 3 Mo):', totalImpressions);

console.log('\n--- LAST 14 DAYS TREND ---');
chartLines.slice(-14).forEach(l => console.log(l));

// Queries analysis
const queryLines = fs.readFileSync(path.join(gscPath, 'Queries.csv'), 'utf-8').trim().split('\n').slice(1);
console.log('\nTOTAL QUERIES COUNT:', queryLines.length);

let posBuckets = { 'top3 (1-3)': 0, 'page1 (4-10)': 0, 'page2 (11-20)': 0, 'page3to5 (21-50)': 0, 'page6plus (51+)': 0 };
let queryList = [];

queryLines.forEach(l => {
  const parts = l.split(',');
  if (parts.length >= 5) {
    const q = parts[0];
    const c = parseInt(parts[1] || 0, 10);
    const i = parseInt(parts[2] || 0, 10);
    const ctr = parts[3];
    const p = parseFloat(parts[4]);
    queryList.push({ q, clicks: c, impressions: i, ctr, pos: p });
    if (p <= 3) posBuckets['top3 (1-3)']++;
    else if (p <= 10) posBuckets['page1 (4-10)']++;
    else if (p <= 20) posBuckets['page2 (11-20)']++;
    else if (p <= 50) posBuckets['page3to5 (21-50)']++;
    else posBuckets['page6plus (51+)']++;
  }
});

console.log('\nPOSITION DISTRIBUTION OF QUERIES:');
console.log(posBuckets);

console.log('\nTOP 15 QUERIES BY IMPRESSIONS:');
queryList.sort((a,b) => b.impressions - a.impressions).slice(0, 15).forEach(x => {
  console.log(`${x.q.padEnd(45)} | Imp: ${String(x.impressions).padStart(4)} | Clicks: ${x.clicks} | Pos: ${x.pos.toFixed(1)}`);
});

console.log('\nTOP QUERIES WITH CLICKS:');
queryList.filter(x => x.clicks > 0).forEach(x => {
  console.log(`${x.q.padEnd(45)} | Imp: ${String(x.impressions).padStart(4)} | Clicks: ${x.clicks} | Pos: ${x.pos.toFixed(1)}`);
});

console.log('\nBEST POSITION QUERIES (Pos <= 20):');
queryList.filter(x => x.pos <= 20).sort((a,b) => a.pos - b.pos).slice(0, 15).forEach(x => {
  console.log(`${x.q.padEnd(45)} | Imp: ${String(x.impressions).padStart(4)} | Clicks: ${x.clicks} | Pos: ${x.pos.toFixed(1)}`);
});

// Pages analysis
const pageLines = fs.readFileSync(path.join(gscPath, 'Pages.csv'), 'utf-8').trim().split('\n').slice(1);
console.log('\nTOTAL PAGES WITH IMPRESSIONS/CLICKS:', pageLines.length);

let pageList = [];
pageLines.forEach(l => {
  const parts = l.split(',');
  if (parts.length >= 5) {
    pageList.push({
      url: parts[0],
      clicks: parseInt(parts[1] || 0, 10),
      impressions: parseInt(parts[2] || 0, 10),
      ctr: parts[3],
      pos: parseFloat(parts[4])
    });
  }
});

console.log('\nTOP 15 PAGES BY IMPRESSIONS:');
pageList.sort((a,b) => b.impressions - a.impressions).slice(0, 15).forEach(x => {
  console.log(`${x.url.padEnd(65)} | Imp: ${String(x.impressions).padStart(4)} | Clicks: ${x.clicks} | Pos: ${x.pos.toFixed(1)}`);
});

console.log('\nTOP PAGES BY CLICKS:');
pageList.filter(x => x.clicks > 0).sort((a,b) => b.clicks - a.clicks).forEach(x => {
  console.log(`${x.url.padEnd(65)} | Imp: ${String(x.impressions).padStart(4)} | Clicks: ${x.clicks} | Pos: ${x.pos.toFixed(1)}`);
});

// Countries
const countryLines = fs.readFileSync(path.join(gscPath, 'Countries.csv'), 'utf-8').trim().split('\n').slice(1);
console.log('\nTOP COUNTRIES BY IMPRESSIONS:');
countryLines.slice(0, 10).forEach(l => console.log(l));
