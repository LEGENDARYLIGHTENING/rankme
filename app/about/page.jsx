import About from '../../src/views/About';

export const metadata = {
  title: 'About Rankur | B2B Growth & Web Engineering',
  description: 'Learn about Rankur, our engineering-first philosophy, and how we help B2B companies turn underperforming websites into high-converting revenue engines.',
  alternates: { canonical: 'https://rankursite.com/about' },
};

export default function Page() {
  return <About />;
}
