"use strict";

const assert = require("assert");
const api = require("../assets/workflow-tools.js");

let checks = 0;
function equal(actual, expected, message) { assert.strictEqual(actual, expected, message); checks += 1; }
function includes(actual, expected, message) { assert.ok(actual.includes(expected), message); checks += 1; }
function throws(fn, expected, message) { assert.throws(fn, expected, message); checks += 1; }

const ready = {
  sku: "CND-01", instructionId: "PK-014", revision: "B", effectiveDate: "2026-08-13",
  container: "Carton A / 1 each", materials: "Pad / 1; paper / 2 bundles", stepCount: "6",
  closure: "H-seal", labelPlacement: "Largest top face", verification: "Identity, movement, seal, label",
  exceptionAction: "Hold and notify operations owner", owner: "Packing operations"
};
const readiness = api.readiness(ready);
equal(readiness.primary, "Ready for a controlled pack trial", "complete instruction should be ready for trial");
equal(readiness.values[2][1], "0", "complete instruction should have no gaps");
includes(readiness.details, "physical pack", "ready result should state physical verification boundary");
const missing = api.readiness({ ...ready, materials: "", exceptionAction: "" });
equal(missing.values[2][1], "2", "two blank fields should create two gaps");
includes(missing.details, "Materials with quantities", "materials gap should be named");
includes(missing.details, "Exception action and owner", "exception gap should be named");
equal(api.readiness({ ...ready, stepCount: "2" }).values[2][1], "1", "short sequence should be a gap");
throws(() => api.readiness({ ...ready, stepCount: "2.5" }), /whole number/, "fractional steps should fail");
throws(() => api.readiness({ ...ready, stepCount: "-1" }), /at least 0/, "negative steps should fail");
equal(api.readiness(ready).primary, readiness.primary, "readiness should be deterministic");

const instructionInput = {
  sku: "CND-01", instructionId: "PK-014", revision: "B", effectiveDate: "2026-08-13",
  owner: "Packing operations", container: "Carton A", materials: "Pad / 1; paper / 2",
  steps: ["Inspect product", "Place base pad", "Wrap and center", "Close carton"],
  closure: "H-seal", labelPlacement: "Top face", verification: "Check seal and label",
  exceptionAction: "Hold and notify owner", notes: "Use current material issue."
};
const instruction = api.instruction(instructionInput);
includes(instruction.primary, "PK-014 / Rev B", "instruction summary should name ID and revision");
equal(instruction.values[0][1], "4", "instruction should count active ordered steps");
includes(instruction.details, "CONTROLLED PACK INSTRUCTION", "instruction sheet heading should be present");
includes(instruction.details, "Planning record only", "instruction sheet should state its boundary");
throws(() => api.instruction({ ...instructionInput, sku: "" }), /SKU or product family is required/, "missing SKU should fail");
throws(() => api.instruction({ ...instructionInput, steps: ["One", "Two"] }), /at least three/, "fewer than three steps should fail");
throws(() => api.instruction({ ...instructionInput, steps: Array(9).fill("Step") }), /no more than eight/, "more than eight steps should fail");
const escapedInstruction = api.instruction({ ...instructionInput, sku: "<script>alert(1)</script>" });
includes(escapedInstruction.details, "&lt;script&gt;", "generated instruction should escape HTML");
equal(escapedInstruction.details.includes("<script>"), false, "generated instruction should not retain active script markup");
equal(api.instruction(instructionInput).primary, instruction.primary, "instruction generation should be deterministic");

