"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://packpreptools.com";
const REVIEWED = "July 26, 2026";
const PILOT = process.argv.includes("--pilot");

const tools = [
  {
    slug: "dimensional-weight",
    title: "Dimensional Weight Calculator",
    short: "Compare package volume with the DIM divisor used for billing.",
    description: "Calculate dimensional weight in pounds or kilograms from package dimensions and a carrier divisor.",
    unit: true,
    fields: [
      ["length", "Length", "12", "length"],
      ["width", "Width", "10", "length"],
      ["height", "Height", "8", "length"],
      ["divisor", "DIM divisor", "139", "divisor"]
    ],
    formula: "Dimensional weight = length × width × height ÷ DIM divisor",
    example: "A 12 × 10 × 8 in carton has 960 in³ of volume. Using a 139 divisor, its DIM weight is 6.91 lb, commonly rounded up to 7 lb for rating.",
    interpretation: "Compare the rounded DIM weight with the scale weight. A carrier may bill whichever is greater, subject to its current service rules.",
    assumptions: "The calculator does not select a divisor for you or quote a shipment. Confirm the divisor, rounding method, and minimums with the carrier or marketplace you use.",
    related: ["box-volume", "length-girth"],
    doc: "/reference/dimensional-weight-divisors.html"
  },
  {
    slug: "length-girth",
    title: "Length + Girth Calculator",
    short: "Measure the longest side plus the distance around the two shorter sides.",
    description: "Calculate package length plus girth in inches or centimeters for shipping size checks.",
    unit: true,
    fields: [
      ["length", "Side 1", "30", "length"],
      ["width", "Side 2", "18", "length"],
      ["height", "Side 3", "12", "length"]
    ],
    formula: "Length + girth = longest side + 2 × (second side + shortest side)",
    example: "For a 30 × 18 × 12 in carton, the longest side is 30 in and girth is 60 in. Length plus girth is 90 in.",
    interpretation: "Use the result to compare the package with a published carrier size limit. Carrier definitions and limits can change.",
    assumptions: "The longest dimension is treated as length automatically. Bulges and irregular shapes must be measured at their widest points.",
    related: ["dimensional-weight", "box-size"],
    doc: "/guides/how-to-measure-a-box.html"
  },
  {
    slug: "box-size",
    title: "Box Size Calculator",
    short: "Add protective wrap and working clearance to product dimensions.",
    description: "Estimate minimum internal box dimensions from product size, cushioning thickness, and clearance.",
    unit: true,
    fields: [
      ["length", "Product length", "10", "length"],
      ["width", "Product width", "6", "length"],
      ["height", "Product height", "4", "length"],
      ["clearance", "Clearance per side", "0.5", "length"],
      ["wrap", "Wrap thickness per side", "0.25", "length"]
    ],
    formula: "Internal dimension = product dimension + 2 × (clearance + wrap thickness)",
    example: "A 10 × 6 × 4 in product with 0.5 in clearance and 0.25 in wrap on every side needs at least 11.5 × 7.5 × 5.5 in internally.",
    interpretation: "Round each result up to an available internal box size. Check the manufacturer’s internal dimensions, not only the external carton label.",
    assumptions: "This is a rectangular fit estimate. Compressible, irregular, fragile, or orientation-sensitive products need a physical pack test.",
    related: ["box-volume", "void-fill"],
    doc: "/guides/how-much-packaging-clearance.html"
  },
  {
    slug: "box-volume",
    title: "Box Volume Calculator",
    short: "Find cubic capacity and convert it to liters and cubic feet.",
    description: "Calculate rectangular box volume in cubic inches or cubic centimeters, liters, and cubic feet.",
    unit: true,
    fields: [
      ["length", "Internal length", "12", "length"],
      ["width", "Internal width", "10", "length"],
      ["height", "Internal height", "8", "length"]
    ],
    formula: "Box volume = internal length × internal width × internal height",
    example: "A 12 × 10 × 8 in box has 960 in³ of internal volume, equal to about 15.73 L or 0.56 ft³.",
    interpretation: "Internal volume helps compare cartons and estimate unused space. It does not by itself prove that a product shape will fit.",
    assumptions: "The box is treated as a perfect rectangular prism. Use internal dimensions when estimating usable capacity.",
    related: ["void-fill", "dimensional-weight"],
    doc: "/reference/internal-vs-external-box-dimensions.html"
  },
  {
    slug: "void-fill",
    title: "Void Fill Calculator",
    short: "Estimate empty carton volume after products are placed inside.",
    description: "Estimate package void volume and cushioning fill needs from box size, product size, quantity, and a fill factor.",
    unit: true,
    fields: [
      ["boxLength", "Box internal length", "14", "length"],
      ["boxWidth", "Box internal width", "10", "length"],
      ["boxHeight", "Box internal height", "8", "length"],
      ["productLength", "Product length", "10", "length"],
      ["productWidth", "Product width", "6", "length"],
      ["productHeight", "Product height", "4", "length"],
      ["quantity", "Product quantity", "1", "count"],
      ["factor", "Fill factor", "1", "ratio"]
    ],
    formula: "Estimated fill = (box volume − total product volume) × fill factor",
    example: "A 14 × 10 × 8 in box around one 10 × 6 × 4 in product leaves 880 in³. At a 1.0 fill factor, estimate 880 in³ of loose filled volume.",
    interpretation: "Use the empty-space share to spot oversized cartons. Convert the estimate into bags, paper, or dispensing settings with a production trial.",
    assumptions: "Product volume is simplified to a rectangular block. The fill factor is an operational adjustment, not a material density specification.",
    related: ["packing-paper", "box-volume"],
    doc: "/guides/how-much-packaging-clearance.html"
  },
  {
    slug: "bubble-wrap",
    title: "Bubble Wrap Calculator",
    short: "Estimate wrap area from product surface, layer count, and overlap.",
    description: "Estimate bubble wrap area for a rectangular product using layers and overlap allowance.",
    unit: true,
    fields: [
      ["length", "Product length", "10", "length"],
      ["width", "Product width", "6", "length"],
      ["height", "Product height", "4", "length"],
      ["layers", "Wrap layers", "2", "count"],
      ["overlap", "Overlap allowance", "15", "percent"]
    ],
    formula: "Wrap area = product surface area × layers × (1 + overlap percentage)",
    example: "A 10 × 6 × 4 in product has 248 in² of surface. Two layers plus 15% overlap require about 570.4 in², or 3.96 ft².",
    interpretation: "Divide the required area by your roll width to estimate a cut length, then round up for handling and corner coverage.",
    assumptions: "The product is modeled as a rectangular prism. Seams, corner bunching, fragile projections, and operator technique can increase use.",
    related: ["void-fill", "packing-paper"],
    doc: "/reference/common-packaging-materials.html"
  },
  {
    slug: "packing-paper",
    title: "Packing Paper Calculator",
    short: "Convert carton void into an estimated whole-sheet requirement.",
    description: "Estimate packing paper sheet count from box void and an operator-tested crumpled yield depth.",
    unit: true,
    fields: [
      ["boxLength", "Box internal length", "14", "length"],
      ["boxWidth", "Box internal width", "10", "length"],
      ["boxHeight", "Box internal height", "8", "length"],
      ["productLength", "Product length", "10", "length"],
      ["productWidth", "Product width", "6", "length"],
      ["productHeight", "Product height", "4", "length"],
      ["sheetLength", "Paper sheet length", "24", "length"],
      ["sheetWidth", "Paper sheet width", "18", "length"],
      ["yieldDepth", "Crumpled yield depth", "2", "length"]
    ],
    formula: "Sheets = round up [void volume ÷ (sheet length × sheet width × tested yield depth)]",
    example: "An 880 in³ void divided by an estimated 864 in³ crumpled yield per 24 × 18 in sheet rounds up to 2 sheets.",
    interpretation: "Calibrate yield depth by packing several real orders with your paper weight and operator method.",
    assumptions: "Paper does not fill space like a solid block. This planning estimate must be calibrated with repeatable packing trials.",
    related: ["void-fill", "bubble-wrap"],
    doc: "/reference/common-packaging-materials.html"
  },
  {
    slug: "tape-usage",
    title: "Tape Usage Calculator",
    short: "Plan carton-sealing tape for center-seam or H-seal patterns.",
    description: "Estimate tape use per carton and across a batch using center-seam or H-seal patterns.",
    unit: true,
    fields: [
      ["length", "Box length", "14", "length"],
      ["width", "Box width", "10", "length"],
      ["overhang", "End overhang", "2", "length"],
      ["cartons", "Carton count", "100", "count"]
    ],
    select: ["pattern", "Seal pattern", [["center", "Center seam — top and bottom"], ["h", "H-seal — top and bottom"]]],
    formula: "Center seam = 2 × (length + 2 × overhang); H-seal adds 4 × (width + 2 × overhang)",
    example: "For 100 cartons measuring 14 × 10 in with 2 in overhang, a center seam uses 3,600 in, or 300 ft, of tape.",
    interpretation: "Compare the total with roll length and add a shop-specific setup and waste allowance before ordering.",
    assumptions: "The model covers top and bottom seals. Reinforcement, poor adhesion, rework, tabs, and dispenser losses are excluded.",
    related: ["packaging-cost", "box-size"],
    doc: "/guides/reduce-packaging-cost.html"
  },
  {
    slug: "poly-mailer-size",
    title: "Poly Mailer Size Calculator",
    short: "Allow for product thickness, insertion clearance, and seal flap.",
    description: "Estimate minimum internal poly mailer width and length for a rectangular soft or boxed product.",
    unit: true,
    fields: [
      ["length", "Product length", "10", "length"],
      ["width", "Product width", "8", "length"],
      ["height", "Product thickness", "2", "length"],
      ["clearance", "Insertion clearance", "0.5", "length"],
      ["flap", "Seal flap allowance", "2", "length"]
    ],
    formula: "Mailer width = product width + thickness + 2 × clearance; mailer length = product length + thickness + clearance + flap",
    example: "A 10 × 8 × 2 in item with 0.5 in clearance and a 2 in flap needs about 11 × 14.5 in of usable internal mailer space.",
    interpretation: "Round up to a stocked mailer size and confirm the published usable dimensions below the adhesive seal.",
    assumptions: "The estimate assumes a flexible mailer and a regular product. Rigid corners, compression, seams, and gussets change fit.",
    related: ["box-size", "packaging-cost"],
    doc: "/reference/package-measurement-terms.html"
  },
  {
    slug: "packaging-cost",
    title: "Packaging Cost per Order Calculator",
    short: "Combine materials, waste allowance, and packing labor.",
    description: "Calculate packaging cost per order from supplies, waste percentage, labor minutes, and hourly labor rate.",
    currency: true,
    fields: [
      ["container", "Box or mailer", "0.85", "currency"],
      ["fill", "Cushioning or fill", "0.32", "currency"],
      ["tape", "Tape and closure", "0.08", "currency"],
      ["label", "Label and paperwork", "0.12", "currency"],
      ["other", "Other materials", "0.05", "currency"],
      ["minutes", "Packing labor", "4", "minutes"],
      ["hourly", "Hourly labor rate", "18", "currency-hour"],
      ["waste", "Material waste allowance", "5", "percent"]
    ],
    formula: "Cost per order = materials × (1 + waste %) + labor minutes ÷ 60 × hourly rate",
    example: "Materials totaling $1.42 with 5% waste become $1.49. Four minutes at $18/hour adds $1.20, for about $2.69 per order.",
    interpretation: "Use the total as an internal packing-cost baseline. Compare it by SKU, pack method, or month to find repeatable savings.",
    assumptions: "Postage, product cost, marketplace fees, rent, equipment depreciation, and taxes are excluded unless entered as other materials.",
    related: ["tape-usage", "void-fill"],
    doc: "/guides/reduce-packaging-cost.html"
  }
];

