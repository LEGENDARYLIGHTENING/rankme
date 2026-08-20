import fs from 'fs';
import path from 'path';

const baseRoutes = [
  { folder: 'services', component: 'Services' },
  { folder: 'about', component: 'About' },
  { folder: 'contact', component: 'Contact' },
  { folder: 'philosophy', component: 'Philosophy' },
  { folder: 'case-studies', component: 'CaseStudies' },
  { folder: 'certifications', component: 'Certifications' },
  { folder: 'process', component: 'Process' },
  { folder: 'free-audit', component: 'FreeAudit' },
  { folder: 'thank-you', component: 'ThankYou' },
  { folder: 'blog', component: 'Blog' }
];

const regionDir = path.join(process.cwd(), 'app', '[region]');
if (!fs.existsSync(regionDir)) fs.mkdirSync(regionDir, { recursive: true });

// Generate layout.jsx
const layoutContent = "import cityData from '../../src/data/cityData.jsx';\n" +
"import countryData from '../../src/data/countryData.jsx';\n\n" +
"const allRegions = { ...cityData, ...countryData };\n\n" +
"export async function generateStaticParams() {\n" +
"  return Object.keys(allRegions).map(slug => ({ region: slug }));\n" +
"}\n\n" +
"export async function generateMetadata({ params }) {\n" +
"  const resolvedParams = await params;\n" +
"  const regionData = allRegions[resolvedParams.region];\n" +
"  if (!regionData) return {};\n" +
"  return {\n" +
"    title: regionData.props.seoTitle || regionData.props.title,\n" +
"    description: regionData.props.seoDesc || regionData.props.metaDescription,\n" +
"    alternates: { canonical: `https://rankursite.com/${resolvedParams.region}` }\n" +
"  };\n" +
"}\n\n" +
"export default async function RegionLayout({ children }) {\n" +
"  return <>{children}</>;\n" +
"}\n";

fs.writeFileSync(path.join(regionDir, 'layout.jsx'), layoutContent);

// Generate page.jsx (NichePage)
const pageContent = "import cityData from '../../src/data/cityData.jsx';\n" +
"import countryData from '../../src/data/countryData.jsx';\n" +
"import NichePage from '../../src/views/NichePage';\n\n" +
"const allRegions = { ...cityData, ...countryData };\n\n" +
"export default async function Page({ params }) {\n" +
"  const resolvedParams = await params;\n" +
"  const regionData = allRegions[resolvedParams.region];\n" +
"  if (!regionData) return null;\n" +
"  return <NichePage {...regionData.props} />;\n" +
"}\n";

fs.writeFileSync(path.join(regionDir, 'page.jsx'), pageContent);

// Generate sub-routes
baseRoutes.forEach(route => {
  const targetDir = path.join(regionDir, route.folder);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  
  const content = "import " + route.component + " from '../../../src/views/" + route.component + "';\n\n" +
  "export default function Page() {\n" +
  "  return <" + route.component + " />;\n" +
  "}\n";

  fs.writeFileSync(path.join(targetDir, 'page.jsx'), content);
});

console.log("Programmatic SEO routes built inside app/[region]");
