export function buildMailSummary(entities) {
  const lines = [
    "Hej,",
    "",
    "Vi har granskat er SAML-metadata mot federationens tekniska profil och ser att f\u00f6ljande beh\u00f6ver justeras f\u00f6r att metadata ska uppfylla kraven.",
    "",
    "Nedan listas vad som beh\u00f6ver \u00e4ndras, varf\u00f6r det beh\u00f6vs och vilken referens som respektive avvikelse h\u00e4nvisar till.",
    "",
  ];

  for (const entity of entities) {
    lines.push(`Entitet: ${entity.entityId || "Ok\u00e4nd entitet"}`);
    lines.push(`Organisation: ${entity.organization || "-"}`);
    for (const finding of entity.findings) {
      lines.push(`- [${finding.severity}] ${finding.code}: ${finding.message}`);
      lines.push(`  \u00c5tg\u00e4rd: ${finding.suggestion || "-"}`);
      lines.push(`  Referens: ${finding.profileRef || "-"}`);
    }
    lines.push("");
  }

  lines.push("N\u00e4r \u00e4ndringarna \u00e4r genomf\u00f6rda beh\u00f6ver metadata publiceras p\u00e5 nytt s\u00e5 att en ny validering kan g\u00f6ras.");
  return lines.join("\n");
}
