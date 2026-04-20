# Svenska Federationer MD-validator

En separat, helt statisk validator för manuell kontroll av SAML-metadata.

Den här appen lever parallellt med den befintliga Flask-applikationen:

- Flask-appen fortsätter hantera snapshots, dashboard, federation-analys och historik
- den här appen fokuserar enbart på manuell uppladdning och validering av SAML-metadata

## Viktig notis

Full konformitet till tekniska profilen är inte bekräftad.

Genomför alltid manuell kontroll där det behövs, till exempel för:

- `OrganizationName`
- `OrganizationDisplayName`
- språksättning
- attributinnehåll
- andra metadataelement enligt gällande rutin

## Mål

- kunna publiceras som en helt statisk webbapp
- inte bero på Node för drift
- inte bero på SQLite eller bakgrundsjobb
- inte påverka den befintliga appen
- ge tydliga valideringsresultat, åtgärdsförslag och ett kopierbart mejlunderlag

## Hur den fungerar

Allt sker lokalt i webbläsaren:

- användaren väljer en XML-fil
- filen läses in i JavaScript
- XML-filen parsas med `DOMParser`
- valideringsreglerna körs direkt i browsern
- resultatet renderas direkt på sidan

Det betyder att metadatafilen inte behöver laddas upp till någon server.

## Nuvarande status

Validatorn är client-side och innehåller ett brett urval av regler för:

- `entityID`
- `IDPSSODescriptor` / `SPSSODescriptor`
- MDUI / UIInfo
- `Organization`
- `ContactPerson`
- endpoints
- språkregler med `xml:lang`
- `RequestedAttribute` och supported attributes
- upload-regeln för OpenFed `opt-in`

Certifikat- och signaturverifiering ingår inte i detta steg.

## Struktur

```text
cloudflare-validator/
  public/
    index.html
    styles.css
    app.js
    validator.js
    mail-summary.js
    fixture-harness.html
    fixture-harness.js
    fixture-registry.js
```

## Lokal körning utan Node

Du kan öppna `public/index.html` direkt i en webbläsare, men enklast är ofta att servera katalogen statiskt.

Exempel med Python:

```bash
cd cloudflare-validator/public
python -m http.server 8080
```

Öppna sedan:

```text
http://localhost:8080
```

## Lokal fixturesvitt

Det finns också en enkel browser-baserad fixture-harness för metadatafilerna i `technical_profile_v1`.

Kör från repo-roten:

```powershell
cd C:\lab\moa-check
python -m http.server 8080
```

Öppna sedan:

```text
http://localhost:8080/cloudflare-validator/public/fixture-harness.html
```

Harnessen visar:

- vilka testfiler som redan är mappade till hårda assertions
- vilka som pass/failar mot nuvarande validator
- vilka som ännu markeras som `skip` eftersom de ligger utanför scope eller kräver mer exakt regelstöd

## Publicering

Publicera innehållet i:

```text
cloudflare-validator/public
```

Eftersom appen är helt statisk behövs:

- ingen backend
- ingen databas
- inga Functions
- inga miljövariabler för serverkod
