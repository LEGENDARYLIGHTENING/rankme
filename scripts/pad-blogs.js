import fs from 'fs';
import path from 'path';

const blogsDir = path.join(process.cwd(), 'blogs');
const files = fs.readdirSync(blogsDir).filter(f => /^blog_1[45679]\.md$|^blog_20\.md$/.test(f));

const padding = `
## The Executive Mandate: Speed and Trust

Beyond the technical code, your digital architecture must ultimately serve the psychology of the enterprise buyer. Procurement directors are risk-averse. They are not looking for the cheapest vendor; they are looking for the vendor who is least likely to get them fired. 

This means your website must project extreme operational stability. 
If your site takes four seconds to load, features broken images, or relies on generic stock photography, the buyer subconsciously associates that digital negligence with operational incompetence. Conversely, a sub-second load time, paired with hyper-dense factual data and immediately verifiable compliance badges, builds instantaneous trust. The buyer assumes that if you engineer your digital presence with such rigor, your actual service delivery must be equally meticulous. 

This psychological advantage is what ultimately converts traffic into pipeline.
`;

files.forEach(file => {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find the last H2 heading to insert before it
  const lines = content.split('\n');
  let lastH2Index = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('## ')) {
      lastH2Index = i;
      break;
    }
  }

  if (lastH2Index !== -1 && !content.includes('The Executive Mandate: Speed and Trust')) {
    lines.splice(lastH2Index, 0, padding);
    fs.writeFileSync(filePath, lines.join('\n'));
  }
});
