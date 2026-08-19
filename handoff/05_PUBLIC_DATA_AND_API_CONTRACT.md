# Public Data and API Contract

## Launch dataset

`data/public_data_v2_8_1_locked.json`

Expected:
- total 2,833
- current 2,775

## Allowed fields

- uid
- code
- area
- area_name
- label
- grades
- current
- status
- domain
- frameworks
- versions
- source_url
- source_url_kind
- aedifica_view
- generic_evidence_signals
- relationship_signals
- framework_lineage

## Relationship signals

Only:
- supports
- reinforces
- next
- total

## API

- `/api/public/meta`
- `/api/public/standards`
- `/api/public/standards/{code}`

Use strict serialization.
Do not return raw internal models.

## Update rule

For the first online release, do not regenerate from:
- Pro backend
- protected graph
- master taxonomy
- internal audit/reconciliation files

A future data refresh requires a new public export and new release version.
