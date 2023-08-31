/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = (module.exports = withBundleAnalyzer({
  //   i18n: {
  //     locales: ["en"],
  //     defaultLocale: "en",
  //   },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "phztnztrdvdbziposzlf.supabase.co",
      },
    ],
  },
}));

module.exports = nextConfig;
