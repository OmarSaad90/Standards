# Routes and Page Specification

## `/`
Landing page for the Free Standards Explorer.

Include:
- hero
- search
- filters
- subject browse
- current/indexed counts

## `/standards`
Search/browse page.

Query example:
`/standards?q=linear+equations&subject=mathematics&grade=8&status=current&page=1`

## `/standards/{code}`
Canonical standard page.

Required:
- identity
- source
- Aedifica View
- framework context
- evidence signals
- aggregate relationship counts

## `/subjects`
Subject directory.

## `/subjects/{subject}`
Standards in one subject.

## `/grades`
Grade/band directory.

## `/grades/{grade-or-band}`
Standards in one grade/band.

## `/about`
Short page explaining:
- what Aedifica Standards Explorer is
- public source vs Aedifica interpretation
- that aggregate learning-context signals are informational
- no official prerequisite claim

## Search priority

1. exact code
2. code prefix
3. title/label
4. Aedifica View keywords
5. domain/topic

## Relationship count display

Allowed:
- Supports 4
- Reinforces 3
- Next 2

Not allowed:
- names of connected standards
- endpoint pairs
- per-edge cards
