/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail8.coupangcdn.com',
      },
    ],
  },
};

module.exports = nextConfig;
