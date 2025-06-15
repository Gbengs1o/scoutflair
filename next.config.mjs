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
      // --- New entry for the update images ---
      {
        protocol: "https",
        hostname: "mediumslateblue-salamander-253615.hostingersite.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  staticPageGenerationTimeout: 300,

  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  
};

export default nextConfig;