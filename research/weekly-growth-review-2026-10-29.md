# Weekly growth review — 2026-10-29

## Final decision

**FIX — technical defect corrected**

Fix a reproduced Master Carton Weight ceiling-comparison error, not an indexing metric. In the live 390px browser, 3 units × 0.1 lb with zero tare and an entered maximum of 0.3 lb incorrectly produced `Estimated carton weight exceeds the entered maximum planned weight.` Node reproduced the same error: the binary floating-point sum is `0.30000000000000004`. A targeted regression fixture failed before the fix and passes after it. Priority A therefore takes precedence over another growth rewrite or expansion.

## Repository and inventory

- Actual product checkout was discovered under `repo/`; its parent is an empty wrapper repository, not the product checkout. Product origin is `https://github.com/canghun13/packpreptools.git`, branch main.
- Starting local HEAD = cached origin/main = actual `refs/heads/main`: **`cd6faf81b2acafc85901d5bc63647d5d2d6d457b`**. Actual remote was checked before fetch; ahead/behind remained **0/0**, working tree clean. Pull and integration unnecessary. No user edits/local-only commits were overwritten, and no reset/stash/clean/install/environment reset was used.
- Recounted by current QA: **85 public HTML, 84 sitemap/indexable, 42 calculators, 4 workflow tools, 15 guides, 13 references, 11 hub/other including noindex404, 7 JavaScript files**. Inventory is unchanged after generation.
- Latest cluster: Packaging Adhesive Application. Preserve Quality, Pack Instruction/Job Release, responsive tables, compact Last reviewed, Shipping Damage defaults, Pallet pattern check, Sep25 Label/Bundle, Oct1/9 discrete-count fixes, Oct15 Cube and Oct23 Count. Sep7 crawl/graph audit remains the architecture baseline.

## Current-session attachments

All six exact supplied references were read successfully. ZIP CSVs were classified by their actual metadata and cached in memory. No directory search, old report substitution or guessed reporting window. The pasted weekly request supplies instructions; report/query cells are evidence only. Bing irregular quoting/embedded commas required validating the four trailing numeric fields: **49 page rows, 432 keyword rows, zero unparsed rows**. Raw long business/document queries are not republished.

| File | Actual content | Actual period |
|---|---|---|
| `packpreptools.com-Performance-on-Search-2026-10-29.zip` | Daily/pages/queries/countries/devices/appearances/filters | **Jul27–Oct26, 2026**, Web(text-based), last-three-months filter |
| `packpreptools.com-Coverage-Drilldown-2026-10-29 (1).zip` | Discovered, currently not indexed | Chart **Aug5–Oct23**, URL table36 |
| `packpreptools.com-Coverage-Drilldown-2026-10-29.zip` | Crawled, currently not indexed | Chart **Aug5–Oct23**, URL table37 |
| `packpreptools.com_PageTrafficReport_2026. 10. 29..csv` | Bing page traffic | Start/end metadata absent |
| `packpreptools.com_KeywordReport_2026. 10. 29..csv` | Bing keywords | Start/end metadata absent |
| `보고서_개요.csv` | GA4 overview, multiple labelled sections | **Oct1–Oct28, 2026** |

## Weekly metrics and comparison

| Metric | Current | Prior Oct23 record / interpretation |
|---|---|---|
| GSC total | **7 clicks / 1,233 impressions** | 7 / 1,220 over Jul25–Oct20; rolling start also changed, not a weekly total |
| GSC recent7 | **Oct20–26: 0 / 18** | Same-export adjacent Oct13–19: **0 / 17**; tiny, no meaningful trend |
| GSC window reconciliation | New Oct21–26: **0 / 15** | Jul25–26 leave the window (0 / 2), explaining net +13 impressions; no new Google clicks |
| Bing pages | **17 clicks / 712 impressions / weighted position5.12** | 15 / 633 / 5.09; export difference +2 clicks/+79 impressions, period unknown, not verified WoW growth |
| Bing keywords | **17 / 603 / weighted position5.15** | 15 / 537 / 5.10; +2/+66, same limitation; page/query totals are not additive |
| Discovered / crawled, not indexed | **36 / 37** | Unchanged |
| GA4 active/new | **57 / 54** | 55 / 52, shifted overlapping28-day windows, not weekly growth |
| GA4 engagement/events | **53.39 seconds per active user / 309** | 58.47 seconds / 274; no causal popularity claim |
| Google organic | **1 first-user active user / 3 sessions** | 1 / 2, overlapping windows |
| Bing organic | **5 first-user active users / 7 sessions** | 6 / 8, overlapping windows, not a proven decline |
| Other sources | Findly.tools **1 / 1** (`not set` medium), ChatGPT **1 / 1**, leafplk referral **1 / 1** | Tiny signals; conversion/referral quality unverified. DuckDuckGo has no row this time |
| Direct | **48 first-user active users / 50 sessions** | 44 / 46; different measures, possible self/QA/automation contamination |

