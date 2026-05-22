/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // OG images can come from any news domain — wildcard allow
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
  },
};

export default nextConfig;
