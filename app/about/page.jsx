import About from '../../src/views/About';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'About Moksh Parjapati & Rankur | B2B Web Engineering',
  description:
    'Learn about Moksh Parjapati, the engineering-first methodology behind Rankur, and how I help B2B founders build high-speed Next.js web systems.',
  canonical: '/about',
});

export default function Page() {
  return <About />;
}
