"use strict";

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://packpreptools.com";
const EXPECTED_GA = "G-XR7JWJ36CD";
const errors = [];

function fail(message) {
  errors.push(message);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function rel(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

function matches(source, expression) {
  return [...source.matchAll(expression)];
}

function targetFor(url) {
  const clean = url.split("#")[0].split("?")[0];
  if (clean === "/") return path.join(ROOT, "index.html");
  return path.join(ROOT, clean.replace(/^\//, ""));
}

function pageUrlForQa(file) {
  return file === "index.html" ? `${SITE}/` : `${SITE}/${file}`;
}

const allFiles = walk(ROOT);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
if (htmlFiles.length < 62) fail(`Expected at least 62 public HTML files; found ${htmlFiles.length}.`);
const toolFiles = htmlFiles.filter((file) => rel(file).startsWith("tools/"));
const guideFiles = htmlFiles.filter((file) => rel(file).startsWith("guides/"));
const referenceFiles = htmlFiles.filter((file) => rel(file).startsWith("reference/"));
if (toolFiles.length < 32) fail(`Expected at least 32 calculators; found ${toolFiles.length}.`);
if (guideFiles.length < 12) fail(`Expected at least 12 guides; found ${guideFiles.length}.`);
if (referenceFiles.length < 10) fail(`Expected at least 10 reference pages; found ${referenceFiles.length}.`);

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const indexableCanonicals = [];

for (const file of htmlFiles) {
  const name = rel(file);
  const html = fs.readFileSync(file, "utf8");
  if (!/^<!doctype html>/i.test(html) || !/<html\b/i.test(html) || !/<head\b/i.test(html) || !/<body\b/i.test(html)) {
    fail(`${name}: incomplete HTML document structure.`);
  }

  const title = matches(html, /<title>([\s\S]*?)<\/title>/gi);
  const description = matches(html, /<meta\s+name="description"\s+content="([^"]+)"/gi);
  const canonical = matches(html, /<link\s+rel="canonical"\s+href="([^"]+)"/gi);
  const h1 = matches(html, /<h1\b[^>]*>/gi);
  if (title.length !== 1) fail(`${name}: expected one title, found ${title.length}.`);
  if (description.length !== 1) fail(`${name}: expected one meta description, found ${description.length}.`);
  if (canonical.length !== 1) fail(`${name}: expected one canonical, found ${canonical.length}.`);
  if (h1.length !== 1) fail(`${name}: expected one H1, found ${h1.length}.`);
  if (!/<meta\s+name="viewport"/i.test(html)) fail(`${name}: viewport missing.`);
  if (!/<meta\s+property="og:title"/i.test(html) || !/<meta\s+property="og:description"/i.test(html) || !/<meta\s+property="og:url"/i.test(html)) fail(`${name}: Open Graph metadata incomplete.`);
  if (!/<link\s+rel="icon"[^>]+\/favicon\.png/i.test(html)) fail(`${name}: favicon missing.`);

  if (title[0]) {
    const value = title[0][1];
    if (titles.has(value)) fail(`${name}: duplicate title with ${titles.get(value)}.`);
    titles.set(value, name);
  }
  if (description[0]) {
    const value = description[0][1];
    if (descriptions.has(value)) fail(`${name}: duplicate description with ${descriptions.get(value)}.`);
    descriptions.set(value, name);
  }
  if (canonical[0]) {
    const value = canonical[0][1];
    if (canonicals.has(value)) fail(`${name}: duplicate canonical with ${canonicals.get(value)}.`);
    canonicals.set(value, name);
    const expected = name === "index.html" ? `${SITE}/` : `${SITE}/${name}`;
    if (value !== expected) fail(`${name}: canonical is ${value}, expected ${expected}.`);
    if (name !== "404.html") indexableCanonicals.push(value);
  }

  const gaIds = matches(html, /G-[A-Z0-9]+/g).map((match) => match[0]);
  if (!gaIds.includes(EXPECTED_GA)) fail(`${name}: GA4 ID missing.`);
  const wrongGa = gaIds.filter((id) => id !== EXPECTED_GA);
  if (wrongGa.length) fail(`${name}: unexpected GA4 ID ${[...new Set(wrongGa)].join(", ")}.`);

  const ids = matches(html, /\sid="([^"]+)"/gi).map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) fail(`${name}: duplicate IDs ${[...new Set(duplicateIds)].join(", ")}.`);

  const jsonLd = matches(html, /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  if (jsonLd.length !== 1) fail(`${name}: expected one JSON-LD block.`);
  jsonLd.forEach((block) => {
    try { JSON.parse(block[1]); } catch (error) { fail(`${name}: invalid JSON-LD (${error.message}).`); }
  });

  if (!/<header\s+class="site-header"/i.test(html) || !/<footer\s+class="site-footer"/i.test(html)) fail(`${name}: shared header or footer missing.`);
  if (name === "404.html" && !/<meta\s+name="robots"\s+content="noindex,follow"/i.test(html)) fail("404.html: noindex missing.");
  ["/tools.html", "/guides.html", "/reference.html", "/about.html", "/contact.html", "/privacy.html"].forEach((href) => {
    if (!html.includes(`href="${href}"`)) fail(`${name}: required navigation link ${href} missing.`);
  });

  const urls = matches(html, /(?:href|src)="([^"]+)"/gi).map((match) => match[1]);
  for (const url of urls) {
    if (url.startsWith("#") || url.startsWith("mailto:") || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) continue;
    if (!url.startsWith("/")) {
      fail(`${name}: non-root-relative internal reference ${url}.`);
      continue;
    }
    const target = targetFor(url);
    if (!fs.existsSync(target)) fail(`${name}: broken internal reference ${url}.`);
  }

  if (/(localhost|127\.0\.0\.1|example\.com|makerprinttools|lorem ipsum|\bTODO\b|placeholder)/i.test(html)) {
    fail(`${name}: temporary, foreign-project, or placeholder text found.`);
  }
  if (/(workbench|on the bench|bench sequence|packing bench calculators|field notes|start with the package decision in front of you|measure the pack\. plan the materials\.)/i.test(html)) {
    fail(`${name}: retired creator-lab or bench language found.`);
  }
  if (/(hero-grid|specimen|section-heading|tool-link|document-link|calculator-layout|worksheet-head|result-sheet|section-ink|workflow-step)/i.test(html)) {
    fail(`${name}: retired layout class found.`);
  }
}

const scriptFiles = allFiles.filter((file) => file.endsWith(".js"));
for (const file of scriptFiles) {
  try {
    childProcess.execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (error) {
    fail(`${rel(file)}: JavaScript syntax error.`);
  }
}

const stylesheet = fs.readFileSync(path.join(ROOT, "assets", "styles.css"), "utf8");
["#25473c", "#163128", "#e86f3d", "#f4f0e6", ".specimen", ".calculator-layout", ".result-sheet"].forEach((pattern) => {
  if (stylesheet.toLowerCase().includes(pattern.toLowerCase())) fail(`assets/styles.css: retired visual pattern ${pattern} found.`);
});
if (!stylesheet.includes("--navy-950") || !stylesheet.includes("--blue-600") || !stylesheet.includes("--amber-600")) {
  fail("assets/styles.css: dispatch-control palette tokens missing.");
}

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const sitemapUrls = matches(sitemap, /<loc>([^<]+)<\/loc>/g).map((match) => match[1]);
if (sitemapUrls.length < 61) fail(`sitemap.xml: expected at least 61 URLs; found ${sitemapUrls.length}.`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("sitemap.xml: duplicate URL.");
if (sitemapUrls.includes(`${SITE}/404.html`)) fail("sitemap.xml: 404 must not be listed.");
for (const url of indexableCanonicals) if (!sitemapUrls.includes(url)) fail(`sitemap.xml: missing ${url}.`);
for (const url of sitemapUrls) if (!indexableCanonicals.includes(url)) fail(`sitemap.xml: URL has no matching indexable HTML ${url}.`);

const robots = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt: sitemap link missing or incorrect.");
const llms = fs.readFileSync(path.join(ROOT, "llms.txt"), "utf8");
for (const file of [...toolFiles, ...guideFiles, ...referenceFiles]) {
  const url = pageUrlForQa(rel(file));
  if (!llms.includes(url)) fail(`llms.txt: missing ${url}.`);
}
const toolsHub = fs.readFileSync(path.join(ROOT, "tools.html"), "utf8");
for (const file of toolFiles) if (!toolsHub.includes(`href="/${rel(file)}"`)) fail(`tools.html: calculator ${rel(file)} is unreachable.`);
const guidesHub = fs.readFileSync(path.join(ROOT, "guides.html"), "utf8");
for (const file of guideFiles) if (!guidesHub.includes(`href="/${rel(file)}"`)) fail(`guides.html: guide ${rel(file)} is unreachable.`);
const referenceHub = fs.readFileSync(path.join(ROOT, "reference.html"), "utf8");
for (const file of referenceFiles) if (!referenceHub.includes(`href="/${rel(file)}"`)) fail(`reference.html: reference ${rel(file)} is unreachable.`);
if (fs.readFileSync(path.join(ROOT, "CNAME"), "utf8").trim() !== "packpreptools.com") fail("CNAME: domain is incorrect.");

if (errors.length) {
  console.error(`AUTO QA FAIL (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`AUTO QA PASS — ${htmlFiles.length} HTML, ${sitemapUrls.length} sitemap URLs, ${scriptFiles.length} JavaScript files`);
