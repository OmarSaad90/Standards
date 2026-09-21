# Aedifica Free Standards Explorer
# COMPLETE DEVELOPER HANDOVER — Phase 1

**Handover version:** v1.2  
**Scope:** Free Standards Explorer only  
**Reference:** `01_REFERENCE/Free_Standards_Explorer_v1_0_7_Standards_Only_Developer_Candidate.html`  
**Reference SHA-256:** `3f54bdc7e9a1c8eaae2ac2c8f7c460584bcda23ee41e6ed85ba9f8113dc2b0bb`

## What to build

Build the production Aedifica Free Standards Explorer from the supplied reference and sanitized public data.

### Preserve exactly
- 2,836 standards
- 2,757 current
- 79 non-current
- 1,420 Supports
- 2,424 Reinforces
- 1,420 Next
- 5,264 aggregate endpoint incidences
- 218 ELA records
- 160 current ELA
- 58 historical ELA
- 160/160 current official ELA source markers
- 40 ELA standards with official subcomponents
- 183 official ELA component items
- 192 NJDOE Math PCS direct public source pairs

### Phase 1 relationship behavior

Keep aggregate Supports / Reinforces / Next visible.

The CTA must remain:

**Relationship intelligence coming soon**

Do not implement a live relationship graph or reveal exact connected standards.

### Explicitly excluded

This package contains no Source Graph Preview, no exact relationship topology, no paid Source Graph, no Pro, no School, no District, and no customer curriculum intelligence.

### Production public-data source

Use:

`02_PUBLIC_DATA/public_standards_phase1_v1_0_7.json`

Do not expose legacy fields `app_count`, `programs`, or `curriculum_preview`.

### Required developer reading order

1. `MASTER_HANDOVER.md`
2. `05_DEVELOPER_INSTRUCTIONS/MASTER_STEP_BY_STEP_BUILD_GUIDE.md`
3. `STEP_TO_FILE_MAP.md`
4. `FILE_INVENTORY.md`
5. Supporting files referenced by each step
6. `DEVELOPER_HANDBACK_REQUIREMENTS.md` before requesting approval

---

# MASTER 50-STEP IMPLEMENTATION SEQUENCE

# MASTER STEP-BY-STEP DEVELOPER HANDOFF
## Aedifica Free Standards Explorer — Phase 1

Follow these steps in order.

### STEP 1 — Verify the handoff package
Verify `SHA256SUMS.txt`, confirm the reference HTML hash, and record it in the production repository README.

**Deliverable:** written hash-verification note.

### STEP 2 — Read the Phase 1 scope
Read `01_SCOPE_AND_NON_GOALS.md` and the governance-lineage document. Build only the Free Standards Explorer.

**Do not build:** Source Graph Preview, exact relationship topology, paid Source Graph, Pro, School, District, or customer curriculum intelligence.

**Deliverable:** `PHASE_1_SCOPE.md` in the repo.

### STEP 3 — Preserve the reference unchanged
Commit `01_REFERENCE/Free_Standards_Explorer_v1_0_7_Standards_Only_Developer_Candidate.html` under `/reference/`. Do not edit it.

**Deliverable:** exact reference file committed.

### STEP 4 — Create the production application
Recommended: Next.js App Router + TypeScript + strict typing + ESLint + lockfile + CI.

**Deliverable:** clean app that builds from a fresh checkout.

### STEP 5 — Load the Phase 1 public dataset
Use `02_PUBLIC_DATA/public_standards_phase1_v1_0_7.json`.

**Required totals:** 2,836 standards; 2,757 current; 79 non-current; Supports 1,420; Reinforces 2,424; Next 1,420.

**Deliverable:** typed data loader.

### STEP 6 — Enforce the public field allowlist
Use `02_PUBLIC_DATA/phase1_field_allowlist.json`.

Do not expose `app_count`, `programs`, or `curriculum_preview`.

**Deliverable:** typed `StandardRecord`.

### STEP 7 — Run supplied data validators
Run the supplied Python and/or Node validator before UI work.

**Deliverable:** PASS log.

### STEP 8 — Create the required routes
Implement `/`, `/standards/`, `/standards/[slug]/`, `/standards/subject/[area]/`, `/standards/grade/[band]/`.

Use the supplied route manifest. Do not create a live `/relationships/` route.

**Deliverable:** route skeleton resolving.

### STEP 9 — Build design tokens
Translate the reference colors, typography, spacing, subject identities, grade identities, and focus styles into maintainable tokens.

**Deliverable:** reusable design-system layer.

### STEP 10 — Build the header
Show **Relationship intelligence coming soon** as a non-live state.

**Deliverable:** header with no relationships link.

### STEP 11 — Build the hero and collection ledger
Show the exact public totals and nine content areas.

**Deliverable:** hero/ledger matching the reference.

### STEP 12 — Build the NJDOE source-evidence section
Keep published-source evidence separate from Aedifica relationship signals.

**Deliverable:** source-evidence component.

### STEP 13 — Build the search console
Implement code/text search, Search, Clear, Subject, Grade/band, Status, and active-filter chips. Default to Current Only.

**Deliverable:** working search console.

### STEP 14 — Implement search behavior
Search must match standard code and standard text and combine correctly with filters.

**Deliverable:** automated search tests.

### STEP 15 — Implement all nine subject filters
Use exact dataset area keys.

**Deliverable:** nine passing subject-filter tests.

### STEP 16 — Implement all seven grade/band filters
Support 6, 7, 8, 6-8, 9-10, 9-12, 11-12.

**Deliverable:** seven passing grade tests.

### STEP 17 — Implement status filtering
Support Current Only, Non-Current Only, Current + Non-Current.

**Deliverable:** three passing status tests.

