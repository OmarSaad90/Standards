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

export const DEFAULT_DESCRIPTION =
  'Governed New Jersey Grades 6\u201312 standards with public learning-context signals.'

export const PAGE_SIZE_DEFAULT = 18
export const PAGE_SIZE_MAX = 100
