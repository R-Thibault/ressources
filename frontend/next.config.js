/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "localhost",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
