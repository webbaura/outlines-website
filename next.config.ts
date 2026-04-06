import type { NextConfig } from 'next';

/**
 * Webbaura Build Rules — Next.js enforcement layer
 * Every site built by Webbaura inherits these defaults.
 * Rules: Performance, Security, SEO, CWV compliance.
 */

const securityHeaders = [
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Hard gates — never bypass
  typescript:  { ignoreBuildErrors: false },

  // Security headers on all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Content-hashed static assets — cache forever
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Public assets — 30 days with SWR
      {
        source: '/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },

  // Image optimisation — CWV: LCP + CLS
  // Components MUST pass width+height or fill to prevent CLS
  // Hero/above-fold images MUST use priority={true} for LCP
  images: {
    formats:         ['image/avif', 'image/webp'],
    deviceSizes:     [640, 750, 828, 1080, 1200, 1920],
    imageSizes:      [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
  },

  // Bundle optimisation — reduces JS parsed on load (INP)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Strip console.log in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // Smallest deployment artefact
  output: 'standalone',

  // Redirect www → apex (canonical URL hygiene)
  async redirects() {
    return [
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www\\.(?<domain>.+)' }],
        destination: 'https://:domain/:path*',
        permanent:   true,
      },
    ];
  },

  // Don't expose framework in response headers
  poweredByHeader: false,

  // Catch side effects and double-invoke issues early
  reactStrictMode: true,
};

export default nextConfig;
