/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open-meteo.com',
      },
    ],
  },
};

export default nextConfig;
