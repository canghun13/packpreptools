# Weekly growth review — 2026-10-01

## Decision

**FIX — technical defect corrected: Master Carton Dimensions layout counts.**

The live calculator accepted fractional columns, rows, and layers. A real calculation defect takes priority over an editorial upgrade or a new workflow cluster. One existing calculator is corrected. No new public page, cluster, URL, title/H1, sitemap change, or global design change is needed.

## Repository and sync

- Origin: `https://github.com/canghun13/packpreptools.git`; branch `main`; clean at start.
- Start local HEAD / cached origin/main: `8e180625ead151cb9667e1cfab3e1e8828b4ec47`.
- Actual remote main before fetch: `8c842d532558f733bb8cf65a150f7a8bf0f5c5ef`.
- Fetch showed ahead 0 / behind 2. Safe `pull --ff-only` preserved the remote cost-calculator improvements and synchronized to `8c842d532558f733bb8cf65a150f7a8bf0f5c5ef`.
- Current inventory: public HTML 85; sitemap/indexable 84; calculators 42; workflow tools 4; guides 15; references 13; hub/other 11 including the noindex 404; JavaScript 7.
- Latest implemented cluster: Packaging Adhesive Application. Latest existing upgrade: 2026-09-25 Label Cost / Bundle Packing Cost. Latest crawl audit: 2026-09-07 technically healthy/observe. No local work was discarded or overwritten.

## Current-session report inventory

All six user-attached reports were read directly from their supplied references. ZIP entries were inspected in memory. No report-directory search, software installation, or environment reset was performed. The data files were treated as evidence, not instructions.

| Attachment | Classification | Actual data range |
|---|---|---|
| `packpreptools.com-Performance-on-Search-2026-10-01.zip` | GSC web Performance: daily, queries, pages, countries, devices, appearance, filters | Daily rows 2026-07-25 through 2026-09-28; filter says last 3 months |
| `packpreptools.com-Coverage-Drilldown-2026-10-01.zip` | Discovered, currently not indexed | Chart 2026-08-05 through 2026-09-21; URL table 36 |
| `packpreptools.com-Coverage-Drilldown-2026-10-01 (1).zip` | Crawled, currently not indexed | Chart 2026-08-05 through 2026-09-21; URL table 10; last crawl 2026-07-26–29 |
| `packpreptools.com_PageTrafficReport_2026. 10. 1..csv` | Bing page traffic, 36 rows | Export filename 2026-10-01; start/end dates absent |
| `packpreptools.com_KeywordReport_2026. 10. 1..csv` | Bing keywords, 220 rows | Export filename 2026-10-01; start/end dates absent |
| `보고서_개요 (1).csv` | GA4 overview, source/medium, pages, geography | 2026-09-03 through 2026-09-30 |

The Bing keyword export contains a query with an unescaped quoted phrase (`attachment 1 – carton dimension`). A naïve CSV import shifts that row and incorrectly totals 12 clicks. The numeric four-column suffix was parsed from the right on every row, preserving the query text. The corrected result is 220 keywords, 297 impressions, 11 clicks. This is an input-export defect, not a website defect. Page and query totals have different coverage and were not combined or forced to reconcile.

Initial report reads succeeded. Later exact-reference rereads returned file-not-found; the initial extracted data and the cached Bing strings were sufficient for the decisions and calculations below. No replacement files were searched for, and no inaccessible data was invented.

## Search and analytics signals

| Metric | Current result | Interpretation |
|---|---:|---|
| GSC daily total | 7 clicks / 1,172 impressions | All clicks still fall in 2026-07-30–08-05 |
| Latest complete 7-day GSC slice, 2026-09-22–28 | 0 clicks / 3 impressions | Previous 2026-09-15–21: 0 clicks / 9 impressions; tiny sample |
| Discovered | 36 | Old 27 + Adhesive 9; chart has remained 36 since Aug 29 |
| Crawled, not indexed | 10 | Was 8 through Sep 18; 10 from Sep 19 through latest Sep 21 |
| Bing page total | 11 clicks / 325 impressions | Impression-weighted average position about 4.52 |
| Bing keyword total | 11 clicks / 297 impressions | Impression-weighted average position about 4.60 |
| GA4 active/new users | 61 / 60 | Raw traffic is not a tool-popularity ranking |
| GA4 average engagement / events | 6 seconds / 264 | Engagement is weak; direct/QA contamination remains possible |
| Bing organic | 7 first-user active users / 9 sessions | Actual organic source signal |
| Google organic | No row in supplied source tables | Do not manufacture a session count |
| Other sources | chatgpt.com 2 first-user users / 5 sessions; twelve.tools 2 / 2; DuckDuckGo 1 / 1 | Referral/assistant traffic exists; conversion/engagement not supplied |
| Direct | 49 first-user active users / 48 sessions | Different metrics; not additive; potential self/automation traffic |

