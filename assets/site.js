(function () {
  "use strict";

  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-site-nav]");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.dataset.open = String(!open);
    });
  }

  document.querySelectorAll("[data-calculator]").forEach(function (form) {
    const calculatorId = form.dataset.calculator;
    const calculate = window.PackPrepCalculators &&
      window.PackPrepCalculators.calculators[calculatorId];
    const result = form.closest(".calculator-console").querySelector("[data-result]");
    const resultPrimary = result && result.querySelector("[data-result-primary]");
    const resultValues = result && result.querySelector("[data-result-values]");
    const error = form.querySelector("[data-error]");

    function clearResult() {
      if (error) error.textContent = "";
      if (resultPrimary) resultPrimary.textContent = "Enter your package details to begin.";
      if (resultValues) resultValues.innerHTML = "";
      if (result) result.dataset.state = "idle";
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!calculate) return;
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const output = calculate(data);
        if (error) error.textContent = "";
        resultPrimary.textContent = output.primary;
        resultValues.innerHTML = Object.entries(output.values)
          .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
          .join("");
        result.dataset.state = "ready";
        result.focus({ preventScroll: true });
      } catch (calculationError) {
        if (error) error.textContent = calculationError.message;
        resultPrimary.textContent = "Check the highlighted inputs.";
        resultValues.innerHTML = "";
        result.dataset.state = "error";
      }
    });

    form.addEventListener("reset", function () {
      window.setTimeout(clearResult, 0);
    });
  });
})();
