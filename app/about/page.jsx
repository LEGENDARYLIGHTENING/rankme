import About from '../../src/views/About';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'About Moksh Parjapati & Rankur | B2B Web Engineering & SEO',
  description: 'Learn about Rankur, our engineering-first philosophy, and how we help B2B founders turn slow websites into high-converting revenue engines.',
  canonical: '/about',
});

export default function Page() {
  return <About />;
}