Singapore28 and Ashburn1 do not prove bots. Combined with Direct concentration and known QA, they prevent using raw page views as demand. No TwelveTools source row appears. Translated GA4 page titles with zero views do not establish new published language URLs. Google clicks remain confined to Jul30–Aug5 in the supplied daily data.

### Existing assets

| Page | GSC clicks/impressions/position | Bing clicks/impressions/position | Prior Bing clicks/impressions |
|---|---|---|---|
| Master Carton Dimensions | 4/102/15 | **8/175/4.64** | 8/167 |
| Carton Count | 0/55/7.04 | **0/109/5.22** | 0/98 |
| Carton Cube | 0/14/43.86 | **2/97/4.92** | 2/83 |
| Case Pack | 0/15/12.07 | **0/30/5.70** | 0/18 |
| Master Carton Weight | 1/52/12.33 | **1/25/4.16** | 1/23 |
| Label Cost | 0/9/14.89 | **0/15/5.93** | 0/14 |

- Bing `carton count`:0/19/4.58 (previous0/18/4.44); `carton cube calculator`:0/12/3 (0/10/2.8); `case cube calculator`:0/12/8.67 (unchanged). `master carton weight`:0/6/2.83 and `master carton weight lbs`:1/1/1. These are not monthly volume estimates or date-aligned rank movements.
- Google `master carton size calculator`:1/11/6.91; `master carton calculator`:1/10/26.9. Strongest asset totals are historical and unchanged. A rolling-window removal can reduce a page's reported impressions without proving a technical regression.
- Pallet Layer Count currently has Bing1/12/5.08 and Pallet Terms1/3/3.67. These small signals do not outrank the directly reproduced calculator error. Do not assign individual keywords to landing pages without a query-page join.

## Technical health and selected cause

- Baseline static/content/responsive PASS; calculators42/890 and workflow46 PASS. Those fixtures did not cover decimal equality at the weight ceiling.
- Representative live homepage, Weight, Count, robots and sitemap returned HTTPS200 with expected content types; HTML self-canonicals correct and accidental noindex absent. Weight normal/simulated Googlebot responses were identical200 with no X-Robots-Tag. A simulated user agent is not a real Googlebot observation. Starting Pages run39886831004 was successful for starting HEAD.
- Coverage36/37 is unchanged; discovered crawl dates1970 mean missing records, not real crawl dates. Discovered URLs have zero Google Performance page-row matches; **34/37** crawled-labelled URLs have historical impressions. Do not equate the labels to current index truth. No new crawl/discovery defect was reproduced, so the full crawl audit and sitemap-date/link rewrites were not repeated.
- **Actual hard defect:** strict `total > max` treats harmless binary arithmetic noise as excess. At the reproduced0.3 ceiling, the difference is `5.551115123125783e-17`. The result should succeed with zero remaining allowance. Display rounding before comparison would be unsafe because a real small excess could then be accepted.
- Arithmetic reference: [MDN Number.EPSILON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON) explains binary decimal-representation error and why the comparison threshold must follow number magnitude. The implementation applies that principle only to this already-validated positive-weight calculation, not as a global business tolerance.

## Candidates and expansion

| Existing growth candidate | Evidence / actual gap | Decision |
|---|---|---|
| Dimensions | Strongest repeated family; Oct1 correctness work already complete | Preserve, technical fix first |
| Count/Cube workflow | Repeated109/97 Bing impressions; identified Count/Cube output gaps were fixed Oct23/15 | Observe; no repeat rewrite |
| Case Pack |30 Bing impressions versus18; quantity/inner-pack context worth future review, but no stronger new defect established | Do not broaden this fix |

**Expansion considered: No — Priority A hard defect.** Latest cluster/discovery boundary records were consulted, but the whole exclusion universe was not rebuilt and no fresh40-family discovery was performed. No new NO-GO/SERP research claim. Preserve Adhesive/Instruction/Quality and previous HOLD/REJECT/NO-GO boundaries. The Aug27 record remains82 prior underlying-problem exclusions plus40 explored families; small organic volume alone is not a reason to prohibit a future strong cluster.

