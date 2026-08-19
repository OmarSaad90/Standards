import type { PublicStandard, StatusFilter, Band } from './types'
import { matchesBand } from './slugs'
import { foldDashes } from './codes'
import { standards } from './data'
import { PAGE_SIZE_DEFAULT, PAGE_SIZE_MAX } from './config'

/**
 * Search ranking, ported verbatim from the locked v2.8.1 prototype so public
 * result order stays identical to the artifact the client accepted.
 *
 * Weighting implements the priority order required by 04_ROUTES_AND_PAGE_SPEC.md:
 * exact code, code prefix, title/label, Aedifica View keywords, domain/topic.
 */
function normalize(s: unknown): string {
  // foldDashes added on top of the prototype's normaliser; see lib/codes.ts for
  // why, and for the 485 records it fixes.
  return foldDashes(String(s ?? ''))
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9.\- ]/g, ' ')
}

export function score(s: PublicStandard, q: string): number {
  if (!q) return 1
  const nq = normalize(q)
  const code = normalize(s.code)
  const label = normalize(s.label)
  const view = normalize(s.aedifica_view)
  const domain = normalize(s.domain)

  let x = 0
  if (code === nq) x += 100
  if (code.startsWith(nq)) x += 45
  if (code.includes(nq)) x += 25
  if (label.includes(nq)) x += 18
  if (view.includes(nq)) x += 12
  if (domain.includes(nq)) x += 10
  for (const t of nq.split(/\s+/).filter(Boolean)) {
    if (code.includes(t)) x += 8
    if (label.includes(t)) x += 4
    if (view.includes(t)) x += 2
    if (domain.includes(t)) x += 2
  }
  return x
}

export interface Query {
  q: string
  subject: string
  band: Band | ''
  grade: string
  status: StatusFilter
  page: number
  pageSize: number
}

export interface QueryResult {
  items: PublicStandard[]
  total: number
  page: number
  pageSize: number
  pages: number
}

export function runQuery(query: Query, pool: PublicStandard[] = standards): QueryResult {
  const q = query.q.trim()

  const scored: [PublicStandard, number][] = []
  for (const s of pool) {
    const sc = score(s, q)
    if (sc <= 0) continue
    if (query.subject && s.area_name !== query.subject) continue
    if (!matchesBand(s, query.band)) continue
    if (query.grade && !(s.grades ?? []).includes(query.grade)) continue
    if (query.status !== 'all') {
      if (query.status === 'current' ? !s.current : s.current) continue
    }
    scored.push([s, sc])
  }

  scored.sort((a, b) => b[1] - a[1] || a[0].code.localeCompare(b[0].code))

  const all = scored.map(([s]) => s)
  const pageSize = Math.min(Math.max(1, query.pageSize), PAGE_SIZE_MAX)
  const pages = Math.max(1, Math.ceil(all.length / pageSize))
  const page = Math.min(Math.max(1, query.page), pages)

  return {
    items: all.slice((page - 1) * pageSize, page * pageSize),
    total: all.length,
    page,
    pageSize,
    pages,
  }
}

export const STATUS_VALUES: StatusFilter[] = ['current', 'historical', 'all']

export function isStatus(v: string): v is StatusFilter {
  return (STATUS_VALUES as string[]).includes(v)
}

/** Lenient parser for page routes: bad values fall back to defaults, never throw. */
export function parseQueryLenient(sp: Record<string, string | string[] | undefined>): Query {
  const one = (k: string) => {
    const v = sp[k]
    return Array.isArray(v) ? (v[0] ?? '') : (v ?? '')
  }
  const status = one('status')
  const band = one('band')
  const pageRaw = Number.parseInt(one('page'), 10)
  const sizeRaw = Number.parseInt(one('page_size'), 10)

  return {
    q: one('q'),
    subject: one('subject'),
    band: band === 'middle' || band === 'high' ? band : '',
    grade: one('grade'),
    status: isStatus(status) ? status : 'current',
    page: Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1,
    pageSize:
      Number.isFinite(sizeRaw) && sizeRaw > 0 ? Math.min(sizeRaw, PAGE_SIZE_MAX) : PAGE_SIZE_DEFAULT,
  }
}
