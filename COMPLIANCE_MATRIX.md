# Täckningsmatris för Svenska Federationer MD-validator

Den här matrisen jämför den statiska validatorn i `cloudflare-validator/public/validator.js`
mot `saml_websso_technology_profile_codex.md`.

## Statusnivåer

- `Täckt`: kravet har en tydlig implementerad kontroll i validatorn
- `Delvis täckt`: delar av kravet kontrolleras, men inte hela kravet
- `Utanför scope`: kravet är inte rimligt att avgöra enbart genom statisk metadataanalys i webbläsaren
- `Saknas`: kravet borde kunna valideras i metadata men har ingen tydlig kontroll ännu

## Bedömning i korthet

- Metadataregistreringskrav i `2.1` och `3.1` är till stor del täckta eller delvis täckta.
- Krav som kräver certifikatverifiering, kryptografisk bedömning, nätverkskontroll, runtime-beteende eller federationens externa register är inte fullt täckta i denna version.
- Validatorn är därför inte bekräftat komplett mot hela tekniska profilen ännu.

## 2. Identity Providers

| Avsnitt | Krav | Status | Kommentar |
|---|---|---|---|
| 2.1.1 | `xml:lang` ska finnas, vara konsekvent, ha `en` och `sv`, inga dubletter per element | Täckt | Närvaro, konsekvens, `en`, `sv`, dubletter och kontroll mot ISO 639-1-koder finns nu i validatorn. |
| 2.1.2 | `entityID` ska finnas, börja med `https://`, `http://` eller `urn:`, helst inte `urn:`, max 256 tecken | Delvis täckt | Format, längd, varning för `urn:` och unikhet inom uppladdad fil kontrolleras. Global unikhet utanför filen kontrolleras inte. |
| 2.1.3 | `errorURL` måste finnas | Täckt | Validatorn kontrollerar att `errorURL` finns på IdP. |
| 2.1.4 | Minst ett `Scope`, `regexp=false`, inte regex | Delvis täckt | Minst ett scope, korrekt placering i `md:Extensions`, `regexp=false` och regex-liknande innehåll kontrolleras. DNS-kontroll ligger utanför scope. |
| 2.1.5 | MDUI med `DisplayName`, `Description`, `Logo`, språkregler, `https`-logo, ej inbäddad | Delvis täckt | Kärnelement och språkregler kontrolleras. Unikhet inom federation/interfederation, publik åtkomst, domänägande, PNG, storlek och proportioner kontrolleras inte. |
| 2.1.6 | Minst ett signeringscertifikat i metadata | Utanför scope | Certifikatkrav är uttryckligen inte med i detta steg. |
| 2.1.7 | Alla SAML-endpoint-URL:er ska använda `https://` | Täckt | `SingleSignOnService`, `SingleLogoutService` och övriga insamlade endpoints kontrolleras mot `https`. |
| 2.1.8 | Supported attributes ska finnas, ha `Name`, `FriendlyName`, `NameFormat=uri` | Delvis täckt | Närvaro och `NameFormat` kontrolleras. Matchning mot federationens attributprofil kontrolleras inte. |
| 2.1.9 | `OrganizationName`, `OrganizationDisplayName`, `OrganizationURL` med språkregler | Delvis täckt | Närvaro och språkregler kontrolleras. Kravet att `OrganizationName` ska vara samma för alla ägda entiteter kan inte säkert avgöras i denna validator. |
| 2.1.10 | `ContactPerson` med `mailto:`, en per typ, administrative/technical/support måste finnas | Delvis täckt | Strukturkraven kontrolleras. Kravet att kontaktinfo inte får referera till en fysisk person kontrolleras inte. |
| 2.1.11 | Endast tillåtna algoritmer, avrådda algoritmer bör undvikas | Delvis täckt | Avrådda algoritmer flaggas. Full kontroll mot senaste W3C-rekommendationer finns inte. |
| 2.1.12 | `RoleDescriptor` får inte finnas | Täckt | Kontrolleras. |
| 2.2 | Nyckelstyrka, utgångna certifikat, self-signed, rollover-stöd | Utanför scope | Kräver certifikat- och/eller runtimeanalys. |
| 2.3 | Endpoint security, inga deprecated TLS/SSL | Utanför scope | Kräver nätverkskontroll/runtimeanalys. |
| 2.4.1 | Metadata refresh, signaturverifiering, `validUntil`-hantering | Utanför scope | Gäller mjukvarubeteende, inte uppladdad metadatafil i sig. |
| 2.4.2 | Autentiseringsflöde, `RequestedAuthnContext`, `AuthnInstant`, `ForceAuthn` | Utanför scope | Runtimekrav. |
| 2.4.3 | 3-5 minuters clock skew | Utanför scope | Runtimekrav. |
| 2.4.4 | Inga osäkra/utgångna programvaror | Utanför scope | Operativt krav. |
| 2.5 | Attributvärden max 256 tecken | Saknas | Skulle kunna valideras på släppta attribut i assertions, men validatorn arbetar på metadata. |
| 2.5.1 | Stöd för transient NameID | Saknas | Skulle kunna delvis kontrolleras via metadata om NameIDFormat deklareras, men ingen sådan kontroll finns ännu. |
| 2.5.2 | Scoped attributes ska matcha registrerade scopes | Utanför scope | Kräver jämförelse mot faktiska attributvärden i assertioner. |
| 2.5.3 | Attributfreshness inom en arbetsvecka | Utanför scope | Operativt krav. |
| 2.5.4 | Assurance release | Utanför scope | Assertion-/profilkrav, inte rent metadataformat. |

