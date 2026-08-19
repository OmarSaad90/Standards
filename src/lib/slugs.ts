import type { PublicStandard, Band } from './types'

/** "Career Readiness, Life Literacies & Key Skills" -> "career-readiness-life-literacies-key-skills" */
export function subjectSlug(areaName: string): string {
  return areaName
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Grade band membership, ported verbatim from the locked v2.8.1 prototype.
 * A record can belong to BOTH bands; 45 records in the dataset do.
 * Set-membership, not string equality, is what the acceptance audit checks.
 */
export function bandMembership(s: PublicStandard): { middle: boolean; high: boolean } {
  const out = { middle: false, high: false }
  for (const raw of s.grades ?? []) {
    const g = String(raw).trim()
    if (g === '6-8') out.middle = true
    if (g === '9-12') out.high = true
    for (const n of (g.match(/\d+/g) ?? []).map(Number)) {
      if (n >= 6 && n <= 8) out.middle = true
      if (n >= 9 && n <= 12) out.high = true
    }
  }
  return out
}

export function matchesBand(s: PublicStandard, band: Band | '' | null | undefined): boolean {
  if (!band) return true
  const b = bandMembership(s)
  return band === 'middle' ? b.middle : b.high
}

/** The two named bands plus every literal grade token present in the data. */
export const BAND_SLUGS = ['middle', 'high'] as const

export const BAND_LABEL: Record<Band, string> = {
  middle: 'Grades 6\u20138',
  high: 'Grades 9\u201312',
}

/** "6-8" and "9-10" are already URL-safe; kept literal so URLs read naturally. */
export function gradeSlug(grade: string): string {
  return grade.trim()
}

export function isBandSlug(v: string): v is Band {
  return v === 'middle' || v === 'high'
}

export function gradeLabel(slug: string): string {
  if (isBandSlug(slug)) return BAND_LABEL[slug]
  return slug.includes('-') ? `Grades ${slug.replace('-', '\u2013')}` : `Grade ${slug}`
}
