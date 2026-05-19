# ESH Haustechnik Website

Diese Datei enthält alle wichtigen Informationen für KI-Coding-Agenten, die an diesem Projekt arbeiten. Der Leser dieser Datei wird als völlig neuer Entwickler betrachtet, der nichts über das Projekt weiß.

---

## Projektübersicht

Die **ESH Haustechnik Website** ist eine statische, deutschsprachige Unternehmenswebsite für den Handwerksbetrieb *ESH Haustechnik* (Inhaber: Erol Saybak) mit Sitz in Hürth. Die Website dient der Kundenakquise und der Darstellung der Leistungen (Heizung, Sanitär, Badsanierung, Notdienst) im Raum Hürth, Köln und Umgebung.

- **Live-URL:** https://eshhaustechnik.de
- **Sprache:** Deutsch (de-DE)
- **Framework:** Astro 5.18.1 (Static Site Generator)
- **Styling:** Tailwind CSS 3.4.19 mit PostCSS 8.5.8 / Autoprefixer 10.4.27
- **Schriftart:** Inter (@fontsource/inter 5.2.8)
- **Node-Version:** >= 22.12.0
- **Deployment:** Netlify (konfiguriert über `netlify.toml`)

### Technologie-Stack im Detail

| Komponente | Version / Tool | Zweck |
|------------|----------------|-------|
| Framework | Astro 5.18.1 | Statisches Site-Generation, Routing, Build-System |
| Styling | Tailwind CSS 3.4.19 | Utility-First CSS |
| Post-Processing | PostCSS 8.5.8 + Autoprefixer 10.4.27 | CSS-Transformation |
| Astro-Integration | @astrojs/tailwind 6.0.2 | Tailwind-Integration in Astro |
| Astro-Integration | @astrojs/sitemap 3.7.2 | Automatische Sitemap-Generierung |
| Schriftart | @fontsource/inter 5.2.8 | Self-Hosted Inter-Schriftschnitte (300–700) |
| TypeScript | Strict (astro/tsconfigs/strict) | Strikte Typprüfung |

Es sind **keine** weiteren Frameworks (React, Vue, Svelte) im Einsatz. Die gesamte UI besteht aus reinen Astro-Komponenten (`.astro`) mit Inline-JavaScript für Interaktivität.

---

## Architektur & Laufzeit

Die Website wird zur Build-Zeit komplett zu statischem HTML/CSS/JS kompiliert (Static Site Generation, SSG). Es gibt keinen serverseitigen Laufzeit-Code, keine API-Routen und keine Datenbank.

### Build-Prozess

1. Astro liest `src/pages/**/*.astro` und erzeugt daraus HTML-Dateien im `dist/`-Verzeichnis.
2. Tailwind CSS scannt alle Astro-Dateien und extrahiert die verwendeten Utility-Klassen.
3. PostCSS/Autoprefixer verarbeitet das finale CSS.
4. `@astrojs/sitemap` generiert automatisch `sitemap-index.xml` im `dist/`-Verzeichnis.
5. Statische Assets aus `public/` werden unverändert nach `dist/` kopiert.

### Routing

Jede `.astro`-Datei in `src/pages/` entspricht exakt einer Route. Dateibasiertes Routing:

| Datei | Route | Zweck |
|-------|-------|-------|
| `src/pages/index.astro` | `/` | Startseite mit Hero, Leistungen, Trust-Bar, Local-SEO |
| `src/pages/leistungen.astro` | `/leistungen` | Detaillierte Leistungsbeschreibungen (Heizung, Wartung, Bad, Notdienst) |
| `src/pages/referenzen.astro` | `/referenzen` | Projektgalerie & Kundenbewertungen |
| `src/pages/kontakt.astro` | `/kontakt` | Kontaktformular, Anfahrt, Two-Click-Karte |
| `src/pages/impressum.astro` | `/impressum` | Impressum (rechtlich verpflichtend) |
| `src/pages/datenschutz.astro` | `/datenschutz` | Datenschutzerklärung |
| `src/pages/404.astro` | `404` | Fehlerseite |

---

## Projektstruktur & Modulorganisation

