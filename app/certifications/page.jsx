import Certifications from '../../src/views/Certifications';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'Technical Certifications & Industry Credentials | Rankur',
  description: 'Verified certifications in Google Analytics 4, technical SEO, Next.js development, and performance optimization powering our B2B builds.',
  canonical: '/certifications',
});

export default function Page() {
  return <Certifications />;
}
