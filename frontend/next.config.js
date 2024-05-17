/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "4000",
    //     pathname: "upload/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
