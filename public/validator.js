const NS = {
  md: "urn:oasis:names:tc:SAML:2.0:metadata",
  mdui: "urn:oasis:names:tc:SAML:metadata:ui",
  mdattr: "urn:oasis:names:tc:SAML:metadata:attribute",
  saml: "urn:oasis:names:tc:SAML:2.0:assertion",
  shibmd: "urn:mace:shibboleth:metadata:1.0",
  xml: "http://www.w3.org/XML/1998/namespace",
};

const HTTP_REDIRECT = "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect";
const URI_NAMEFORMAT = "urn:oasis:names:tc:SAML:2.0:attrname-format:uri";
const DISCOURAGED_ALGORITHM_MARKERS = ["md5", "sha1", "rsa-1_5"];
const OPENFED_OPT_IN_ATTRIBUTE = "https://id.openfed.se/entityattributes/opt-in";
const OPENFED_OPT_IN_VALUE = "https://id.openfed.se/entityattributes/opt-in/yes";
const OPENFED_OPT_IN_PROFILE_REF = "Entitetsattribut f\u00f6r opt-in \u00e4r obligatoriskt enligt federationspolicy f\u00f6r att inkluderas i metadatafeeden f\u00f6r Federation f\u00f6r kommunal verksamhet och \u00c5tkomstl\u00f6sning f\u00f6r KLASSA";

