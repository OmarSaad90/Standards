import type { Metadata } from 'next'
import { meta, dataSha256 } from '@/lib/data'
import { DATA_VERSION, RELEASE_VERSION } from '@/lib/config'
import { Breadcrumb } from '@/components/SiteChrome'

export const metadata: Metadata = {
  title: 'About',
  description:
    'What the Aedifica Standards Explorer is, how the public source is separated from Aedifica interpretation, and what the aggregate learning-context signals do and do not claim.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="screen">
      <div className="wrap">
        <Breadcrumb items={[{ label: 'Explorer', href: '/' }, { label: 'About' }]} />

        <p className="eyebrow">About</p>
        <h1>What this is, and what it claims.</h1>

        <div className="prose" style={{ marginTop: 30 }}>
          <p>
            The Aedifica Standards Explorer is a free, public, no-login view of{' '}
            {meta.total_count.toLocaleString()} New Jersey Grades 6&ndash;12 standards records, of
            which {meta.current_count.toLocaleString()} are current. It exists so that a teacher,
            administrator, or parent can find a standard, read it in plain language, reach the
            governing source, and see the shape of the learning around it.
          </p>

          <h3>Public source and Aedifica interpretation are separate</h3>
          <p>
            Every standard page shows two distinct things. The <strong>standard identity, label,
            and source link</strong> come from the New Jersey Department of Education and are
            authoritative. The <strong>Aedifica View</strong> is Aedifica&rsquo;s own concise
            interpretation, written to make the standard easier to navigate and use. Where the two
            differ, the governing source controls.
          </p>
          <p>
            Framework lineage, where it is published, keeps the same separation. State authority is
            labelled as state authority. National framework correspondence is labelled as lineage
            rather than authority, and carries its own claim boundary describing exactly what the
            correspondence does and does not assert.
          </p>

          <h3>Aggregate learning-context signals are informational</h3>
          <p>
            Each standard shows three counts: Supports, Reinforces, and Next. These describe how
            many governed connections Aedifica has recorded around that standard. They are
            informational signals intended to convey the shape of the surrounding learning.
          </p>
          <p>
            They are <strong>not</strong> an official prerequisite sequence, and nothing here should
            be read as one. The New Jersey Department of Education has not reviewed, endorsed, or
            approved Aedifica&rsquo;s relationships. The counts are not a statement of educator
            validation, district validation, or research finding.
          </p>
          <p>
            The exact connected standards behind those counts, along with per-connection rationale,
            provenance, confidence, and audit state, are not part of this public release.
          </p>

          <h3>What is published here</h3>
          <p>
            Standard code, public label, subject, grades, current or historical status, domain and
            framework information, source link and source context, the Aedifica View, public
            framework lineage, generic evidence signals, and aggregate Supports, Reinforces, and
            Next counts.
          </p>

          <h3>Accessibility</h3>
          <p>
            This site is built targeting WCAG 2.2 Level AA. No conformance claim is made, because
            an independent accessibility audit has not yet been completed. If you hit a barrier,
            please tell us so it can be fixed.
          </p>

          <h3>Release</h3>
          <p className="tiny">
            Application release {RELEASE_VERSION} &middot; public dataset v{DATA_VERSION} &middot;
            dataset SHA-256 <code>{dataSha256}</code>
          </p>
          <p className="tiny">
            The published dataset is fixed for this release. Any change to the public data is issued
            as a new versioned release rather than a silent update.
          </p>
        </div>
      </div>
    </div>
  )
}