```
├── public/                      # Statische Assets (Bilder, Favicons, robots.txt)
│   ├── images/                  # OG-Bilder und ähnliche Grafiken
│   ├── fonts/                   # (Falls benötigt, aktuell über @fontsource)
│   ├── favicon.svg / favicon.ico / apple-touch-icon.png
│   ├── hero.jpg / leistung1-4.jpg / ref1-4.jpg / warumwir.jpg / logo.jpeg
│   └── robots.txt               # Erlaubt alle Crawler, verweist auf Sitemap
├── src/
│   ├── components/              # Wiederverwendbare Astro-Komponenten
│   │   ├── Button.astro         # Link- oder Button-Element mit Varianten
│   │   ├── Card.astro           # Kartenkomponente für Leistungen/Referenzen
│   │   ├── CookieBanner.astro   # Cookie-Einwilligungsbanner
│   │   ├── Footer.astro         # Seitenfooter mit Local-SEO-Links
│   │   ├── Header.astro         # Sticky Header mit Navigation & Mobile-Menü
│   │   ├── SectionHeader.astro  # Einheitliche Sektions-Überschriften
│   │   └── StickyMobileCTA.astro# Fixierte Mobile-Leiste (Anruf + WhatsApp)
│   ├── layouts/
│   │   └── Layout.astro         # Basis-Layout mit <html>, <head>, SEO, Schema.org
│   ├── pages/                   # Routen (siehe Tabelle oben)
│   └── styles/
│       └── global.css           # CSS-Custom-Properties, Font-Imports, Tailwind-Direktiven
├── astro.config.mjs             # Astro-Konfiguration (Site-URL, Integrationen)
├── tailwind.config.mjs          # Tailwind-Konfiguration (Farben, Font-Family)
├── postcss.config.mjs           # PostCSS-Plugins (Tailwind, Autoprefixer)
├── tsconfig.json                # Strikes TypeScript-Konfiguration (astro/tsconfigs/strict)
├── netlify.toml                 # Deployment & Security-Headers
└── package.json                 # Abhängigkeiten & Scripts
```

### Komponenten-Muster

Alle Seiten folgen einem identischen Aufbau:

1. **Frontmatter:** Imports von `Layout`, `Header`, `Footer` und ggf. weiteren Komponenten.
2. **Seiten-Variablen:** `pageTitle` und `pageDescription` werden pro Seite individuell definiert.
3. **Layout-Wrapping:** `<Layout title={pageTitle} description={pageDescription}>` umschließt den gesamten Inhalt.
4. **Header + Main + Footer:** `<Header />` → `<main id="main-content">...</main>` → `<Footer />`.
5. **Globale UI-Elemente:** `StickyMobileCTA` und `CookieBanner` werden zentral in `Layout.astro` gerendert (nicht pro Seite).

### Layout.astro – Zentrale SEO- und Meta-Logik

`Layout.astro` ist der zentrale Vertragspunkt für jede Seite. Es erledigt:

- Einbindung von `global.css`
- Meta-Tags (`viewport`, `robots`, `theme-color`)
- `<title>` und `<meta name="description">`
- Canonical-URL (`Astro.url.pathname` + Basisfixierung auf `https://eshhaustechnik.de`)
- Open Graph Tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`)
- Twitter-Card Tags
- Favicons (SVG, ICO, Apple-Touch-Icon)
- Schema.org JSON-LD (`LocalBusiness` + `Plumber` + `HVACBusiness`) mit hartkodierten Unternehmensdaten
- Skip-Link für Barrierefreiheit (`Zum Hauptinhalt springen`)

**Wichtig:** Wenn neue Seiten angelegt werden, müssen sie `Layout.astro` importieren und `title` sowie `description` übergeben.

---

## Build-, Entwicklungs- und Testbefehle

Alle Befehle werden im Projektroot ausgeführt:

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (http://localhost:4321)
npm run dev

# Produktionsbuild erstellen (Output in ./dist/)
npm run build

# Build lokal vorab prüfen (http://localhost:4321)
npm run preview

# Astro-CLI-Befehle
npm run astro -- --help
```

### Teststrategie

- **Derzeit ist kein Test-Framework konfiguriert** (kein Playwright, Vitest, Jest o.ä.).
- Änderungen müssen manuell geprüft werden:
  1. `npm run dev` – visuelle und interaktive Prüfung im Browser.
  2. `npm run build` – Prüfung auf Build-Fehler. Astro verwendet strikte TypeScript-Prüfung; selbst kleine Typfehler können den Build abbrechen.
  3. `npm run preview` – Prüfung des Produktions-Builds vor dem Deployment.
