/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost:3000/app",
        port: "",
        pathname: "/upload/**",
      },
    ],
  },
};

module.exports = nextConfig;
