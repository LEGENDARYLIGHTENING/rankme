import Home from '../src/views/Home';
import { constructMetadata } from '../src/components/Seo';

export const metadata = constructMetadata({
  title: 'Enterprise B2B Web Engineering & Search Systems | Rankur',
  description:
    'Sub-second Next.js web systems and deterministic search architecture for B2B operators. Milestone delivery with 100% source code ownership.',
  canonical: 'https://rankursite.com',
});

export default function Page() {
  return <Home />;
}
