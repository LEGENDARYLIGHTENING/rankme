import NichePage from '../../src/views/NichePage';
import { nicheData } from '../../src/data/nicheData';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'B2B SaaS Website Engineering & Lead Gen | React Expert',
  description: 'B2B SaaS website design and lead generation. Custom React & Next.js marketing sites optimized for demo conversions, AI search visibility, and inbound pipeline.',
  canonical: '/saas-websites',
});

export default function Page() {
  return <NichePage {...nicheData.saas.props} />;
}
