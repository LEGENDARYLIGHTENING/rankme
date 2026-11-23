import Home from '../src/views/Home';
import { constructMetadata } from '../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Lead Generation & High-Speed Web Platforms | Rankur',
  description:
    'High-converting B2B web systems engineered to capture organic search demand, accelerate pipeline, and eliminate lead leakage. 100% code ownership.',
  canonical: 'https://rankursite.com',
});

export default function Page() {
  return <Home />;
}
