import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mywedlog.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "teamspoon.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d7aw056umshyd.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3-ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "everyonesnap.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
