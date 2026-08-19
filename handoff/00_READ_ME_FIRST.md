# Aedifica Free Standards Explorer Online — Developer Handoff v1.0.0

## Scope

Build **only the Free Standards Explorer online**.

Do not build:
- Aedifica Pro
- login/account flows
- paid entitlements
- Expanded Relationships
- Disputed Relationships
- Quarantine/Governance UI
- School features
- District features
- customer curriculum overlays
- private APIs
- protected relationship graph services

The developer is building a **public, no-login standards website**.

## Product objective

A public New Jersey Grades 6–12 Standards Explorer where anyone can:

- search standards
- filter by subject/grade/status
- browse subjects and grades
- open a standard detail page
- see source information
- read the Aedifica View
- see public framework context
- see generic evidence signals
- see aggregate Supports / Reinforces / Next counts

The site must not reveal exact relationship endpoints or protected relationship records.

## Starting data

Use:

`data/public_data_v2_8_1_locked.json`

Expected:
- 2,833 total public records
- 2,775 current records

Do not regenerate the launch dataset from any Pro/private backend.

## Recommended technology

Use a modern server-rendered web framework, preferably:
- Next.js + TypeScript

Equivalent SSR/SSG frameworks are acceptable if they meet:
- indexable HTML
- canonical standard URLs
- accessible navigation
- strong public/private data separation
- production testing

## Versioning

Create a new project, e.g.:

`Aedifica Free Standards Explorer Online v1.0.0`

Do not modify or relabel the locked v2.8.1 standalone HTML.

## Read next

1. `01_FILES_TO_HAND_TO_DEVELOPER.md`
2. `02_STEP_BY_STEP_FREE_BUILD_PLAN.md`
3. `03_FREE_PRODUCT_REQUIREMENTS.md`
4. `04_ROUTES_AND_PAGE_SPEC.md`
5. `05_PUBLIC_DATA_AND_API_CONTRACT.md`
6. `06_SECURITY_BOUNDARY.md`
7. `07_SEO_ACCESSIBILITY_ANALYTICS.md`
8. `08_QA_CHECKLIST.md`
9. `09_DEPLOYMENT_RUNBOOK.md`
10. `10_DEFINITION_OF_DONE.md`
