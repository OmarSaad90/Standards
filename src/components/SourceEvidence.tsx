import type { PcsGuidanceEntry } from '@/lib/pcsEvidence'

/**
 * NjdoeSourceEvidence, per handoffv2/05_DEVELOPER_INSTRUCTIONS/05_COMPONENT_SPEC.md.
 * General sourcing disclosure for the NJDOE Prerequisite Concepts & Skills (PCS)
 * evidence layer — not per-standard. The per-standard prerequisite listing lives on
 * math standard detail pages (see StandardParts.tsx's MathPcsBlock) and pulls from
 * the same source family this panel describes.
 */
export function NjdoeSourceEvidence({ entries }: { entries: PcsGuidanceEntry[] }) {
  return (
    <div className="section">
      <div className="sectionhead">
        <div>
          <p className="eyebrow">Where the evidence comes from</p>
          <h2>NJDOE source evidence, disclosed.</h2>
        </div>
        <p>
          Separate from Aedifica&rsquo;s own aggregate Supports / Reinforces / Next signals, and
          never described as one.
        </p>
      </div>
      <div className="contextgrid">
        {entries.map((e) => (
          <article className="contextcard" key={e.key}>
            <div className="type micro">{e.label}</div>
            <h3>{e.title}</h3>
            <p className="tiny muted" style={{ textTransform: 'uppercase', letterSpacing: '.04em' }}>
              {e.status}
            </p>
            <p className="small muted" style={{ marginTop: 8 }}>
              {e.description}
            </p>
            <p className="tiny muted" style={{ marginTop: 8 }}>
              {e.future}
            </p>
            <a className="sourcebtn" href={e.source} target="_blank" rel="noopener noreferrer">
              NJDOE source <span aria-hidden="true">&#8599;</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
