/**
 * The ONLY shape of a standard that may reach the browser.
 *
 * Field list is fixed by 05_PUBLIC_DATA_AND_API_CONTRACT.md and by
 * contracts/public_api_openapi_v1_0_0.yaml (`additionalProperties: false`).
 * Adding a field here without updating both of those is a contract break.
 */

export interface RelationshipCounts {
  supports: number
  reinforces: number
  next: number
  total: number
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
  relationship_signals: RelationshipCounts
  framework_lineage: FrameworkLineage | null
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

/** Exact allowed top-level keys. Anything else is a boundary violation. */
export const ALLOWED_STANDARD_KEYS: ReadonlySet<string> = new Set([
  'uid',
  'code',
  'area',
  'area_name',
  'label',
  'grades',
  'current',
  'status',
  'domain',
  'frameworks',
  'versions',
  'source_url',
  'source_url_kind',
  'aedifica_view',
  'generic_evidence_signals',
  'relationship_signals',
  'framework_lineage',
])
