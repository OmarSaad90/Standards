#!/usr/bin/env node
/**
 * Deployable-asset leakage scan. Implements 06_SECURITY_BOUNDARY.md:
 * "Build must fail closed on leakage."
 *
 * Runs as `postbuild`, so a leaking build never reaches deploy.
 * Writes reports/leakage-report.txt, which 10_DEFINITION_OF_DONE.md requires
 * as a developer deliverable.
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const ROOT = path.resolve(import.meta.dirname, '..')
const TARGETS = ['.next/server', '.next/static', 'public']
const SCAN_EXT = new Set(['.js', '.mjs', '.cjs', '.json', '.html', '.txt', '.map', '.rsc', '.css'])

/** Tokens specific enough that a hit is a real boundary breach, not prose. */
const FORBIDDEN = [
  'commercial-rel:',
  'atc:machine:',
  'atc:page-only:',
  'EXPANDED_OPT_IN',
  'DISPUTED_OPT_IN',
  'GOVERNANCE_HISTORY_ONLY',
  'QUARANTINE_HISTORY',
  '"provenance_entries"',
  '"evidence_tiers"',
  '"verification_levels"',
  '"pro_relationships"',
  '"curriculum_preview"',
  '"external_attribution"',
  '"relationship_endpoints"',
  '"edge_rationale"',
  '"per_edge"',
]

const hits = []
let filesScanned = 0
let bytesScanned = 0

function walk(dir) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'cache' || e.name === 'node_modules') continue
      walk(full)
    } else if (SCAN_EXT.has(path.extname(e.name))) {
      scan(full)
    }
  }
}

function scan(file) {
  let text
  try {
    text = fs.readFileSync(file, 'utf8')
  } catch {
    return
  }
  filesScanned++
  bytesScanned += text.length
  for (const token of FORBIDDEN) {
    let idx = text.indexOf(token)
    while (idx !== -1) {
      hits.push({
        file: path.relative(ROOT, file),
        token,
        context: text.slice(Math.max(0, idx - 60), idx + token.length + 60).replace(/\s+/g, ' '),
      })
      idx = text.indexOf(token, idx + token.length)
    }
  }
}

for (const t of TARGETS) walk(path.join(ROOT, t))

const dataBuf = fs.readFileSync(path.join(ROOT, 'data', 'public_standards_phase1_v1_0_7.json'))
const dataSha = crypto.createHash('sha256').update(dataBuf).digest('hex')

const lines = [
  'Aedifica Free Standards Explorer - leakage report',
  `generated: ${new Date().toISOString()}`,
  `public data SHA-256: ${dataSha}`,
  `scanned: ${filesScanned} files, ${(bytesScanned / 1024 / 1024).toFixed(1)} MB`,
  `targets: ${TARGETS.join(', ')}`,
  `tokens checked: ${FORBIDDEN.length}`,
  '',
]

if (hits.length === 0) {
  lines.push('RESULT: PASS - no protected token found in deployable assets.')
} else {
  lines.push(`RESULT: FAIL - ${hits.length} protected token occurrence(s) found.`, '')
  for (const h of hits) lines.push(`  ${h.token}  in  ${h.file}`, `      ...${h.context}...`)
}

fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'reports', 'leakage-report.txt'), lines.join('\n') + '\n', 'utf8')

console.log('\n' + lines.join('\n') + '\n')
if (hits.length > 0) {
  console.error('Leakage scan failed. Build output must not be deployed.\n')
  process.exit(1)
}
