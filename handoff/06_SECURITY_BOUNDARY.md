# Security Boundary

## Core rule

The Free deployment must contain only public data.

Protected data must never be sent to the browser and hidden by UI logic.

## Fail CI if deployable assets contain

- `commercial-rel:`
- relationship endpoint collections
- `EXPANDED_OPT_IN`
- `DISPUTED_OPT_IN`
- `GOVERNANCE_HISTORY_ONLY`
- `QUARANTINE_HISTORY`
- per-edge audit data
- reconciliation row data
- customer overlay data

Reference documentation may contain governance terms, but those files must not be copied into the public web root or client bundle.

## Production controls

Use:
- HTTPS
- HSTS after validation
- CSP
- nosniff
- Referrer-Policy
- frame-ancestors policy
- no secrets in client env vars
- dependency lockfile
- security/dependency scan

## Final leakage scan

Scan:
- generated HTML
- JS bundles
- JSON
- source maps if public
- API snapshots

Build must fail closed on leakage.
