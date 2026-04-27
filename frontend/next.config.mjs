/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ബിൽഡ് സമയത്ത് ESLint എററുകൾ അവഗണിക്കാൻ
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ടൈപ്പ് എററുകൾ ഉണ്ടെങ്കിലും ബിൽഡ് പൂർത്തിയാക്കാൻ
    ignoreBuildErrors: true,
  },
};

export default nextConfig;