// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scoutflair.s3.eu-north-1.amazonaws.com",
        pathname: "/*/**", // This is likely fine, but '/**' is more common if it means any path
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.im.ge",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mediumslateblue-salamander-253615.hostingersite.com",
        pathname: "/wp-content/uploads/**",
      },
      // --- ADD THIS NEW PATTERN FOR VIA.PLACEHOLDER.COM ---
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**", // Allows any path on via.placeholder.com
      },
      // --- END OF NEW PATTERN ---
    ],
  },
  staticPageGenerationTimeout: 300,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;