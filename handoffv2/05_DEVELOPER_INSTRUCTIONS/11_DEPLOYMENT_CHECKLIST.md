# 11 — Deployment Checklist

Before staging:
- lock dependencies
- CI green
- supplied validators pass
- no secrets in client bundle
- no protected relationship data in public assets
- clean build from fresh checkout

Staging:
- test source links
- canonical routes
- sitemap
- mobile
- browsers
- keyboard
- analytics test mode
- console errors
- performance/accessibility audit

Send owner:
- staging URL
- commit SHA
- deployment/build ID
- QA report
- known deviations
- screenshots for home/search/detail/current ELA/historical ELA/Math PCS/subject/grade/mobile
- explicit confirmation that relationship navigation remains disabled

Production only after owner approval.
