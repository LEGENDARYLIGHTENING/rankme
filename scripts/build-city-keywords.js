import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Primary sector per city, sourced from Grok's "top_sectors"[0] research.
// This is the one genuinely per-city signal we use to differentiate copy + FAQs.
const primaryByCity = {
  "Atlanta": "manufacturing & export", "Miami": "manufacturing & export", "Portland": "SaaS & tech",
  "Minneapolis": "manufacturing & export", "Detroit": "manufacturing & export", "Raleigh": "SaaS & tech",
  "Charlotte": "industrial & business services", "Nashville": "wellness & health", "Columbus": "manufacturing & export",
  "San Jose": "SaaS & tech", "Jacksonville": "industrial & business services", "Fort Worth": "manufacturing & export",
  "Indianapolis": "manufacturing & export", "Oklahoma City": "industrial & business services", "El Paso": "manufacturing & export",
  "Las Vegas": "industrial & business services", "Memphis": "manufacturing & export", "Louisville": "manufacturing & export",
  "Baltimore": "industrial & business services", "Milwaukee": "manufacturing & export", "Albuquerque": "SaaS & tech",
  "Tucson": "industrial & business services", "Fresno": "manufacturing & export", "Sacramento": "industrial & business services",
  "Kansas City": "manufacturing & export", "Mesa": "industrial & business services", "Omaha": "industrial & business services",
  "Colorado Springs": "SaaS & tech", "Long Beach": "manufacturing & export", "Virginia Beach": "industrial & business services",
  "Oakland": "SaaS & tech", "Tulsa": "industrial & business services", "Bakersfield": "manufacturing & export",
  "Wichita": "manufacturing & export", "Arlington": "manufacturing & export", "Aurora": "SaaS & tech",
  "Tampa": "industrial & business services", "New Orleans": "industrial & business services", "Cleveland": "manufacturing & export",
  "Honolulu": "industrial & business services", "Anaheim": "industrial & business services", "Lexington": "manufacturing & export",
  "Stockton": "manufacturing & export", "Corpus Christi": "manufacturing & export", "Henderson": "industrial & business services",
  "Riverside": "manufacturing & export", "Newark": "industrial & business services", "Cincinnati": "manufacturing & export",
  "Irvine": "SaaS & tech", "Orlando": "industrial & business services", "Greensboro": "manufacturing & export",
  "Jersey City": "SaaS & tech", "Lincoln": "industrial & business services", "Plano": "SaaS & tech",
  "Durham": "SaaS & tech", "Buffalo": "manufacturing & export", "Chandler": "SaaS & tech",
  "Chula Vista": "manufacturing & export", "Toledo": "manufacturing & export", "Madison": "SaaS & tech",
  "Gilbert": "industrial & business services", "Reno": "manufacturing & export", "Fort Wayne": "manufacturing & export",
  "North Las Vegas": "industrial & business services", "St. Petersburg": "industrial & business services", "Lubbock": "industrial & business services",
  "Garland": "manufacturing & export", "Laredo": "manufacturing & export", "Irving": "SaaS & tech",
  "Chesapeake": "industrial & business services", "Glendale": "industrial & business services", "Winston-Salem": "manufacturing & export",
  "Scottsdale": "SaaS & tech", "Fremont": "SaaS & tech", "Richmond": "industrial & business services",
  "Boise": "SaaS & tech", "Baton Rouge": "manufacturing & export", "Des Moines": "industrial & business services",
  "Spokane": "industrial & business services", "San Bernardino": "manufacturing & export", "San Antonio": "industrial & business services",
  "St. Paul": "manufacturing & export", "Hialeah": "manufacturing & export", "Rochester": "manufacturing & export",
  "Fayetteville": "industrial & business services"
};

const cities = JSON.parse(fs.readFileSync(path.join(__dirname, '../cities.json'), 'utf8'));

const out = {};
const missing = [];
for (const c of cities) {
  const sector = primaryByCity[c.city];
  if (!sector) { missing.push(c.city); continue; }
  out[c.slug] = { primarySector: sector };
}

fs.writeFileSync(
  path.join(__dirname, '../src/data/cityKeywords.json'),
  JSON.stringify(out, null, 2),
  'utf8'
);

console.log(`Wrote cityKeywords.json for ${Object.keys(out).length} cities.`);
if (missing.length) console.warn('MISSING sector for:', missing.join(', '));