const ACTIONS = {
  missing_entity_id: "Ange ett `entityID` p\u00e5 `EntityDescriptor`.",
  entity_id_too_long: "Kort ned `entityID` s\u00e5 att det inte \u00f6verstiger 256 tecken.",
  invalid_entity_id_scheme: "Anv\u00e4nd ett `entityID` som inleds med `https://`, `http://` eller `urn:`.",
  legacy_urn_entity_id: "\u00d6verv\u00e4g att anv\u00e4nda ett HTTPS-baserat `entityID` f\u00f6r nya implementationer.",
  missing_websso_descriptor: "L\u00e4gg till `IDPSSODescriptor` och/eller `SPSSODescriptor` beroende p\u00e5 entitetens roll.",
  missing_mdui: "L\u00e4gg till ett `mdui:UIInfo`-block med `DisplayName`, `Description` och `Logo`.",
  missing_displayname: "L\u00e4gg till `mdui:DisplayName` i metadata.",
  missing_description: "L\u00e4gg till `mdui:Description` i metadata.",
  missing_logo: "L\u00e4gg till `mdui:Logo` i metadata.",
  mdui_missing_lang: "Komplettera MDUI-elementen med `xml:lang`.",
  duplicate_mdui_lang: "Ta bort dubblerade spr\u00e5kvarianter i MDUI.",
  mdui_missing_en: "Komplettera MDUI med engelska (`en`).",
  mdui_missing_sv: "Komplettera MDUI med svenska (`sv`).",
  inconsistent_mdui_langs: "S\u00e4kerst\u00e4ll att samma spr\u00e5k anv\u00e4nds konsekvent i samtliga MDUI-element.",
  logo_not_https: "Publicera logotypen via HTTPS och uppdatera `mdui:Logo`.",
  embedded_logo_forbidden: "Anv\u00e4nd en extern logotyp-URL i st\u00e4llet f\u00f6r inb\u00e4ddad data.",
  missing_organization: "L\u00e4gg till ett fullst\u00e4ndigt `md:Organization`-block.",
  missing_organizationname: "L\u00e4gg till `md:OrganizationName`.",
  missing_organizationdisplayname: "L\u00e4gg till `md:OrganizationDisplayName`.",
  missing_organizationurl: "L\u00e4gg till `md:OrganizationURL`.",
  organization_missing_lang: "Komplettera `Organization`-elementen med `xml:lang`.",
  duplicate_organization_lang: "Ta bort dubblerade spr\u00e5kvarianter i `Organization`.",
  organization_missing_en: "Komplettera `Organization` med engelska (`en`).",
  organization_missing_sv: "Komplettera `Organization` med svenska (`sv`).",
  inconsistent_organization_langs: "S\u00e4kerst\u00e4ll att samma spr\u00e5k anv\u00e4nds konsekvent i samtliga `Organization`-element.",
  missing_organization_name: "Komplettera `Organization` med fullst\u00e4ndiga namnuppgifter.",
  missing_administrative_contact: "L\u00e4gg till `ContactPerson` av typen `administrative`.",
  missing_technical_contact: "L\u00e4gg till `ContactPerson` av typen `technical`.",
  missing_support_contact: "L\u00e4gg till `ContactPerson` av typen `support`.",
  duplicate_administrative_contact: "Beh\u00e5ll bara en `ContactPerson` av typen `administrative`.",
  duplicate_technical_contact: "Beh\u00e5ll bara en `ContactPerson` av typen `technical`.",
  duplicate_support_contact: "Beh\u00e5ll bara en `ContactPerson` av typen `support`.",
  contact_email_must_use_mailto: "Anv\u00e4nd `mailto:` i `EmailAddress`.",
  missing_error_url: "S\u00e4tt `errorURL` p\u00e5 `IDPSSODescriptor` till en giltig felsida.",
  missing_scope: "L\u00e4gg till minst ett `shibmd:Scope`-v\u00e4rde som motsvarar organisationens dom\u00e4n.",
  scope_regexp_must_be_false: "S\u00e4tt `regexp=\"false\"` eller ta bort attributet p\u00e5 `shibmd:Scope`.",
  scope_must_not_be_regex: "Anv\u00e4nd ett konkret dom\u00e4nv\u00e4rde i `shibmd:Scope`, inte ett regulj\u00e4rt uttryck.",
  missing_supported_attributes: "Deklarera supported attributes i metadata f\u00f6r IdP:n.",
  supported_attribute_missing_name: "Komplettera supported attribute med `Name`.",
  supported_attribute_missing_friendlyname: "Komplettera supported attribute med `FriendlyName`.",
  supported_attribute_invalid_nameformat: "S\u00e4tt `NameFormat` till SAML URI-format f\u00f6r supported attribute.",
  missing_sso_endpoint: "L\u00e4gg till `SingleSignOnService` f\u00f6r IdP:n.",
  missing_acs: "L\u00e4gg till `AssertionConsumerService` f\u00f6r RP:n.",
  non_https_endpoint: "\u00c4ndra endpoint-URL:er s\u00e5 att de anv\u00e4nder HTTPS.",
  acs_redirect_forbidden: "Anv\u00e4nd inte HTTP-Redirect f\u00f6r `AssertionConsumerService`.",
  missing_attribute_consuming_service: "L\u00e4gg till minst ett `AttributeConsumingService`-element.",
  missing_service_name: "L\u00e4gg till `ServiceName` i `AttributeConsumingService`.",
  missing_service_description: "L\u00e4gg till `ServiceDescription` i `AttributeConsumingService`.",
  attributeconsumingservice_missing_lang: "Komplettera `ServiceName` och `ServiceDescription` med `xml:lang`.",
  duplicate_attributeconsumingservice_lang: "Ta bort dubblerade spr\u00e5kvarianter i `AttributeConsumingService`.",
  attributeconsumingservice_missing_en: "Komplettera `AttributeConsumingService` med engelska (`en`).",
  attributeconsumingservice_missing_sv: "Komplettera `AttributeConsumingService` med svenska (`sv`).",
  inconsistent_attributeconsumingservice_langs: "S\u00e4kerst\u00e4ll att samma spr\u00e5k anv\u00e4nds konsekvent i `AttributeConsumingService`.",
  missing_requested_attributes: "L\u00e4gg till minst ett `RequestedAttribute`.",
  requested_attribute_missing_name: "Komplettera `RequestedAttribute` med `Name`.",
  requested_attribute_missing_friendlyname: "Komplettera `RequestedAttribute` med `FriendlyName`.",
  requested_attribute_invalid_nameformat: "S\u00e4tt `NameFormat` till SAML URI-format f\u00f6r `RequestedAttribute`.",
  role_descriptor_forbidden: "Ta bort `RoleDescriptor`, som inte ska publiceras enligt profilen.",
  discouraged_algorithm: "Byt till moderna algoritmer och undvik SHA-1, MD5 eller RSA1_5.",
  missing_openfed_opt_in: "L\u00e4gg till entitetsattributet `https://id.openfed.se/entityattributes/opt-in` med v\u00e4rdet `https://id.openfed.se/entityattributes/opt-in/yes` i `md:Extensions`.",
  invalid_openfed_opt_in_nameformat: "S\u00e4tt `NameFormat` till `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`.",
  invalid_openfed_opt_in_value: "S\u00e4tt attributv\u00e4rdet till `https://id.openfed.se/entityattributes/opt-in/yes`.",
};

