"use strict";

const filmTests = require("./film-test-content.js");
const HUB = "/film-testing.html";
const href = (tool) => "/tools/" + tool.slug + ".html";
const link = (url, label) => '<a href="' + url + '">' + label + '</a>';

module.exports = function filmTestPages({ head, header, footer, breadcrumbs, esc, pageUrl, websiteSchema }) {
  const relatedHub = { label: "Film and seal tests", href: HUB };
  const relatedTools = { label: "Tools", href: "/tools.html" };
  function banner(trail, title, description, meta) {
    return '<header class="page-banner"><div class="page-shell">' + breadcrumbs(trail) +
      '<p class="dispatch-meta"><span>Film and seal tests</span><span>' + esc(meta) + '</span></p><h1>' +
      esc(title) + '</h1><p class="lede">' + esc(description) + '</p></div></header>';
  }
  function wrap(file, title, description, schema, body) {
    return head({ file, title, description, schema }).replace(/^[ \t]+$/gm, "") +
      header("Tools") + '<main id="main">' + body + '</main>' + footer();
  }
  function register() {
    return '<ol class="document-register">' + filmTests.map((tool, i) => '<li>' + link(href(tool),
      '<code>FT0' + (i + 1) + '</code><span><strong>' + esc(tool.title) + '</strong><small>' + esc(tool.output) + '</small></span>') + '</li>').join("") + '</ol>';
  }
  function hub() {
    const file = HUB.slice(1);
    const title = "Flexible Packaging Film & Seal Test Tools";
    const description = "Review measured film friction, tensile properties, dart impact results, and flexible-package seal peel data with four browser-based worksheets.";
    return wrap(file, title, description, websiteSchema(file, title, description),
      banner([relatedTools, { label: relatedHub.label }], title, description, "Four browser-only worksheets") +
      '<section class="content-section"><div class="page-shell"><div class="section-title"><span class="section-code">Film tests / 04 decisions</span><h2>Start with the reading you have</h2>' +
      '<p>Use friction readings to compare surface behavior, tensile readings to compare intact strips, dart outcomes to review impact response, and peel readings to review a finished seal.</p></div>' + register() + '</div></section>' +
      '<section class="operations-notice"><div class="page-shell operations-notice-grid"><div><h2>Keep the conditions with the result</h2><p>These tools interpret measurements, not package performance or standards compliance.</p></div>' +
      '<ol class="verify-list"><li><b>01 / Record</b>Keep the method, material lot, direction and conditioning with the source readings.</li><li><b>02 / Review</b>Check individual results before relying on a mean or comparing batches.</li><li><b>03 / Follow up</b>Use ' +
      link("/guides/packaging-trial-and-damage-review.html", "packaging trial and damage review") + ' for pack-level evidence.</li></ol></div></section>');
  }

  function page(tool) {
    const file = href(tool).slice(1);
    const { title, description } = tool;
    const url = pageUrl(file);
    const trail = [relatedTools, relatedHub, { label: title }];
    const schema = { "@context": "https://schema.org", "@graph": [
      { "@type": "WebApplication", name: title, applicationCategory: "BusinessApplication", operatingSystem: "Any", url, description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "BreadcrumbList", itemListElement: [{ label: "Home", href: "/" }, ...trail].map(({ label, href }, i) => (
        { "@type": "ListItem", position: i + 1, name: label, item: href ? pageUrl(href === "/" ? "index.html" : href.slice(1)) : url }
      )) }
    ] };
    const fields = tool.fields.map(({ name, label, options, value }) => {
      const control = options ? '<select id="' + name + '" name="' + name + '">' + options.map((option) => '<option>' + esc(option) + '</option>').join("") + '</select>' :
        '<input type="text" inputmode="decimal" id="' + name + '" name="' + name + '" maxlength="32" value="' + esc(value) + '">';
      return '<div class="field"><label for="' + name + '">' + esc(label) + '</label>' + control + '</div>';
    }).join("");
    const sections = [
      ["solves", "What this tool solves", tool.solves], ["inputs", "How to choose the inputs", tool.inputs],
      ["method", "How the calculation works", tool.method], ["example", "Worked example", tool.example],
      ["interpretation", "How to interpret the output", tool.interpretation],
      ["mistakes", "Common mistakes", tool.mistakes], ["limits", "Assumptions and limitations", tool.limits],
      ["workflow", "Related workflow and sources", "Check the method context for " + tool.type.toLowerCase() + " before you compare measurements."]
    ].map(([id, label, copy]) => '<h2 id="' + id + '">' + label + '</h2>' + (Array.isArray(copy) ?
      '<ul class="check-list">' + copy.map((item) => '<li>' + esc(item) + '</li>').join("") + '</ul>' : '<p>' + esc(copy) + '</p>')).join("");
    const links = [[HUB, "Film and seal test tools"], ...tool.related.map((slug) => {
      const entry = filmTests.find((item) => item.slug === slug);
      return [href(entry), entry.title];
    }), ["/tools.html", "All tools"]];
    const sources = [tool.source, tool.methodSource].filter(Boolean).map(([label, url]) => link(esc(url), esc(label))).join(" · ");
    return wrap(file, title, description, schema, banner(trail, title, description, tool.type) +
      '<section class="calculator-console"><div class="page-shell"><div class="manifest-panel"><div class="manifest-header"><span>Lab readings</span><span>Input stays in this browser</span></div>' +
      '<form class="calculator-form workflow-form" data-film-test="' + tool.slug + '" novalidate><div class="manifest-grid">' + fields +
      '<div class="field field-wide"><label for="readings">' + esc(tool.rowLabel) + '</label><textarea id="readings" name="readings" rows="5" maxlength="12000" spellcheck="false" aria-describedby="row-help">' + esc(tool.readings) + '</textarea>' +
      '<small id="row-help">Replace the example with one reading per line. Use commas or tabs between values, decimal points, and no header row.</small></div></div>' +
      '<div class="form-actions"><button type="submit" class="button button-primary" disabled data-film-submit>Analyze readings</button><button type="reset" class="button button-quiet">Reset</button></div>' +
      '<p class="form-error" data-error role="alert"></p></form></div><noscript><p>Enable JavaScript to analyze readings locally. The method and example are available below.</p></noscript>' +
      '<section class="output-strip" data-film-result data-state="idle" aria-label="Test summary"><div class="output-header"><span>Test summary</span><span>Review only</span></div>' +
      '<div class="output-body" aria-live="polite"><div><p class="output-kicker">Primary output</p><p class="output-primary" data-result-primary>Review the example or enter your own readings.</p></div><dl class="output-values" data-result-values></dl></div>' +
      '<div class="workflow-output"><p data-film-note></p><details data-film-sample-panel hidden><summary>Show individual results or mass levels</summary><dl class="output-values" data-film-samples></dl></details></div></section></div></section>' +
      '<section class="article-zone"><div class="page-shell article-shell"><article class="article-body">' + sections +
      '<p>' + sources + '</p><ul class="related-register">' + links.map(([url, label]) => '<li>' + link(url, esc(label)) + '</li>').join("") +
      '</ul><p class="meta-line">Last reviewed: November 6, 2026</p></article></div></section><script src="/assets/film-tests.js?v=20261106-film-tests" defer></script>');
  }
  return { hub, page, register };
};
