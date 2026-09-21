/**
 * Standard-code normalisation.
 *
 * FINDING (raised against the locked v2.8.1 artifact, not introduced here):
 * 485 of the 2,833 codes use U+2010 HYPHEN rather than ASCII hyphen-minus, and
 * one code ("9.3. 12.ED-TT.7") carries a stray space. Examples:
 *   9.3.12.AC-CST.1, 9.3.12.AC-DES.4, 9.3.12.ED-TT.7   (all U+2010)
 *
 * Consequence in the prototype: its normalize() maps every character outside
 * [a-z0-9.- ] to a space, so a stored code becomes "9.3.12.ac cst.1" while a
 * user typing the same code on a normal keyboard produces "9.3.12.ac-cst.1".
 * Exact-code search therefore silently misses roughly 17% of the catalogue.
 *
 * Fix applied here, in two places:
 *   1. URL slugs fold U+2010 to "-" and drop whitespace, so canonical URLs are
 *      clean ASCII. Verified zero slug collisions across all 2,833 codes.
 *   2. Lookup and search fold every common dash variant before comparing, so
 *      both the typed ASCII form and the stored U+2010 form resolve.
 *
 * This changes search behaviour versus the locked artifact, deliberately. The
 * dataset itself is untouched.
 *
 * Confirmed still present, unmodified, in the handoffv2 dataset (2026-09-21):
 * 484 of 2,836 codes, same pattern, plus two codes with stray whitespace. The
 * generic regex below already covers both without changes.
 */

/** Every dash-like character that should compare equal to ASCII "-". */
const DASH_VARIANTS = /[‐‑‒–—―−]/g

/** Canonical, URL-safe form of a code. Used for routing. */
export function codeSlug(code: string): string {
  return code.replace(DASH_VARIANTS, '-').replace(/\s+/g, '')
}

/** Case-insensitive comparison key. Used for lookup. */
export function foldCode(code: string): string {
  return codeSlug(String(code ?? '')).toLowerCase()
}

/** Fold dashes in free text before the search normaliser runs. */
export function foldDashes(s: string): string {
  return String(s ?? '').replace(DASH_VARIANTS, '-')
}