function text(node) {
  return node?.textContent?.trim() || "";
}

function localName(node) {
  return node?.localName || "";
}

function xmlLang(node) {
  return node?.getAttributeNS(NS.xml, "lang") || node?.getAttribute("xml:lang") || "";
}

function directChildrenByNs(parent, ns, name) {
  return Array.from(parent?.childNodes || []).filter((node) => node.nodeType === 1 && node.namespaceURI === ns && node.localName === name);
}

function descendantsByNs(parent, ns, name) {
  return Array.from(parent?.getElementsByTagNameNS(ns, name) || []);
}

function descendantsByLocalNames(parent, names) {
  return Array.from(parent?.getElementsByTagName("*") || []).filter((node) => names.includes(localName(node)));
}

function firstDirectText(parent, ns, name) {
  return text(directChildrenByNs(parent, ns, name)[0]);
}

function getEntityDescriptors(doc) {
  const root = doc.documentElement;
  return root.localName === "EntityDescriptor" ? [root] : descendantsByNs(root, NS.md, "EntityDescriptor");
}

function getRawXml(node) {
  return new XMLSerializer().serializeToString(node);
}

function roleRef(entityTypes, idpRef, spRef) {
  if (entityTypes.includes("idp") && !entityTypes.includes("sp")) return idpRef;
  if (entityTypes.includes("sp") && !entityTypes.includes("idp")) return spRef;
  if (entityTypes.includes("idp") && entityTypes.includes("sp")) return `${idpRef} / ${spRef}`;
  return idpRef || spRef || "SAML WebSSO Technology Profile";
}

function roleLabel(idpDescriptor, spDescriptor) {
  if (idpDescriptor && !spDescriptor) return "Identity Provider";
  if (spDescriptor && !idpDescriptor) return "Relying Party";
  return "Metadata";
}

function addFinding(findings, severity, code, message, profileRef) {
  findings.push({
    severity,
    code,
    message: simplifyMessage(message),
    profileRef,
    suggestion: ACTIONS[code] || "Komplettera metadataelementet enligt den referens som anges i avvikelsen.",
  });
}

function simplifyMessage(message) {
  return message
    .replaceAll(", vilket kr\u00e4vs enligt profilen.", ".")
    .replaceAll(", vilket avviker fr\u00e5n profilens krav.", ".")
    .replaceAll(" f\u00f6r att uppfylla profilens krav.", "")
    .replaceAll(", vilket inte \u00e4r till\u00e5tet enligt profilen.", ".")
    .replaceAll(", vilket inte \u00e4r f\u00f6renligt med profilen.", ".")
    .replaceAll(", vilket avr\u00e5ds eller \u00e4r f\u00f6r\u00e5ldrad enligt profilen.", ".")
    .replaceAll(" enligt profilen", "")
    .replace(/\.\./g, ".")
    .trim();
}

