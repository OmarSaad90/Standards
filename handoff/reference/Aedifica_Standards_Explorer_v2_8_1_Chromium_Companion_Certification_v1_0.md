# Aedifica Standards Explorer v2.8.1 — Chromium Companion Certification v1.0

**Date:** 2026-08-17  
**Status:** **LOCKED COMPANION CERTIFICATION**  
**Scope:** Governance-only. No locked v2.8.1 artifact is modified.

## Certified subject

- `Aedifica_Standards_Explorer_v2_8_1_Public_Experience_Hardening.html`  
  SHA-256: `33aa6f54f0aab185cc0c24b1347efa0a6e32e428fc8122a6fcfe9a81628a5be5`
- `Aedifica_Standards_Explorer_v2_8_1_Public_Experience_Hardening_Build.zip`  
  SHA-256: `88706b6106eb4da5cdb627aeeb164f679c54f4829cc85a0fe35b97c8ac618caf`
- `Aedifica_Standards_Explorer_v2_8_1_Acceptance_Audit.md`  
  SHA-256: `c71cb57de5bae57641b41975d4a937774fbe7f0d9f8b67621c646803c051e4bc`

## Authoritative certification evidence

- `Aedifica_Standards_Explorer_v2_8_1_Chromium_Browser_Engine_Acceptance.md`  
  SHA-256: `8e17a43741c480076642e43f68aa6b86208c1b9c7ed9879432c0cba68057d2fc`
- `Aedifica_Standards_Explorer_v2_8_1_Post_Chromium_Independent_Audit_v1_0.md`  
  SHA-256: `b541e438f5a0125e98e5057f102f03a800affcc322b2730c517ca018c4d93be2`  
  Independent post-Chromium audit: **33/33 PASS**

## Governance ruling

This companion certification formally reconciles the timing mismatch between the original locked v2.8.1 package and the later Chromium acceptance.

The original v2.8.1 package was correctly locked before the Chromium browser-engine pass occurred. Therefore its manifest and original acceptance audit still contain the earlier statement that no browser-engine pass was claimed.

**For browser-engine claim status only, those earlier statements are superseded by this companion certification and the authoritative Chromium sidecar.**

No other v2.8.1 acceptance result is superseded or altered.

## Accepted browser-engine claim

> **Aedifica Standards Explorer v2.8.1 has passed Chromium browser-engine rendering and client-side interaction acceptance using the exact locked standalone HTML. Target-host HTTP/network E2E remains a separate deployment verification. Production server-rendered per-standard URLs remain preferred for full SEO.**

## Claim boundary

This certification supports:
- Chromium/browser-engine rendering;
- client-side interaction;
- tested routing/history behavior;
- tested responsive layouts;
- tested focus/live-region behavior;
- absence of Chromium console/page errors in the documented tested flows.

This certification does **not** claim:
- target-host HTTP/network E2E;
- production CDN/cache/header behavior;
- crawler/indexing behavior;
- external-link availability;
- full WCAG conformance.

Production server-rendered/indexable per-standard URLs remain preferred for full SEO.

## Immutability

The locked v2.8.1 HTML, build ZIP, and original acceptance audit remain unchanged. Any future browser, deployment, SEO, accessibility, or network certification must be created as a separate versioned companion artifact.
