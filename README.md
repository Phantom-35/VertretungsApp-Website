# KAG Vertretungsplan – Info-Website

Statische Website mit Startseite, Hilfe, Impressum und Datenschutzerklärung für die Web-App
[KAG Vertretungsplan](https://vertretung-kag.vercel.app).

Reines HTML/CSS: kein Build-Schritt, keine Cookies, keine Analytics, keine externen Skripte.
Die Schriften (Source Serif 4 für Überschriften, Instrument Sans für Text; SIL Open Font License)
liegen selbst gehostet unter `fonts/` – es wird nichts von Google Fonts o. Ä. geladen.

| Datei | URL |
| --- | --- |
| `index.html` | `/` |
| `hilfe.html` | `/hilfe` |
| `impressum.html` | `/impressum` |
| `datenschutz.html` | `/datenschutz` |
| `404.html` | Fehlerseite |
| `styles.css`, `favicon.svg` | gemeinsame Gestaltung (Hell/Dunkel nach Systemeinstellung) |
| `fonts/` | selbst gehostete Schriften (WOFF2, nur lateinischer Zeichensatz) mit Lizenzen |
| `img/app/` | Bildschirmfotos der App (AVIF + WebP, hell/dunkel, je zwei Größen) für die Startseite |
| `vercel.json` | saubere URLs ohne `.html` und Sicherheits-Header (u. a. strikte Content-Security-Policy; `font-src 'self'` für die eigenen Schriften) |

Kein JavaScript: Die 3D-Bewegung der Bildschirmfotos auf der Startseite läuft über
CSS-Scroll-Animationen und ist bei „Bewegung reduzieren“ abgeschaltet. Die Bildschirmfotos
wurden mit Playwright von der App aufgenommen (Vercel-Statistik blockiert, Einführung
übersprungen, keine Benachrichtigungen eingeschaltet); das Aufnahme-Skript liegt bewusst
nicht im Repository.

Kopf und Fuß sind in allen Seiten gleich; bei Änderungen an der Navigation bitte in allen
HTML-Dateien anpassen.

## Lokal ansehen

```sh
python3 -m http.server 8000
# http://localhost:8000/impressum.html
```

(Die Adressen ohne `.html` funktionieren erst auf Vercel durch `cleanUrls`.)

## Kostenlos auf Vercel hosten (zweites Projekt)

1. Dieses Repository auf GitHub pushen.
2. In Vercel: **Add New… → Project** → dieses Repository importieren.
3. Framework Preset: **Other**. Build Command und Output Directory leer lassen
   (Root Directory = Repository-Wurzel). **Deploy**.
4. Optional unter **Settings → Domains** einen sprechenden Namen vergeben,
   z. B. `vertretung-kag-info.vercel.app` oder eine eigene Domain.
5. **Web Analytics und Speed Insights in diesem Projekt NICHT aktivieren**
   (die Datenschutzerklärung sagt, dass die Info-Seite keine Statistik nutzt).
6. In der App unter Einstellungen bzw. in der Fußzeile auf `/impressum` und
   `/datenschutz` dieser Seite verlinken – beide sollten von jeder Seite der App
   aus mit einem Klick erreichbar sein.

Alternativ: Die drei HTML-Dateien plus `styles.css`/`favicon.svg` in den
`public/`-Ordner der App kopieren; dann liegen Impressum und Datenschutz direkt
unter `vertretung-kag.vercel.app/impressum` (dort ggf. `.html` im Link angeben
oder `cleanUrls` in der App-Konfiguration setzen).

## Platzhalter

Alle Platzhalter sind ersetzt (Stand: 10. Oktober 2026). Für künftige Platzhalter
gibt es die CSS-Klasse `ph` (gelbe Markierung). Prüfen mit:
`grep -n 'class="ph"' *.html` – die Suche sollte nichts finden.

Kein Ersatz für Rechtsberatung – siehe Prüfliste in der Projektbeschreibung.
