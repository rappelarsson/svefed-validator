export const FIXTURE_FILES = [
  "Certifikat/idp_certificate_no_use_exists.xml",
  "Certifikat/idp_certificate_signing_does_not_exist.xml",
  "Certifikat/idp_certificate_use_signing_exists.xml",
  "Certifikat/sp_certificate_encryption_does_not_exist.xml",
  "Certifikat/sp_certificate_no_use_exists.xml",
  "Certifikat/sp_certificate_use_encryption_exists.xml",
  "ContactPerson/contactperson_email_contains_mailto.xml",
  "ContactPerson/contactperson_email_doesnt_contain_mailto.xml",
  "ContactPerson/contactperson_multiple_types_error.xml",
  "ContactPerson/contactperson_multiple_types_ok.xml",
  "ContactPerson/idp_contactPerson_missing_administrative.xml",
  "ContactPerson/idp_contactPerson_missing_support.xml",
  "ContactPerson/idp_contactPerson_missing_technical.xml",
  "ContactPerson/idp_contactPerson_ok.xml",
  "entityID-testfiles/entityID-not-URI-new.xml",
  "entityID-testfiles/entityID-not-URI-update.xml",
  "entityID-testfiles/entityID-URI-http.xml",
  "entityID-testfiles/entityID-URI-https.xml",
  "entityID-testfiles/entityID-URI-urn-new.xml",
  "entityID-testfiles/entityID-URI-urn-update.xml",
  "entityID-testfiles/entity_id_is_percent-encoded.xml",
  "entityID-testfiles/entity_id_not_percent-encoded.xml",
  "errorURL/errorURL_is_https.xml",
  "errorURL/errorURL_missing.xml",
  "errorURL/errorURL_not_https.xml",
  "IdP_supported_attributes/idp_contains_attributes.xml",
  "IdP_supported_attributes/idp_not_containing_Attribute.xml",
  "lang/idp_langAttributeValue_no_representation_missing.xml",
  "lang/idp_langAttributeValue_no_represented_ok.xml",
  "lang/idp_langAttribute_en_missing.xml",
  "lang/idp_langAttribute_en_ok.xml",
  "lang/idp_langAttribute_sv_missing.xml",
  "lang/idp_langAttribute_sv_ok.xml",
  "lang/idp_MDUI_langAttribute_sv_missing.xml",
  "lang/idp_MDUI_langAttribute_sv_ok.xml",
  "lang/idp_sp_langAttribute_ok.xml",
  "lang/idp_sp_langAttribute_sv_missing.xml",
  "lang/lang-error-sv-duplicate.xml",
  "lang/lang-error-value-not-from-iso-639-1.xml",
  "lang/lang-ok-sv-en.xml",
  "mdui_DiscoHints/idp_discohint_misplaced.xml",
  "mdui_DiscoHints/idp_domainhint_correct_dns.xml",
  "mdui_DiscoHints/idp_domainhint_faulty_dns.xml",
  "mdui_DiscoHints/idp_geolocation_correct.xml",
  "mdui_DiscoHints/idp_geolocation_faulty.xml",
  "mdui_DiscoHints/idp_iphint_correct_CIDR_ipv4.xml",
  "mdui_DiscoHints/idp_iphint_correct_CIDR_ipv6.xml",
  "mdui_DiscoHints/idp_iphint_faulty_CIDR_ipv4.xml",
  "mdui_DiscoHints/idp_iphint_faulty_CIDR_ipv6.xml",
  "mdui_DisplayName/idp_displayName.xml",
  "mdui_DisplayName/idp_displayName_duplicate.xml",
  "mdui_Keywords/keywords_does_not_exist_for_IDP.xml",
  "mdui_Keywords/keywords_exists_for_IDP.xml",
  "mdui_Keywords/keywords_lang_does_not_exist.xml",
  "mdui_UIInfo_must_exist/uiinfo_does_not_exist_IDP.xml",
  "mdui_UIInfo_must_exist/uiinfo_does_not_exist_SP.xml",
  "mdui_UIInfo_must_exist/uiinfo_exists_IDP.xml",
  "mdui_UIInfo_must_exist/uiinfo_exists_in_EntityDescriptor.xml",
  "mdui_UIInfo_must_exist/uiinfo_exists_SP.xml",
  "non-secure_cryptographic_algorithms/digest-whitelist-fail.xml",
  "non-secure_cryptographic_algorithms/digest-whitelist-pass.xml",
  "non-secure_cryptographic_algorithms/encryption-in-incorrect-element-fail.xml",
  "non-secure_cryptographic_algorithms/encryption-keydescriptor-use-encryption-whitelist-pass.xml",
  "non-secure_cryptographic_algorithms/encryption-keydescriptor-use-unspecified-whitelist-fail.xml",
  "non-secure_cryptographic_algorithms/encryption-keydescriptor-use-unspecified-whitelist-pass.xml",
  "non-secure_cryptographic_algorithms/signing-whitelist-fail.xml",
  "non-secure_cryptographic_algorithms/signing-whitelist-pass.xml",
  "Requested_attributes/sp_attributeconsumingservice_missing.xml",
  "Requested_attributes/sp_attributeconsumingservice_multiple.xml",
  "Requested_attributes/sp_attributeconsumingservice_multiple_colliding_index.xml",
  "Requested_attributes/sp_attributeconsumingservice_multiple_isdefault_collision.xml",
  "Requested_attributes/sp_attributeconsumingservice_one.xml",
  "Requested_attributes/sp_requestedattribute_attributevalue.xml",
  "Requested_attributes/sp_requestedattribute_friendlyname_value_not_matching.xml",
  "Requested_attributes/sp_requestedattribute_nameformat_value_not_uri.xml",
  "Requested_attributes/sp_requestedattribute_value_not_from_profile.xml",
  "SAML_endpoints/acs_http_post.xml",
  "SAML_endpoints/acs_http_redirect.xml",
  "SAML_endpoints/not_https_acs.xml",
  "SAML_endpoints/not_https_ssos.xml",
];

