import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  }
}

export default nextConfig;
