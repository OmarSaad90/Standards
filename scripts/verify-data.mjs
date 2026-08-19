#!/usr/bin/env node
/**
 * Build gate. Implements 02_STEP_BY_STEP_FREE_BUILD_PLAN.md Step 2:
 * "Done when: build fails if any integrity check fails."
 *
 * Runs as `prebuild`, so `npm run build` cannot succeed on a bad dataset.
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const ROOT = path.resolve(import.meta.dirname, '..')
const DATA = path.join(ROOT, 'data', 'public_data_v2_8_1_locked.json')

const EXPECTED_TOTAL = 2833
const EXPECTED_CURRENT = 2775
const EXPECTED_SHA256 = '4a613c9bcb34c91635966f9e7a6c3f319499a6f925e556873320fc895423c142'

const ALLOWED_KEYS = new Set([
  'uid', 'code', 'area', 'area_name', 'label', 'grades', 'current', 'status',
  'domain', 'frameworks', 'versions', 'source_url', 'source_url_kind',
  'aedifica_view', 'generic_evidence_signals', 'relationship_signals',
  'framework_lineage',
])

const failures = []
const notes = []
const check = (label, ok, detail = '') => {
  if (ok) notes.push(`  PASS  ${label}${detail ? ` (${detail})` : ''}`)
  else failures.push(`  FAIL  ${label}${detail ? ` (${detail})` : ''}`)
}

let buf
try {
  buf = fs.readFileSync(DATA)
} catch {
  console.error(`\nFATAL: dataset missing at ${DATA}\n`)
  process.exit(1)
}

const sha256 = crypto.createHash('sha256').update(buf).digest('hex')
check('dataset SHA-256 matches HANDOFF_MANIFEST.json', sha256 === EXPECTED_SHA256, sha256)

let payload
try {
  payload = JSON.parse(buf.toString('utf8'))
  check('JSON parses', true)
} catch (err) {
  check('JSON parses', false, err.message)
  report()
}

const rows = payload.standards ?? []
check('meta.version is 2.8.1', payload.meta?.version === '2.8.1', String(payload.meta?.version))
check(`total records = ${EXPECTED_TOTAL}`, rows.length === EXPECTED_TOTAL, String(rows.length))

const current = rows.filter((r) => r.current === true).length
check(`current records = ${EXPECTED_CURRENT}`, current === EXPECTED_CURRENT, String(current))

check('meta.total_count agrees', payload.meta?.total_count === rows.length)
check('meta.current_count agrees', payload.meta?.current_count === current)

const codes = new Set(rows.map((r) => r.code))
check('all codes unique', codes.size === rows.length, `${codes.size} unique`)

const uids = new Set(rows.map((r) => r.uid))
check('all UIDs unique', uids.size === rows.length, `${uids.size} unique`)

const badTotals = rows.filter((r) => {
  const s = r.relationship_signals ?? {}
  return s.total !== (s.supports ?? 0) + (s.reinforces ?? 0) + (s.next ?? 0)
})
check('relationship total = supports + reinforces + next', badTotals.length === 0,
  badTotals.length ? `${badTotals.length} mismatched` : 'all 2833 reconcile')

const negative = rows.filter((r) => {
  const s = r.relationship_signals ?? {}
  return [s.supports, s.reinforces, s.next, s.total].some((n) => typeof n !== 'number' || n < 0)
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

const missing = rows.filter((r) => [...ALLOWED_KEYS].some((k) => !(k in r)))
check('every record carries all required fields', missing.length === 0,
  missing.length ? `${missing.length} incomplete` : '')

const areaSum = (payload.meta?.areas ?? []).reduce((n, a) => n + a.count, 0)
check('meta.areas counts sum to current_count', areaSum === current, `${areaSum} vs ${current}`)

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
