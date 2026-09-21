import Link from 'next/link'
import type { Metadata } from 'next'
import { meta, subjectDirectory } from '@/lib/data'
import { Breadcrumb } from '@/components/SiteChrome'

export const metadata: Metadata = {
  title: 'Subjects',
  description:
    'Browse the nine New Jersey subject areas covered by the Aedifica Standards Explorer, with current standard counts for each.',
  alternates: { canonical: '/standards/subject' },
}

export default function SubjectsPage() {
  const subjects = subjectDirectory()

  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb items={[{ label: 'Explorer', href: '/' }, { label: 'Subjects' }]} />

        <p className="eyebrow">Subject directory</p>
        <h1>Every subject area in the index.</h1>
        <p className="lead">
          {meta.current_count.toLocaleString()} current standards across {meta.areas.length} subject
          areas. Counts shown are current records; historical crosswalk records are reachable
          through search.
        </p>

        <div className="dirlist">
          {subjects.map((s) => (
            <Link className="dirrow" href={`/standards/subject/${s.slug}`} key={s.slug}>
              <div>
                <h3>{s.name}</h3>
                <p className="tiny muted" style={{ marginTop: 6 }}>
                  {s.total.toLocaleString()} indexed record{s.total === 1 ? '' : 's'}
                </p>
              </div>
              <span className="countbadge">{s.current.toLocaleString()} current</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
