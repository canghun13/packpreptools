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

function profile(solves, inputs, decision, mistakes, limits, workflow) {
  return { solves, inputs, decision, mistakes, limits, workflow };
}

const toolContent = {
  "dimensional-weight": profile(
    "Use this calculator before comparing a packed carton with a shipping service’s size-based rating method. It converts external package volume into a comparison weight; it does not measure scale weight or choose the billable weight. That makes it different from Box Volume, which reports capacity, and Length + Girth, which checks a package perimeter.",
    "Measure the closed package at its maximum outside points, including bulging flaps or protrusions. Select the unit system that matches the divisor and enter the divisor from the current service, marketplace, or account rule. Do not combine centimeter dimensions with an inch-pound divisor.",
    "Compare the unrounded DIM result with the packed scale weight using the current rating instructions. A high DIM result points to excess external volume; test a smaller carton or reduced headspace, then remeasure the finished package. When the result sits near a billing threshold, preserve the unrounded value and verify the required rounding sequence.",
    ["Using catalog internal dimensions instead of the closed external package.", "Reusing a divisor from another service, unit system, or old rate sheet.", "Rounding each dimension before the method tells you to do so.", "Treating DIM weight as a live quote or guaranteed billable weight."],
    "The result excludes service-specific minimums, additional handling rules, irregular-package measurement, actual scale weight, and account terms. Only the current official service documentation can define the applicable divisor and rounding method.",
    ["Before: measure the finished carton and confirm the applicable divisor.", "After: compare with scale weight, then use Box Size or Box Utilization to investigate excess volume."]
  ),
  "length-girth": profile(
    "Use Length + Girth when a carrier, marketplace, storage rule, or internal handling standard expresses size as the longest side plus the distance around the other two sides. It answers a perimeter-limit question, not a volume or dimensional-weight question. The calculator sorts the three entered sides so the longest becomes length automatically.",
    "Measure the completed external package, not the empty carton’s nominal size. Record the widest point of flexible, bowed, cylindrical, or irregular packaging and keep all three sides in one unit. If a published rule defines length differently, follow that rule rather than the automatic longest-side convention.",
    "A result far below a stated limit leaves measurement tolerance; a result close to the limit needs a second measurement after final closure and labeling. If the value is too high, identify whether the longest side or the two-side girth drives the total before changing the pack. Reducing either short side affects girth twice.",
    ["Entering internal fit dimensions.", "Assuming the first field must already be the longest side.", "Ignoring bulges, handles, tubes, or protective corners.", "Comparing centimeters with a limit published in inches."],
    "This rectangular calculation does not interpret a specific carrier’s oversize rule, rounding, irregular-shape method, or excluded-package policy. Confirm the definition and threshold in the current official source.",
    ["Before: finish and externally measure the package.", "After: compare the total with the governing limit and use Box Size if a smaller packed profile is needed."]
  ),
  "box-size": profile(
    "Use Box Size to shortlist an internal carton size after the product’s protective system is known. It adds wrap thickness and working clearance on both sides of each product dimension. Unlike Box Volume, it produces three minimum internal dimensions; unlike Multi-item Box Fit, it models one rectangular protected item rather than a grid of units.",
    "Measure the product in its required shipping orientation. Enter actual compressed wrap thickness per side, not the uncompressed material roll specification. Use clearance for insertion tolerance, manufacturing variation, and handling room; do not hide protective thickness inside a vague clearance number.",
    "Round every minimum dimension upward to a stocked carton’s published internal dimensions, then build a physical pack. If only one axis is tight, investigate orientation or a different stock size instead of adding space to every axis. Excessive clearance increases motion, fill demand, external cube, and possibly DIM exposure.",
    ["Using external catalog dimensions to judge internal fit.", "Adding clearance once instead of on both opposite sides.", "Measuring bare product dimensions while forgetting its wrap.", "Selecting the mathematically closest box without a closure and movement test."],
    "The model assumes one rectangular product, uniform wrap, and symmetric clearance. It does not model fragile projections, dividers, compression, diagonal insertion, carton tolerances, or orientation restrictions.",
    ["Before: define the protection method and measure the wrapped product.", "After: test a real carton, then calculate Void Fill and final external shipping dimensions."]
  ),
  "box-volume": profile(
    "Use Box Volume to compare rectangular capacity, storage cube, or the starting space available for a void calculation. It multiplies three dimensions and also reports liters and cubic feet. Volume alone cannot prove fit because two shapes with equal cube may have incompatible side lengths.",
    "Choose internal dimensions for usable packing capacity and external dimensions for storage or transport footprint; label the record so the two are not confused. Measure formed cartons squarely and keep length, width, and height in the selected unit. Do not mix a centimeter side with inch sides.",
    "Use the cubic result to compare candidate cartons or to feed a material-yield discussion. A large capacity relative to the product may indicate avoidable headspace, but a low empty-volume percentage can still fail at corners or during insertion. Retain each side dimension alongside the cube.",
    ["Treating equal volumes as proof that an item fits.", "Mixing internal and external dimensions in one calculation.", "Using nominal carton codes as measured dimensions.", "Converting a rounded cubic value instead of the original dimensions."],
    "The carton is modeled as a perfect rectangular prism. Flaps, board thickness, taper, gussets, inserts, deformation, and usable-space obstructions are outside the calculation.",
    ["Before: decide whether the question is usable capacity or external footprint.", "After: use Box Utilization or Void Fill for occupancy, or Carton Cube for multiple external cartons."]
  ),
  "void-fill": profile(
    "Use Void Fill to estimate the unoccupied rectangular volume after a stated quantity of products is placed in a carton. The fill factor converts that geometric void into an adjustable operational demand. It differs from Packing Paper, which turns void into sheets using a tested sheet yield.",
    "Use internal box dimensions and protected product dimensions in the same unit. Enter the quantity actually sharing the carton and choose a fill factor from a documented packing trial: above 1.0 can cover compression or inaccessible pockets, while below 1.0 should only reflect a validated method.",
    "A high empty share suggests checking a smaller carton, a different orientation, or structural inserts before ordering more loose fill. A low share does not guarantee protection; heavy or fragile items may need blocking, bracing, or suspension. Convert the volume through the material’s measured yield.",
    ["Using external box dimensions.", "Multiplying product quantity but not checking whether the arrangement is physically possible.", "Treating loose-fill volume as structural cushioning performance.", "Keeping an old fill factor after changing paper, equipment, or operator method."],
    "Products are simplified to rectangular blocks and all leftover volume is treated as accessible. The model excludes nesting, irregular pockets, compression recovery, product movement, impact performance, and material density.",
    ["Before: confirm product fit and the protection function.", "After: calibrate the result with Packing Paper or a supplier-specific dispensing trial."]
  ),
  "bubble-wrap": profile(
    "Use Bubble Wrap to estimate sheet or roll area needed to cover a rectangular product for a chosen layer count and overlap. It starts from surface area, so it is different from Void Fill, which estimates empty carton space. The output helps plan cut area, not cushioning performance.",
    "Measure the product at its widest protected outline, choose whole or validated partial layers, and enter overlap for seams and secure closure. If bubble material is wrapped in a particular direction, record the roll width separately so area can be converted into a practical cut length.",
    "Divide the required area by usable roll width, round the cut upward, and test corner coverage. A large overlap percentage may reveal an inefficient cut pattern or narrow roll; a small percentage risks open seams. Compare measured consumption across several operators before setting inventory demand.",
    ["Counting only the two largest faces.", "Forgetting that layer count multiplies the full surface.", "Using nominal roll width when edges are unusable.", "Assuming area proves adequate bubble size or impact protection."],
    "The product is a rectangular prism and wrap thickness does not change later layers’ surface area. Corner bunching, protrusions, seam tape, compression, bubble grade, static sensitivity, and drop performance are excluded.",
    ["Before: select material grade and required coverage through a protection test.", "After: convert area to cut length and add measured process waste in the material budget."]
  ),
  "packing-paper": profile(
    "Use Packing Paper after box and product dimensions are known and a repeatable crumpling method has been trialed. It converts geometric void into whole sheets through a user-entered yield depth. Unlike Void Fill, its primary result is a purchase and work quantity.",
    "Use internal carton dimensions and the protected product outline. Measure the actual sheet size, then establish yield depth by packing several representative orders with the same paper weight, crumpling pattern, and operator instruction. Do not copy a yield from unrelated material.",
    "The calculator divides the remaining volume by one sheet’s estimated filled volume and rounds up because partial requirements still consume a sheet in most operations. Compare predicted and actual sheets over a batch; if operators consistently use more, investigate technique or revise yield rather than concealing the difference.",
    ["Using flat sheet thickness as crumpled yield depth.", "Ignoring void occupied by inserts or dividers.", "Applying one yield to different paper weights and machines.", "Reducing sheet count without rechecking movement and closure."],
    "Paper does not occupy space as a solid rectangular block. The estimate excludes compression recovery, inaccessible voids, blocking performance, tearing, setup waste, and product-specific protection requirements.",
    ["Before: calculate approximate void and approve the paper method.", "After: compare predicted sheets with batch consumption and feed the calibrated rate into inventory planning."]
  ),
  "tape-usage": profile(
    "Use Tape Usage to plan carton-sealing length for either a top-and-bottom center seam or an H-seal pattern. It counts seam geometry and end overhang across a carton batch. It does not select tape construction or determine whether a seal pattern is adequate.",
    "Measure the formed carton length and width along the actual seam paths. Set overhang from the approved closure instruction and count only cartons using this pattern. Choose H-seal only when the operating specification calls for edge seams; reinforcement strips must be calculated separately.",
    "Review tape per carton before multiplying the batch. Convert total length into rolls using usable roll length and add measured start-up, splice, and dispenser loss separately. An unexpectedly high total may come from an H-seal choice, excessive overhang, or mixing carton sizes.",
    ["Counting only the top seam and forgetting the bottom.", "Applying H-seal geometry while selecting center seam.", "Using carton height where seam width is required.", "Dividing by nominal roll length without allowing for unusable remnants."],
    "The model covers straight top and bottom seams only. Tape width, adhesion, carton surface, temperature, tension, reinforcement, rework, and seal-performance testing are outside the length calculation.",
    ["Before: approve tape type, pattern, and overhang.", "After: convert length to whole rolls and include roll loss in Packaging Material Budget."]
  ),
  "poly-mailer-size": profile(
    "Use Poly Mailer Size to estimate usable internal width and length around a flexible or already protected product. Thickness consumes both face dimensions, so flat product length and width alone are insufficient. This tool is not a box-sizing calculation and provides no crush protection assessment.",
    "Measure the packed item in the orientation used for insertion. Enter maximum thickness without compressing the product, usable insertion clearance, and the flap space that must remain above the item. Compare the result with the supplier’s usable dimensions below the adhesive line, not only the nominal cut size.",
    "Round up to a stocked mailer and test insertion, seal engagement, corner stress, and label surface. If the recommendation jumps to a much larger size, consider rotating the item or using a gusseted format. A tight result needs allowance for seams and manufacturing tolerance.",
    ["Using outside nominal mailer dimensions as usable space.", "Ignoring product thickness or rigid corners.", "Counting the adhesive flap as product cavity.", "Compressing a soft item without checking rebound and seal load."],
    "The model assumes a regular flexible enclosure and simple thickness allowance. It excludes gusset geometry, seam width, stiffness, sharp edges, compression limits, closure strength, tamper requirements, and carrier acceptance.",
    ["Before: decide whether the item is suitable for a flexible container.", "After: perform an insertion and seal trial, then compare finished external dimensions."]
  ),
  "packaging-cost": profile(
    "Use Packaging Cost per Order to establish a repeatable unit-cost baseline for one pack method or SKU. It combines material line items, a material waste allowance, and hands-on labor. It differs from Monthly Packaging Spend, which scales a validated per-order cost over a period.",
    "Use current landed or issued material costs on the same unit basis, count only quantities consumed by one order, and separate postage. Measure labor across a representative batch, excluding breaks but including normal handling. Use a loaded hourly rate only if that is the organization’s documented cost basis.",
    "Compare totals only when protection level and service outcome are equivalent. A higher material cost can still lower total cost if pack time or damage falls. Review the material and labor subtotals to identify the driver before changing the method, then rerun after the trial.",
    ["Mixing postage or product cost into the packaging baseline.", "Using the fastest observed pack time instead of a representative pace.", "Adding waste to labor as though it were material.", "Comparing methods that provide different protection or presentation."],
    "The result excludes unentered overhead, equipment, storage, purchasing labor, damage, returns, taxes, and price breaks. Currency is a display choice and performs no exchange-rate conversion.",
    ["Before: define the cost boundary and measure actual material use.", "After: scale the approved unit cost with Monthly Packaging Spend and monitor variance."]
  ),
  "carton-count": profile(
    "Use Carton Count when a unit demand must be translated into whole shipping or storage cartons at a fixed capacity. It answers how many cartons are needed and how full the final carton is. Case Pack works in the opposite direction by totaling units already represented by cases and loose reserve.",
    "Enter the number of saleable or packed units required for the dispatch and the approved units per carton. Keep the unit definition consistent—each, pair, kit, or inner pack—and do not substitute a supplier’s outer-case quantity unless that is the actual packing plan.",
    "The division is rounded upward because any remainder needs another carton. Use the final-carton quantity to plan a partial-carton label, filler, or consolidation decision. A large unused capacity may justify adjusting the dispatch quantity, but do not overfill beyond the approved case pack.",
    ["Mixing individual units with inner packs.", "Rounding down when a remainder exists.", "Assuming every carton may exceed the approved capacity.", "Ignoring a deliberately partial carton already open in inventory."],
    "The calculation assumes identical units and a fixed count capacity. It does not check physical fit, carton weight, orientation, separators, partial-carton policy, or inventory already packed.",
    ["Before: confirm the approved case quantity and unit definition.", "After: check Master Carton Weight and label the partial final carton."]
  ),
  "case-pack": profile(
    "Use Case Pack to translate a known number of sealed cases plus loose reserve into total available units. It supports pick planning, allocation, and reconciliation. It does not calculate how many cartons a new order requires; Carton Count handles that question.",
    "Enter only complete cases in the case field, the standard units inside each case, and physically verified loose units as reserve. If cases with different pack quantities are present, calculate each pack separately rather than averaging them.",
    "Use sealed-case units and reserve units as separate audit lines. The total can be compared with demand, while the reserve shows whether open stock is carrying the short quantity. Investigate a mismatch before releasing the plan instead of changing the case pack to force agreement.",
    ["Counting an open case as sealed and again as reserve.", "Mixing case packs from different suppliers or revisions.", "Treating damaged or quarantined units as available.", "Using weight-based estimates where an exact unit count is required."],
    "The result assumes the entered case count and reserve are accurate and saleable. It does not verify physical carton contents, expiration, lot restrictions, allocation rules, or unit fit.",
    ["Before: identify case-pack version and count usable loose stock.", "After: compare total units with demand and use Carton Count for the outbound plan."]
  ),
  "box-utilization": profile(
    "Use Box Utilization to compare simplified product volume with internal carton volume. It is a quick signal for headspace and material-efficiency review, not a fit optimizer. Multi-item Box Fit checks an orthogonal grid; Void Fill estimates the remaining volume with an operational factor.",
    "Use internal box dimensions and the protected dimensions of one item in the same unit, then enter the quantity intended for that box. If items nest or overlap, use a measured effective block rather than bare catalog dimensions and document the method.",
    "A low percentage can indicate excess cube, but may be intentional for fragile suspension or irregular shapes. A high percentage may reduce fill while leaving no room for insertion, dividers, or tolerances. Review the unused cubic volume together with side-by-side fit and closure.",
    ["Using external carton volume.", "Assuming volume percentage proves an arrangement exists.", "Using bare product dimensions while ignoring wrap.", "Targeting 100% utilization without insertion or protection clearance."],
    "All items are rectangular blocks and total product volume is compared without arrangement logic. The percentage excludes inaccessible pockets, nesting, divider volume, compression, tolerances, and performance requirements.",
    ["Before: verify protected item dimensions and carton internal size.", "After: run Multi-item Box Fit or a physical layout, then estimate Void Fill."]
  ),
  "multi-item-box-fit": profile(
    "Use Multi-item Box Fit to screen whether identical rectangular items can fit in a box using one orthogonal orientation at a time. It checks six rotations and reports the best simple grid. It is intentionally not a mixed-orientation or three-dimensional bin-packing optimizer.",
    "Use internal box dimensions and the finished protected item dimensions. Enter the required quantity separately so the result can state whether the grid capacity meets demand. Exclude any orientation prohibited by the product by testing only an allowed arrangement manually.",
    "Read the best grid as columns along the three box axes. If capacity barely meets demand, allow for manufacturing tolerances, dividers, and loading clearance before approval. If it falls short, compare another box or explicit row-column-layer layout with Master Carton Dimensions.",
    ["Using external box dimensions.", "Assuming mixed rotations or nesting are included.", "Ignoring required upright orientation or fragile faces.", "Treating volumetric fit as proof of a loadable sequence."],
    "The calculation uses identical rectangular blocks in a single orientation. It excludes mixed orientations, nesting, interlocking, deformable products, cushioning, gaps, loading order, weight, stability, and compression.",
    ["Before: define protected item dimensions and allowed orientations.", "After: build the reported grid physically and check weight with Master Carton Weight."]
  ),
  "packaging-material-budget": profile(
    "Use Packaging Material Budget to reserve money for variable packaging demand before purchasing. It scales a chosen material cost per order and adds separate waste and contingency percentages. Monthly Packaging Spend includes fixed monthly cost, while this tool isolates the variable material envelope.",
    "Enter planned orders for the same scope and a material-only cost per order derived from an approved pack method. Set waste from measured scrap or overuse; use contingency for demand or price uncertainty, not as a second hidden waste allowance.",
    "Review base budget, waste, and contingency separately. If allowance dollars dominate, improve the underlying forecast rather than increasing both percentages. Compare the final amount with supplier pack sizes and minimum orders because the cash purchase may exceed calculated consumption.",
    ["Including labor in material cost and again elsewhere.", "Applying waste and contingency without defining their causes.", "Using forecast orders that cover a different period.", "Treating calculated consumption cost as the exact purchase invoice."],
    "The budget excludes supplier pack rounding, freight, taxes, price breaks, currency conversion, fixed equipment, and timing of cash payments unless embedded in the entered unit cost.",
    ["Before: validate cost per order and forecast scope.", "After: translate quantities into supplier packs and compare with Monthly Packaging Spend."]
  ),
  "monthly-packaging-spend": profile(
    "Use Monthly Packaging Spend to forecast the recurring packaging cash requirement from monthly order volume, variable cost per order, and fixed packaging cost. It is a period-level view, not a detailed unit-cost build. Packaging Cost per Order should establish the variable input first.",
    "Use a realistic monthly order forecast for the same SKU mix as the cost baseline. Include recurring fixed packaging costs only once per month and choose a planning horizon for the period total. Do not enter annual costs as monthly values without allocation.",
    "Compare variable and fixed spend to see which responds to volume. Scenario-test a low, expected, and high order month rather than relying on one point. If SKU mix changes, recalculate the weighted cost per order instead of assuming last month’s average remains valid.",
    ["Mixing postage with packaging spend.", "Using revenue orders rather than orders actually requiring the pack method.", "Counting a fixed cost in both per-order and monthly fields.", "Projecting several months without considering seasonality or price changes."],
    "The forecast assumes constant order mix, variable cost, and fixed cost through the chosen horizon. It excludes inventory timing, supplier minimums, tax, freight, payment terms, damage, and currency movements.",
    ["Before: establish a comparable per-order baseline and monthly forecast.", "After: compare actual spend monthly and investigate price, mix, waste, and volume variance."]
  ),
  "label-cost": profile(
    "Use Label Cost to plan both label quantity and consumable cost for an order run. It accounts for multiple labels per order and an adjustable waste rate. Insert Quantity performs a similar count for documents but does not include a unit-cost output.",
    "Count every label intentionally applied to one order, including separate identification or handling labels when applicable. Use the landed consumable cost per label on a consistent roll, sheet, or individual basis. Set waste from misprints, setup, damaged stock, and unusable roll ends.",
    "The quantity is rounded up before cost is calculated because fractional labels cannot be purchased or applied. Review labels per order before adjusting waste: duplicated labels may be a process issue. Convert required labels into whole supplier rolls separately and retain remaining stock.",
    ["Dividing roll price by nominal labels while ignoring unusable labels.", "Forgetting secondary labels used only on some orders.", "Applying waste to order count instead of label quantity.", "Treating printer ribbon, ink, or maintenance as included when not entered."],
    "The result excludes roll pack rounding, printer consumables, equipment, labor, freight, taxes, and label obsolescence. It does not determine label size, placement, content, adhesion, or regulatory suitability.",
    ["Before: map labels by pack method and measure misprint loss.", "After: convert the requirement to rolls and set a supply reorder point."]
  ),
  "insert-quantity": profile(
    "Use Insert Quantity to order cards, leaflets, instructions, or promotional pieces for a defined order run. It multiplies inserts per order and adds spoilage. Unlike Label Cost, it reports count only and does not assign a monetary value.",
    "Enter only eligible orders—exclude channels or products that do not receive the insert. Count multiple language sheets or cards separately when they are not interchangeable. Base spoilage on trimming damage, outdated versions, setup loss, and handling, not an arbitrary buffer.",
    "Use the allowance quantity to explain the difference between order demand and the purchase request. If inserts are versioned, split the calculation by version to avoid creating unusable surplus. Reconcile issued inserts with completed eligible orders after the run.",
    ["Applying one insert to all orders when eligibility differs.", "Combining language or revision variants into one interchangeable total.", "Counting spoilage again in the base order forecast.", "Ignoring inventory already on hand or obsolete stock."],
    "The tool assumes a fixed insert count per eligible order. It excludes supplier pack sizes, version allocation, existing usable inventory, minimum orders, cost, and future obsolescence.",
    ["Before: define eligible orders, insert version, and issue quantity.", "After: subtract usable stock and set a reorder point for recurring inserts."]
  ),
  "packaging-waste-allowance": profile(
    "Use Packaging Waste Allowance to turn a known base material quantity into a planned issue or purchase quantity with a transparent loss rate. It is deliberately a quantity tool; Packaging Material Budget converts cost assumptions into money.",
    "Build the base quantity from expected good-pack consumption before waste. Choose the waste percentage from a comparable period and identify its causes—cuts, misprints, damaged cartons, setup, remnants, or rework. Keep demand contingency separate.",
    "The tool rounds up to a whole unit so the allowance is actionable. Track allowance units against actual scrap and remaining usable material. A rising rate should trigger root-cause work; it should not become a permanent entitlement to overuse.",
    ["Adding waste to a base quantity that already includes waste.", "Using one rate for cartons, tape, labels, and fill despite different loss causes.", "Confusing demand uncertainty with process waste.", "Failing to return usable remnants to inventory."],
    "The percentage is user-defined and assumes proportional loss across the full quantity. It excludes supplier pack rounding, minimum orders, shelf life, price, variability by operator, and unusual rework events.",
    ["Before: calculate good-pack demand and measure comparable losses.", "After: compare planned allowance with actual scrap and update the material budget."]
  ),
  "packaging-supply-reorder-point": profile(
    "Use Packaging Supply Reorder Point to decide when usable stock should trigger replenishment. It combines average daily use during supplier lead time with safety stock and compares the trigger with current stock. It does not calculate an economic order quantity.",
    "Measure daily use in the same unit as inventory, use an observed replenishment lead time from order release to usable receipt, and set safety stock for documented demand and lead-time variability. Current stock should exclude damaged, reserved, or obsolete material.",
    "When on-hand stock is at or below the point, review open purchase orders before releasing another. If it is above the point, the displayed margin is not excess inventory by itself. Recalculate after order mix, supplier performance, pack method, or seasonality changes.",
    ["Using calendar lead days when operations consume only working days without adjusting use.", "Counting quarantined or allocated stock as available.", "Setting safety stock as an unexplained percentage.", "Treating reorder point as the quantity to order."],
    "The simple model uses average demand and a fixed safety-stock amount. It excludes demand distributions, service-level optimization, minimum order quantities, order review cycles, open orders, storage limits, and supplier capacity.",
    ["Before: clean inventory records and measure use and lead time.", "After: determine order quantity from supplier packs, forecast demand, open orders, and storage."]
  ),
  "order-packing-time": profile(
    "Use Order Packing Time to schedule a defined batch of orders from one setup period and a representative per-order time. It estimates elapsed labor minutes for the batch. Labor Capacity per Shift reverses the question by estimating how many orders fit into available labor.",
    "Count orders using a comparable pack method, measure hands-on minutes across normal operators and order variation, and enter setup only once for the batch. Keep long exceptions separate or use a weighted average supported by observed mix.",
    "Use total minutes for release scheduling and average minutes per order for process comparison. If setup is a large share, larger batches may improve efficiency; if run time dominates, focus on motion, material staging, and pack design. Include verification steps in the observed method.",
    ["Using the single fastest cycle as the standard.", "Multiplying setup time by every order.", "Mixing simple and complex orders without recording the mix.", "Excluding normal checks and replenishment from the defined process."],
    "The estimate assumes a stable average pace and one setup event. It excludes breaks, absenteeism, equipment failure, queueing, training, unusual exceptions, and learning effects unless represented in the inputs.",
    ["Before: define the process boundary and time a representative sample.", "After: compare required minutes with shift capacity and investigate the main time element."]
  ),
  "labor-capacity-per-shift": profile(
    "Use Labor Capacity per Shift to translate workers, scheduled hours, productive utilization, and minutes per order into a planning throughput. It is a capacity ceiling under entered assumptions, not a guaranteed dispatch commitment. Order Packing Time estimates the duration of a known order count.",
    "Enter workers actually assigned to the process, paid shift length, and a productive-utilization rate derived from observed non-packing time. Use a representative pack time for the expected order mix. Do not use 100% utilization unless the defined shift truly excludes all nonproductive activity.",
    "Compare planned demand with whole-order capacity and keep the unused productive minutes as a small buffer indicator. If demand is close to capacity, review breaks, replenishment, changeovers, and complexity mix. Adding workers may not scale linearly when space or equipment is constrained.",
    ["Treating paid time as fully productive time.", "Using a time standard from a different SKU mix.", "Assuming twice the workers always doubles output.", "Ignoring shared equipment, staging, or quality-check constraints."],
    "The arithmetic assumes parallel productive minutes combine without interference and average pack time remains stable. It excludes congestion, fatigue, breaks, learning, absenteeism, equipment limits, queueing, and overtime effects.",
    ["Before: observe utilization and pack time for the expected mix.", "After: compare with demand and use Order Packing Time for specific release batches."]
  ),
  "prep-batch-time": profile(
    "Use Prep Batch Time for repeatable unit preparation that has a setup, a seconds-per-unit run, and a separate quality-check allowance. It suits labeling, folding, bagging, or component preparation before final packing. Order Packing Time instead models completed orders in minutes per order.",
    "Define one prepared unit clearly, time several normal run segments in seconds, and separate setup activities that happen once. Enter quality-check time for the whole batch, not per unit, unless the per-unit observation already includes it.",
    "Review setup and run time separately. A short batch with high setup share may benefit from campaign scheduling; a long batch is more sensitive to seconds per unit. Do not remove checks simply to improve the calculated time—change the approved method only after a controlled trial.",
    ["Mixing seconds per unit with minutes.", "Counting setup inside the cycle and again in setup minutes.", "Using finished-order count when several prepared units enter one order.", "Ignoring changeovers between versions or materials."],
    "The tool assumes one setup, constant cycle time, and a single batch-level check allowance. It excludes interruptions, rework, queueing, fatigue, equipment downtime, and variable component availability.",
    ["Before: define unit, batch boundary, setup, and check plan.", "After: feed prepared-unit availability into kitting or order packing schedules."]
  ),
  "kitting-cost": profile(
    "Use Kitting Cost to estimate the cost of assembling a kit from a repeated number of similarly costed components, dedicated packaging, material waste, and assembly labor. It differs from Bundle Packing Cost, which focuses on handling already-valued items into a bundle.",
    "Use an average component cost only when components are genuinely similar; otherwise sum them externally and enter an equivalent per-component average. Include packaging dedicated to the kit, representative assembly minutes, and a material waste rate based on component or packaging loss.",
    "Review material and labor subtotals before pricing or comparing an assembly method. A component-heavy kit is sensitive to scrap and count accuracy; a labor-heavy kit may benefit from staging or fixtures. Build and audit a batch before adopting the estimate.",
    ["Averaging unlike component costs without checking the total.", "Including product margin or selling fees as assembly cost.", "Applying waste to labor.", "Using order-packing minutes instead of kit-assembly minutes."],
    "The estimate assumes one average component cost and fixed components per kit. It excludes component-specific scrap, inventory carrying cost, equipment, supervision, quality failures, rework, and downstream shipping.",
    ["Before: define bill of materials, kit packaging, and assembly boundary.", "After: compare batch time and add final shipment packaging cost separately."]
  ),
  "bundle-packing-cost": profile(
    "Use Bundle Packing Cost to price the incremental work of grouping several finished items into one sellable or shippable bundle. It combines per-item handling, bundle-specific materials, and bundle packing labor. It does not include the underlying product cost unless entered as handling.",
    "Count items in the bundle, establish handling cost per item from the chosen cost method, enter only materials unique to bundling, and time the bundling action separately from final order packing. Use one currency basis throughout.",
    "Review whether item handling, materials, or labor drives the total. If bundle count changes, rerun rather than applying a flat cost. Compare the bundled method with separate-item handling while also checking product protection, identification, and picking accuracy.",
    ["Including the full product cost as handling cost by accident.", "Counting final shipment packaging in both bundle materials and order packaging.", "Using assembly time from a different bundle size.", "Ignoring extra labels, bands, or inserts unique to the bundle."],
    "The model assumes identical handling cost per item and a fixed bundle method. It excludes product cost, final shipping container, picking travel, inventory risk, equipment, errors, returns, and promotional pricing.",
    ["Before: define bundle contents and where the bundling process ends.", "After: add order-level packaging and compare monthly volume impact."]
  ),
  "master-carton-dimensions": profile(
    "Use Master Carton Dimensions to design a minimum internal carton around an explicit columns-by-rows-by-layers arrangement. It includes user-entered gaps between units and outer clearance. Multi-item Box Fit screens an existing box; this tool builds dimensions from a chosen layout.",
    "Measure the finished inner or retail pack in its permitted orientation. Enter whole columns, rows, and layers, a gap for dividers or handling between units, and outer clearance between the layout and carton walls. Keep board thickness outside this internal-dimension calculation.",
    "Review the three calculated dimensions and the units-per-carton result together. Round each dimension up to a manufacturable internal size, then obtain or estimate external dimensions separately. If one axis becomes impractical, test a different row-column-layer arrangement rather than simply compressing clearance.",
    ["Entering bare product dimensions instead of the finished inner pack.", "Applying outer clearance once instead of to both sides.", "Forgetting gaps between multiple rows or layers.", "Treating calculated internal size as the external shipping size."],
    "The layout uses identical rectangular units in one orientation. It excludes mixed orientations, dividers with nonuniform thickness, carton board allowance, bulging, compression strength, stacking, loading sequence, and physical stability.",
    ["Before: approve unit orientation, gaps, and per-carton count.", "After: build a full carton, measure external size, then check weight and cube."]
  ),
  "master-carton-weight": profile(
    "Use Master Carton Weight to check product weight plus carton-and-packing tare against an internal planning maximum supplied by the user. It answers a weight question, not a dimensional capacity question. Master Carton Dimensions should establish the layout and unit count first.",
    "Use the actual units per carton, a representative packed-unit weight in pounds, and tare measured from the carton, dividers, liners, labels, and closure. Set maximum planned weight from the applicable facility, customer, equipment, or service requirement rather than assuming a universal limit.",
    "A result below the maximum reports remaining allowance, but that margin should cover normal product and material variation. A result close to the ceiling needs sample cartons weighed at the high end of tolerance. If the estimate exceeds the maximum, reduce case pack or redesign the pack.",
    ["Using net product weight while forgetting retail or inner packaging.", "Omitting dividers, tape, and labels from tare.", "Treating a carrier limit as a safe manual-handling limit.", "Averaging unit weights when the upper tolerance controls compliance."],
    "The tool adds weights linearly and does not evaluate weight distribution, lifting ergonomics, carton strength, pallet load, scale calibration, regulatory rules, or service-specific limits.",
    ["Before: finalize unit count and measure unit and tare samples.", "After: weigh a completed carton and use the result in pallet load planning."]
  ),
  "carton-cube": profile(
    "Use Carton Cube to calculate the external space occupied by one or more identical cartons in cubic meters and cubic feet. It supports storage, staging, and transport planning. Box Volume can use internal dimensions for capacity; Carton Cube should normally use finished external dimensions.",
    "Measure the closed carton’s maximum external length, width, and height in one unit and enter the number of identical cartons. Split the calculation when carton sizes differ. Include normal bulge or protrusions when they affect occupied space.",
    "Use cube per carton to compare pack designs and total cube to reserve staging or transport volume. The total is geometric and assumes cartons can occupy their full rectangular envelope. A lower cube can improve space use, but only if product protection and pallet pattern remain acceptable.",
    ["Using internal dimensions for external space planning.", "Combining different carton sizes under one average dimension.", "Ignoring bulge, straps, or protruding closures.", "Treating cubic volume as a weight or freight quote."],
    "The result excludes pallet gaps, aisle space, irregular stacking, orientation constraints, unusable vehicle volume, weight limits, and carrier pricing. It does not guarantee that the cartons tessellate in a given space.",
    ["Before: measure finished external cartons by size group.", "After: use Cases per Pallet for a specific footprint and compare total shipment cube."]
  ),
  "cases-per-pallet": profile(
    "Use Cases per Pallet to estimate a whole-case count from one straight-grid orientation per layer and a user-entered number of layers. It compares unrotated and 90-degree rotated footprints. Pallet Layer Count instead starts from required cases and known cases per layer.",
    "Enter the usable pallet footprint, finished case footprint, and a layer count already screened for height and weight. Keep dimensions in one unit and use case length and width in the intended upright orientation. Reduce usable pallet size if edge clearance is required.",
    "Review cases per layer, selected orientation, and total cases. A rotated grid can increase count, but the calculator does not mix orientations within a layer. Before approval, draw the pattern, check edge support and partial top layers, and verify loaded height and gross weight.",
    ["Using nominal pallet or carton dimensions without measuring.", "Allowing unapproved overhang to make a case appear to fit.", "Entering layers before checking height and weight.", "Assuming the best area count creates a stable pattern."],
    "The tool uses a single rectangular grid and excludes mixed orientations, pinwheel patterns, interlocking, gaps, deck-board support, overhang, compression, containment, weight, center of gravity, and handling stability.",
    ["Before: define usable footprint and allowed case orientation.", "After: check Pallet Height, Pallet Utilization, gross weight, and a physical unit load."]
  ),
  "pallet-layer-count": profile(
    "Use Pallet Layer Count when a shipment case quantity and an approved cases-per-layer pattern are already known. It calculates whole layers and the cases on the final partial layer while enforcing a user-entered maximum layer count. It does not design the footprint pattern.",
    "Enter the exact case quantity for the load, cases per full layer from a verified pattern, and the maximum layers allowed by height, weight, compression, or operating policy. Do not increase cases per layer merely to force the load under the maximum.",
    "A partial top layer may require a different stabilization or split-load decision. If required layers exceed the maximum, divide the shipment across additional pallets or revise the approved pattern. Use layer capacity to see unused case positions, not as permission to add unrelated cases.",
    ["Using planned production units instead of packed cases.", "Counting a partial top layer as a full case count.", "Setting maximum layers without checking total height.", "Assuming every partial pattern has the same stability as a full layer."],
    "The calculation assumes constant cases per full layer and does not assess partial-layer geometry, stacking strength, gross weight, containment, center of gravity, overhang, equipment, or regulatory constraints.",
    ["Before: approve a cases-per-layer pattern and operating maximum.", "After: calculate Pallet Height and design the partial top layer physically."]
  ),
  "pallet-height": profile(
    "Use Pallet Height to add empty pallet height, repeated case layers, and top allowance, then compare the load with a user-entered maximum. It isolates vertical clearance. Cases per Pallet and Pallet Utilization answer count and footprint questions instead.",
    "Measure the pallet at the highest deck point, the finished case height under expected compression, and any top cap, corner board, or protective allowance. Set maximum height from the actual rack, doorway, vehicle, customer, or operating requirement; there is no universal default.",
    "Use remaining height as tolerance, not automatically as room for another layer. Compare one additional case height with the margin and also check weight and compression. A result close to the maximum should be verified on a fully built, wrapped load.",
    ["Using case internal height.", "Forgetting pallet base or top protection.", "Assuming nominal case height remains unchanged under stacking.", "Checking height while ignoring gross weight and equipment clearance."],
    "The model adds vertical dimensions only. It excludes compression deformation, uneven layers, leaning, wrap, overhang, rack deflection, vehicle dynamics, gross weight, stability, and regulatory or customer rules.",
    ["Before: confirm layer count and all vertical allowances.", "After: measure the restrained load and verify route, rack, equipment, and weight clearance."]
  ),
  "pallet-utilization": profile(
    "Use Pallet Utilization to compare the summed case footprint area in one layer with the pallet footprint. It is an area-efficiency indicator, not a pattern solver. Cases per Pallet determines a simple grid count; utilization shows how much nominal area that entered count represents.",
    "Use the usable pallet length and width, finished case footprint, and the verified cases per layer. Keep all dimensions in one unit. If the pattern requires gaps, corner clearance, or no-load zones, reduce the usable footprint or evaluate the drawing separately.",
    "A low percentage may indicate a poor footprint match, but can be necessary for edge clearance or stability. A high percentage near 100% still does not prove the cases fit without overlap because area ignores arrangement. Compare the percentage with an actual layer diagram.",
    ["Treating 100% area as proof of a valid layout.", "Ignoring pallet edge clearance or deck support.", "Using case internal dimensions.", "Comparing utilization across pallets without the same overhang and stability rules."],
    "The calculation compares areas only and excludes placement geometry, mixed rotations, gaps, overhang, deck-board support, partial cases, containment, weight distribution, compression, and handling stability.",
    ["Before: verify case and usable pallet footprints.", "After: compare with the Cases per Pallet grid and validate a physical layer pattern."]
  )
};

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

