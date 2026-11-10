import Contact from '../../src/views/Contact';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'Contact Rankur | Book a B2B Consultation',
  description:
    'Contact Moksh Parjapati at Rankur to discuss a custom Next.js B2B website build, technical SEO cleanup, or conversion optimization scope.',
  canonical: '/contact',
});

export default function Page() {
  return <Contact />;
}
