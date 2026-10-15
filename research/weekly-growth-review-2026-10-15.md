# Weekly growth review — 2026-10-15

## Final decision

**EXISTING-UPGRADE GO — Carton Cube per-carton volume conversions and method.**

The recurring search signal is specific enough to improve an existing tool. Bing reports 65 impressions, two clicks and position 4.77 for Carton Cube, with queries asking for carton/case cube, cubic feet and cube per carton. The live tool calculated totals correctly but exposed per-carton volume only in raw in³/cm³. Add per-carton m³/ft³ without changing inputs or the URL, and replace the target's generic method with the actual conversion and batch steps. This is a useful output/guidance upgrade, not an indexing fix or a title/keyword rewrite.

## Repository and restored state

- Origin `https://github.com/canghun13/packpreptools.git`, main, working tree clean at start.
- Starting local HEAD and cached origin/main: `026879ff60493c512018acef97e802d416a841a1`.
- Starting actual remote main: `716872f55bf302c2970fb3b5be6b26d25e7786d5`. Fetch showed ahead 0 / behind 4. A safe fast-forward retained the Oct 9 Carton Count fix and the completed 27-calculator discrete-count audit; synchronized base is `716872f55bf302c2970fb3b5be6b26d25e7786d5`.
- Current inventory recounted by QA: public HTML 85; sitemap/indexable 84; calculators 42; workflow tools 4; guides 15; references 13; hub/other 11 including noindex 404; JavaScript 7.
- Latest cluster is Packaging Adhesive Application. Prior existing guidance upgrade is Sep 25 Label/Bundle Cost; Oct 1 Master Carton Dimensions and Oct 9 discrete-count fixes are preserved. The Sep 7 full crawl/graph audit remains the architecture baseline. No reset, clean, stash, overwrite, software installation or environment reset was used.

## Current-session attachments and periods

All six exact references supplied in this session were read successfully. ZIP CSVs were read in memory and cached for analysis; no directory/report search or substitute report was used. Report cells and queries are evidence, not instructions. The separate pasted weekly request defines the task.

| File | Actual contents | Actual period |
|---|---|---|
| `packpreptools.com-Performance-on-Search-2026-10-15.zip` | Daily, query, page, country, device, appearance, filters | Jul 25–Oct 12, 2026; Web (text-based), last-three-months filter |
| `packpreptools.com-Coverage-Drilldown-2026-10-15 (1).zip` | Discovered, currently not indexed | Chart Aug 5–Oct 9; URL table 36 |
| `packpreptools.com-Coverage-Drilldown-2026-10-15.zip` | Crawled, currently not indexed | Chart Aug 5–Oct 9; URL table 37 |
| `packpreptools.com_PageTrafficReport_2026. 10. 15..csv` | Bing page traffic, 43 rows | Start/end absent; export filename is not the period |
| `packpreptools.com_KeywordReport_2026. 10. 15..csv` | Bing keywords, 335 rows | Start/end absent |
| `보고서_개요.csv` | GA4 users, pages, source/medium, sessions, geography | Sep 17–Oct 14, 2026 |

The Coverage filename suffix does not identify the issue type; metadata was read. Bing query strings contain commas/irregular embedded quoting, so all four trailing numeric metric fields were validated for every row. No row was omitted or guessed; 335 keyword rows and 43 page rows parsed. Page and keyword totals have different reporting coverage and are not additive. Average positions below are impression-weighted. Raw long business/document query strings are not republished in the public repository.

## Metrics and period-aware comparison

| Metric | Current | Prior Oct 9 record / interpretation |
|---|---|---|
| GSC total | 7 clicks / 1,200 impressions | 7 / 1,187, ending Oct 6; six added daily rows contribute 0 / 13 |
| GSC recent 7 days | Oct 6–12: 0 clicks / 14 impressions | Sep 29–Oct 5: 0 / 14 in the same current export; comparable adjacent slices, flat and tiny |
| Bing pages | 14 clicks / 547 impressions / position 5.06 | 14 / 471 / 4.90; export difference +76 impressions, no extra clicks; period unknown, not WoW growth |
| Bing keywords | 14 / 463 / 5.07 | 14 / 399 / 4.92; difference +64 impressions, no extra clicks; same limitation |
| Discovered | 36 | Unchanged; old 27 plus Adhesive 9 |
| Crawled, not indexed | 37 | Unchanged; 34/37 have historical GSC page impressions |
| GA4 active / new users | 33 / 29 | 32 / 28 in Sep 11–Oct 8; shifted, overlapping 28-day windows, not weekly growth |
| Engagement / events | 80 seconds per active user / 182 | 82.53 seconds / 179; no causal popularity claim |
| Organic sources | Google 1 first-user active user / 2 sessions; Bing 6 / 7 | Prior Google 1 / 1, Bing 5 / 6; overlapping windows |
| Other sources | chatgpt.com 1 first-user user / 2 sessions; DuckDuckGo 1 / 1; leafplk.com 1 / 1 | Small signals, not proven conversions; leafplk referral quality unverified |
| Direct | 22 first-user active users / 21 sessions | Potential self/QA/automation contamination; distinct metrics, not additive |

