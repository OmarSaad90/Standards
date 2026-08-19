import type { NextRequest } from 'next/server'
import { meta, standards, gradeTokens } from '@/lib/data'
import { runQuery, isStatus, STATUS_VALUES } from '@/lib/search'
import { toPublicStandard, badRequest } from '@/lib/serialize'
import { PAGE_SIZE_DEFAULT, PAGE_SIZE_MAX } from '@/lib/config'
import type { Band } from '@/lib/types'

export const dynamic = 'force-dynamic'

/**
 * GET /api/public/standards
 *
 * Strict parameter validation. Unlike the page routes, which fall back to
 * defaults so a mistyped URL still renders something useful, the API returns a
 * deterministic 400, per 02 Step 4.
 */
export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams

  const q = sp.get('q') ?? ''
  const subject = sp.get('subject') ?? ''
  const grade = sp.get('grade') ?? ''
  const band = sp.get('band') ?? ''
  const statusRaw = sp.get('status') ?? 'current'
  const pageRaw = sp.get('page') ?? '1'
  const sizeRaw = sp.get('page_size') ?? String(PAGE_SIZE_DEFAULT)

  if (!isStatus(statusRaw)) {
    return badRequest('status', 'unrecognised value', STATUS_VALUES)
  }

  const knownSubjects = meta.areas.map((a) => a.name)
  if (subject && !knownSubjects.includes(subject)) {
    return badRequest('subject', 'unrecognised subject area', knownSubjects)
  }

  const knownGrades = gradeTokens()
  if (grade && !knownGrades.includes(grade)) {
    return badRequest('grade', 'unrecognised grade token', knownGrades)
  }

  if (band && band !== 'middle' && band !== 'high') {
    return badRequest('band', 'unrecognised grade band', ['middle', 'high'])
  }

  if (!/^\d+$/.test(pageRaw) || Number(pageRaw) < 1) {
    return badRequest('page', 'must be an integer of 1 or greater')
  }

  if (!/^\d+$/.test(sizeRaw)) {
    return badRequest('page_size', 'must be an integer')
  }
  const pageSize = Number(sizeRaw)
  if (pageSize < 1 || pageSize > PAGE_SIZE_MAX) {
    return badRequest('page_size', `must be between 1 and ${PAGE_SIZE_MAX}`)
  }

  const result = runQuery(
    {
      q,
      subject,
      grade,
      band: band as Band | '',
      status: statusRaw,
      page: Number(pageRaw),
      pageSize,
    },
    standards,
  )

  return Response.json(
    {
      items: result.items.map(toPublicStandard),
      page: result.page,
      page_size: result.pageSize,
      total: result.total,
    },
    { headers: { 'Cache-Control': 'public, max-age=300' } },
  )
}
