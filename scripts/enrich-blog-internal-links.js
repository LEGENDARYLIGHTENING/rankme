import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsDir = path.resolve(__dirname, '../blogs');
const citiesPath = path.resolve(__dirname, '../cities.json');

if (!fs.existsSync(blogsDir)) {
  console.error('Blogs directory not found!');
  process.exit(1);
}

const cities = fs.existsSync(citiesPath) ? JSON.parse(fs.readFileSync(citiesPath, 'utf8')) : [];

const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
console.log(`Enriching internal links and anti-template uniqueness for ${blogFiles.length} blog posts...`);

const cityLinks = cities.map(c => ({
  name: c.city,
  slug: `/${c.slug}`,
  anchor: `B2B web design in ${c.city}`
}));

let enrichedCount = 0;

blogFiles.forEach((file, idx) => {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if post already has internal links to /services or city pages
  const hasServiceLink = content.includes('/services');
  const hasAuditLink = content.includes('/free-audit');
  const hasCaseStudiesLink = content.includes('/case-studies');

  // Rotate through cities for contextual in-text linking
  const assignedCity = cityLinks[idx % cityLinks.length];
  const nextCity = cityLinks[(idx + 15) % cityLinks.length];

  // In-text enrichment paragraph to inject before the conclusion/CTA
  const uniqueEnrichmentBlock = `
---

### Regional Impact & Commercial Execution

Whether you are scaling an enterprise SaaS platform or a mid-market industrial brand, digital infrastructure must be tailored to your target geographic buyer intent. For instance, B2B founders operating in [${assignedCity.name}](${assignedCity.slug}) face very different local market dynamics than companies competing in [${nextCity.name}](${nextCity.slug}). 

By combining sub-500ms Edge rendering with high-intent Generative Engine Optimization (GEO), we ensure your platform ranks for both local and global commercial queries. For a full breakdown of our technical capabilities, explore our custom [B2B Growth Services](/services) or review our verified client outcomes in our [Enterprise Case Studies](/case-studies).
`;

  // Inject before "## Turn Your Website" or "## Conclusion" or before the last heading if not present
  if (!content.includes('Regional Impact & Commercial Execution')) {
    if (content.includes('## Turn Your Website')) {
      content = content.replace('## Turn Your Website', `${uniqueEnrichmentBlock.trim()}\n\n## Turn Your Website`);
    } else if (content.includes('## Conclusion')) {
      content = content.replace('## Conclusion', `${uniqueEnrichmentBlock.trim()}\n\n## Conclusion`);
    } else {
      content += `\n\n${uniqueEnrichmentBlock.trim()}`;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    enrichedCount++;
  }
});

console.log(`Successfully enriched contextual internal links across ${enrichedCount} blog posts!`);
