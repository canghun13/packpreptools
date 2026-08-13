(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.PackPrepWorkflowTools = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function clean(value) {
    return String(value == null ? "" : value).trim();
  }

  function escapeHtml(value) {
    return clean(value).replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[character]);
  }

  function whole(value, label, options) {
    const number = Number(value);
    const settings = options || {};
    if (!Number.isFinite(number) || !Number.isInteger(number)) throw new Error(`${label} must be a whole number.`);
    if (number < (settings.min == null ? 1 : settings.min)) throw new Error(`${label} must be at least ${settings.min == null ? 1 : settings.min}.`);
    if (number > (settings.max == null ? 1000000 : settings.max)) throw new Error(`${label} is outside the supported planning range.`);
    return number;
  }

  function requireText(value, label, maxLength) {
    const result = clean(value);
    if (!result) throw new Error(`${label} is required.`);
    if (result.length > (maxLength || 160)) throw new Error(`${label} is too long.`);
    return result;
  }

  function readiness(input) {
    const checks = [
      ["SKU or product family", input.sku],
      ["Instruction ID", input.instructionId],
      ["Revision", input.revision],
      ["Effective date", input.effectiveDate],
      ["Container identification", input.container],
      ["Materials with quantities", input.materials],
      ["Closure method", input.closure],
      ["Label placement", input.labelPlacement],
      ["Verification point", input.verification],
      ["Exception action and owner", input.exceptionAction],
      ["Record owner", input.owner]
    ];
    const gaps = checks.filter(([, value]) => !clean(value)).map(([label]) => label);
    let stepCount = 0;
    if (clean(input.stepCount)) {
      stepCount = whole(input.stepCount, "Pack step count", { min: 0, max: 50 });
      if (stepCount < 3) gaps.push("At least three ordered pack steps");
    } else {
      gaps.push("Ordered pack-step count");
    }
    const uniqueGaps = [...new Set(gaps)];
    return {
      primary: uniqueGaps.length ? `${uniqueGaps.length} release gap${uniqueGaps.length === 1 ? "" : "s"} to close` : "Ready for a controlled pack trial",
      values: [
        ["Sections checked", String(checks.length + 1)],
        ["Recorded steps", String(stepCount)],
        ["Open gaps", String(uniqueGaps.length)]
      ],
      details: uniqueGaps.length
        ? `<h3>Missing or incomplete fields</h3><ul>${uniqueGaps.map((gap) => `<li>${escapeHtml(gap)}</li>`).join("")}</ul><p>Complete these fields, then run the checker again before issuing the instruction for a physical pack trial.</p>`
        : `<h3>Readiness boundary</h3><p>The record contains the minimum operating fields checked by this tool. Build and inspect the physical pack, confirm the instruction with the responsible owner, and retain any trial exceptions before release.</p>`
    };
  }

  function instruction(input) {
    const sku = requireText(input.sku, "SKU or product family");
    const instructionId = requireText(input.instructionId, "Instruction ID");
    const revision = requireText(input.revision, "Revision", 40);
    const container = requireText(input.container, "Container");
    const materials = requireText(input.materials, "Materials and quantities", 500);
    const closure = requireText(input.closure, "Closure method");
    const labelPlacement = requireText(input.labelPlacement, "Label placement");
    const verification = requireText(input.verification, "Verification point", 300);
    const steps = (input.steps || []).map(clean).filter(Boolean);
    if (steps.length < 3) throw new Error("Enter at least three ordered pack steps.");
    if (steps.length > 8) throw new Error("Use no more than eight pack steps in this builder.");
    const optional = (label, value) => clean(value) ? `<dt>${label}</dt><dd>${escapeHtml(value)}</dd>` : "";
    const details = `<article class="generated-sheet"><header><p>CONTROLLED PACK INSTRUCTION</p><h3>${escapeHtml(sku)}</h3><dl><dt>Instruction</dt><dd>${escapeHtml(instructionId)}</dd><dt>Revision</dt><dd>${escapeHtml(revision)}</dd>${optional("Effective date", input.effectiveDate)}${optional("Owner", input.owner)}</dl></header><section><h4>Pack materials</h4><p><strong>Container:</strong> ${escapeHtml(container)}</p><p>${escapeHtml(materials)}</p></section><section><h4>Ordered method</h4><ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></section><section><h4>Close, label, verify</h4><dl><dt>Closure</dt><dd>${escapeHtml(closure)}</dd><dt>Label placement</dt><dd>${escapeHtml(labelPlacement)}</dd><dt>Verification</dt><dd>${escapeHtml(verification)}</dd>${optional("Exception action", input.exceptionAction)}</dl></section>${clean(input.notes) ? `<section><h4>Operating notes</h4><p>${escapeHtml(input.notes)}</p></section>` : ""}<footer>Planning record only — verify the physical pack and current governing requirements before release.</footer></article>`;
    return {
      primary: `${instructionId} / Rev ${revision} built for ${sku}`,
      values: [["Ordered steps", String(steps.length)], ["Container", container], ["Record status", "Draft for trial"]],
      details
    };
  }

  function routing(input) {
    const baseRoute = requireText(input.baseRoute, "Default pack instruction");
    const rows = (input.rules || []).map((rule, index) => ({
      index: index + 1,
      condition: clean(rule.condition),
      route: clean(rule.route),
      action: clean(rule.action),
      priority: clean(rule.priority)
    })).filter((rule) => rule.condition || rule.route || rule.action || rule.priority);
    if (!rows.length) throw new Error("Enter at least one routing rule.");
    rows.forEach((rule) => {
      if (!rule.condition || !rule.route) throw new Error(`Routing rule ${rule.index} needs both a condition and a pack instruction.`);
      rule.priority = whole(rule.priority, `Routing rule ${rule.index} priority`, { min: 1, max: 99 });
    });
    const conflicts = [];
    const seen = new Map();
    rows.forEach((rule) => {
      const key = rule.condition.toLowerCase();
      if (seen.has(key) && seen.get(key).route.toLowerCase() !== rule.route.toLowerCase()) {
        conflicts.push(`Rules ${seen.get(key).index} and ${rule.index} use the same condition with different instructions.`);
      } else if (!seen.has(key)) {
        seen.set(key, rule);
      }
    });
    const sorted = [...rows].sort((a, b) => a.priority - b.priority || a.index - b.index);
    const details = `<article class="generated-sheet"><header><p>PACK VARIANT ROUTING SHEET</p><h3>${escapeHtml(clean(input.family) || "Order pack routing")}</h3><dl><dt>Default instruction</dt><dd>${escapeHtml(baseRoute)}</dd><dt>Rule evaluation</dt><dd>Lowest priority number first</dd></dl></header><section><h4>Routing rules</h4><div class="generated-table-wrap"><table><thead><tr><th>Priority</th><th>If this condition is present</th><th>Use instruction</th><th>Operator action</th></tr></thead><tbody>${sorted.map((rule) => `<tr><td>${rule.priority}</td><td>${escapeHtml(rule.condition)}</td><td>${escapeHtml(rule.route)}</td><td>${escapeHtml(rule.action || "Follow the selected instruction and record any exception.")}</td></tr>`).join("")}</tbody></table></div></section>${conflicts.length ? `<section class="generated-warning"><h4>Conflicts to resolve</h4><ul>${conflicts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>` : `<section><h4>Fallback</h4><p>Orders that match no listed condition use ${escapeHtml(baseRoute)}. Confirm that the order data exposes every condition exactly as written.</p></section>`}<footer>This sheet organizes user-defined rules; it does not read an order system or validate marketplace, carrier, product, or legal requirements.</footer></article>`;
    return {
      primary: conflicts.length ? `${conflicts.length} routing conflict${conflicts.length === 1 ? "" : "s"} to resolve` : `${rows.length} routing rule${rows.length === 1 ? "" : "s"} organized`,
      values: [["Active rules", String(rows.length)], ["Default route", baseRoute], ["Conflicts", String(conflicts.length)]],
      details
    };
  }

  function traveler(input) {
    const jobNumber = requireText(input.jobNumber, "Job or batch number");
    const instructionId = requireText(input.instructionId, "Instruction ID");
    const revision = requireText(input.revision, "Revision", 40);
    const sku = requireText(input.sku, "SKU or product family");
    const quantity = whole(input.quantity, "Planned quantity", { min: 1, max: 1000000 });
    const interval = whole(input.interval, "Checkpoint interval", { min: 1, max: 1000000 });
    if (interval > quantity) throw new Error("Checkpoint interval cannot exceed planned quantity.");
    const checkpoints = [];
    for (let value = interval; value < quantity; value += interval) checkpoints.push(value);
    checkpoints.push(quantity);
    if (checkpoints.length > 200) throw new Error("Checkpoint interval creates more than 200 rows; use a larger interval.");
    const materialRows = [
      ["Container / lot", clean(input.containerLot)],
      ["Protection / lot", clean(input.protectionLot)],
      ["Closure / lot", clean(input.closureLot)],
      ["Labels or inserts / lot", clean(input.labelLot)]
    ];
    const details = `<article class="generated-sheet"><header><p>PACK JOB TRAVELER</p><h3>${escapeHtml(jobNumber)}</h3><dl><dt>SKU / family</dt><dd>${escapeHtml(sku)}</dd><dt>Instruction</dt><dd>${escapeHtml(instructionId)} / Rev ${escapeHtml(revision)}</dd><dt>Planned quantity</dt><dd>${quantity}</dd><dt>Station / operator</dt><dd>${escapeHtml(clean(input.station) || "________________")} / ${escapeHtml(clean(input.operator) || "________________")}</dd><dt>Planned date</dt><dd>${escapeHtml(clean(input.date) || "________________")}</dd></dl></header><section><h4>Material issue record</h4><div class="generated-table-wrap"><table><thead><tr><th>Material</th><th>Identifier or lot</th><th>Verified by</th></tr></thead><tbody>${materialRows.map(([label, value]) => `<tr><td>${label}</td><td>${escapeHtml(value || "________________")}</td><td>________________</td></tr>`).join("")}</tbody></table></div></section><section><h4>In-process checkpoints</h4><div class="generated-table-wrap"><table><thead><tr><th>At completed unit</th><th>Pack / closure / label check</th><th>Initials</th><th>Exception reference</th></tr></thead><tbody>${checkpoints.map((value) => `<tr><td>${value}</td><td>□ checked</td><td>________</td><td>________________</td></tr>`).join("")}</tbody></table></div></section><section><h4>Closeout</h4><p>Completed quantity: __________ &nbsp; Scrapped/reworked: __________ &nbsp; Open exceptions: __________</p><p>Completion review: ________________________________________________</p></section><footer>Use the current controlled instruction and physical verification process. This generated traveler does not approve or certify the pack.</footer></article>`;
    return {
      primary: `${jobNumber} traveler with ${checkpoints.length} checkpoint${checkpoints.length === 1 ? "" : "s"}`,
      values: [["Planned units", String(quantity)], ["Checkpoint interval", String(interval)], ["Final checkpoint", String(checkpoints[checkpoints.length - 1])]],
      details
    };
  }

  const tools = {
    "pack-instruction-readiness": readiness,
    "pack-instruction-builder": instruction,
    "pack-variant-routing": routing,
    "pack-job-traveler": traveler
  };

  function formInput(form, id) {
    const element = form.elements.namedItem(id);
    return element ? element.value : "";
  }

  function collect(form, id) {
    if (id === "pack-instruction-builder") {
      return {
        sku: formInput(form, "sku"), instructionId: formInput(form, "instructionId"), revision: formInput(form, "revision"), effectiveDate: formInput(form, "effectiveDate"), owner: formInput(form, "owner"), container: formInput(form, "container"), materials: formInput(form, "materials"), closure: formInput(form, "closure"), labelPlacement: formInput(form, "labelPlacement"), verification: formInput(form, "verification"), exceptionAction: formInput(form, "exceptionAction"), notes: formInput(form, "notes"), steps: Array.from(form.querySelectorAll('[name="step"]')).map((element) => element.value)
      };
    }
    if (id === "pack-variant-routing") {
      return {
        family: formInput(form, "family"), baseRoute: formInput(form, "baseRoute"), rules: [1, 2, 3, 4].map((number) => ({ condition: formInput(form, `condition${number}`), route: formInput(form, `route${number}`), action: formInput(form, `action${number}`), priority: formInput(form, `priority${number}`) }))
      };
    }
    return Object.fromEntries(new FormData(form).entries());
  }

  function render(form, result) {
    const region = form.closest(".calculator-console");
    const panel = region.querySelector("[data-result]");
    panel.dataset.state = "ready";
    panel.querySelector("[data-result-primary]").textContent = result.primary;
    panel.querySelector("[data-result-values]").innerHTML = result.values.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
    panel.querySelector("[data-workflow-output]").innerHTML = result.details;
    panel.focus();
  }

  function reset(form) {
    const region = form.closest(".calculator-console");
    const panel = region.querySelector("[data-result]");
    region.querySelector("[data-error]").textContent = "";
    panel.dataset.state = "idle";
    panel.querySelector("[data-result-primary]").textContent = "Enter the workflow details to begin.";
    panel.querySelector("[data-result-values]").innerHTML = "";
    panel.querySelector("[data-workflow-output]").innerHTML = "";
  }

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll("[data-workflow-tool]").forEach((form) => {
        const id = form.dataset.workflowTool;
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const error = form.querySelector("[data-error]");
          error.textContent = "";
          try { render(form, tools[id](collect(form, id))); }
          catch (failure) { error.textContent = failure.message; }
        });
        form.addEventListener("reset", () => setTimeout(() => reset(form), 0));
      });
      document.querySelectorAll("[data-print-workflow]").forEach((button) => button.addEventListener("click", () => window.print()));
    });
  }

  return { tools, readiness, instruction, routing, traveler };
});