function validateLangPresence(findings, nodes, profileRef, label) {
  const codeStem = label.toLowerCase();
  if (!nodes.length) {
    addFinding(findings, "error", `missing_${codeStem}`, `Metadata inneh\u00e5ller inte ${label} med spr\u00e5kattribut enligt profilens krav.`, profileRef);
    return;
  }

  const perName = new Map();
  const allLangs = new Set();
  for (const node of nodes) {
    const name = localName(node);
    const lang = xmlLang(node) || null;
    if (!perName.has(name)) perName.set(name, []);
    perName.get(name).push(lang);
    if (lang) allLangs.add(lang);
  }

  for (const [name, langs] of perName.entries()) {
    const langValues = langs.filter(Boolean);
    if (langs.some((lang) => !lang)) {
      addFinding(findings, "error", `${codeStem}_missing_lang`, `${name} saknar xml:lang, vilket kr\u00e4vs enligt profilen.`, profileRef);
    }
    if (name !== "Logo" && langValues.length !== new Set(langValues).size) {
      addFinding(findings, "error", `duplicate_${codeStem}_lang`, `${name} inneh\u00e5ller dubblerade spr\u00e5kv\u00e4rden, vilket inte \u00e4r till\u00e5tet enligt profilen.`, profileRef);
    }
  }

  if (!allLangs.has("en")) {
    addFinding(findings, "error", `${codeStem}_missing_en`, `${label} beh\u00f6ver finnas p\u00e5 engelska (\`en\`) f\u00f6r att uppfylla profilens krav.`, profileRef);
  }
  if (!allLangs.has("sv")) {
    addFinding(findings, "error", `${codeStem}_missing_sv`, `${label} beh\u00f6ver finnas p\u00e5 svenska (\`sv\`) f\u00f6r att uppfylla profilens krav.`, profileRef);
  }

  for (const lang of allLangs) {
    for (const [name, langs] of perName.entries()) {
      if (name === "Logo") continue;
      if (!langs.filter(Boolean).includes(lang)) {
        addFinding(findings, "error", `inconsistent_${codeStem}_langs`, `Spr\u00e5ket ${lang} anv\u00e4nds inte konsekvent f\u00f6r alla ${label}-element, vilket avviker fr\u00e5n profilens krav.`, profileRef);
      }
    }
  }
}

