import CaseStudies from '../../src/views/CaseStudies';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'Verified B2B Case Studies & Engineering Deployments | Rankur',
  description: 'Verified production results: see how custom Next.js platforms scaled pipeline, sub-second LCP, and captured 50+ qualified B2B leads.',
  canonical: '/case-studies',
});

export default function Page() {
  return <CaseStudies />;
}
