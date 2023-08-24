/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

  
const nextConfig = module.exports = withBundleAnalyzer({
//   i18n: {
//     locales: ["en"],
//     defaultLocale: "en",
//   },
  images: {
    remotePatterns: [
      {
        hostname: "phztnztrdvdbziposzlf.supabase.co",
      },
    ],
  },
})

module.exports = nextConfig;
