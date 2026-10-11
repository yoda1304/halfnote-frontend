import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ["@halfnote/data", "@halfnote/ui"],
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, "react-native$": "react-native-web" };
    config.resolve.extensions = [".web.tsx", ".web.ts", ".web.js", ...config.resolve.extensions];
    return config;
  },
  // Django paths end in "/"; keep them verbatim through the /api/halfnote proxy.
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.discogs.com',
      },
      {
        protocol: 'https',
        hostname: 'st.discogs.com',
      },
    ],
  },
};

export default nextConfig;
