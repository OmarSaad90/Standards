import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { resolveSubject, standardsInSubject, subjectDirectory } from '@/lib/data'
import { parseQueryLenient, runQuery } from '@/lib/search'
import { BAND_LABEL, isBandSlug } from '@/lib/slugs'
import { ResultList, Pager, ActiveFilterChips, type ActiveFilter } from '@/components/Results'
import { Breadcrumb } from '@/components/SiteChrome'

type SP = Record<string, string | string[] | undefined>

export function generateStaticParams() {
  return subjectDirectory().map((s) => ({ subject: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>
}): Promise<Metadata> {
  const { subject } = await params
  const resolved = resolveSubject(subject)
  if (!resolved) return { title: 'Subject not found' }

  const rows = standardsInSubject(subject)
  const current = rows.filter((r) => r.current).length

  return {
    title: resolved.name,
    description: `${current.toLocaleString()} current New Jersey ${resolved.name} standards for Grades 6-12, with sources, Aedifica View, and aggregate learning-context signals.`,
    alternates: { canonical: `/standards/subject/${resolved.slug}` },
  }
}

export default async function SubjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>
  searchParams: Promise<SP>
}) {
  const { subject } = await params
  const sp = await searchParams
  const resolved = resolveSubject(subject)
  if (!resolved) notFound()

  const pool = standardsInSubject(subject)
  const query = parseQueryLenient(sp)
  const result = runQuery({ ...query, subject: '' }, pool)

  const hrefFor = (page: number, omit?: 'status' | 'band') => {
    const p = new URLSearchParams()
    if (query.status !== 'current' && omit !== 'status') p.set('status', query.status)
    if (query.band && omit !== 'band') p.set('band', query.band)
    if (page > 1) p.set('page', String(page))
    const qs = p.toString()
    return qs ? `/standards/subject/${resolved.slug}?${qs}` : `/standards/subject/${resolved.slug}`
  }

  const filters: ActiveFilter[] = []
  if (query.band && isBandSlug(query.band)) {
    filters.push({ label: BAND_LABEL[query.band], href: hrefFor(1, 'band') })
  }
  if (query.status !== 'current') {
    filters.push({
      label: query.status === 'all' ? 'Current + historical' : 'Historical only',
      href: hrefFor(1, 'status'),
    })
  }

  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb
          items={[
            { label: 'Explorer', href: '/' },
            { label: 'Subjects', href: '/standards/subject' },
            { label: resolved.name },
          ]}
        />

        <div className="resulttop">
          <div>
            <p className="eyebrow">Subject</p>
            <h1>{resolved.name}</h1>
            <p className="small muted" aria-live="polite">
              {result.total.toLocaleString()} record{result.total === 1 ? '' : 's'} &middot;{' '}
              {query.status === 'current'
                ? 'current standards'
                : query.status === 'historical'
                  ? 'historical only'
                  : 'current and historical'}
            </p>
          </div>
          <span className="countbadge">{result.total.toLocaleString()} found</span>
        </div>

        <ActiveFilterChips filters={filters} />

        <ResultList items={result.items} />
        <Pager page={result.page} pages={result.pages} hrefFor={hrefFor} />
      </div>
    </div>
  )
}
