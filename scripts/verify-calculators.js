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

console.log(`CALCULATION VERIFICATION PASS — 10 calculators, ${checks} independent checks`);
