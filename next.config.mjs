/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    API: process.env.API,
  },
};

export default nextConfig;