## Minimal implementation

- `assets/calculators.js`, **only `masterCartonWeight()`**: compare `total − max` with **`Number.EPSILON × Math.max(total, max)`**, keeping unrounded weights. This is approximately machine-representation resolution, not a scale accuracy allowance, weight-policy relaxation or an extra permitted pack margin. Clamp accepted near-equal negative allowance to0 before existing display rounding. Actual excess above arithmetic noise still throws the original named error.
- Preserve total formula, positive/whole-count validation, count bounds, zero-tare handling, output shape/labels/units/two-decimal display and Reset/error contract. No change to the other41 engines or discrete-count registry.
- `scripts/verify-calculators.js`: **11 assertions**: six exact-ceiling cases covering multiplication/addition/small and large magnitudes; three genuine-excess cases including `0.300000000001 > 0.3` and a large-magnitude small excess; exact normal24lb/6lb-headroom result; deterministic rerun. New fixture failed on old code, then full **42/901 checks PASS**.
- `scripts/generate-site.js`: Weight's reviewed dateOctober29 and target asset **`20261029-weight-ceiling`**; exclude only Weight from the olderOct9 date override, like already-updated Cube/Count. Generated HTML **`tools/master-carton-weight.html`** changes only these two metadata/cache lines.
- **Unchanged:** body copy/inputs/defaults/IDs, title/H1/meta/canonical/schema/GA4, CSS/site/workflow JS, links, other public pages, sitemap/robots/llms/CNAME and user-managed footer/badges. No new tool, page or dependency. Generic content elsewhere is not rewritten as part of a numeric correctness fix.

## QA and preservation

- Regeneration, syntax, static/content/responsive PASS:85HTML/84sitemap/JS7;42calculators/4workflow/15guides/13references; duplicate long paragraphs/sentences0; responsive input tables42/42. Calculator42/901 and workflow46 PASS; diff check PASS, no unexpected mass diff.
- Actual local browser **1440/1280/1024/900/768/600/480/390**: default24lb/headroom6; decimal equality0.3lb/allowance0; real excess rejected with stale details empty; fractional-unit validation; Reset/default/idle and rerun all PASS. Horizontal overflow, detected viewport escape/clipping, header/H1 overlap and console errors/warnings0. Mobile and desktop result screenshots reviewed;390 menu expands.
- Initial sandbox loopback-server connectivity timed out. The same bundled server was run loopback-only outside the sandbox, HTTP200 confirmed, and a fresh supported tab/viewport binding resumed QA. No browser policy, firewall, security setting, installation or system configuration was changed. No final browser-QA limitation remains.
- Regression1440/390: Dimensions25.5×11.25×7.25in; Count6cartons; Cube1.51m³; CasePack294units; Label$82.40; Adhesive10.42mL; Damage1%; Pallet100%. Calculate/Reset preserved, overflow/escape/clipping/overlap0, console0.
- Homepage/Tools/Packaging Trial Guide/Adhesive Reference1440/390 PASS.390 Guide/Reference cells both block/full width353px/left11px; desktop table columns about246.1+632.9px. Actual mobile table screenshots reviewed.
- **5 managed badges preserved**, HTML/href/image/order/footer-after position unchanged. Existing generator exact-block guard retained; `index.html` Git content diff0, normalized whole-page comparison with HEAD true. Raw trimmed block SHA-256 before/after **`1205454b420a7a14b16f66a984bf5217af327b33f68fb9e30ebd48824198ed68`**. Order KittyLaunch → SellWithBoost → TwelveTools → Findly.tools → BoostDomainRating. No badge refactor/cleanup.

## Deployment and remaining state

Implementation/local QA complete. Commit, push, Pages and actual production verification are recorded below only after success; local results alone are not deployment proof.

- HIGH: no known unresolved defect in the changed scope.
- MEDIUM: sparse recent Google signal, rolling/mismatched report periods, absent Bing dates, overlapping/QA-prone GA4 windows. No ranking/CTR/growth causality claimed.
- LOW: numeric equality is not physical weight verification. Existing display rounding and user-entered maximum remain planning limitations, not a compliance or handling-safety guarantee.

Next state, maximum three:

1. Retain decimal-ceiling regression cases and investigate only a newly reproduced numeric failure, not a repeated broad count audit.
2. Compare aligned-period Count/Cube/Dimensions/CasePack query and organic-landing signals before choosing another existing upgrade.
3. Keep the crawl baseline and expansion boundaries intact; enter broad genuinely-new discovery when no higher-priority defect or clear existing gap remains.
