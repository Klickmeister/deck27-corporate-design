# deck 27 – Corporate Design

Interaktive CD-Dokumentation für **deck 27 – systemische Jugendhilfe**: Logo,
Farben und Schrift zum Ansehen und Herunterladen. Statische Seite, die ihre
Kapitel aus einer JSON-Datei rendert.

## Entwickeln

```bash
npm install
npm run dev      # Server + Lint + CSS-Build + Watch
npm run build    # CSS bauen und Fonts kopieren
npm run lint     # Stylelint (lint:fix korrigiert automatisch)
```

Der Dev-Server bindet in `package.json` an eine feste IP (`-b 192.168.0.206`).
Auf einem anderen Netz dort die eigene Adresse eintragen oder `-b localhost`
verwenden.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `assets/corporate-design/` | Die CD-Assets selbst – Logos, Farben, Schrift |
| `assets/data/deck-27-corporate-design.json` | Alle Inhalte der Doku – hier werden Kapitel gepflegt |
| `assets/scripts/modules/renderer.js` | Layout-Templates |
| `assets/styles/variables.css` | Design Tokens: Farben, Schrift, Größen, Abstände |
| `assets/fonts/` | Fonts für die Doku-Seite, werden nach `compiled-assets/fonts/` kopiert |
| `images/` | Platzhaltergrafiken für noch offene Anwendungen |
| `compiled-assets/` | Build-Output – nicht von Hand bearbeiten |

## CD-Assets

Unter `assets/corporate-design/` liegt jedes Paket in einem nummerierten Ordner,
daneben als ZIP für den Download-Button:

| Paket | Beschreibung |
| --- | --- |
| `01-logo` | Logo – Fläche Petrol, Schrift Sand |
| `02-logo-invers` | Logo invers – Fläche Sand, Schrift Petrol |
| `03-logo-tag` | Logo mit Claim «Systemische Jugendhilfe» |
| `04-logo-tag-rahmen` | Logo mit Claim und Rahmen in Sand |
| `05-logo-tag-hell` | Logo mit Claim hell – Fläche Hellgrau, Schrift Petrol |
| `06-wortmarke` | freigestellte Wortmarke in Petrol, ohne Fläche |
| `07-wortmarke-invers` | freigestellte Wortmarke in Sand, für dunkle Gründe |
| `10-colors` | Farbtafel der Palette (Bildschirmwerte) |
| `11-colors-pantone` | Farbtafel mit Pantone-Sonderfarben für den Druck |
| `20-source-sans-pro` | Hausschrift, alle Schnitte |

Die Logo- und Farbpakete enthalten jeweils **SVG, PNG, JPG und PDF** – SVG für
Web und Layout, PDF für Druck, PNG/JPG für Office und schnelle Weitergabe. In
den Farbpaketen liegen PNG und JPG als `@4x`-Varianten vor.

Neben den Einzel-ZIPs (`NN-deck-27-<paket>.zip`) gibt es zwei Sammelpakete,
verlinkt auf der Startsektion:

- `deck-27-logos-alle.zip` – alle Logo-Pakete `01`–`07`
- `deck-27-corporate-design-komplett.zip` – Logos, Farben und Schrift

Wird ein Asset ausgetauscht, müssen die ZIPs neu gepackt werden – die
Download-Buttons liefern sonst weiter den alten Stand:

```bash
npm run pack     # packt alle ZIPs aus den Paketordnern neu
```

## Inhalte pflegen

Jedes Kapitel ist ein Objekt in `assets/data/deck-27-corporate-design.json`:

```json
{
  "id": "logo-hell",
  "title": "deck 27",
  "image": "./assets/corporate-design/01-logo/deck-27-logo.svg",
  "layout": "image",
  "text": "deck 27 // Logo",
  "text2": "Fläche Petrol, Schrift Sand",
  "cssClasses": "is-light has-padding-xxl",
  "download": "./assets/corporate-design/01-deck-27-logo.zip"
}
```

`download` ist optional – fehlt der Schlüssel, entfällt der Download-Button.
`id` wird zum HTML-Anker der Sektion und muss deshalb eindeutig sein.

**Layouts** (`layout`): `home`, `image`, `text`, `page`, `quote`,
`image-stripe`. In der Doku sind `home`, `image` und `text` im Einsatz; die
übrigen kommen aus dem Grundgerüst und stehen bereit.

**Hilfsklassen** (`cssClasses`): `is-light`, `is-dark`, `is-brand`,
`has-padding-xl`, `has-padding-xxl`, `has-shadow`. Für farbige Flächen gibt es
zusätzlich `d27-petrol`, `d27-sand`, `d27-rot`, `d27-schwarz`, `d27-grau` und
`d27-hellgrau`.

## Design-Grundlagen

**Farben** – maßgeblich sind die Farbtafeln in `assets/corporate-design/10-colors`
und `11-colors-pantone`:

| Rolle | Hex | Pantone |
| --- | --- | --- |
| Primärfarbe Petrol | `#006164` | PANTONE 323 C |
| Sekundärfarbe Sand | `#D8CFB9` | PANTONE 9163 C |
| Akzent Rot | `#ED1129` | PANTONE 1788 C |
| Neutral Schwarz | `#000000` | PANTONE Black 6 C (Text: K 100) |
| Neutral Grau | `#9E9B94` | PANTONE 402 C |
| Neutral Hellgrau | `#F5F5F5` | kein Pantone – Papierweiß bzw. weiße Folie/Dibond |

Im CSS hängen Überschriften, Rahmen und Buttons an den semantischen Tokens
`--color-primary`, `--color-headline` und `--color-accent` in `variables.css`.
Ein Farbwechsel braucht daher nur die Marken-Tokens dort – plus ein Umfärben
der Logo-Dateien, die den Farbwert fest eingebaut haben.

**Schrift** – Source Sans Pro (SIL Open Font License). Verfügbar sind
ExtraLight bis Black, jeweils mit kursivem Schnitt. In der Praxis genügen drei:
Regular für Fließtext, SemiBold für Überschriften, Bold für Auszeichnungen.

## Stand / offene Punkte

Logo, Farben und Schrift sind gesetzt und vollständig ausgeliefert. Offen sind:

- [ ] **Briefpapier, Präsentationsvorlage, Visitenkarte** – noch nicht
      entschieden, ob sie gebraucht werden. In der Doku stehen dafür
      Platzhalter aus `images/`.
- [ ] **Doppelte Kapitel-IDs** – `logo-hell` und `logo-dunkel` kommen in der
      JSON mehrfach vor. Da `id` zum HTML-Anker wird, greifen Sprungmarken
      immer auf die erste Sektion.
- [ ] **Verwaiste Dateien** – `download/` und `images/deck-27-bildzeichen.svg`
      stammen aus der Vorversion und werden nirgends mehr referenziert.
