/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@agently/ui', '@agently/utils'],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig