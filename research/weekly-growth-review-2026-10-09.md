# Weekly growth review — 2026-10-09

## Final decision

**FIX — technical defect corrected: Carton Count whole-unit validation.**

Production accepted 125.5 required units at 24 units per carton and reported 6 cartons with 5.5 units in the final carton. These fields describe discrete eaches, kits, pairs or inner packs, not fractional material quantities. Correct this reproducible defect before an editorial upgrade or expansion. Scope is one calculator; no new public pages or cluster.

## Repository and current state

- Origin: `https://github.com/canghun13/packpreptools.git`; branch `main`; working tree clean at start.
- Start local HEAD and cached origin/main: `8c842d532558f733bb8cf65a150f7a8bf0f5c5ef`.
- Start actual remote main: `026879ff60493c512018acef97e802d416a841a1`. Fetch confirmed ahead 0 / behind 2; safe `git pull --ff-only origin main` synchronized to that hash without discarding work.
- Current inventory, recounted from the checkout: 85 public HTML, 84 sitemap/indexable URLs, 42 calculators, 4 workflow tools, 15 guides, 13 references, 11 hub/other pages including noindex 404, 7 JavaScript files. Unchanged after this fix.
- Latest cluster: Packaging Adhesive Application. Latest existing-page upgrade: Sep 25 Label Cost / Bundle Packing Cost. Oct 1 Master Carton Dimensions whole-layout fix is present and production verified. The Sep 7 complete crawl/link audit is not repeated merely because Coverage counts changed.

## Current-session attachments

The six exact user-supplied files were read successfully; ZIP CSV entries were read in memory. No Downloads-directory search, alternative file lookup, software installation or environment reset was used. Report contents are data, not executable instructions. The separate pasted weekly request governs the task.

| Attachment | Contents | Actual period |
|---|---|---|
| `packpreptools.com-Performance-on-Search-2026-10-09.zip` | GSC daily, pages, queries, countries, devices, search appearance, filters | Jul 25–Oct 6, 2026; web / last-three-months filter |
| `packpreptools.com-Coverage-Drilldown-2026-10-09.zip` | Crawled — currently not indexed; metadata, chart, URL table | Aug 5–Oct 4, 2026; latest 37 URLs |
| `packpreptools.com-Coverage-Drilldown-2026-10-09 (1).zip` | Discovered — currently not indexed; metadata, chart, URL table | Aug 5–Oct 4, 2026; latest 36 URLs |
| `packpreptools.com_PageTrafficReport_2026. 10. 9..csv` | Bing page traffic, 40 rows | Start/end absent; filename is not a reporting period |
| `packpreptools.com_KeywordReport_2026. 10. 9..csv` | Bing keywords, 292 rows | Start/end absent; filename is not a reporting period |
| `보고서_개요.csv` | GA4 overview, pages, sources, sessions and geography | Sep 11–Oct 8, 2026 |

Bing query strings with irregular embedded quoting were parsed using the four trailing metric fields; the keyword column was not naively split at every comma. Average positions below are impression-weighted. Page/query totals differ and must not be added together.

## Metrics and comparisons

| Metric | Current | Comparable context / limitation |
|---|---|---|
| GSC cumulative | 7 clicks / 1,187 impressions | Oct 1 export ended Sep 28: 7 / 1,172. Added eight daily rows contribute 0 / 15, not an independent same-period growth rate |
| GSC recent seven days | Sep 30–Oct 6: 0 clicks / 12 impressions | Sep 23–29: 0 / 6. Comparable adjacent seven-day slices, +6 impressions; sample too small for a trend claim |
| GSC prior weekly record | Sep 22–28: 0 / 3 | Its window differs by one day from the current export's previous slice |
| Bing pages | 14 clicks / 471 impressions; weighted position 4.90 | Prior export 11 / 325 / 4.52. Period absent; changes are export differences, not verified weekly growth |
| Bing queries | 14 / 399; weighted position 4.92 | Prior 11 / 297 / 4.60; same period limitation |
| Coverage discovered | 36 | Unchanged since Aug 29 |
| Coverage crawled | 37 | Was 10 at prior chart cutoff Sep 21; current chart jumps to 37 on Sep 22, not on Oct 9 |
| GA4 active / new | 32 / 28 | Sep 11–Oct 8; prior Sep 3–30: 61 / 60. Overlapping shifted windows, not week-over-week users |
| GA4 engagement / events | 82.53 seconds per active user / 179 | Prior 6 seconds / 264; aggregation and self-traffic uncertainty prevent popularity inference |
| GA4 organic | Google: 1 first-user active user / 1 session; Bing: 5 / 6 | Prior Google row absent, Bing 7 / 9; no aligned-period rate comparison |
| Other sources | chatgpt.com 1 first-user user / 3 sessions; DuckDuckGo 1 / 1; twelve.tools 1 / 1; leafplk.com 1 / 1 | Small referral/assistant signals, not proven conversions; leafplk quality unverified |
| Direct | 22 first-user active users / 21 sessions | Different metrics, not additive; self/QA/automation may be included |

