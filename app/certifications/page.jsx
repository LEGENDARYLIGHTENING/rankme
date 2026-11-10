import Certifications from '../../src/views/Certifications';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'Certifications & Credentials | Rankur',
  description:
    'View verified credentials including Google Analytics 4 (GA4) certification and foundational digital marketing training.',
  canonical: '/certifications',
});

export default function Page() {
  return <Certifications />;
}