function makeCase(path, section, mode, options = {}) {
  return {
    path,
    section,
    mode,
    shouldContain: options.shouldContain || [],
    shouldNotContain: options.shouldNotContain || [],
    notes: options.notes || "",
  };
}

function skip(path, section, notes) {
  return makeCase(path, section, "skip", { notes });
}

function assertCase(path, section, shouldContain = [], shouldNotContain = [], notes = "") {
  return makeCase(path, section, "assert", { shouldContain, shouldNotContain, notes });
}

export function buildFixtureCase(path) {
  if (path.startsWith("Certifikat/")) {
    return skip(path, "Certifikat", "Certifikat- och nyckelvalidering ligger utanför scope i denna version av den statiska validatorn.");
  }

  if (path.startsWith("mdui_DiscoHints/")) {
    return skip(path, "MDUI DiscoHints", "DiscoHints valideras inte ännu i den statiska validatorn.");
  }

  if (path.startsWith("mdui_Keywords/")) {
    return skip(path, "MDUI Keywords", "MDUI Keywords valideras inte ännu i den statiska validatorn.");
  }

  if (path === "entityID-testfiles/entity_id_is_percent-encoded.xml" || path === "entityID-testfiles/entity_id_not_percent-encoded.xml") {
    return skip(path, "entityID", "Percent-encoding i entityID valideras inte ännu.");
  }

  if (path === "errorURL/errorURL_not_https.xml") {
    return skip(path, "errorURL", "Validatorn kontrollerar idag att errorURL finns, men inte att den använder HTTPS.");
  }

  if (
    path === "Requested_attributes/sp_attributeconsumingservice_multiple_colliding_index.xml" ||
    path === "Requested_attributes/sp_attributeconsumingservice_multiple_isdefault_collision.xml" ||
    path === "Requested_attributes/sp_requestedattribute_attributevalue.xml" ||
    path === "Requested_attributes/sp_requestedattribute_friendlyname_value_not_matching.xml" ||
    path === "Requested_attributes/sp_requestedattribute_value_not_from_profile.xml"
  ) {
    return skip(path, "Requested attributes", "Den här filen testar semantiska eller kollisionsrelaterade regler som ännu inte finns i validatorn.");
  }

  if (
    path === "non-secure_cryptographic_algorithms/encryption-in-incorrect-element-fail.xml" ||
    path === "non-secure_cryptographic_algorithms/encryption-keydescriptor-use-encryption-whitelist-pass.xml" ||
    path === "non-secure_cryptographic_algorithms/encryption-keydescriptor-use-unspecified-whitelist-fail.xml" ||
    path === "non-secure_cryptographic_algorithms/encryption-keydescriptor-use-unspecified-whitelist-pass.xml"
  ) {
    return skip(path, "Kryptografiska algoritmer", "Placering och vitlistning av krypteringsmetoder täcks inte ännu fullt ut.");
  }

  if (path === "mdui_DisplayName/idp_displayName_duplicate.xml") {
    return skip(path, "MDUI DisplayName", "Duplicerat innehåll i DisplayName valideras inte ännu som separat regel.");
  }

  const exact = {
    "ContactPerson/contactperson_email_contains_mailto.xml": assertCase(path, "ContactPerson", [], ["contact_email_must_use_mailto"]),
    "ContactPerson/contactperson_email_doesnt_contain_mailto.xml": assertCase(path, "ContactPerson", ["contact_email_must_use_mailto"]),
    "ContactPerson/contactperson_multiple_types_error.xml": assertCase(path, "ContactPerson", ["duplicate_technical_contact"]),
    "ContactPerson/contactperson_multiple_types_ok.xml": assertCase(path, "ContactPerson", [], ["duplicate_administrative_contact", "duplicate_technical_contact", "duplicate_support_contact"]),
    "ContactPerson/idp_contactPerson_missing_administrative.xml": assertCase(path, "ContactPerson", ["missing_administrative_contact"]),
    "ContactPerson/idp_contactPerson_missing_support.xml": assertCase(path, "ContactPerson", ["missing_support_contact"]),
    "ContactPerson/idp_contactPerson_missing_technical.xml": assertCase(path, "ContactPerson", ["missing_technical_contact"]),
    "ContactPerson/idp_contactPerson_ok.xml": assertCase(path, "ContactPerson", [], ["missing_administrative_contact", "missing_technical_contact", "missing_support_contact", "contact_email_must_use_mailto"]),

    "entityID-testfiles/entityID-not-URI-new.xml": assertCase(path, "entityID", ["invalid_entity_id_scheme"]),
    "entityID-testfiles/entityID-not-URI-update.xml": assertCase(path, "entityID", ["invalid_entity_id_scheme"]),
    "entityID-testfiles/entityID-URI-http.xml": assertCase(path, "entityID", [], ["invalid_entity_id_scheme", "legacy_urn_entity_id"]),
    "entityID-testfiles/entityID-URI-https.xml": assertCase(path, "entityID", [], ["invalid_entity_id_scheme", "legacy_urn_entity_id"]),
    "entityID-testfiles/entityID-URI-urn-new.xml": assertCase(path, "entityID", ["legacy_urn_entity_id"], ["invalid_entity_id_scheme"]),
    "entityID-testfiles/entityID-URI-urn-update.xml": assertCase(path, "entityID", ["legacy_urn_entity_id"], ["invalid_entity_id_scheme"]),

    "errorURL/errorURL_is_https.xml": assertCase(path, "errorURL", [], ["missing_error_url"]),
    "errorURL/errorURL_missing.xml": assertCase(path, "errorURL", ["missing_error_url"]),

    "IdP_supported_attributes/idp_contains_attributes.xml": assertCase(path, "Supported attributes", [], ["missing_supported_attributes", "supported_attribute_missing_name", "supported_attribute_missing_friendlyname", "supported_attribute_invalid_nameformat"]),
    "IdP_supported_attributes/idp_not_containing_Attribute.xml": assertCase(path, "Supported attributes", ["missing_supported_attributes"]),

    "lang/lang-error-value-not-from-iso-639-1.xml": assertCase(path, "Språk", ["organization_invalid_lang"]),
    "lang/lang-error-sv-duplicate.xml": assertCase(path, "Språk", ["duplicate_organization_lang"]),
    "lang/lang-ok-sv-en.xml": assertCase(path, "Språk", [], ["organization_invalid_lang", "duplicate_organization_lang", "organization_missing_en", "organization_missing_sv"]),

    "mdui_DisplayName/idp_displayName.xml": assertCase(path, "MDUI DisplayName", [], ["missing_displayname"]),
    "mdui_UIInfo_must_exist/uiinfo_does_not_exist_IDP.xml": assertCase(path, "MDUI UIInfo", ["missing_mdui"]),
    "mdui_UIInfo_must_exist/uiinfo_does_not_exist_SP.xml": assertCase(path, "MDUI UIInfo", ["missing_mdui"]),
    "mdui_UIInfo_must_exist/uiinfo_exists_IDP.xml": assertCase(path, "MDUI UIInfo", [], ["missing_mdui"]),
    "mdui_UIInfo_must_exist/uiinfo_exists_in_EntityDescriptor.xml": assertCase(path, "MDUI UIInfo", ["missing_mdui"], [], "Validatorn kräver idag UIInfo på rollnivå; den här filen hjälper oss att hålla koll på det beteendet."),
    "mdui_UIInfo_must_exist/uiinfo_exists_SP.xml": assertCase(path, "MDUI UIInfo", [], ["missing_mdui"]),

    "non-secure_cryptographic_algorithms/digest-whitelist-fail.xml": assertCase(path, "Kryptografiska algoritmer", ["discouraged_algorithm"]),
    "non-secure_cryptographic_algorithms/digest-whitelist-pass.xml": assertCase(path, "Kryptografiska algoritmer", [], ["discouraged_algorithm"]),
    "non-secure_cryptographic_algorithms/signing-whitelist-fail.xml": assertCase(path, "Kryptografiska algoritmer", ["discouraged_algorithm"]),
    "non-secure_cryptographic_algorithms/signing-whitelist-pass.xml": assertCase(path, "Kryptografiska algoritmer", [], ["discouraged_algorithm"]),

    "Requested_attributes/sp_attributeconsumingservice_missing.xml": assertCase(path, "Requested attributes", ["missing_attribute_consuming_service", "missing_requested_attributes"]),
    "Requested_attributes/sp_attributeconsumingservice_one.xml": assertCase(path, "Requested attributes", [], ["missing_attribute_consuming_service", "missing_service_name", "missing_service_description", "missing_requested_attributes"]),
    "Requested_attributes/sp_attributeconsumingservice_multiple.xml": assertCase(path, "Requested attributes", [], ["missing_attribute_consuming_service", "missing_requested_attributes"]),
    "Requested_attributes/sp_requestedattribute_nameformat_value_not_uri.xml": assertCase(path, "Requested attributes", ["requested_attribute_invalid_nameformat"]),

    "SAML_endpoints/acs_http_post.xml": assertCase(path, "SAML endpoints", [], ["acs_redirect_forbidden", "non_https_endpoint"]),
    "SAML_endpoints/acs_http_redirect.xml": assertCase(path, "SAML endpoints", ["acs_redirect_forbidden"]),
    "SAML_endpoints/not_https_acs.xml": assertCase(path, "SAML endpoints", ["non_https_endpoint"]),
    "SAML_endpoints/not_https_ssos.xml": assertCase(path, "SAML endpoints", ["non_https_endpoint"]),
  };

  if (exact[path]) {
    return exact[path];
  }

  if (path.startsWith("lang/")) {
    return skip(path, "Språk", "Filen berör språkregler, men kräver en mer exakt mappning innan den används som hårt automatiskt assertionsfall.");
  }

  return skip(path, "Övrigt", "Filen är ännu inte mappad till ett säkert automatiskt assertionsfall.");
}
