import type { NextConfig } from 'next'

/**
 * NOTE: no `output: 'export'` here, unlike the marketing site.
 * The public API contract (contracts/public_api_openapi_v1_0_0.yaml) requires
 * live route handlers with query parsing and real 400 responses, which a
 * static export cannot serve.
 */
const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ]
  },
}

export default nextConfig
