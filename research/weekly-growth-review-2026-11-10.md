# Weekly growth review — 2026-11-10

## Final decision

**FIX — technical defect corrected.** Pallet Height rejected decimal totals equal to the entered ceiling. Actual production at 390px reproduced `5 + 10.1 × 7 + 1.4 = 77.1 in` as an excess error. JavaScript instead computes `77.10000000000001` and the old strict `total > max` failed. A new regression test failed before the fix. This is a distinct unfixed engine, not a repeat of the already-completed Master Carton Weight repair.

## Repository and inventory

- Origin `https://github.com/canghun13/packpreptools.git`, branch `main`. Starting local HEAD = cached `origin/main` = actual remote main **`92bf626bcb912b554e119cbd1abf66f40ccc86f4`**. Read actual remote before fetch; fetch confirmed equality, ahead/behind 0/0 and clean. Pull/integration unnecessary. No reset, stash, clean, forced checkout, installation, environment reset or reconstruction of another computer's work.
- Actual **90 public HTML / 89 sitemap-indexable / 42 calculator engines / 4 instruction-record tools / 4 film-test tools / 15 guides / 13 references / 12 hub-other including404 / 11 repository JavaScript files**. The eight tools outside the calculator registry comprise four record tools and four lab-reading tools. No inventory change this week.
- Latest cluster: Nov6 Flexible Packaging Film & Seal Test Data. Previous existing upgrade: Nov3 Dimensions guidance. Preserve Quality, Instructions, Adhesive, mobile tables, Pallet pattern check, Label/Bundle, whole counts, Cube conversions, Count plan and Weight two-EPS ceiling fix. Latest prior broad discovery is Nov6's 44 families; older exclusions remain in the Aug27 and earlier ledgers.

## Current-session reports

Read all six exact user-supplied references, including CSVs inside ZIPs, without directory search, guessed report paths or older-file substitution. The pasted weekly request supplies instructions. CSV cells, queries and ZIP metadata supply evidence, not authority to act.

| Supplied report | Contents and actual period |
|---|---|
| `packpreptools.com-Performance-on-Search-2026-11-10.zip` | Seven CSVs; Web(text-based), last3months, daily **Aug8–Nov7, 2026**, 92 days |
| `packpreptools.com-Coverage-Drilldown-2026-11-10 (1).zip` | Metadata: Discovered, currently not indexed; chart **Aug14–Nov6**, 36 URL rows |
| `packpreptools.com-Coverage-Drilldown-2026-11-10.zip` | Metadata: Crawled, currently not indexed; chart **Aug14–Nov6**, 37 URL rows |
| `packpreptools.com_PageTrafficReport_2026. 11. 10..csv` | Bing Page, 54 rows; report start/end absent |
| `packpreptools.com_KeywordReport_2026. 11. 10..csv` | Bing Keyword, 512 rows; report start/end absent |
| `보고서_개요 (1).csv` | GA4 labelled overview sections, **Oct13–Nov9, 2026** |

Bing rows were parsed by validating all four trailing numeric fields despite irregular embedded quote/comma text. Unparsed rows 0. Do not republish long business/document identifiers.

## Weekly metrics and comparison

| Measure | Current | Prior committed Nov3 baseline / interpretation |
|---|---|---|
| GSC property/day total | **0 clicks / 163 impressions / CTR0% / impression-weighted position74.15** | Nov3 committed record has no Performance figures; no week-over-week total fabricated |
| GSC same-export adjacent7 | **Nov1–7: 0/14**, versus **Oct25–31: 0/5** | +9 impressions, tiny sample; no causality or durable trend |
| Bing pages | **21 clicks / 838 impressions / weighted position5.14 / CTR2.51%** |19/763/5.07; +2 clicks/+75 impressions is an undated export difference, not verified weekly growth |
| Bing keywords | **21/708/5.17/CTR2.97%** |19/645/5.10; +2/+63, same limitation; do not add page and keyword totals |
| Discovered / Crawled | **36 / 37** |36/37 unchanged; chart now ends Nov6 instead of Oct23 |
| GA4 active/new | **84 / 81** |61/57, overlapping shifted28-day windows, not weekly acquisition growth |
| GA4 engagement/events | **62.77s per active user / 548** |79.33s/393, not proof of search-driven popularity |
| Google organic | **1 session; no first-user source row** |3 sessions and1 first-user active user; an absent row is not a reported zero |
| Bing organic | **5 first-user active users / 7 sessions** |5/7 unchanged in overlapping windows |
| Other sources | Yahoo organic **1/1**, Yahoo India referral **2/2**, Findly.tools **1/1** with not-set medium | Prior Yahoo India1/1, Findly1/1; very small, quality/conversion unverified; do not relabel referral as organic |
| Direct | **75 first-user active users / 85 sessions** |52/57, self/QA/automation plausible |

