#!/usr/bin/env node
/**
 * Build gate, per handoffv2/05_DEVELOPER_INSTRUCTIONS/10_QA_ACCEPTANCE_TESTS.md:
 * the build must fail if any integrity check against the public dataset fails.
 *
 * Runs as `prebuild`, so `npm run build` cannot succeed on a bad dataset.
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const ROOT = path.resolve(import.meta.dirname, '..')
const STANDARDS_DATA = path.join(ROOT, 'data', 'public_standards_phase1_v1_0_7.json')
const COUNTS_DATA = path.join(ROOT, 'data', 'public_counts_v1_0_7.json')

const EXPECTED_TOTAL = 2836
const EXPECTED_CURRENT = 2757
const EXPECTED_NON_CURRENT = 79
const EXPECTED_SUPPORTS = 1420
const EXPECTED_REINFORCES = 2424
const EXPECTED_NEXT = 1420
const EXPECTED_SHA256 = 'ff2911232882890ad3a5814c9c1e912ebe2ea150e40c8ba180b5bdb61d110771'

const ALLOWED_KEYS = new Set([
  'uid', 'code', 'area', 'area_name', 'label', 'grades', 'current', 'status',
  'source_url', 'source_url_kind', 'frameworks', 'versions',
  'relationship_count', 'relationship_counts', 'aedifica_view', 'domain',
  'public_relationship_buckets', 'generic_evidence_signals', 'framework_lineage',
  'official_text_source', 'official_components',
])

const failures = []
const notes = []
const check = (label, ok, detail = '') => {
  if (ok) notes.push(`  PASS  ${label}${detail ? ` (${detail})` : ''}`)
  else failures.push(`  FAIL  ${label}${detail ? ` (${detail})` : ''}`)
}

let buf
try {
  buf = fs.readFileSync(STANDARDS_DATA)
} catch {
  console.error(`\nFATAL: dataset missing at ${STANDARDS_DATA}\n`)
  process.exit(1)
}

const sha256 = crypto.createHash('sha256').update(buf).digest('hex')
check('dataset SHA-256 matches handoffv2/SHA256SUMS.txt', sha256 === EXPECTED_SHA256, sha256)

let rows
try {
  rows = JSON.parse(buf.toString('utf8'))
  check('JSON parses', true)
} catch (err) {
  check('JSON parses', false, err.message)
  report()
}

const counts = JSON.parse(fs.readFileSync(COUNTS_DATA, 'utf8'))

check(`total records = ${EXPECTED_TOTAL}`, rows.length === EXPECTED_TOTAL, String(rows.length))

const current = rows.filter((r) => r.current === true).length
const nonCurrent = rows.length - current
check(`current records = ${EXPECTED_CURRENT}`, current === EXPECTED_CURRENT, String(current))
check(`non-current records = ${EXPECTED_NON_CURRENT}`, nonCurrent === EXPECTED_NON_CURRENT, String(nonCurrent))

check('counts file total_standards agrees', counts.total_standards === rows.length)
check('counts file current agrees', counts.current === current)

const codes = new Set(rows.map((r) => r.code))
check('all codes unique', codes.size === rows.length, `${codes.size} unique`)

const uids = new Set(rows.map((r) => r.uid))
check('all UIDs unique', uids.size === rows.length, `${uids.size} unique`)

const sumBucket = (key) => rows.reduce((n, r) => n + (r.public_relationship_buckets?.[key] ?? 0), 0)
check(`supports sum = ${EXPECTED_SUPPORTS}`, sumBucket('supports') === EXPECTED_SUPPORTS, String(sumBucket('supports')))
check(`reinforces sum = ${EXPECTED_REINFORCES}`, sumBucket('reinforces') === EXPECTED_REINFORCES, String(sumBucket('reinforces')))
check(`next sum = ${EXPECTED_NEXT}`, sumBucket('next') === EXPECTED_NEXT, String(sumBucket('next')))

const badTotals = rows.filter((r) => {
  const b = r.public_relationship_buckets ?? {}
  return r.relationship_count !== (b.supports ?? 0) + (b.reinforces ?? 0) + (b.next ?? 0)
})
check('relationship_count = supports + reinforces + next', badTotals.length === 0,
  badTotals.length ? `${badTotals.length} mismatched` : `all ${rows.length} reconcile`)

const negative = rows.filter((r) => {
  const b = r.public_relationship_buckets ?? {}
  return [b.supports, b.reinforces, b.next, r.relationship_count].some(
    (n) => typeof n !== 'number' || n < 0,
  )
})
check('relationship counts are non-negative integers', negative.length === 0)

const offenders = new Map()
for (const r of rows) {
  for (const k of Object.keys(r)) {
    if (!ALLOWED_KEYS.has(k)) offenders.set(k, (offenders.get(k) ?? 0) + 1)
  }
}
check('no non-public fields present', offenders.size === 0,
  offenders.size ? [...offenders.keys()].join(', ') : 'schema clean')

const REQUIRED_KEYS = [...ALLOWED_KEYS].filter(
  (k) => k !== 'official_text_source' && k !== 'official_components',
)
const missing = rows.filter((r) => REQUIRED_KEYS.some((k) => !(k in r)))
check('every record carries all required fields', missing.length === 0,
  missing.length ? `${missing.length} incomplete` : '')

const areaSum = Object.values(counts.subject_counts ?? {}).reduce((n, a) => n + a.current, 0)
check('subject_counts current sums to current_count', areaSum === current, `${areaSum} vs ${current}`)

report()

function report() {
  const head = `Aedifica public dataset integrity — ${notes.length + failures.length} checks`
  console.log(`\n${head}\n${'-'.repeat(head.length)}`)
  for (const n of notes) console.log(n)
  for (const f of failures) console.log(f)
  if (failures.length) {
    console.error(`\n${failures.length} check(s) failed. Build stopped.\n`)
    process.exit(1)
  }
  console.log(`\nAll checks passed. Dataset SHA-256: ${sha256}\n`)
  process.exit(0)
}