- Besondere Aufmerksamkeit auf:
  - Konsolenfehler in Inline-Scripts (Mobile-Menü, Cookie-Banner, Kontaktformular, Karten-Loader).
  - Responsives Verhalten (Mobile, Tablet, Desktop).
  - Barrierefreiheit (Fokus-Ringe, aria-Attribute, Skip-Link).

---

## Code-Style-Richtlinien

### Allgemein

- **ES Modules** verwenden (`"type": "module"` in `package.json`).
- Astro-Komponenten nutzen `---` Frontmatter für Imports und Logik.
- Alle Inhalte, Kommentare und `alt`-Texte sind auf **Deutsch** zu verfassen.

### Styling

- **Tailwind-Klassen bevorzugen**; Inline-Styles (`style="..."`) sind zu vermeiden.
- Container-Breite: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Abstände für Sektionen: `py-16 lg:py-24`
- Runde Ecken: `rounded-xl`, `rounded-2xl`, `rounded-md`
- Schatten: `shadow-sm`, `hover:shadow-lg`
- Transitionen: `transition-all duration-300`
- Fokus-Stile: `focus:outline-none focus-visible:ring-2 focus-visible:ring-accent` (nie nur `focus:` allein)

### Farben

Die Farbpalette ist in `src/styles/global.css` als CSS-Custom-Properties definiert und in `tailwind.config.mjs` registriert:

- **Primary:** `rgb(19 44 61)` – `text-primary`, `bg-primary`
- **Accent:** `rgb(60 123 154)` – `text-accent`, `bg-accent`

### JavaScript / Interaktivität

- Inline-Scripts in Komponenten müssen robust gegen fehlende DOM-Elemente sein:
  ```js
  const element = document.getElementById('...');
  if (!element) return;
  ```
- Scripts werden direkt in `.astro`-Dateien nach dem Template-Block platziert.
- Keine externen JS-Bibliotheken für UI-Interaktionen (Vanilla JS only).

### Bilder & Assets

- Hero-Bilder und Logo verwenden `loading="eager"` und `fetchpriority="high"`.
- Alle anderen Bilder verwenden `loading="lazy"`.
- Dekorative SVG-Icons erhalten `aria-hidden="true"`.
- Aussagekräftige `alt`-Texte auf Deutsch sind Pflicht.

### Wiederkehrende Hardcoded-Werte

Die folgenden Unternehmensdaten sind an mehreren Stellen hartkodiert (Header, Footer, Layout, Seiten). Bei Änderungen müssen **alle** Vorkommen angepasst werden:

- Telefon (Link): `tel:015565258799`
- Telefon (Anzeige): `01556 5258799`
- E-Mail: `mailto:Info@eshhaustechnik.de` / `Info@eshhaustechnik.de`
- Adresse: `Elbingstr 2, 50354 Hürth`
- WhatsApp: `https://wa.me/4915565258799`

---

## Barrierefreiheit (A11y)

- Alle interaktiven Elemente müssen `aria-label` haben, wenn der sichtbare Text nicht selbsterklärend ist.
- Fokus-Ringe werden über `focus-visible:` umgesetzt (kein `focus:` allein).
- Aktive Navigation erhält `aria-current="page"`.
- Mobiles Menü hat `aria-expanded` und `aria-controls`.
- `Layout.astro` enthält einen Skip-Link (`Zum Hauptinhalt springen`).
- `<main id="main-content">` ist auf jeder Seite vorhanden.

---

## SEO & Local SEO

- Jede Seite hat ein individuelles `title` und `description`, optimiert auf Keywords wie „Heizungsbauer“, „Sanitär“, „Badsanierung“, „Köln“, „Hürth“.
- **Schema.org JSON-LD** in `Layout.astro` deklariert den Betrieb als `LocalBusiness` + `Plumber` + `HVACBusiness` mit Adresse, Telefon, E-Mail, Öffnungszeiten (Mo–Fr 08:00–18:00), `priceRange: "€€"` und Einsatzgebieten.
- Der Footer listet explizit Einsatzgebiete (`Hürth`, `Köln`, `Frechen`, `Kerpen`, `Brühl`, `Erftstadt`, `Bergheim`) für Local SEO auf.
- Canonical-URLs werden automatisch aus `Astro.url.pathname` gebildet.
- `robots.txt` erlaubt alle Crawler und verweist auf `https://eshhaustechnik.de/sitemap-index.xml`.

---

## Kontaktformular & Externe Integrationen

### Web3Forms

