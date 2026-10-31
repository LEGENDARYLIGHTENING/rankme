import Contact from '../../src/views/Contact';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'Contact Rankur | Book a B2B Strategy & Technical Call',
  description: 'Get in touch with Rankur. Schedule a direct consultation with Moksh Parjapati to discuss your B2B website build, Next.js engineering, or SEO strategy.',
  canonical: '/contact',
});

export default function Page() {
  return <Contact />;
}