## 3. Relying Parties

| Avsnitt | Krav | Status | Kommentar |
|---|---|---|---|
| 3.1.1 | `xml:lang` ska finnas, vara konsekvent, ha `en` och `sv`, inga dubletter per element | Täckt | Samma bedömning som för 2.1.1. ISO 639-1-koder kontrolleras. |
| 3.1.2 | `entityID` ska finnas, börja med `https://`, `http://` eller `urn:`, helst inte `urn:`, max 256 tecken | Delvis täckt | Samma bedömning som för 2.1.2. |
| 3.1.3 | MDUI med `DisplayName`, `Description`, `Logo`, språkregler, `https`-logo, ej inbäddad | Delvis täckt | Samma bedömning som för 2.1.5. |
| 3.1.4 | Minst ett krypteringscertifikat i metadata | Utanför scope | Certifikatkrav ingår inte i detta steg. |
| 3.1.5 | Alla endpoints ska vara `https://`, ACS får inte använda HTTP-Redirect | Täckt | Båda kontrolleras. |
| 3.1.6 | `AttributeConsumingService` måste finnas, `ServiceName`, `ServiceDescription`, `RequestedAttribute`, `Name`, `FriendlyName`, `NameFormat=uri` | Delvis täckt | Struktur, språkregler och `NameFormat` kontrolleras. Matchning mot attributprofilen kontrolleras inte. |
| 3.1.7 | `OrganizationName`, `OrganizationDisplayName`, `OrganizationURL` med språkregler | Delvis täckt | Samma bedömning som för 2.1.9. |
| 3.1.8 | `ContactPerson` med `mailto:`, en per typ, administrative/technical/support måste finnas | Delvis täckt | Samma bedömning som för 2.1.10. |
| 3.1.9 | Endast tillåtna algoritmer, avrådda algoritmer bör undvikas | Delvis täckt | Samma bedömning som för 2.1.11. |
| 3.1.10 | `RoleDescriptor` får inte finnas | Täckt | Kontrolleras. |
| 3.2 | Nyckelstyrka, utgångna certifikat, self-signed, rollover-stöd | Utanför scope | Kräver certifikat- och/eller runtimeanalys. |
| 3.3 | Endpoint security, inga deprecated TLS/SSL | Utanför scope | Kräver nätverkskontroll/runtimeanalys. |
| 3.4.1 | Metadata refresh, signaturverifiering, `validUntil`-hantering | Utanför scope | Runtimekrav. |
| 3.4.2 | `RequestedAuthnContext`, `ForceAuthn`, verifiering av `AuthnContext` och `AuthnInstant` | Utanför scope | Runtimekrav. |
| 3.4.3 | 3-5 minuters clock skew | Utanför scope | Runtimekrav. |
| 3.4.4 | Inga osäkra/utgångna programvaror | Utanför scope | Operativt krav. |
| 3.4.5 | errorURL-stöd rekommenderas | Utanför scope | Gäller RP-implementation, inte metadataformat. |
| 3.5 | Stöd för attributvärden upp till 256 tecken | Utanför scope | Gäller runtime/assertions. |
| 3.5.1 | Får inte kräva NameID, måste kräva attributprofilidentifierare om identifierare behövs | Utanför scope | Gäller tjänstelogik, inte metadataformat. |
| 3.5.2 | Scoped attributes ska verifieras mot IdP-scope | Utanför scope | Kräver assertions och valideringslogik utanför metadata. |
| 3.5.3 | Assurance-attribut ska valideras mot assurance-certification | Utanför scope | Kräver assertions och entity attributes i federationskontext. |

## 4. Federation Operator

| Avsnitt | Krav | Status | Kommentar |
|---|---|---|---|
| 4.1.1 | `lang`-regler för metadataregistrering | Täckt | Samma språkregler kontrolleras nu explicit för entitetsmetadata, inklusive ISO 639-1-koder. |
| 4.1.2 | `RegistrationInfo`, `registrationAuthority`, `registrationInstant`, `RegistrationPolicy` | Utanför scope | Denna information kan läggas till i ett senare publiceringssteg och valideras därför inte i uppladdad metadata i denna version. |
| 4.2 | Federation metadata signing, `validUntil`, starka signaturalgoritmer, self-signed signeringscertifikat | Utanför scope | Gäller federationssignering och certifikat/signaturverifiering. |
| 4.3 | Metadata får inte publiceras osignerad | Utanför scope | Publiceringskrav, inte entitetsformat. |

## Extra regel utanför tekniska profilen

| Regel | Status | Kommentar |
|---|---|---|
| OpenFed opt-in entity attribute | Täckt | Upload-specifik regel som inte kommer från WebSSO-profilen utan från separat federationspolicy. |

## Slutsats

Validatorn täcker en stor del av de metadatarelaterade kraven i `2.1` och `3.1`, men den är ännu inte komplett mot hela tekniska profilen.

Det som främst återstår om målet är hög säkerhet i påståendet "alla metadatarelevanta krav täcks" är:

1. Kontroll av global unikhet för `entityID` utanför den uppladdade filen, om sådan federation-/registerjämförelse ska ingå.
2. Semantisk matchning av `Name` och `FriendlyName` mot federationens attributprofil.
3. Tydlig avgränsning i UI och dokumentation mellan:
   - det som valideras i metadata
   - det som kräver certifikat/signatur
   - det som kräver runtime- eller driftkontroll
