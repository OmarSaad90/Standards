import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getByCode } from '@/lib/data'
import { codeSlug } from '@/lib/codes'
import { SITE_NAME } from '@/lib/config'
import { Breadcrumb } from '@/components/SiteChrome'
import { Ghosts } from '@/components/StandardParts'

/**
 * Rendered on demand rather than pre-generated.
 *
 * Pre-rendering this too would double the build to 5,666 pages for a view that
 * carries no information the detail page does not already expose to crawlers.
 * It is still fully server-rendered HTML with a canonical URL, so it satisfies
 * 02_STEP_BY_STEP_FREE_BUILD_PLAN.md Step 10.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  const s = getByCode(decodeURIComponent(code))
  if (!s) return { title: 'Standard not found' }

  const slug = codeSlug(s.code)
  return {
    title: `Learning around ${s.code}`,
    description: `${s.relationship_signals.total} governed connections around ${s.code}. Aggregate Supports, Reinforces, and Next counts, with exact identities protected.`,
    alternates: { canonical: `/standards/${slug}/learning` },
    openGraph: {
      title: `Learning around ${s.code} | ${SITE_NAME}`,
      url: `/standards/${slug}/learning`,
    },
  }
}

export default async function LearningPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const s = getByCode(decodeURIComponent(code))
  if (!s) notFound()

  const r = s.relationship_signals
  const slug = codeSlug(s.code)

  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb
          items={[
            { label: 'Explorer', href: '/' },
            { label: s.code, href: `/standards/${slug}` },
            { label: 'Learning Around' },
          ]}
        />

        <div className="learninghero">
          <div>
            <p className="eyebrow">Learning Around This Standard</p>
            <h1>See the architecture without releasing the graph.</h1>
            <p className="lead">{r.total} governed connections around this standard</p>
          </div>
          <div>
            <div className="micro muted">Current standard</div>
            <div className="currentcode">{s.code}</div>
            <p className="small muted" style={{ marginTop: 8 }}>
              {s.aedifica_view}
            </p>
          </div>
        </div>

        <div className="learningmap">
          <section className="lane" aria-label="Supports this learning">
            <div className="lanehead">
              <strong>Supports this learning</strong>
              <span className="countcircle">{r.supports}</span>
            </div>
            <Ghosts n={r.supports} label="support" />
          </section>

          <section className="lane current" aria-label="Current standard">
            <div>
              <div className="micro" style={{ color: 'var(--blush)' }}>
                Current standard
              </div>
              <div className="currentcode">{s.code}</div>
              <p className="currentview">{s.aedifica_view}</p>
            </div>
          </section>

          <section className="lane" aria-label="Unlocks next">
            <div className="lanehead">
              <strong>Unlocks next</strong>
              <span className="countcircle">{r.next}</span>
            </div>
            <Ghosts n={r.next} label="next" />
          </section>
        </div>

        <div className="lane" style={{ marginTop: 14, minHeight: 'auto' }}>
          <div className="lanehead">
            <strong>Reinforces this learning</strong>
            <span className="countcircle">{r.reinforces}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <Ghosts n={r.reinforces} label="reinforcement" />
          </div>
        </div>

        <div className="conversion">
          <div>
            <h3>Public shows the shape. Pro explains every connection.</h3>
            <p>
              Unlock exact connected standards, direction, rationale, confidence,
              evidence/provenance, and claim boundaries, all tied to this same governed graph.
            </p>
          </div>
          <Link href={`/pro?from=${encodeURIComponent(slug)}`}>
            Open Pro preview <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
