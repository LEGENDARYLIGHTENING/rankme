import Services from '../../src/views/Services';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Lead Generation & Inbound Pipeline Services | Rankur',
  description:
    'Custom B2B web systems engineered to turn organic traffic into discovery calls and RFQs. Zero monthly retainers with 100% code ownership.',
  canonical: '/services',
});

export default function Page() {
  return <Services />;
}