const phaseTools = [
  ["carton-count", "Carton Count Calculator", "Calculate cartons required from unit demand and units per carton.", [["units","Units required","125","count"],["perCarton","Units per carton","24","count"]], "Cartons = round up (units required ÷ units per carton)", "For 125 units at 24 units per carton, plan 6 cartons with 19 units in the final carton.", ["case-pack","master-carton-dimensions"], "/guides/master-carton-planning.html"],
  ["case-pack", "Case Pack Calculator", "Convert case quantities and loose reserve units into a total unit plan.", [["cases","Sealed case quantity","12","count"],["unitsPerCase","Units per case","24","count"],["reserve","Loose reserve units","6","count"]], "Total units = cases × units per case + reserve units", "Twelve cases of 24 plus 6 reserve units produce a 294-unit availability plan.", ["carton-count","insert-quantity"], "/reference/master-carton-terms.html"],
  ["box-utilization", "Box Utilization Calculator", "Compare total rectangular item volume with internal box volume.", [["boxLength","Box internal length","16","length"],["boxWidth","Box internal width","12","length"],["boxHeight","Box internal height","10","length"],["itemLength","Item length","7","length"],["itemWidth","Item width","5","length"],["itemHeight","Item height","3","length"],["quantity","Item quantity","4","count"]], "Utilization = total item volume ÷ internal box volume × 100", "Four 7 × 5 × 3 in item blocks occupy 420 in³ of a 1,920 in³ box, or 21.9%.", ["multi-item-box-fit","void-fill"], "/guides/how-to-choose-void-fill.html"],
  ["multi-item-box-fit", "Multi-item Box Fit Calculator", "Estimate orthogonal grid capacity across six item orientations.", [["boxLength","Box internal length","16","length"],["boxWidth","Box internal width","12","length"],["boxHeight","Box internal height","10","length"],["itemLength","Item length","7","length"],["itemWidth","Item width","5","length"],["itemHeight","Item height","3","length"],["quantity","Required quantity","8","count"]], "Grid capacity = maximum of floor(box side ÷ rotated item side) products", "A 7 × 5 × 3 in item is checked in six orthogonal orientations inside a 16 × 12 × 10 in box.", ["box-utilization","master-carton-dimensions"], "/guides/master-carton-planning.html"],
  ["packaging-material-budget", "Packaging Material Budget Calculator", "Budget variable packaging materials with waste and contingency allowances.", [["orders","Planned orders","1000","count"],["materialCost","Material cost per order","1.35","currency"],["waste","Waste allowance","5","percent"],["contingency","Contingency reserve","3","percent"]], "Budget = orders × material cost × (1 + waste % + contingency %)", "One thousand orders at $1.35 each with 5% waste and 3% contingency require a $1,458 budget.", ["monthly-packaging-spend","packaging-cost"], "/reference/packaging-cost-components.html"],
  ["monthly-packaging-spend", "Monthly Packaging Spend Calculator", "Project monthly and planning-period packaging spend.", [["orders","Monthly orders","1500","count"],["costPerOrder","Variable cost per order","1.45","currency"],["fixedCost","Monthly fixed packaging cost","250","currency"],["months","Planning months","3","count"]], "Monthly spend = monthly orders × cost per order + fixed packaging cost", "At 1,500 orders, $1.45 variable cost, and $250 fixed cost, monthly spend is $2,425.", ["packaging-material-budget","packaging-cost"], "/guides/packaging-cost-reduction-checklist.html"],
  ["label-cost", "Label Cost Calculator", "Estimate label quantity and cost with a changeable waste allowance.", [["orders","Order count","1000","count"],["labelsPerOrder","Labels per order","2","count"],["unitCost","Cost per label","0.04","currency"],["waste","Waste allowance","3","percent"]], "Label cost = round up [orders × labels per order × (1 + waste %)] × unit cost", "One thousand orders using two $0.04 labels with 3% waste require 2,060 labels costing $82.40.", ["insert-quantity","packaging-material-budget"], "/reference/packaging-cost-components.html"],
  ["insert-quantity", "Insert Quantity Calculator", "Plan cards, leaflets, and instructions with a spoilage allowance.", [["orders","Order count","1200","count"],["insertsPerOrder","Inserts per order","1","count"],["spoilage","Spoilage allowance","4","percent"]], "Inserts = round up [orders × inserts per order × (1 + spoilage %)]", "For 1,200 orders and 4% spoilage, plan 1,248 single inserts.", ["label-cost","packaging-waste-allowance"], "/guides/packaging-inventory-basics.html"],
  ["packaging-waste-allowance", "Packaging Waste Allowance Calculator", "Add an adjustable waste percentage to a base supply requirement.", [["baseQuantity","Base material quantity","1000","count"],["waste","Waste allowance","7","percent"]], "Planned quantity = round up [base quantity × (1 + waste %)]", "A base requirement of 1,000 units with 7% waste becomes 1,070 units.", ["packaging-supply-reorder-point","insert-quantity"], "/reference/void-fill-yield-factors.html"],
  ["packaging-supply-reorder-point", "Packaging Supply Reorder Point Calculator", "Set a packaging supply reorder trigger from use, lead time, and safety stock.", [["dailyUse","Average daily use","80","count"],["leadDays","Supplier lead time","10","count"],["safetyStock","Safety stock","300","count"],["onHand","Current stock","950","count"]], "Reorder point = average daily use × lead days + safety stock", "Using 80 units daily, 10 lead days, and 300 safety units produces a 1,100-unit reorder point.", ["packaging-waste-allowance","monthly-packaging-spend"], "/guides/packaging-inventory-basics.html"],
  ["order-packing-time", "Order Packing Time Calculator", "Estimate batch duration from setup time and minutes per order.", [["orders","Orders to pack","120","count"],["minutesPerOrder","Minutes per order","3.5","minutes"],["setupMinutes","Setup minutes","20","minutes"]], "Total time = setup minutes + orders × minutes per order", "A 120-order run at 3.5 minutes each plus 20 minutes setup takes 440 minutes.", ["labor-capacity-per-shift","prep-batch-time"], "/guides/packing-station-workflow.html"],
  ["labor-capacity-per-shift", "Labor Capacity per Shift Calculator", "Estimate completed orders from staffing, shift time, utilization, and pack time.", [["workers","Packing workers","3","count"],["shiftHours","Shift hours","8","hours"],["utilization","Productive utilization","80","percent"],["minutesPerOrder","Minutes per order","4","minutes"]], "Capacity = workers × shift hours × 60 × utilization % ÷ minutes per order", "Three workers on an eight-hour shift at 80% utilization and four minutes per order can plan 288 orders.", ["order-packing-time","prep-batch-time"], "/guides/packing-station-workflow.html"],
  ["prep-batch-time", "Prep Batch Time Calculator", "Combine setup, per-unit preparation, and quality-check time.", [["units","Batch units","250","count"],["secondsPerUnit","Seconds per unit","35","seconds"],["setupMinutes","Setup minutes","15","minutes"],["checkMinutes","Quality check minutes","20","minutes"]], "Batch time = setup + checks + units × seconds per unit ÷ 60", "Preparing 250 units at 35 seconds each plus 35 minutes of setup and checks takes about 180.8 minutes.", ["order-packing-time","kitting-cost"], "/guides/packing-station-workflow.html"],
  ["kitting-cost", "Kitting Cost Calculator", "Estimate component, packaging, waste, and assembly labor cost per kit.", [["componentCost","Average component cost","1.20","currency"],["components","Components per kit","3","count"],["packaging","Kit packaging cost","0.65","currency"],["minutes","Assembly minutes","4","minutes"],["hourly","Hourly labor rate","18","currency-hour"],["waste","Material waste allowance","2","percent"]], "Kit cost = (components × component cost + packaging) × (1 + waste %) + assembly labor", "Three $1.20 components, $0.65 packaging, 2% waste, and four minutes at $18/hour cost about $5.54 per kit.", ["bundle-packing-cost","prep-batch-time"], "/reference/packaging-cost-components.html"],
  ["bundle-packing-cost", "Bundle Packing Cost Calculator", "Estimate item handling, bundle materials, and packing labor per bundle.", [["items","Items per bundle","4","count"],["handlingCost","Handling cost per item","0.18","currency"],["bundleMaterials","Bundle materials","0.55","currency"],["minutes","Packing minutes","3","minutes"],["hourly","Hourly labor rate","18","currency-hour"]], "Bundle packing cost = items × handling cost + materials + packing labor", "Four items at $0.18 handling, $0.55 materials, and three minutes at $18/hour cost $2.17 per bundle.", ["kitting-cost","packaging-cost"], "/guides/packaging-cost-reduction-checklist.html"],
  ["master-carton-dimensions", "Master Carton Dimensions Calculator", "Estimate minimum internal master carton dimensions from a row, column, and layer layout.", [["itemLength","Packed unit length","8","length"],["itemWidth","Packed unit width","5","length"],["itemHeight","Packed unit height","3","length"],["columns","Layout columns","3","count"],["rows","Layout rows","2","count"],["layers","Layout layers","2","count"],["clearance","Outer clearance per side","0.5","length"],["gap","Gap between units","0.25","length"]], "Master dimension = unit dimension × layout count + internal gaps + two outer clearances", "A 3 × 2 × 2 layout of 8 × 5 × 3 in units with 0.25 in gaps and 0.5 in clearance needs 25.5 × 11.25 × 7.25 in internally.", ["master-carton-weight","carton-count"], "/guides/master-carton-planning.html"],
  ["master-carton-weight", "Master Carton Weight Calculator", "Check estimated packed carton weight against a user-entered planning maximum.", [["units","Units per carton","12","count"],["unitWeight","Weight per unit","1.8","weight"],["tareWeight","Carton and packing weight","2.4","weight"],["maxWeight","Maximum planned weight","30","weight"]], "Packed carton weight = units × unit weight + carton and packing tare", "Twelve 1.8 lb units plus 2.4 lb tare produce a 24 lb master carton, leaving 6 lb to a 30 lb planning maximum.", ["master-carton-dimensions","cases-per-pallet"], "/reference/master-carton-terms.html"],
  ["carton-cube", "Carton Cube Calculator", "Calculate cube per carton and total shipment cube.", [["length","Carton external length","24","length"],["width","Carton external width","16","length"],["height","Carton external height","12","length"],["cartons","Carton count","20","count"]], "Total cube = length × width × height × carton count", "Twenty 24 × 16 × 12 in cartons total about 1.51 m³ or 53.33 ft³.", ["box-volume","cases-per-pallet"], "/reference/master-carton-terms.html"],
  ["cases-per-pallet", "Cases per Pallet Calculator", "Estimate straight-grid cases per pallet across a user-entered layer count.", [["palletLength","Pallet length","48","length"],["palletWidth","Pallet width","40","length"],["caseLength","Case length","16","length"],["caseWidth","Case width","12","length"],["layers","Layer count","5","count"]], "Cases per pallet = best straight or rotated grid per layer × layers", "A 48 × 40 in pallet with 16 × 12 in cases fits 9 cases per layer and 45 across five layers in a single-orientation grid.", ["pallet-layer-count","pallet-utilization"], "/guides/pallet-planning-basics.html"],
  ["pallet-layer-count", "Pallet Layer Count Calculator", "Calculate required pallet layers within a user-entered maximum.", [["cases","Case quantity","86","count"],["casesPerLayer","Cases per layer","10","count"],["maxLayers","Maximum layers","10","count"]], "Layers = round up (case quantity ÷ cases per layer)", "Eighty-six cases at 10 per layer require nine layers, with six cases on the top layer.", ["cases-per-pallet","pallet-height"], "/guides/pallet-planning-basics.html"],
  ["pallet-height", "Pallet Height Calculator", "Check pallet, load, and top allowance against a user-entered height maximum.", [["palletHeight","Empty pallet height","6","length"],["caseHeight","Case height","10","length"],["layers","Layer count","6","count"],["topAllowance","Top cap allowance","2","length"],["maxHeight","Maximum planned height","72","length"]], "Total height = empty pallet height + case height × layers + top allowance", "A 6 in pallet with six 10 in layers and 2 in top allowance totals 68 in, below a 72 in planning maximum.", ["pallet-layer-count","pallet-utilization"], "/reference/pallet-and-unit-load-terms.html"],
  ["pallet-utilization", "Pallet Utilization Calculator", "Estimate pallet footprint utilization from case footprint and cases per layer.", [["palletLength","Pallet length","48","length"],["palletWidth","Pallet width","40","length"],["caseLength","Case length","16","length"],["caseWidth","Case width","12","length"],["casesPerLayer","Cases per layer","10","count"]], "Footprint utilization = case footprint × cases per layer ÷ pallet footprint × 100", "Ten 16 × 12 in case footprints use 100% of a 48 × 40 in pallet footprint by area.", ["cases-per-pallet","pallet-height"], "/reference/pallet-and-unit-load-terms.html"]
].map(([slug,title,description,fields,formula,example,related,doc]) => ({
  slug, title, short: description, description, unit: fields.some((field) => field[3] === "length"), currency: fields.some((field) => field[3] === "currency"),
  fields, formula, example,
  interpretation: "Use the result as an operating plan, compare it with the relevant capacity or budget, and record the assumptions used for the batch.",
  assumptions: slug === "multi-item-box-fit"
    ? "This is an orthogonal grid estimate, not a complete 3D bin-packing optimizer. It excludes nesting, irregular shapes, cushioning, loading sequence, compression, and orientation restrictions."
    : slug.includes("pallet")
      ? "This planning estimate does not verify load stability, overhang, compression strength, weight distribution, equipment clearance, or regulatory compliance. Confirm the physical unit load."
      : "Inputs describe a simplified repeatable process. Validate yields, labor pace, fit, supplier lead time, and operating limits with current production data.",
  related, doc
}));
tools.push(...phaseTools);

