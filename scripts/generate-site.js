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
    interpretation: "Use the empty-space share to spot oversized cartons. Convert the estimate into bags, paper, or dispensing settings with a bench trial.",
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
    assumptions: "Paper does not fill space like a solid block. This planning estimate must be calibrated with repeatable bench tests.",
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

const guides = [
  {
    slug: "how-to-measure-a-box",
    title: "How to Measure a Box Correctly",
    description: "Measure package length, width, and height consistently and understand internal versus external dimensions.",
    intro: "Reliable packing calculations begin with dimensions taken from the right surfaces, in the right order, without ignoring bulges.",
    sections: [
      ["Start with the measurement purpose", "Use external dimensions for shipping size and dimensional weight. Use internal dimensions for product fit, clearance, and void-fill planning. A carton supplier may list either set, so read the specification label."],
      ["Identify length, width, and height", "For shipping measurements, length is normally the longest side. Width is the next longest side and height is the remaining side. Measure at the maximum finished points after the carton is closed."],
      ["Measure the packed package", "Tape, overfilled flaps, corner protectors, and flexible mailers can change the final dimensions. Place the package on a flat bench, keep the measuring tool square, and record any outward bow."],
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

const basicPages = [
  {
    file: "about.html",
    title: "About Pack Prep Tools",
    description: "Learn how Pack Prep Tools helps online sellers plan package dimensions, materials, and packing cost.",
    eyebrow: "About the workbench",
    body: `<p>Pack Prep Tools is a focused set of practical calculators and reference notes for people who pack finished products for shipment. It is built for online sellers, small brands, marketplace shops, and compact fulfillment teams.</p>
      <h2>What the site covers</h2><p>The tools address carton and mailer size, dimensional weight, length plus girth, empty space, cushioning, tape, material cost, and packing labor. They do not buy labels, quote live rates, store orders, or promise regulatory compliance.</p>
      <h2>How to use the estimates</h2><p>Start with accurate package measurements, use the calculator to create a planning estimate, then verify the result with your actual materials and current carrier or supplier rules. Packaging is physical work: a bench test is the final fit check.</p>
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
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="stylesheet" href="/assets/styles.css">
  ${ga()}
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`;
}

function header(current) {
  const items = [["Home", "/"], ["Tools", "/tools.html"], ["Guides", "/guides.html"], ["Reference", "/reference.html"], ["About", "/about.html"]];
  return `<body>
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="/" aria-label="Pack Prep Tools home"><span class="brand-mark" aria-hidden="true"></span><span>Pack Prep Tools</span></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button>Menu</button>
    <nav class="site-nav" id="site-nav" aria-label="Primary" data-site-nav>
      ${items.map(([label, href]) => `<a href="${href}"${current === label ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div><a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span><span>Pack Prep Tools</span></a><p class="footer-copy">Practical measurements, material estimates, and packing-cost worksheets for small shipping operations.</p></div>
    <nav class="footer-links" aria-label="Footer">
      <a href="/tools.html">Tools</a><a href="/guides.html">Guides</a><a href="/reference.html">Reference</a><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/privacy.html">Privacy</a>
    </nav>
    <div class="footer-bottom">© 2026 Pack Prep Tools. Planning estimates only; verify fit, protection, and current carrier rules.</div>
  </div>
</footer>
<script src="/assets/site.js" defer></script>
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
  <section class="hero"><div class="page-shell hero-grid">
    <div><p class="eyebrow">Packing bench calculators</p><h1>Measure the pack. Plan the materials.</h1><p class="hero-copy">Straightforward calculators for box fit, shipping dimensions, cushioning, tape, mailers, and per-order packing cost—built for small sellers doing real bench work.</p>
      <div class="button-row"><a class="button button-primary" href="/tools/dimensional-weight.html">Calculate DIM weight</a><a class="button button-secondary" href="/tools.html">Browse all tools</a></div>
    </div>
    <div class="specimen" aria-label="Package measurement worksheet illustration">
      <p class="eyebrow">Current package</p><div class="specimen-box"></div>
      <div class="measure-line"><span>Length</span><i></i><strong>12 in</strong></div>
      <div class="measure-line"><span>Width</span><i></i><strong>10 in</strong></div>
      <div class="measure-line"><span>Height</span><i></i><strong>8 in</strong></div>
    </div>
  </div></section>
  <section class="section"><div class="page-shell">
    <div class="section-heading"><div><p class="eyebrow">Tool rack / 10</p><h2>Start with the package decision in front of you.</h2></div><p>Each worksheet names its assumptions, shows the method, and links to the measurements behind the result.</p></div>
    <ol class="tool-list">${tools.map((tool, index) => `<li><a class="tool-link" href="/tools/${tool.slug}.html"><span class="tool-index">${String(index + 1).padStart(2, "0")}</span><span><h3>${tool.title}</h3><p>${tool.short}</p></span><span class="arrow" aria-hidden="true">→</span></a></li>`).join("")}</ol>
  </div></section>
  <section class="section section-ink"><div class="page-shell">
    <div class="section-heading"><div><p class="eyebrow">Bench sequence</p><h2>A calculator is one step in a better pack.</h2></div><p>Use measured inputs, treat the result as a planning specification, and verify it with production materials.</p></div>
    <div class="workflow"><div class="workflow-step"><strong>01 / MEASURE</strong><h3>Capture the finished dimensions.</h3><p>Know whether the task needs internal fit dimensions or external shipping dimensions.</p></div><div class="workflow-step"><strong>02 / CALCULATE</strong><h3>Record the assumptions.</h3><p>Choose the correct unit, divisor, clearance, material yield, or labor rate.</p></div><div class="workflow-step"><strong>03 / VERIFY</strong><h3>Run a physical pack test.</h3><p>Confirm fit, protection, closure, movement, and the final package size at the bench.</p></div></div>
  </div></section>
  <section class="section"><div class="page-shell">
    <div class="section-heading"><div><p class="eyebrow">Field notes</p><h2>Measure consistently. Pack repeatably.</h2></div><p>Guides and concise references explain the terms and decisions used across every calculator.</p></div>
    <ul class="document-list">${guides.slice(0, 2).map((guide) => `<li><a class="document-link" href="/guides/${guide.slug}.html"><span class="tool-index">GUIDE</span><span><h3>${guide.title}</h3><p>${guide.description}</p></span><span class="arrow" aria-hidden="true">→</span></a></li>`).join("")}${references.slice(0, 2).map((ref) => `<li><a class="document-link" href="/reference/${ref.slug}.html"><span class="tool-index">REF</span><span><h3>${ref.title}</h3><p>${ref.description}</p></span><span class="arrow" aria-hidden="true">→</span></a></li>`).join("")}</ul>
  </div></section>
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
    "currency-hour": "per hr"
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
  <header class="page-hero"><div class="page-shell">${breadcrumbs([{ label: "Tools", href: "/tools.html" }, { label: title }])}<p class="eyebrow">Packing worksheet</p><h1>${title}</h1><p class="lede">${tool.description}</p></div></header>
  <section class="section"><div class="page-shell calculator-layout">
    <div class="worksheet"><div class="worksheet-head"><span>Input specification</span><span>Units stay visible</span></div>
      <form class="calculator-form" data-calculator="${tool.slug}" novalidate><div class="field-grid">${unitOptions(tool)}${fields}${select}</div><div class="form-actions"><button class="button button-primary" type="submit">Calculate</button><button class="button button-quiet" type="reset">Reset</button></div><p class="form-error" data-error role="alert" aria-live="polite"></p></form>
    </div>
    <section class="result-sheet" data-result data-state="idle" tabindex="-1" aria-live="polite"><div class="result-head"><span>Pack specification</span><span>Estimate</span></div><div class="result-body"><p class="result-kicker">Calculated result</p><p class="result-primary" data-result-primary>Enter your package details to begin.</p><dl class="result-values" data-result-values></dl></div></section>
  </div></section>
  <section class="section"><div class="page-shell content-grid"><article class="prose">
    <h2>Calculation method</h2><p>This worksheet uses the following planning method:</p><div class="formula">${tool.formula}</div>
    <h2>Worked example</h2><p>${tool.example}</p>
    <h2>How to interpret the result</h2><p>${tool.interpretation}</p>
    <h2>Assumptions and limitations</h2><p>${tool.assumptions}</p>
    <div class="note"><strong>Estimate only.</strong> Verify the packed result with actual materials and the current requirements of your supplier, marketplace, or carrier.</div>
    <p class="meta-line">Last reviewed: ${REVIEWED}</p>
  </article><aside class="side-links"><h2>Continue the pack plan</h2><ul>${related}<li><a href="${tool.doc}">Read the related guide or reference</a></li><li><a href="/tools.html">View all calculators</a></li></ul></aside></div></section>
</main><script src="/assets/calculators.js" defer></script>${footer()}`;
}

function indexPage(kind, items) {
  const isTools = kind === "Tools";
  const file = `${kind.toLowerCase()}.html`;
  const title = isTools ? "Packaging Calculators" : kind === "Guides" ? "Packaging Guides" : "Packaging Reference";
  const description = isTools ? "Browse ten practical calculators for package dimensions, materials, and cost." : kind === "Guides" ? "Read practical guides for measuring, sizing, and controlling packaging cost." : "Use concise reference notes for packaging terms, materials, dimensions, and DIM divisors.";
  const list = items.map((item, index) => `<li><a class="document-link" href="/${kind.toLowerCase()}/${item.slug}.html"><span class="tool-index">${String(index + 1).padStart(2, "0")}</span><span><h3>${item.title}</h3><p>${item.short || item.description}</p></span><span class="arrow" aria-hidden="true">→</span></a></li>`).join("");
  return `${head({ file, title, description, schema: websiteSchema(file, title, description) })}${header(kind)}
<main id="main"><header class="page-hero"><div class="page-shell">${breadcrumbs([{ label: kind }])}<p class="eyebrow">${isTools ? "Tool rack" : "Field notes"}</p><h1>${title}</h1><p class="lede">${description}</p></div></header>
<section class="section"><div class="page-shell"><ul class="document-list">${list}</ul></div></section></main>${footer()}`;
}

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
    ? `<p class="lede">${item.intro}</p>${item.sections.map(([heading, text]) => `<h2>${heading}</h2><p>${text}</p>`).join("")}<h2>Bench checklist</h2><ul>${item.checklist.map((x) => `<li>${x}</li>`).join("")}</ul><div class="note"><strong>Planning note.</strong> Packaging performance depends on the product, materials, handling environment, and current shipping requirements. Test the finished pack.</div>`
    : `<p class="lede">${item.intro}</p><dl class="reference-table">${item.rows.map(([term, text]) => `<div class="note"><dt><strong>${term}</strong></dt><dd>${text}</dd></div>`).join("")}</dl><div class="note"><strong>Reference note.</strong> Confirm current supplier and carrier specifications before using a term or value operationally.</div>`;
  const related = kind === "Guides" ? item.related : item.slug.includes("dimensional") ? "/tools/dimensional-weight.html" : item.slug.includes("internal") ? "/tools/box-size.html" : "/tools.html";
  return `${head({ file, title, description: item.description, type: "article", schema })}${header(kind)}
<main id="main"><header class="page-hero"><div class="page-shell">${breadcrumbs([{ label: kind, href: `/${folder}.html` }, { label: title }])}<p class="eyebrow">${kind === "Guides" ? "Packing guide" : "Reference sheet"}</p><h1>${title}</h1></div></header>
<section class="section"><div class="page-shell content-grid"><article class="prose">${body}<p class="meta-line">Last reviewed: ${REVIEWED}</p></article><aside class="side-links"><h2>Related</h2><ul><li><a href="${related}">Open the related calculator</a></li><li><a href="/${folder}.html">View all ${folder}</a></li></ul></aside></div></section></main>${footer()}`;
}

function basicPage(page) {
  const schema = websiteSchema(page.file, page.title, page.description);
  return `${head({ file: page.file, title: page.title, description: page.description, schema })}${header(page.title.startsWith("About") ? "About" : "")}
<main id="main"><header class="page-hero"><div class="page-shell">${breadcrumbs([{ label: page.title }])}<p class="eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p class="lede">${page.description}</p></div></header>
<section class="section"><div class="page-shell"><article class="prose">${page.body}<p class="meta-line">Last reviewed: ${REVIEWED}</p></article></div></section></main>${footer()}`;
}

function notFound() {
  const file = "404.html";
  const title = "Package Not Found";
  const description = "The requested Pack Prep Tools page could not be found.";
  return `${head({ file, title, description, noindex: true, schema: websiteSchema(file, title, description) })}${header("")}
<main id="main"><header class="page-hero"><div class="page-shell"><p class="eyebrow">404 / missing label</p><h1>Package not found.</h1><p class="lede">This page may have moved, or the address may be incomplete. Return to the workbench and choose a current tool.</p><div class="button-row"><a class="button button-primary" href="/">Go to homepage</a><a class="button button-quiet" href="/tools.html">Browse calculators</a></div></div></header></main>${footer()}`;
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
      const border = x < 4 || x > 27 || y < 5 || y > 26;
      const seam = x >= 15 && x <= 17;
      const color = border || seam ? [244, 240, 230, 255] : [37, 71, 60, 255];
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
}

generate();
