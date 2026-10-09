# Discrete-count follow-up audit — 2026-10-09

## Scope and starting state

The user asked to finish the previously deferred work. The announced scope is the other calculators' discrete-count validation audit, not a second weekly search-data analysis or a new-cluster discovery. No new pages, global copy rewrite, redesign or forecast restrictions are introduced.

Origin `https://github.com/canghun13/packpreptools.git`, branch main. Start local HEAD, cached origin/main and actual remote main all `4fdea3392c586e7e18bf2595fb8cbfc48593df2c`; clean, fetch confirmed ahead/behind 0/0. No changes were discarded. Latest weekly record and handover restored the already-deployed Carton Count and Master Carton Dimensions fixes.

Inventory remains 85 public HTML / 84 sitemap-indexable / 42 calculators / 4 workflow tools / 15 guides / 13 references / 11 hub-other including 404 / 7 JavaScript files.

## Field-by-field classification

All 42 calculator implementations were screened for count semantics against their existing input labels, method and limitations. A field's `count` display suffix alone is not a sufficient reason to reject decimals.

| Calculator needing new validation | Discrete fields | Why a fraction is not this tool's input |
|---|---|---|
| Void Fill | quantity | Protected products actually sharing one carton |
| Tape Usage | cartons | Cartons using one specified seal pattern |
| Case Pack | cases, unitsPerCase, reserve | Complete sealed cases, fixed case pack, counted loose usable units |
| Box Utilization | quantity | Identical item blocks intended for one box |
| Multi-item Box Fit | quantity | Required whole rectangular items in a grid |
| Label Cost | orders, labelsPerOrder | Defined eligible order run and labels always applied to each order |
| Insert Quantity | orders, insertsPerOrder | Defined eligible orders and fixed insert issue per order |
| Order Packing Time | orders | Counted batch using a comparable pack method |
| Labor Capacity per Shift | workers | Actual assigned headcount, not an FTE-equivalent staffing field |
| Prep Batch Time | units | A clearly defined repeatable prepared-unit batch |
| Kitting Cost | components | Fixed component count; component cost may still be an average |
| Bundle Packing Cost | items | Finished items in one specific bundle configuration |
| Master Carton Weight | units | Actual packed-unit count; unit weight remains measured/decimal |
| Carton Cube | cartons | Identical finished cartons in the shipment |
| Cases per Pallet | layers | Whole repeated layers of a simple whole-case grid |
| Pallet Layer Count | cases, casesPerLayer, maxLayers | Exact cases, approved layer count capacity and whole-layer limit |
| Pallet Height | layers | Repeated whole case layers; measured layer height can be decimal |
| Pallet Utilization | casesPerLayer | Counted cases in a physically verified layer pattern |

These are 18 calculators / 24 fields. All accepted fractional values before the change in independent Node reproduction. Live Edge reproduction: Case Pack reserve 5.5 returned 293.5 total units; Pallet Layer Count cases 85.5 returned 9 layers with 5.5 cases on top. Both were ready results, not errors.

Already-whole calculators: Carton Count, Master Carton Dimensions, Shipping Damage Rate, Packaging Failure Cost, Packaging Trial Comparison, Adhesive Bead Volume, Adhesive Batch Requirement, Intermittent Bead Savings, Adhesive Output Calibration. Their 17 count fields were also audited. The zero-allowed damaged/failure counts interpreted an empty string as zero through `Number("")`; an omitted observation must not be silently treated as an explicitly recorded zero.

### Deliberately retained decimals

- Packaging Material Budget and Monthly Packaging Spend: expected/averaged forecast volume; planning months is a duration.
- Supply Reorder Point: average daily use, lead-time duration, safety/on-hand material quantities in the operation's own unit; continuous supplies must not be coerced to eaches.
- Waste Allowance: base material consumption may be fractional; the planned issue result already rounds upward.
- Bubble Wrap: the existing instructions explicitly allow validated partial wrap layers.
- All dimensions, weights, clearances, gaps, yields, flow/throughput rates, density, money, utilization, percentages, measured labor times and durations remain decimal.
- Quality records still require whole reviewed/incident counts, while measured costs, time and weight remain decimal. No AQL, ISTA, certification, safe-load or damage-prevention decision is added.

## Implementation and preservation