const routingInput = {
  family: "Candle orders", baseRoute: "PK-014 Rev B",
  rules: [
    { condition: "Item count is 3", route: "PK-014-3 Rev C", action: "Use bundle divider", priority: "20" },
    { condition: "Order tag is GIFT", route: "PK-014-G Rev A", action: "Add gift layer", priority: "10" }
  ]
};
const routing = api.routing(routingInput);
equal(routing.primary, "2 routing rules organized", "two valid routes should organize cleanly");
equal(routing.values[2][1], "0", "valid routing should have no conflicts");
equal(routing.details.indexOf("Order tag is GIFT") < routing.details.indexOf("Item count is 3"), true, "lower priority should render first");
includes(routing.details, "PK-014 Rev B", "routing should retain default instruction");
const conflict = api.routing({ ...routingInput, rules: [...routingInput.rules, { condition: "order TAG is gift", route: "PK-999", priority: "30" }] });
equal(conflict.values[2][1], "1", "case-insensitive duplicate condition should conflict");
includes(conflict.details, "Conflicts to resolve", "conflict sheet should show resolution section");
throws(() => api.routing({ baseRoute: "PK-014", rules: [] }), /at least one routing rule/, "blank routing matrix should fail");
throws(() => api.routing({ baseRoute: "PK-014", rules: [{ condition: "Gift", route: "", priority: "1" }] }), /needs both/, "partial routing row should fail");
throws(() => api.routing({ baseRoute: "PK-014", rules: [{ condition: "Gift", route: "PK-G", priority: "0" }] }), /at least 1/, "zero priority should fail");
throws(() => api.routing({ baseRoute: "PK-014", rules: [{ condition: "Gift", route: "PK-G", priority: "2.5" }] }), /whole number/, "fractional priority should fail");
const escapedRouting = api.routing({ baseRoute: "<b>BASE</b>", rules: [{ condition: "<img src=x>", route: "PK-G", priority: "1" }] });
equal(escapedRouting.details.includes("<img"), false, "routing output should escape condition markup");
equal(api.routing(routingInput).primary, routing.primary, "routing should be deterministic");

const travelerInput = {
  jobNumber: "JOB-082", instructionId: "PK-014", revision: "B", sku: "CND-01",
  quantity: "180", interval: "45", station: "S2", operator: "OP-1", date: "2026-08-13",
  containerLot: "CA-12", protectionLot: "PP-8", closureLot: "TP-4", labelLot: "LB-7"
};
const traveler = api.traveler(travelerInput);
equal(traveler.values[0][1], "180", "traveler should retain planned quantity");
equal(traveler.primary, "JOB-082 traveler with 4 checkpoints", "180/45 should create four checkpoints");
includes(traveler.details, ">45<", "traveler should contain first checkpoint");
includes(traveler.details, ">180<", "traveler should contain final checkpoint");
equal(api.traveler({ ...travelerInput, quantity: "1", interval: "1" }).primary, "JOB-082 traveler with 1 checkpoint", "single unit should create a final checkpoint");
equal(api.traveler({ ...travelerInput, quantity: "10", interval: "6" }).primary, "JOB-082 traveler with 2 checkpoints", "non-divisible job should include interval and final checkpoint");
throws(() => api.traveler({ ...travelerInput, quantity: "0" }), /at least 1/, "zero quantity should fail");
throws(() => api.traveler({ ...travelerInput, quantity: "-5" }), /at least 1/, "negative quantity should fail");
throws(() => api.traveler({ ...travelerInput, interval: "181" }), /cannot exceed/, "interval above quantity should fail");
throws(() => api.traveler({ ...travelerInput, quantity: "1000", interval: "1" }), /more than 200/, "excessive checkpoint rows should fail");
throws(() => api.traveler({ ...travelerInput, quantity: "1.5" }), /whole number/, "fractional quantity should fail");
const escapedTraveler = api.traveler({ ...travelerInput, jobNumber: "<script>JOB</script>" });
equal(escapedTraveler.details.includes("<script>"), false, "traveler should escape identifier markup");
equal(api.traveler(travelerInput).primary, traveler.primary, "traveler should be deterministic");

equal(Object.keys(api.tools).length, 4, "browser API should expose exactly four workflow tools");
console.log(`WORKFLOW TOOL VERIFICATION PASS — ${checks} normal, boundary, error, safety, and deterministic checks`);