- Das Formular auf `/kontakt` nutzt **Web3Forms** (`https://api.web3forms.com/submit`).
- **WICHTIG:** In `src/pages/kontakt.astro` (Zeile ~12) ist die Konstante `WEB3FORMS_ACCESS_KEY` noch auf `'YOUR_ACCESS_KEY_HERE'` gesetzt. Dies muss vor Go-Live durch einen echten Access Key ersetzt werden.
- Das Formular wird per Inline-Script als AJAX (`fetch`) abgeschickt (`Content-Type: application/json`).
- Es gibt einen visuellen Erfolgs- und Fehlerzustand (`#form-success`, `#form-error`).
- **Spam-Schutz:**
  - Honeypot-Feld (`_gotcha`) – wird im Script geprüft (`if (data._gotcha) return;`).
  - Hidden-Checkbox (`botcheck`) mit `style="display:none"`.
  - Pflichtfeld-Datenschutz-Checkbox (`privacy`).

### Google Maps (Two-Click-Lösung)

- Auf `/kontakt` befindet sich ein Platzhalter für Google Maps.
- Die Karte wird **nicht** automatisch geladen, sondern erst nach Klick auf „Karte anzeigen“.
- Der Iframe hat `referrerPolicy = 'no-referrer-when-downgrade'`.
- **Hinweis:** Die aktuell eingetragene `iframe.src` enthält noch näherungsweise Koordinaten (Placeholder).

---

## Cookie-Banner & Datenschutz

- Es werden ausschließlich technisch notwendige Cookies sowie die Einwilligungspräferenz im `localStorage` unter dem Key `esh_cookie_consent` gespeichert.
- Keine Tracking- oder Analyse-Cookies ohne Zustimmung.
- Externe Inhalte (z. B. Google Maps) werden erst nach expliziter Zustimmung geladen (Two-Click-Lösung).
- Das Cookie-Banner ist in `CookieBanner.astro` implementiert und wird global in `Layout.astro` eingebunden.

---

## Security Considerations

### Netlify Security Headers

Die `netlify.toml` konfiguriert folgende Security-Headers für alle Routen (`/*`):

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (strikt eingeschränkt: kein Kamera, Mikrofon, Geolocation etc.)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- **Content-Security-Policy (CSP):**
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline'` (notwendig für Inline-Scripts)
  - `style-src 'self' 'unsafe-inline'` (notwendig für Tailwind)
  - `img-src 'self' data: blob:`
  - `font-src 'self'`
  - `connect-src 'self' https://api.web3forms.com`
  - `frame-ancestors 'none'`
  - `base-uri 'self'`
  - `form-action 'self' https://api.web3forms.com`

### Caching

Statische Assets werden mit langem Cache ausgeliefert:
- `/assets/*`, `/*.css`, `/*.js` → `public, max-age=31536000, immutable`

### Lokale Sicherheit

- Keine `.env`-Datei im Repository (keine Secrets ausgenommen des Platzhalter-API-Keys im Kontaktformular).
- Keine sensiblen Kundendaten im Code.

---

## Bekannte TODOs / Offene Punkte

Bei Änderungen solltest du diese Stellen im Blick behalten:

1. **`src/pages/kontakt.astro` (Zeile ~12):** `WEB3FORMS_ACCESS_KEY` muss durch einen echten Web3Forms-Key ersetzt werden.
2. **`src/pages/impressum.astro`:** USt-IdNr. und Handwerkskammer-Angaben fehlen noch (markiert mit `TODO`-Kommentaren).
3. **`src/pages/referenzen.astro`:** Kundenbewertungen (Testimonials) sind noch Platzhalter (markiert mit `TODO`-Kommentaren).
4. **`src/pages/kontakt.astro`:** Google-Maps-Einbettung hat einen Platzhalter-iframe mit näherungsweisen Koordinaten.

---

## Zusammenfassung für schnelles Onboarding

1. `npm install` → `npm run dev`
2. Jede neue Seite: `src/pages/<name>.astro` anlegen, `Layout.astro` + `Header` + `Footer` importieren, `<main id="main-content">` verwenden.
3. Styling ausschließlich mit Tailwind-Utility-Klassen.
4. Inline-Scripts immer mit Null-Checks (`if (!el) return;`).
5. Build-Fehler sind wahrscheinlich, wenn TypeScript-Regeln verletzt werden – daher immer `npm run build` vor dem Commit testen.
6. Keine externen Tracker oder Cookies ohne Prüfung des Datenschutzkonzepts hinzufügen.