- Replace `positive()` with existing `whole()` only on the 24 identified fields. Preserve formulas, valid output, defaults, zero policy and original maxima. Do not round bad input into a seemingly valid record.
- `whole()` now rejects null/undefined/blank/whitespace before number coercion. Explicit numeric zero remains valid for five zero-allowed fields: reserve, damaged, failures, damagedA and damagedB. Other fields continue requiring at least one.
- Add `wholeCountFields` metadata for 27 calculators / 41 fields to the calculator API. Generator and static QA consume the same explicit field registry, not a blanket `count`-suffix rule. Boundary tests verify that metadata maxima agree with calculation behavior.
- Generate numeric inputmode, min, matching max and step 1. Add a compact whole-count/range note unless the tool already has its specific note. Preserve those Master Dimensions/Carton Count notes. Refresh reviewed date and calculation asset version for the 27 affected pages only.
- Expected public diff: 27 calculator HTML pages. Formula/title/H1/meta/URL/canonical/schema/defaults/IDs/internal links remain identical. CSS, site interaction JS, Guides, Reference, hubs, sitemap, robots, llms and badge block are untouched. No unrelated public page or boilerplate cleanup.
- The new `whole()` missing-count guard is not a blanket change to `positive()` or all monetary/continuous inputs. This audit does not claim to resolve every possible validation issue outside discrete counts.

## Verification

- Baseline prior fixtures passed despite missing fraction coverage. Expanded calculation suite: **42 calculators / 849 checks PASS**, up from 271. Includes 41 fields' fractions, blank/whitespace/missing/null, negative/nonfinite/over-limit values, prohibited zero, accepted minimum/maximum values and numeric-string equivalence. Physical-fit/height/weight companions are adjusted in boundary fixtures so unrelated capacity checks do not obscure count boundaries.
- Independent literal results include maximum Case Pack 1,000,100,000,000 units, maximum case-demand Pallet Layer Count 100 layers with 1,000,000 cases on top, maximum-label demand cost $10,000,000.00, and zero-reserve Case Pack 288 units. Existing normal result assertions remain in the full suite.
- Explicit decimal-preservation fixtures: material forecast 10.5 orders, monthly 1.5-month horizon, wrap 1.5 layers, fractional supply use/lead/stock, fractional base waste material. All pass.
- Generator/static/content/responsive-table QA PASS: 85 HTML / 84 sitemap / 7 JS; 42 calculators / 4 workflow / 15 guides / 13 references; duplicate long paragraphs/sentences 0; mobile input-definition tables 42/42. Workflow checks 46 PASS; diff check PASS.
- Actual installed Edge local browser matrix: 27 affected calculators × 1440/1280/1024/900/768/600/480/390px = **216 renders PASS**. All 41 fields' fractional input errors, plus blank/negative/over-limit/prohibited-zero checks at 1440/390px total **646 invalid-input cases PASS**. Explicit allowed zero, normal results, stale-result clearing, Reset/default/idle/error clearing, rerun and visible mobile menus pass. Horizontal overflow, viewport escape, detected text/control clipping, header overlap, input/suffix misalignment and console/page errors: **0**. The other 15 calculators × 1440/390px = **30 control renders PASS**.
- Screenshots of every affected form at 390px and representative desktop forms were visually reviewed; result/input-table snapshots are retained outside the repository. Element-only tall screenshots can paint the fixed off-screen skip link inside the capture; actual viewport DOM checks confirm that the unfocused skip link remains at top -80px. This is a screenshot artifact, not a changed CSS/layout defect.
- Preservation checks: exactly 27 changed public HTML, all in the explicit registry. Original head/header prefix, H1, formula, input IDs/defaults and internal href lists match HEAD (line endings normalized). Managed homepage badge block remains 5 anchors in the original footer-following position with raw SHA-256 `1205454b420a7a14b16f66a984bf5217af327b33f68fb9e30ebd48824198ed68`; homepage content diff is zero.
- Production verification will be recorded after the implementation deployment.

## Next state

No new-cluster decision is made in this correctness audit. Search metrics and their period/contamination limitations remain those in the weekly review. Global calculator copy cleanup is still a separate editorial decision, not an unfinished part of this validation task. Preserve meaningful decimal inputs when extending the registry in future.
