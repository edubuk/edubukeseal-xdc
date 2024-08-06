/** @type {import('next').NextConfig} */
import env from "@beam-australia/react-env";

const contract_address = process.env.CONTRACT_ADDRESS || env("CONTRACT_ADDRESS");
const api = process.env.API || env("API");

const nextConfig = {
  env: {
    CONTRACT_ADDRESS: contract_address,
    API: api,
  },
  images: {
    loader: 'default',
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;