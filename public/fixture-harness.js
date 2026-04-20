import { validateSamlXml } from "./validator.js";
import { FIXTURE_FILES, buildFixtureCase } from "./fixture-registry.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function loadFixture(path) {
  const response = await fetch(`/technical_profile_v1/${path}`);
  if (!response.ok) {
    throw new Error(`Kunde inte läsa fixture-filen (${response.status})`);
  }
  return response.text();
}

function gatherCodes(result) {
  const codes = new Set();
  for (const entity of result.entities) {
    for (const finding of entity.findings) {
      codes.add(finding.code);
    }
  }
  return codes;
}

function evaluate(caseDef, result) {
  const codes = gatherCodes(result);
  const missing = caseDef.shouldContain.filter((code) => !codes.has(code));
  const unexpected = caseDef.shouldNotContain.filter((code) => codes.has(code));
  return {
    ok: missing.length === 0 && unexpected.length === 0,
    missing,
    unexpected,
  };
}

function renderSummary(results) {
  const totals = results.reduce(
    (acc, item) => {
      acc.total += 1;
      acc[item.mode] += 1;
      if (item.mode === "assert") {
        acc[item.ok ? "passed" : "failed"] += 1;
      }
      return acc;
    },
    { total: 0, assert: 0, skip: 0, passed: 0, failed: 0 }
  );

  return `
    <div class="row g-3 mb-4">
      <div class="col-md-2"><div class="card shadow-sm"><div class="card-body"><div class="text-muted small">Totalt</div><div class="fs-3 fw-semibold">${totals.total}</div></div></div></div>
      <div class="col-md-2"><div class="card shadow-sm"><div class="card-body"><div class="text-muted small">Assert-fall</div><div class="fs-3 fw-semibold">${totals.assert}</div></div></div></div>
      <div class="col-md-2"><div class="card shadow-sm"><div class="card-body"><div class="text-muted small">Pass</div><div class="fs-3 fw-semibold text-success">${totals.passed}</div></div></div></div>
      <div class="col-md-2"><div class="card shadow-sm"><div class="card-body"><div class="text-muted small">Fail</div><div class="fs-3 fw-semibold text-danger">${totals.failed}</div></div></div></div>
      <div class="col-md-2"><div class="card shadow-sm"><div class="card-body"><div class="text-muted small">Skip</div><div class="fs-3 fw-semibold text-secondary">${totals.skip}</div></div></div></div>
    </div>
  `;
}

function renderRow(item) {
  if (item.mode === "skip") {
    return `
      <tr>
        <td><code>${escapeHtml(item.path)}</code></td>
        <td>${escapeHtml(item.section)}</td>
        <td><span class="badge text-bg-secondary">skip</span></td>
        <td>${escapeHtml(item.notes || "")}</td>
      </tr>
    `;
  }

  const details = [];
  if (item.error) {
    details.push(`<div class="text-danger">${escapeHtml(item.error)}</div>`);
  }
  if (item.missing?.length) {
    details.push(`<div><strong>Saknas:</strong> <code>${escapeHtml(item.missing.join(", "))}</code></div>`);
  }
  if (item.unexpected?.length) {
    details.push(`<div><strong>Ov&auml;ntade:</strong> <code>${escapeHtml(item.unexpected.join(", "))}</code></div>`);
  }
  if (item.notes) {
    details.push(`<div class="text-muted">${escapeHtml(item.notes)}</div>`);
  }

  return `
    <tr>
      <td><code>${escapeHtml(item.path)}</code></td>
      <td>${escapeHtml(item.section)}</td>
      <td><span class="badge ${item.ok ? "text-bg-success" : "text-bg-danger"}">${item.ok ? "pass" : "fail"}</span></td>
      <td>${details.join("")}</td>
    </tr>
  `;
}

async function run() {
  const status = document.getElementById("status");
  const summary = document.getElementById("summary");
  const resultsTable = document.getElementById("results");

  status.textContent = "Kör fixtures...";

  const results = [];
  for (const path of FIXTURE_FILES) {
    const caseDef = buildFixtureCase(path);
    if (caseDef.mode === "skip") {
      results.push(caseDef);
      continue;
    }

    try {
      const xml = await loadFixture(path);
      const validationResult = validateSamlXml(xml);
      const evaluation = evaluate(caseDef, validationResult);
      results.push({ ...caseDef, ...evaluation });
    } catch (error) {
      results.push({ ...caseDef, ok: false, error: error.message });
    }
  }

  summary.innerHTML = renderSummary(results);
  resultsTable.innerHTML = results.map(renderRow).join("");
  status.textContent = "Klar.";
}

run().catch((error) => {
  const status = document.getElementById("status");
  status.textContent = `Fel: ${error.message}`;
});
