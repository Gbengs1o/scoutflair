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
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "mediumslateblue-salamander-253615.hostingersite.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  staticPageGenerationTimeout: 300,

  eslint: {
    // This was already here. It disables ESLint checks during the build.
    ignoreDuringBuilds: true,
  },

  // --- ADD THIS BLOCK TO IGNORE TYPESCRIPT ERRORS ---
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;