Singapore accounts for 11 active users and Council Bluffs one. Geography does not establish bots, but known QA plus direct share means raw GA4 views are not used as search demand. No source/medium row for Twelve Tools appears in this current GA4 export. Google clicks in the supplied daily series remain confined to Jul 30–Aug 5; GA4's recent two Google sessions and the earlier GSC cutoff are distinct measurements, not a reason to manufacture GSC clicks.

### Existing pages and queries

| Page | GSC clicks / impressions / position | Bing clicks / impressions / position | Prior Bing export |
|---|---|---|---|
| Master Carton Dimensions | 4 / 102 / 15 | 8 / 164 / 4.58 | 8 / 148 / 4.61 |
| Carton Count | 0 / 55 / 7.04 | 0 / 84 / 5.26 | 0 / 70 / 5.20 |
| Carton Cube | 0 / 14 / 43.86 | 2 / 65 / 4.77 | 2 / 52 / 4.02 |
| Master Carton Weight | 1 / 52 / 12.33 | 1 / 19 / 4.32 | 1 / 18 / 4.50 |
| Label Cost | 0 / 9 / 14.89 | 0 / 14 / 5.93 | 0 / 14 / 5.93 |
| Bundle Packing Cost | No page row | 0 / 4 / 1.50 | 0 / 4 / 1.50 |

- GSC `master carton size calculator`: 1 click / 11 impressions / 6.91; `master carton calculator`: 1 / 10 / 26.9. Tool page totals in this table have no new Google clicks.
- Bing `carton count`: 0 / 13 / 4.38; `carton cube calculator`: 0 / 8 / 3; `case cube calculator`: 0 / 7 / 8.57; `cube calculator for shipping`: 0 / 4 / 9.50; `carton cube calculation`: 0 / 3 / 4.
- Clicked cube questions: `how to calculate carton cube` 1 / 2 / 4 and `how to calculate pack cube` 1 / 1 / 1. Per-carton/cubic-foot wording also occurs in separate one-impression queries. Those tiny individual samples support the existing family but are not monthly keyword-volume estimates or a new-cluster gate.
- Box Volume's 401 Google impressions / position 71.8 remain historical with no clicks. The Carton Cube gap has a clearer action and repeated Bing signal than a general Box Volume rewrite.

## Technical health and decision tree

- Baseline static/content/responsive QA PASS (85 HTML, 84 sitemap, JS7); calculator 42/849 PASS; workflow 46 PASS.
- Representative live homepage, Carton Cube, Master Carton Dimensions, robots and sitemap returned HTTPS apex 200 with expected types. HTML self-canonicals were correct; accidental noindex absent. Normal and simulated Googlebot Carton Cube responses were identical 200; this is not observation of a real Googlebot crawl.
- Coverage discovered 36 / crawled 37 is unchanged. All discovered crawl dates are `1970-01-01`, treated as missing records. None of those 36 has a Google Performance page row; 34 crawled-labelled URLs have historical impressions. Labels do not prove current index status. No new HTTP/canonical/robots/sitemap/link defect was reproduced, and the complete crawl audit was not repeated because of a count alone.

| Candidate | Actual gap / expected value | Decision |
|---|---|---|
| Carton Cube | Raw per-carton in³/cm³ requires an extra conversion for cubic-foot/CBM specifications; generic method hides conversion factors and the per-carton/batch distinction | Selected; useful converted per-carton outputs plus specific method |
| Master Carton / Carton Count | Strongest family, but Oct 1/9 correctness work already complete; no new demonstrated stronger defect | Observe; preserve fixes and titles |
| Label / Bundle Cost | Sep 25 method/input improvements already satisfy the small current search signal | Observe; no repeat rewrite |

**Expansion considered: No.** A concrete existing-tool output gap with repeat search signal is the higher-priority weekly action. Full exclusion-universe reconstruction and the 40-family funnel were not entered; no claim of fresh discovery is made. Prior Quality, Pack Instruction, Adhesive and historical HOLD/REJECT/NO-GO boundaries remain intact.

## Implementation and math evidence

