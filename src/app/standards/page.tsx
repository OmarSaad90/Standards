import type { Metadata } from 'next'
import { meta } from '@/lib/data'
import { parseQueryLenient, runQuery } from '@/lib/search'
import { SearchPanel } from '@/components/SearchPanel'
import { ResultList, Pager } from '@/components/Results'
import { Breadcrumb } from '@/components/SiteChrome'

type SP = Record<string, string | string[] | undefined>

export const metadata: Metadata = {
  title: 'Search standards',
  description:
    'Search and filter the governed public index of New Jersey Grades 6-12 standards by code, concept, subject, grade band, and record status.',
  alternates: { canonical: '/standards' },
}

function buildHref(sp: SP, page: number): string {
  const p = new URLSearchParams()
  for (const key of ['q', 'subject', 'band', 'grade', 'status', 'page_size'] as const) {
    const v = sp[key]
    const val = Array.isArray(v) ? v[0] : v
    if (val) p.set(key, val)
  }
  if (page > 1) p.set('page', String(page))
  const qs = p.toString()
  return qs ? `/standards?${qs}` : '/standards'
}

export default async function StandardsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const query = parseQueryLenient(sp)
  const result = runQuery(query)

  const heading = query.q
    ? `Results for “${query.q}”`
    : query.subject || 'Standards'

  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb items={[{ label: 'Standards Explorer', href: '/' }, { label: 'Results' }]} />

        <div className="resulttop">
          <div>
            <p className="eyebrow">Search results</p>
            <h1>{heading}</h1>
            <p className="small muted" aria-live="polite">
              {result.total.toLocaleString()} matching record{result.total === 1 ? '' : 's'}{' '}
              &middot; public view
            </p>
          </div>
          <span className="countbadge">{result.total.toLocaleString()} found</span>
        </div>

        <SearchPanel
          areas={meta.areas}
          q={query.q}
          subject={query.subject}
          band={query.band}
          status={query.status}
        />

        <div style={{ marginTop: 28 }}>
          <ResultList items={result.items} />
        </div>

        <Pager page={result.page} pages={result.pages} hrefFor={(p) => buildHref(sp, p)} />
      </div>
    </div>
  )
}
