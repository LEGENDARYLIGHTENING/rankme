import Home from '../src/views/Home';
import { constructMetadata } from '../src/components/Seo';

export const metadata = constructMetadata({
  title: 'Custom Next.js Websites & Technical SEO for B2B | Rankur',
  description:
    'We engineer high-performance Next.js web platforms, technical SEO, and generative engine optimization for B2B and mission-driven organisations. 100% code ownership.',
  canonical: 'https://rankursite.com',
});

export default function Page() {
  return <Home />;
}
