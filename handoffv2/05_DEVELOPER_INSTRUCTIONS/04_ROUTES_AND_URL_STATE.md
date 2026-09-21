# 04 — Routes and URL State

Required:
- `/`
- `/standards/`
- `/standards/[slug]/`
- `/standards/subject/[area]/`
- `/standards/grade/[band]/`

Use `standards_route_manifest_v1_0_7.json` for current route continuity.

URL state:
- `q`
- `area`
- `grade`
- `status`
- `page`
- `standard`

Default status is current. Invalid values must fail safely. Pasted URLs and browser Back/Forward must restore state.

No functional `/relationships/` route is required in Phase 1.
