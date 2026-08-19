# Aedifica Standards Explorer v2.8.1 — Post-Chromium Independent Audit v1.0

**Date:** 2026-08-17  
**Locked HTML SHA-256:** `33aa6f54f0aab185cc0c24b1347efa0a6e32e428fc8122a6fcfe9a81628a5be5`  
**Locked ZIP SHA-256:** `88706b6106eb4da5cdb627aeeb164f679c54f4829cc85a0fe35b97c8ac618caf`  
**Chromium sidecar SHA-256:** `8e17a43741c480076642e43f68aa6b86208c1b9c7ed9879432c0cba68057d2fc`

## Verdict

**CONDITIONAL PASS — TECHNICAL BROWSER EVIDENCE ACCEPTABLE; GOVERNANCE DOCUMENTATION REQUIRES RECONCILIATION**

The locked v2.8.1 HTML and build package remain internally intact. The public/protected data boundary remains sound, the v2.8.1 hardening remains present, and the supplementary Chromium report is cryptographically tied to the exact locked HTML.

The Chromium evidence supports a **narrow browser-engine claim** for rendering and client-side interaction using the exact locked HTML executed in Chromium. The report correctly excludes target-host HTTP/network E2E, CDN/header behavior, crawler behavior, external-link availability, and a full WCAG conformance audit.

However, the current authoritative record is internally inconsistent:

- the locked build manifest says `"browser_engine_pass_claimed": false`;
- the locked acceptance audit says no browser-engine rendering pass is claimed;
- the later Chromium sidecar says **PASS — CHROMIUM / BROWSER-ENGINE ACCEPTANCE**.

Because the locked package must not be modified, this should be resolved through a **governed supplementary certification sidecar**, not by rewriting v2.8.1.

## Findings

### F-01 — HIGH — Authoritative governance record is contradictory

The browser pass occurred **after** v2.8.1 was locked. The locked ZIP therefore still contains the original pre-Chromium status. The later browser report legitimately supersedes that status technically, but it is outside the locked package.

**Required governance action:** designate the Chromium acceptance report as an authoritative locked companion certification to v2.8.1, or create a small versioned certification bundle/manifest that pins:
1. the locked v2.8.1 HTML hash;
2. the locked v2.8.1 ZIP hash;
3. the original acceptance-audit hash;
4. the Chromium sidecar hash;
5. the precise claim boundary.

Do not modify the locked v2.8.1 artifacts.

### F-02 — MAJOR — Browser claim must retain the loading-method boundary

The Chromium report used the exact production DOM, full 2,833-record payload, and exact production JavaScript, but loaded them in-memory because the environment blocked direct `file://` and localhost navigation.

That is sufficient for a browser-engine rendering/client-interaction claim. It is **not** sufficient for:
- target-host network/navigation E2E;
- production response headers/cache/CDN behavior;
- production canonical-URL resolution;
- crawler/indexing behavior.

The report itself states these limits correctly. Public-facing language should preserve them.

### F-03 — CONTROLLED — SEO deployment work remains open

The v2.8.1 client routes are shareable/reloadable and support dynamic metadata, but production server-rendered/indexable per-standard URLs remain preferable for full SEO and social-preview reliability.

This is not a v2.8.1 data or browser defect; it remains a deployment-layer enhancement.

## Technical re-verification

**33/33 audit checks passed.**

- PASS — **Locked HTML hash matches accepted v2.8.1 hash** — 33aa6f54f0aab185cc0c24b1347efa0a6e32e428fc8122a6fcfe9a81628a5be5
- PASS — **Locked build ZIP hash matches accepted v2.8.1 hash** — 88706b6106eb4da5cdb627aeeb164f679c54f4829cc85a0fe35b97c8ac618caf
- PASS — **Chromium sidecar hash matches issued report hash** — 8e17a43741c480076642e43f68aa6b86208c1b9c7ed9879432c0cba68057d2fc
- PASS — **ZIP CRC integrity**
- PASS — **Locked ZIP has expected five files** — ['Aedifica_Standards_Explorer_v2_8_1_Acceptance_Audit.json', 'Aedifica_Standards_Explorer_v2_8_1_Acceptance_Audit.md', 'README.md', 'index.html', 'manifest.json']
- PASS — **Packaged index.html is byte-identical to locked standalone HTML**
- PASS — **2,833 public records remain embedded** — 2833
- PASS — **2,775 current records remain embedded**
- PASS — **All standard codes remain unique**
- PASS — **All standard UIDs remain unique**
- PASS — **Exactly five product screens remain**
- PASS — **Protected token absent: commercial-rel:**
- PASS — **Protected token absent: atc:machine:**
- PASS — **Protected token absent: atc:page-only:**
- PASS — **Protected token absent: "provenance_entries"**
- PASS — **Protected token absent: "evidence_tiers"**
- PASS — **Protected token absent: "verification_levels"**
- PASS — **Protected token absent: "pro_relationships"**
- PASS — **Protected token absent: "curriculum_preview"**
- PASS — **Protected token absent: "external_attribution"**
- PASS — **Dual-band set-membership filtering remains implemented**
- PASS — **Deep-link standard route remains implemented**
- PASS — **Deep-link learning route remains implemented**
- PASS — **Deep-link relationship route remains implemented**
- PASS — **SPA focus management remains implemented**
- PASS — **Polite live region remains implemented**
- PASS — **Chromium sidecar names the exact locked HTML hash**
- PASS — **Chromium sidecar explicitly excludes target-host HTTP/network E2E**
- PASS — **Chromium sidecar explicitly excludes full WCAG conformance**
- PASS — **Chromium sidecar keeps production server-rendered SEO recommendation**
- PASS — **Locked manifest still records browser_engine_pass_claimed=false** — False
- PASS — **Locked acceptance audit still records no browser-engine pass**
- PASS — **Supplementary Chromium report records browser-engine PASS**

## Recommended accepted claim

Until target-host network E2E is completed, use:

> **Aedifica Standards Explorer v2.8.1 has passed Chromium browser-engine rendering and client-side interaction acceptance using the exact locked standalone HTML. Target-host HTTP/network E2E remains a separate deployment verification. Production server-rendered per-standard URLs remain preferred for full SEO.**

This wording is stronger and more audit-resilient than an unqualified “Chromium-certified” statement.
