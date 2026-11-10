import Home from '../src/views/Home';
import { constructMetadata } from '../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B SEO Consultant & High-Speed Web Engineering | Rankur',
  description:
    'I build fast, custom Next.js websites for B2B founders and structure them for Google search, AI answer visibility, and qualified pipeline leads.',
  canonical: 'https://rankursite.com',
});

export default function Page() {
  return <Home />;
}
