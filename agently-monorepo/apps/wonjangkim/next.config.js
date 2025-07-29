/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@agently/ui',
    '@agently/shared',
    '@agently/hooks',
    '@agently/utils',
    '@agently/types'
  ],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig