# QA Report — Aedifica Free Standards Explorer Online v1.0.0

**Date:** 2026-08-19
**Build:** local production build (`npm run build`, then `next start -p 3100`)
**Public dataset SHA-256:** `4a613c9bcb34c91635966f9e7a6c3f319499a6f925e556873320fc895423c142`
**Dataset:** v2.8.1 locked, 2,833 records / 2,775 current

Structured against `08_QA_CHECKLIST.md`. Every line is marked with what was actually
executed. Items that could not be executed in this environment are marked OPEN rather
than passed, and are listed again at the end.

---

## 2026-09-21 — dataset and spec migration, checklist below is STALE

The site now ships `handoffv2/02_PUBLIC_DATA/public_standards_phase1_v1_0_7.json`
(2,836 records / 2,757 current), built against `handoffv2/` (dated 2026-09-20), which
supersedes the original `handoff/` package referenced throughout this document. Changes
since the checklist below was last run: dataset and field-shape swap, `/pro` and
`/standards/[code]/learning` removed (Pro is out of scope for this phase), a new
official-ELA-text block added, and `/subjects/`, `/grades/` restructured to
`/standards/subject/`, `/standards/grade/`.

**Every PASS row below was verified against the old v2.8.1 build and has not been
re-run against this migration.** Specific claims (exact search results, per-record
relationship counts, sitemap URL totals) are almost certainly now wrong in detail even
where the underlying behavior still holds. Treat this whole checklist as pending
re-verification, not as current evidence, until a fresh pass is run and dated.

---

## Data

| Check | Result | Evidence |
|---|---|---|
| JSON parses | PASS | `scripts/verify-data.mjs`, automated at every build |
| Schema passes | PASS | strict key allow-list; unknown keys throw at load |
| 2,833 total | PASS | verified |
| 2,775 current | PASS | verified |
| Unique code | PASS | 2,833 unique |
| Unique UID | PASS | 2,833 unique |
| Relationship totals reconcile | PASS | 0 mismatches across all 2,833 |

Additional checks added beyond the checklist: dataset SHA-256 matches
`HANDOFF_MANIFEST.json`; `meta.areas` counts sum to `current_count` (2,775); relationship
counts are non-negative integers; every record carries all 17 required fields.

These run as `prebuild`. A failure stops the build.

---

## Search

| Check | Result | Evidence |
|---|---|---|
| Exact code | PASS | `?q=8.EE.C.7` returns 8.EE.C.7 ranked first |
| Prefix | PASS | prefix weighting ported verbatim from locked v2.8.1 |
| Keyword | PASS | `?q=linear+equations` returns matches |
| Subject filter | PASS | `subject=Mathematics` |
| Grade filter | PASS | `grade=6-8`, plus band membership for middle/high |
| Status filter | PASS | current / historical / all |
| Combined filters | PASS | exercised through both page and API routes |
| Pagination | PASS | real links, `rel="prev"`/`rel="next"` |
| Invalid input returns 400 | PASS | 7 invalid-parameter cases, all 400, see below |
| Back/Forward state | PASS by construction | search is a native GET form; the URL is the entire state, so history is browser-owned |

**Invalid-parameter cases verified:** `status=bogus`, `page=0`, `page=abc`,
`page_size=999`, `subject=Wizardry`, `grade=13`, `band=elementary`. All returned `400`
with a deterministic body naming the parameter, the reason, and the allowed values.

---

## Standard page

| Check | Result | Evidence |
|---|---|---|
| Valid standard 200 | PASS | `/standards/8.EE.C.7` |
| Invalid standard 404 | PASS | `/standards/NOT-A-REAL-CODE` returns a real 404 |
| Source correct | PASS | source URL and source-kind note render from the record |
| Aedifica View correct | PASS | rendered verbatim from `aedifica_view` |
| Framework context correct | PASS | state authority and national lineage rendered separately, each with its own claim boundary |
| Evidence signals correct | PASS | rendered from `generic_evidence_signals` |
| Counts correct | PASS | Supports 5 / Reinforces 0 / Next 8 on 8.EE.C.7, matching the dataset |
| No exact endpoints | PASS | no connected-standard identity exists in the payload to render |

---

## Boundary

| Check | Result | Evidence |
|---|---|---|
| No commercial relationship IDs | PASS | leakage scan, 16 tokens, 5,783 files, 121.6 MB |
| No endpoint pairs | PASS | same |
| No Expanded data | PASS | same |
| No Disputed data | PASS | same |
| No Quarantine data | PASS | same |
| No customer overlays | PASS | same |
| Leakage scan passes | PASS | `reports/leakage-report.txt`, runs as `postbuild` |