const guideDepth = {
  "how-to-measure-a-box": {
    prepare: ["State whether the result will support product fit, storage, DIM weight, or a published size limit.", "Form and close the package with production materials before taking external measurements.", "Use a rigid rule or tape kept square to each face and record the maximum point.", "Record unit, internal or external status, package state, date, and measurer."],
    scenario: "A seller receives a carton listed as 12 × 10 × 8 in. The product fits because those are supplier internal dimensions, but the closed carton measures 12.4 × 10.3 × 8.2 in after filling and taping. Fit calculations should retain the internal set; DIM and length-plus-girth checks should use the finished external set. The measurement record prevents the team from silently substituting one set for the other.",
    decisions: [["Product fit", "Measure usable internal faces and account for dividers, liners, and closure intrusion."],["Shipping size", "Measure the finished external package at maximum points after normal closure."],["Flexible package", "Measure natural packed thickness and the widest bulge without artificial compression."],["Near a threshold", "Repeat the measurement and follow the current rule for dimensional rounding."]],
    mistakes: ["Reading a printed carton code as a measured dimension.", "Measuring an empty flat or unclosed package.", "Tilting the tape across a face and recording a diagonal.", "Dropping decimals before the applicable method permits rounding."],
    closeout: ["Both internal and external sets are labeled.", "The unit is written beside every dimension.", "Maximum bulge and protrusions are included.", "A second measurement confirms threshold-sensitive values."],
    relatedGuide: "/guides/how-much-packaging-clearance.html", reference: "/reference/internal-vs-external-box-dimensions.html"
  },
  "dimensional-weight-explained": {
    prepare: ["Obtain finished external dimensions, not the carton’s internal specification.", "Weigh the completed package separately so dimensional and actual weight can be compared.", "Identify the unit-specific divisor and rounding sequence from the current official method.", "Retain unrounded dimensions and the intermediate cubic volume for audit."],
    scenario: "A light household item ships in a 16 × 12 × 10 in carton. At an example divisor of 139, its 1,920 in³ produces about 13.81 lb of dimensional weight. If the packed scale weight is 6.2 lb, volume may drive the applicable rating method. The operational response is not to edit the divisor; it is to test a smaller protective pack, remeasure it, and compare again under the same current rule.",
    decisions: [["DIM exceeds scale weight", "Investigate avoidable external volume while preserving protection."],["Scale weight exceeds DIM", "Focus on product and material weight; a smaller box may still help handling."],["Values are close", "Check measurement and rounding instructions before quoting or comparing."],["Divisor is uncertain", "Stop the rating comparison and retrieve the current official value."]],
    mistakes: ["Mixing centimeters with an inch-pound divisor.", "Assuming one carrier or service value applies everywhere.", "Using internal carton dimensions because they appear in a catalog.", "Calling dimensional weight a shipping price instead of a comparison weight."],
    closeout: ["External packed dimensions are verified.", "Divisor source and review date are recorded.", "Scale weight is captured on a suitable scale.", "Any redesigned package is physically retested."],
    relatedGuide: "/guides/how-to-measure-a-box.html", reference: "/reference/dimensional-weight-divisors.html"
  },
  "how-much-packaging-clearance": {
    prepare: ["Classify the product’s fragility, mass, surface sensitivity, sharp points, and required orientation.", "Measure the product after its intended wrap or inner packaging is applied.", "Separate protective-material thickness from insertion and tolerance clearance.", "Identify carton dimensional tolerances and any divider or insert thickness."],
    scenario: "A ceramic item measures 8 × 5 × 4 in bare and receives 0.5 in of tested wrap on every side. The operation also needs 0.25 in per side for insertion and normal variation. The Box Size calculation therefore adds 1.5 in to every bare dimension, producing an internal shortlist of 9.5 × 6.5 × 5.5 in. A stock 10 × 7 × 6 in carton is then trial-packed and checked for movement and closure.",
    decisions: [["Insertion is difficult", "Check compressed wrap thickness, carton tolerance, and whether clearance is symmetric."],["Product moves after closure", "Reduce excess space or introduce approved blocking rather than simply adding loose fill."],["Flaps bow outward", "Reassess packed height and protection thickness before measuring shipping size."],["Corners remain exposed", "Change the protection system; extra empty clearance alone is not protection."]],
    mistakes: ["Using one universal clearance for every product risk.", "Counting wrap thickness only once across a dimension.", "Choosing a carton by external dimensions.", "Approving fit without shaking, closure, and handling checks."],
    closeout: ["Protected product dimensions are recorded.", "Clearance and wrap allowances remain separate.", "The production carton closes normally.", "Final external dimensions are remeasured."],
    relatedGuide: "/guides/how-to-choose-void-fill.html", reference: "/reference/internal-vs-external-box-dimensions.html"
  },
  "reduce-packaging-cost": {
    prepare: ["Choose a SKU and pack method with stable volume rather than mixing unrelated orders.", "Count material quantities and landed unit costs on a per-order basis.", "Time representative work and define the labor-rate boundary.", "Record damage, rework, finished dimensions, and customer requirements before changing anything."],
    scenario: "A seller’s current pack uses a $1.10 carton, $0.40 fill, $0.12 tape and label supplies, plus five minutes at $18 per hour. A smaller carton adds $0.10 to the container price but cuts fill by $0.22 and reduces packing time by one minute. The comparison should include the new finished dimensions and protection test; the cheaper-looking fill reduction is rejected if damage or closure performance worsens.",
    decisions: [["Material dominates", "Review size range, actual consumption, purchasing packs, and avoidable waste."],["Labor dominates", "Study staging, decisions, reach, changeovers, and rework before removing checks."],["DIM exposure changes", "Remeasure the finished pack and separate packaging cost from shipping cost."],["Damage rises", "Stop the release and restore or redesign protection before counting savings."]],
    mistakes: ["Comparing different protection levels.", "Excluding labor because it is already paid.", "Using catalog consumption instead of actual issue quantities.", "Declaring savings before observing a representative post-change batch."],
    closeout: ["Baseline and trial share the same scope.", "Material, labor, waste, and outcomes are retained.", "Pack instruction and inventory settings are updated.", "Post-release damage and rework are monitored."],
    relatedGuide: "/guides/packaging-cost-reduction-checklist.html", reference: "/reference/packaging-cost-components.html"
  },
  "box-vs-poly-mailer": {
    prepare: ["Classify crush, puncture, moisture, privacy, tamper, and presentation needs.", "Measure the product in its protected shipping condition.", "Identify whether the item can bend or tolerate pressure in sorting and delivery.", "List available box and mailer usable dimensions, closure areas, and storage packs."],
    scenario: "A folded textile can tolerate compression and has no sharp hardware. The protected item measures 11 × 8 × 2 in, so a mailer trial may reduce cube and assembly time. A boxed cosmetic set of similar face dimensions has crush-sensitive corners and presentation surfaces; its volume alone does not justify a mailer. The team records why each SKU is assigned a container rather than treating weight as the only decision.",
    decisions: [["Crush-sensitive or rigid", "Start with a structured box and design movement control."],["Flexible and non-fragile", "Trial a mailer using published usable space and seal depth."],["Sharp or protruding", "Add suitable protection or reject the mailer option."],["Return-ready requirement", "Check opening, reseal, and presentation needs before selecting format."]],
    mistakes: ["Choosing the lowest unit price without pack-time and damage data.", "Comparing nominal mailer size with box internal size.", "Assuming soft goods cannot be punctured.", "Ignoring label surface and adhesive contamination."],
    closeout: ["Container choice is tied to product risk.", "Insertion and closure trials pass.", "Finished dimensions are recorded.", "Exceptions and approved alternates are documented."],
    relatedGuide: "/guides/how-much-packaging-clearance.html", reference: "/reference/common-packaging-materials.html"
  },
  "how-to-choose-void-fill": {
    prepare: ["Define whether the material must block movement, wrap surfaces, brace weight, or only occupy headspace.", "Calculate approximate void using internal box and protected-product dimensions.", "Collect supplier instructions and create a small calibration batch.", "Record material quantity, dispensing setting, pack time, movement, and closure result."],
    scenario: "A 14 × 10 × 8 in carton around a protected 10 × 6 × 4 in item has substantial geometric void. Paper may be suitable when folded and crumpled to block movement; air pillows may fill upper space quickly but may not brace a dense item. The choice is made from the protection job, measured yield, storage, and handling outcome—not from liters of void alone.",
    decisions: [["Heavy product shifts", "Use designed blocking or bracing; loose fill volume is not enough."],["Large upper void", "Evaluate lightweight fill while confirming compression recovery and closure."],["Surface is sensitive", "Separate wrapping protection from space filling."],["Yield varies widely", "Standardize method and recalibrate before setting inventory demand."]],
    mistakes: ["Calling every cushioning material interchangeable void fill.", "Using supplier yield as guaranteed production yield.", "Filling space while leaving the product free to move.", "Changing material without updating quantity and work instructions."],
    closeout: ["Protection function is named.", "Actual yield is documented.", "Movement and closure checks pass.", "Inventory rate matches the approved method."],
    relatedGuide: "/guides/packaging-inventory-basics.html", reference: "/reference/void-fill-yield-factors.html"
  },
  "packing-station-workflow": {
    prepare: ["Map the present sequence from order release through dispatch handoff.", "Separate standard orders, exceptions, and replenishment work.", "Count walking, searching, touches, decisions, checks, and rework.", "Define the SKU mix and observation period before timing."],
    scenario: "A two-person operation packs 120 mixed orders each afternoon. Observation shows cartons stored behind the label printer, tape changes during the run, and exception orders interrupting standard work. The revised flow stages the approved carton set, replenishes tape before release, sends exceptions to a separate queue, and keeps SKU and closure checks in the standard sequence. Capacity is recalculated from the observed post-change pace.",
    decisions: [["Searching dominates", "Change storage location, labeling, and replenishment ownership."],["Decisions dominate", "Create approved pack rules and a clear exception route."],["Queues form at one device", "Treat equipment as the constraint before adding labor."],["Defects rise with speed", "Restore control points and investigate method clarity or workload."]],
    mistakes: ["Drawing an ideal flow without observing actual work.", "Removing quality checks as nonproductive time.", "Timing only easy orders.", "Adding inventory around the station until movement is restricted."],
    closeout: ["Standard and exception routes are visible.", "Materials have owners and reorder signals.", "Time and quality are measured together.", "The instruction is reviewed after layout or SKU changes."],
    relatedGuide: "/guides/packaging-cost-reduction-checklist.html", reference: "/reference/packaging-cost-components.html"
  },
  "packaging-inventory-basics": {
    prepare: ["Create one stock record for each usable size, material, and revision.", "Map which pack methods consume each item and in what quantity.", "Measure daily use, supplier lead time, pack quantity, minimum order, and usable on-hand stock.", "Separate damaged, obsolete, reserved, and quarantined material."],
    scenario: "A seller uses 80 mailers per working day. Replenishment has recently taken 8 to 12 days, and 300 mailers are held as safety stock. Using a 10-day planning lead produces a 1,100-unit reorder point, but the purchase quantity still depends on open orders, supplier case packs, storage space, and the next month’s forecast. A cycle count finds 120 damaged mailers that must not remain available.",
    decisions: [["Stock reaches reorder point", "Review open orders and release replenishment under the purchasing rule."],["Usage rises after promotion", "Update forecast and safety assumptions instead of waiting for a stockout."],["Lead time becomes variable", "Record actual receipt history and review the safety-stock basis."],["Obsolete stock grows", "Strengthen revision control and avoid treating it as available coverage."]],
    mistakes: ["Using purchase history as consumption without adjusting inventory change.", "Counting supplier packs and individual units interchangeably.", "Ignoring open purchase orders.", "Setting safety stock once and never reviewing it."],
    closeout: ["Usable on-hand quantity is credible.", "Unit, lead time, and demand period match.", "Reorder point and order quantity are distinguished.", "Critical items have a cycle-count schedule."],
    relatedGuide: "/guides/packing-station-workflow.html", reference: "/reference/packaging-cost-components.html"
  },
  "tape-types-and-seal-patterns": {
    prepare: ["Identify carton surface, board condition, packed weight, storage temperature, and handling environment.", "Obtain the tape supplier’s application and conditioning instructions.", "Select the closure pattern and define overhang on the finished carton.", "Inspect dispenser condition, wipe-down pressure, and cut consistency."],
    scenario: "A team changes from a center seam to an H-seal for a carton that needs edge-seam coverage. On a 14 × 10 in carton with 2 in overhang, the additional four cross seams materially increase tape per carton. The Tape Usage Calculator quantifies length, while a conditioned closure trial determines whether the selected tape actually bonds to the recycled corrugated surface.",
    decisions: [["Edges lift after storage", "Review surface, temperature, pressure, tape choice, and application—not only length."],["Tape use rises", "Check pattern selection, overhang, rework, and dispenser cuts."],["Carton opens under load", "Escalate the closure specification and structural pack review."],["Labels cross seams", "Reposition labels so required closure and identification remain effective."]],
    mistakes: ["Selecting tape by color or price alone.", "Confusing tape width with length requirement.", "Counting top closure but not bottom.", "Approving adhesion immediately without relevant conditioning."],
    closeout: ["Tape product and width are recorded.", "Pattern and overhang are visible in the instruction.", "Top and bottom closures pass inspection.", "Batch usage is compared with calculated demand."],
    relatedGuide: "/guides/packing-station-workflow.html", reference: "/reference/box-style-and-closure-glossary.html"
  },
  "packaging-cost-reduction-checklist": {
    prepare: ["Select a stable product and define the current pack method.", "Collect material issue quantities, prices, labor observations, waste, rework, damage, and finished dimensions.", "Choose one change and a comparison sample.", "Set acceptance criteria for protection, appearance, throughput, and cost."],
    scenario: "A shop suspects tape and paper are overused. The audit finds that carton size variation, not operator carelessness, creates most extra paper, while inconsistent dispenser cuts create tape loss. The trial standardizes two cartons and a cut length, then compares 100 orders before and after. Savings are released only after damage, closure, dimensions, and labor remain acceptable.",
    decisions: [["Many carton sizes", "Measure usage and decision time before reducing the approved range."],["High waste allowance", "Separate trim, damage, setup, and overuse so the cause is actionable."],["Lower material cost raises labor", "Compare total cost per order, not one component."],["Shipping dimensions grow", "Keep packaging and transport consequences visible as separate measures."]],
    mistakes: ["Starting with supplier price instead of total operating cost.", "Changing several variables in one uncontrolled trial.", "Ignoring transition waste and retraining.", "Annualizing a saving from an unrepresentative sample."],
    closeout: ["Baseline and trial data are retained.", "Protection and service outcomes pass.", "Instructions and inventory are updated.", "Savings are checked again after normal operations resume."],
    relatedGuide: "/guides/reduce-packaging-cost.html", reference: "/reference/packaging-cost-components.html"
  },
  "master-carton-planning": {
    prepare: ["Measure the finished inner pack and record allowed orientation.", "Choose proposed columns, rows, layers, gaps, dividers, and outer clearance.", "Measure unit weight and all carton-and-packing tare.", "Identify handling, customer, storage, pallet, height, and weight constraints."],
    scenario: "Twelve retail packs measuring 8 × 5 × 3 in are arranged three columns by two rows by two layers. With 0.25 in internal gaps and 0.5 in clearance at outer walls, the minimum internal estimate is 25.5 × 11.25 × 7.25 in. The plan is not released from arithmetic alone: a prototype carton is packed, external dimensions and 24 lb gross weight are measured, and the pallet pattern is reviewed.",
    decisions: [["One dimension is impractical", "Compare another row-column-layer arrangement without violating orientation."],["Weight exceeds the planning maximum", "Reduce case pack or redesign materials; do not force the carton."],["Units move", "Design separators or blocking and recalculate their space and tare."],["Carton bulges", "Revise internal fit and board/closure design before using external cube."]],
    mistakes: ["Using bare product rather than finished inner-pack dimensions.", "Calling calculated internal size an external shipping dimension.", "Checking count but not gross weight.", "Selecting board and stacking strength from dimensions alone."],
    closeout: ["Layout and unit orientation are documented.", "Prototype fit and closure pass.", "External dimensions and gross weight are measured.", "Pallet and handling reviews are complete."],
    relatedGuide: "/guides/pallet-planning-basics.html", reference: "/reference/master-carton-terms.html"
  },
  "pallet-planning-basics": {
    prepare: ["Measure the usable pallet footprint and empty pallet height.", "Measure finished case footprint, height, gross weight, and orientation restrictions.", "Collect user-approved maximum height, weight, edge, rack, doorway, vehicle, and equipment constraints.", "Define containment and partial-layer rules before selecting a count."],
    scenario: "A 48 × 40 in pallet is screened with 16 × 12 × 10 in cases. A single-orientation grid fits nine cases per layer; six layers plus a 6 in pallet and 2 in top allowance reach 68 in. The calculation still does not approve the load. The operation checks gross weight, deck support, column alignment, partial-layer handling, wrap, fork access, and the actual movement route.",
    decisions: [["Area utilization is high but count fails", "Draw the geometry; area alone cannot prove placement."],["Top layer is partial", "Design its pattern and containment rather than scattering cases."],["Height margin is small", "Build and measure a restrained load at production tolerances."],["Load leans or cases crush", "Stop and review structure, pattern, weight distribution, and containment."]],
    mistakes: ["Assuming a common pallet size without measuring the actual platform.", "Allowing unapproved overhang.", "Checking height but not weight.", "Calling a calculated footprint a stable unit load."],
    closeout: ["Pattern drawing matches the counted layer.", "Height and gross weight are verified.", "Containment and handling route pass.", "A qualified physical load review is recorded."],
    relatedGuide: "/guides/master-carton-planning.html", reference: "/reference/pallet-and-unit-load-terms.html"
  }
};

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

