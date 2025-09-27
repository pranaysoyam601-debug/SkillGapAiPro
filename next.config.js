/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  httpAgentOptions: {
    timeout: 60000,
  },
};

module.exports = nextConfig;
