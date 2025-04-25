/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  images: {
    domains: ["localhost"],
  },
  output: "standalone",
  distDir: ".next",
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
