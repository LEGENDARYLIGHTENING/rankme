import About from '../../src/views/About';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'About Moksh Parjapati | Founder-Led B2B Systems | Rankur',
  description:
    'Meet Moksh Parjapati, founder of Rankur. Direct engineering velocity, zero junior intermediaries, and 100% code ownership for B2B leaders.',
  canonical: '/about',
});

export default function Page() {
  return <About />;
}
