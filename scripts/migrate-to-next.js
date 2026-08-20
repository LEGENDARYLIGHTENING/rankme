import fs from 'fs';
import path from 'path';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Replace react-router-dom Link with next/link
      content = content.replace(/import\s+{([^}]*?Link[^}]*?)}\s+from\s+['"]react-router-dom['"];?/g, (match, p1) => {
        if (p1.includes('useLocation') || p1.includes('NavLink') || p1.includes('useParams')) {
           return `import Link from 'next/link';\nimport { usePathname, useParams } from 'next/navigation';`;
        }
        return `import Link from 'next/link';`;
      });
      content = content.replace(/import\s+{([^}]*?useLocation[^}]*?)}\s+from\s+['"]react-router-dom['"];?/g, `import { usePathname } from 'next/navigation';`);
      content = content.replace(/import\s+{([^}]*?useParams[^}]*?)}\s+from\s+['"]react-router-dom['"];?/g, `import { useParams } from 'next/navigation';`);

      // Catch any remaining react-router-dom imports and replace with next/link if it contains Link
      if (content.includes('react-router-dom')) {
         content = content.replace(/import\s+.*?\s+from\s+['"]react-router-dom['"];?/g, `import Link from 'next/link';\nimport { usePathname, useParams } from 'next/navigation';`);
      }

      // 2. Replace <Link to= with <Link href=
      content = content.replace(/<Link\s+([^>]*?)to=/g, '<Link $1href=');
      content = content.replace(/<NavLink\s+([^>]*?)to=/g, '<Link $1href=');
      content = content.replace(/<\/NavLink>/g, '</Link>');

      // 3. Remove Helmet
      content = content.replace(/import\s+{?\s*Helmet\s*}?\s*from\s+['"]react-helmet-async['"];?/g, '');
      content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');

      // 4. useLocation -> usePathname mapping hack for templates that just have it defined
      content = content.replace(/useLocation\(\)/g, 'usePathname()');
      content = content.replace(/location\.pathname/g, 'pathname');

      fs.writeFileSync(fullPath, content);
    }
  });
}

const srcDir = path.join(process.cwd(), 'src');
processDirectory(srcDir);
console.log("Migration script complete: Replaced router & helmet in src/");
