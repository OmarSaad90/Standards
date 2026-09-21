# 14 — Recommended Project Structure

Example:

```text
src/
  app/
    page.tsx
    standards/
      page.tsx
      [slug]/page.tsx
      subject/[area]/page.tsx
      grade/[band]/page.tsx
  components/standards/
  data/
  lib/
  styles/
reference/
  Free_Standards_Explorer_v1_0_7_Standards_Only_Developer_Candidate.html
```

Prefer server-rendered/static canonical pages. Hydrate only the interactive search/filter/detail experience.
