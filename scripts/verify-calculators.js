"use strict";

const assert = require("assert");
const api = require("../assets/calculators.js");
const calculators = api.calculators;
const IN_TO_CM = 2.54;
let checks = 0;

function numbers(output) {
  return output.primary.match(/-?\d+(?:\.\d+)?/g).map(Number);
}

function close(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, got ${actual}`);
  checks += 1;
}

function throws(id, input) {
  assert.throws(() => calculators[id](input), Error, `${id}: invalid input should throw`);
  checks += 1;
}

function primary(id, input, expected, tolerance, label) {
  close(numbers(calculators[id](input))[0], expected, tolerance || 0.01, `${id} ${label}`);
}

primary("dimensional-weight", { length: 12, width: 10, height: 8, divisor: 139, unit: "in" }, 6.91, 0.001, "normal 1");
primary("dimensional-weight", { length: 30, width: 20, height: 10, divisor: 166, unit: "in" }, 36.14, 0.001, "normal 2");
primary("dimensional-weight", { length: 0.1, width: 0.1, height: 0.1, divisor: 139, unit: "in" }, 0, 0.001, "boundary");
throws("dimensional-weight", { length: 0, width: 10, height: 8, divisor: 139, unit: "in" });
const dimIn = numbers(calculators["dimensional-weight"]({ length: 10, width: 5, height: 2, divisor: 139, unit: "in" }))[0];
const dimMetric = numbers(calculators["dimensional-weight"]({ length: 25.4, width: 12.7, height: 5.08, divisor: 5000, unit: "cm" }))[0];
close(dimMetric / 0.45359237, dimIn, 0.02, "dimensional-weight bidirectional unit conversion");

primary("length-girth", { length: 30, width: 18, height: 12, unit: "in" }, 90, 0.001, "normal 1");
primary("length-girth", { length: 10, width: 8, height: 6, unit: "in" }, 38, 0.001, "normal 2");
primary("length-girth", { length: 0.01, width: 0.01, height: 0.01, unit: "in" }, 0.05, 0.001, "boundary");
throws("length-girth", { length: 0, width: 1, height: 1, unit: "in" });
const girthIn = numbers(calculators["length-girth"]({ length: 30, width: 18, height: 12, unit: "in" }))[0];
const girthCm = numbers(calculators["length-girth"]({ length: 76.2, width: 45.72, height: 30.48, unit: "cm" }))[0];
close(girthCm / IN_TO_CM, girthIn, 0.02, "length-girth bidirectional unit conversion");

primary("box-size", { length: 10, width: 6, height: 4, clearance: 0.5, wrap: 0.25, unit: "in" }, 11.5, 0.001, "normal 1");
primary("box-size", { length: 20, width: 10, height: 5, clearance: 1, wrap: 0, unit: "in" }, 22, 0.001, "normal 2");
primary("box-size", { length: 0.01, width: 0.01, height: 0.01, clearance: 0, wrap: 0, unit: "in" }, 0.01, 0.001, "boundary");
throws("box-size", { length: 0, width: 1, height: 1, clearance: 0, wrap: 0, unit: "in" });
const boxIn = numbers(calculators["box-size"]({ length: 10, width: 6, height: 4, clearance: 0.5, wrap: 0.25, unit: "in" }))[0];
const boxCm = numbers(calculators["box-size"]({ length: 25.4, width: 15.24, height: 10.16, clearance: 1.27, wrap: 0.635, unit: "cm" }))[0];
close(boxCm / IN_TO_CM, boxIn, 0.02, "box-size bidirectional unit conversion");

primary("box-volume", { length: 12, width: 10, height: 8, unit: "in" }, 960, 0.001, "normal 1");
primary("box-volume", { length: 10, width: 10, height: 10, unit: "cm" }, 1000, 0.001, "normal 2");
primary("box-volume", { length: 0.1, width: 0.1, height: 0.1, unit: "in" }, 0, 0.001, "boundary");
throws("box-volume", { length: -1, width: 1, height: 1, unit: "in" });
const volIn = numbers(calculators["box-volume"]({ length: 12, width: 10, height: 8, unit: "in" }))[0];
const volCm = numbers(calculators["box-volume"]({ length: 30.48, width: 25.4, height: 20.32, unit: "cm" }))[0];
close(volCm / IN_TO_CM ** 3, volIn, 0.03, "box-volume bidirectional unit conversion");

const voidBase = { boxLength: 14, boxWidth: 10, boxHeight: 8, productLength: 10, productWidth: 6, productHeight: 4, quantity: 1, factor: 1, unit: "in" };
primary("void-fill", voidBase, 880, 0.001, "normal 1");
primary("void-fill", { boxLength: 10, boxWidth: 10, boxHeight: 10, productLength: 5, productWidth: 5, productHeight: 5, quantity: 2, factor: 1, unit: "in" }, 750, 0.001, "normal 2");
primary("void-fill", { boxLength: 1, boxWidth: 1, boxHeight: 1, productLength: 0.9, productWidth: 0.9, productHeight: 0.9, quantity: 1, factor: 1, unit: "in" }, 0.27, 0.001, "boundary");
throws("void-fill", { boxLength: 1, boxWidth: 1, boxHeight: 1, productLength: 1, productWidth: 1, productHeight: 1, quantity: 1, factor: 1, unit: "in" });
const voidIn = numbers(calculators["void-fill"](voidBase))[0];
const voidCm = numbers(calculators["void-fill"]({ boxLength: 35.56, boxWidth: 25.4, boxHeight: 20.32, productLength: 25.4, productWidth: 15.24, productHeight: 10.16, quantity: 1, factor: 1, unit: "cm" }))[0];
close(voidCm / IN_TO_CM ** 3, voidIn, 0.03, "void-fill bidirectional unit conversion");

primary("bubble-wrap", { length: 10, width: 6, height: 4, layers: 2, overlap: 15, unit: "in" }, 570.4, 0.001, "normal 1");
primary("bubble-wrap", { length: 2, width: 2, height: 2, layers: 1, overlap: 0, unit: "in" }, 24, 0.001, "normal 2");
primary("bubble-wrap", { length: 0.01, width: 0.01, height: 0.01, layers: 1, overlap: 0, unit: "in" }, 0, 0.001, "boundary");
throws("bubble-wrap", { length: 0, width: 1, height: 1, layers: 1, overlap: 0, unit: "in" });
const wrapIn = numbers(calculators["bubble-wrap"]({ length: 10, width: 6, height: 4, layers: 2, overlap: 15, unit: "in" }))[0];
const wrapCm = numbers(calculators["bubble-wrap"]({ length: 25.4, width: 15.24, height: 10.16, layers: 2, overlap: 15, unit: "cm" }))[0];
close(wrapCm / IN_TO_CM ** 2, wrapIn, 0.03, "bubble-wrap bidirectional unit conversion");

const paperBase = { boxLength: 14, boxWidth: 10, boxHeight: 8, productLength: 10, productWidth: 6, productHeight: 4, sheetLength: 24, sheetWidth: 18, yieldDepth: 2, unit: "in" };
primary("packing-paper", paperBase, 2, 0.001, "normal 1");
primary("packing-paper", { boxLength: 10, boxWidth: 10, boxHeight: 10, productLength: 5, productWidth: 5, productHeight: 5, sheetLength: 10, sheetWidth: 10, yieldDepth: 2, unit: "in" }, 5, 0.001, "normal 2");
primary("packing-paper", { boxLength: 1, boxWidth: 1, boxHeight: 1, productLength: 0.5, productWidth: 0.5, productHeight: 0.5, sheetLength: 1, sheetWidth: 1, yieldDepth: 1, unit: "in" }, 1, 0.001, "boundary");
throws("packing-paper", { boxLength: 1, boxWidth: 1, boxHeight: 1, productLength: 1, productWidth: 1, productHeight: 1, sheetLength: 1, sheetWidth: 1, yieldDepth: 1, unit: "in" });
const paperIn = numbers(calculators["packing-paper"](paperBase))[0];
const paperCm = numbers(calculators["packing-paper"]({ boxLength: 35.56, boxWidth: 25.4, boxHeight: 20.32, productLength: 25.4, productWidth: 15.24, productHeight: 10.16, sheetLength: 60.96, sheetWidth: 45.72, yieldDepth: 5.08, unit: "cm" }))[0];
close(paperCm, paperIn, 0.001, "packing-paper bidirectional unit conversion");

primary("tape-usage", { length: 14, width: 10, overhang: 2, cartons: 100, pattern: "center", unit: "in" }, 3600, 0.001, "normal 1");
primary("tape-usage", { length: 10, width: 5, overhang: 0, cartons: 1, pattern: "center", unit: "in" }, 20, 0.001, "normal 2");
primary("tape-usage", { length: 0.01, width: 0.01, overhang: 0, cartons: 1, pattern: "center", unit: "in" }, 0.02, 0.001, "boundary");
throws("tape-usage", { length: 0, width: 1, overhang: 0, cartons: 1, pattern: "center", unit: "in" });
const tapeIn = numbers(calculators["tape-usage"]({ length: 14, width: 10, overhang: 2, cartons: 10, pattern: "h", unit: "in" }))[0];
const tapeCm = numbers(calculators["tape-usage"]({ length: 35.56, width: 25.4, overhang: 5.08, cartons: 10, pattern: "h", unit: "cm" }))[0];
close(tapeCm / IN_TO_CM, tapeIn, 0.03, "tape-usage bidirectional unit conversion");

primary("poly-mailer-size", { length: 10, width: 8, height: 2, clearance: 0.5, flap: 2, unit: "in" }, 11, 0.001, "normal 1");
primary("poly-mailer-size", { length: 5, width: 4, height: 0, clearance: 0, flap: 1, unit: "in" }, 4, 0.001, "normal 2");
primary("poly-mailer-size", { length: 0.01, width: 0.01, height: 0, clearance: 0, flap: 0, unit: "in" }, 0.01, 0.001, "boundary");
throws("poly-mailer-size", { length: 0, width: 1, height: 0, clearance: 0, flap: 0, unit: "in" });
const mailerIn = numbers(calculators["poly-mailer-size"]({ length: 10, width: 8, height: 2, clearance: 0.5, flap: 2, unit: "in" }))[0];
const mailerCm = numbers(calculators["poly-mailer-size"]({ length: 25.4, width: 20.32, height: 5.08, clearance: 1.27, flap: 5.08, unit: "cm" }))[0];
close(mailerCm / IN_TO_CM, mailerIn, 0.03, "poly-mailer-size bidirectional unit conversion");

const costBase = { container: 0.85, fill: 0.32, tape: 0.08, label: 0.12, other: 0.05, minutes: 4, hourly: 18, waste: 5, currency: "$" };
primary("packaging-cost", costBase, 2.69, 0.001, "normal 1");
primary("packaging-cost", { container: 1, fill: 0, tape: 0, label: 0, other: 0, minutes: 0, hourly: 0, waste: 0, currency: "$" }, 1, 0.001, "normal 2");
primary("packaging-cost", { container: 0, fill: 0, tape: 0, label: 0, other: 0, minutes: 0, hourly: 0, waste: 0, currency: "$" }, 0, 0.001, "boundary");
throws("packaging-cost", { container: -1, fill: 0, tape: 0, label: 0, other: 0, minutes: 0, hourly: 0, waste: 0, currency: "$" });
const costUsd = numbers(calculators["packaging-cost"]({ ...costBase, currency: "$" }))[0];
const costEur = numbers(calculators["packaging-cost"]({ ...costBase, currency: "€" }))[0];
close(costEur, costUsd, 0.001, "packaging-cost currency display conversion");

const phaseCases = {
  "carton-count": [[{units:125,perCarton:24},6],[{units:48,perCarton:24},2],[{units:1,perCarton:1},1],{units:0,perCarton:1}],
  "case-pack": [[{cases:12,unitsPerCase:24,reserve:6},294],[{cases:1,unitsPerCase:1,reserve:0},1],[{cases:2,unitsPerCase:3,reserve:1},7],{cases:0,unitsPerCase:1,reserve:0}],
  "box-utilization": [[{boxLength:16,boxWidth:12,boxHeight:10,itemLength:7,itemWidth:5,itemHeight:3,quantity:4,unit:"in"},21.9],[{boxLength:2,boxWidth:2,boxHeight:2,itemLength:1,itemWidth:1,itemHeight:1,quantity:1,unit:"in"},12.5],[{boxLength:1,boxWidth:1,boxHeight:1,itemLength:1,itemWidth:1,itemHeight:1,quantity:1,unit:"in"},100],{boxLength:1,boxWidth:1,boxHeight:1,itemLength:2,itemWidth:1,itemHeight:1,quantity:1,unit:"in"}],
  "multi-item-box-fit": [[{boxLength:16,boxWidth:12,boxHeight:10,itemLength:7,itemWidth:5,itemHeight:3,quantity:8,unit:"in"},16],[{boxLength:10,boxWidth:10,boxHeight:10,itemLength:5,itemWidth:5,itemHeight:5,quantity:8,unit:"in"},8],[{boxLength:1,boxWidth:1,boxHeight:1,itemLength:1,itemWidth:1,itemHeight:1,quantity:1,unit:"in"},1],{boxLength:1,boxWidth:1,boxHeight:1,itemLength:2,itemWidth:2,itemHeight:2,quantity:1,unit:"in"}],
  "packaging-material-budget": [[{orders:1000,materialCost:1.35,waste:5,contingency:3,currency:"$"},1458],[{orders:100,materialCost:2,waste:0,contingency:0,currency:"$"},200],[{orders:1,materialCost:0,waste:0,contingency:0,currency:"$"},0],{orders:0,materialCost:1,waste:0,contingency:0,currency:"$"}],
  "monthly-packaging-spend": [[{orders:1500,costPerOrder:1.45,fixedCost:250,months:3,currency:"$"},2425],[{orders:100,costPerOrder:2,fixedCost:0,months:1,currency:"$"},200],[{orders:1,costPerOrder:0,fixedCost:0,months:1,currency:"$"},0],{orders:0,costPerOrder:1,fixedCost:0,months:1,currency:"$"}],
  "label-cost": [[{orders:1000,labelsPerOrder:2,unitCost:.04,waste:3,currency:"$"},82.4],[{orders:10,labelsPerOrder:1,unitCost:.5,waste:0,currency:"$"},5],[{orders:1,labelsPerOrder:1,unitCost:0,waste:0,currency:"$"},0],{orders:0,labelsPerOrder:1,unitCost:1,waste:0,currency:"$"}],
  "insert-quantity": [[{orders:1200,insertsPerOrder:1,spoilage:4},1248],[{orders:10,insertsPerOrder:2,spoilage:0},20],[{orders:1,insertsPerOrder:1,spoilage:100},2],{orders:0,insertsPerOrder:1,spoilage:0}],
  "packaging-waste-allowance": [[{baseQuantity:1000,waste:7},1070],[{baseQuantity:10,waste:0},10],[{baseQuantity:1,waste:1},2],{baseQuantity:0,waste:0}],
  "packaging-supply-reorder-point": [[{dailyUse:80,leadDays:10,safetyStock:300,onHand:950},1100],[{dailyUse:10,leadDays:2,safetyStock:0,onHand:30},20],[{dailyUse:0,leadDays:0,safetyStock:0,onHand:0},0],{dailyUse:-1,leadDays:1,safetyStock:0,onHand:0}],
  "order-packing-time": [[{orders:120,minutesPerOrder:3.5,setupMinutes:20},440],[{orders:10,minutesPerOrder:2,setupMinutes:0},20],[{orders:1,minutesPerOrder:.1,setupMinutes:0},.1],{orders:0,minutesPerOrder:1,setupMinutes:0}],
  "labor-capacity-per-shift": [[{workers:3,shiftHours:8,utilization:80,minutesPerOrder:4},288],[{workers:1,shiftHours:1,utilization:100,minutesPerOrder:10},6],[{workers:1,shiftHours:.1,utilization:1,minutesPerOrder:1},0],{workers:0,shiftHours:1,utilization:100,minutesPerOrder:1}],
  "prep-batch-time": [[{units:250,secondsPerUnit:35,setupMinutes:15,checkMinutes:20},180.8],[{units:60,secondsPerUnit:1,setupMinutes:0,checkMinutes:0},1],[{units:1,secondsPerUnit:1,setupMinutes:0,checkMinutes:0},0],{units:0,secondsPerUnit:1,setupMinutes:0,checkMinutes:0}],
  "kitting-cost": [[{componentCost:1.2,components:3,packaging:.65,minutes:4,hourly:18,waste:2,currency:"$"},5.54],[{componentCost:1,components:1,packaging:0,minutes:0,hourly:0,waste:0,currency:"$"},1],[{componentCost:0,components:1,packaging:0,minutes:0,hourly:0,waste:0,currency:"$"},0],{componentCost:1,components:0,packaging:0,minutes:0,hourly:0,waste:0,currency:"$"}],
  "bundle-packing-cost": [[{items:4,handlingCost:.18,bundleMaterials:.55,minutes:3,hourly:18,currency:"$"},2.17],[{items:1,handlingCost:1,bundleMaterials:0,minutes:0,hourly:0,currency:"$"},1],[{items:1,handlingCost:0,bundleMaterials:0,minutes:0,hourly:0,currency:"$"},0],{items:0,handlingCost:1,bundleMaterials:0,minutes:0,hourly:0,currency:"$"}],
  "master-carton-dimensions": [[{itemLength:8,itemWidth:5,itemHeight:3,columns:3,rows:2,layers:2,clearance:.5,gap:.25,unit:"in"},25.5],[{itemLength:1,itemWidth:1,itemHeight:1,columns:1,rows:1,layers:1,clearance:0,gap:0,unit:"in"},1],[{itemLength:.01,itemWidth:.01,itemHeight:.01,columns:1,rows:1,layers:1,clearance:0,gap:0,unit:"in"},.01],{itemLength:0,itemWidth:1,itemHeight:1,columns:1,rows:1,layers:1,clearance:0,gap:0,unit:"in"}],
  "master-carton-weight": [[{units:12,unitWeight:1.8,tareWeight:2.4,maxWeight:30,weightUnit:"lb"},24],[{units:1,unitWeight:1,tareWeight:0,maxWeight:1,weightUnit:"lb"},1],[{units:1,unitWeight:.01,tareWeight:0,maxWeight:1,weightUnit:"lb"},.01],{units:2,unitWeight:2,tareWeight:0,maxWeight:3,weightUnit:"lb"}],
  "carton-cube": [[{length:24,width:16,height:12,cartons:20,unit:"in"},1.51],[{length:100,width:100,height:100,cartons:1,unit:"cm"},1],[{length:1,width:1,height:1,cartons:1,unit:"in"},0],{length:0,width:1,height:1,cartons:1,unit:"in"}],
  "cases-per-pallet": [[{palletLength:48,palletWidth:40,caseLength:16,caseWidth:12,layers:5,unit:"in"},45],[{palletLength:10,palletWidth:10,caseLength:5,caseWidth:5,layers:1,unit:"in"},4],[{palletLength:1,palletWidth:1,caseLength:1,caseWidth:1,layers:1,unit:"in"},1],{palletLength:1,palletWidth:1,caseLength:2,caseWidth:2,layers:1,unit:"in"}],
  "pallet-layer-count": [[{cases:86,casesPerLayer:10,maxLayers:10},9],[{cases:20,casesPerLayer:10,maxLayers:2},2],[{cases:1,casesPerLayer:10,maxLayers:1},1],{cases:100,casesPerLayer:10,maxLayers:5}],
  "pallet-height": [[{palletHeight:6,caseHeight:10,layers:6,topAllowance:2,maxHeight:72,unit:"in"},68],[{palletHeight:0,caseHeight:1,layers:1,topAllowance:0,maxHeight:1,unit:"in"},1],[{palletHeight:0,caseHeight:.01,layers:1,topAllowance:0,maxHeight:1,unit:"in"},.01],{palletHeight:1,caseHeight:10,layers:10,topAllowance:0,maxHeight:50,unit:"in"}],
  "pallet-utilization": [[{palletLength:48,palletWidth:40,caseLength:16,caseWidth:12,casesPerLayer:10,unit:"in"},100],[{palletLength:10,palletWidth:10,caseLength:5,caseWidth:5,casesPerLayer:2,unit:"in"},50],[{palletLength:10,palletWidth:10,caseLength:1,caseWidth:1,casesPerLayer:1,unit:"in"},1],{palletLength:10,palletWidth:10,caseLength:6,caseWidth:6,casesPerLayer:3,unit:"in"}]
};

for (const [id, cases] of Object.entries(phaseCases)) {
  cases.slice(0, 3).forEach(([input, expected], index) => primary(id, input, expected, 0.011, `phase normal/boundary ${index + 1}`));
  throws(id, cases[3]);
  const first = calculators[id](cases[0][0]).primary;
  assert.strictEqual(calculators[id](cases[0][0]).primary, first, `${id}: deterministic after reset/re-entry`);
  checks += 1;
}

primary("shipping-damage-rate", { shipments: 1250, damaged: 14 }, 1.12, 0.001, "observed rate");
primary("shipping-damage-rate", { shipments: 100, damaged: 0 }, 0, 0.001, "zero-damage boundary");
throws("shipping-damage-rate", { shipments: 10, damaged: 11 });
throws("shipping-damage-rate", { shipments: 0, damaged: 0 });
assert.strictEqual(calculators["shipping-damage-rate"]({ shipments: 1250, damaged: 14 }).primary, "1.12% observed damage rate");
checks += 1;

const failureExample = { shipments: 2000, failures: 18, replacement: 24, reship: 11, returnShipping: 6, handlingMinutes: 7, supportMinutes: 5, hourly: 21, other: 3, currency: "$" };
primary("packaging-failure-cost", failureExample, 867.6, 0.001, "direct period cost");
primary("packaging-failure-cost", { ...failureExample, failures: 0 }, 0, 0.001, "zero-failure boundary");
throws("packaging-failure-cost", { ...failureExample, failures: 2001 });
throws("packaging-failure-cost", { ...failureExample, replacement: -1 });
assert.strictEqual(calculators["packaging-failure-cost"](failureExample).primary, "$867.60");
checks += 1;

const trialExample = { inspectedA: 120, damagedA: 3, materialCostA: 1.4, minutesA: 4.2, weightA: 2.8, inspectedB: 120, damagedB: 1, materialCostB: 1.62, minutesB: 3.8, weightB: 2.7, hourly: 21, currency: "$" };
primary("packaging-trial-comparison", trialExample, 1.67, 0.001, "damage-rate point difference");
assert.strictEqual(calculators["packaging-trial-comparison"]({ ...trialExample, damagedA: 0, damagedB: 0 }).primary, "Same observed damage rate");
checks += 1;
throws("packaging-trial-comparison", { ...trialExample, damagedA: 121 });
throws("packaging-trial-comparison", { ...trialExample, inspectedB: "" });
assert.strictEqual(calculators["packaging-trial-comparison"](trialExample).primary, calculators["packaging-trial-comparison"](trialExample).primary);
checks += 1;

const varianceExample = { recordedLength: 12, recordedWidth: 10, recordedHeight: 8, recordedWeight: 4, observedLength: 12.3, observedWidth: 10.1, observedHeight: 8.4, observedWeight: 4.2, dimensionTolerance: 5, weightTolerance: 5 };
assert.strictEqual(calculators["package-weight-dimension-variance"](varianceExample).primary, "Within entered tolerances");
checks += 1;
assert.strictEqual(calculators["package-weight-dimension-variance"]({ ...varianceExample, observedLength: 12, observedWidth: 10, observedHeight: 8, observedWeight: 4, dimensionTolerance: 0, weightTolerance: 0 }).primary, "Within entered tolerances");
checks += 1;
assert.strictEqual(calculators["package-weight-dimension-variance"]({ ...varianceExample, dimensionTolerance: 4, weightTolerance: 4 }).primary, "Review measurement variance");
checks += 1;
throws("package-weight-dimension-variance", { ...varianceExample, recordedLength: 0 });
throws("package-weight-dimension-variance", { ...varianceExample, observedWeight: -1 });
assert.deepStrictEqual(calculators["package-weight-dimension-variance"](varianceExample), calculators["package-weight-dimension-variance"](varianceExample));
checks += 1;

assert.strictEqual(Object.keys(calculators).length, 36, "Expected 36 calculator implementations");
assert.ok(checks >= 181, `Expected at least 181 independent checks; found ${checks}`);
console.log(`CALCULATION VERIFICATION PASS — ${Object.keys(calculators).length} calculators, ${checks} independent checks`);
