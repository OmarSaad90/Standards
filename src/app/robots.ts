import type { MetadataRoute } from 'next'
import { SITE_URL, ALLOW_INDEXING } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  // Off-domain deploys are closed to crawlers entirely, and advertise no
  // sitemap, so nothing on the temporary hostname enters an index.
  if (!ALLOW_INDEXING) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // JSON endpoints are for programmatic use, not for the index
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
