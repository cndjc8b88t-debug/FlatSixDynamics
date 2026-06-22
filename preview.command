#!/bin/bash
# FlatSixDynamics — Local Preview (one click)
# Doppelklick startet den Eleventy-Dev-Server und oeffnet den Browser.
# NIEMALS die .html direkt per file:// oeffnen — Asset-Pfade sind root-absolut
# und loesen sich nur ueber einen Server (localhost:8081) korrekt auf.

set -e

# In das Verzeichnis dieser Datei wechseln (= Website-Repo-Wurzel).
cd "$(dirname "$0")"

PORT=8081
URL="http://localhost:${PORT}/"

echo "============================================================"
echo "  FlatSixDynamics — lokale Vorschau"
echo "  URL: ${URL}"
echo "  Zum Beenden: Ctrl+C druecken oder dieses Fenster schliessen."
echo "============================================================"

# Hinweis, falls der Port schon belegt ist (z. B. alter Server laeuft noch).
if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo ""
  echo "  HINWEIS: Port ${PORT} ist bereits belegt — vermutlich laeuft die"
  echo "  Vorschau schon. Ich oeffne nur den Browser auf ${URL}."
  echo ""
  open "${URL}"
  exit 0
fi

# Browser nach kurzer Wartezeit oeffnen (Server braucht ~2 s zum Hochfahren).
( sleep 3; open "${URL}" ) &

# Eleventy-Dev-Server starten (PATH_PREFIX=/ => root-absolute Pfade passen).
exec npm run serve