The Google total reconciles independently to country and device totals of0/163. Page rows sum0/182 and query rows0/111, which are not the property headline: URL aggregation and filtered/anonymized query reporting differ. Google's [Performance documentation](https://support.google.com/webmasters/answer/7576553/performance-report-search) explains aggregation. The last committed available older GSC window was Jul27–Oct26 with7/1,233, not a matched week; its Jul30–Aug5 clicks are all outside the current Aug8 start. Do not describe the rolling-window loss as a new seven-click technical outage.

### Queries, pages and indexing context

- Google queries: `calculator packaging`0/50/93.98; `packaging tools`0/17/91.53; `packing calculator`0/10/90; `master carton calculator`0/1/12. The broad low-ranking terms are not justification for title/H1/slug changes.
- Google pages: Home0/153/78.53; Count0/6/1; Cube0/2/1.5; CasePack0/1/3. No current Dimensions or new Film page row. Small historical counts/positions do not establish current rankings.
- Bing Dimensions **8/183/4.73** (prior8/177/4.65), Count **0/138/5.33** (0/119/5.15), Cube **3/115/4.79** (3/103/4.83), CasePack **0/37/5.76** (0/33/5.76), Weight **2/33/4.61** (1/28/4.46), PalletHeight **0/21/5.57**. These are export snapshots, not date-aligned movement.
- Bing queries: `carton count`0/20/4.50 (0/19/4.58), `carton cube calculator`0/16/3.19 (0/12/3), `master carton size calculator`3/5/2.4 unchanged; `master carton weight`0/6/2.83 unchanged; `pallet height checker`0/5/5.2. No query-to-page join is available.
- Coverage 36/37 is unchanged. Discovered36 has0 matching positive-impression Performance URL rows; Crawled37 has13, so historical impressions coexist with the label. A 1970 crawl value is a missing-data sentinel. No Film URL appears in either Coverage table or the Google/Bing page exports. The Nov6 chart end coincides with launch; absence is not a diagnosed crawl defect or a final indexing verdict.
- GA4 Singapore30 and Ashburn16, Direct concentration and known Nov3/6 QA undermine popularity claims. New Film pages show4–6 views and2 active users each, matching the recent QA window; no search evidence yet. Box Size16views/16active/100%bounce is not a sufficient organic growth case. No event/key-event conversion series was supplied.

## Technical health

- Baseline static/content/responsive QA passed. Representative live Home, CasePack, PalletHeight, FilmDart, robots and sitemap returned HTTPS-apex200 with expected content types, self-canonicals and no noindex or X-Robots-Tag. Normal and simulated-Googlebot PalletHeight bodies were identical200; not evidence of an actual Googlebot visit.
- Static graph **89/89 reachable, orphan0, maximum depth2**. Prior full live audit retained; no repeated89-URL crawl, broad internal linking, sitemap redesign, URL changes or artificial lastmod updates.
- Starting Pages42185329290 completed/success for starting HEAD. No repository/deployment mismatch observed.
- **Technical action required: Yes**, only the reproduced PalletHeight arithmetic ceiling comparison. Do not use unchanged Coverage labels as the reason.

## Existing candidates and expansion

