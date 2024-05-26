/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
