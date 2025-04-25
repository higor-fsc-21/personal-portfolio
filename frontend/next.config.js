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
  poweredByHeader: false,
  generateBuildId: async () => {
    return "build";
  },
};

module.exports = nextConfig;
