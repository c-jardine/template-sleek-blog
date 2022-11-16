/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // @TODO figure out why the swc minifier breaks preview mode
  swcMinify: false,

  redirects: async () => {
    return [
      // Redirects unpaginated author url to the first paginated result.
      {
        source: '/author/:slug',
        destination: '/author/:slug/1',
        permanent: true,
      },
      {
        source: '/posts',
        destination: '/posts/1',
        permanent: true,
      },
      {
        source: '/category/:slug',
        destination: '/category/:slug/1',
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: false,
  },
});
