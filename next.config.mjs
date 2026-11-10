import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const legacyRedirects = require('./src/data/legacyRedirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
    staticGenerationRetryCount: 3,
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