const toolOperations = {
  "dimensional-weight": { category: "Package size and fit", output: "DIM weight", useWhen: "A light package may rate by volume." },
  "length-girth": { category: "Package size and fit", output: "Length + girth", useWhen: "Checking a published package-size limit." },
  "box-size": { category: "Package size and fit", output: "Minimum internal size", useWhen: "Selecting a carton around a protected product." },
  "box-volume": { category: "Package size and fit", output: "Cubic capacity", useWhen: "Comparing carton capacity or usable space." },
  "void-fill": { category: "Materials and usage", output: "Empty volume", useWhen: "Estimating headspace and cushioning demand." },
  "bubble-wrap": { category: "Materials and usage", output: "Wrap area", useWhen: "Planning layers and overlap for a product." },
  "packing-paper": { category: "Materials and usage", output: "Paper sheets", useWhen: "Converting empty volume into a paper plan." },
  "tape-usage": { category: "Materials and usage", output: "Tape length", useWhen: "Planning tape for a carton batch." },
  "poly-mailer-size": { category: "Package size and fit", output: "Mailer size", useWhen: "Sizing a flexible mailer around thickness." },
  "packaging-cost": { category: "Cost and inventory", output: "Cost per order", useWhen: "Combining materials, waste, and labor." }
};
Object.assign(toolOperations, {
  "carton-count": { category: "Cost and inventory", output: "Cartons required", useWhen: "Converting unit demand into cartons." },
  "case-pack": { category: "Cost and inventory", output: "Total available units", useWhen: "Combining sealed cases and reserves." },
  "box-utilization": { category: "Package size and fit", output: "Volume utilization", useWhen: "Checking unused rectangular volume." },
  "multi-item-box-fit": { category: "Package size and fit", output: "Grid-fit capacity", useWhen: "Testing simple orthogonal arrangements." },
  "packaging-material-budget": { category: "Cost and inventory", output: "Material budget", useWhen: "Funding a planned order volume." },
  "monthly-packaging-spend": { category: "Cost and inventory", output: "Monthly spend", useWhen: "Forecasting packaging cash needs." },
  "label-cost": { category: "Cost and inventory", output: "Label quantity and cost", useWhen: "Planning label stock and waste." },
  "insert-quantity": { category: "Cost and inventory", output: "Insert quantity", useWhen: "Ordering cards or instructions." },
  "packaging-waste-allowance": { category: "Cost and inventory", output: "Quantity with waste", useWhen: "Adding an adjustable loss factor." },
  "packaging-supply-reorder-point": { category: "Cost and inventory", output: "Reorder point", useWhen: "Setting a supply replenishment trigger." },
  "order-packing-time": { category: "Labor and workflow", output: "Batch duration", useWhen: "Scheduling an order run." },
  "labor-capacity-per-shift": { category: "Labor and workflow", output: "Orders per shift", useWhen: "Planning staffing capacity." },
  "prep-batch-time": { category: "Labor and workflow", output: "Preparation time", useWhen: "Timing setup, run, and checks." },
  "kitting-cost": { category: "Labor and workflow", output: "Cost per kit", useWhen: "Pricing component assembly work." },
  "bundle-packing-cost": { category: "Labor and workflow", output: "Cost per bundle", useWhen: "Combining handling, materials, and labor." },
  "master-carton-dimensions": { category: "Master cartons", output: "Minimum internal size", useWhen: "Laying packed units in rows and layers." },
  "master-carton-weight": { category: "Master cartons", output: "Packed carton weight", useWhen: "Checking a user-set weight ceiling." },
  "carton-cube": { category: "Master cartons", output: "Shipment cube", useWhen: "Planning space across multiple cartons." },
  "cases-per-pallet": { category: "Pallet planning", output: "Cases per pallet", useWhen: "Estimating a straight-grid unit load." },
  "pallet-layer-count": { category: "Pallet planning", output: "Layers required", useWhen: "Converting case demand into layers." },
  "pallet-height": { category: "Pallet planning", output: "Loaded height", useWhen: "Checking a user-entered height ceiling." },
  "pallet-utilization": { category: "Pallet planning", output: "Footprint utilization", useWhen: "Comparing case area with pallet area." }
});