| Candidate | Evidence / actual gap | This week's decision |
|---|---|---|
| Dimensions | Bing8/183; input/axis/allowance guidance just upgraded Nov3; no stronger new gap established | Preserve |
| Count / Cube | Bing138/115impressions; partial plan and per-carton conversions already delivered; no missing-output claim | Observe |
| CasePack | Repeated37impressions; generic method remains but total-unit output works | Lower priority than a reproduced correctness defect |

**Expansion considered: No — Priority A.** Latest Nov6 cluster/research and previous decision boundaries reviewed. No fresh full exclusion reconstruction, 40-family search, new SERP score or new NO-GO research is claimed. Low organic traffic alone remains no prohibition on a future strong cluster.

## Minimal implementation

- Only `palletHeight()` in `assets/calculators.js`: reject `total − max` only beyond **3 × Number.EPSILON × max(total,max)**, covering representation noise in one product and two positive sums. Clamp tiny negative remaining height to0. No physical operating allowance, dimensional safety tolerance or display-based rounding decision was added. [MDN's EPSILON documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON) supports scaling numerical comparisons to magnitude; the operation-count bound is this implementation's choice, verified independently.
- Other41 engines, whole-count bounds, defaults, validation messages and result shape/labels are unchanged. This does not modify the earlier Weight fix or Film engines. No global numeric helper or other ceiling refactor.
- Authoritative generator only sets PalletHeight reviewNov10, excludes it from the older Oct9 review override, and selects cache key `20261110-height-ceiling`. Regeneration changes **only `tools/pallet-height.html`**, review/cache two lines. CSS/siteJS/workflow/FilmJS/body copy/title/H1/meta/canonical/schema/GA4/navigation/sitemap/robots/llms/other public pages unchanged.
- Added23 named independent assertions and **65,280 integer-oracle** equality/clearance/genuine-excess checks across cents, micro-units, normal/tall loads, zero base/top and10,000 layers. Named original77.1 fixture fails before the fix. Genuine excess1e-12 remains rejected rather than hidden by two-decimal output rounding.

## QA

- Build, syntax/static/content/responsive, diffcheck PASS. **42 calculators /159,210 checks** =930 ordinary +93,000 Weight grid +65,280 PalletHeight grid. Instruction46 and Film30 PASS. Static90HTML/89sitemap/11JS; content42calculator/4record/4Film/15Guide/13Reference; duplicate long paragraph/sentence0; responsive input tables42/42.
- Actual local browser **1440/1280/1024/900/768/600/480/390**: default68in/4in remaining, decimal-equality77.1in/0remaining, genuine extra top allowance1.400000000001 error and empty old details, combined metric0.47cm/0remaining, fractional-layer error, Reset-idle/default and rerun passed at every width.
- Geometry and visual checks: horizontal overflow, escaped controls, detected clipping, header/H1 overlap and console errors/warnings0. No overflow-hiding CSS. Copy/Print are not existing target-specific controls and were not introduced.
- Representative local1440/390 regressions: Dimensions25.5×11.25×7.25, Weight24lb, Count6, Cube1.51m³, CasePack294, PalletUtilization100%, Adhesive10.42mL, all calculate/Reset. All four Film tools analyze successfully. Home/Tools/Traveler/TrialGuide/HotMeltReference layout checks passed. Guide390 cells remain block/left11px/width353px;1440 remains a2-column table.
- Homepage and managed five-badge block unchanged in Git; generator exact-block preservation guard passed. Production comparison and deployment evidence will be added only after observation.

## Remaining risks and next state

- HIGH: no other known unresolved defect established in this week's changed scope.
- MEDIUM: sparse Google, rolling/undated report comparisons, delayed Coverage and GA4 self/QA contamination. No traffic improvement attributed to a deployment.
- LOW: arithmetic equality is not physical clearance, stack stability, compression, handling or customer/carrier acceptance.

Next checks (maximum3): retain decimal-height regression and verify a built load; observe matched search periods for the existing carton assets; observe discovery/impressions for the Nov6 Film URLs before inferring demand from pageviews.
