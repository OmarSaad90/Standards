# Step-by-Step Free Standards Explorer Build Plan

## Step 1 — Create a new web repository

Create:
`aedifica-free-standards-explorer-online`

Create:
- local
- staging
- production

Do not overwrite the locked v2.8.1 HTML.

**Done when:** placeholder staging deployment works.

---

## Step 2 — Load the public dataset

Use:
`data/public_data_v2_8_1_locked.json`

At build/startup verify:
- valid JSON
- schema passes
- 2,833 total records
- 2,775 current records
- unique UID
- unique code
- relationship total = supports + reinforces + next

**Done when:** build fails if any integrity check fails.

---

## Step 3 — Create a typed public model

Implement a strict `PublicStandard` model containing only approved public fields.

Do not pass raw arbitrary internal objects to the browser.

**Done when:** unknown/protected fields are rejected.

---

## Step 4 — Build public API/data access

Implement:
- `GET /api/public/meta`
- `GET /api/public/standards`
- `GET /api/public/standards/{code}`

Search/filter parameters:
- q
- subject
- grade
- status
- page
- page_size

Invalid values return deterministic 400 responses.

**Done when:** API matches `contracts/public_api_openapi_v1_0_0.yaml`.

---

## Step 5 — Build canonical public routes

Required:
- `/`
- `/standards`
- `/standards/{code}`
- `/subjects`
- `/subjects/{subject}`
- `/grades`
- `/grades/{grade-or-band}`
- `/about`

No login routes.
No Pro routes.
No paid routes.

**Done when:** every standard has a direct shareable URL.

---

## Step 6 — Build the homepage / Explorer entry

Include:
- Aedifica brand
- Standards Explorer title
- search box
- subject filter
- grade/band filter
- current/historical filter
- current-standard count
- indexed-standard count
- subject browse tiles

Use locked v2.8.1 as the design reference.

**Done when:** keyboard user can search and browse.

---

## Step 7 — Build search results

Each result shows:
- code
- title/label
- subject
- grade(s)
- status
- concise Aedifica View
- aggregate Supports/Reinforces/Next counts if desired
- link to standard detail

Persist filters/search/page in URL.

**Done when:** Back/Forward preserves search state.

---

## Step 8 — Build Standard Detail page

Show:
- code
- title
- subject
- grades
- status
- domain/framework
- source link
- source/version context
- Aedifica View
- framework lineage
- generic evidence signals
- aggregate Supports count
- aggregate Reinforces count
- aggregate Next count

Do not show exact connected standards.

**Done when:** one public page contains everything approved for Free and nothing protected.

---

## Step 9 — Build subject and grade index pages

`/subjects`
- all subject areas
- current counts

`/subjects/{subject}`
- standards in subject

`/grades`
- supported grades/bands

`/grades/{grade-or-band}`
- standards in that grade/band

**Done when:** users can browse without using search.

---

## Step 10 — Implement SEO

For every current standard:
- server-rendered HTML
- unique title
- unique description
- canonical URL
- Open Graph metadata
- sitemap entry

Also:
- sitemap.xml
- robots.txt
- internal links from subject/grade pages
- real 404 response

Do not rely on hash routes.

**Done when:** requesting a standard URL returns useful HTML without client JavaScript.

---

## Step 11 — Implement accessibility

Required:
- semantic landmarks
- keyboard navigation
- visible focus
- labels
- heading hierarchy
- live announcements for search results
- reduced motion
- contrast
- mobile reflow
- 200% zoom usability

Target WCAG 2.2 AA.
Do not claim conformance until separately audited.

---

## Step 12 — Implement privacy-conscious analytics

Recommended events:
- standards_search
- standards_filter_change
- standard_open
- source_link_open
- subject_open
- grade_open

Do not send protected data.
Do not send secrets.
Avoid sending full free-text searches to third parties unless approved.

---

## Step 13 — Add security/leakage tests

Scan:
- build output
- HTML
- JS bundles
- JSON
- API responses

Fail if protected relationship payload appears.

See `06_SECURITY_BOUNDARY.md`.

---

## Step 14 — Deploy to staging

Developer returns:
- staging URL
- commit SHA
- QA report
- public data hash
- leakage report

Test representative standards across all subjects.

---

## Step 15 — Production deployment

Deploy exact accepted commit.

Record:
- production URL
- commit SHA
- build ID
- data SHA
- deployment timestamp
- hosting/CDN settings
- security headers

---

## Step 16 — Production-origin acceptance

Test real site:
- homepage
- standards search
- representative standard pages
- invalid standard 404
- subject pages
- grade pages
- API
- sitemap
- robots
- HTTPS
- source links
- analytics

---

## Step 17 — Freeze release

After acceptance:
- tag release
- archive build
- record hashes
- archive QA report
- no silent public-data changes

Any public-data change becomes a new versioned release.