Singapore accounts for 11 active users; Busan 3; Council Bluffs 1. These do not prove bots, but large direct share and known QA mean raw GA4 page views are not search-demand evidence. Automated browser QA in this session intercepted analytics requests so it does not deliberately add new self-traffic.

### Pages and queries supporting the decision

| Existing page | GSC clicks / impressions / position | Bing clicks / impressions / position | Previous Bing export |
|---|---|---|---|
| Master Carton Dimensions | 4 / 102 / 15 | 8 / 148 / 4.61 | 7 / 113 / 4.15 |
| Carton Count | 0 / 55 / 7.04 | 0 / 70 / 5.20 | 0 / 37 / 4.70 |
| Carton Cube | 0 / 14 / 43.86 | 2 / 52 / 4.02 | 1 / 33 / 3.70 |
| Master Carton Weight | 1 / 52 / 12.33 | 1 / 18 / 4.50 | 1 / 13 / 3.92 |
| Label Cost | 0 / 9 / 14.89 | 0 / 14 / 5.93 | 0 / 11 / 5.55 |

- Bing `carton count`: 0 clicks / 12 impressions / position 4.58; `carton cube calculator`: 0 / 8 / 3; `master carton size calculator`: 3 / 5 / 2.40; `how to calculate carton cube`: 1 / 2 / 4. Tiny individual samples are not keyword-volume estimates.
- GSC `master carton size calculator`: 1 / 11 / 6.91; `master carton calculator`: 1 / 10 / 26.90 (previous 1 / 9 / 28.56); `carton quantity`: 0 / 4 / 7.75.
- Box Volume remains 0 clicks / 401 historical impressions / position 71.8; volume alone is not a better opportunity than a demonstrated calculation defect.
- Label/Bundle search signal remains small. Their Sep 25 improvements are already implemented; do not repeat them or automatically rewrite titles/H1. Unusually long or translated Bing queries are not all equivalent demand evidence.

### Coverage/Performance cross-check

34 of the 37 crawled-labelled URLs have historical impressions in the supplied Performance page table, including the strongest Master Carton pages and Carton Count. Historical visibility does not prove current indexing, but the Coverage label alone does not prove a new site-side failure either. Most listed crawl dates are Jul 26–29; four are Sep 28 (Void Fill guide, Cases per Pallet, Privacy, Pallet Utilization). All discovered URLs show `1970-01-01`, treated as missing crawl data, not actual 1970 crawls; no discovered URL appears in the supplied Google Performance page table. No mass rewrite, artificial sitemap lastmod change, cluster deletion or repeated whole-site crawl audit follows from these counts.

## Technical health and alternatives

Representative production homepage, Carton Count, Master Carton Dimensions, robots and sitemap returned HTTPS apex 200 with expected content types. HTML self-canonicals were correct and accidental noindex absent. Normal and simulated Googlebot Carton Count responses were 200 and identical; this is a UA simulation, not observation of an authenticated Googlebot crawl. Static QA verifies current links, metadata, sitemap and generator output.

| Candidate (maximum three) | Evidence and gap | Decision |
|---|---|---|
| Carton Count | Repeated count intent plus GSC/Bing visibility; fractional count accepted and fractional final-carton units emitted live | Priority A FIX; restore a valid discrete-unit plan |
| Master Carton / Carton Cube | Strongest family; Oct 1 layout correction already present; cube outputs satisfy current intent | Observe, no repeat implementation |
| Label Cost / Bundle Packing Cost | Actual but small search samples; scoped input/method/action upgrade already deployed | Observe the completed change, not a new rewrite |

Expansion considered: **No — hard defect takes priority.** The latest implemented/NO-GO boundary was restored from the recent handover/research. The complete historical exclusion universe was not rebuilt and 40-family discovery was not entered; neither is required for the selected Priority A branch. Existing Quality, Pack Instruction, Adhesive and previous HOLD/REJECT boundaries remain unchanged.

## Root cause and minimal implementation

