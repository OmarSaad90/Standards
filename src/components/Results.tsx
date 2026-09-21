import Link from 'next/link'
import type { PublicStandard } from '@/lib/types'
import { codeSlug } from '@/lib/codes'

export interface ActiveFilter {
  label: string
  href: string
}

/**
 * ActiveFilterConditions, per handoffv2/05_DEVELOPER_INSTRUCTIONS/05_COMPONENT_SPEC.md.
 * Each chip removes exactly the one filter it names; callers build `href` from
 * whichever query params they already preserve across pagination.
 */
export function ActiveFilterChips({ filters }: { filters: ActiveFilter[] }) {
  if (filters.length === 0) return null
  return (
    <div className="activefilters" aria-label="Active filters">
      {filters.map((f) => (
        <Link key={f.label} href={f.href} className="filterchip">
          {f.label} <span aria-hidden="true">&times;</span>
        </Link>
      ))}
    </div>
  )
}

export function ResultRow({ s }: { s: PublicStandard }) {
  const r = s.public_relationship_buckets
  return (
    <article className="result">
      <div>
        <div className="code">{s.code}</div>
        <div className="tiny muted">
          {s.area_name} &middot; {(s.grades ?? []).join(', ')}
        </div>
      </div>
      <div>
        <div className="view">{s.aedifica_view || s.label}</div>
        <div className="tiny muted" style={{ marginTop: 8 }}>
          {s.domain ?? ''}
        </div>
      </div>
      <div className="side">
        <div className="signalsmini">
          <span className="signalmini">{r.supports} supports</span>
          <span className="signalmini">{r.reinforces} reinforces</span>
          <span className="signalmini">{r.next} next</span>
        </div>
        <Link className="openbtn" href={`/standards/${codeSlug(s.code)}`}>
          Open standard <span aria-hidden="true">&rarr;</span>
          <span className="visually-hidden">: {s.code}</span>
        </Link>
      </div>
    </article>
  )
}

export function ResultList({ items }: { items: PublicStandard[] }) {
  if (items.length === 0) {
    return (
      <div className="resultlist">
        <div className="empty">
          <h3>No standards match this search.</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            Try a standard code, a broader concept, or clear one of the filters.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="resultlist">
      {items.map((s) => (
        <ResultRow key={s.uid} s={s} />
      ))}
    </div>
  )
}

/** Pagination as real links, so crawlers can walk the result set. */
export function Pager({
  page,
  pages,
  hrefFor,
}: {
  page: number
  pages: number
  hrefFor: (page: number) => string
}) {
  const prevDisabled = page <= 1
  const nextDisabled = page >= pages
  return (
    <nav className="pager" aria-label="Pagination">
      <span className="tiny muted">
        Page {page} of {pages}
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link
          className="pillbtn"
          href={prevDisabled ? '#' : hrefFor(page - 1)}
          aria-disabled={prevDisabled}
          tabIndex={prevDisabled ? -1 : undefined}
          rel="prev"
        >
          Previous
        </Link>
        <Link
          className="pillbtn"
          href={nextDisabled ? '#' : hrefFor(page + 1)}
          aria-disabled={nextDisabled}
          tabIndex={nextDisabled ? -1 : undefined}
          rel="next"
        >
          Next
        </Link>
      </div>
    </nav>
  )
}
