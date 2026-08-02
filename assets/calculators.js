(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.PackPrepCalculators = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const IN_TO_CM = 2.54;
  const LB_TO_KG = 0.45359237;
  const CUIN_TO_L = 0.016387064;

  function positive(value, label, options) {
    const settings = options || {};
    const number = Number(value);
    if (!Number.isFinite(number)) throw new Error(`${label} must be a finite number.`);
    if (settings.allowZero ? number < 0 : number <= 0) {
      throw new Error(`${label} must be ${settings.allowZero ? "zero or greater" : "greater than zero"}.`);
    }
    const max = settings.max || 1000000;
    if (number > max) throw new Error(`${label} is too large to calculate reliably.`);
    return number;
  }

  function round(value, places) {
    const factor = 10 ** (places == null ? 2 : places);
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  function lengthToIn(value, unit) {
    return unit === "cm" ? value / IN_TO_CM : value;
  }

  function lengthFromIn(value, unit) {
    return unit === "cm" ? value * IN_TO_CM : value;
  }

  function areaFromSqIn(value, unit) {
    return unit === "cm" ? value * IN_TO_CM * IN_TO_CM : value;
  }

  function volumeFromCuIn(value, unit) {
    return unit === "cm" ? value * IN_TO_CM ** 3 : value;
  }

  function dimensionalWeight(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const length = positive(input.length, "Length", { max: 10000 });
    const width = positive(input.width, "Width", { max: 10000 });
    const height = positive(input.height, "Height", { max: 10000 });
    const divisor = positive(input.divisor, "DIM divisor", { max: 100000 });
    const volume = length * width * height;
    const weight = volume / divisor;
    return {
      primary: `${round(weight, 2)} ${unit === "cm" ? "kg" : "lb"}`,
      values: {
        "Package volume": `${round(volume, 2)} ${unit}³`,
        "Unrounded DIM weight": `${round(weight, 3)} ${unit === "cm" ? "kg" : "lb"}`,
        "Common billing round-up": `${Math.ceil(weight)} ${unit === "cm" ? "kg" : "lb"}`
      }
    };
  }

  function lengthGirth(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const dimensions = [
      positive(input.length, "Length", { max: 10000 }),
      positive(input.width, "Width", { max: 10000 }),
      positive(input.height, "Height", { max: 10000 })
    ].sort((a, b) => b - a);
    const length = dimensions[0];
    const girth = 2 * (dimensions[1] + dimensions[2]);
    return {
      primary: `${round(length + girth)} ${unit}`,
      values: {
        "Longest side": `${round(length)} ${unit}`,
        Girth: `${round(girth)} ${unit}`,
        "Length + girth": `${round(length + girth)} ${unit}`
      }
    };
  }

  function boxSize(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const product = ["length", "width", "height"].map((key) =>
      positive(input[key], `Product ${key}`, { max: 10000 })
    );
    const clearance = positive(input.clearance, "Clearance", { allowZero: true, max: 1000 });
    const wrap = positive(input.wrap, "Wrap thickness", { allowZero: true, max: 1000 });
    const dimensions = product.map((value) => value + 2 * (clearance + wrap));
    return {
      primary: `${dimensions.map((v) => round(v)).join(" × ")} ${unit}`,
      values: {
        "Minimum internal length": `${round(dimensions[0])} ${unit}`,
        "Minimum internal width": `${round(dimensions[1])} ${unit}`,
        "Minimum internal height": `${round(dimensions[2])} ${unit}`
      }
    };
  }

  function boxVolume(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const length = positive(input.length, "Length", { max: 10000 });
    const width = positive(input.width, "Width", { max: 10000 });
    const height = positive(input.height, "Height", { max: 10000 });
    const volume = length * width * height;
    const liters = unit === "cm" ? volume / 1000 : volume * CUIN_TO_L;
    return {
      primary: `${round(volume, 2)} ${unit}³`,
      values: {
        "Cubic volume": `${round(volume, 2)} ${unit}³`,
        Liters: `${round(liters, 2)} L`,
        "Cubic feet": `${round(liters / 28.316846592, 3)} ft³`
      }
    };
  }

  function voidFill(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const box = ["boxLength", "boxWidth", "boxHeight"].map((key) =>
      positive(input[key], key.replace(/([A-Z])/g, " $1"), { max: 10000 })
    );
    const product = ["productLength", "productWidth", "productHeight"].map((key) =>
      positive(input[key], key.replace(/([A-Z])/g, " $1"), { max: 10000 })
    );
    const quantity = positive(input.quantity, "Product quantity", { max: 100000 });
    const factor = positive(input.factor, "Fill factor", { max: 5 });
    const boxVolumeValue = box[0] * box[1] * box[2];
    const productVolumeValue = product[0] * product[1] * product[2] * quantity;
    if (productVolumeValue >= boxVolumeValue) {
      throw new Error("The products occupy all available box volume. Check the dimensions or quantity.");
    }
    const voidVolume = (boxVolumeValue - productVolumeValue) * factor;
    const liters = unit === "cm" ? voidVolume / 1000 : voidVolume * CUIN_TO_L;
    return {
      primary: `${round(voidVolume, 2)} ${unit}³`,
      values: {
        "Estimated fill volume": `${round(voidVolume, 2)} ${unit}³`,
        "Equivalent liters": `${round(liters, 2)} L`,
        "Empty share of box": `${round(((boxVolumeValue - productVolumeValue) / boxVolumeValue) * 100, 1)}%`
      }
    };
  }

  function bubbleWrap(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const length = positive(input.length, "Product length", { max: 10000 });
    const width = positive(input.width, "Product width", { max: 10000 });
    const height = positive(input.height, "Product height", { max: 10000 });
    const layers = positive(input.layers, "Layers", { max: 100 });
    const overlap = positive(input.overlap, "Overlap", { allowZero: true, max: 200 }) / 100;
    const surfaceArea = 2 * (length * width + length * height + width * height);
    const totalArea = surfaceArea * layers * (1 + overlap);
    const squareFeet = unit === "cm" ? totalArea / 929.0304 : totalArea / 144;
    return {
      primary: `${round(totalArea, 2)} ${unit}²`,
      values: {
        "Product surface area": `${round(surfaceArea, 2)} ${unit}²`,
        "Wrap area with layers": `${round(totalArea, 2)} ${unit}²`,
        "Equivalent square feet": `${round(squareFeet, 2)} ft²`
      }
    };
  }

  function packingPaper(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const box = ["boxLength", "boxWidth", "boxHeight"].map((key) =>
      positive(input[key], key.replace(/([A-Z])/g, " $1"), { max: 10000 })
    );
    const product = ["productLength", "productWidth", "productHeight"].map((key) =>
      positive(input[key], key.replace(/([A-Z])/g, " $1"), { max: 10000 })
    );
    const sheetLength = positive(input.sheetLength, "Sheet length", { max: 10000 });
    const sheetWidth = positive(input.sheetWidth, "Sheet width", { max: 10000 });
    const yieldDepth = positive(input.yieldDepth, "Crumpled yield depth", { max: 1000 });
    const boxVol = box[0] * box[1] * box[2];
    const productVol = product[0] * product[1] * product[2];
    if (productVol >= boxVol) throw new Error("The product must be smaller than the box.");
    const voidVol = boxVol - productVol;
    const sheetYield = sheetLength * sheetWidth * yieldDepth;
    const sheets = Math.ceil(voidVol / sheetYield);
    return {
      primary: `${sheets} sheet${sheets === 1 ? "" : "s"}`,
      values: {
        "Void volume": `${round(voidVol, 2)} ${unit}³`,
        "Estimated volume per sheet": `${round(sheetYield, 2)} ${unit}³`,
        "Whole sheets required": `${sheets}`
      }
    };
  }

  function tapeUsage(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const length = positive(input.length, "Box length", { max: 10000 });
    const width = positive(input.width, "Box width", { max: 10000 });
    const overhang = positive(input.overhang, "Tape overhang", { allowZero: true, max: 1000 });
    const cartons = positive(input.cartons, "Carton count", { max: 1000000 });
    const pattern = input.pattern === "h" ? "h" : "center";
    const centerSeams = 2 * (length + 2 * overhang);
    const crossSeams = pattern === "h" ? 4 * (width + 2 * overhang) : 0;
    const total = (centerSeams + crossSeams) * cartons;
    const feet = unit === "cm" ? total / 30.48 : total / 12;
    return {
      primary: `${round(total, 2)} ${unit}`,
      values: {
        "Tape per carton": `${round(centerSeams + crossSeams, 2)} ${unit}`,
        "Total tape": `${round(total, 2)} ${unit}`,
        "Equivalent feet": `${round(feet, 2)} ft`
      }
    };
  }

  function polyMailer(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const length = positive(input.length, "Product length", { max: 10000 });
    const width = positive(input.width, "Product width", { max: 10000 });
    const height = positive(input.height, "Product thickness", { allowZero: true, max: 10000 });
    const clearance = positive(input.clearance, "Clearance", { allowZero: true, max: 1000 });
    const flap = positive(input.flap, "Seal flap allowance", { allowZero: true, max: 1000 });
    const mailerWidth = width + height + 2 * clearance;
    const mailerLength = length + height + clearance + flap;
    return {
      primary: `${round(mailerWidth)} × ${round(mailerLength)} ${unit}`,
      values: {
        "Minimum internal width": `${round(mailerWidth)} ${unit}`,
        "Minimum internal length": `${round(mailerLength)} ${unit}`,
        "Product thickness allowance": `${round(height)} ${unit}`
      }
    };
  }

  function packagingCost(input) {
    const currency = input.currency || "$";
    const fields = ["container", "fill", "tape", "label", "other"];
    const materials = fields.reduce(
      (sum, key) => sum + positive(input[key], key, { allowZero: true, max: 1000000 }),
      0
    );
    const minutes = positive(input.minutes, "Labor minutes", { allowZero: true, max: 100000 });
    const hourly = positive(input.hourly, "Hourly labor rate", { allowZero: true, max: 1000000 });
    const waste = positive(input.waste, "Waste allowance", { allowZero: true, max: 1000 }) / 100;
    const adjustedMaterials = materials * (1 + waste);
    const labor = (minutes / 60) * hourly;
    const total = adjustedMaterials + labor;
    return {
      primary: `${currency}${round(total).toFixed(2)}`,
      values: {
        "Materials with waste": `${currency}${round(adjustedMaterials).toFixed(2)}`,
        "Labor per order": `${currency}${round(labor).toFixed(2)}`,
        "Total packaging cost": `${currency}${round(total).toFixed(2)}`
      }
    };
  }

  function money(value, currency) {
    return `${currency || "$"}${round(value).toFixed(2)}`;
  }

  function cartonCount(input) {
    const units = positive(input.units, "Units required", { max: 100000000 });
    const perCarton = positive(input.perCarton, "Units per carton", { max: 1000000 });
    const cartons = Math.ceil(units / perCarton);
    return { primary: `${cartons} cartons`, values: { "Full cartons": `${Math.floor(units / perCarton)}`, "Units in final carton": `${units % perCarton || perCarton}`, "Total carton capacity": `${cartons * perCarton} units` } };
  }

  function casePack(input) {
    const cases = positive(input.cases, "Case quantity", { max: 1000000 });
    const units = positive(input.unitsPerCase, "Units per case", { max: 1000000 });
    const reserve = positive(input.reserve, "Reserve units", { allowZero: true, max: 100000000 });
    const total = cases * units + reserve;
    return { primary: `${total} units`, values: { "Sealed case units": `${cases * units}`, "Reserve units": `${reserve}`, "Case pack": `${units} units/case` } };
  }

  function boxUtilization(input) {
    const box = ["boxLength", "boxWidth", "boxHeight"].map((key) => positive(input[key], key, { max: 10000 }));
    const item = ["itemLength", "itemWidth", "itemHeight"].map((key) => positive(input[key], key, { max: 10000 }));
    const quantity = positive(input.quantity, "Item quantity", { max: 1000000 });
    const boxVolume = box.reduce((a, b) => a * b);
    const itemVolume = item.reduce((a, b) => a * b) * quantity;
    if (itemVolume > boxVolume) throw new Error("Total item volume exceeds box volume.");
    const rate = itemVolume / boxVolume * 100;
    return { primary: `${round(rate, 1)}% utilized`, values: { "Box volume": `${round(boxVolume, 2)} ${input.unit || "in"}³`, "Item volume": `${round(itemVolume, 2)} ${input.unit || "in"}³`, "Unused volume": `${round(boxVolume - itemVolume, 2)} ${input.unit || "in"}³` } };
  }

  function multiItemBoxFit(input) {
    const box = ["boxLength", "boxWidth", "boxHeight"].map((key) => positive(input[key], key, { max: 10000 }));
    const item = ["itemLength", "itemWidth", "itemHeight"].map((key) => positive(input[key], key, { max: 10000 }));
    const required = positive(input.quantity, "Required quantity", { max: 1000000 });
    const rotations = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
    const options = rotations.map((r) => {
      const counts = box.map((side, i) => Math.floor(side / item[r[i]]));
      return { count: counts.reduce((a,b) => a*b), counts, r };
    }).sort((a,b) => b.count-a.count);
    const best = options[0];
    if (best.count < 1) throw new Error("The item does not fit in the box in any orthogonal orientation.");
    return { primary: `${best.count} items maximum`, values: { "Required quantity": `${required}`, "Fit status": best.count >= required ? "Fits by simple grid estimate" : "Does not fit required quantity", "Best grid": best.counts.join(" × ") } };
  }

  function materialBudget(input) {
    const orders = positive(input.orders, "Order count", { max: 100000000 });
    const unitCost = positive(input.materialCost, "Material cost per order", { allowZero: true, max: 1000000 });
    const waste = positive(input.waste, "Waste allowance", { allowZero: true, max: 1000 }) / 100;
    const contingency = positive(input.contingency, "Contingency", { allowZero: true, max: 1000 }) / 100;
    const base = orders * unitCost;
    const total = base * (1 + waste + contingency);
    return { primary: money(total, input.currency), values: { "Base material budget": money(base, input.currency), "Waste allowance": money(base * waste, input.currency), "Contingency reserve": money(base * contingency, input.currency) } };
  }

  function monthlySpend(input) {
    const orders = positive(input.orders, "Monthly orders", { max: 100000000 });
    const variableCost = positive(input.costPerOrder, "Cost per order", { allowZero: true, max: 1000000 });
    const fixed = positive(input.fixedCost, "Monthly fixed packaging cost", { allowZero: true, max: 100000000 });
    const months = positive(input.months, "Planning months", { max: 1200 });
    const monthly = orders * variableCost + fixed;
    return { primary: money(monthly, input.currency), values: { "Variable spend": money(orders * variableCost, input.currency), "Fixed spend": money(fixed, input.currency), "Planning-period spend": money(monthly * months, input.currency) } };
  }

  function labelCost(input) {
    const orders = positive(input.orders, "Order count", { max: 100000000 });
    const labels = positive(input.labelsPerOrder, "Labels per order", { max: 1000 });
    const unitCost = positive(input.unitCost, "Cost per label", { allowZero: true, max: 100000 });
    const waste = positive(input.waste, "Waste allowance", { allowZero: true, max: 1000 }) / 100;
    const required = Math.ceil(orders * labels * (1 + waste));
    return { primary: money(required * unitCost, input.currency), values: { "Labels to plan": `${required}`, "Base labels": `${orders * labels}`, "Cost per order": money(required * unitCost / orders, input.currency) } };
  }

  function insertQuantity(input) {
    const orders = positive(input.orders, "Order count", { max: 100000000 });
    const inserts = positive(input.insertsPerOrder, "Inserts per order", { max: 1000 });
    const spoilage = positive(input.spoilage, "Spoilage allowance", { allowZero: true, max: 1000 }) / 100;
    const base = orders * inserts;
    const total = Math.ceil(base * (1 + spoilage));
    return { primary: `${total} inserts`, values: { "Base requirement": `${base}`, "Allowance quantity": `${total - base}`, "Inserts per order": `${inserts}` } };
  }

  function wasteAllowance(input) {
    const base = positive(input.baseQuantity, "Base quantity", { max: 100000000 });
    const waste = positive(input.waste, "Waste allowance", { allowZero: true, max: 1000 }) / 100;
    const total = Math.ceil(base * (1 + waste));
    return { primary: `${total} units`, values: { "Base requirement": `${base}`, "Waste units": `${total - base}`, "Allowance rate": `${round(waste * 100, 2)}%` } };
  }

  function reorderPoint(input) {
    const daily = positive(input.dailyUse, "Average daily use", { allowZero: true, max: 10000000 });
    const lead = positive(input.leadDays, "Lead time", { allowZero: true, max: 10000 });
    const safety = positive(input.safetyStock, "Safety stock", { allowZero: true, max: 100000000 });
    const onHand = positive(input.onHand, "Current stock", { allowZero: true, max: 100000000 });
    const point = Math.ceil(daily * lead + safety);
    return { primary: `${point} units reorder point`, values: { "Lead-time demand": `${Math.ceil(daily * lead)}`, "Current stock": `${onHand}`, "Order signal": onHand <= point ? "Reorder now" : `${Math.ceil(onHand - point)} units above point` } };
  }

  function packingTime(input) {
    const orders = positive(input.orders, "Order count", { max: 10000000 });
    const minutes = positive(input.minutesPerOrder, "Minutes per order", { max: 100000 });
    const setup = positive(input.setupMinutes, "Setup minutes", { allowZero: true, max: 100000 });
    const total = setup + orders * minutes;
    return { primary: `${round(total, 1)} minutes`, values: { "Packing time": `${round(orders * minutes, 1)} min`, "Elapsed hours": `${round(total / 60, 2)} hr`, "Average per order": `${round(total / orders, 2)} min` } };
  }

  function laborCapacity(input) {
    const workers = positive(input.workers, "Workers", { max: 100000 });
    const hours = positive(input.shiftHours, "Shift hours", { max: 24 });
    const utilization = positive(input.utilization, "Productive utilization", { max: 100 }) / 100;
    const minutes = positive(input.minutesPerOrder, "Minutes per order", { max: 100000 });
    const available = workers * hours * 60 * utilization;
    return { primary: `${Math.floor(available / minutes)} orders`, values: { "Productive minutes": `${round(available, 1)}`, "Orders per worker": `${Math.floor(hours * 60 * utilization / minutes)}`, "Unused productive minutes": `${round(available % minutes, 1)}` } };
  }

  function prepBatchTime(input) {
    const units = positive(input.units, "Batch units", { max: 10000000 });
    const seconds = positive(input.secondsPerUnit, "Seconds per unit", { max: 100000 });
    const setup = positive(input.setupMinutes, "Setup minutes", { allowZero: true, max: 100000 });
    const checks = positive(input.checkMinutes, "Quality check minutes", { allowZero: true, max: 100000 });
    const total = setup + checks + units * seconds / 60;
    return { primary: `${round(total, 1)} minutes`, values: { "Run time": `${round(units * seconds / 60, 1)} min`, "Setup and checks": `${round(setup + checks, 1)} min`, "Elapsed hours": `${round(total / 60, 2)} hr` } };
  }

  function kittingCost(input) {
    const componentCost = positive(input.componentCost, "Component cost", { allowZero: true, max: 1000000 });
    const components = positive(input.components, "Components per kit", { max: 100000 });
    const packaging = positive(input.packaging, "Packaging cost", { allowZero: true, max: 1000000 });
    const minutes = positive(input.minutes, "Assembly minutes", { allowZero: true, max: 100000 });
    const hourly = positive(input.hourly, "Hourly labor rate", { allowZero: true, max: 1000000 });
    const waste = positive(input.waste, "Waste allowance", { allowZero: true, max: 1000 }) / 100;
    const materials = (componentCost * components + packaging) * (1 + waste);
    const labor = minutes / 60 * hourly;
    return { primary: money(materials + labor, input.currency), values: { "Materials with waste": money(materials, input.currency), "Assembly labor": money(labor, input.currency), "Components per kit": `${components}` } };
  }

  function bundlePackingCost(input) {
    const items = positive(input.items, "Items per bundle", { max: 100000 });
    const handling = positive(input.handlingCost, "Handling cost per item", { allowZero: true, max: 1000000 });
    const materials = positive(input.bundleMaterials, "Bundle materials", { allowZero: true, max: 1000000 });
    const minutes = positive(input.minutes, "Packing minutes", { allowZero: true, max: 100000 });
    const hourly = positive(input.hourly, "Hourly labor rate", { allowZero: true, max: 1000000 });
    const total = items * handling + materials + minutes / 60 * hourly;
    return { primary: money(total, input.currency), values: { "Item handling": money(items * handling, input.currency), "Bundle materials": money(materials, input.currency), "Packing labor": money(minutes / 60 * hourly, input.currency) } };
  }

  function masterCartonDimensions(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const item = ["itemLength", "itemWidth", "itemHeight"].map((key) => positive(input[key], key, { max: 10000 }));
    const columns = positive(input.columns, "Columns", { max: 10000 });
    const rows = positive(input.rows, "Rows", { max: 10000 });
    const layers = positive(input.layers, "Layers", { max: 10000 });
    const clearance = positive(input.clearance, "Outer clearance", { allowZero: true, max: 1000 });
    const gap = positive(input.gap, "Item gap", { allowZero: true, max: 1000 });
    const dims = [item[0] * columns + gap * Math.max(0, columns - 1) + 2 * clearance, item[1] * rows + gap * Math.max(0, rows - 1) + 2 * clearance, item[2] * layers + gap * Math.max(0, layers - 1) + 2 * clearance];
    return { primary: `${dims.map((v)=>round(v,2)).join(" × ")} ${unit}`, values: { "Units per carton": `${columns * rows * layers}`, "Internal volume": `${round(dims.reduce((a,b)=>a*b),2)} ${unit}³`, "Layout": `${columns} columns × ${rows} rows × ${layers} layers` } };
  }

  function masterCartonWeight(input) {
    const units = positive(input.units, "Units per carton", { max: 1000000 });
    const unitWeight = positive(input.unitWeight, "Unit weight", { max: 1000000 });
    const tare = positive(input.tareWeight, "Carton and packing weight", { allowZero: true, max: 1000000 });
    const max = positive(input.maxWeight, "Maximum planned weight", { max: 1000000 });
    const total = units * unitWeight + tare;
    if (total > max) throw new Error("Estimated carton weight exceeds the entered maximum planned weight.");
    return { primary: `${round(total,2)} ${input.weightUnit || "lb"}`, values: { "Product weight": `${round(units * unitWeight,2)} ${input.weightUnit || "lb"}`, "Tare weight": `${round(tare,2)} ${input.weightUnit || "lb"}`, "Remaining allowance": `${round(max-total,2)} ${input.weightUnit || "lb"}` } };
  }

  function cartonCube(input) {
    const unit = input.unit === "cm" ? "cm" : "in";
    const dimensions = ["length", "width", "height"].map((key)=>positive(input[key], key, { max: 10000 }));
    const cartons = positive(input.cartons, "Carton count", { max: 10000000 });
    const each = dimensions.reduce((a,b)=>a*b);
    const total = each * cartons;
    const cubicMeters = unit === "cm" ? total / 1000000 : total * 0.000016387064;
    return { primary: `${round(cubicMeters,3)} m³ total`, values: { "Cube per carton": `${round(each,2)} ${unit}³`, "Carton count": `${cartons}`, "Total cubic feet": `${round(cubicMeters * 35.3146667,3)} ft³` } };
  }

  function casesPerPallet(input) {
    const palletL = positive(input.palletLength, "Pallet length", { max: 10000 });
    const palletW = positive(input.palletWidth, "Pallet width", { max: 10000 });
    const caseL = positive(input.caseLength, "Case length", { max: 10000 });
    const caseW = positive(input.caseWidth, "Case width", { max: 10000 });
    const layers = positive(input.layers, "Layer count", { max: 10000 });
    const straight = Math.floor(palletL/caseL)*Math.floor(palletW/caseW);
    const rotated = Math.floor(palletL/caseW)*Math.floor(palletW/caseL);
    const perLayer = Math.max(straight, rotated);
    if (perLayer < 1) throw new Error("The case footprint does not fit on the pallet.");
    return { primary: `${perLayer * layers} cases`, values: { "Cases per layer": `${perLayer}`, "Layers": `${layers}`, "Orientation": rotated > straight ? "Rotated grid" : "Straight grid" } };
  }

  function palletLayerCount(input) {
    const cases = positive(input.cases, "Case quantity", { max: 100000000 });
    const perLayer = positive(input.casesPerLayer, "Cases per layer", { max: 1000000 });
    const maxLayers = positive(input.maxLayers, "Maximum layers", { max: 100000 });
    const layers = Math.ceil(cases/perLayer);
    if (layers > maxLayers) throw new Error("Required layers exceed the entered maximum layer count.");
    return { primary: `${layers} layers`, values: { "Full layers": `${Math.floor(cases/perLayer)}`, "Cases on top layer": `${cases % perLayer || perLayer}`, "Layer capacity": `${layers * perLayer} cases` } };
  }

  function palletHeight(input) {
    const base = positive(input.palletHeight, "Empty pallet height", { allowZero: true, max: 10000 });
    const caseHeight = positive(input.caseHeight, "Case height", { max: 10000 });
    const layers = positive(input.layers, "Layer count", { max: 10000 });
    const top = positive(input.topAllowance, "Top allowance", { allowZero: true, max: 10000 });
    const max = positive(input.maxHeight, "Maximum planned height", { max: 100000 });
    const total = base + caseHeight * layers + top;
    if (total > max) throw new Error("Estimated pallet height exceeds the entered maximum planned height.");
    return { primary: `${round(total,2)} ${input.unit || "in"}`, values: { "Load height": `${round(caseHeight*layers,2)} ${input.unit || "in"}`, "Base and top allowance": `${round(base+top,2)} ${input.unit || "in"}`, "Remaining height": `${round(max-total,2)} ${input.unit || "in"}` } };
  }

  function palletUtilization(input) {
    const palletL = positive(input.palletLength, "Pallet length", { max: 10000 });
    const palletW = positive(input.palletWidth, "Pallet width", { max: 10000 });
    const caseL = positive(input.caseLength, "Case length", { max: 10000 });
    const caseW = positive(input.caseWidth, "Case width", { max: 10000 });
    const cases = positive(input.casesPerLayer, "Cases per layer", { max: 1000000 });
    const rate = caseL * caseW * cases / (palletL*palletW) * 100;
    if (rate > 100) throw new Error("Entered case footprints exceed the pallet footprint.");
    return { primary: `${round(rate,1)}% footprint utilization`, values: { "Used footprint": `${round(caseL*caseW*cases,2)} ${input.unit || "in"}²`, "Pallet footprint": `${round(palletL*palletW,2)} ${input.unit || "in"}²`, "Unused footprint": `${round(palletL*palletW-caseL*caseW*cases,2)} ${input.unit || "in"}²` } };
  }

  function whole(value, label, options) {
    const number = positive(value, label, options);
    if (!Number.isInteger(number)) throw new Error(`${label} must be a whole number.`);
    return number;
  }

  function signed(value, places) {
    const rounded = round(value, places == null ? 2 : places);
    if (rounded > 0) return `+${rounded}`;
    if (rounded < 0) return `−${Math.abs(rounded)}`;
    return "0";
  }

  function signedMoney(value, currency) {
    const rounded = round(value, 2);
    const sign = rounded > 0 ? "+" : rounded < 0 ? "−" : "";
    return `${sign}${currency || "$"}${Math.abs(rounded).toFixed(2)}`;
  }

  function shippingDamageRate(input) {
    const shipments = whole(input.shipments, "Shipments reviewed", { max: 1000000000 });
    const damaged = whole(input.damaged, "Damaged shipments", { allowZero: true, max: 1000000000 });
    if (damaged > shipments) throw new Error("Damaged shipments cannot exceed shipments reviewed.");
    const rate = damaged / shipments * 100;
    return {
      primary: `${round(rate, 2)}% observed damage rate`,
      values: {
        "Damaged shipments": `${damaged}`,
        "Shipments without recorded damage": `${shipments - damaged}`,
        "Observed incident frequency": damaged === 0 ? "No observed damage in this sample" : `1 per ${round(shipments / damaged, 1)} shipments`
      }
    };
  }

  function packagingFailureCost(input) {
    const currency = input.currency || "$";
    const shipments = whole(input.shipments, "Shipments reviewed", { max: 1000000000 });
    const failures = whole(input.failures, "Packaging-related failures", { allowZero: true, max: 1000000000 });
    if (failures > shipments) throw new Error("Packaging-related failures cannot exceed shipments reviewed.");
    const replacement = positive(input.replacement, "Replacement product cost", { allowZero: true, max: 100000000 });
    const reship = positive(input.reship, "Outbound reshipment", { allowZero: true, max: 100000000 });
    const returnShipping = positive(input.returnShipping, "Return shipping", { allowZero: true, max: 100000000 });
    const handlingMinutes = positive(input.handlingMinutes, "Warehouse handling minutes", { allowZero: true, max: 100000 });
    const supportMinutes = positive(input.supportMinutes, "Customer support minutes", { allowZero: true, max: 100000 });
    const hourly = positive(input.hourly, "Loaded labor rate", { allowZero: true, max: 1000000 });
    const other = positive(input.other, "Other direct cost", { allowZero: true, max: 100000000 });
    const labor = (handlingMinutes + supportMinutes) / 60 * hourly;
    const perFailure = replacement + reship + returnShipping + labor + other;
    const total = failures * perFailure;
    return {
      primary: money(total, currency),
      values: {
        "Observed failure rate": `${round(failures / shipments * 100, 2)}%`,
        "Direct cost per failure": money(perFailure, currency),
        "Direct cost per reviewed shipment": money(total / shipments, currency),
        "Labor cost per failure": money(labor, currency)
      }
    };
  }

  function packagingTrialComparison(input) {
    const currency = input.currency || "$";
    const inspectedA = whole(input.inspectedA, "Trial A packages inspected", { max: 100000000 });
    const damagedA = whole(input.damagedA, "Trial A damaged packages", { allowZero: true, max: 100000000 });
    const inspectedB = whole(input.inspectedB, "Trial B packages inspected", { max: 100000000 });
    const damagedB = whole(input.damagedB, "Trial B damaged packages", { allowZero: true, max: 100000000 });
    if (damagedA > inspectedA || damagedB > inspectedB) throw new Error("Damaged packages cannot exceed inspected packages for either trial.");
    const materialA = positive(input.materialCostA, "Trial A material cost", { allowZero: true, max: 1000000 });
    const materialB = positive(input.materialCostB, "Trial B material cost", { allowZero: true, max: 1000000 });
    const minutesA = positive(input.minutesA, "Trial A packing time", { allowZero: true, max: 100000 });
    const minutesB = positive(input.minutesB, "Trial B packing time", { allowZero: true, max: 100000 });
    const weightA = positive(input.weightA, "Trial A package weight", { max: 1000000 });
    const weightB = positive(input.weightB, "Trial B package weight", { max: 1000000 });
    const hourly = positive(input.hourly, "Loaded labor rate", { allowZero: true, max: 1000000 });
    const rateA = damagedA / inspectedA * 100;
    const rateB = damagedB / inspectedB * 100;
    const pointDifference = rateB - rateA;
    const costA = materialA + minutesA / 60 * hourly;
    const costB = materialB + minutesB / 60 * hourly;
    let primary = "Same observed damage rate";
    if (Math.abs(pointDifference) >= 0.005) primary = `${pointDifference < 0 ? "Trial B" : "Trial A"}: ${round(Math.abs(pointDifference), 2)} pp lower observed damage`;
    return {
      primary,
      values: {
        "Trial A observed damage": `${round(rateA, 2)}% (${damagedA}/${inspectedA})`,
        "Trial B observed damage": `${round(rateB, 2)}% (${damagedB}/${inspectedB})`,
        "Pack cost difference (B − A)": signedMoney(costB - costA, currency),
        "Packing time difference (B − A)": `${signed(minutesB - minutesA, 2)} min`,
        "Package weight difference (B − A)": `${signed(weightB - weightA, 3)} entered units`
      }
    };
  }

  function packageWeightDimensionVariance(input) {
    const recorded = ["recordedLength", "recordedWidth", "recordedHeight", "recordedWeight"].map((key) => positive(input[key], key.replace(/([A-Z])/g, " $1"), { max: 100000000 }));
    const observed = ["observedLength", "observedWidth", "observedHeight", "observedWeight"].map((key) => positive(input[key], key.replace(/([A-Z])/g, " $1"), { max: 100000000 }));
    const dimensionTolerance = positive(input.dimensionTolerance, "Dimension tolerance", { allowZero: true, max: 1000 });
    const weightTolerance = positive(input.weightTolerance, "Weight tolerance", { allowZero: true, max: 1000 });
    const differences = observed.map((value, index) => value - recorded[index]);
    const percentages = differences.map((value, index) => value / recorded[index] * 100);
    const maxDimensionVariance = Math.max(...percentages.slice(0, 3).map(Math.abs));
    const weightVariance = percentages[3];
    const within = maxDimensionVariance <= dimensionTolerance + 1e-9 && Math.abs(weightVariance) <= weightTolerance + 1e-9;
    return {
      primary: within ? "Within entered tolerances" : "Review measurement variance",
      values: {
        "Dimension differences (L / W / H)": differences.slice(0, 3).map((value) => signed(value, 3)).join(" / ") + " entered units",
        "Largest dimension variance": `${round(maxDimensionVariance, 2)}%`,
        "Weight difference": `${signed(differences[3], 3)} entered units`,
        "Weight variance": `${signed(weightVariance, 2)}%`,
        "Tolerance comparison": within ? "No entered tolerance exceeded" : "At least one entered tolerance exceeded"
      }
    };
  }

  return {
    constants: { IN_TO_CM, LB_TO_KG, CUIN_TO_L },
    helpers: { positive, round, lengthToIn, lengthFromIn, areaFromSqIn, volumeFromCuIn },
    calculators: {
      "dimensional-weight": dimensionalWeight,
      "length-girth": lengthGirth,
      "box-size": boxSize,
      "box-volume": boxVolume,
      "void-fill": voidFill,
      "bubble-wrap": bubbleWrap,
      "packing-paper": packingPaper,
      "tape-usage": tapeUsage,
      "poly-mailer-size": polyMailer,
      "packaging-cost": packagingCost,
      "carton-count": cartonCount,
      "case-pack": casePack,
      "box-utilization": boxUtilization,
      "multi-item-box-fit": multiItemBoxFit,
      "packaging-material-budget": materialBudget,
      "monthly-packaging-spend": monthlySpend,
      "label-cost": labelCost,
      "insert-quantity": insertQuantity,
      "packaging-waste-allowance": wasteAllowance,
      "packaging-supply-reorder-point": reorderPoint,
      "order-packing-time": packingTime,
      "labor-capacity-per-shift": laborCapacity,
      "prep-batch-time": prepBatchTime,
      "kitting-cost": kittingCost,
      "bundle-packing-cost": bundlePackingCost,
      "master-carton-dimensions": masterCartonDimensions,
      "master-carton-weight": masterCartonWeight,
      "carton-cube": cartonCube,
      "cases-per-pallet": casesPerPallet,
      "pallet-layer-count": palletLayerCount,
      "pallet-height": palletHeight,
      "pallet-utilization": palletUtilization,
      "shipping-damage-rate": shippingDamageRate,
      "packaging-failure-cost": packagingFailureCost,
      "packaging-trial-comparison": packagingTrialComparison,
      "package-weight-dimension-variance": packageWeightDimensionVariance
    }
  };
});
