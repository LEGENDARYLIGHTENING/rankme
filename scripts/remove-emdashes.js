import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      // skip node_modules and .next and .git
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.md') || f.endsWith('.json') || f.endsWith('.txt')) {
        callback(path.join(dir, f));
      }
    }
  });
}

let changedFiles = 0;

walkDir(process.cwd(), function(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Replace em dash (-) and en dash (-) with a standard hyphen (-)
  if (content.includes('-') || content.includes('-')) {
    const newContent = content.replace(/-/g, '-').replace(/-/g, '-');
    fs.writeFileSync(filePath, newContent, 'utf-8');
    changedFiles++;
  }
});

console.log(`Successfully removed em dashes from ${changedFiles} files.`);
