import { buildMailSummary } from "./mail-summary.js";
import { validateSamlXml } from "./validator.js";

const form = document.getElementById("upload-form");
const fileInput = document.getElementById("metadata-file");
const submitButton = document.getElementById("submit-button");
const statusPanel = document.getElementById("status-panel");
const summaryPanel = document.getElementById("summary-panel");
const mailPanel = document.getElementById("mail-panel");
const resultsPanel = document.getElementById("results-panel");
const entityTemplate = document.getElementById("entity-template");

function showStatus(message, kind = "info") {
  statusPanel.classList.remove("hidden");
  statusPanel.innerHTML = `<div class="status ${kind}">${message}</div>`;
}

function renderSummary(result) {
  summaryPanel.classList.remove("hidden");
  summaryPanel.innerHTML = `
    <div class="card">
      <div class="summary-grid">
        <div class="metric"><div class="metric-label">Fil</div><div class="metric-value">${result.sourceName}</div></div>
        <div class="metric"><div class="metric-label">Fel</div><div class="metric-value">${result.errorCount}</div></div>
        <div class="metric"><div class="metric-label">Varningar</div><div class="metric-value">${result.warningCount}</div></div>
      </div>
      <p class="muted">Denna k\u00f6rs i din webbl\u00e4sare och sparar ingen information.</p>
    </div>
  `;
}

function renderMailSummary(result) {
  mailPanel.classList.remove("hidden");
  mailPanel.innerHTML = `
    <div class="card mail-box">
      <h2>Kopierbart underlag f\u00f6r e-post</h2>
      <p class="muted">Texten nedan \u00e4r avsedd som ett f\u00e4rdigt underlag f\u00f6r \u00e5terkoppling till den som ansvarar f\u00f6r metadata.</p>
      <textarea readonly>${result.mailSummary || ""}</textarea>
    </div>
  `;
}

function renderResults(result) {
  resultsPanel.classList.remove("hidden");
  resultsPanel.innerHTML = "";

  for (const entity of result.entities) {
    const fragment = entityTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".entity-card");
    const toggle = fragment.querySelector(".entity-toggle");
    const body = fragment.querySelector(".entity-body");
    const heading = fragment.querySelector(".entity-heading");
    const badges = fragment.querySelector(".entity-badges");
    const meta = fragment.querySelector(".entity-meta");
    const list = fragment.querySelector(".finding-list");
    const xml = fragment.querySelector(".xml-content");

    heading.textContent = entity.entityId || "Saknar entityID";
    badges.innerHTML = `
      <span class="badge error">${entity.errorCount} fel</span>
      <span class="badge warning">${entity.warningCount} varningar</span>
    `;
    meta.textContent = `${entity.organization || "-"} | ${entity.primaryType}`;

    toggle.addEventListener("click", () => {
      body.classList.toggle("hidden");
    });

    if (!entity.findings.length) {
      list.innerHTML = `<li><span class="badge ok">ok</span> Inga avvikelser hittades.</li>`;
    } else {
      for (const finding of entity.findings) {
        const li = document.createElement("li");
        li.innerHTML = `
          <div><span class="badge ${finding.severity}">${finding.severity}</span> <span class="finding-code">${finding.code}</span></div>
          <div>${finding.message}</div>
          <div class="finding-action"><strong>\u00c5tg\u00e4rd:</strong> ${finding.suggestion || "-"}</div>
          <div class="finding-ref"><strong>Referens:</strong> ${finding.profileRef || "-"}</div>
        `;
        list.appendChild(li);
      }
    }

    xml.textContent = entity.rawXml || "";
    if (!entity.rawXml) {
      fragment.querySelector(".xml-box").remove();
    }

    resultsPanel.appendChild(card);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = fileInput.files?.[0];
  if (!file) {
    showStatus("V\u00e4lj en metadatafil att analysera.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Analyserar...";
  showStatus("Analyserar metadatafilen lokalt i webbl\u00e4saren...", "info");
  summaryPanel.classList.add("hidden");
  mailPanel.classList.add("hidden");
  resultsPanel.classList.add("hidden");

  try {
    const xmlText = await file.text();
    if (!xmlText.trim()) {
      throw new Error("Filen \u00e4r tom.");
    }

    const result = validateSamlXml(xmlText);
    result.sourceName = file.name;
    result.mailSummary = buildMailSummary(result.entities);

    showStatus("Analysen \u00e4r klar.", "info");
    renderSummary(result);
    renderResults(result);
    renderMailSummary(result);
  } catch (error) {
    showStatus(error instanceof Error ? error.message : "Valideringen kunde inte genomf\u00f6ras.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Analysera fil";
  }
});