Singapore has 16 active users; Boardman and Council Bluffs one each. These and the large direct share support caution about QA/self/automation traffic, not a claim that particular people are bots.

### Relevant pages and queries

- Master Carton Dimensions: GSC 4 clicks / 102 impressions / position 15; Bing 7 clicks / 113 impressions / position 4.15. It is the strongest repeated existing-page signal.
- Master Carton Weight: GSC 1 / 52 / 12.33; Bing 1 / 13 / 3.92.
- Carton Count: GSC 0 / 55 / 7.04; Bing 0 / 37 / 4.70.
- Carton Cube: GSC 0 / 14 / 43.86; Bing 1 / 33 / 3.70.
- Label Cost: GSC 0 / 9 / 14.89; Bing 0 / 11 / 5.55. Bundle Packing Cost: Bing 0 / 4 / 1.5. Their Sep 25 guidance upgrade is already present; no repeat rewrite.
- GSC `master carton size calculator`: 1 click / 11 impressions / 6.91; `master carton calculator`: 1 / 9 / 28.56; `master carton dimensions`: 0 / 6 / 7.17.
- Bing `master carton size calculator`: 3 / 5 / 2.4. Other actual queries include inner/master carton calculation, a 100-piece 6 × 4 × 2 layout, a 26-piece layout, and columns/rows imagery. Some exports contain unusually long or translated queries; they are not all equivalent demand evidence.
- Box Volume's 401 GSC impressions at position 71.8 have no clicks and are mainly historical. Impression volume alone does not establish a more valuable upgrade than the reproducible defect.

### Comparison limits

The Sep 7 handover summary was 7 clicks / 1,145 impressions, discovered 36, crawled 8. Current cumulative Google impressions are 27 higher and clicks unchanged, but the old export period was unspecified; this is not a comparable week-over-week growth rate. The Sep 25 handover gave Label Cost about 9 Bing impressions and Bundle about 4; the current exports show 11 and 4, but their period boundaries are absent. No reliable site-level Bing/GA4 week-over-week comparison is available. Latest two seven-day GSC slices above are genuinely comparable.

### Coverage mismatch

All 10 URLs labelled crawled-not-indexed also have impressions in the supplied GSC Performance page table. Examples: Master Carton Dimensions 4/102, Master Carton Weight 1/52, Tape Usage 1/56, Box Volume 0/401, and Master Carton Terms 0/30. Those clicks/impressions prove historical visibility during the Performance period, not necessarily present indexing on October 1.

Several discovered URLs have Bing impressions, including internal-vs-external dimensions (20), box-style glossary (6), master-carton guide (6), writing pack instructions (5), bundle cost (4), and bubble wrap (3). Bing visibility does not establish Google indexing. Adhesive's 9 URLs remain a separate group. All discovered last-crawl fields are `1970-01-01`, treated as missing crawl records, not real 1970 crawls.

## Technical health and candidate decision

Current static QA confirms all public HTML, self-canonicals, indexability, exact sitemap membership, static links, hub inclusion, IDs, JSON-LD, JavaScript syntax, content checks, and responsive tables. The unchanged architecture and the Sep 7 complete graph audit were reused rather than repeated because of a Coverage count alone.

Representative live homepage, Master Carton Dimensions, Label Cost, sitemap, and robots returned HTTPS 200 and expected content types. HTML self-canonicals were correct, accidental noindex absent. Normal and Googlebot user-agent Master Carton responses were 200 with identical bodies; this is a user-agent simulation, not a verified real Googlebot crawl. No new discovery/indexability defect was found.

