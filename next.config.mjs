/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx";
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
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

export default withMDX()(nextConfig);