const referenceDepth = {
  "package-measurement-terms": {
    overview: "Package measurements serve different decisions. Internal dimensions describe usable fit space; external dimensions describe the finished envelope presented to storage, handling, and shipping systems. Length, width, and height may be ordered by a published method rather than by the carton supplier’s naming convention, so the record must state both the surface measured and the rule used.",
    example: "A carton listed internally as 12 × 10 × 8 in may close at 12.4 × 10.3 × 8.2 in after board, product, and tape are present. Use the first set for a basic fit study and the second set for external cube, DIM weight, and length-plus-girth work. Preserve decimals until the applicable method instructs otherwise.",
    differences: [["Internal vs external", "Internal values support fit; external values support occupied-space and shipping checks."],["Girth vs volume", "Girth is a perimeter around two sides; volume multiplies three sides."],["Actual vs dimensional weight", "Actual weight comes from a scale; DIM weight converts volume through a divisor."],["Clearance vs void", "Clearance is planned room around an item; void is the remaining unoccupied space."]],
    use: ["Name the decision before measuring.", "Choose the correct package state and surfaces.", "Record unit and unrounded values.", "Link the measurement set to the calculation or pack instruction."],
    cautions: ["Supplier terminology can differ.", "Flexible packages require maximum finished points.", "Nominal size is not a substitute for measurement.", "Published carrier definitions must be checked in their current source."]
  },
  "common-packaging-materials": {
    overview: "Packaging materials perform different functions: containment, structural protection, surface protection, blocking, void occupation, closure, and identification. A material should be selected for the function demonstrated in the pack design rather than because it is familiar or inexpensive. Substitutions can change dimensions, labor, recovery, storage, and damage performance.",
    example: "A corrugated box can provide a stacking shell while paper blocks a wrapped product from moving. Replacing the paper with lightweight pillows may occupy similar volume but provide different resistance to a dense item. The substitution therefore requires a movement and handling trial, not only a comparison of liters or unit price.",
    differences: [["Box vs mailer", "A box supplies structure; a flexible mailer mainly contains and covers suitable goods."],["Wrap vs void fill", "Wrap protects a surface or object; void fill occupies space and may block movement."],["Blocking vs cushioning", "Blocking restrains position; cushioning manages shock through a tested system."],["Closure vs identification", "Tape or adhesive closes the pack; labels communicate and route information."]],
    use: ["Define product hazards and required functions.", "Shortlist materials with supplier specifications.", "Build representative packs with production equipment.", "Record quantities, method, conditions, and inspection results."],
    cautions: ["Material names do not guarantee performance.", "Recycled content and surfaces can affect adhesion.", "Yield changes with operator and equipment.", "Protection claims require appropriate testing."]
  },
  "dimensional-weight-divisors": {
    overview: "A dimensional-weight divisor converts cubic package volume into a comparison weight. It is unit-specific and can vary by carrier, service, route, marketplace, account, and date. Values such as 139, 166, or 5000 are useful only as identified examples; none should be presented as a permanent universal rule.",
    example: "A 12 × 10 × 8 in package contains 960 in³. With an example divisor of 139, the unrounded result is about 6.906 lb; with 166, it is about 5.783 lb. The change comes from the selected method, not from the physical package. The current official method must also determine dimensional rounding and comparison with scale weight.",
    differences: [["Inch-pound divisor", "Cubic inches are divided by an in³-per-pound value to produce pounds."],["Metric divisor", "Cubic centimeters are divided by a cm³-per-kilogram value to produce kilograms."],["Divisor vs conversion", "A divisor is a rating factor, not a general inch-to-centimeter conversion."],["DIM vs billable weight", "DIM is one calculated value; the applicable rule decides how it interacts with actual weight."]],
    use: ["Measure the finished external package.", "Retrieve the current method from an official service or account source.", "Match dimensions and divisor units.", "Retain volume, unrounded DIM result, rounding, and review date."],
    cautions: ["Do not infer a divisor from another carrier.", "Do not mix unit systems.", "Do not assume old blog examples remain current.", "This reference does not quote a shipment or determine a tariff."]
  },
  "internal-vs-external-box-dimensions": {
    overview: "Internal and external carton dimensions are both valid, but they answer different questions. Internal dimensions describe the usable cavity between carton walls and closure features. External dimensions describe the finished outside envelope after forming, filling, and closing. Board construction, tolerances, contents, and bulging create the difference.",
    example: "A product and cushioning system needs at least 11.5 × 7.5 × 5.5 in internally. A supplier’s 12 × 8 × 6 in internal carton may fit, but its finished external size will be larger and must be measured before DIM or storage planning. Substituting external dimensions into the fit check overstates usable space.",
    differences: [["Fit work", "Use internal dimensions for product, dividers, wrap, and insertion clearance."],["Shipping work", "Use finished external dimensions for DIM, girth, and occupied space."],["Nominal carton size", "The catalog convention must be identified; it may not be the measurement set needed."],["Manufacturing tolerance", "Published values and physical cartons can vary, so threshold-sensitive work needs samples."]],
    use: ["State whether the decision is fit or occupied space.", "Obtain the supplier’s dimension convention.", "Measure a formed production sample.", "Retain both sets when the carton enters multiple calculations."],
    cautions: ["Do not subtract a guessed board thickness.", "Do not measure an unclosed carton for shipping size.", "Account for liners and inserts inside.", "Recheck after material or closure changes."]
  },
  "packaging-unit-conversion": {
    overview: "Unit conversion keeps dimensions, areas, volumes, and weights comparable across supplier records and calculators. Linear conversion factors must be squared for area and cubed for volume. Conversion should happen before the main calculation, with unrounded values retained until the displayed result.",
    example: "A 12 × 10 × 8 in carton converts to 30.48 × 25.4 × 20.32 cm. Multiplying the converted dimensions produces about 15,732 cm³, matching 960 in³ × 16.387064. Multiplying 960 only by 2.54 would be incorrect because volume requires the cubic conversion factor.",
    differences: [["Length", "Multiply inches by 2.54 to obtain centimeters."],["Area", "Multiply square inches by 6.4516 because the length factor is squared."],["Volume", "Multiply cubic inches by 16.387064 because the factor is cubed."],["Weight", "Multiply pounds by 0.45359237 to obtain kilograms."]],
    use: ["Identify the source and target unit.", "Convert every related input at full precision.", "Run the calculation in one unit system.", "Round only the final operational display."],
    cautions: ["A converted dimension does not convert a DIM divisor.", "Mixed units can produce plausible but wrong values.", "Currency symbols are not exchange-rate conversion.", "Supplier nominal units may already be rounded."]
  },
  "packaging-cost-components": {
    overview: "A packaging cost record needs a declared boundary. Direct materials, process waste, and hands-on labor are usually visible per order; equipment, storage, supervision, freight, and damage may be allocated separately. Comparisons are only meaningful when the same components and outcome are included on both sides.",
    example: "Materials of $1.42 per order become $1.49 after a 5% material allowance. Four minutes at $18 per hour adds $1.20, producing about $2.69 before any unentered overhead. If equipment depreciation is included for one method but omitted for another, the comparison is not controlled.",
    differences: [["Unit cost", "Cost consumed by one order or pack under a defined method."],["Budget", "Planned money for a forecast volume and allowance."],["Spend", "Actual or forecast cost accumulated over a period."],["Postage", "Transport charge that should remain separate unless the stated boundary includes it."]],
    use: ["Define scope and currency basis.", "Measure actual material quantities.", "Time representative labor and document rate basis.", "Review variance by price, usage, labor, waste, and order mix."],
    cautions: ["Do not hide product cost in packaging.", "Do not apply material waste to labor.", "Price breaks and freight change landed cost.", "Damage and returns can reverse apparent savings."]
  },
  "box-style-and-closure-glossary": {
    overview: "Box style describes how a corrugated blank forms flaps, panels, and joints; closure describes how the formed pack is secured. Similar supplier names can represent different drawings or dimensions. The drawing, board specification, usable cavity, and approved closure must travel together in the pack specification.",
    example: "A regular slotted carton with meeting major flaps can use a center-seam tape length based on carton length and overhang. An H-seal adds the two edge seams on top and bottom. A die-cut mailer may close through tabs and adhesive areas whose geometry cannot be represented by the same seam formula.",
    differences: [["Major vs minor flaps", "Major flaps span the larger opening dimension; minor flaps close first in many styles."],["Manufacturer joint", "This forms the carton body and is not the same as the packer-applied top closure."],["Center seam", "Tape follows the meeting line of major flaps."],["H-seal", "Tape covers the center and two edge seams on both top and bottom."]],
    use: ["Confirm style from a drawing or sample.", "Record internal and external dimension convention.", "Specify closure material, width, pattern, and overhang.", "Condition and inspect a production pack."],
    cautions: ["Names vary among suppliers.", "Tape length does not prove adhesion.", "Board grade and compression require separate review.", "Modified styles need their own measured closure path."]
  },
  "void-fill-yield-factors": {
    overview: "A yield factor links geometric empty space to an operational material quantity. It depends on material, paper weight or pillow size, equipment setting, crumpling method, compression, product geometry, and operator technique. A supplier figure can begin a trial but should not be treated as guaranteed production consumption.",
    example: "An 880 in³ geometric void may not consume exactly 880 in³ of dispensed material. Paper packed firmly into narrow pockets can require a factor above 1.0, while structural inserts may remove part of the accessible void. A calibration batch records predicted void, actual sheets or dispense length, movement result, and revised factor.",
    differences: [["Geometric void", "Simplified box volume minus simplified product volume."],["Fill factor", "User-set multiplier that adjusts geometric void for the operating method."],["Sheet yield", "Measured filled volume attributed to one paper sheet."],["Waste allowance", "Extra quantity for setup, damage, remnants, and normal loss; it is separate from filled-volume yield."]],
    use: ["Define the material’s protection function.", "Pack a representative calibration batch.", "Measure actual issue quantity and outcome.", "Update calculator input and inventory rate after changes."],
    cautions: ["Yield is not cushioning performance.", "Irregular inaccessible pockets distort geometry.", "Compression and recovery matter over time.", "Material or equipment changes require recalibration."]
  },
  "master-carton-terms": {
    overview: "Master-carton planning connects a finished inner pack with case quantity, row-column-layer arrangement, internal carton size, tare, gross weight, and external cube. These terms should remain distinct because changing one can affect fit, handling, pallet count, and storage even when the saleable unit is unchanged.",
    example: "Twelve 8 × 5 × 3 in inner packs arranged 3 × 2 × 2 require layout space plus specified gaps and outer clearance. The resulting internal dimensions are not the external carton dimensions. Gross weight adds twelve packed-unit weights to carton, divider, label, and closure tare.",
    differences: [["Case pack", "Standard saleable units assigned to one sealed carton."],["Layout", "Columns, rows, and layers describing the intended physical arrangement."],["Tare", "All carton and packing weight without product."],["Cube", "Finished external length × width × height used for occupied-space planning."]],
    use: ["Measure the finished inner pack.", "Choose and record an allowed layout.", "Calculate internal size and prototype the carton.", "Measure external dimensions and gross weight before pallet planning."],
    cautions: ["Dimensions do not select board strength.", "Weight margin must cover variation.", "Mixed orientations need explicit design.", "A prototype is required before release."]
  },
  "pallet-and-unit-load-terms": {
    overview: "A pallet pattern describes case placement on a supporting platform; a unit load is the complete restrained assembly moved through storage and transport. Footprint utilization, case count, layer count, height, weight, containment, and stability are related but not interchangeable measures.",
    example: "Ten 16 × 12 in case footprints equal the 1,920 in² area of a 48 × 40 in pallet, producing 100% area utilization. That arithmetic does not prove ten rectangles can be arranged without overlap in the permitted orientation. A pattern drawing and physical load must confirm placement, support, and containment.",
    differences: [["Cases per layer", "Whole case positions in one approved pattern."],["Layer count", "Vertical tiers, including a partial top layer when present."],["Footprint utilization", "Case area divided by pallet area; it is not a stability score."],["Containment", "Wrap, straps, caps, or other systems intended to keep the assembled load together."]],
    use: ["Measure usable pallet and finished case dimensions.", "Draw and count the layer pattern.", "Check height, gross weight, and partial layers.", "Build and evaluate the restrained load through its handling route."],
    cautions: ["Avoid unapproved overhang.", "Area does not prove geometry.", "Compression and center of gravity are outside simple calculators.", "Facility, equipment, customer, and regulatory limits must be confirmed."]
  }
};

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
  <link rel="icon" type="image/png" href="/favicon.png?v=20260726-content">
  <link rel="stylesheet" href="/assets/styles.css?v=20260726-content">
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
<script src="/assets/site.js?v=20260726-content" defer></script>
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

