# ESH Haustechnik Website

Diese Datei enthält wichtige Informationen für KI-Coding-Agenten, die an diesem Projekt arbeiten.

## Projektübersicht

Die **ESH Haustechnik Website** ist eine statische Unternehmenswebsite für den Handwerksbetrieb *ESH Haustechnik* (Inhaber: Erol Saybak) mit Sitz in Hürth. Die Website dient der Kundenakquise und der Darstellung der Leistungen (Heizung, Sanitär, Badsanierung, Notdienst) im Raum Hürth, Köln und Umgebung.

- **Live-URL:** https://eshhaustechnik.de
- **Framework:** Astro 5 (Static Site Generator)
- **Styling:** Tailwind CSS 3 mit PostCSS/Autoprefixer
- **Sprache:** Deutsch (de-DE)
- **Schriftart:** Inter (@fontsource/inter)
- **Node-Version:** >= 22.12.0

## Projektstruktur

```
├── src/
│   ├── components/      # Wiederverwendbare Astro-Komponenten
│   ├── layouts/         # Seiten-Layouts (Layout.astro)
│   ├── pages/           # Astro-Seiten (Datei = Route)
│   └── styles/          # Globales CSS
├── public/              # Statische Assets (Bilder, Fonts, Favicons)
├── dist/                # Build-Output (nicht versioniert)
├── astro.config.mjs     # Astro-Konfiguration
├── tailwind.config.mjs  # Tailwind-Konfiguration
├── netlify.toml         # Netlify-Deployment & Security-Headers
└── package.json         # Abhängigkeiten und Scripts
```

### Seiten (src/pages/)

Jede `.astro`-Datei im `pages/`-Verzeichnis entspricht einer Route:

| Datei              | Route                    | Zweck                                    |
|--------------------|--------------------------|------------------------------------------|
| `index.astro`      | `/`                      | Startseite mit Hero, Leistungen, Trust-Bar |
| `leistungen.astro` | `/leistungen`            | Detaillierte Leistungsbeschreibungen     |
| `referenzen.astro` | `/referenzen`            | Projektgalerie & Kundenbewertungen       |
| `kontakt.astro`    | `/kontakt`               | Kontaktformular & Anfahrt               |
| `impressum.astro`  | `/impressum`             | Impressum (rechtlich verpflichtend)      |
| `datenschutz.astro`| `/datenschutz`           | Datenschutzerklärung                     |

### Komponenten (src/components/)

- **Layout.astro:** Basis-Layout mit `<html>`, `<head>`, Meta-Tags, Open Graph, Schema.org JSON-LD, Favicons.
- **Header.astro:** Sticky Header mit Logo, Navigation (Desktop + Mobile) und Call-to-Action.
- **Footer.astro:** Footer mit Leistungslinks, Einsatzgebieten (Local SEO), Rechtlichem.
- **Button.astro:** Wiederverwendbarer Button/Link mit Varianten (`primary`, `secondary`, `outline`).
- **Card.astro:** Kartenkomponente für Leistungen/Referenzen.
- **SectionHeader.astro:** Einheitliche Überschriften für Sektionen.
- **CookieBanner.astro:** Cookie-Einwilligungsbanner (nur notwendige Cookies).
- **StickyMobileCTA.astro:** Fixierte Mobile-Leiste für Anruf und WhatsApp.

## Build- und Entwicklungsbefehle

Alle Befehle werden im Projektroot ausgeführt:

```bash
# Entwicklungsserver starten (http://localhost:4321)
npm run dev

# Produktionsbuild erstellen (Output in ./dist/)
npm run build

# Build lokal vorab prüfen
npm run preview

# Astro-CLI-Befehle
npm run astro -- --help
```

## Design-System & Styling

### Farben

Die Farben werden über CSS-Custom-Properties in `src/styles/global.css` definiert und in Tailwind registriert:

- **Primary:** `rgb(19 44 61)` (dunkles Blau-Grau) – `text-primary`, `bg-primary`
- **Accent:** `rgb(60 123 154)` (mittleres Blau) – `text-accent`, `bg-accent`

### Tailwind-Konventionen

