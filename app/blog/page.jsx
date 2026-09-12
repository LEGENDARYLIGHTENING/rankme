import Blog from '../../src/views/Blog';

export const metadata = {
  title: 'B2B Growth & Technical SEO Blog | Rankur',
  description: 'Actionable strategies, frameworks, and engineering playbooks on B2B web design, technical SEO, Generative Engine Optimization (GEO), and conversion optimization.',
  alternates: {
    canonical: 'https://rankursite.com/blog',
  },
};

export default function Page() {
  return <Blog />;
}
