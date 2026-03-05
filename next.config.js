/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'afs.edu.bh',
      },
    ],
  },
}

module.exports = nextConfig