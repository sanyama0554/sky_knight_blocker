import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@packages/shared'] = path.resolve(
      __dirname,
      '../../packages/shared/index.ts',
    );
    return config;
  },
  /* config options here */
};

export default nextConfig;
