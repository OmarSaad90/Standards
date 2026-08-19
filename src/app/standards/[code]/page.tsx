import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getByCode, standards } from '@/lib/data'
import { codeSlug } from '@/lib/codes'
import { subjectSlug } from '@/lib/slugs'
import { SITE_NAME, SITE_URL } from '@/lib/config'
import { Breadcrumb } from '@/components/SiteChrome'
import { MetricGrid, LineageCards, Chips } from '@/components/StandardParts'

export const dynamicParams = false

/** All 2,833 standard pages are pre-rendered. These are the pages that rank. */
export function generateStaticParams() {
  return standards.map((s) => ({ code: codeSlug(s.code) }))
}

function shorten(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return clean.slice(0, clean.lastIndexOf(' ', max - 1)) + '…'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  const s = getByCode(decodeURIComponent(code))
  if (!s) return { title: 'Standard not found' }

  const description = shorten(s.aedifica_view || s.label, 220)
  const path = `/standards/${codeSlug(s.code)}`

  return {
    // 07_SEO_ACCESSIBILITY_ANALYTICS.md recommends "{CODE} - {Label}".
    // Middot used instead of the recommended em dash, per house style.
    title: `${s.code} · ${shorten(s.label, 70)}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${s.code} · ${s.area_name} | ${SITE_NAME}`,
      description,
      url: path,
      type: 'article',
    },
  }
}

export default async function StandardPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const s = getByCode(decodeURIComponent(code))
  if (!s) notFound()

  const r = s.relationship_signals
  const slug = codeSlug(s.code)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/standards/${slug}`,
    name: s.code,
    description: s.aedifica_view || s.label,
    termCode: s.code,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `New Jersey Student Learning Standards · ${s.area_name}`,
      url: s.source_url ?? undefined,
    },
    educationalLevel: (s.grades ?? []).join(', '),
    url: `${SITE_URL}/standards/${slug}`,
  }

  return (
    <div className="screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap">
        <Breadcrumb
          items={[
            { label: 'Explorer', href: '/' },
            { label: s.area_name, href: `/subjects/${subjectSlug(s.area_name)}` },
            { label: s.code },
          ]}
        />

        <div className="identity">
          <div>
            <p className="eyebrow">{[s.area_name, s.domain].filter(Boolean).join(' · ')}</p>
            <h1 className="bigcode">{s.code}</h1>
            <Chips s={s} />
          </div>
          <span className="publictag">Public record</span>
        </div>

        <div className="detailgrid">
          <article className="card">
            <div className="micro muted">Standard identity &amp; source</div>
            <p className="indexlabel">{s.label || 'Source-linked standard record'}</p>
            <p className="tiny muted" style={{ marginTop: 10 }}>
              {s.source_url_kind === 'record-specific'
                ? 'Direct standard source available.'
                : 'Framework-level source available; NJDOE source controls.'}
            </p>
            {s.source_url && (
              <a className="sourcebtn" href={s.source_url} target="_blank" rel="noopener noreferrer">
                Open NJDOE source <span aria-hidden="true">&#8599;</span>
              </a>
            )}
          </article>

          <article className="card dark">
            <div className="micro" style={{ color: 'var(--blush)' }}>
              Aedifica View
            </div>
            <p className="aview">
              {s.aedifica_view || 'A concise Aedifica View is not published for this record.'}
            </p>
            <p className="tiny muted" style={{ marginTop: 16 }}>
              Aedifica interpretation supports navigation and understanding; the authoritative
              source controls.
            </p>
          </article>
        </div>

        <div className="section">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">Framework context</p>
              <h2>Authority first. Lineage second.</h2>
            </div>
            <p>
              Where governed lineage is available, state authority and national framework
              correspondence are intentionally separated.
            </p>
          </div>
          <LineageCards s={s} />
        </div>

        <div className="section">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">Evidence of learning</p>
              <h2>What demonstrating this learning can look like.</h2>
            </div>
            <p>
              Generic signals are public. Curriculum-specific evidence, implementation context, and
              institutional mappings are not.
            </p>
          </div>
          <div className="evidence">
            {(s.generic_evidence_signals ?? []).length > 0 ? (
              s.generic_evidence_signals.map((x) => <span key={x}>{x}</span>)
            ) : (
              <span className="muted">No generic evidence signal is published for this record.</span>
            )}
          </div>
        </div>

        <div className="section">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">Learning around this standard</p>
              <h2>The shape is public. The graph is protected.</h2>
            </div>
            <p>
              These counts come from the same governed commercial graph used by Pro, but the exact
              standard identities, rationale, provenance, and evidence stay protected.
            </p>
          </div>

          <MetricGrid r={r} />

          <div className="conversion">
            <div>
              <h3>See the complete learning progression.</h3>
              <p>
                Open the visual learning-around view. Public users see the governed shape; Aedifica
                Pro unlocks the exact standards and relationship intelligence behind it.
              </p>
            </div>
            <Link href={`/standards/${slug}/learning`}>
              Explore learning around <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
