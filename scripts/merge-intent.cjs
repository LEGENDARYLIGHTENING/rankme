const fs = require('fs');
const path = require('path');

const intentPath = path.join(__dirname, '../src/data/local-intent.json');
const newCitiesPath = '/Users/mokshparjapati/.gemini/antigravity-ide/brain/d5db4300-454f-4867-b891-98dbf654e540/scratch/new-cities.json';

const currentIntent = JSON.parse(fs.readFileSync(intentPath, 'utf8'));
const newCities = JSON.parse(fs.readFileSync(newCitiesPath, 'utf8'));

// Merge
const merged = { ...currentIntent, ...newCities };

fs.writeFileSync(intentPath, JSON.stringify(merged, null, 2));

console.log(`Successfully merged. Total cities: ${Object.keys(merged).length}`);
