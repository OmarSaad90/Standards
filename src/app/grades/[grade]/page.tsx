import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { bands, gradeTokens, standardsInGradeToken } from '@/lib/data'
import { gradeLabel, isBandSlug } from '@/lib/slugs'
import { parseQueryLenient, runQuery } from '@/lib/search'
import { ResultList, Pager } from '@/components/Results'
import { Breadcrumb } from '@/components/SiteChrome'

type SP = Record<string, string | string[] | undefined>

export function generateStaticParams() {
  return [...['middle', 'high'], ...gradeTokens()].map((grade) => ({ grade }))
}

function poolFor(slug: string) {
  if (isBandSlug(slug)) return bands[slug]
  const rows = standardsInGradeToken(slug)
  return rows.length > 0 ? rows : null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ grade: string }>
}): Promise<Metadata> {
  const { grade } = await params
  const slug = decodeURIComponent(grade)
  const pool = poolFor(slug)
  if (!pool) return { title: 'Grade not found' }

  return {
    title: gradeLabel(slug),
    description: `New Jersey standards for ${gradeLabel(slug)}, with authoritative sources, Aedifica View, and aggregate learning-context signals.`,
    alternates: { canonical: `/grades/${encodeURIComponent(slug)}` },
  }
}

export default async function GradePage({
  params,
  searchParams,
}: {
  params: Promise<{ grade: string }>
  searchParams: Promise<SP>
}) {
  const { grade } = await params
  const sp = await searchParams
  const slug = decodeURIComponent(grade)
  const pool = poolFor(slug)
  if (!pool) notFound()

  const query = parseQueryLenient(sp)
  const result = runQuery({ ...query, band: '', grade: '' }, pool)

  const hrefFor = (page: number) => {
    const p = new URLSearchParams()
    if (query.status !== 'current') p.set('status', query.status)
    if (query.subject) p.set('subject', query.subject)
    if (page > 1) p.set('page', String(page))
    const qs = p.toString()
    const base = `/grades/${encodeURIComponent(slug)}`
    return qs ? `${base}?${qs}` : base
  }

  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb
          items={[
            { label: 'Explorer', href: '/' },
            { label: 'Grades', href: '/grades' },
            { label: gradeLabel(slug) },
          ]}
        />

        <div className="resulttop">
          <div>
            <p className="eyebrow">{isBandSlug(slug) ? 'Grade band' : 'Grade'}</p>
            <h1>{gradeLabel(slug)}</h1>
            <p className="small muted" aria-live="polite">
              {result.total.toLocaleString()} record{result.total === 1 ? '' : 's'} &middot; public
              view
            </p>
          </div>
          <span className="countbadge">{result.total.toLocaleString()} found</span>
        </div>

        <ResultList items={result.items} />
        <Pager page={result.page} pages={result.pages} hrefFor={hrefFor} />
      </div>
    </div>
  )
}
