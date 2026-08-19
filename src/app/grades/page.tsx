import Link from 'next/link'
import type { Metadata } from 'next'
import { bands, gradeTokens, standardsInGradeToken } from '@/lib/data'
import { BAND_LABEL, gradeLabel } from '@/lib/slugs'
import { Breadcrumb } from '@/components/SiteChrome'

export const metadata: Metadata = {
  title: 'Grades',
  description:
    'Browse New Jersey Grades 6-12 standards by grade band or by individual grade level, across all nine subject areas.',
  alternates: { canonical: '/grades' },
}

export default function GradesPage() {
  const tokens = gradeTokens()

  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb items={[{ label: 'Explorer', href: '/' }, { label: 'Grades' }]} />

        <p className="eyebrow">Grade directory</p>
        <h1>Browse by grade band or grade.</h1>
        <p className="lead">
          Bands use set membership, so a standard spanning both bands appears under each. Individual
          grade rows below list records whose published grade label matches exactly.
        </p>

        <div className="section">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">Bands</p>
              <h2>Two governed bands.</h2>
            </div>
            <p>
              Band membership is derived from every grade token on a record, matching the locked
              v2.8.1 filter behaviour.
            </p>
          </div>
          <div className="dirlist">
            {(['middle', 'high'] as const).map((b) => (
              <Link className="dirrow" href={`/grades/${b}`} key={b}>
                <div>
                  <h3>{BAND_LABEL[b]}</h3>
                  <p className="tiny muted" style={{ marginTop: 6 }}>
                    Every record belonging to this band
                  </p>
                </div>
                <span className="countbadge">{bands[b].length.toLocaleString()} records</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">Published grade labels</p>
              <h2>Exact grade tokens.</h2>
            </div>
            <p>These are the literal grade values published on the records themselves.</p>
          </div>
          <div className="dirlist">
            {tokens.map((t) => (
              <Link className="dirrow" href={`/grades/${encodeURIComponent(t)}`} key={t}>
                <div>
                  <h3>{gradeLabel(t)}</h3>
                  <p className="tiny muted" style={{ marginTop: 6 }}>
                    Published as &ldquo;{t}&rdquo;
                  </p>
                </div>
                <span className="countbadge">
                  {standardsInGradeToken(t).length.toLocaleString()} records
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
