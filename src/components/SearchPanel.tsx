import Link from 'next/link'
import type { AreaMeta } from '@/lib/types'

/**
 * Plain GET form, deliberately not a client component.
 *
 * 02_STEP_BY_STEP_FREE_BUILD_PLAN.md Step 10 requires a standard URL to return
 * useful HTML without client JavaScript, and Step 7 requires Back/Forward to
 * preserve search state. A native form submitting to /standards gives both for
 * free: the browser owns the history entry and the URL is the whole state.
 */
export function SearchPanel({
  areas,
  q = '',
  subject = '',
  band = '',
  status = 'current',
  examples = ['8.EE.C.7', '7.RP.A.2', 'MS-ETS1-3', 'HS-ETS1-3'],
}: {
  areas: AreaMeta[]
  q?: string
  subject?: string
  band?: string
  status?: string
  examples?: string[]
}) {
  return (
    <div className="searchbox">
      <p className="eyebrow">Search the governed index</p>
      <form method="get" action="/standards" role="search">
        <label className="visually-hidden" htmlFor="q">
          Search by standard code or concept
        </label>
        <div className="searchrow">
          <input
            id="q"
            name="q"
            type="search"
            autoComplete="off"
            defaultValue={q}
            placeholder="8.EE.C.7, linear equations, engineering design&hellip;"
          />
          <button type="submit">Search</button>
        </div>

        <div className="filterrow">
          <label>
            <span className="visually-hidden">Subject</span>
            <select name="subject" defaultValue={subject}>
              <option value="">All subjects</option>
              {areas.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="visually-hidden">Grade band</span>
            <select name="band" defaultValue={band}>
              <option value="">All grade bands</option>
              <option value="middle">Grades 6&ndash;8</option>
              <option value="high">Grades 9&ndash;12</option>
            </select>
          </label>
        </div>

        <div className="filterrow">
          <label>
            <span className="visually-hidden">Record status</span>
            <select name="status" defaultValue={status}>
              <option value="current">Current standards</option>
              <option value="all">Current + historical</option>
              <option value="historical">Historical only</option>
            </select>
          </label>
          <div />
        </div>
      </form>

      <div className="examples">
        {examples.map((code) => (
          <Link key={code} href={`/standards?q=${encodeURIComponent(code)}`}>
            {code}
          </Link>
        ))}
      </div>
    </div>
  )
}
