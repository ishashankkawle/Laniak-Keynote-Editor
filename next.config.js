/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gitlab.com',
        port: '',
      }],
  },
}

module.exports = nextConfig
