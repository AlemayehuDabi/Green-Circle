/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // Allow ALL images (Easiest for development)
    ],
  },
};

module.exports = nextConfig;

