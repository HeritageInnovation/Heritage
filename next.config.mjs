/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@uniswap/widgets', '@uniswap/conedison'],
  webpack: (config, { isServer }) => {
    // Handle brotli and other node-specific modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        net: false,
        tls: false,
        os: false,
        url: false,
        assert: false,
        constants: false,
        util: false,
        buffer: false,
        querystring: false,
        string_decoder: false,
        timers: false,
        events: false,
        punycode: false,
        dgram: false,
        dns: false,
        domain: false,
        module: false,
        process: false,
        v8: false,
        vm: false,
      };
    }
    
    // Ignore critical dependency warnings from @uniswap/widgets
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    
    return config;
  },
}

export default nextConfig
