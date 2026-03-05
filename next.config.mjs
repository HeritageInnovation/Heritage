/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    // Exclude problematic Sui module that causes build errors
    config.externals = config.externals || [];
    config.externals.push({
      '@mysten/dapp-kit': 'commonjs @mysten/dapp-kit',
      '@mysten/sui': 'commonjs @mysten/sui',
    });
    
    return config;
  },
  turbopack: {},
}

export default nextConfig
