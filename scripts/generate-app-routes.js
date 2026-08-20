import fs from 'fs';
import path from 'path';

const routes = [
  { name: 'Home', folder: '', component: 'Home' },
  { name: 'Services', folder: 'services', component: 'Services' },
  { name: 'About', folder: 'about', component: 'About' },
  { name: 'Contact', folder: 'contact', component: 'Contact' },
  { name: 'Philosophy', folder: 'philosophy', component: 'Philosophy' },
  { name: 'CaseStudies', folder: 'case-studies', component: 'CaseStudies' },
  { name: 'Certifications', folder: 'certifications', component: 'Certifications' },
  { name: 'Process', folder: 'process', component: 'Process' },
  { name: 'FreeAudit', folder: 'free-audit', component: 'FreeAudit' },
  { name: 'ThankYou', folder: 'thank-you', component: 'ThankYou' },
  { name: 'Blog', folder: 'blog', component: 'Blog' }
];

const appDir = path.join(process.cwd(), 'app');
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir);

routes.forEach(route => {
  const targetDir = route.folder ? path.join(appDir, route.folder) : appDir;
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  // Correct path depth for imports
  const depth = route.folder ? '../'.repeat(route.folder.split('/').length + 1) : '../';
  
  const content = "import " + route.component + " from '" + depth + "src/views/" + route.component + "';\n\n" +
"export const metadata = {\n" +
"  title: '" + (route.name === 'Home' ? 'Rankur | B2B Growth Infrastructure Studio' : route.name + ' | Rankur') + "',\n" +
"};\n\n" +
"export default function Page() {\n" +
"  return <" + route.component + " />;\n" +
"}\n";

  fs.writeFileSync(path.join(targetDir, 'page.jsx'), content);
});

// Setup Blog Post dynamic route
const blogPostDir = path.join(appDir, 'blog', '[slug]');
if (!fs.existsSync(blogPostDir)) fs.mkdirSync(blogPostDir, { recursive: true });
const blogPostContent = "import BlogPost from '../../../src/views/BlogPost';\n\n" +
"export default function Page({ params }) {\n" +
"  return <BlogPost />;\n" +
"}\n";
fs.writeFileSync(path.join(blogPostDir, 'page.jsx'), blogPostContent);

console.log("App wrapper routes generated.");
