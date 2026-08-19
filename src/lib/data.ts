import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { ALLOWED_STANDARD_KEYS } from './types'
import type { PublicStandard, PublicMeta, AreaMeta } from './types'
import { subjectSlug, bandMembership } from './slugs'
import { foldCode } from './codes'

const DATA_PATH = path.join(process.cwd(), 'data', 'public_data_v2_8_1_locked.json')

interface RawPayload {
  meta: PublicMeta & Record<string, unknown>
  standards: unknown[]
}

/**
 * Strict intake. Any key not on the approved public list is a hard failure,
 * per 06_SECURITY_BOUNDARY.md: protected data must never reach the browser at
 * all, rather than reaching it and being hidden by UI logic.
 */
function assertPublicShape(raw: unknown, index: number): PublicStandard {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error(`standards[${index}] is not an object`)
  }
  const extras = Object.keys(raw).filter((k) => !ALLOWED_STANDARD_KEYS.has(k))
  if (extras.length > 0) {
    throw new Error(
      `standards[${index}] carries non-public field(s): ${extras.join(', ')}. ` +
        `Refusing to load. See 06_SECURITY_BOUNDARY.md.`,
    )
  }
  return raw as PublicStandard
}

function load() {
  const buf = fs.readFileSync(DATA_PATH)
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex')
  const payload = JSON.parse(buf.toString('utf8')) as RawPayload

  const standards = payload.standards.map(assertPublicShape)

  const meta: PublicMeta = {
    version: payload.meta.version,
    total_count: payload.meta.total_count,
    current_count: payload.meta.current_count,
    areas: payload.meta.areas as AreaMeta[],
    public_contract: payload.meta.public_contract,
  }

  const byCode = new Map<string, PublicStandard>()
  const bySubjectSlug = new Map<string, PublicStandard[]>()
  const byGradeToken = new Map<string, PublicStandard[]>()
  const areaNameBySlug = new Map<string, string>()

  for (const s of standards) {
    byCode.set(foldCode(s.code), s)

    const slug = subjectSlug(s.area_name)
    areaNameBySlug.set(slug, s.area_name)
    // short area code kept as an alias so /subjects/math also resolves
    areaNameBySlug.set(s.area.toLowerCase(), s.area_name)
    if (!bySubjectSlug.has(slug)) bySubjectSlug.set(slug, [])
    bySubjectSlug.get(slug)!.push(s)

    for (const g of s.grades ?? []) {
      const key = g.trim()
      if (!byGradeToken.has(key)) byGradeToken.set(key, [])
      byGradeToken.get(key)!.push(s)
    }
  }

  const bands = { middle: [] as PublicStandard[], high: [] as PublicStandard[] }
  for (const s of standards) {
    const b = bandMembership(s)
    if (b.middle) bands.middle.push(s)
    if (b.high) bands.high.push(s)
  }

  return { meta, standards, byCode, bySubjectSlug, byGradeToken, areaNameBySlug, bands, sha256 }
}

/** Loaded once per server process. */
const DB = load()

export const meta = DB.meta
export const standards = DB.standards
export const dataSha256 = DB.sha256
export const bands = DB.bands

/** Resolves both the stored form and the ASCII-hyphen form. See lib/codes.ts. */
export function getByCode(code: string): PublicStandard | undefined {
  return DB.byCode.get(foldCode(code))
}

export function resolveSubject(slug: string): { slug: string; name: string } | undefined {
  const name = DB.areaNameBySlug.get(String(slug).toLowerCase())
  if (!name) return undefined
  return { slug: subjectSlug(name), name }
}

export function standardsInSubject(slug: string): PublicStandard[] {
  const resolved = resolveSubject(slug)
  if (!resolved) return []
  return DB.bySubjectSlug.get(resolved.slug) ?? []
}

export function gradeTokens(): string[] {
  return [...DB.byGradeToken.keys()].sort((a, b) => {
    const na = Number(a.split('-')[0])
    const nb = Number(b.split('-')[0])
    return na - nb || a.localeCompare(b)
  })
}

export function standardsInGradeToken(token: string): PublicStandard[] {
  return DB.byGradeToken.get(token) ?? []
}

export function subjectDirectory(): { slug: string; name: string; total: number; current: number }[] {
  return meta.areas.map((a) => {
    const slug = subjectSlug(a.name)
    const rows = DB.bySubjectSlug.get(slug) ?? []
    return {
      slug,
      name: a.name,
      total: rows.length,
      // a.count is the current-record count, which is what the tiles show
      current: a.count,
    }
  })
}
