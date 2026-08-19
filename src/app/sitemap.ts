import type { MetadataRoute } from 'next'
import { standards, subjectDirectory, gradeTokens } from '@/lib/data'
import { codeSlug } from '@/lib/codes'
import { SITE_URL } from '@/lib/config'

/**
 * Every current standard gets a sitemap entry, per 02 Step 10.
 *
 * Historical crosswalk records are included at lower priority: they are real,
 * reachable, canonical pages, so omitting them would leave orphaned URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/standards`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/subjects`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE_URL}/grades`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/pro`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const subjectRoutes: MetadataRoute.Sitemap = subjectDirectory().map((s) => ({
    url: `${SITE_URL}/subjects/${s.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const gradeRoutes: MetadataRoute.Sitemap = ['middle', 'high', ...gradeTokens()].map((g) => ({
    url: `${SITE_URL}/grades/${encodeURIComponent(g)}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const standardRoutes: MetadataRoute.Sitemap = standards.map((s) => ({
    url: `${SITE_URL}/standards/${codeSlug(s.code)}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: s.current ? 0.8 : 0.3,
  }))

  return [...staticRoutes, ...subjectRoutes, ...gradeRoutes, ...standardRoutes]
}
