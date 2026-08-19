import Link from 'next/link'
import type { Metadata } from 'next'
import { meta, subjectDirectory } from '@/lib/data'
import { SearchPanel } from '@/components/SearchPanel'
import { SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/config'

export const metadata: Metadata = {
  title: `${SITE_NAME} | New Jersey Grades 6-12 standards`,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
}

const TILE_COLORS = [
  'var(--violet)',
  'var(--sage)',
  'var(--sand)',
  'var(--mauve)',
  'var(--rose)',
  'var(--wine)',
  'var(--terracotta)',
  'var(--blush)',
  'var(--warm)',
]

export default function HomePage() {
  const subjects = subjectDirectory()

  return (
    <div className="screen">
      <div className="wrap">
        <div className="hero">
          <div>
            <p className="eyebrow">Aedifica Standards Explorer &middot; Public</p>
            <h1 className="display">
              See the standard. <em>Understand the learning around it.</em>
            </h1>
            <p className="lead">
              A governed public view of New Jersey Grades 6&ndash;12 standards, with authoritative
              sources, concise Aedifica interpretation, framework context, and the shape of learning
              before and after each standard.
            </p>
            <div className="herostat">
              <div className="stat">
                <strong>{meta.current_count.toLocaleString()}</strong>
                <span className="tiny muted">current standards</span>
              </div>
              <div className="stat">
                <strong>{meta.areas.length}</strong>
                <span className="tiny muted">subject areas</span>
              </div>
              <div className="stat">
                <strong>{meta.total_count.toLocaleString()}</strong>
                <span className="tiny muted">indexed records</span>
              </div>
            </div>
          </div>
          <aside className="heroaside">
            <SearchPanel areas={meta.areas} />
          </aside>
        </div>

        <div className="section">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">Browse the architecture</p>
              <h2>Start with a subject.</h2>
            </div>
            <p>
              {meta.current_count.toLocaleString()} current standards across {meta.areas.length}{' '}
              subject areas.
            </p>
          </div>
          <div className="subjects">
            {subjects.map((s, i) => (
              <Link className="subject" href={`/subjects/${s.slug}`} key={s.slug}>
                <span className="tiny muted">
                  <i
                    className="dot"
                    style={{ background: TILE_COLORS[i % TILE_COLORS.length] }}
                    aria-hidden="true"
                  />
                  {s.name}
                </span>
                <span className="num">{s.current.toLocaleString()}</span>
                <strong>Browse {s.name}</strong>
                <span className="tiny muted">
                  Current standards <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">The public seam</p>
              <h2>Useful first. Proprietary where it matters.</h2>
            </div>
            <p>
              Free access shows the standard, source, Aedifica View, generic evidence signals,
              framework context, and aggregate Supports / Reinforces / Next counts. Exact connected
              standards and relationship intelligence remain Aedifica Pro.
            </p>
          </div>
          <div className="contextgrid">
            <article className="contextcard">
              <div className="type micro">1 &middot; Authority</div>
              <h3>Start from the governing source.</h3>
              <p className="small muted">
                Standard identity and NJDOE source links stay visible and primary.
              </p>
            </article>
            <article className="contextcard">
              <div className="type micro">2 &middot; Interpretation</div>
              <h3>Read the Aedifica View.</h3>
              <p className="small muted">
                A concise plain-language interpretation makes the standard easier to use.
              </p>
            </article>
            <article className="contextcard">
              <div className="type micro">3 &middot; Learning shape</div>
              <h3>See what surrounds it.</h3>
              <p className="small muted">
                Aggregate Supports, Reinforces, and Next counts reveal the shape without releasing
                the protected graph.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