const documentRelations = {
  "how-to-measure-a-box": "Length + Girth Calculator",
  "dimensional-weight-explained": "DIM Weight Calculator",
  "how-much-packaging-clearance": "Box Size Calculator",
  "reduce-packaging-cost": "Packaging Cost Calculator",
  "package-measurement-terms": "All measurement tools",
  "common-packaging-materials": "Protection tools",
  "dimensional-weight-divisors": "DIM Weight Calculator",
  "internal-vs-external-box-dimensions": "Box Size Calculator"
};
Object.assign(documentRelations, {
  "box-vs-poly-mailer": "Poly Mailer Size Calculator",
  "how-to-choose-void-fill": "Void Fill Calculator",
  "packing-station-workflow": "Order Packing Time Calculator",
  "packaging-inventory-basics": "Supply Reorder Point Calculator",
  "tape-types-and-seal-patterns": "Tape Usage Calculator",
  "packaging-cost-reduction-checklist": "Monthly Packaging Spend Calculator",
  "master-carton-planning": "Master Carton Dimensions Calculator",
  "pallet-planning-basics": "Cases per Pallet Calculator",
  "packaging-unit-conversion": "Measurement and cube tools",
  "packaging-cost-components": "Cost and budget tools",
  "box-style-and-closure-glossary": "Tape Usage Calculator",
  "void-fill-yield-factors": "Void Fill Calculator",
  "master-carton-terms": "Master carton tools",
  "pallet-and-unit-load-terms": "Pallet planning tools"
});

const guides = [
  {
    slug: "how-to-measure-a-box",
    title: "How to Measure a Box Correctly",
    description: "Measure package length, width, and height consistently and understand internal versus external dimensions.",
    intro: "Reliable packing calculations begin with dimensions taken from the right surfaces, in the right order, without ignoring bulges.",
    sections: [
      ["Start with the measurement purpose", "Use external dimensions for shipping size and dimensional weight. Use internal dimensions for product fit, clearance, and void-fill planning. A carton supplier may list either set, so read the specification label."],
      ["Identify length, width, and height", "For shipping measurements, length is normally the longest side. Width is the next longest side and height is the remaining side. Measure at the maximum finished points after the carton is closed."],
      ["Measure the packed package", "Tape, overfilled flaps, corner protectors, and flexible mailers can change the final dimensions. Place the package on a flat surface, keep the measuring tool square, and record any outward bow."],
      ["Use a repeatable worksheet", "Record the unit, whether dimensions are internal or external, the package state, and who measured it. Repeat the measurement when packaging materials or the pack method changes."]
    ],
    checklist: ["Use one unit throughout the calculation.", "Measure maximum finished dimensions.", "Do not substitute nominal carton size for a packed measurement.", "Confirm carrier-specific rounding and measurement rules."],
    related: "/tools/length-girth.html"
  },
  {
    slug: "dimensional-weight-explained",
    title: "Dimensional Weight Explained for Small Sellers",
    description: "Understand why dimensional weight matters, how divisors work, and what small sellers should verify.",
    intro: "Dimensional weight converts package space into a comparison weight. It helps shipping networks account for large, light cartons.",
    sections: [
      ["Why volume can affect billing", "A lightweight item in an oversized box consumes vehicle and sorting capacity. A carrier can compare actual scale weight with a volume-based dimensional weight and use the billable result defined by its service."],
      ["What the divisor does", "The divisor converts cubic volume into weight. A smaller divisor produces a larger dimensional weight. Divisors can vary by unit system, carrier, service, route, account, and time."],
      ["Where sellers make mistakes", "Common errors include using internal dimensions, selecting an old divisor, mixing centimeters with an inch-pound divisor, and rounding each dimension incorrectly. Always follow the current published method for the shipment."],
      ["How to reduce DIM exposure", "Choose the smallest practical package, remove unnecessary headspace, standardize carton choices, and re-measure the final packed package after changing cushioning or box style."]
    ],
    checklist: ["Use external packed dimensions.", "Match dimensions and divisor units.", "Keep the unrounded result for audit.", "Verify the current carrier rule before quoting."],
    related: "/tools/dimensional-weight.html"
  },
  {
    slug: "how-much-packaging-clearance",
    title: "How Much Clearance Should Packaging Have?",
    description: "Plan product clearance for insertion, protective material, movement control, and a practical pack test.",
    intro: "Clearance is working space around a product. Too little can crush protective material; too much can increase motion, fill use, and shipping volume.",
    sections: [
      ["Separate wrap from working clearance", "Protective wrap has physical thickness. Working clearance is additional room for insertion, tolerances, and operator handling. Add both on each relevant side instead of treating them as one vague allowance."],
      ["Match clearance to product risk", "Fragile, heavy, sharp, irregular, or surface-sensitive items often need a designed protection system rather than a universal gap. Product orientation and stacking load also matter."],
      ["Control movement", "A successful pack should limit damaging movement without applying harmful pressure. Void fill is not a substitute for structural support when the product needs bracing or suspension."],
      ["Run a physical pack test", "Use the calculator as a box shortlist, then pack the real item with production materials. Check insertion effort, closure, movement, corners, and the final external dimensions."]
    ],
    checklist: ["Measure the wrapped product.", "Allow for dimensional tolerances.", "Check final closure and bulging.", "Document the approved pack method."],
    related: "/tools/box-size.html"
  },
  {
    slug: "reduce-packaging-cost",
    title: "How to Reduce Packaging Cost per Order",
    description: "Break packaging cost into materials, waste, and labor before changing a pack method.",
    intro: "The cheapest component is not always the lowest-cost pack. A reliable comparison includes material use, avoidable waste, and hands-on packing time.",
    sections: [
      ["Build a per-order baseline", "List the container, cushioning, tape, labels, inserts, and other consumables. Add labor minutes using a consistent loaded hourly rate. Keep postage separate so packaging changes remain visible."],
      ["Measure actual use", "Weigh or count materials across a representative batch instead of relying on catalog assumptions. Record rework, damaged supplies, and roll or sheet remnants in a waste allowance."],
      ["Reduce variation", "A short approved carton list, clear pack instructions, preset tape lengths, and staged materials can reduce decision time and overuse. Standardization should not weaken product protection."],
      ["Review the whole outcome", "Compare damage, returns, customer presentation, storage footprint, packing speed, and shipping dimensions. A small material saving can be lost if labor or damage increases."]
    ],
    checklist: ["Compare the same SKU and protection level.", "Include labor time.", "Track waste and rework.", "Re-measure shipping dimensions after changes."],
    related: "/tools/packaging-cost.html"
  }
];

