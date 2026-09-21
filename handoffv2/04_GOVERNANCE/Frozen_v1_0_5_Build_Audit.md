# Aedifica Free Standards↔Relationships Integration v1.0.5 — ELA Official Text Fidelity Build Audit

**Status:** CANDIDATE / NOT LOCKED  
**Direct parent:** locked Free Standards↔Relationships Integration v1.0.4 deployable  
**Purpose:** replace synthesized current ELA primary display labels with the attached 2023 NJSLS-ELA parent wording and add official lettered subcomponents, while preserving Aedifica View and all governed Free relationship/source behavior.

## Final roots

- Standalone candidate HTML: `Aedifica_Free_Standards_to_Relationships_Integration_v1_0_5_ELA_Official_Text_Fidelity_Candidate.html`
  - SHA-256: `ff135cdff38c6085d4710c2abf021389f05398466f38129eec485eaee4ec7e33`
- Deployable site candidate ZIP: `Aedifica_Free_Standards_to_Relationships_Integration_v1_0_5_ELA_Official_Text_Fidelity_Deployable_Site_Candidate.zip`
  - SHA-256: `6c578c2107af6436968dc170287270b239313943c3a53d76c72dc264d7901e99`
- Change ledger: `Aedifica_Free_Standards_to_Relationships_Integration_v1_0_5_ELA_Official_Text_Fidelity_Change_Ledger.json`
  - SHA-256: `b4020d2981c06363e070047e132a9a61b338dc4732ca33096fa24c00ee10cf24`
- Attached NJDOE source used for this build: `2023_NJSLS_ELA (2).docx`
  - SHA-256: `f5f232ff1826feb15d778a02a008ae9c4db3b1b26e0397897af07369600a2390`

## Source reconciliation

- Current 2023 ELA parent expectations parsed from attached DOCX: **160**
- Exact current ELA codes matched to the Free corpus: **160/160**
- Missing current ELA codes: **0**
- Extra current ELA codes: **0**
- Expectations with lettered components: **40**
- Official lettered component items captured: **183**

## Governed data preservation

- Total public standards: **2836**
- Current / non-current: **2757 / 79**
- ELA total / current / historical: **218 / 160 / 58**
- Supports / Reinforces / Next: **1420 / 2424 / 1420**
- Endpoint incidences: **5264**

Parsed record comparison against v1.0.4 found exactly **160 changed records**, all current ELA. The only changed/added fields are:

- `label` → official 2023 NJSLS-ELA parent expectation
- `official_text_source` → `2023 NJSLS-ELA`
- `official_components` → ordered A/B/C… source components

There are **0 changes** to non-ELA records, historical ELA records, status, grades/bands, source URLs, relationship counts, Aedifica View, evidence signals, framework fields, PCS evidence, or integration state behavior.

## Surface consistency

Updated:

- integrated root `index.html`
- Relationships surface embedded standard labels
- all **160** current ELA server-rendered detail pages
- ELA subject listing
- Grade 6, 7, 8, 9-10, and 11-12 listing pages
- detail-page CSS for official-source badges/components

The root modal now labels current ELA parent wording as **Official 2023 NJSLS-ELA wording**, shows all official lettered subcomponents when present, and keeps **Aedifica View** as a separate section.

## Validation

- Embedded ELA official parent wording: **160/160 exact**
- Official component reconciliation: **183/183**
- Inline JavaScript syntax (`node --check`): **PASS**
- Changed deployable files vs direct parent: **169**
- Browser runtime certification: **NOT CLAIMED**. Chromium exists in the environment, but administrator policy blocks both localhost and `file://` navigation. This is an environment limitation, not a browser PASS.

## Governance disposition

This is a **separately versioned v1.0.5 candidate**. It does not modify, overwrite, repack, or supersede the locked v1.0.4 baseline by itself. Fresh independent audit is still required before any owner lock decision.
