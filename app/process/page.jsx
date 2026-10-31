import Process from '../../src/views/Process';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'Our 7-14 Day Next.js Sprint Process | Rankur',
  description: 'From discovery and positioning to custom Next.js engineering, technical SEO, and conversion tracking — our rapid delivery process.',
  canonical: '/process',
});

export default function Page() {
  return <Process />;
}
