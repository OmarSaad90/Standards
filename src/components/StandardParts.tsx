import type { PublicStandard, RelationshipCounts } from '@/lib/types'
import type { MathPcsEntry } from '@/lib/pcsEvidence'
import { getByCode } from '@/lib/data'
import { codeSlug } from '@/lib/codes'

/**
 * Aggregate relationship counts.
 *
 * handoffv2/05_DEVELOPER_INSTRUCTIONS/08_RELATIONSHIP_COUNTS_COMING_SOON_RULES.md
 * permits the counts and forbids the endpoints.
 * Nothing here can render a connected standard, because no connected standard
 * exists in the public payload to render.
 */
export function MetricGrid({ r }: { r: RelationshipCounts }) {
  const metrics = [
    { cls: 'supports', label: 'Builds on / supports', n: r.supports, copy: 'Standards that can support this learning. Exact identities are protected.' },
    { cls: 'reinforces', label: 'Reinforces', n: r.reinforces, copy: 'Related learning that reinforces this standard. Exact identities are protected.' },
    { cls: 'next', label: 'Unlocks next', n: r.next, copy: 'Standards this learning can support next. Exact identities are protected.' },
  ]
  return (
    <div className="signalgrid">
      {metrics.map((m) => (
        <article key={m.cls} className={`metric ${m.cls}`}>
          <div>
            <div className="micro muted">{m.label}</div>
            <div className="n">{m.n}</div>
          </div>
          <p className="small muted">{m.copy}</p>
        </article>
      ))}
    </div>
  )
}

/**
 * Static, non-navigating notice. Text is exact per
 * 08_RELATIONSHIP_COUNTS_COMING_SOON_RULES.md — must not link anywhere or expose
 * anything beyond the aggregate counts already shown in MetricGrid.
 */
export function ComingSoonNotice() {
  return (
    <button type="button" className="cta" aria-disabled="true" disabled>
      Relationship intelligence coming soon
    </button>
  )
}

/**
 * NJDOE's own published Math prerequisite table for this standard, per
 * handoffv2/05_DEVELOPER_INSTRUCTIONS/07_SOURCE_EVIDENCE_RULES.md: kept structurally
 * separate from Aedifica's Supports/Reinforces/Next, never folded into that count and
 * never described as an Aedifica signal. Renders only for the 161 math standards NJDOE
 * publishes direct prerequisites for.
 */
export function MathPcsBlock({ entry }: { entry: MathPcsEntry }) {
  return (
    <article className="card">
      <div className="micro muted">NJDOE prerequisite concepts &amp; skills (Math)</div>
      <p className="tiny muted" style={{ marginTop: 8 }}>
        Official NJDOE source table for Grade/Course {entry.source_grade_or_course}. Separate from
        Aedifica&rsquo;s own Supports / Reinforces / Next signals above.
      </p>
      {entry.prerequisites.length > 0 ? (
        <ul className="chips" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8, marginTop: 12, listStyle: 'none', padding: 0 }}>
          {entry.prerequisites.map((p) => {
            const target = getByCode(p.code)
            return (
              <li key={p.code} className="small">
                {target ? (
                  <a href={`/standards/${codeSlug(target.code)}`}>{p.code}</a>
                ) : (
                  <strong>{p.code}</strong>
                )}
                {p.current_label ? ` — ${p.current_label}` : ''}
                {!target && <span className="tiny muted"> (outside current Grades 6-12 index)</span>}
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="small muted" style={{ marginTop: 12 }}>
          No direct prerequisite pairs are listed in the source table for this standard.
        </p>
      )}
      <a className="sourcebtn" href={entry.source_url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16 }}>
        Open NJDOE PCS source <span aria-hidden="true">&#8599;</span>
      </a>
    </article>
  )
}

/**
 * Official 2023 NJSLS-ELA wording, kept structurally separate from the Aedifica
 * View card per 06_ELA_OFFICIAL_TEXT_RULES.md: never imply Aedifica View is NJDOE
 * wording. Renders only when the record carries official_text_source.
 */
export function OfficialElaBlock({ s }: { s: PublicStandard }) {
  if (!s.official_text_source) return null

  return (
    <article className="card">
      <div className="micro muted">Official {s.official_text_source} wording</div>
      <p className="indexlabel" style={{ marginTop: 8 }}>
        {s.label}
      </p>
      {s.official_components && s.official_components.length > 0 && (
        <div className="chips" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8, marginTop: 12 }}>
          {s.official_components.map((c) => (
            <p key={c.label} className="small">
              <strong>{c.label}.</strong> {c.text}
            </p>
          ))}
        </div>
      )}
    </article>
  )
}

export function LineageCards({ s }: { s: PublicStandard }) {
  const l = s.framework_lineage
  if (!l) {
    return (
      <div className="card">
        <p className="muted">
          No governed Math/Science framework-lineage record is published for this subject in the
          current sidecar.
        </p>
      </div>
    )
  }

  const st = l.state_authority ?? {}
  const national = l.national_lineage ?? []
  const dims = l.science_dimensions

  return (
    <div className="contextgrid">
      {st.framework_name && (
        <article className="contextcard">
          <div className="type micro">State authority</div>
          <h3>{st.framework_name}</h3>
          <p className="small muted">
            {[st.publisher, st.version].filter(Boolean).join(' · ')}
          </p>
          {st.official_url && (
            <a className="sourcebtn" href={st.official_url} target="_blank" rel="noopener noreferrer">
              Authoritative source <span aria-hidden="true">&#8599;</span>
            </a>
          )}
        </article>
      )}

      {national.map((n, i) => (
        <article className="contextcard" key={n.framework_id ?? i}>
          <div className="type micro">Framework lineage &middot; not state authority</div>
          <h3>{n.framework_name ?? n.framework_id}</h3>
          <p className="small muted">{n.correspondence_status ?? ''}</p>
          <p className="tiny muted">{n.claim_boundary ?? ''}</p>
          {n.source_url && (
            <a className="sourcebtn" href={n.source_url} target="_blank" rel="noopener noreferrer">
              Framework source <span aria-hidden="true">&#8599;</span>
            </a>
          )}
        </article>
      ))}

      {dims && (
        <article className="contextcard">
          <div className="type micro">Science framework structure</div>
          <h3>SEP &middot; DCI &middot; CCC</h3>
          <p className="small muted">
            Three-dimensional science structure is recognized
            {dims.dci_family_from_code ? ` · DCI family from code: ${dims.dci_family_from_code}` : ''}.
          </p>
          <p className="tiny muted">
            No per-standard CCC assignment is invented where the governed source does not provide
            one.
          </p>
        </article>
      )}
    </div>
  )
}

export function Chips({ s }: { s: PublicStandard }) {
  return (
    <div className="chips">
      <span className="chip current">{s.status}</span>
      {(s.grades ?? []).map((g) => (
        <span className="chip" key={`g-${g}`}>
          Grade {g}
        </span>
      ))}
      {(s.versions ?? []).map((v) => (
        <span className="chip" key={`v-${v}`}>
          {v}
        </span>
      ))}
    </div>
  )
}
