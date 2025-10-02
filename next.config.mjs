/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // These modules don't exist in the browser
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
