/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/overview",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/users",
        permanent: true,
      },
      {
        source: "/organizer",
        destination: "/organizer/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