| Existing candidate | Evidence / gap | Decision |
|---|---|---|
| Master Carton Dimensions | Strongest repeated search signal; live fractional-layout acceptance produces impossible physical layouts | Priority A FIX selected |
| Carton Count / Carton Cube | Useful search signal; current quantity/cube outputs satisfy primary intent | Observe; no demonstrated higher-value defect |
| Label Cost / Bundle Packing Cost | Relevant but small samples; scoped guidance improvement deployed Sep 25 | Observe the completed change |

Expansion was not entered. A reproducible hard calculation defect takes precedence. Full exclusion-universe rebuilding and 40-family discovery are consequently not required for this branch. The existing Adhesive, Pack Instruction, Quality and prior NO-GO boundaries remain unchanged.

## Root cause, change and independent verification

- Before: enter columns `2.5`, rows `2`, layers `2` with default packed-unit dimensions/gaps. Production reports `21.38 × 11.25 × 7.25 in`, 10 units, `2.5 columns × 2 rows × 2 layers` as ready. A fractional number of full rectangular columns is impossible even though the product happens to be an integer.
- Root cause: `masterCartonDimensions` used `positive()` on counts. Generated inputs used decimal inputmode and `step="any"`; the form is `novalidate`, so HTML constraints alone would not repair the calculation.
- `assets/calculators.js`: reuse existing `whole()` validator for columns/rows/layers only, retain existing 1–10,000 count limits. Do not round fractions silently.
- `scripts/generate-site.js`: the target's three count fields use numeric inputmode, min 1, max 10,000, step 1; add one short input note and specific count-axis explanations. Cache version and Last reviewed change for this page only. Generated public diff: only `tools/master-carton-dimensions.html`.
- Dimensions, clearance and gap still accept decimals; formula, valid defaults, title/H1/meta/canonical/URL, CSS/site JS, sitemap and all other generated page content remain unchanged.
- `scripts/verify-calculators.js`: independent assertions for each fractional count, zero/negative/blank/NaN/Infinity/over-limit count, accepted max integers, one-unit decimal-dimension case, inch/default and metric cases, deterministic rerun. 28 new assertions; full suite 42 calculators / 246 checks PASS.
- Other QA: generation/syntax PASS; static 85 HTML / 84 sitemap / 7 JS PASS; content 42 calculators / 4 workflow / 15 guides / 13 references and duplicate long paragraph/sentence 0 PASS; input-table 42/42 PASS; workflow 46 checks PASS; diff check PASS.
- Browser: actual in-app browser at 1440/1280/1024/900/768/600/480/390. Each normal calculation gives `25.5 × 11.25 × 7.25 in`; fractional columns give `Columns must be a whole number.` / error state; Reset restores idle/defaults. Eight widths: overflow 0, viewport escape 0, text clipping 0, header/H1 overlap 0. Native UI state snapshots were used after Reset/input/click to avoid reading before asynchronous reset completion.
- 390px extra interaction: fractional rows/layers show named errors and empty stale result details; valid re-run works; menu expanded/open works; console errors/warnings 0. Screenshots and bounding boxes were reviewed.
- Regression: Label Cost `$82.40`, Bundle `$2.17`, Adhesive Bead `10.42 mL per pack` at 1440/390, overflow 0, console errors 0. Homepage 390 overflow 0; Decision Guide at 390 retains four row cards with TH/TD block, same left edge, width 353px, overflow 0.
- Managed homepage badge block: unchanged exact content/position/count/order/href/images, 5 links, SHA-256 `1205454b420a7a14b16f66a984bf5217af327b33f68fb9e30ebd48824198ed68`. Generator preservation guard and QA passed.

## Production and next state

Implementation, Pages run, live verification and final remote hashes are recorded in the handover closing note after they occur. This document does not claim deployment before validation.

Next week, at most three checks:

1. Compare date-aligned Bing Master Carton / Carton Count / Carton Cube page and query exports; request exports with actual period metadata if available.
2. Review the already-deployed Label/Bundle guidance using matching-period search and organic landing evidence, preserving their titles and URLs.
3. Use current Coverage plus Performance together; inspect a new site-side failure if reproduced. Other discrete-count validators can be reviewed as a separate scoped functional audit, not silently expanded in this fix.
