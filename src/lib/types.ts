/**
 * The ONLY shape of a standard that may reach the browser.
 *
 * Field list is fixed by handoffv2/05_DEVELOPER_INSTRUCTIONS/03_PUBLIC_DATA_CONTRACT.md
 * and handoffv2/02_PUBLIC_DATA/phase1_field_allowlist.json. Adding a field here without
 * updating both of those is a contract break.
 */

export interface RelationshipCounts {
  supports: number
  reinforces: number
  next: number
  total: number
}

export interface RelationshipCountsTitleCase {
  Supports: number
  Reinforces: number
  Next: number
}

export interface OfficialComponent {
  label: string
  text: string
}

export interface NationalLineage {
  framework_id?: string
  framework_name?: string
  authority_role?: string
  source_url?: string
  relation_type?: string
  correspondence_status?: string
  claim_boundary?: string
}

export interface StateAuthority {
  framework_id?: string
  framework_name?: string
  version?: string
  publisher?: string
  authority_role?: string
  official_url?: string
}

export interface FrameworkLineage {
  available?: boolean
  state_authority?: StateAuthority
  national_lineage?: NationalLineage[]
  science_dimensions?: { dci_family_from_code?: string; [k: string]: unknown }
}

export interface PublicStandard {
  uid: string
  code: string
  area: string
  area_name: string
  label: string
  grades: string[]
  current: boolean
  status: string
  domain: string | null
  frameworks: string[]
  versions: string[]
  source_url: string | null
  source_url_kind: string | null
  aedifica_view: string
  generic_evidence_signals: string[]
  relationship_count: number
  relationship_counts: RelationshipCountsTitleCase
  public_relationship_buckets: { supports: number; reinforces: number; next: number }
  framework_lineage: FrameworkLineage | null
  official_text_source?: string | null
  official_components?: OfficialComponent[]
}

export interface AreaMeta {
  name: string
  count: number
}

export interface PublicMeta {
  version: string
  total_count: number
  current_count: number
  areas: AreaMeta[]
  public_contract: string
}

export type StatusFilter = 'current' | 'historical' | 'all'
export type Band = 'middle' | 'high'

/**
 * Exact allowed top-level keys. Anything else is a boundary violation.
 *
 * Matches handoffv2/02_PUBLIC_DATA/phase1_field_allowlist.json (21 fields). That file
 * also names three fields explicitly excluded from the Phase 1 payload: app_count,
 * programs, curriculum_preview. They must never appear here.
 */
export const ALLOWED_STANDARD_KEYS: ReadonlySet<string> = new Set([
  'uid',
  'code',
  'area',
  'area_name',
  'label',
  'grades',
  'current',
  'status',
  'source_url',
  'source_url_kind',
  'frameworks',
  'versions',
  'relationship_count',
  'relationship_counts',
  'aedifica_view',
  'domain',
  'public_relationship_buckets',
  'generic_evidence_signals',
  'framework_lineage',
  'official_text_source',
  'official_components',
])