guides.push(
  {
    slug: "box-vs-poly-mailer", title: "Box vs Poly Mailer: How to Choose", description: "Choose a box or flexible mailer from protection, shape, closure, and handling needs.", intro: "Container choice starts with product risk and finished-package behavior, not material price alone.",
    sections: [["Screen the product", "Use a box when the item needs crush resistance, edge protection, stacking support, or structured cushioning. Consider a mailer when the item is flexible or already boxed, non-fragile, and tolerant of pressure."],["Compare finished size", "Measure the protected product and estimate both options. A mailer can reduce empty volume, but seams, flap depth, stiffness, and product thickness reduce usable space."],["Check the operating process", "Compare insertion effort, sealing time, label surface, storage footprint, and the number of stocked sizes. Run a representative batch rather than judging one ideal pack."],["Approve the choice", "Inspect closure, movement, presentation, and damage after realistic handling. Record the selected size, orientation, protection, and exceptions in the pack instruction."]],
    checklist: ["Classify crush and edge risk.", "Use published usable dimensions.", "Compare final external size.", "Test the production closure."], related: "/tools/poly-mailer-size.html"
  },
  {
    slug: "how-to-choose-void-fill", title: "How to Choose Void Fill", description: "Select and calibrate void fill by movement control, yield, pack speed, and recovery.", intro: "Void fill should control movement without pretending to provide structural support it cannot deliver.",
    sections: [["Define the job", "Separate blocking, bracing, wrapping, surface protection, and presentation. Loose fill may occupy space while a heavy or fragile product still needs engineered support."],["Compare materials", "Paper, air pillows, foam systems, and other fills differ in recovery, compression, dust, storage, equipment, and operator technique. Use supplier data as a starting point."],["Calibrate yield", "Pack a measured sample, record the dispensing or sheet quantity, and divide output by filled void. Use a conservative adjustable factor in planning."],["Verify the pack", "Check movement, corners, closure, compression after storage, and final dimensions. Repeat after material, equipment, carton, or operator changes."]],
    checklist: ["Calculate the approximate void.", "Identify protection function.", "Measure real yield.", "Document the approved quantity range."], related: "/tools/void-fill.html"
  },
  {
    slug: "packing-station-workflow", title: "Packing Station Workflow for Small Sellers", description: "Build a repeatable dispatch workflow from staging through verification and release.", intro: "A stable packing workflow reduces searching, decisions, rework, and variation without sacrificing protection.",
    sections: [["Map the sequence", "Use a clear flow: stage order and product, select container, protect, close, label, verify, and release. Keep exceptions out of the standard lane."],["Stage materials", "Place high-use supplies within safe reach, replenish to visible minimums, and keep approved alternatives identified. Avoid overstock that hides shortages."],["Measure time correctly", "Separate setup, run time, checks, and interruptions. Sample several normal batches and retain the range instead of one fastest observation."],["Control quality", "Define checks for SKU, quantity, protection, closure, label readability, weight, and exception handling. Record recurring defects and update instructions."]],
    checklist: ["Document the standard sequence.", "Separate setup from run time.", "Set replenishment triggers.", "Audit completed packs."], related: "/tools/order-packing-time.html"
  },
  {
    slug: "packaging-inventory-basics", title: "Packaging Inventory Basics", description: "Plan packaging supply demand, safety stock, reorder points, and cycle checks.", intro: "Packaging inventory protects dispatch continuity but consumes cash and storage when assumptions are not reviewed.",
    sections: [["Create the item list", "Assign a unique record to each carton, mailer, label, insert, roll, and consumable. Record supplier pack size, usable quantity, lead time, storage requirement, and approved substitute."],["Measure demand", "Use shipped-order history by pack method, then adjust for promotions, seasonality, waste, and minimum order quantities. Do not assume every order uses one unit."],["Set the trigger", "A simple reorder point combines lead-time demand with safety stock. Compare it with on-hand usable stock, open purchase orders, and known changes."],["Count and review", "Cycle-count critical supplies, investigate differences, and update yields and lead times. Keep damaged or obsolete stock out of available quantity."]],
    checklist: ["Track usable units.", "Review daily usage and lead time.", "Set safety stock deliberately.", "Count critical items routinely."], related: "/tools/packaging-supply-reorder-point.html"
  },
  {
    slug: "tape-types-and-seal-patterns", title: "Tape Types and Common Seal Patterns", description: "Compare carton tape considerations and document center-seam and H-seal usage.", intro: "Tape performance depends on carton surface, load, environment, application, and seal geometry.",
    sections: [["Match tape to conditions", "Review backing, adhesive, width, thickness, application temperature, storage, and carton recycled content with supplier specifications. A familiar tape is not automatically suitable for every carton."],["Understand patterns", "A center seam closes the major flap joint. An H-seal adds the two edge seams on top and bottom, increasing tape length and closure coverage."],["Set application controls", "Define overhang, wipe-down pressure, cut length, dispenser condition, and where labels may cross. Inspect lifting edges and poor adhesion."],["Validate and record", "Test the packed carton under expected storage and handling. Record tape product, width, pattern, overhang, and permitted alternatives."]],
    checklist: ["Confirm carton and environment.", "Choose the seal pattern.", "Measure overhang and total length.", "Inspect adhesion after conditioning."], related: "/tools/tape-usage.html"
  },
  {
    slug: "packaging-cost-reduction-checklist", title: "Packaging Cost Reduction Checklist", description: "Audit material, labor, waste, inventory, and shipment-size changes without weakening the pack.", intro: "Cost reduction works best as a controlled comparison with protection and service outcomes held visible.",
    sections: [["Establish the baseline", "Record material quantity, price, waste, pack time, finished dimensions, damage, and rework for the same SKU and order mix."],["Find the constraint", "Look for excess size, too many variants, overuse, slow retrieval, repeated decisions, avoidable setup, and obsolete stock. Rank by annual impact."],["Run a controlled trial", "Change one pack method, define the sample and acceptance checks, and compare total cost. Include training, equipment, storage, and transition waste."],["Release and monitor", "Update instructions, inventory parameters, and calculators only after approval. Watch damage, returns, throughput, and supplier variation."]],
    checklist: ["Use a comparable baseline.", "Include labor and waste.", "Retest finished dimensions.", "Monitor protection outcomes."], related: "/tools/monthly-packaging-spend.html"
  },
  {
    slug: "master-carton-planning", title: "Master Carton Planning Guide", description: "Plan unit layout, internal dimensions, packed weight, closure, and verification for master cartons.", intro: "A master carton plan connects the packed unit, repeatable layout, carton strength, weight, and downstream handling.",
    sections: [["Define the packed unit", "Measure the finished retail or inner pack, including protrusions and protective materials. Record orientation restrictions and whether units can carry load."],["Choose rows and layers", "Set columns, rows, layers, gaps, and outer clearance explicitly. Compare alternative orientations without claiming a complete packing optimization."],["Check weight and cube", "Calculate product weight plus carton and packing tare. Compare the result with a user-approved handling limit and record external cube for storage and pallet planning."],["Build and test", "Pack a full carton, check insertion, compression, movement, closure, label area, lifting, and final external dimensions. Validate stacking and transport separately."]],
    checklist: ["Measure the packed unit.", "Record row-column-layer layout.", "Check packed weight.", "Test a full production carton."], related: "/tools/master-carton-dimensions.html"
  },
  {
    slug: "pallet-planning-basics", title: "Pallet Planning Basics for Small Shipments", description: "Estimate layers, height, footprint use, and load limits before physical pallet verification.", intro: "Pallet calculations create a planning layout; they do not prove that a unit load is stable or compliant.",
    sections: [["Collect limits", "Enter the actual pallet footprint and height, case dimensions and weight, user-approved maximum height and weight, equipment clearances, and orientation constraints."],["Plan each layer", "Compare straight and rotated grids, avoid unsupported overhang unless specifically approved, and identify partial top layers. Area utilization alone does not show stability."],["Build the vertical plan", "Add pallet base, case layers, top protection, and wrap or cap allowance. Check total case count and estimated weight against user-entered limits."],["Verify the unit load", "Build a representative load and assess compression, column alignment, interlock, center of gravity, containment, fork access, and handling route with qualified personnel."]],
    checklist: ["Use actual pallet and case dimensions.", "Set maximums as inputs.", "Review partial layers.", "Physically validate stability."], related: "/tools/cases-per-pallet.html"
  }
);

const references = [
  {
    slug: "package-measurement-terms",
    title: "Package Measurement Terms",
    description: "A practical glossary of package dimensions, girth, volume, clearance, and billable weight.",
    intro: "Use these terms consistently on packing worksheets, carton specifications, and calculator inputs.",
    rows: [
      ["Length", "Usually the longest finished external side for carrier size calculations."],
      ["Width", "The next-longest side after length when sides are ordered by size."],
      ["Height", "The remaining side; also called depth in some carton catalogs."],
      ["Girth", "The distance around the two sides perpendicular to the package length."],
      ["Internal dimensions", "Usable space inside the carton, relevant to fit and void planning."],
      ["External dimensions", "Outside finished measurements, relevant to transport space and DIM weight."],
      ["Clearance", "Planned space for insertion, tolerances, and protective materials."],
      ["Billable weight", "The weight a carrier uses under its current rating rules; it may consider actual and dimensional weight."]
    ]
  },
  {
    slug: "common-packaging-materials",
    title: "Common Packaging Materials and Uses",
    description: "Compare common boxes, mailers, cushioning, paper, bubble wrap, and closure materials.",
    intro: "Material selection should balance product protection, pack speed, storage, presentation, and the finished package size.",
    rows: [
      ["Corrugated box", "Rigid outer container for stacking, edge protection, and varied cushioning systems."],
      ["Poly mailer", "Light flexible container for non-fragile goods that tolerate limited crush protection."],
      ["Paper mailer", "Fiber-based envelope for flat or moderately flexible goods; construction varies."],
      ["Packing paper", "Crumpled or folded material for wrapping, blocking, and filling moderate voids."],
      ["Bubble wrap", "Layered air-cell material for surface and impact cushioning; use depends on bubble size and layers."],
      ["Air pillows", "Lightweight void fill for blocking movement; not a substitute for structural bracing."],
      ["Carton tape", "Pressure-sensitive or water-activated closure selected for carton surface, load, and environment."],
      ["Labels and documents", "Identification and handling information placed without covering seams or required marks."]
    ]
  },
  {
    slug: "dimensional-weight-divisors",
    title: "Dimensional Weight Divisors",
    description: "Understand dimensional weight divisors, units, and why current carrier confirmation is essential.",
    intro: "A divisor is a conversion factor, not a universal constant. Always obtain the current value from the carrier, service, marketplace, or account agreement.",
    rows: [
      ["Inch-pound form", "Cubic inches divided by an applicable in³/lb divisor produces pounds."],
      ["Metric form", "Cubic centimeters divided by an applicable cm³/kg divisor produces kilograms."],
      ["Example 139", "A commonly encountered in³/lb example; it is not guaranteed for any shipment."],
      ["Example 166", "Another historically common in³/lb example; verify before use."],
      ["Example 5000", "A commonly encountered cm³/kg example; rules and rounding still vary."],
      ["Rounding", "Carriers may round dimensions, dimensional weight, or billable weight differently."],
      ["Actual weight", "Scale weight may be compared with dimensional weight under the service rules."],
      ["Verification", "Use the current official tariff, service guide, platform rule, or account terms."]
    ]
  },
  {
    slug: "internal-vs-external-box-dimensions",
    title: "Box Dimensions: Internal vs External",
    description: "Know when to use internal carton dimensions and when finished external dimensions are required.",
    intro: "The same box has two valid measurement sets. Choosing the wrong set can create a fit failure or an inaccurate shipping calculation.",
    rows: [
      ["Internal length", "Usable inside length between the carton walls."],
      ["Internal width", "Usable inside width after accounting for board and construction."],
      ["Internal height", "Usable depth from the inside bottom to the intended closure plane."],
      ["External length", "Finished outside length after forming, filling, and closing."],
      ["External width", "Finished outside width, including any bulge or protruding closure."],
      ["External height", "Finished outside height at the maximum point."],
      ["Use internal for", "Product fit, wrap allowance, dividers, inserts, and void volume."],
      ["Use external for", "DIM weight, length plus girth, storage footprint, and carrier size checks."]
    ]
  }
];