Enforced twice, independently: the loader refuses any record carrying a non-public key,
and the post-build scan fails the build if a protected token reaches a deployable asset.

---

## SEO

| Check | Result | Evidence |
|---|---|---|
| SSR page HTML | PASS | `curl` with no JavaScript returns full standard content |
| Canonical | PASS | per-page canonical present |
| Title | PASS | unique per standard, `{CODE} · {Label}` |
| Description | PASS | unique per standard, from the Aedifica View, capped at 220 chars |
| Open Graph | PASS | title, description, URL, type per page |
| Sitemap | PASS | 2,857 URLs (2,833 standards + 9 subjects + 9 grades + 6 static) |
| Robots | PASS | allows the site, disallows `/api/`, names the sitemap |
| 404 | PASS | real 404 status, useful page with search |

No hash routes anywhere. Every screen has a real server address.

---

## Accessibility

| Check | Result |
|---|---|
| Automated scan | **OPEN** — not run |
| Keyboard pass | **OPEN** — not manually walked |
| Visible focus | PASS by construction — single `:focus-visible` rule sitewide; the prototype's `outline:none` on subject tiles was removed |
| Labels | PASS — every control labelled, visually-hidden where the design has no visible label |
| Headings | PASS — one `h1` per page, no skipped levels |
| Live announcements | PASS — `aria-live="polite"` on result summaries |
| Contrast | **OPEN** — not measured |
| Reduced motion | PASS — `prefers-reduced-motion` block retained from the prototype |
| 200% zoom | **OPEN** — not measured |

No WCAG conformance is claimed. `/about` states this explicitly.

---

## Browser

| Check | Result |
|---|---|
| Chromium | **OPEN** |
| Safari/WebKit | **OPEN** |
| Firefox | **OPEN** |
| Mobile viewport | **OPEN** |
| No console errors | **OPEN** |

Not executed. Note that the locked v2.8.1 artifact already holds a Chromium
browser-engine acceptance, and the CSS here is a direct port, but that certification
covers the prototype, not this build. Real browser testing is still owed.

---

## Production

| Check | Result |
|---|---|
| HTTPS | **OPEN** — no deployment yet |
| Security headers | PARTIAL — `nosniff`, `Referrer-Policy`, `X-Frame-Options` set in `next.config.ts`; CSP and HSTS still to be added at the platform layer |
| No secrets | PASS — no secrets exist; `.env.example` documents the single public variable |
| Staging smoke | **OPEN** |
| Production smoke | **OPEN** |
| Source links sampled | **OPEN** — the dataset holds 2,833 outbound NJDOE links; none have been checked for liveness |

---

## Finding raised against the locked dataset

**485 of 2,833 codes (17%) use U+2010 HYPHEN instead of ASCII hyphen-minus**, and one
code (`9.3. 12.ED‐TT.7`) contains a stray space.

In the locked prototype this silently breaks exact-code search for all 485 records: its
normaliser converts U+2010 to a space, so the stored code and a typed code can never
match. Reproduced directly against the prototype's own logic.

Handled in this build without altering the dataset: dash variants are folded before
comparison, and URL slugs use ASCII hyphens (zero collisions across all 2,833 codes).
Verified that `/standards/9.3.12.AC-CST.1` resolves and that
`?q=9.3.12.AC-CST.1` returns exactly one result.

Recommend normalising the codes in the next public data export.

---

## Second finding raised against the locked dataset

**Public Supports/Reinforces/Next counts include all 3,653 relationships**, not just
the 2,904 the client's own Free Public Count Policy v1.0.1 designates as public-eligible
(`DEFAULT` status). The remaining 749 (`EXPANDED_OPT_IN`, `DISPUTED_OPT_IN`,
`GOVERNANCE_HISTORY_ONLY`) should contribute zero per that policy but are currently
counted.

Not fixable in this build: the export carries only aggregate totals per standard, with
no per-relationship status label, so there is no way to identify which relationships to
exclude. Requires a reissued export partitioned by status, or explicit confirmation from
the client that all-tier counts are acceptable.

Reported to the client 2026-08-20; awaiting reply. Shipping with all-tier counts in the
meantime as a disclosed, reversible decision, not a silent gap.

---

## Summary

Everything testable without a browser or a deployment passes. What remains is real
browser testing across three engines, an accessibility audit, outbound-link sampling,
and staging plus production smoke tests once a host exists.
