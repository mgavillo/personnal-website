/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        hostname: "phztnztrdvdbziposzlf.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
