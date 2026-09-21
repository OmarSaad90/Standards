import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

/**
 * NJDOE Prerequisite Concepts & Skills (PCS) source evidence.
 *
 * Separate from the main public standards dataset by design: this is NJDOE's own
 * published prerequisite documentation, not an Aedifica-derived signal. Per
 * handoffv2/05_DEVELOPER_INSTRUCTIONS/07_SOURCE_EVIDENCE_RULES.md, it must never be
 * folded into Aedifica's aggregate Supports/Reinforces/Next counts, and Aedifica's
 * counts must never be described as official prerequisites.
 */

export interface MathPcsPrerequisite {
  code: string
  evidence_class: string
  crosswalk_status: string
  current_label: string | null
}

export interface MathPcsEntry {
  source_grade_or_course: string
  source_url: string
  target_crosswalk_status: string
  direct_status: string
  prerequisites: MathPcsPrerequisite[]
}

export interface PcsGuidanceEntry {
  key: string
  label: string
  title: string
  status: string
  description: string
  future: string
  source: string
}

interface PcsGuidance {
  math: PcsGuidanceEntry
  ela: PcsGuidanceEntry
}

function load() {
  const evidencePath = path.join(process.cwd(), 'data', 'njdoe_math_pcs_evidence_v1_0_7.json')
  const guidancePath = path.join(process.cwd(), 'data', 'njdoe_pcs_guidance_v1_0_7.json')

  const mathPcsEvidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8')) as Record<
    string,
    MathPcsEntry
  >
  const pcsGuidance = JSON.parse(fs.readFileSync(guidancePath, 'utf8')) as PcsGuidance

  return { mathPcsEvidence, pcsGuidance }
}

const DB = load()

export const pcsGuidance = DB.pcsGuidance

export function getMathPcsEvidence(code: string): MathPcsEntry | undefined {
  return DB.mathPcsEvidence[code]
}
