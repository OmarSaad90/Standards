# 03 — Public Data Contract

Production source:
`02_PUBLIC_DATA/public_standards_phase1_v1_0_7.json`

Required invariants:
- standards: **2836**
- current: **2757**
- non-current: **79**
- Supports: **1420**
- Reinforces: **2424**
- Next: **1420**
- endpoint incidences: **5264**

Use the allowlist in `phase1_field_allowlist.json`.

Do not expose or rely on legacy fields:
- `app_count`
- `programs`
- `curriculum_preview`

Only aggregate relationship counts are in Phase 1 scope. Do not reconstruct exact relationships.
