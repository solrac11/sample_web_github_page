// next.config.ts
import { config } from './config/csp'
import { redirects } from './config/redirects'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_URL?.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_SERVER_URL ? 
          process.env.NEXT_PUBLIC_SERVER_URL.replace(/https?:\/\//, '') : '',
      }
    ].filter(pattern => pattern.hostname),
  },
  redirects,
  async headers() {
    const headers = []

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }

    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: config.ContentSecurityPolicy,
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    })

    return headers
  },
}

export default nextConfig