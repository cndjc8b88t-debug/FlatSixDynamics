# Lokale Vorschau der FlatSixDynamics-Website

1. **Doppelklick auf `preview.command`** — der Eleventy-Dev-Server startet und der Browser oeffnet automatisch `http://localhost:8081/`. Zum Beenden im Terminal-Fenster `Ctrl+C` druecken oder das Fenster schliessen.
2. **NIEMALS** eine `.html`-Datei direkt per Doppelklick (`file://`) oeffnen — die Asset-Pfade sind root-absolut und laden dann kein CSS/keine Bilder (alles unstyled).
3. **Production** wird nicht lokal deployed: GitHub Actions baut bei `push` → `main` automatisch und publiziert nach GitHub Pages (PATH_PREFIX `/FlatSixDynamics/`).
