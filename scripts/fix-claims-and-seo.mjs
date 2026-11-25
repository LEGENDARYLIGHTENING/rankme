import fs from 'fs';
import path from 'path';

const blogsDir = 'prototype/blogs';
const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Unattributed Stats
  content = content.replace(/AI search citations on Perplexity and ChatGPT grew by \*\*390%\*\*\./g, 
    'AI search citations on Perplexity and ChatGPT grew consistently post-launch.');
  content = content.replace(/Driven \*\*38 monthly qualified enterprise inquiries\*\* directly from AI answer engine referrals\./g,
    'Driven recurring qualified inquiries directly from AI answer engine referrals.');
  content = content.replace(/Bounce rates dropped from 82% to 29%, and qualified inbound inquiries jumped \*\*215% in the first 45 days post-launch\*\*\./g,
    'Bounce rates dropped significantly, and qualified inbound inquiries increased following the replatforming.');
  content = content.replace(/Bounce rates dropped from 82% to 29%/g,
    'Bounce rates dropped significantly');

  // 2. 15% link equity claim
  content = content.replace(/dilute link equity by up to 15% per hop/g,
    'introduce unnecessary latency and crawler hops. While Google has confirmed that 301 redirects preserve full link equity, direct single-hop redirects ensure the fastest crawl efficiency');
  content = content.replace(/diluting link equity by 15% per hop/g,
    'introducing unnecessary latency and redirect overhead');

  // 3. Crawler scans only 25 pages
  content = content.replace(/Crawler times out; scans only 25 pages per visit\./g,
    'Crawler encounters latency bottlenecks and delays discovery.');

  // 4. Crawl budget scare language
  content = content.replace(/They assign each website a strict \*\*crawl budget\*\* based on server responsiveness, page rendering speed, and domain authority\./g,
    'While small to medium websites are rarely constrained by crawl budget limits, search crawlers still prioritize fast, clean architectures with low server latency.');

  // 5. FAQ rich results claims (accurate wording: Google limited FAQ rich results in 2023)
  content = content.replace(/securing high-visibility rich snippet accordions on search results pages\./g,
    'providing machine-readable structure. While Google limited FAQ rich results in 2023, the markup may help machines parse Q&A content cleanly, though search and citation benefits are not guaranteed.');
  content = content.replace(/feeding structured Q&A data directly to generative AI engines \(ChatGPT, Perplexity\) and Google Overviews\./g,
    'noting that Google limited FAQ rich results in 2023; the markup may help machines parse Q&A content, but search and citation benefits are not guaranteed.');
  content = content.replace(/addressing critical procurement questions directly in search results\./g,
    'providing machine-readable Q&A structure, noting that Google limited FAQ rich results in 2023 and benefits are not guaranteed.');
  content = content.replace(/enabling conversational AI search engines to parse and cite verified capability answers\./g,
    'providing machine-readable structure. While Google limited FAQ rich results in 2023, the markup may help machines parse Q&A content, though benefits are not guaranteed.');
  content = content.replace(/search engines began awarding rich snippet badges, and AI engines began citing/g,
    'search engines recognized the structured data, and AI engines began citing');
  content = content.replace(/Capture rich snippets and optimize for generative AI citations\./g,
    'Structure Q&A markup cleanly. Note that Google limited FAQ rich results in 2023; the markup may help machines parse Q&A, but benefits are not guaranteed.');
  content = content.replace(/lost rich snippet real estate, and complete omission from AI generated answers/g,
    'lost semantic clarity, and omission from AI generated answers');
  content = content.replace(/awarding dominant rich snippets across international search queries/g,
    'awarding strong search authority across international search queries');
  content = content.replace(/awarding dominant rich snippets across international philanthropic queries/g,
    'awarding strong search authority across international philanthropic queries');

  // 6. Ensure 0 em-dashes / en-dashes
  content = content.replace(/—/g, ' - ').replace(/–/g, '-');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`Updated ${modifiedCount} blog markdown files with accurate claims and modern SEO facts.`);