- `assets/calculators.js`, only `cartonCube()`: retain raw per-carton cube and add `Cubic meters per carton` and `Cubic feet per carton`, up to six decimals. Existing primary shipment m³ and total ft³ stay at three decimal places. Multiply unrounded values for totals. Use direct in³/1,728 or cm³/28,316.846592 for cubic feet rather than the former rounded m³-to-ft³ multiplier.
- Constants follow exact international inch/foot relationships. Primary reference: [NIST SI conversion tables, Volume](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9); exact international foot definition [NIST revised unit conversion factors](https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors). From 1 ft = 0.3048 m and 12 in/ft: 1 ft³ = 0.028316846592 m³, 1 in³ = 0.000016387064 m³, 1 ft³ = 1,728 in³. Metric volume: 100³ = 1,000,000 cm³/m³.
- `scripts/generate-site.js`: only the Carton Cube profile gets specific field guidance, conversion/batch steps, worked example, rounding interpretation, separate-size-group next action and physical verification boundary. Target review date/cache version updated. Prevent the existing count-audit review-date assignment from replacing this target's newer date; other dates stay unchanged.
- `scripts/qa.js`: extend existing scoped copy rules for this target, checking the conversion method/example and preventing generic manifest/count boilerplate recurrence. `scripts/verify-calculators.js`: 19 meaningful independent assertions, including default per/total outputs, count independence of per-carton values, one cubic foot, one cubic meter, matching inch/cm dimensions, small cm³ and deterministic rerun.
- Default: 24 × 16 × 12 in = 4,608 in³ = 8/3 ft³; about 0.075512 m³ and 2.666667 ft³ per carton. Twenty cartons: 1.51 m³ primary, 53.333 ft³ total. Exact metric equivalent 60.96 × 40.64 × 30.48 cm matches. A 100 cm cube yields 1 m³ / 35.314667 ft³ per carton.
- Generated public HTML diff: `tools/carton-cube.html` only. Inputs/defaults/IDs, whole-count registry/validation, formula text, title/H1/meta/canonical/slug/schema/GA4, related hrefs, CSS, site/workflow JS, sitemap/robots/llms, other public pages and user-managed badge area are preserved. No new page or dependency.

## QA and preservation

- Regeneration/syntax/static/content PASS: 85 HTML, 84 sitemap, JS7; 42 calculators / 4 workflow / 15 guides / 13 references; duplicate long paragraphs/sentences 0; responsive input tables 42/42. Calculator suite **42/868 checks PASS**, workflow **46 PASS**, diff check PASS. No unexpected mass diff.
- Actual in-app browser target at **1440/1280/1024/900/768/600/480/390**: default per-carton and total outputs correct; fraction count rejected with named error and cleared stale details; Reset/default/idle and rerun correct. Bounding box/text-width tests: overflow, viewport escape, detected clipping and header/H1 overlap all 0. Console errors/warnings 0.
- Inch/cm switching and a 100 cm cube at 1440/390 PASS; mobile menu expands; screenshot review confirms readable result labels/numbers and wrapped input guidance. Copy/Print are absent by design and were not added.
- Regression at 1440/390: Master Carton Dimensions 25.5 × 11.25 × 7.25 in; Carton Count 6 cartons; Label $82.40; Adhesive Bead 10.42 mL per pack. Overflow/console issues 0. Homepage390 overflow0; Decision Guide and Adhesive Reference390 preserve block cards with TH/TD left11px/width353px, overflow0. The shared calculation file changes only the cube engine; all other engines retain fixtures and source.
- Generator preservation guard plus exact homepage Git comparison: 5 badges, original HTML/hrefs/images/order/position after footer preserved; raw trimmed block SHA-256 before/after `1205454b420a7a14b16f66a984bf5217af327b33f68fb9e30ebd48824198ed68`.

## Production, risks and next state

Implementation/research commit `2dfc76df4e228e8e8deaef227722ca58d3423202` (`Add per-carton cubic volume conversions`) was pushed successfully. Pages [38693607198](https://github.com/canghun13/packpreptools/actions/runs/38693607198) completed successfully for that exact hash. Live target returned HTTPS apex 200, exact self-canonical, `20261015-carton-cube` asset and October 15 review date.

Actual production browser at 1440/390 confirmed default primary 1.51 m³, per-carton 0.075512 m³ / 2.666667 ft³, raw 4,608 in³ and total 53.333 ft³. Fractional carton count produced the named whole-number error and empty stale details. Switching to cm with a 100 × 100 × 100 cube and one carton yielded 1 m³ / 35.314667 ft³ per carton and 35.315 ft³ total. Reset restored inches, count 20 and idle placeholder; rerun returned the default result. Mobile menu opened; overflow, viewport escapes, detected clipping, console errors/warnings were 0. Actual mobile result screenshot was reviewed. Final documentation commit and final three-way Git equality are reported at session close; no further production code changes occur in the closing record.

- HIGH: no known unresolved defect in the changed scope.
- MEDIUM: new Google clicks remain sparse; Coverage/Performance periods differ; Bing export periods absent; GA4 windows overlap and include possible QA/self traffic. No ranking/CTR causality is claimed.
- LOW: displayed values round, so recomputing totals from displayed six-decimal per-carton values can differ. The calculator uses unrounded values and the target explains the distinction.

Next state, maximum three:

1. Compare Carton Cube page/query and organic landing signals with date-labelled Bing exports after this change; retain the URL/title/H1.
2. Observe Master Carton/Carton Count and the already-completed Label/Bundle work with aligned periods; no repeated count audit without a new failure.
3. Compare Coverage to Performance and investigate only a newly reproduced technical failure; do not alter sitemap dates or launch a cluster merely to force indexing.