- Container-Breite: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Abstände für Sektionen: `py-16 lg:py-24`
- Runde Ecken: `rounded-xl`, `rounded-2xl`, `rounded-md`
- Schatten: `shadow-sm`, `hover:shadow-lg`
- Transitionen: `transition-all duration-300`
- Fokus-Stile: `focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`

## Barrierefreiheit (A11y)

- Alle interaktiven Elemente müssen `aria-label` haben, wenn der sichtbare Text nicht selbsterklärend ist.
- Fokus-Ringe werden über `focus-visible:` umgesetzt (kein `focus:` allein).
- Bilder brauchen aussagekräftige `alt`-Texte auf Deutsch.
- Aktive Navigation erhält `aria-current="page"`.
- Mobiles Menü hat `aria-expanded` und `aria-controls`.

## Wichtige technische Details

### SEO & Local SEO

- Jede Seite hat ein individuelles `title` und `description`.
- **Layout.astro** injiziert Schema.org `LocalBusiness` + `Plumber` + `HVACBusiness` JSON-LD.
- Open Graph und Twitter-Card Tags sind vorhanden.
- Canonical-URL wird automatisch aus `Astro.url.pathname` gebildet.
- Der Footer listet Einsatzgebiete (Hürth, Köln, Frechen, Kerpen, Brühl, Erftstadt, Bergheim) für Local SEO auf.

### Kontaktformular

- Das Formular auf `/kontakt` nutzt **Web3Forms** (`https://api.web3forms.com/submit`).
- **WICHTIG:** In `src/pages/kontakt.astro` ist die Konstante `WEB3FORMS_ACCESS_KEY` noch auf `'YOUR_ACCESS_KEY_HERE'` gesetzt. Dies muss vor Go-Live durch einen echten Access Key ersetzt werden.
- Das Formular wird per Inline-Script als AJAX abgeschickt.
- Es gibt einen Honeypot (`_gotcha`) und ein Hidden-Checkbox (`botcheck`).

### Cookie-Banner

- Es werden ausschließlich technisch notwendige Cookies sowie die Einwilligungspräferenz im `localStorage` unter dem Key `esh_cookie_consent` gespeichert.
- Keine Tracking- oder Analyse-Cookies ohne Zustimmung.
- Externe Inhalte (z. B. Google Maps) werden erst nach expliziter Zustimmung geladen (Two-Click-Lösung).

### Security & Deployment

- Die Website wird auf **Netlify** deployt (`netlify.toml`).
- Security-Headers sind in `netlify.toml` konfiguriert (CSP, HSTS, X-Frame-Options, Referrer-Policy).
- Statische Assets (`/assets/*`, `*.css`, `*.js`) werden mit langem Cache ausgeliefert.

## Bekannte TODOs / Offene Punkte

Bei Änderungen solltest du diese Stellen im Blick behalten:

1. **`src/pages/kontakt.astro` (Zeile ~12):** `WEB3FORMS_ACCESS_KEY` muss konfiguriert werden.
2. **`src/pages/impressum.astro`:** USt-IdNr. und Handwerkskammer-Angaben fehlen noch.
3. **`src/pages/referenzen.astro`:** Kundenbewertungen (Testimonials) sind noch Platzhalter.
4. **`src/pages/kontakt.astro`:** Google-Maps-Einbettung hat einen Platzhalter-iframe (näherungsweise Koordinaten).

## Code-Style-Richtlinien

- ES Modules verwenden (`type: "module"` in `package.json`).
- Astro-Komponenten nutzen `---` Frontmatter für Imports und Logik.
- Tailwind-Klassen bevorzugen; Inline-Styles vermeiden.
- Inline-Scripts in Komponenten müssen robust gegen fehlende DOM-Elemente sein (`if (!element) return;`).
- Alle Inhalte und Kommentare sind auf **Deutsch** zu verfassen (Webseite zielt auf deutsche Kunden ab).

## Tests

- Derzeit ist **kein Test-Framework** konfiguriert.
- Änderungen sollten manuell mit `npm run dev` und `npm run build` geprüft werden.
- Achte besonders auf Build-Fehler, da Astro strikte TypeScript-Prüfung verwendet (`astro/tsconfigs/strict`).
