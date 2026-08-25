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
daneben als gleichnamiges ZIP für den Download-Button:

| Paket | Beschreibung |
| --- | --- |
| `01-logo` | Logo mit Claim – Fläche in Primärblau, Typo in Neutral hell |
| `02-logo-invers` | dieselbe Marke invertiert – helle Fläche, Typo in Primärblau |
| `03-logo-simple` | Logo ohne Claim |
| `04-logo-simple-invers` | Logo ohne Claim, invertiert |
| `05-wortmarke` | freigestellte Wortmarke in Primärblau, ohne Fläche |
| `06-wortmarke-invers` | freigestellte Wortmarke in Neutral hell, für dunkle Gründe |
| `10-colors` | Farbtafel der Palette |
| `20-source-sans-pro` | Hausschrift, alle Schnitte |

Die Logo- und Farbpakete enthalten jeweils **SVG, PNG, JPG und PDF** – SVG für
Web und Layout, PDF für Druck, PNG/JPG für Office und schnelle Weitergabe. Im
Farbpaket liegen PNG und JPG als `@4x`-Varianten vor.

Wird ein Asset ausgetauscht, muss das zugehörige ZIP neu gepackt werden – der
Download-Button liefert sonst weiter den alten Stand:

```bash
cd assets/corporate-design
zip -q -r 01-deck-27-logo.zip 01-logo
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
  "text2": "Logo mit Claim «systemische Jugendhilfe»",
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
zusätzlich `d27-blau`, `d27-blau-dunkel`, `d27-grau`, `d27-hellgrau`,
`d27-schwarz` (siehe offene Punkte).

## Design-Grundlagen

**Farben** – maßgeblich ist die Farbtafel in `assets/corporate-design/10-colors`:

| Rolle | Hex |
| --- | --- |
| Primärfarbe | `#075B8B` |
| Primärfarbe dunkel | `#053957` |
| Akzent Rot | `#FF2046` |
| Akzent Grün | `#07AC7A` |
| Neutral dunkel | `#1A1A1A` |
| Neutral mittel | `#5A6668` |
| Neutral hell | `#F5F5F5` |

Die Primärfarbe entspricht `hsl(202 90% 28.7%)` und stammt aus der Rampe des
Farbtools unter `../logo-v2/index.html`.

Im CSS hängen Überschriften, Rahmen und Buttons an den semantischen Tokens
`--color-primary`, `--color-headline` und `--color-accent`. Ein Farbwechsel
braucht daher nur die Primär-Definition in `variables.css` – plus ein Umfärben
der Logo-Dateien, die den Farbwert fest eingebaut haben.

**Schrift** – Source Sans Pro (SIL Open Font License). Verfügbar sind
ExtraLight bis Black, jeweils mit kursivem Schnitt. In der Praxis genügen drei:
Regular für Fließtext, SemiBold für Überschriften, Bold für Auszeichnungen.

## Stand / offene Punkte

Logo, Farben und Schrift sind gesetzt und vollständig ausgeliefert. Offen sind:

- [ ] **Briefpapier, Präsentationsvorlage, Visitenkarte** – noch nicht
      entschieden, ob sie gebraucht werden. In der Doku stehen dafür
      Platzhalter aus `images/`.
- [ ] **Farb-Tokens angleichen** – `variables.css` führt noch die früher
      abgeleitete Palette (Blau-Aufhellungen, Indigo, Petrol, Oliv). Die
      Farbtafel kennt stattdessen die beiden Akzentfarben `#FF2046` und
      `#07AC7A`. Beim Angleichen entfallen auch die Sektionsklassen
      `d27-indigo`, `d27-petrol`, `d27-gruen` und `d27-oliv`.
- [ ] **Doppelte Kapitel-IDs** – `logo-hell` und `logo-dunkel` kommen in der
      JSON je dreimal vor. Da `id` zum HTML-Anker wird, greifen Sprungmarken
      immer auf die erste Sektion.
- [ ] **Verwaiste Dateien** – `download/` und `images/deck-27-bildzeichen.svg`
      stammen aus der Vorversion und werden nirgends mehr referenziert.
