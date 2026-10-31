import Blog from '../../src/views/Blog';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'B2B Technical SEO & Web Engineering Blog | Rankur',
  description: 'Actionable strategies, frameworks, and engineering playbooks on Next.js web performance, technical SEO, Generative Engine Optimization (GEO), and conversion optimization.',
  canonical: '/blog',
});

export default function Page() {
  return <Blog />;
}
