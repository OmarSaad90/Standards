# Aedifica Standards Explorer v2.8.1 — Chromium Browser-Engine Acceptance

**Date:** 2026-08-17  
**Artifact:** `Aedifica_Standards_Explorer_v2_8_1_Public_Experience_Hardening.html`  
**Artifact SHA-256:** `33aa6f54f0aab185cc0c24b1347efa0a6e32e428fc8122a6fcfe9a81628a5be5`

## Verdict

**PASS — CHROMIUM / BROWSER-ENGINE ACCEPTANCE**

The locked v2.8.1 HTML was not modified.

Chromium was executed through Playwright using `/usr/bin/chromium`. The execution environment blocks direct `file://` and localhost navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, so deployment URL/network navigation could not be used as the loading mechanism.

To isolate that environment restriction from the product itself, the acceptance harness loaded the **exact production DOM**, injected the **complete embedded 2,833-record Public JSON payload**, and executed the **exact production JavaScript** inside a real Chromium page. This provides a valid browser-engine rendering and interaction pass, but it is not a claim of target-deployment HTTP/network E2E.

## Chromium checks passed

### Core rendering and navigation
- Search screen renders.
- Exactly five product screens are present.
- Exact-code search for `8.EE.C.7` returns the standard.
- Results status remains an `aria-live="polite"` region.
- Standard Detail opens with the correct standard code.
- Standard Detail updates the route to `#standard/8.EE.C.7`.
- Standard-specific document title is rendered.
- Standard-specific meta description is rendered.
- Canonical-link state carries the standard route.
- Focus moves to the Standard Detail screen.

### Learning / commercial seam
- Learning Around opens at `#learning/8.EE.C.7`.
- Focus moves to the Learning Around screen.
- The Public learning-shape / Pro conversion treatment renders.
- No `commercial-rel:*` identifier is exposed in the tested Public Learning view.
- Relationship Detail Pro preview opens at `#relationship/8.EE.C.7`.
- The selected standard remains associated with the gate.
- Focus moves to the Relationship Detail screen.

### Direct-route startup
Fresh Chromium initialization with the route already present passed for:
- `#standard/8.EE.C.7`
- `#learning/8.EE.C.7`
- `#relationship/8.EE.C.7`

Each restored the intended screen and selected standard with no console or page errors.

### Route guards
- Top-level `#relationship` works without a selected standard.
- Standard and Learning Around breadcrumbs are hidden when unavailable.
- Invalid `#standard/NOT-A-REAL-CODE` falls back to Search and normalizes the route to `#search`.

### Dual-band filtering
`SEP-1`, which belongs to both bands, is returned in Chromium under:
- Grades 6–8
- Grades 9–12

### Responsive Chromium layout
Fresh Chromium rendering passed without horizontal overflow at:
- **1440 × 1000** — scroll width 1440 / viewport 1440
- **1024 × 768** — scroll width 1024 / viewport 1024
- **390 × 844** — scroll width 390 / viewport 390

The active product screen remained visible at the tested viewports.

### Runtime quality
- No Chromium console errors in the tested core flow.
- No Chromium page errors in the tested core flow.
- No console/page errors in the tested direct-route initializations, top-level Pro route, invalid-route fallback, or dual-band filter checks.

## Claim boundary

This report **supersedes the earlier statement that no Chromium/browser-engine pass could be claimed**.

A Chromium/browser-engine pass **can now be claimed for v2.8.1 rendering, client-side interaction, routing logic, responsive layout at the tested viewports, and tested accessibility behavior**.

The following are still separate deployment concerns and are **not** implied by this browser-engine pass:

- target-host HTTP/network E2E;
- production CDN/cache/header behavior;
- production analytics;
- external-link availability;
- full WCAG conformance audit;
- search-engine crawler behavior.

## SEO recommendation

Production server-rendered/indexable per-standard URLs remain preferable for full SEO, reliable social previews, crawler discoverability, and canonical URL behavior.

The standalone v2.8.1 hash routes are appropriate for shareable/reloadable client-side state, but they do not replace a production server-rendered standards URL architecture.

## Accepted statement

> **Aedifica Standards Explorer v2.8.1 has passed Chromium browser-engine acceptance for its standalone Public Experience implementation. Production server-rendered per-standard URLs remain the preferred deployment architecture for full SEO.**
