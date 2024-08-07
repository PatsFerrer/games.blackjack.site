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
    NEXT_PUBLIC_SOCKET_URL: "https://blackjack-socket.azurewebsites.net/", 
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;