### STEP 18 — Test combined filters
Test subject + grade + status + search combinations.

**Deliverable:** combined-filter tests.

### STEP 19 — Build result rows
Show subject identity, code, label, grade/band, status, Supports, Reinforces, Next.

**Deliverable:** reusable result-row component.

### STEP 20 — Build pagination
Keep result count, Previous/Next, and page state synchronized.

**Deliverable:** pagination tests.

### STEP 21 — Implement URL state
Support `q`, `area`, `grade`, `status`, `page`, `standard`.

**Deliverable:** pasted URLs reproduce state.

### STEP 22 — Implement browser Back/Forward
History navigation must restore filters/detail state.

**Deliverable:** history QA test.

### STEP 23 — Build the subject collection grid
Render nine subject cards with correct totals.

**Deliverable:** nine working cards.

### STEP 24 — Build the grade register
Render seven grade/band entries. Do not imply prerequisite sequencing.

**Deliverable:** seven working controls.

### STEP 25 — Build the standard-detail dialog
Show code, wording, subject, grade/band, status, framework, source, Aedifica View, evidence, and aggregate relationship counts.

**Deliverable:** accessible dialog.

### STEP 26 — Implement current ELA official-text treatment
For all 160 current ELA records show official 2023 wording, the official badge, lettered components where present, and Aedifica View separately.

**Deliverable:** all 160 current ELA records correct.

### STEP 27 — Validate ELA components
Expected: 40 standards with official components and 183 component items.

**Deliverable:** automated 40/183 assertion.

### STEP 28 — Preserve historical ELA
Keep all 58 historical companion records non-current.

**Deliverable:** historical ELA QA.

### STEP 29 — Implement public evidence signals
Display only supplied generic public evidence signals.

**Deliverable:** evidence block.

### STEP 30 — Implement framework context
Use only supplied public framework/version metadata.

**Deliverable:** framework block.

### STEP 31 — Implement source links
Use the supplied `source_url` values and verify examples from all nine subjects.

**Deliverable:** source-link QA.

### STEP 32 — Preserve aggregate relationship counts
Keep Supports/Reinforces/Next visible. Required totals: 1,420 / 2,424 / 1,420.

**Deliverable:** regression test.

### STEP 33 — Implement the relationship coming-soon CTA
Text must be **Relationship intelligence coming soon**. It must not navigate or reveal exact relationships.

**Deliverable:** non-navigating CTA.

### STEP 34 — Build all 2,836 canonical standard pages
Each must contain crawlable public standard content.

**Deliverable:** 2,836 generated routes.

### STEP 35 — Build all nine subject landing pages
Use the route manifest.

**Deliverable:** 9 subject pages.

### STEP 36 — Build all seven grade/band landing pages
Use the route manifest.

**Deliverable:** 7 grade/band pages.

### STEP 37 — Add SEO
Create unique metadata, canonical URLs, sitemap, robots behavior, and crawlable content.

**Deliverable:** SEO audit.

### STEP 38 — Add accessibility
Keyboard support, visible focus, dialog focus control, Escape close, return focus, accessible labels, live result announcements, reduced motion, no color-only meaning. Target WCAG 2.1 AA.

**Deliverable:** accessibility report.

### STEP 39 — Add analytics
Track Free-product behavior only: search, filter, result open, source-link open, coming-soon interest.

**Deliverable:** analytics event specification.

### STEP 40 — Add error handling
Handle missing routes, bad query params, malformed state, and data-load failures.

**Deliverable:** tested error states.

### STEP 41 — Optimize performance
Do not deploy the single-file reference as the production architecture. Optimize rendering, caching, client bundle size, layout stability, and third-party scripts.

**Deliverable:** staging performance report.

### STEP 42 — Run the full QA checklist
Use `10_QA_ACCEPTANCE_TESTS.md`.

**Deliverable:** completed QA checklist.

### STEP 43 — Run browser testing
Test Chrome/Chromium, Safari, Firefox, and mobile widths.

**Deliverable:** browser matrix.

### STEP 44 — Deploy staging
Deploy to a non-production URL.

**Deliverable:** staging URL + deployment/build ID.

### STEP 45 — Prepare owner-review screenshots
Capture home, search, filtered results, detail, current ELA with components, historical ELA, Math PCS, subject page, grade page, mobile, and coming-soon state.

**Deliverable:** screenshot set.

### STEP 46 — Prepare the developer handback report
Send staging URL, Git SHA, deployment ID, QA report, browser matrix, accessibility report, known deviations, screenshots, and confirmation no exact relationship topology is exposed.

**Deliverable:** handback package.

### STEP 47 — Owner review
Do not promote until owner approval.

**Deliverable:** approval or revision list.

### STEP 48 — Production deployment
After approval, attach production domain, verify DNS/TLS, deploy, verify sitemap/robots/analytics, and run smoke tests.

**Deliverable:** production deployment record.

### STEP 49 — Post-launch verification
Verify counts, routes, ELA components, source links, filters, and the coming-soon relationship state.

**Deliverable:** post-launch smoke-test report.

### STEP 50 — Governance closeout
Deployment does not automatically create an Aedifica formal lock. Do not claim lock, independent audit, NJDOE approval, or full WCAG certification unless separately completed.

**Final deliverable:** production Free Standards Explorer ready for the next owner governance decision.


---

# Final acceptance boundary

Before owner review, the developer must complete the supplied QA checklist and return the items in `DEVELOPER_HANDBACK_REQUIREMENTS.md`.

A successful deployment does not itself establish formal Aedifica lock, independent audit, NJDOE approval, educator approval, or full WCAG certification.

**Final instruction:** Build only the Free Standards Explorer. Preserve the supplied public standards intelligence and aggregate counts. Keep relationship intelligence itself in the non-live coming-soon state.
