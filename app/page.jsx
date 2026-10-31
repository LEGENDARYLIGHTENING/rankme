import Home from '../src/views/Home';
import { constructMetadata } from '../src/utils/seo';

export const metadata = constructMetadata({
  title: 'B2B SEO Consultant & High-Speed Web Engineering | Rankur',
  description: 'I build fast, high-converting Next.js websites for B2B founders and optimize them to rank on Google and AI search engines (ChatGPT, Perplexity). Live in 7-14 days.',
  canonical: 'https://rankursite.com',
});

export default function Page() {
  return <Home />;
}