function validateEntity(entity) {
  const findings = [];
  const entityId = entity.getAttribute("entityID") || "";
  const organizationNode = directChildrenByNs(entity, NS.md, "Organization")[0] || null;
  const organization = firstDirectText(organizationNode, NS.md, "OrganizationName") || firstDirectText(organizationNode, NS.md, "OrganizationDisplayName") || null;
  const idpDescriptor = directChildrenByNs(entity, NS.md, "IDPSSODescriptor")[0] || null;
  const spDescriptor = directChildrenByNs(entity, NS.md, "SPSSODescriptor")[0] || null;
  const entityTypes = [];
  if (idpDescriptor) entityTypes.push("idp");
  if (spDescriptor) entityTypes.push("sp");
  if (!entityTypes.length) entityTypes.push("unknown");
  const primaryType = entityTypes.length > 1 ? "both" : entityTypes[0];

  if (!entityId) {
    addFinding(findings, "error", "missing_entity_id", "Metadata saknar `entityID`, vilket kr\u00e4vs enligt profilen.", roleRef(entityTypes, "2.1.2 entityID", "3.1.2 entityID"));
  } else {
    if (entityId.length > 256) {
      addFinding(findings, "error", "entity_id_too_long", "`entityID` \u00f6verstiger 256 tecken, vilket inte \u00e4r f\u00f6renligt med profilen.", roleRef(entityTypes, "2.1.2 entityID", "3.1.2 entityID"));
    }
    if (!/^(https?:\/\/|urn:)/.test(entityId)) {
      addFinding(findings, "error", "invalid_entity_id_scheme", "`entityID` anv\u00e4nder inte ett till\u00e5tet prefix (`https://`, `http://` eller `urn:`).", roleRef(entityTypes, "2.1.2 entityID", "3.1.2 entityID"));
    } else if (entityId.startsWith("urn:")) {
      addFinding(findings, "warning", "legacy_urn_entity_id", "`entityID` anv\u00e4nder URN-format. Det \u00e4r en \u00e4ldre form som inte b\u00f6r anv\u00e4ndas f\u00f6r nya entiteter.", roleRef(entityTypes, "2.1.2 entityID", "3.1.2 entityID"));
    }
  }

  if (entityTypes[0] === "unknown") {
    addFinding(findings, "error", "missing_websso_descriptor", "Metadata inneh\u00e5ller varken `IDPSSODescriptor` eller `SPSSODescriptor` och kan d\u00e4rf\u00f6r inte behandlas enligt WebSSO-profilen.", "SAML WebSSO Technology Profile");
  }

  const mduiRef = roleRef(entityTypes, "2.1.5 MDUI", "3.1.3 MDUI");
  const mduiLangRef = roleRef(entityTypes, "2.1.1 Language attributes", "3.1.1 Language attributes");
  const uiInfo = descendantsByNs(entity, NS.mdui, "UIInfo")[0] || null;
  if (!uiInfo) {
    addFinding(findings, "error", "missing_mdui", "Metadata inneh\u00e5ller inte MDUI/UIInfo, vilket kr\u00e4vs enligt profilen.", mduiRef);
  } else {
    const displayNames = descendantsByNs(uiInfo, NS.mdui, "DisplayName");
    const descriptions = descendantsByNs(uiInfo, NS.mdui, "Description");
    const logos = descendantsByNs(uiInfo, NS.mdui, "Logo");
    validateLangPresence(findings, [...displayNames, ...descriptions, ...logos], mduiLangRef, "MDUI");

    if (!displayNames.length) addFinding(findings, "error", "missing_displayname", "MDUI/UIInfo saknar DisplayName, vilket kr\u00e4vs enligt profilen.", mduiRef);
    if (!descriptions.length) addFinding(findings, "error", "missing_description", "MDUI/UIInfo saknar Description, vilket kr\u00e4vs enligt profilen.", mduiRef);
    if (!logos.length) addFinding(findings, "error", "missing_logo", "MDUI/UIInfo saknar Logo, vilket kr\u00e4vs enligt profilen.", mduiRef);

    for (const logo of logos) {
      const value = text(logo);
      if (value && !value.startsWith("https://")) {
        addFinding(findings, "error", "logo_not_https", "MDUI Logo anv\u00e4nder inte en HTTPS-URL, vilket kr\u00e4vs enligt profilen.", mduiRef);
      }
      if (value.startsWith("data:")) {
        addFinding(findings, "error", "embedded_logo_forbidden", "MDUI Logo \u00e4r inb\u00e4ddad i metadata, vilket inte \u00e4r till\u00e5tet enligt profilen.", mduiRef);
      }
    }
  }

  const orgRef = roleRef(entityTypes, "2.1.9 Organization", "3.1.7 Organization");
  if (!organizationNode) {
    addFinding(findings, "error", "missing_organization", "Metadata inneh\u00e5ller inte n\u00e5got Organization-element, vilket kr\u00e4vs enligt profilen.", orgRef);
  } else {
    const names = directChildrenByNs(organizationNode, NS.md, "OrganizationName");
    const displayNames = directChildrenByNs(organizationNode, NS.md, "OrganizationDisplayName");
    const urls = directChildrenByNs(organizationNode, NS.md, "OrganizationURL");
    if (!names.length) addFinding(findings, "error", "missing_organizationname", "Organization saknar OrganizationName, vilket kr\u00e4vs enligt profilen.", orgRef);
    if (!displayNames.length) addFinding(findings, "error", "missing_organizationdisplayname", "Organization saknar OrganizationDisplayName, vilket kr\u00e4vs enligt profilen.", orgRef);
    if (!urls.length) addFinding(findings, "error", "missing_organizationurl", "Organization saknar OrganizationURL, vilket kr\u00e4vs enligt profilen.", orgRef);
    validateLangPresence(findings, [...names, ...displayNames, ...urls], orgRef, "Organization");
  }

  if (!organization) {
    addFinding(findings, "error", "missing_organization_name", `${roleLabel(idpDescriptor, spDescriptor)} saknar fullst\u00e4ndiga namnuppgifter i Organization, vilket kr\u00e4vs enligt profilen.`, orgRef);
  }

  const contactRef = roleRef(entityTypes, "2.1.10 ContactPerson", "3.1.8 ContactPerson");
  const contacts = directChildrenByNs(entity, NS.md, "ContactPerson");
  const contactCounts = new Map();
  let invalidMailtoCount = 0;
  for (const contact of contacts) {
    const type = contact.getAttribute("contactType") || "";
    contactCounts.set(type, (contactCounts.get(type) || 0) + 1);
    const email = firstDirectText(contact, NS.md, "EmailAddress");
    if (email && !email.startsWith("mailto:")) {
      invalidMailtoCount += 1;
    }
  }
  if (invalidMailtoCount === 1) {
    addFinding(findings, "error", "contact_email_must_use_mailto", "Ett `ContactPerson/EmailAddress` anv\u00e4nder inte formatet `mailto:`.", contactRef);
  } else if (invalidMailtoCount > 1) {
    addFinding(findings, "error", "contact_email_must_use_mailto", `${invalidMailtoCount} \`ContactPerson/EmailAddress\` anv\u00e4nder inte formatet \`mailto:\`.`, contactRef);
  }

  for (const type of ["administrative", "technical", "support"]) {
    const count = contactCounts.get(type) || 0;
    if (!count) {
      addFinding(findings, "error", `missing_${type}_contact`, `${roleLabel(idpDescriptor, spDescriptor)} saknar ContactPerson av typen ${type}, vilket kr\u00e4vs enligt profilen.`, contactRef);
    } else if (count > 1) {
      addFinding(findings, "error", `duplicate_${type}_contact`, `Det finns fler \u00e4n en ContactPerson av typen ${type}, vilket inte \u00e4r f\u00f6renligt med profilen.`, contactRef);
    }
  }

  if (idpDescriptor) {
    if (!idpDescriptor.getAttribute("errorURL")) {
      addFinding(findings, "error", "missing_error_url", "Identity Provider saknar `errorURL`, vilket kr\u00e4vs enligt profilen.", "2.1.3 errorURL");
    }

    const scopes = descendantsByNs(entity, NS.shibmd, "Scope");
    if (!scopes.length) {
      addFinding(findings, "error", "missing_scope", "Identity Provider saknar Scope, vilket kr\u00e4vs enligt profilen.", "2.1.4 Scope");
    }
    for (const scope of scopes) {
      const value = text(scope);
      const regexp = scope.getAttribute("regexp");
      if (regexp !== null && regexp !== "false") {
        addFinding(findings, "error", "scope_regexp_must_be_false", "Scope anv\u00e4nder ett `regexp`-attribut som inte \u00e4r `false`, vilket avviker fr\u00e5n profilens krav.", "2.1.4 Scope");
      }
      if (/[\[\]\(\)\*\+\?\|\\]/.test(value)) {
        addFinding(findings, "error", "scope_must_not_be_regex", "Scope inneh\u00e5ller tecken som tyder p\u00e5 regulj\u00e4rt uttryck, vilket inte \u00e4r till\u00e5tet enligt profilen.", "2.1.4 Scope");
      }
    }

    const supportedAttributes = descendantsByNs(idpDescriptor, NS.mdattr, "EntityAttributes").flatMap((group) => descendantsByNs(group, NS.saml, "Attribute"));
    if (!supportedAttributes.length) {
      addFinding(findings, "error", "missing_supported_attributes", "Identity Provider saknar deklarerade supported attributes i metadata, vilket kr\u00e4vs enligt profilen.", "2.1.8 Supported attributes");
    }
    for (const attribute of supportedAttributes) {
      if (!attribute.getAttribute("Name")) {
        addFinding(findings, "error", "supported_attribute_missing_name", "Ett supported attribute saknar `Name`, vilket kr\u00e4vs enligt profilen.", "2.1.8 Supported attributes");
      }
      if (!attribute.getAttribute("FriendlyName")) {
        addFinding(findings, "error", "supported_attribute_missing_friendlyname", "Ett supported attribute saknar `FriendlyName`, vilket kr\u00e4vs enligt profilen.", "2.1.8 Supported attributes");
      }
      if (attribute.getAttribute("NameFormat") !== URI_NAMEFORMAT) {
        addFinding(findings, "error", "supported_attribute_invalid_nameformat", "Ett supported attribute anv\u00e4nder inte det NameFormat som kr\u00e4vs enligt profilen.", "2.1.8 Supported attributes");
      }
    }
  }

  const endpoints = [];
  if (idpDescriptor) {
    const ssoEndpoints = directChildrenByNs(idpDescriptor, NS.md, "SingleSignOnService");
    const sloEndpoints = directChildrenByNs(idpDescriptor, NS.md, "SingleLogoutService");
    if (!ssoEndpoints.length) {
      addFinding(findings, "error", "missing_sso_endpoint", "Identity Provider saknar `SingleSignOnService`, vilket kr\u00e4vs enligt profilen.", "2.1.7 SAML endpoints");
    }
    endpoints.push(...ssoEndpoints, ...sloEndpoints);
  }

  if (spDescriptor) {
    const acsEndpoints = directChildrenByNs(spDescriptor, NS.md, "AssertionConsumerService");
    const sloEndpoints = directChildrenByNs(spDescriptor, NS.md, "SingleLogoutService");
    if (!acsEndpoints.length) {
      addFinding(findings, "error", "missing_acs", "Relying Party saknar `AssertionConsumerService`, vilket kr\u00e4vs enligt profilen.", "3.1.5 SAML endpoints");
    }
    for (const endpoint of acsEndpoints) {
      if (endpoint.getAttribute("Binding") === HTTP_REDIRECT) {
        addFinding(findings, "error", "acs_redirect_forbidden", "`AssertionConsumerService` anv\u00e4nder HTTP-Redirect binding, vilket inte \u00e4r till\u00e5tet enligt profilen.", "3.1.5 SAML endpoints");
      }
    }
    endpoints.push(...acsEndpoints, ...sloEndpoints);
  }

  for (const endpoint of endpoints) {
    const location = endpoint.getAttribute("Location") || endpoint.getAttribute("ResponseLocation") || "";
    if (location && !location.startsWith("https://")) {
      addFinding(findings, "error", "non_https_endpoint", "En eller flera SAML-endpoint-URL:er anv\u00e4nder inte HTTPS, vilket kr\u00e4vs enligt profilen.", roleRef(entityTypes, "2.1.7 SAML endpoints", "3.1.5 SAML endpoints"));
      break;
    }
  }

  if (spDescriptor) {
    const services = directChildrenByNs(spDescriptor, NS.md, "AttributeConsumingService");
    if (!services.length) {
      addFinding(findings, "error", "missing_attribute_consuming_service", "Relying Party saknar `AttributeConsumingService`, vilket kr\u00e4vs enligt profilen.", "3.1.6 Requested attributes");
    }

    const requested = [];
    for (const service of services) {
      const names = directChildrenByNs(service, NS.md, "ServiceName");
      const descriptions = directChildrenByNs(service, NS.md, "ServiceDescription");
      if (!names.length) {
        addFinding(findings, "error", "missing_service_name", "`AttributeConsumingService` saknar `ServiceName`, vilket kr\u00e4vs enligt profilen.", "3.1.6 Requested attributes");
      }
      if (!descriptions.length) {
        addFinding(findings, "error", "missing_service_description", "`AttributeConsumingService` saknar `ServiceDescription`, vilket kr\u00e4vs enligt profilen.", "3.1.6 Requested attributes");
      }
      if (names.length || descriptions.length) {
        validateLangPresence(findings, [...names, ...descriptions], "3.1.6 Requested attributes", "AttributeConsumingService");
      }
      requested.push(...directChildrenByNs(service, NS.md, "RequestedAttribute"));
    }

    if (!requested.length) {
      addFinding(findings, "error", "missing_requested_attributes", "Relying Party saknar `RequestedAttribute`, vilket kr\u00e4vs enligt profilen.", "3.1.6 Requested attributes");
    }
    for (const attribute of requested) {
      if (!attribute.getAttribute("Name")) {
        addFinding(findings, "error", "requested_attribute_missing_name", "Ett `RequestedAttribute` saknar `Name`, vilket kr\u00e4vs enligt profilen.", "3.1.6 Requested attributes");
      }
      if (!attribute.getAttribute("FriendlyName")) {
        addFinding(findings, "error", "requested_attribute_missing_friendlyname", "Ett `RequestedAttribute` saknar `FriendlyName`, vilket kr\u00e4vs enligt profilen.", "3.1.6 Requested attributes");
      }
      if (attribute.getAttribute("NameFormat") !== URI_NAMEFORMAT) {
        addFinding(findings, "error", "requested_attribute_invalid_nameformat", "Ett `RequestedAttribute` anv\u00e4nder inte det NameFormat som kr\u00e4vs enligt profilen.", "3.1.6 Requested attributes");
      }
    }
  }

  if (directChildrenByNs(entity, NS.md, "RoleDescriptor").length) {
    addFinding(findings, "error", "role_descriptor_forbidden", "Metadata inneh\u00e5ller `RoleDescriptor`, vilket inte \u00e4r till\u00e5tet enligt profilen.", roleRef(entityTypes, "2.1.12 Unnecessary, large metadata", "3.1.10 Unnecessary, large metadata"));
  }

  for (const node of descendantsByLocalNames(entity, ["DigestMethod", "SigningMethod", "EncryptionMethod"])) {
    const algorithm = (node.getAttribute("Algorithm") || "").toLowerCase();
    if (DISCOURAGED_ALGORITHM_MARKERS.some((marker) => algorithm.includes(marker))) {
      addFinding(findings, "warning", "discouraged_algorithm", "Metadata inneh\u00e5ller en kryptografisk algoritm som avr\u00e5ds eller \u00e4r f\u00f6r\u00e5ldrad enligt profilen.", roleRef(entityTypes, "2.1.11 Non-secure cryptographic algorithms", "3.1.9 Non-secure cryptographic algorithms"));
    }
  }

  if (entityTypes.includes("idp") || entityTypes.includes("sp")) {
    const optInAttributes = descendantsByNs(entity, NS.saml, "Attribute").filter((node) => node.getAttribute("Name") === OPENFED_OPT_IN_ATTRIBUTE);
    if (!optInAttributes.length) {
      addFinding(findings, "error", "missing_openfed_opt_in", "Metadata saknar det entitetsattribut f\u00f6r opt-in som kr\u00e4vs f\u00f6r denna publicering.", OPENFED_OPT_IN_PROFILE_REF);
    } else {
      let hasExpectedValue = false;
      for (const attribute of optInAttributes) {
        if (attribute.getAttribute("NameFormat") !== URI_NAMEFORMAT) {
          addFinding(findings, "error", "invalid_openfed_opt_in_nameformat", "Entitetsattributet f\u00f6r opt-in anv\u00e4nder inte det NameFormat som kr\u00e4vs f\u00f6r denna publicering.", OPENFED_OPT_IN_PROFILE_REF);
        }
        const values = descendantsByNs(attribute, NS.saml, "AttributeValue").map(text);
        if (values.includes(OPENFED_OPT_IN_VALUE)) {
          hasExpectedValue = true;
        }
      }
      if (!hasExpectedValue) {
        addFinding(findings, "error", "invalid_openfed_opt_in_value", "Entitetsattributet f\u00f6r opt-in inneh\u00e5ller inte det v\u00e4rde som kr\u00e4vs f\u00f6r denna publicering.", OPENFED_OPT_IN_PROFILE_REF);
      }
    }
  }

  return {
    entityId,
    organization,
    primaryType,
    errorCount: findings.filter((finding) => finding.severity === "error").length,
    warningCount: findings.filter((finding) => finding.severity === "warning").length,
    findings,
    rawXml: getRawXml(entity),
  };
}

export function validateSamlXml(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");
  if (doc.getElementsByTagName("parsererror").length) {
    throw new Error("XML-filen kunde inte tolkas.");
  }

  const entities = getEntityDescriptors(doc).map(validateEntity);
  entities.sort((a, b) => (b.errorCount - a.errorCount) || (b.warningCount - a.warningCount) || (a.entityId || "").localeCompare(b.entityId || ""));

  return {
    entityCount: entities.length,
    errorCount: entities.reduce((sum, entity) => sum + entity.errorCount, 0),
    warningCount: entities.reduce((sum, entity) => sum + entity.warningCount, 0),
    signaturePresent: xmlText.includes("<ds:Signature") || xmlText.includes(":Signature"),
    entities,
  };
}
