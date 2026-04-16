<<<<<<< HEAD
# Svenska Federationer MD-validator

En separat, helt statisk validator f&ouml;r manuell kontroll av SAML-metadata.

Den h&auml;r appen lever parallellt med den befintliga Flask-applikationen:

- Flask-appen forts&auml;tter hantera snapshots, dashboard, federation-analys och historik
- den h&auml;r appen fokuserar enbart p&aring; manuell uppladdning och validering av SAML-metadata

## Viktig notis

Full konformitet till tekniska profilen &auml;r inte bekr&auml;ftad.

Genomf&ouml;r alltid manuell kontroll d&auml;r det beh&ouml;vs, till exempel f&ouml;r:

- `OrganizationName`
- `OrganizationDisplayName`
- spr&aring;ks&auml;ttning
- attributinneh&aring;ll
- andra metadataelement enligt g&auml;llande rutin

## M&aring;l

- kunna publiceras som en helt statisk webbapp
- inte bero p&aring; Node f&ouml;r drift
- inte bero p&aring; SQLite eller bakgrundsjobb
- inte p&aring;verka den befintliga appen
- ge tydliga valideringsresultat, &aring;tg&auml;rdsf&ouml;rslag och ett kopierbart mejlunderlag

## Hur den fungerar

Allt sker lokalt i webbl&auml;saren:

- anv&auml;ndaren v&auml;ljer en XML-fil
- filen l&auml;ses in i JavaScript
- XML-filen parsas med `DOMParser`
- valideringsreglerna k&ouml;rs direkt i browsern
- resultatet renderas direkt p&aring; sidan

Det betyder att metadatafilen inte beh&ouml;ver laddas upp till n&aring;gon server.

## Nuvarande status

Validatorn &auml;r client-side och inneh&aring;ller ett brett urval av regler f&ouml;r:

- `entityID`
- `IDPSSODescriptor` / `SPSSODescriptor`
- MDUI / UIInfo
- `Organization`
- `ContactPerson`
- endpoints
- spr&aring;kregler med `xml:lang`
- `RequestedAttribute` och supported attributes
- upload-regeln f&ouml;r OpenFed `opt-in`

Certifikat- och signaturverifiering ing&aring;r inte i detta steg.

## Struktur

```text
cloudflare-validator/
  public/
    index.html
    styles.css
    app.js
    validator.js
    mail-summary.js
```

## Lokal k&ouml;rning utan Node

Du kan &ouml;ppna `public/index.html` direkt i en webbl&auml;sare, men enklast &auml;r ofta att servera katalogen statiskt.

Exempel med Python:

```bash
cd cloudflare-validator/public
python -m http.server 8080
```

&Ouml;ppna sedan:

```text
http://localhost:8080
```

## Publicering

Publicera inneh&aring;llet i:

```text
cloudflare-validator/public
```

Eftersom appen &auml;r helt statisk beh&ouml;vs:

- ingen backend
- ingen databas
- inga Functions
- inga milj&ouml;variabler f&ouml;r serverkod
=======
# svefed-validator
Validator for SveFed interrim/lab
>>>>>>> b729d949cb69d806a78cc1020ab24b844b4632f5
