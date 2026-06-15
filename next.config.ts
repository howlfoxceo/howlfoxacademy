import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.howlfoxacademy.com' }],
        destination: 'https://howlfoxacademy.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  turbopack: {},
  // pdf-parse uses pdfjs-dist which has complex CJS internals with native-module
  // fallbacks. Telling Turbopack to skip bundling it and load it via Node's
  // native require at runtime avoids silent extraction failures.
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;
