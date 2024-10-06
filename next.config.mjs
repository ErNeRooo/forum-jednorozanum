/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9199",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "9199",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "forum-jednorozanum.web.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**",
      },
    ],
  },
};

export default nextConfig;