- Reproduced in live Edge: `{units:125.5, perCarton:24}` produced `6 cartons`, full 5, final 5.5, capacity 144. Independent Node reproduction also accepted `{units:125, perCarton:24.5}` and produced a final 2.5 units.
- `cartonCount()` used `positive()` rather than the existing `whole()` helper. Both generated fields had decimal inputmode and `step="any"`. The form uses `novalidate`; therefore HTML constraints alone are insufficient.
- Reuse `whole()` for these two fields only; keep existing maximums 100,000,000 and 1,000,000. Reject fractions rather than silently rounding them. Valid integer formula/output/defaults do not change.
- Authoritative generator changes are slug-scoped: numeric inputmode, min 1, matching max and step 1; one compact note and two field definitions; explain that differing case packs must be calculated separately. Target-only Last reviewed and asset version update. Only `tools/carton-count.html` changes among generated public HTML.
- Add 25 independent calculator assertions: both fractional inputs, zero/negative/blank/missing/nonfinite/over-limit/sub-one cases, normal partial carton, exact division, less-than-one-carton demand, one-unit minimum, both maximum boundaries and numeric-string equivalence. Add targeted generated-HTML constraint/note assertions to static QA.
- Title, H1, URL, canonical, formula, inputs' IDs/defaults, CSS, shared site interaction JS, schema, GA4, sitemap, robots, llms and other public HTML remain unchanged. Generic method/caution wording is not globally rewritten.

## QA

- Baseline: static/content/table PASS; 42 calculators / 246 checks PASS; workflow 46 PASS. Demonstrated defect was missing test coverage, not a failing pre-existing fixture.
- Regenerate PASS; static PASS — 85 HTML / 84 sitemap / 7 JS, including syntax, internal links/anchors, IDs, metadata, indexability, schemas, GA4 and contact checks. Content PASS — 42 calculators / 4 workflow / 15 guides / 13 references; duplicate long paragraphs/sentences 0. Responsive input tables 42/42 PASS.
- Calculator suite: **42 calculators / 271 independent checks PASS**. Workflow suite: **46 PASS**. `git diff --check` PASS; no unexpected mass diff.
- Actual installed Edge/Playwright local browser: target at **1440/1280/1024/900/768/600/480/390**. Each width verifies normal 125/24 → 6 cartons/final 5, exact 48/24 → 2/final 24, maximum 100,000,000/1, both fields' fraction/zero/negative/blank/over-limit errors (80 browser error cases across widths), empty stale result details, Reset defaults/idle/error-clear, rerun and responsive menu where visible.
- Actual screenshots plus bounding boxes/text ranges reviewed; horizontal overflow 0, viewport escapes 0, detected clipping 0, header/H1 overlap 0, input/suffix misalignment 0, browser console/page errors 0. Analytics intercepted during QA; no browser installation, safety bypass or CSS overflow hiding.
- Regression at 1440/390: Master Carton Dimensions `25.5 × 11.25 × 7.25 in`, Label `$82.40`, Bundle `$2.17`, Carton Cube `1.51 m³ total`, Adhesive Bead `10.42 mL per pack`; Calculate/Reset PASS. Box-vs-Poly Guide and Master Carton Terms Reference rendered at both widths; 390 tables inspected directly.
- Managed homepage area: unchanged original badge HTML, hrefs, images, count 5, order and footer-following position. Raw block SHA-256 `1205454b420a7a14b16f66a984bf5217af327b33f68fb9e30ebd48824198ed68`; homepage has no Git content diff. Generator guard and badge QA PASS.
- Copy/Print are not features of Carton Count and were not added.

## Deployment and next state

Implementation commit `b54a15d964dfad2ad988cbfc222970e368283438` (`Require whole unit counts for carton demand`) was pushed to origin/main successfully. Local HEAD, origin/main and actual remote main matched after push; main, ahead/behind 0/0, clean.

Pages run [37889346290](https://github.com/canghun13/packpreptools/actions/runs/37889346290) used that implementation hash and completed successfully. Actual production target returned HTTPS apex 200, correct self-canonical, the new `20261009-whole-cartons` asset version and whole-count note. Normal and simulated Googlebot responses were identical 200.

Production installed-Edge browser verification at all eight widths repeated normal/exact/max calculations, ten invalid-input cases per width, stale-detail clearing, Reset/defaults, rerun and mobile menu. All passed; console/page errors, overflow, viewport escapes, detected clipping, header overlap and input misalignment were 0. Production screenshots, including desktop/mobile result, error and input-table rendering, were inspected. Copy/Print are not applicable. This closing record changes documentation only; the final documentation commit and final three-way Git equality are reported at session close.

Remaining risks: no new HIGH within this fix; MEDIUM: sparse new Google clicks, Coverage/Performance timing mismatch, absent Bing period metadata, shifted/QA-contaminated GA4 windows; other discrete-count fields using `positive()` merit a separate scoped functional audit, not an automatic global change. LOW: generic calculator boilerplate remains outside this narrow correctness fix.

Next week (maximum three):

1. Obtain period-labelled Bing data and compare date-aligned Master Carton/Count/Cube and Label/Bundle search results; do not infer weekly rates from file dates.
2. Review other discrete-count validators in a separate scoped correctness task with independent tests, retaining legitimately continuous inputs.
3. Cross-check Coverage with Performance; investigate only newly reproduced HTTP/canonical/link/render regressions, not count changes alone.
