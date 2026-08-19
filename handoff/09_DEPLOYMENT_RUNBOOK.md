# Deployment Runbook

## Developer must provide before launch

- repository access
- staging URL
- commit SHA
- build instructions
- environment-variable template
- QA report
- leakage report
- public data hash

## Staging approval

Check:
- search
- filters
- representative standards
- subject pages
- grade pages
- mobile
- source links
- server-rendered HTML
- no protected data

## Production

Deploy exact approved commit.

Record:
- production URL
- commit SHA
- build ID
- data hash
- deployment time
- hosting/CDN settings
- response headers

## Production-origin verification

Test:
- `/`
- `/standards`
- several `/standards/{code}`
- invalid code 404
- `/subjects`
- `/grades`
- `/about`
- public API
- sitemap
- robots
- HTTPS
- analytics
- source links

## Freeze

Archive:
- release tag
- build
- dataset
- hashes
- QA report

No silent data updates.
