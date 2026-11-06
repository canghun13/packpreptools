"use strict";

const assert = require("node:assert/strict");
const { engines } = require("../assets/film-tests.js");
const catalog = require("./film-test-content.js");

const [friction, tensile, dart, peel] = catalog.map(({ slug }) => engines[slug]);
const defaults = (tool) => Object.fromEntries([...tool.fields.map(({ name, value, options }) => [name, options?.[0] ?? value]), ["readings", tool.readings]]);
const presets = catalog.map(defaults);
const detail = (result, key) => Object.fromEntries(result.details)[key];
const run = (which, extra) => [friction, tensile, dart, peel][which]({ ...presets[which], ...extra });
const cases = [
  ["all registry entries match", () => assert.deepEqual(Object.keys(engines), catalog.map(({ slug }) => slug))],
  ["COF worked example", () => assert.equal(run(0).primary, "0.3059 static / 0.2039 kinetic")],
  ["COF gf over a g sled", () => assert.equal(run(0, { force: "gf", readings: "50\t40\r\n70\t60" }).primary, "0.3 static / 0.25 kinetic")],
  ["COF lbf and zero are valid", () => assert.equal(run(0, { force: "lbf", sled: "453.59237", readings: "1,0" }).primary, "1 static / 0 kinetic")],
  ["COF reversed force flagged, not discarded", () => assert.equal(detail(run(0, { readings: "1,2" }), "Kinetic above static"), "1 of 1")],
  ["COF no division by zero", () => assert.throws(() => run(0, { sled: "0" }), /Sled mass/)],
  ["tensile worked example", () => {
    const result = run(1);
    assert.equal(result.primary, "40 MPa mean peak stress");
    assert.equal(detail(result, "Mean elongation at break"), "40%");
    assert.deepEqual(result.samples[1], ["Specimen 2", "44 MPa peak · 50% at break"]);
  }],
  ["tensile normalizes each strip separately", () => assert.equal(run(1, { readings: "10,100,20,10,0\n10,50,40,10,10" }).primary, "15 MPa mean peak stress")],
  ["tensile invalid thickness named", () => assert.throws(() => run(1, { readings: "15,0,50,30,20" }), /Row 1 thickness/)],
  ["tensile invalid gauge length named", () => assert.throws(() => run(1, { readings: "15,50,0,30,20" }), /initial gauge length/)],
  ["dart worked example and mass tally", () => {
    const result = run(2);
    assert.equal(result.primary, "105 g estimated 50% failure mass");
    assert.deepEqual(result.samples, [["100 g", "10 pass / 0 fail"], ["110 g", "0 pass / 10 fail"]]);
  }],
  ["dart more failures uses pass basis", () => {
    const result = run(2, { readings: "110,fail\n" + presets[2].readings });
    assert.equal(result.primary, "105 g estimated 50% failure mass");
    assert.equal(detail(result, "Estimator basis"), "Passes + half a mass step");
  }],
  ["dart more passes uses failure basis", () => assert.equal(detail(run(2, { readings: presets[2].readings + "\n100,pass" }), "Estimator basis"), "Failures − half a mass step")],
  ["dart wrong step rejected", () => assert.throws(() => run(2, { step: "5" }), /Row 2: expected 105 g/)],
  ["dart incomplete series rejected", () => assert.throws(() => run(2, { readings: "100,pass\n110,fail" }), /at least ten passes and ten failures/)],
  ["dart outcome token checked", () => assert.throws(() => run(2, { readings: "100,maybe" }), /pass or fail/)],
  ["dart zero increment rejected", () => assert.throws(() => run(2, { step: "0" }), /Mass increment/)],
  ["dart decimal sequence has no spurious grid failures", () => assert.equal(run(2, { step: "0.1", readings: Array(10).fill("0.2,pass\n0.3,fail").join("\n") }).primary, "0.25 g estimated 50% failure mass")],
  ["seal worked example, unrounded count and lbf/in", () => {
    const result = run(3);
    assert.equal(result.primary, "6 N/15 mm mean peak");
    assert.equal(detail(result, "Below your review threshold"), "1 of 3");
    assert.equal(detail(result, "Mean peak, lbf/in"), "2.2841");
  }],
  ["seal equal normalized threshold is not below", () => assert.equal(detail(run(3, { readings: "25,10", minimum: "6" }), "Below your review threshold"), "0 of 1")],
  ["seal review uses unrounded values", () => assert.equal(detail(run(3, { readings: "15,5.999999999", minimum: "6" }), "Below your review threshold"), "1 of 1")],
  ["seal threshold optional", () => assert.equal(detail(run(3, { minimum: "" }), "Below your review threshold"), "No threshold entered")],
  ["seal width cannot be zero", () => assert.throws(() => run(3, { readings: "0,6" }), /strip width/)],
  ["blank record rejected", () => assert.throws(() => run(3, { readings: "\t \n " }), /at least one row/)],
  ["wrong column count rejected", () => assert.throws(() => run(3, { readings: "15,6,8" }), /Row 1: enter 2 values/)],
  ["header rejected with location", () => assert.throws(() => run(3, { readings: "width,force\n15,6" }), /Row 1 peak force/)],
  ["non-numeric text is not accepted", () => assert.throws(() => run(3, { readings: "15,<script>" }), /peak force/)],
  ["row limit enforced", () => assert.throws(() => run(3, { readings: Array(101).fill("15,6").join("\n") }), /no more than 100 rows/)],
  ["character limit enforced", () => assert.throws(() => run(3, { readings: "5".repeat(12001) }), /too long/)],
  ["unsupported force unit rejected", () => assert.throws(() => run(3, { force: "kg" }), /supported force unit/)]
];

for (const [name, check] of cases) {
  try { check(); }
  catch (error) { throw new Error(name, { cause: error }); }
}
console.log("FILM TEST QA PASS — 4 tools, " + cases.length + " checks");
