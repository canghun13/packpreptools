(function () {
  "use strict";

  const LBF_TO_N = 4.4482216152605;
  const G = 9.80665;
  const idle = "Review the example or enter your own readings.";
  const fmt = (x, places = 4) => x !== 0 && Math.abs(x) < 10 ** -places
    ? x.toExponential(2) : new Intl.NumberFormat("en-US", { maximumFractionDigits: places }).format(x);

  function readRows(input, columns, limit = 100) {
    if (typeof input !== "string" || !input.trim()) throw new Error("Enter at least one row of readings.");
    if (input.length > 12000) throw new Error("The input is too long. Use a smaller batch of readings.");
    const lines = input.trim().split(/\r\n?|\n/);
    if (lines.length > limit) throw new Error(`Enter no more than ${limit} rows.`);
    return lines.map((line, i) => {
      const cells = line.trim().split(line.includes("\t") ? "\t" : ",").map((cell) => cell.trim());
      if (cells.length !== columns || cells.some((cell) => !cell)) {
        throw new Error(`Row ${i + 1}: enter ${columns} values separated by commas or tabs.`);
      }
      return cells;
    });
  }

  function number(value, label, max, min = 0) {
    const raw = String(value ?? "").trim();
    const n = Number(raw);
    if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw) || !Number.isFinite(n) || n < min || n > max) {
      throw new Error(`${label}: enter a number from ${min} to ${max}, using a decimal point.`);
    }
    return n;
  }

  function mean(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  const range = (values, unit = "") => `${fmt(Math.min(...values))} to ${fmt(Math.max(...values))}${unit ? ` ${unit}` : ""}`;
  const forceFactor = (unit) => {
    if (unit === "N") return 1;
    if (unit === "lbf") return LBF_TO_N;
    if (unit === "gf") return G / 1000;
    throw new Error("Select a supported force unit.");
  };

  function friction(data) {
    const sled = number(data.sled, "Sled mass (g)", 10000, 0.01) / 1000;
    const factor = forceFactor(data.force);
    const rows = readRows(data.readings, 2).map(([s, k], i) => [
      number(s, `Row ${i + 1} static force`, 10000) * factor / (sled * G),
      number(k, `Row ${i + 1} kinetic force`, 10000) * factor / (sled * G)
    ]);
    const stat = rows.map(([s]) => s);
    const kin = rows.map(([, k]) => k);
    const reverse = rows.filter(([s, k]) => k > s).length;
    return {
      primary: `${fmt(mean(stat))} static / ${fmt(mean(kin))} kinetic`,
      details: [["Replicates", rows.length], ["Static COF range", range(stat)], ["Kinetic COF range", range(kin)], ["Kinetic above static", `${reverse} of ${rows.length}`]],
      samples: rows.map(([s, k], i) => [`Specimen ${i + 1}`, `${fmt(s)} static · ${fmt(k)} kinetic`]),
      note: reverse ? "Review force windows and specimen records where kinetic exceeds static; readings were not discarded." : "Compare only matching surface pairs, directions and test conditions."
    };
  }

  function tensile(data) {
    const factor = forceFactor(data.force);
    const rows = readRows(data.readings, 5).map(([w, t, length, force, extension], i) => {
      const label = `Row ${i + 1}`;
      const area = number(w, `${label} width (mm)`, 1000, 0.001) * number(t, `${label} thickness (µm)`, 10000, 0.001) / 1000;
      return [number(force, `${label} peak force`, 100000) * factor / area,
        number(extension, `${label} extension at break (mm)`, 100000) / number(length, `${label} initial gauge length (mm)`, 10000, 0.01) * 100];
    });
    const stress = rows.map(([x]) => x);
    const strain = rows.map(([, x]) => x);
    return {
      primary: `${fmt(mean(stress))} MPa mean peak stress`,
      details: [["Specimens", rows.length], ["Peak stress range", range(stress, "MPa")], ["Mean elongation at break", `${fmt(mean(strain))}%`], ["Elongation range", range(strain, "%")]],
      samples: rows.map(([s, e], i) => [`Specimen ${i + 1}`, `${fmt(s)} MPa peak · ${fmt(e)}% at break`]),
      note: "Peak load and extension at break describe different events. Compare matching specimen directions and test conditions."
    };
  }

  function peel(data) {
    const factor = forceFactor(data.force);
    const rows = readRows(data.readings, 2).map(([w, f], i) => number(f, `Row ${i + 1} peak force`, 100000) * factor
      / number(w, `Row ${i + 1} strip width (mm)`, 1000, 0.001));
    const per15 = rows.map((x) => x * 15);
    const low = String(data.minimum ?? "").trim();
    const minimum = low === "" ? null : number(low, "Review threshold (N/15 mm)", 100000);
    const below = minimum === null ? null : per15.filter((x) => x < minimum && minimum - x > 4 * Number.EPSILON * Math.max(x, minimum)).length;
    const average = mean(rows);
    return {
      primary: `${fmt(average * 15)} N/15 mm mean peak`,
      details: [["Strips", rows.length], ["Mean peak, lbf/in", fmt(average * 25.4 / LBF_TO_N)], ["Normalized peak range", range(per15, "N/15 mm")], ["Below your review threshold", below === null ? "No threshold entered" : `${below} of ${rows.length}`]],
      samples: per15.map((x, i) => [`Strip ${i + 1}`, `${fmt(x)} N/15 mm`]),
      note: "A mean of specimen peaks is not the mean peel force along a seal. Keep support method, conditions and failure-mode notes with the source readings."
    };
  }

  function dart(data) {
    const step = number(data.step, "Mass increment (g)", 10000, 0.001);
    const rows = readRows(data.readings, 2, 200).map(([m, response], i) => {
      const outcome = response.toLowerCase();
      if (outcome !== "fail" && outcome !== "pass") throw new Error(`Row ${i + 1}: enter pass or fail.`);
      return { mass: number(m, `Row ${i + 1} total dart mass (g)`, 100000, 0.001), fail: outcome === "fail" };
    });
    for (let i = 1; i < rows.length; i++) {
      const prior = rows[i - 1];
      const expected = prior.mass + (prior.fail ? -step : step);
      if (Math.abs(rows[i].mass - expected) > 1e-8) {
        throw new Error(`Row ${i + 1}: expected ${fmt(expected)} g after the preceding ${prior.fail ? "failure" : "pass"}. Keep one fixed-step series in test order.`);
      }
    }
    const failures = rows.filter((row) => row.fail).map((row) => row.mass);
    const passes = rows.filter((row) => !row.fail).map((row) => row.mass);
    if (failures.length < 10 || passes.length < 10) throw new Error("Enter a completed analysis series with at least ten passes and ten failures. No estimate was calculated.");
    const useFailures = failures.length <= passes.length;
    const selected = useFailures ? failures : passes;
    const estimate = mean(selected) + (useFailures ? -step : step) / 2;
    if (estimate < Math.min(...rows.map((row) => row.mass)) || estimate > Math.max(...rows.map((row) => row.mass))) {
      throw new Error("The estimate lies outside the observed masses. Review the source series before interpreting it.");
    }
    const levels = new Map();
    const origin = Math.min(...rows.map((row) => row.mass));
    for (const row of rows) {
      const index = Math.round((row.mass - origin) / step);
      const level = levels.get(index) ?? { fail: 0, pass: 0 };
      level[row.fail ? "fail" : "pass"]++;
      levels.set(index, level);
    }
    return {
      primary: `${fmt(estimate)} g estimated 50% failure mass`,
      details: [["Drops in analysis series", rows.length], ["Passes / failures", `${passes.length} / ${failures.length}`], ["Observed dart masses", range(rows.map((row) => row.mass), "g")], ["Estimator basis", `${useFailures ? "Failures −" : "Passes +"} half a mass step`]],
      samples: [...levels].sort(([a], [b]) => a - b).map(([level, counts]) => [`${fmt(origin + level * step)} g`, `${counts.pass} pass / ${counts.fail} fail`]),
      note: "Exploratory fixed-step estimate, not a standards calculation or a package drop-height result. Keep fixture, method and series selection in the lab record."
    };
  }

  const engines = { "film-coefficient-of-friction": friction, "film-tensile-strength": tensile,
    "film-dart-impact": dart, "flexible-package-seal-strength": peel };

  if (typeof module === "object" && module.exports) module.exports = { engines };
  if (typeof document === "undefined") return;

  const form = document.querySelector("[data-film-test]");
  if (!form || !Object.hasOwn(engines, form.dataset.filmTest)) return;
  const panel = document.querySelector("[data-film-result]");
  const primary = panel.querySelector("[data-result-primary]");
  const details = panel.querySelector("[data-result-values]");
  const samplePanel = panel.querySelector("[data-film-sample-panel]");
  const samples = panel.querySelector("[data-film-samples]");
  const note = panel.querySelector("[data-film-note]");
  const error = form.querySelector("[data-error]");
  form.querySelector("[data-film-submit]").disabled = false;

  function renderPairs(target, pairs) {
    target.replaceChildren(...pairs.map(([key, value]) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = key;
      dd.textContent = value;
      row.append(dt, dd);
      return row;
    }));
  }

  function clear(state) {
    panel.dataset.state = state;
    primary.textContent = state === "error" ? "No result. Check the input record." : idle;
    details.replaceChildren();
    samplePanel.hidden = true;
    samplePanel.open = false;
    samples.replaceChildren();
    note.textContent = "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    try {
      const output = engines[form.dataset.filmTest](Object.fromEntries(new FormData(form)));
      panel.dataset.state = "ready";
      primary.textContent = output.primary;
      renderPairs(details, output.details);
      renderPairs(samples, output.samples);
      samplePanel.hidden = false;
      samplePanel.open = false;
      note.textContent = output.note;
    } catch (problem) {
      clear("error");
      error.textContent = problem.message;
    }
  });
  function invalidate() { error.textContent = ""; clear("idle"); }
  form.addEventListener("input", invalidate);
  form.addEventListener("change", invalidate);
  form.addEventListener("reset", invalidate);
})();
