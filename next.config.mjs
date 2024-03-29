/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'hecdn01.hemlak.com',
          port: '',
          pathname: '/mncropresize/**',
        },
      ],
    },
};
export default nextConfig;