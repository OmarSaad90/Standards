# Aedifica Free Standards Explorer Online

Public, no-login search for New Jersey Grades 6–12 education standards.

Built to the specification in `handoff/`, the client-supplied developer handoff v1.0.0.
Release 1.0.0, public dataset v2.8.1.

---

## Scope

This deployment contains **only** public data. It does not contain, and must never
contain, Aedifica Pro, authentication, paid entitlements, Expanded/Disputed/Quarantine
relationship records, customer curriculum overlays, or the protected relationship graph.

The `/pro` page is marketing copy describing what Pro would provide. It has no
functionality and reads no protected data.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3100
npm run build      # runs verify:data, then builds, then scan:leakage
npm start
npm run typecheck
```

`npm run build` is gated on both sides:

- **prebuild** runs `scripts/verify-data.mjs`. Fourteen integrity checks against the
  dataset. A failure stops the build.
- **postbuild** runs `scripts/leakage-scan.mjs`. Scans every deployable asset for
  protected tokens and writes `reports/leakage-report.txt`. A hit stops the build.

Neither can be skipped by building normally, which is the point.

---

## Deployment

Netlify, from `github.com/OmarSaad90/Standards`. This is its own repository and its
own Netlify site, entirely separate from the edfca.com marketing site.

| Setting | Value |
|---|---|
| Base directory | *(leave empty, repo root is the project root)* |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | 22 |

`netlify.toml` already declares the build command, publish directory, Node version,
and the Next.js runtime plugin, so connecting the repo should need no manual setup.

**Set `NEXT_PUBLIC_SITE_URL`** to the live origin once the domain exists. Canonical
URLs, Open Graph URLs, and `sitemap.xml` all derive from it. See `.env.example`.

This project deliberately does **not** use `output: 'export'`. The public API contract
requires live route handlers with query parsing and real 400 responses.

---

## Layout

```
handoff/       client-supplied spec, contracts, dataset and audit reports (read-only)
data/          the locked v2.8.1 public dataset, byte-identical to handoff/data/
scripts/       build gates (integrity + leakage)
src/lib/       data loading, search, slugs, serialisation
src/app/       routes
src/components/ shared UI
reports/       generated at build time, gitignored
```

### Routes

| Route | Rendering |
|---|---|
| `/` | static |
| `/standards` | dynamic (reads query params) |
| `/standards/{code}` | **static, all 2,833 pre-rendered** |
| `/standards/{code}/learning` | dynamic |
| `/subjects`, `/subjects/{subject}` | static |
| `/grades`, `/grades/{grade-or-band}` | static |
| `/pro`, `/about` | dynamic / static |
| `/api/public/meta` | static |
| `/api/public/standards` | dynamic |
| `/api/public/standards/{code}` | dynamic |

The 2,833 standard detail pages are the pages that rank, so they are pre-rendered.
Learning pages are rendered on demand: pre-rendering them would double the build for
a view carrying no crawlable information the detail page does not already expose.

---

## Search

Ranking is ported verbatim from the locked prototype so public result order matches
the artifact the client accepted: exact code 100, code prefix 45, code substring 25,
label 18, Aedifica View 12, domain 10, then per-token bonuses.

One deliberate change, in `src/lib/codes.ts`: dash variants are folded before
comparison. See "Known data issue" below.

---

## Known data issue in the locked dataset

485 of the 2,833 codes (17%) use **U+2010 HYPHEN** rather than ASCII hyphen-minus,
and one code (`9.3. 12.ED‐TT.7`) carries a stray space.

In the locked prototype this silently breaks exact-code search for all 485. Its
normaliser maps U+2010 to a space, so the stored code becomes `9.3.12.ac cst.1`
while a user typing the same code produces `9.3.12.ac-cst.1`, and the two never match.

Handled here without touching the dataset:

1. URL slugs fold U+2010 to `-` and drop whitespace, so `/standards/9.3.12.AC-CST.1`
   works. Verified zero slug collisions across all 2,833 codes.
2. Lookup and search fold every common dash variant before comparing, so both the
   typed form and the stored form resolve.

**This is worth reporting upstream.** The cleanest long-term fix is normalising the
codes in the next public data export.

---

## Accessibility

Built targeting WCAG 2.2 AA. Per `07_SEO_ACCESSIBILITY_ANALYTICS.md`, **no conformance
claim is made** until an independent audit is done, and `/about` says so plainly.

Two deliberate departures from the prototype, both marked in `globals.css`:

- Focus rings restored. The prototype set `outline:none` on subject tiles.
- Search is a native GET form, not JavaScript. The URL is the entire state, so
  Back/Forward, deep links, and no-JS browsing all work without custom code.

---

## Changing the data

Don't, in place. `10_DEFINITION_OF_DONE.md` and `09_DEPLOYMENT_RUNBOOK.md` both require
that any public-data change becomes a new versioned release, not a silent update.

To ship new data: drop in the new export, update `EXPECTED_SHA256`, `EXPECTED_TOTAL`,
and `EXPECTED_CURRENT` in `scripts/verify-data.mjs`, update `DATA_VERSION` in
`src/lib/config.ts`, bump the release version, rebuild, and re-run acceptance.

---

## Still open

- Whether `/pro` gets a contact or waitlist CTA. It is currently a dead end, exactly as
  in the prototype. Marked with a comment in `src/app/pro/page.tsx`.
- Fonts. The prototype asks for Canela and Söhne, both commercially licensed. The
  client's own fallback stacks (Georgia, Arial) are in place and render fine.
- Analytics. Six events are named in the handoff; no tool has been chosen.
- Independent accessibility audit.
