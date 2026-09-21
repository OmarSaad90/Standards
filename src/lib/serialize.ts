import type { PublicStandard } from './types'

/**
 * Explicit field-by-field serialisation.
 *
 * handoffv2/05_DEVELOPER_INSTRUCTIONS/03_PUBLIC_DATA_CONTRACT.md: "Use strict serialization. Do not return
 * raw internal models." Spreading the source object would silently publish any
 * field a future dataset happens to add, so every field is named here.
 */
export function toPublicStandard(s: PublicStandard) {
  return {
    uid: s.uid,
    code: s.code,
    area: s.area,
    area_name: s.area_name,
    label: s.label,
    grades: [...(s.grades ?? [])],
    current: s.current,
    status: s.status,
    domain: s.domain ?? null,
    frameworks: [...(s.frameworks ?? [])],
    versions: [...(s.versions ?? [])],
    source_url: s.source_url ?? null,
    source_url_kind: s.source_url_kind ?? null,
    aedifica_view: s.aedifica_view,
    generic_evidence_signals: [...(s.generic_evidence_signals ?? [])],
    relationship_count: s.relationship_count,
    relationship_counts: {
      Supports: s.relationship_counts.Supports,
      Reinforces: s.relationship_counts.Reinforces,
      Next: s.relationship_counts.Next,
    },
    public_relationship_buckets: {
      supports: s.public_relationship_buckets.supports,
      reinforces: s.public_relationship_buckets.reinforces,
      next: s.public_relationship_buckets.next,
    },
    framework_lineage: s.framework_lineage ?? null,
    official_text_source: s.official_text_source ?? null,
    official_components: s.official_components ? [...s.official_components] : [],
  }
}

export function badRequest(parameter: string, reason: string, allowed?: string[]) {
  return Response.json(
    {
      error: 'invalid_parameter',
      parameter,
      reason,
      ...(allowed ? { allowed } : {}),
    },
    { status: 400, headers: { 'Cache-Control': 'no-store' } },
  )
}
