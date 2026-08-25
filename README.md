# deck 27 – Corporate Design

Interaktive CD-Dokumentation für **deck 27 – systemische Jugendhilfe**: Logo,
Farben, Schrift und Vorlagen zum Ansehen und Herunterladen. Statische Seite,
die ihre Inhalte aus einer JSON-Datei rendert.

## Entwickeln

```bash
npm install
npm run dev      # Server + Lint + CSS-Build + Watch
npm run build    # nur CSS bauen und Fonts kopieren
npm run lint     # Stylelint
```

Der Dev-Server bindet in `package.json` an eine feste IP (`-b 192.168.0.206`).
Auf einem anderen Netz dort die eigene Adresse eintragen oder `-b localhost`
verwenden.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `assets/data/deck-27-corporate-design.json` | Alle Inhalte der Doku – hier werden Kapitel gepflegt |
| `assets/scripts/modules/renderer.js` | Layout-Templates (`home`, `image`, `text`, `page`, `quote`, `image-stripe`) |
| `assets/styles/variables.css` | Design Tokens: Farben, Schrift, Größen, Abstände |
| `assets/fonts/` | Quell-Fonts, werden nach `compiled-assets/fonts/` kopiert |
| `images/` | Grafiken der Doku |
| `download/` | ZIP-Pakete hinter den Download-Buttons |
| `compiled-assets/` | Build-Output – nicht von Hand bearbeiten |

## Inhalte pflegen

Jedes Kapitel ist ein Objekt in `assets/data/deck-27-corporate-design.json`:

```json
{
  "id": "logo-hell",
  "title": "deck 27",
  "image": "./images/deck-27-logo.svg",
  "layout": "image",
  "text": "Logo komplett – auf hellem Grund",
  "text2": "Wortmarke mit Claim",
  "cssClasses": "is-light has-padding-xxl",
  "download": "./download/deck-27-logo.zip"
}
```

`download` ist optional – fehlt der Schlüssel, entfällt der Download-Button.
Über `cssClasses` lassen sich Hintergrund und Padding steuern, u. a.
`is-light`, `is-dark`, `is-brand`, `has-padding-xl`, `has-padding-xxl`,
`has-shadow` sowie die Flächenfarben `d27-blau`, `d27-blau-dunkel`,
`d27-indigo`, `d27-petrol`, `d27-gruen`, `d27-oliv`, `d27-grau`,
`d27-hellgrau`, `d27-schwarz`.

## Design-Grundlagen

**Farben** – Primärfarbe ist `#075B8B` = `hsl(202 90% 28.7%)`. Alle weiteren
Töne stammen aus derselben HSL-Rampe wie im Farbtool unter
`../logo-v2/index.html`: die Aufhellungen laufen auf der Hue-Zeile 202°, die
Sekundärtöne liegen bei gleicher Sättigung und Helligkeit auf anderen Hues.

| Rolle | Hex | HSL |
| --- | --- | --- |
| Blau (Primär) | `#075B8B` | `202 90% 28.7%` |
| Blau dunkel | `#053957` | `202 90% 18%` |
| Blau mittel | `#1375AD` | `202 80% 37.8%` |
| Blau hell | `#4BA1D2` | `202 60% 55.9%` |
| Blau pastell | `#79B2D2` | `202 50% 65%` |
| Indigo | `#072F8B` | `222 90% 28.7%` |
| Petrol | `#07878B` | `182 90% 28.7%` |
| Grün | `#078B63` | `162 90% 28.7%` |
| Oliv | `#5B8B07` | `82 90% 28.7%` |

Im CSS hängen Überschriften, Rahmen und Buttons an den semantischen Tokens
(`--color-primary`, `--color-headline`, `--color-accent`) – ein weiterer
Farbwechsel braucht daher nur die Primär-Definition in `variables.css` und ein
Umfärben der Logo-SVGs.

**Schrift** – Source Sans Pro (SIL Open Font License) in Light, Regular,
SemiBold und Bold, jeweils mit kursivem Schnitt.

## Stand / offene Punkte

Diese Version ist die Basis – Logo, Farben und Schrift sind gesetzt, die
übrigen Anwendungen noch Platzhalter:

- [x] Logo mit Claim, Invers-Variante, Wortmarke
- [x] Farbpalette
- [x] Schrift Source Sans Pro
- [ ] Bildzeichen / Signet – `images/deck-27-bildzeichen.svg`
- [ ] Briefpapier (Word-Vorlage) – `images/deck-27-briefpapier.svg`
- [ ] Präsentationsvorlage – `images/deck-27-praesentation.svg`
- [ ] Visitenkarte – `images/deck-27-visitenkarte.svg`

Die Platzhalter-SVGs sind als solche gekennzeichnet und werden schlicht durch
die echten Dateien ersetzt; die zugehörigen `text2`-Hinweise („TODO …“) in der
JSON-Datei entfallen dann, und pro Anwendung kommt ein `download`-Eintrag dazu.
