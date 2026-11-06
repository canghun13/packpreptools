"use strict";

const force = (options = ["N", "lbf", "gf"]) => ({ name: "force", label: "Force unit for all rows", options });
const dartExample = Array.from({ length: 10 }, () => "100,pass\n110,fail").join("\n");

module.exports = [
  {
    slug: "film-coefficient-of-friction", title: "Film Coefficient of Friction Calculator", type: "Compare friction",
    description: "Calculate static and kinetic COF from sled mass and pull forces, then compare replicate ranges for the same packaging-film surface pair.",
    output: "Mean static and kinetic COF, ranges, and replicate checks", fields: [force(), { name: "sled", label: "Total sled mass (g)", value: "200" }],
    rowLabel: "Static force, kinetic force", readings: "0.60,0.40\n0.65,0.42\n0.55,0.38",
    solves: "A film can take one amount of force to start sliding and a different amount to keep moving. This worksheet reduces paired pull-force readings to static and kinetic coefficients of friction (COF), so a packer or film technician can review the spread before comparing material lots.",
    inputs: "Use the total moving mass that supplies the normal load on a horizontal test surface. Enter the starting peak and the steady-sliding force selected by your lab for each specimen. Use one force unit and one sled mass per run. Keep the contacting surfaces, their orientation and the conditioning together in the lab record.",
    method: "Convert pull forces to newtons and divide each by the normal force: sled mass in kilograms × 9.80665 m/s². The two ratios are unitless. Calculate the mean and range for each set separately, without combining the static and kinetic columns.",
    example: "For a 200 g sled the normal force is 1.96133 N. A 0.60 N starting peak and 0.40 N sliding force give 0.3059 static and 0.2039 kinetic COF. The prefilled replicates have the same means and show the spread around them.",
    interpretation: "Use the ranges to decide whether to review individual specimens rather than relying on an average. The worksheet counts kinetic readings above static without dropping them. Film-to-metal and film-to-film results, or opposite faces of a film, are not interchangeable.",
    mistakes: ["Enter gram-force readings as gf, not as the sled mass or as newtons.", "Do not substitute an arbitrary force point for the steady sliding interval.", "Do not mix surface pairs, directions, or test speeds in one summary."],
    limits: "This reduces existing horizontal sled readings. It does not choose a friction target, predict jams, set equipment, or establish that a test met ASTM D1894 or another procedure.",
    source: ["Intertek: film COF measurement overview", "https://www.intertek.com/polymers-plastics/testlopedia/coefficient-of-friction-astm-d1894/"], related: ["film-tensile-strength", "film-dart-impact"]
  },
  {
    slug: "film-tensile-strength", title: "Film Tensile Strength & Elongation Calculator", type: "Analyze film tension",
    description: "Calculate film-strip peak tensile stress in MPa and elongation at break from specimen dimensions, peak force, and extension at break.",
    output: "Peak stress and elongation at break for each specimen", fields: [force()],
    rowLabel: "Width (mm), thickness (µm), initial gauge length (mm), peak force, extension at break (mm)", readings: "15,50,50,30,20\n15,50,50,33,25\n15,50,50,27,15",
    solves: "Peak force alone is not a fair comparison when film strips have different original cross sections. This calculator computes peak engineering stress and elongation at break separately, retaining each specimen so you can see whether one reading is driving the summary.",
    inputs: "Use the original strip width and measured film thickness, not the roll width or nominal gauge code. Enter the original gauge length that corresponds to the measured extension. Use extension, not the final stretched length, and record machine-direction and transverse-direction specimens in separate runs.",
    method: "Original cross section in mm² is width in mm multiplied by thickness in µm divided by 1,000. Divide the peak force in newtons by that area for MPa. Divide extension at break by original gauge length and multiply by 100 for percent elongation at break.",
    example: "A 15 mm × 50 µm strip has a 0.75 mm² original cross section. A 30 N peak gives 40 MPa. A 20 mm extension on a 50 mm initial gauge length gives 40% elongation at break. The three example rows produce means of 40 MPa and 40%.",
    interpretation: "Peak stress describes the largest measured load normalized to the original section. Elongation describes how far the strip stretched at break. The two events need not coincide. Review thickness, direction and the displacement measurement basis before comparing runs.",
    mistakes: ["Do not divide film tension by strip width alone; that gives force per width, not stress.", "Subtract the original gauge length if your record contains final length rather than extension.", "Do not infer Young’s modulus or yield stress from peak force and extension at break."],
    limits: "This worksheet does not identify a valid break from a trace, compensate for grip slip or establish ASTM D882 compliance. Do not use this result as a load rating or a substitute for the lab report.",
    source: ["ADMET: thin plastic film tensile testing", "https://www.admet.com/testing-standards/astm-d882-thin-plastic-film-tensile-testing/"], related: ["film-coefficient-of-friction", "flexible-package-seal-strength"]
  },
  {
    slug: "film-dart-impact", title: "Film Dart Impact Staircase Calculator", type: "Check impact series",
    description: "Check the order of fixed-step film dart impact readings and estimate the 50% failure mass from a completed pass/fail staircase series.",
    output: "Sequence validation, estimated failure mass, and mass-level tally", fields: [{ name: "step", label: "Fixed mass increment (g)", value: "10" }],
    rowLabel: "Total dart mass (g), pass or fail — in test order", readings: dartExample,
    solves: "A falling-dart staircase produces a sequence of masses and specimen outcomes, not a single breaking weight. This worksheet checks the recorded step directions and summarizes one completed series with a Dixon–Mood point estimate and a tally at each observed mass.",
    inputs: "Enter one test series in chronological order after applying the lab’s own series selection. Use total dart mass, including the carrier and added weights, and enter the same increment used throughout. Use a separate run for a different fixture, method, material, thickness, or drop height. The worksheet requires at least ten of each outcome.",
    method: "Check that each recorded mass is one step higher after a pass or one step lower after a failure. If failures are no more frequent than passes, estimate the center as the mean failure mass minus half a step; otherwise use the mean pass mass plus half a step. This is an exploratory up-and-down estimator, not a standard-specific reduction rule.",
    example: "The synthetic sequence alternates 100 g passes and 110 g failures ten times at a 10 g increment. Failures and passes are tied, so the worksheet uses 110 − 5 = 105 g. This is a point estimate, not an observed failure at 105 g.",
    interpretation: "Use the mass-level counts to inspect how much evidence supports the estimate. A narrow observed mass range does not give a confidence interval. A film dart mass is not a complete package drop height, puncture guarantee, or transport rating.",
    mistakes: ["Do not paste the table sorted by mass; the sequence is required.", "Use total dart mass rather than the mass of the removable weights alone.", "Do not pool different methods or use fixed-mass grouped trials in this staircase worksheet."],
    limits: "This tool does not select valid rows, assess the shape of the failure distribution, estimate confidence bounds, or implement all ASTM D1709 or ISO 7765 reporting and test rules. Use the instrument and approved analysis for a specification result.",
    source: ["Intertek: film falling-dart test overview", "https://www.intertek.com/polymers-plastics/testlopedia/drop-dart-method-astm-d1709/"],
    methodSource: ["NBS Handbook 91: up-and-down designs", "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook91.pdf"], related: ["film-tensile-strength", "flexible-package-seal-strength"]
  },
  {
    slug: "flexible-package-seal-strength", title: "Flexible Package Seal Strength Calculator", type: "Review seal peel",
    description: "Normalize seal strip peak peel force to N/15 mm and lbf/in, then check individual flexible-package strips against your own review threshold.",
    output: "Width-normalized peel peaks, range, and below-threshold count", fields: [force(), { name: "minimum", label: "Review threshold (N/15 mm, optional)", value: "6" }],
    rowLabel: "Strip width (mm), peak peel force", readings: "15,6\n25,11\n15,5.4",
    solves: "A wider seal specimen may take more force to open without having a higher peak force per unit width. Normalize measured peel peaks to a common width basis to spot individual strips that merit review, instead of comparing raw loads or relying on a batch mean alone.",
    inputs: "Use the width of the cut test strip along the seal, not the seal band depth. Enter one peak force per strip using a common support technique, speed, and conditioning. The optional threshold is a number your operation already uses for this same reporting basis; leave it blank if there is none.",
    method: "Convert each peak to newtons and divide by strip width in millimeters. Multiply by 15 for N/15 mm. To express the same force per width in lbf/in, multiply N/mm by 25.4 and divide by 4.4482216152605. Compare individual unrounded N/15 mm readings to the entered threshold.",
    example: "A 15 mm strip at 6 N and a 25 mm strip at 11 N normalize to 6 and 6.6 N/15 mm. The third example strip is 5.4 N/15 mm, so the mean is 6 N/15 mm but one of three strips is below the 6 N/15 mm review threshold.",
    interpretation: "An exact threshold match is not counted below it. A strip below a user threshold is a review flag only. The worksheet averages specimen peaks, which is different from an instrument’s average peel force along a seal. Keep observed failure modes with the original report.",
    mistakes: ["Do not enter a value that is already in N/15 mm as though it were raw newtons.", "Do not mix unsupported and supported peel techniques in the same comparison.", "Do not infer that a strong peel reading means the whole package is leak-free."],
    limits: "This review does not prescribe a minimum seal strength, classify failure modes, demonstrate ASTM F88 compliance, or replace leak testing or the applicable release procedure.",
    source: ["ADMET: flexible package seal strength testing", "https://www.admet.com/testing-standards/astm-f88-package-seal-strength-testing/"], related: ["film-tensile-strength", "film-dart-impact"]
  }
];
