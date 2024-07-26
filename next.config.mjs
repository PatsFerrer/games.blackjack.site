/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    SOCKET_URL: process.env.SOCKET_URL,
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;