references.push(
  {
    slug: "packaging-unit-conversion", title: "Packaging Unit Conversion Reference", description: "Convert common packaging length, area, volume, and weight units consistently.", intro: "Convert every related input before calculating and retain enough precision until the final displayed result.",
    rows: [["Length", "1 inch = 2.54 centimeters exactly; 1 foot = 12 inches."],["Area", "1 square inch = 6.4516 square centimeters; 1 square foot = 144 square inches."],["Volume", "1 cubic inch = 16.387064 milliliters; 1 cubic foot = 1,728 cubic inches."],["Mass", "1 pound = 0.45359237 kilograms; 1 kilogram is approximately 2.20462262 pounds."],["Liters", "1 liter = 1,000 cubic centimeters and approximately 61.023744 cubic inches."],["Rounding", "Convert first, calculate with unrounded values, and round only the displayed planning result."],["Use when", "Use for carton dimensions, cube, material area, weight, and unit-system comparison."],["Caution", "Dimensional-weight divisors are unit-specific; converting dimensions does not convert a divisor automatically."]]
  },
  {
    slug: "packaging-cost-components", title: "Packaging Cost Components", description: "Build a complete packaging cost record from materials, labor, waste, and operating overhead.", intro: "Use a consistent cost boundary so SKU, pack method, and monthly comparisons remain meaningful.",
    rows: [["Container", "Box, mailer, envelope, tray, or other primary shipping container."],["Protection", "Wrap, paper, air pillows, pads, dividers, corner protection, and liners."],["Closure", "Tape, adhesive, straps, staples, seals, and dispenser losses."],["Identification", "Shipping labels, product labels, inserts, documents, and printer consumables."],["Labor", "Hands-on setup, assembly, packing, checking, and rework at a chosen loaded hourly rate."],["Waste", "Damaged, misprinted, trimmed, expired, or otherwise unusable material expressed as quantity or allowance."],["Overhead boundary", "Storage, equipment, depreciation, rent, and supervision may be separate or allocated; document the choice."],["Excluded shipping cost", "Postage and carrier charges should remain separate unless the analysis explicitly includes them."]]
  },
  {
    slug: "box-style-and-closure-glossary", title: "Box Style and Closure Glossary", description: "Understand common corrugated box structures, flaps, seams, and closure terms.", intro: "Names vary by supplier, so confirm drawings, board specification, and usable dimensions before ordering.",
    rows: [["Regular slotted container", "A common slotted carton whose outer flaps meet near the center when closed."],["Full overlap carton", "Outer flaps overlap substantially, providing a different closure and stacking surface."],["Die-cut mailer", "A folded self-locking style made from a cut blank; details vary by design."],["Manufacturer joint", "The joined seam that forms the carton body, commonly glued, stitched, or taped."],["Major flaps", "The larger top or bottom flaps, normally associated with the carton length."],["Minor flaps", "The smaller flaps that close before the major flaps."],["Center-seam seal", "Tape applied along the meeting line of the major flaps, typically top and bottom."],["H-seal", "Center seams plus the two edge seams on top and bottom, forming an H-shaped pattern."]]
  },
  {
    slug: "void-fill-yield-factors", title: "Void Fill Yield Factors", description: "Calibrate paper, pillows, and other void-fill planning factors with production samples.", intro: "Yield is an operating measurement, not a universal material constant.",
    rows: [["Void volume", "Internal container volume minus simplified packed-product volume; geometry can make usable void different."],["Fill factor", "A user-set multiplier applied to estimated void to reflect compression, gaps, and method."],["Paper sheet yield", "A measured filled volume per sheet under a documented crumpling and placement method."],["Dispensed volume", "Supplier-rated or operator-measured output from a machine setting; verify after material changes."],["Recovery", "How well a fill maintains volume after compression and handling."],["Waste allowance", "Additional quantity for setup, trimming, damage, misfeeds, and normal process loss."],["Calibration batch", "A representative set of packs used to compare predicted quantity with actual use."],["Review trigger", "Recalibrate after material, carton, equipment, product, or operator-method changes."]]
  },
  {
    slug: "master-carton-terms", title: "Master Carton Terms", description: "Define case pack, master carton layout, tare, cube, and packed-carton measurements.", intro: "Use the same master-carton terms across purchasing, packing, storage, and pallet planning.",
    rows: [["Packed unit", "The finished inner item or retail pack placed into the master carton."],["Case pack", "The standard number of saleable units assigned to a sealed case or carton."],["Columns, rows, layers", "The explicit orthogonal arrangement used for the dimension estimate."],["Internal dimensions", "Usable carton space for the planned layout, gaps, dividers, and clearance."],["External dimensions", "Finished outside dimensions used for cube, storage, and unit-load planning."],["Tare weight", "Carton, dividers, liners, closure, and other packing weight without product."],["Gross packed weight", "Product weight plus tare weight for the completed carton."],["Carton cube", "External length × width × height, stated in a consistent cubic unit."]]
  },
  {
    slug: "pallet-and-unit-load-terms", title: "Pallet and Unit Load Terms", description: "Define pallet footprint, layers, utilization, overhang, containment, and load limits.", intro: "A calculated pallet pattern is only the first step in physical unit-load design.",
    rows: [["Pallet footprint", "Usable plan-view length and width entered for the pallet or platform."],["Case footprint", "Case length × width in the selected load orientation."],["Cases per layer", "Whole case positions placed on one layer by the chosen pattern."],["Layer count", "Number of vertical case tiers, including a partial top layer when present."],["Footprint utilization", "Total case footprint area divided by pallet footprint area; it does not measure stability."],["Overhang", "Any case extension beyond the supporting pallet edge; avoid unless specifically engineered and approved."],["Containment", "Wrap, straps, caps, corner boards, or other systems used to hold the unit load together."],["Maximum planned height or weight", "A user-entered operating constraint that must be confirmed for equipment, facility, transport, and applicable rules."]]
  }
);

const basicPages = [
  {
    file: "about.html",
    title: "About Pack Prep Tools",
    description: "Learn how Pack Prep Tools helps online sellers plan package dimensions, materials, and packing cost.",
    eyebrow: "About the service",
    body: `<p>Pack Prep Tools is a focused set of practical calculators and reference notes for people who pack finished products for shipment. It is built for online sellers, small brands, marketplace shops, and compact fulfillment teams.</p>
      <h2>What the site covers</h2><p>The tools address carton and mailer size, dimensional weight, length plus girth, empty space, cushioning, tape, material cost, and packing labor. They do not buy labels, quote live rates, store orders, or promise regulatory compliance.</p>
      <h2>How to use the estimates</h2><p>Start with accurate package measurements, use the calculator to create a planning estimate, then verify the result with your actual materials and current carrier or supplier rules. Packaging is physical work: a production pack trial is the final fit check.</p>
      <h2>Independent by design</h2><p>The site uses no account system and does not send calculator input values to analytics. It is intentionally lightweight, readable, and usable at a packing station.</p>`
  },
  {
    file: "contact.html",
    title: "Contact Pack Prep Tools",
    description: "Contact Pack Prep Tools with corrections, calculator feedback, or accessibility issues.",
    eyebrow: "Contact",
    body: `<p>Found a calculation issue, unclear assumption, broken link, or accessibility problem? Send a concise description to <a href="mailto:canghun13@naver.com">canghun13@naver.com</a>.</p>
      <h2>Helpful details to include</h2><ul><li>The page address and calculator name.</li><li>The unit system and example values you used.</li><li>The result you expected and why.</li><li>Your browser and device if the issue is visual.</li></ul>
      <h2>Before sending sensitive information</h2><p>Do not email customer names, addresses, order records, account credentials, payment details, or carrier contracts. Pack Prep Tools does not need them to investigate a calculator or content issue.</p>
      <h2>Scope</h2><p>We cannot provide live shipping quotes, legal advice, compliance certification, or carrier account support.</p>`
  },
  {
    file: "privacy.html",
    title: "Privacy Policy",
    description: "Read the Pack Prep Tools privacy policy for analytics, calculator inputs, and contact email.",
    eyebrow: "Privacy",
    body: `<p><strong>Effective date:</strong> July 26, 2026</p>
      <h2>Calculator inputs</h2><p>Calculations run in your browser. Pack Prep Tools does not intentionally transmit the dimensions, costs, quantities, or other values you enter into calculators to Google Analytics or a site database.</p>
      <h2>Analytics</h2><p>This site uses Google Analytics 4 to understand general page usage and improve the site. Google may process device, browser, approximate location, referral, and interaction information according to its own policies and your consent or browser settings.</p>
      <h2>Contact email</h2><p>If you email us, your message and address are used to respond and maintain necessary correspondence. Do not send customer or payment information.</p>
      <h2>Cookies and controls</h2><p>Analytics may use cookies or similar storage. You can use browser controls, blocking tools, or applicable consent settings to limit them.</p>
      <h2>Changes and questions</h2><p>This policy may change when site practices change. Questions can be sent to <a href="mailto:canghun13@naver.com">canghun13@naver.com</a>.</p>`
  }
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageUrl(file) {
  if (file === "index.html") return `${SITE}/`;
  return `${SITE}/${file.replaceAll("\\", "/")}`;
}

function ga() {
  return `<!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XR7JWJ36CD"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XR7JWJ36CD');
  </script>`;
}

function head({ file, title, description, type = "website", noindex = false, schema }) {
  const canonical = pageUrl(file);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | Pack Prep Tools</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex,follow">' : ""}
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="Pack Prep Tools">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" type="image/png" href="/favicon.png?v=20260726-complete">
  <link rel="stylesheet" href="/assets/styles.css?v=20260726-complete">
  ${ga()}
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`;
}

function header(current) {
  const items = [["Home", "/"], ["Tools", "/tools.html"], ["Guides", "/guides.html"], ["Reference", "/reference.html"], ["About", "/about.html"]];
  return `<body>
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="header-status"><div class="header-shell"><span>Shipping operations utilities</span><span class="system-state">Calculators online</span></div></div>
  <div class="header-shell header-main">
    <a class="brand" href="/" aria-label="Pack Prep Tools home"><span class="brand-mark" aria-hidden="true"></span><span class="brand-copy">Pack Prep Tools<small>Dispatch planning</small></span></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button>Menu</button>
    <nav class="site-nav" id="site-nav" aria-label="Primary" data-site-nav>
      ${items.map(([label, href]) => `<a href="${href}"${current === label ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="footer-shell footer-main">
    <div><a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span><span class="brand-copy">Pack Prep Tools<small>Dispatch planning</small></span></a><p class="footer-copy">Packaging calculations and operating references for repeatable shipment preparation.</p></div>
    <nav class="footer-links" aria-label="Footer">
      <a href="/tools.html">Tools</a><a href="/guides.html">Guides</a><a href="/reference.html">Reference</a><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/privacy.html">Privacy</a>
    </nav>
  </div>
  <div class="footer-shell footer-bottom"><span>© 2026 Pack Prep Tools</span><span>Estimate → verify → dispatch</span><span>No calculator inputs are stored</span></div>
</footer>
<script src="/assets/site.js?v=20260726-complete" defer></script>
</body>
</html>`;
}

function websiteSchema(file, title, description) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl(file),
    isPartOf: { "@type": "WebSite", name: "Pack Prep Tools", url: `${SITE}/` }
  };
}

function breadcrumbs(parts) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map((p) => ` <span aria-hidden="true">/</span> ${p.href ? `<a href="${p.href}">${p.label}</a>` : `<span>${p.label}</span>`}`).join("")}</nav>`;
}

function operationsTable(items) {
  const categoryOrder = ["Package size and fit", "Materials and usage", "Cost and inventory", "Labor and workflow", "Master cartons", "Pallet planning"];
  const orderedItems = [...items].sort((a, b) => categoryOrder.indexOf(toolOperations[a.slug].category) - categoryOrder.indexOf(toolOperations[b.slug].category));
  return `<table class="operations-table">
    <thead><tr><th>Category</th><th>Tool</th><th>Primary output</th><th>Use when</th></tr></thead>
    <tbody>${orderedItems.map((tool) => {
      const operation = toolOperations[tool.slug];
      return `<tr><td data-label="Category"><span class="category">${operation.category}</span></td><td data-label="Tool"><a href="/tools/${tool.slug}.html">${tool.title}</a></td><td data-label="Primary output">${operation.output}</td><td data-label="Use when">${operation.useWhen}</td></tr>`;
    }).join("")}</tbody>
  </table>`;
}

function documentRegister(items, prefix) {
  const folder = prefix === "G" ? "guides" : "reference";
  return `<ol class="document-register">${items.map((item, index) => `<li><a href="/${folder}/${item.slug}.html"><code>${prefix}${String(index + 1).padStart(2, "0")}</code><span><strong>${item.title}</strong><small>${item.description}</small></span></a></li>`).join("")}</ol>`;
}

function documentTable(items, kind) {
  const folder = kind.toLowerCase();
  const prefix = kind === "Guides" ? "G" : "R";
  return `<table class="operations-table">
    <thead><tr><th>Document</th><th>Title</th><th>Summary</th><th>Related tool</th></tr></thead>
    <tbody>${items.map((item, index) => `<tr><td data-label="Document"><span class="category">${prefix}${String(index + 1).padStart(2, "0")}</span></td><td data-label="Title"><a href="/${folder}/${item.slug}.html">${item.title}</a></td><td data-label="Summary">${item.description}</td><td data-label="Related tool">${documentRelations[item.slug]}</td></tr>`).join("")}</tbody>
  </table>`;
}

function write(file, contents) {
  const target = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents, "utf8");
}

function homepage() {
  const file = "index.html";
  const title = "Packaging Calculators for Small Sellers";
  const description = "Plan box size, dimensional weight, cushioning, tape, mailers, and packaging cost with focused packing tools.";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pack Prep Tools",
    url: `${SITE}/`,
    description
  };
  return `${head({ file, title, description, schema })}${header("Home")}
