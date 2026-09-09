// @ts-nocheck
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return ['/proposal', '/api/proposal-preview'].map((source) => ({
      source,
      headers: [
        { key: 'Cache-Control', value: 'private, no-store' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      ],
    }));
  },
};

export default nextConfig;
