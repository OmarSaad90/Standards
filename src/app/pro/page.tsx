import Link from 'next/link'
import type { Metadata } from 'next'
import { getByCode } from '@/lib/data'
import { codeSlug } from '@/lib/codes'
import { Breadcrumb } from '@/components/SiteChrome'

type SP = Record<string, string | string[] | undefined>

/**
 * ONE page for the whole site, not one per standard.
 *
 * The prototype routed this as #relationship/{code}, but the content is
 * identical for every standard. Generating 2,833 copies would be duplicate
 * content at scale. The selected standard arrives as ?from={code} and only
 * personalises two lines; the canonical URL stays /pro either way.
 */
export const metadata: Metadata = {
  title: 'Aedifica Pro',
  description:
    'Relationship Detail is intentionally not part of the public payload. Aedifica Pro reveals the exact governed relationships behind every public count.',
  alternates: { canonical: '/pro' },
}

const FEATURES = [
  {
    title: 'Exact connected standards',
    copy: 'See the endpoint identities behind every public count.',
  },
  {
    title: 'Direction & semantic role',
    copy: 'Understand what builds on, reinforces, or unlocks the learning.',
  },
  {
    title: 'Relationship rationale',
    copy: 'Read the reason the connection exists instead of inferring it from codes.',
  },
  {
    title: 'Evidence & provenance',
    copy: 'Separate source-published, external corroboration, Aedifica-derived, and editorial intelligence.',
  },
  {
    title: 'Confidence & verification',
    copy: 'See evidence tier and verification level where they apply.',
  },
  {
    title: 'Claim boundaries',
    // em dash in the client source rewritten to a comma, per house style
    copy: 'Know what is official, externally corroborated, or Aedifica-authored, without flattening them together.',
  },
]

export default async function ProPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const fromRaw = Array.isArray(sp.from) ? sp.from[0] : sp.from
  const s = fromRaw ? getByCode(decodeURIComponent(fromRaw)) : undefined

  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb
          items={[
            { label: 'Explorer', href: '/' },
            ...(s
              ? [
                  { label: s.code, href: `/standards/${codeSlug(s.code)}` },
                  { label: 'Learning Around', href: `/standards/${codeSlug(s.code)}/learning` },
                ]
              : []),
            { label: 'Relationship Detail' },
          ]}
        />

        <div className="gate">
          <div className="gatehead">
            <p className="eyebrow" style={{ color: 'var(--blush)' }}>
              Aedifica Pro &middot; Protected intelligence
            </p>
            <h1>Understand why the learning connects.</h1>
            <p className="lead" style={{ color: 'var(--line)' }}>
              Relationship Detail is intentionally not part of the public payload.
            </p>
          </div>

          <div className="gatebody">
            <div className="micro muted">Selected standard</div>
            <div className="bigcode" style={{ fontSize: '3rem', marginTop: 6 }}>
              {s ? s.code : 'Aedifica Pro'}
            </div>
            <p className="small muted" style={{ marginTop: 10 }}>
              {s
                ? `Public currently shows ${s.relationship_signals.total} aggregate connections around this standard. Pro reveals the exact governed relationships behind those counts.`
                : 'Public access shows standards, sources, Aedifica View, framework context, generic evidence signals, and aggregate learning relationships. Select a standard to preview the protected relationship-intelligence seam.'}
            </p>

            <div className="featuregrid">
              {FEATURES.map((f) => (
                <article className="feature" key={f.title}>
                  <strong>{f.title}</strong>
                  <p>{f.copy}</p>
                </article>
              ))}
            </div>

            <div className="notincluded">
              <strong>Protected by design:</strong> this public deployment contains no exact
              commercial relationship endpoints, rationales, provenance records, evidence tiers, or
              customer curriculum data.
            </div>

            {/*
              OPEN ITEM: this screen is currently a dead end, exactly as in the locked
              prototype. Awaiting the client's decision on adding a contact or waitlist
              CTA here. When he answers, add it directly below this comment.
            */}
            <Link className="cta solid" href={s ? `/standards/${codeSlug(s.code)}` : '/standards'}>
              Continue exploring Public
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
