/** @type {import('next').NextConfig} */
const usCities = [
  'atlanta', 'miami', 'portland', 'minneapolis', 'detroit', 'raleigh', 'charlotte',
  'nashville', 'columbus', 'san-jose', 'jacksonville', 'fort-worth', 'indianapolis',
  'oklahoma-city', 'el-paso', 'las-vegas', 'memphis', 'louisville', 'baltimore',
  'milwaukee', 'albuquerque', 'tucson', 'fresno', 'sacramento', 'kansas-city',
  'mesa', 'omaha', 'colorado-springs', 'long-beach', 'virginia-beach', 'oakland',
  'tulsa', 'bakersfield', 'wichita', 'arlington', 'aurora', 'tampa', 'new-orleans',
  'cleveland', 'honolulu', 'anaheim', 'lexington', 'stockton', 'corpus-christi',
  'henderson', 'riverside', 'newark', 'cincinnati', 'irvine', 'orlando', 'greensboro',
  'jersey-city', 'lincoln', 'plano', 'durham', 'buffalo', 'chandler', 'chula-vista',
  'toledo', 'madison', 'gilbert', 'reno', 'fort-wayne', 'north-las-vegas',
  'st-petersburg', 'lubbock', 'garland', 'laredo', 'irving', 'chesapeake',
  'glendale', 'winston-salem', 'scottsdale', 'fremont', 'richmond', 'boise',
  'baton-rouge', 'des-moines', 'spokane', 'san-bernardino', 'san-antonio',
  'st-paul', 'saint-paul', 'hialeah', 'rochester', 'fayetteville', 'austin',
  'dallas', 'houston', 'chicago', 'new-york', 'los-angeles', 'san-francisco',
  'seattle', 'boston', 'denver', 'philadelphia', 'phoenix', 'san-diego'
];

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const cityRedirects = [];

    // Redirect all US city aliases and city slugs directly to the authoritative USA Country Hub
    usCities.forEach(city => {
      cityRedirects.push({ source: `/${city}`, destination: '/usa', permanent: true });
      cityRedirects.push({ source: `/${city}-us`, destination: '/usa', permanent: true });
    });

    return [
      // Legacy homepage alias redirect
      { source: '/home', destination: '/', permanent: true },

      // Eliminate programmatic blog-in-city doorway pages permanently
      { source: '/blog/:slug/in/:region*', destination: '/blog/:slug', permanent: true },

      // Collapse all region-scoped core sub-routes into single canonical pages
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

      // Collapse all matrix city-service combinations to canonical /services
      { source: '/:region((?!blog|api|_next).*)/:service', destination: '/services', permanent: true },

      // International city hubs -> authoritative national country silos
      { source: '/hamburg', destination: '/germany', permanent: true },
      { source: '/frankfurt', destination: '/germany', permanent: true },
      { source: '/berlin', destination: '/germany', permanent: true },
      { source: '/munich', destination: '/germany', permanent: true },
      { source: '/amsterdam', destination: '/germany', permanent: true },
      { source: '/brussels', destination: '/uk', permanent: true },
      { source: '/london', destination: '/uk', permanent: true },
      { source: '/manchester', destination: '/uk', permanent: true },
      { source: '/belfast', destination: '/uk', permanent: true },
      { source: '/belfast-uk', destination: '/uk', permanent: true },
      { source: '/bristol', destination: '/uk', permanent: true },
      { source: '/bristol-uk', destination: '/uk', permanent: true },
      { source: '/cairo', destination: '/uae', permanent: true },
      { source: '/istanbul', destination: '/uae', permanent: true },
      { source: '/dubai', destination: '/uae', permanent: true },
      { source: '/dubai-uae', destination: '/uae', permanent: true },
      { source: '/abu-dhabi', destination: '/uae', permanent: true },
      { source: '/riyadh', destination: '/saudi-arabia', permanent: true },
      { source: '/jeddah', destination: '/saudi-arabia', permanent: true },
      { source: '/toronto', destination: '/canada', permanent: true },
      { source: '/toronto-canada', destination: '/canada', permanent: true },
      { source: '/montreal', destination: '/canada', permanent: true },
      { source: '/montreal-canada', destination: '/canada', permanent: true },
      { source: '/calgary', destination: '/canada', permanent: true },
      { source: '/calgary-canada', destination: '/canada', permanent: true },
      { source: '/sydney', destination: '/australia', permanent: true },
      { source: '/melbourne', destination: '/australia', permanent: true },
      { source: '/brisbane', destination: '/australia', permanent: true },
      { source: '/canberra', destination: '/australia', permanent: true },
      { source: '/adelaide', destination: '/australia', permanent: true },
      { source: '/bangalore', destination: '/singapore', permanent: true },
      { source: '/delhi', destination: '/singapore', permanent: true },
      { source: '/bangkok', destination: '/singapore', permanent: true },
      { source: '/dhaka', destination: '/locations', permanent: true },
      { source: '/lagos', destination: '/uk', permanent: true },

      // Generated US city redirects
      ...cityRedirects,
    ];
  },
};

export default nextConfig;