<main id="main">
  <section class="dispatch-hero"><div class="page-shell dispatch-hero-inner">
    <p class="dispatch-meta"><span>${tools.length} live calculators</span><span>${guides.length + references.length} controlled documents</span><span>Browser-based results</span></p>
    <h1>Packaging decisions, ready for dispatch.</h1>
    <p class="hero-copy">Size the shipment, plan protection, estimate closure materials, and understand cost before an order leaves your operation.</p>
    <div class="button-row"><a class="button button-primary" href="/tools.html">Open packaging tools</a><a class="button button-secondary" href="/guides/how-to-measure-a-box.html">Review measurement procedure</a></div>
  </div></section>
  <nav class="quick-start" aria-label="Quick start tools"><div class="page-shell quick-start-shell">
    <div class="quick-label">Quick start<br>common decisions</div>
    ${["dimensional-weight", "box-size", "void-fill", "packaging-cost"].map((slug) => {
      const tool = tools.find((item) => item.slug === slug);
      return `<a class="quick-link" href="/tools/${slug}.html"><small>${toolOperations[slug].category}</small><strong>${tool.title}</strong></a>`;
    }).join("")}
  </div></nav>
  <section class="content-section"><div class="page-shell">
    <div class="section-title"><span class="section-code">Dispatch flow / 04 stages</span><h2>Move from dimensions to a repeatable pack.</h2><p>Use the stage that matches the operational decision, then verify the estimate against the finished shipment.</p></div>
    <div class="process-track"><div class="process-step"><b>01</b><h3>Measure</h3><p>Capture final external size for shipping and internal size for fit.</p></div><div class="process-step"><b>02</b><h3>Protect</h3><p>Allow for wrap, clearance, void fill, and handling conditions.</p></div><div class="process-step"><b>03</b><h3>Close</h3><p>Size the mailer or estimate tape for the selected seal pattern.</p></div><div class="process-step"><b>04</b><h3>Cost</h3><p>Combine material use, waste allowance, and packing labor.</p></div></div>
  </div></section>
  <section class="content-section content-section-muted"><div class="page-shell">
    <div class="section-title"><span class="section-code">Featured operations / 12 routes</span><h2>Packaging operations register</h2><p>Start with a common decision, or open the complete register for all ${tools.length} calculators.</p></div>
    ${operationsTable(["box-size","void-fill","tape-usage","packaging-cost","packaging-supply-reorder-point","order-packing-time","kitting-cost","master-carton-dimensions","master-carton-weight","cases-per-pallet","pallet-height","pallet-utilization"].map((slug) => tools.find((tool) => tool.slug === slug)))}
    <div class="button-row"><a class="button button-primary" href="/tools.html">View all ${tools.length} calculators</a><a class="button button-quiet" href="/guides/master-carton-planning.html">Plan master cartons</a><a class="button button-quiet" href="/guides/pallet-planning-basics.html">Plan pallet loads</a></div>
  </div></section>
  <section class="content-section"><div class="page-shell">
    <div class="section-title"><span class="section-code">Controlled documents</span><h2>Procedures and reference data</h2><p>Measurement procedures explain what to do. Reference sheets define the terms and assumptions used in calculations.</p></div>
    <div class="document-index"><section class="document-group"><h3>Guides / procedures</h3>${documentRegister(guides, "G")}</section><section class="document-group"><h3>Reference / definitions</h3>${documentRegister(references, "R")}</section></div>
  </div></section>
  <section class="operations-notice"><div class="page-shell operations-notice-grid"><div><h2>Estimate, verify, dispatch.</h2><p>Results support packaging decisions; they do not replace a physical pack test or current carrier rules.</p></div><ol class="verify-list"><li><b>01 / Estimate</b>Use accurate dimensions and documented assumptions.</li><li><b>02 / Verify</b>Pack the real item and measure the finished package.</li><li><b>03 / Release</b>Confirm protection, closure, and current service limits.</li></ol></div></section>
</main>${footer()}`;
}

function unitOptions(tool) {
  if (tool.currency) {
    return `<div class="field"><label for="currency">Currency symbol</label><select id="currency" name="currency"><option value="$">$ — Dollar</option><option value="€">€ — Euro</option><option value="£">£ — Pound</option><option value="₩">₩ — Won</option></select></div>`;
  }
  if (!tool.unit) return "";
  return `<div class="field"><label for="unit">Measurement unit</label><select id="unit" name="unit"><option value="in">Inches (in)</option><option value="cm">Centimeters (cm)</option></select></div>`;
}

function suffix(type) {
  const labels = {
    length: '<span data-unit-suffix>in / cm</span>',
    divisor: "divisor",
    count: "count",
    ratio: "×",
    percent: "%",
    currency: "currency",
    minutes: "min",
    "currency-hour": "per hr",
    hours: "hr",
    seconds: "sec",
    weight: "lb"
  };
  return labels[type] || "";
}

function calculatorPage(tool) {
  const file = `tools/${tool.slug}.html`;
  const title = tool.title;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: title, applicationCategory: "BusinessApplication", operatingSystem: "Any", url: pageUrl(file), description: tool.description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools.html` },
        { "@type": "ListItem", position: 3, name: title, item: pageUrl(file) }
      ] }
    ]
  };
  const fields = tool.fields.map(([id, label, value, type]) => `<div class="field"><label for="${id}">${label}</label><div class="input-shell"><input id="${id}" name="${id}" type="number" inputmode="decimal" min="0" step="any" value="${value}" required aria-describedby="${id}-unit"><span class="suffix" id="${id}-unit">${suffix(type)}</span></div></div>`).join("");
  const select = tool.select ? `<div class="field field-wide"><label for="${tool.select[0]}">${tool.select[1]}</label><select id="${tool.select[0]}" name="${tool.select[0]}">${tool.select[2].map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></div>` : "";
  const related = tool.related.map((slug) => {
    const match = tools.find((item) => item.slug === slug);
    return `<li><a href="/tools/${slug}.html">${match.title}</a></li>`;
  }).join("");
  return `${head({ file, title, description: tool.description, schema })}${header("Tools")}
<main id="main">
  <header class="page-banner"><div class="page-shell">${breadcrumbs([{ label: "Tools", href: "/tools.html" }, { label: title }])}<p class="dispatch-meta"><span>${toolOperations[tool.slug].category}</span><span>Calculation utility</span></p><h1>${title}</h1><p class="lede">${tool.description}</p></div></header>
  <section class="calculator-console"><div class="page-shell">
    <div class="manifest-panel"><div class="manifest-header"><span>Shipment input manifest</span><span>Required fields / visible units</span></div>
      <form class="calculator-form" data-calculator="${tool.slug}" novalidate><div class="manifest-grid">${unitOptions(tool)}${fields}${select}</div><div class="form-actions"><button class="button button-primary" type="submit">Calculate</button><button class="button button-quiet" type="reset">Reset</button></div><p class="form-error" data-error role="alert" aria-live="polite"></p></form>
    </div>
    <section class="output-strip" data-result data-state="idle" tabindex="-1" aria-live="polite"><div class="output-header"><span>Dispatch summary</span><span>Planning estimate</span></div><div class="output-body"><div><p class="output-kicker">Primary output</p><p class="output-primary" data-result-primary>Enter your package details to begin.</p></div><dl class="output-values" data-result-values></dl></div></section>
  </div></section>
  <section class="article-zone"><div class="page-shell article-shell"><article class="article-body">
    <nav class="document-toc" aria-label="On this page"><strong>On this page</strong><ul><li><a href="#method">Method</a></li><li><a href="#example">Worked example</a></li><li><a href="#interpretation">Interpretation</a></li><li><a href="#limits">Assumptions and limitations</a></li></ul></nav>
    <h2 id="method">Calculation method</h2><p>This calculator uses the following planning method:</p><div class="formula">${tool.formula}</div>
    <h2 id="example">Worked example</h2><p>${tool.example}</p>
    <h2 id="interpretation">How to interpret the result</h2><p>${tool.interpretation}</p>
    <h2 id="limits">Assumptions and limitations</h2><p>${tool.assumptions}</p>
    <div class="caution"><strong>Estimate only.</strong> Verify the packed result with actual materials and the current requirements of your supplier, marketplace, or carrier.</div>
    <ul class="related-register">${related}<li><a href="${tool.doc}">Related guide or reference</a></li><li><a href="/tools.html">All calculators</a></li></ul>
    <p class="meta-line">Last reviewed: ${REVIEWED}</p>
  </article></div></section>
</main><script src="/assets/calculators.js?v=20260726-complete" defer></script>${footer()}`;
}

