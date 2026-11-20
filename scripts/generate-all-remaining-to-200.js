const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const blogsDir = path.join(rootDir, 'blogs');
const c = JSON.parse(fs.readFileSync(path.join(rootDir, 'scripts/next-38-candidates.json'), 'utf8'));

console.log(`Loaded ${c.length} candidates for elevation to 200.`);
