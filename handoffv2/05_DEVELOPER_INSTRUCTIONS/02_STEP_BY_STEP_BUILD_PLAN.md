# 02 — Step-by-Step Build Plan

1. **Verify handoff integrity.** Run the supplied SHA-256 and data validation scripts.
2. **Create a new production repository.** Keep the reference HTML under a read-only `/reference` folder.
3. **Load the sanitized public dataset.** Use `public_standards_phase1_v1_0_7.json`, not the raw embedded payload.
4. **Define typed standard records.** Enforce the field allowlist.
5. **Implement route generation.** Preserve the supplied standard slugs unless an owner-approved migration is planned.
6. **Translate the visual system.** Move prototype CSS into maintainable design tokens/components without changing meaning.
7. **Build the explorer index.** Hero, collection ledger, source evidence, search, filters, result list, counts, pagination, subject grid, grade register.
8. **Implement filtering/search.** Code/text + subject + grade/band + status + combinations.
9. **Implement URL state.** `q`, `area`, `grade`, `status`, `page`, `standard`; Back/Forward must work.
10. **Build standard detail UI.** Include public source, Aedifica View, evidence, framework context and aggregate relationship counts.
11. **Build canonical standard pages.** All 2,836 routes must be server-rendered/static and indexable.
12. **Build 9 subject pages and 7 grade/band pages.**
13. **Implement official ELA rules.** Parent wording + components + separate Aedifica View.
14. **Implement Math PCS evidence.** Keep it separate from Aedifica relationship counts.
15. **Implement coming-soon relationship state.** No live graph route.
16. **Add accessibility.** Keyboard, focus, dialog behavior, announcements, reduced motion, AA target.
17. **Add SEO.** Metadata, canonical URLs, sitemap, crawlable standard content.
18. **Add analytics.** Search/filter/result/source/coming-soon events only; no protected intelligence.
19. **Add automated QA.** Start with the included Python/Node validators, then app/browser tests.
20. **Stage.** Test desktop/mobile and major browsers.
21. **Send owner acceptance package.** Staging URL, commit SHA, deployment ID, test results, known issues and screenshots.
22. **Promote only after owner approval.**
