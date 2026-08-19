import type { PublicStandard, RelationshipCounts } from '@/lib/types'

/**
 * Aggregate relationship counts.
 *
 * 03_FREE_PRODUCT_REQUIREMENTS.md permits the counts and forbids the endpoints.
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

/** Blurred placeholders. Decorative only, never data driven beyond the count. */
export function Ghosts({ n, label }: { n: number; label: string }) {
  if (!n) {
    return (
      <div className="ghosts">
        <div className="ghost">
          <strong>No public {label} signal</strong>
          <div className="blurline" />
        </div>
      </div>
    )
  }
  const shown = Math.min(n, 3)
  const remainder = n - shown
  return (
    <div className="ghosts">
      {Array.from({ length: shown }, (_, i) => (
        <div className="ghost" key={i}>
          <strong>Protected standard</strong>
          <div className="blurline" />
          <div className="blurline" style={{ width: `${52 + i * 11}%` }} />
        </div>
      ))}
      {remainder > 0 && (
        <div className="tiny muted" style={{ padding: '4px 2px' }}>
          + {remainder} more protected connection{remainder === 1 ? '' : 's'}
        </div>
      )}
    </div>
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
