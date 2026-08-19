import Link from 'next/link'
import { meta } from '@/lib/data'
import { SearchPanel } from '@/components/SearchPanel'

/** Real 404 response, required by 02 Step 10 and the QA checklist. */
export default function NotFound() {
  return (
    <div className="screen">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>That standard is not in the public index.</h1>
        <p className="lead">
          The code may be historical, may belong to a framework outside Grades 6&ndash;12, or may
          simply be mistyped. Search the {meta.total_count.toLocaleString()} indexed records below,
          or browse by <Link href="/subjects">subject</Link> or{' '}
          <Link href="/grades">grade</Link>.
        </p>
        <div style={{ maxWidth: 520, marginTop: 34 }}>
          <SearchPanel areas={meta.areas} status="all" />
        </div>
      </div>
    </div>
  )
}
