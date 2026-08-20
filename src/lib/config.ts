/** Single source of truth for deployment-level constants. */

export const SITE_NAME = 'Aedifica Standards Explorer'
export const PRODUCT_LABEL = 'Standards Explorer'
export const RELEASE_VERSION = '1.0.0'
export const DATA_VERSION = '2.8.1'

/**
 * Set NEXT_PUBLIC_SITE_URL in the Netlify environment once the domain exists.
 * Falls back to the Netlify preview origin so canonical URLs are never broken
 * placeholders during staging.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.URL as string | undefined) ??
  'http://localhost:3100'
).replace(/\/$/, '')

/**
 * Search engines are kept out until the site is on its own domain, so the
 * temporary Netlify hostname never accumulates an index that would have to be
 * migrated later. Attaching the custom domain changes SITE_URL, which flips
 * this to true on the next deploy. No manual step at switch-over.
 */
export const ALLOW_INDEXING =
  !SITE_URL.includes('netlify.app') && !SITE_URL.includes('localhost')

export const DEFAULT_DESCRIPTION =
  'Governed New Jersey Grades 6\u201312 standards with public learning-context signals.'

export const PAGE_SIZE_DEFAULT = 18
export const PAGE_SIZE_MAX = 100