function indexPage(kind, items) {
  const isTools = kind === "Tools";
  const file = `${kind.toLowerCase()}.html`;
  const title = isTools ? "Packaging Calculators" : kind === "Guides" ? "Packaging Guides" : "Packaging Reference";
  const description = isTools ? `Browse ${tools.length} practical calculators for package fit, materials, cost, labor, master cartons, and pallet planning.` : kind === "Guides" ? `Read ${guides.length} practical guides for repeatable packaging and dispatch work.` : `Use ${references.length} detailed reference records for packaging terms, units, materials, costs, cartons, and pallet loads.`;
  return `${head({ file, title, description, schema: websiteSchema(file, title, description) })}${header(kind)}
<main id="main"><header class="page-banner"><div class="page-shell">${breadcrumbs([{ label: kind }])}<p class="dispatch-meta"><span>${isTools ? "Operations register" : "Controlled documents"}</span><span>${items.length} active records</span></p><h1>${title}</h1><p class="lede">${description}</p></div></header>
<section class="content-section"><div class="page-shell">${isTools ? operationsTable(items) : documentTable(items, kind)}</div></section></main>${footer()}`;
}

const guideReferences = {
  "box-vs-poly-mailer": "/reference/common-packaging-materials.html",
  "how-to-choose-void-fill": "/reference/void-fill-yield-factors.html",
  "packing-station-workflow": "/reference/packaging-cost-components.html",
  "packaging-inventory-basics": "/reference/packaging-cost-components.html",
  "tape-types-and-seal-patterns": "/reference/box-style-and-closure-glossary.html",
  "packaging-cost-reduction-checklist": "/reference/packaging-cost-components.html",
  "master-carton-planning": "/reference/master-carton-terms.html",
  "pallet-planning-basics": "/reference/pallet-and-unit-load-terms.html"
};
const referenceGuides = {
  "packaging-unit-conversion": "/guides/how-to-measure-a-box.html",
  "packaging-cost-components": "/guides/packaging-cost-reduction-checklist.html",
  "box-style-and-closure-glossary": "/guides/tape-types-and-seal-patterns.html",
  "void-fill-yield-factors": "/guides/how-to-choose-void-fill.html",
  "master-carton-terms": "/guides/master-carton-planning.html",
  "pallet-and-unit-load-terms": "/guides/pallet-planning-basics.html"
};

function articlePage(item, kind) {
  const folder = kind.toLowerCase();
  const file = `${folder}/${item.slug}.html`;
  const title = item.title;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: title, description: item.description, datePublished: "2026-07-26", dateModified: "2026-07-26", mainEntityOfPage: pageUrl(file), author: { "@type": "Organization", name: "Pack Prep Tools" }, publisher: { "@type": "Organization", name: "Pack Prep Tools" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: kind, item: `${SITE}/${folder}.html` },
        { "@type": "ListItem", position: 3, name: title, item: pageUrl(file) }
      ] }
    ]
  };
  const body = kind === "Guides"
    ? `<p class="lede">${item.intro}</p><nav class="document-toc" aria-label="On this page"><strong>On this page</strong><ul>${item.sections.map(([heading], index) => `<li><a href="#section-${index + 1}">${heading}</a></li>`).join("")}<li><a href="#checklist">Checklist</a></li></ul></nav>${item.sections.map(([heading, text], index) => `<h2 id="section-${index + 1}">${heading}</h2><p>${text}</p>`).join("")}<h2 id="checklist">Dispatch checklist</h2><ul>${item.checklist.map((x) => `<li>${x}</li>`).join("")}</ul><div class="caution"><strong>Planning note.</strong> Packaging performance depends on the product, materials, handling environment, and current shipping requirements. Test the finished pack.</div>`
    : `<p class="lede">${item.intro}</p><nav class="document-toc" aria-label="On this page"><strong>On this page</strong><ul><li><a href="#definitions">Definitions and operating notes</a></li><li><a href="#verification">Verification</a></li></ul></nav><h2 id="definitions">Definitions and operating notes</h2><dl class="reference-ledger">${item.rows.map(([term, text]) => `<div><dt>${term}</dt><dd>${text}</dd></div>`).join("")}</dl><div class="caution" id="verification"><strong>Reference note.</strong> Confirm current supplier and carrier specifications before using a term or value operationally.</div>`;
  const related = kind === "Guides" ? item.related : item.slug.includes("dimensional") ? "/tools/dimensional-weight.html" : item.slug.includes("internal") ? "/tools/box-size.html" : "/tools.html";
  const crossDocument = kind === "Guides" ? (guideReferences[item.slug] || "/reference.html") : (referenceGuides[item.slug] || "/guides.html");
  return `${head({ file, title, description: item.description, type: "article", schema })}${header(kind)}
<main id="main"><header class="page-banner"><div class="page-shell">${breadcrumbs([{ label: kind, href: `/${folder}.html` }, { label: title }])}<p class="dispatch-meta"><span>${kind === "Guides" ? "Procedure" : "Reference record"}</span><span>Reviewed July 2026</span></p><h1>${title}</h1></div></header>
<section class="article-zone"><div class="page-shell article-shell"><article class="article-body">${body}<ul class="related-register"><li><a href="${related}">Related calculator</a></li><li><a href="${crossDocument}">Related ${kind === "Guides" ? "reference" : "guide"}</a></li><li><a href="/${folder}.html">All ${folder}</a></li></ul><p class="meta-line">Last reviewed: ${REVIEWED}</p></article></div></section></main>${footer()}`;
}

function basicPage(page) {
  const schema = websiteSchema(page.file, page.title, page.description);
  return `${head({ file: page.file, title: page.title, description: page.description, schema })}${header(page.title.startsWith("About") ? "About" : "")}
<main id="main"><header class="page-banner"><div class="page-shell">${breadcrumbs([{ label: page.title }])}<p class="dispatch-meta"><span>${page.eyebrow}</span><span>Pack Prep Tools</span></p><h1>${page.title}</h1><p class="lede">${page.description}</p></div></header>
<section class="article-zone"><div class="page-shell article-shell"><article class="article-body">${page.body}<p class="meta-line">Last reviewed: ${REVIEWED}</p></article></div></section></main>${footer()}`;
}

function notFound() {
  const file = "404.html";
  const title = "Package Not Found";
  const description = "The requested Pack Prep Tools page could not be found.";
  return `${head({ file, title, description, noindex: true, schema: websiteSchema(file, title, description) })}${header("")}
<main id="main"><header class="page-banner"><div class="page-shell"><p class="dispatch-meta"><span>404 / route unavailable</span><span>No shipment record</span></p><h1>Package not found.</h1><p class="lede">This page may have moved, or the address may be incomplete. Return to the dispatch index and choose a current tool.</p><div class="button-row"><a class="button button-primary" href="/">Go to homepage</a><a class="button button-quiet" href="/tools.html">Browse calculators</a></div></div></header></main>${footer()}`;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function favicon() {
  const size = 32;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const offset = y * (size * 4 + 1) + 1 + x * 4;
      const line = x >= 5 && x <= 27 && ((y >= 6 && y <= 8) || (y >= 15 && y <= 17) || (y >= 24 && y <= 26));
      const node = (x >= 4 && x <= 10 && y >= 4 && y <= 10) || (x >= 22 && x <= 28 && y >= 13 && y <= 19) || (x >= 4 && x <= 10 && y >= 22 && y <= 28);
      const color = node ? [255, 255, 255, 255] : line ? [8, 120, 232, 255] : [7, 26, 46, 255];
      raw.set(color, offset);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.set([8, 6, 0, 0, 0], 8);
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

function indexableFiles() {
  return [
    "index.html", "tools.html", "guides.html", "reference.html", "about.html", "contact.html", "privacy.html",
    ...tools.map((tool) => `tools/${tool.slug}.html`),
    ...guides.map((guide) => `guides/${guide.slug}.html`),
    ...references.map((reference) => `reference/${reference.slug}.html`)
  ];
}

function discoveryFiles() {
  const urls = indexableFiles().map((file) => pageUrl(file));
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
  write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  write("llms.txt", `# Pack Prep Tools\n\nPackaging calculations and operating references for repeatable shipment preparation.\n\n## Calculators (${tools.length})\n${tools.map((tool) => `- [${tool.title}](${SITE}/tools/${tool.slug}.html): ${tool.description}`).join("\n")}\n\n## Guides (${guides.length})\n${guides.map((guide) => `- [${guide.title}](${SITE}/guides/${guide.slug}.html): ${guide.description}`).join("\n")}\n\n## Reference (${references.length})\n${references.map((reference) => `- [${reference.title}](${SITE}/reference/${reference.slug}.html): ${reference.description}`).join("\n")}\n\nAll calculator outputs are planning estimates. Verify physical packs and current supplier, marketplace, carrier, facility, and regulatory requirements.\n`);
}

function generate() {
  write("index.html", homepage());
  write("tools/dimensional-weight.html", calculatorPage(tools[0]));
  fs.writeFileSync(path.join(ROOT, "favicon.png"), favicon());
  if (PILOT) return;

  write("tools.html", indexPage("Tools", tools));
  write("guides.html", indexPage("Guides", guides));
  write("reference.html", indexPage("Reference", references));
  tools.slice(1).forEach((tool) => write(`tools/${tool.slug}.html`, calculatorPage(tool)));
  guides.forEach((guide) => write(`guides/${guide.slug}.html`, articlePage(guide, "Guides")));
  references.forEach((reference) => write(`reference/${reference.slug}.html`, articlePage(reference, "Reference")));
  basicPages.forEach((page) => write(page.file, basicPage(page)));
  write("404.html", notFound());
  discoveryFiles();
}

generate();