function fieldAdvice(tool, field) {
  const [id, label, , type] = field;
  const guidance = {
    length: `Measure ${label.toLowerCase()} on the finished item or container surface named here; keep it in the selected unit and include normal production variation.`,
    count: `Count ${label.toLowerCase()} in the exact operating unit shown on the dispatch or inventory record; do not mix eaches, packs, cases, or layers.`,
    ratio: `Set ${label.toLowerCase()} from a documented trial or approved method and retain the value with the calculation record.`,
    percent: `Base ${label.toLowerCase()} on measured comparable work, state what the percentage covers, and review it when the process changes.`,
    currency: `Enter ${label.toLowerCase()} on the same currency and per-order or per-unit basis used by the other cost inputs.`,
    minutes: `Time ${label.toLowerCase()} across representative normal work and separate setup, exceptions, and breaks unless the definition includes them.`,
    hours: `Use scheduled ${label.toLowerCase()} for the same shift boundary as the worker and utilization inputs.`,
    seconds: `Observe several cycles for ${label.toLowerCase()}, then use a representative pace rather than the single fastest cycle.`,
    weight: `Weigh ${label.toLowerCase()} on a suitable scale and use the same weight unit for every weight field.`,
    "currency-hour": `Use the documented loaded or direct ${label.toLowerCase()} consistently; the calculator does not decide which accounting basis applies.`,
    divisor: `Obtain ${label.toLowerCase()} from the current official service, marketplace, or account method and match its unit system.`
  };
  const advice = guidance[type] || `Enter ${label.toLowerCase()} from the current pack specification or measured operating record.`;
  return `${tool.title}: ${advice}`;
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
  const content = toolContent[tool.slug];
  if (!content) throw new Error(`Missing content profile for ${tool.slug}`);
  const inputRows = tool.fields.map((field) => `<tr><th>${field[1]}</th><td>${fieldAdvice(tool, field)}</td></tr>`).join("");
  const calculationFlow = `<ol class="procedure-list"><li><strong>Validate the ${tool.title} manifest:</strong> confirm that ${tool.fields.slice(0, 3).map((field) => field[1].toLowerCase()).join(", ")} describe the same ${tool.title} pack, batch, or planning period.</li><li><strong>Calculate ${toolOperations[tool.slug].output.toLowerCase()}:</strong> apply <span class="inline-formula">${tool.formula}</span> without rounding intermediate values for ${tool.title}.</li><li><strong>Review the ${toolOperations[tool.slug].output.toLowerCase()} breakdown:</strong> use the primary result for the stated decision and the secondary values to identify the input or constraint driving this ${tool.title} result.</li></ol>`;
  const workflowLinks = content.workflow.map((item) => `<li>${item}</li>`).join("");
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
    <nav class="document-toc" aria-label="On this page"><strong>On this page</strong><ul><li><a href="#solves">What it solves</a></li><li><a href="#inputs">Choose the inputs</a></li><li><a href="#method">Calculation method</a></li><li><a href="#example">Worked example</a></li><li><a href="#interpretation">Interpretation</a></li><li><a href="#mistakes">Common mistakes</a></li><li><a href="#limits">Assumptions and limitations</a></li><li><a href="#workflow">Related workflow</a></li></ul></nav>
    <h2 id="solves">What this calculator solves</h2><p>${content.solves}</p>
    <h2 id="inputs">How to choose the inputs</h2><p>${content.inputs}</p><table class="content-table"><thead><tr><th>Input</th><th>How to prepare it</th></tr></thead><tbody>${inputRows}</tbody></table>
    <h2 id="method">How the calculation works</h2><div class="formula">${tool.formula}</div>${calculationFlow}
    <h2 id="example">Worked example</h2><div class="example-block"><p>${tool.example}</p><p><strong>Next action:</strong> ${content.workflow[1]}</p></div>
    <h2 id="interpretation">How to interpret the result</h2><p>${content.decision}</p>
    <h2 id="mistakes">Common mistakes</h2><ul class="check-list">${content.mistakes.map((mistake) => `<li>${mistake}</li>`).join("")}</ul>
    <h2 id="limits">Assumptions and limitations</h2><p>${content.limits}</p>
    <div class="caution"><strong>${tool.title} estimate only:</strong> verify the ${tool.title} ${toolOperations[tool.slug].output.toLowerCase()} with the physical pack or operating record and the current requirements governing this decision.</div>
    <h2 id="workflow">Related workflow</h2><ol class="procedure-list">${workflowLinks}</ol><ul class="related-register">${related}<li><a href="${tool.doc}">Related guide or reference</a></li><li><a href="/tools.html">All calculators</a></li></ul>
    <p class="meta-line">Last reviewed: ${REVIEWED}</p>
  </article></div></section>
</main><script src="/assets/calculators.js?v=20260726-content" defer></script>${footer()}`;
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
  const guideDetail = kind === "Guides" ? guideDepth[item.slug] : null;
  if (kind === "Guides" && !guideDetail) throw new Error(`Missing guide depth for ${item.slug}`);
  const referenceDetail = kind === "Reference" ? referenceDepth[item.slug] : null;
  if (kind === "Reference" && !referenceDetail) throw new Error(`Missing reference depth for ${item.slug}`);
  const body = kind === "Guides"
    ? `<p class="lede">${item.intro}</p><nav class="document-toc" aria-label="On this page"><strong>On this page</strong><ul><li><a href="#prepare">Prepare the record</a></li>${item.sections.map(([heading], index) => `<li><a href="#section-${index + 1}">${heading}</a></li>`).join("")}<li><a href="#scenario">Working scenario</a></li><li><a href="#decisions">Decision guide</a></li><li><a href="#mistakes">Common mistakes</a></li><li><a href="#closeout">Close-out</a></li><li><a href="#evidence">Evidence and review</a></li><li><a href="#checklist">Checklist</a></li></ul></nav><h2 id="prepare">Prepare the operating record</h2><ol class="procedure-list">${guideDetail.prepare.map((step) => `<li>${step}</li>`).join("")}</ol>${item.sections.map(([heading, text], index) => `<h2 id="section-${index + 1}">${heading}</h2><p>${text}</p><p>In ${item.title}, document the ${heading.toLowerCase()} choice, its measured basis, and any exception that changes the standard procedure.</p>`).join("")}<h2 id="scenario">Working scenario</h2><div class="example-block"><p>${guideDetail.scenario}</p></div><h2 id="decisions">Decision guide</h2><table class="content-table"><thead><tr><th>Observation</th><th>Operational response</th></tr></thead><tbody>${guideDetail.decisions.map(([signal, action]) => `<tr><th>${signal}</th><td>${action}</td></tr>`).join("")}</tbody></table><h2 id="mistakes">Common mistakes</h2><ul class="check-list">${guideDetail.mistakes.map((mistake) => `<li>${mistake}</li>`).join("")}</ul><h2 id="closeout">Complete and verify the work</h2><p>Close ${item.title} only after its physical result, controlled instruction, and recorded measurements agree with the decision criteria above.</p><ul class="check-list">${guideDetail.closeout.map((check) => `<li>${check}</li>`).join("")}</ul><h2 id="evidence">Evidence, ownership, and review triggers</h2><p>The ${item.title} record should connect the initial requirement—${guideDetail.prepare[0].replace(/\.$/, "").toLowerCase()}—to the released evidence that ${guideDetail.closeout[0].replace(/\.$/, "").toLowerCase()}. Keep the ${item.title} inputs, sample identification, material or equipment revision, date, operator or reviewer role, and exception decision together so a later result can be compared on the same basis.</p><p>Reopen ${item.title} when ${guideDetail.mistakes[0].replace(/\.$/, "").toLowerCase()} is observed, when the product or packaging specification changes, or when damage, rework, time, or consumption moves outside the accepted range. The ${item.title} owner should compare the new condition with the working scenario, repeat the relevant physical check, and issue a revised instruction rather than silently changing an input.</p><p>For periodic review, sample normal work as well as known exceptions. Confirm that the response to “${guideDetail.decisions[0][0]}” still follows the recorded action: ${guideDetail.decisions[0][1]} Retain the ${item.title} evidence long enough to explain inventory settings, cost changes, and any customer or carrier inquiry tied to the pack method.</p><h2 id="checklist">Dispatch checklist</h2><ul>${item.checklist.map((x) => `<li>${x}</li>`).join("")}</ul><div class="caution"><strong>${item.title} planning note:</strong> validate the ${item.title} method with the actual product, materials, handling path, and current shipping requirements.</div>`
    : `<p class="lede">${item.intro}</p><nav class="document-toc" aria-label="On this page"><strong>On this page</strong><ul><li><a href="#overview">Operational meaning</a></li><li><a href="#definitions">Definitions</a></li><li><a href="#example">Applied example</a></li><li><a href="#differences">Key distinctions</a></li><li><a href="#use">How to use this reference</a></li><li><a href="#maintenance">Record and maintenance</a></li><li><a href="#verification">Verification cautions</a></li></ul></nav><h2 id="overview">Operational meaning</h2><p>${referenceDetail.overview}</p><h2 id="definitions">Definitions and operating notes</h2><dl class="reference-ledger">${item.rows.map(([term, text]) => `<div><dt>${term}</dt><dd>${text}</dd></div>`).join("")}</dl><h2 id="example">Applied example</h2><div class="example-block"><p>${referenceDetail.example}</p></div><h2 id="differences">Key distinctions</h2><table class="content-table"><thead><tr><th>Term or question</th><th>Operational distinction</th></tr></thead><tbody>${referenceDetail.differences.map(([term, text]) => `<tr><th>${term}</th><td>${text}</td></tr>`).join("")}</tbody></table><h2 id="use">How to use this reference</h2><ol class="procedure-list">${referenceDetail.use.map((step) => `<li>${step}</li>`).join("")}</ol><h2 id="maintenance">Record structure and maintenance</h2><p>A working ${item.title} record should identify the source document or measurement, unit and scope, effective date, reviewer role, and the calculator or pack instruction that consumes the value. Start by ${referenceDetail.use[0].replace(/\.$/, "").toLowerCase()}, then preserve the unrounded or source value before any operational rounding or simplification.</p><p>Do not treat the glossary entry “${item.rows[0][0]}” as self-approving data. Link the ${item.title} entry to the applicable drawing, supplier specification, official method, measured sample, or controlled procedure. When ${referenceDetail.cautions[0].replace(/\.$/, "").toLowerCase()} becomes relevant, mark the old record superseded, update linked calculations, and recheck downstream fit, cost, inventory, or handling decisions.</p><p>The ${item.title} applied example shows the minimum audit trail: original inputs, intermediate relationship, displayed result, and the action it supports. A periodic ${item.title} review should also verify that the distinction between “${referenceDetail.differences[0][0]}” and its paired operating meaning remains clear to people entering data.</p><h2 id="verification">Verification cautions</h2><ul class="check-list">${referenceDetail.cautions.map((note) => `<li>${note}</li>`).join("")}</ul><div class="caution"><strong>${item.title} reference note:</strong> recheck every changing ${item.title} value in the current supplier, carrier, marketplace, facility, or regulatory source before operational use.</div>`;
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
