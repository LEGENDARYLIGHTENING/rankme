import ThankYou from '../../src/views/ThankYou';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'Brief Received | Rankur',
  description: 'Confirmation page for Rankur B2B website and SEO inquiry submissions.',
  canonical: '/thank-you',
  noIndex: true,
  robotsFollow: false,
});

export default function Page() {
  return <ThankYou />;
}
