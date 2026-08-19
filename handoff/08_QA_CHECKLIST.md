# QA Checklist

## Data
- [ ] JSON parses
- [ ] schema passes
- [ ] 2,833 total
- [ ] 2,775 current
- [ ] unique code
- [ ] unique UID
- [ ] relationship totals reconcile

## Search
- [ ] exact code
- [ ] prefix
- [ ] keyword
- [ ] subject filter
- [ ] grade filter
- [ ] status filter
- [ ] combined filters
- [ ] pagination
- [ ] invalid input returns 400
- [ ] Back/Forward state

## Standard page
- [ ] valid standard 200
- [ ] invalid standard 404
- [ ] source correct
- [ ] Aedifica View correct
- [ ] framework context correct
- [ ] evidence signals correct
- [ ] counts correct
- [ ] no exact endpoints

## Boundary
- [ ] no commercial relationship IDs
- [ ] no endpoint pairs
- [ ] no Expanded data
- [ ] no Disputed data
- [ ] no Quarantine data
- [ ] no customer overlays
- [ ] leakage scan passes

## Browser
- [ ] Chromium
- [ ] Safari/WebKit representative
- [ ] Firefox representative
- [ ] mobile viewport
- [ ] no console errors

## Accessibility
- [ ] automated scan
- [ ] keyboard pass
- [ ] visible focus
- [ ] labels
- [ ] headings
- [ ] live announcements
- [ ] contrast
- [ ] reduced motion
- [ ] 200% zoom

## SEO
- [ ] SSR page HTML
- [ ] canonical
- [ ] title
- [ ] description
- [ ] Open Graph
- [ ] sitemap
- [ ] robots
- [ ] 404

## Production
- [ ] HTTPS
- [ ] security headers
- [ ] no secrets
- [ ] staging smoke
- [ ] production smoke
- [ ] source links sampled
