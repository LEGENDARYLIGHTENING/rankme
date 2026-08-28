/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Collapse every region-scoped sub-route into its single global page.
      // These previously generated ~960 byte-identical duplicate pages.
      { source: '/:region/contact', destination: '/contact', permanent: true },
      { source: '/:region/services', destination: '/services', permanent: true },
      { source: '/:region/about', destination: '/about', permanent: true },
      { source: '/:region/blog', destination: '/blog', permanent: true },
      { source: '/:region/case-studies', destination: '/case-studies', permanent: true },
      { source: '/:region/certifications', destination: '/certifications', permanent: true },
      { source: '/:region/philosophy', destination: '/philosophy', permanent: true },
      { source: '/:region/process', destination: '/process', permanent: true },
      { source: '/:region/free-audit', destination: '/free-audit', permanent: true },
      { source: '/:region/thank-you', destination: '/thank-you', permanent: true },
      // Redirect duplicate slug pairs to canonical US / Country slugs
      { source: '/miami', destination: '/miami-us', permanent: true },
      { source: '/dallas', destination: '/dallas-us', permanent: true },
      { source: '/houston', destination: '/houston-us', permanent: true },
      { source: '/philadelphia', destination: '/philadelphia-us', permanent: true },
      { source: '/atlanta', destination: '/atlanta-us', permanent: true },
      { source: '/washington', destination: '/washington-us', permanent: true },
      { source: '/boston', destination: '/boston-us', permanent: true },
      { source: '/phoenix', destination: '/phoenix-us', permanent: true },
      { source: '/seattle', destination: '/seattle-us', permanent: true },
      { source: '/detroit', destination: '/detroit-us', permanent: true },
      { source: '/austin', destination: '/austin-us', permanent: true },
      { source: '/columbus', destination: '/columbus-us', permanent: true },
      { source: '/charlotte', destination: '/charlotte-us', permanent: true },
      { source: '/nashville', destination: '/nashville-us', permanent: true },
      { source: '/portland', destination: '/portland-us', permanent: true },
      { source: '/denver', destination: '/denver-us', permanent: true },
      { source: '/raleigh', destination: '/raleigh-us', permanent: true },
      { source: '/minneapolis', destination: '/minneapolis-us', permanent: true },
      { source: '/pittsburgh', destination: '/pittsburgh-us', permanent: true },
      { source: '/san-francisco', destination: '/san-francisco-us', permanent: true },
      { source: '/montreal', destination: '/montreal-canada', permanent: true },
      { source: '/birmingham', destination: '/birmingham-uk', permanent: true },
      { source: '/riyadh', destination: '/riyadh-saudi-arabia', permanent: true },
      { source: '/st-paul', destination: '/st-paul-us', permanent: true },
      { source: '/saint-paul', destination: '/st-paul-us', permanent: true },
    ];
  },
};

export default nextConfig;

