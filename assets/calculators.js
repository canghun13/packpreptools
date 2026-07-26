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
      "packaging-cost": packagingCost
    }
  };
});
