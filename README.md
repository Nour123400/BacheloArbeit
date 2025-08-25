# RDF‑Formular – Entwicklungs-Prototyp

**Kurzüberblick**
- Drei Formulare: **Module**, **Zuarbeit**, **Dozenten**
- Zweck: automatische Formularbefüllung & Datenerfassung (Entwicklung / Tests für die Bachelorarbeit)
- Server läuft unter: `http://localhost:3000`

**Seiten**
- `/module/modulverwaltung.html` – Module verwalten (Infos einfügen/bearbeiten). Daten werden als **JSON** gespeichert und zur automatischen Formularbefüllung genutzt.
- `/zuarbeit/zuarbeitformular.html` – Zuarbeit; Modulauswahl füllt Felder vor. Speichert nach `rdf-formular/data/zuarbeitsblatt.ttl`.
- `/dozenten/dozentenformular.html` – analog Zuarbeit. Speichert nach `rdf-formular/data/dozentenblatt.ttl`.

## Screenshots

### Module
![M1](rdf-formular/Bilder/M1.png)
![M2](rdf-formular/Bilder/M2.png)
![M3](rdf-formular/Bilder/M3.png)

### Zuarbeit
![Z1 – Auswahl](rdf-formular/Bilder/Z1Auswahl.png)
![Z2](rdf-formular/Bilder/Z2.png)
![Z3](rdf-formular/Bilder/Z3.png)

### Dozenten
![D1 – Modul-Auswahl](rdf-formular/Bilder/D1ModulAuswahl.png)
![D2](rdf-formular/Bilder/D2.png)
![D3](rdf-formular/Bilder/D3.png)

**Abhängigkeiten**
- Node.js
- `express`
- `body-parser` (falls verwendet)

---

## Installation & Start (am Ende)

### Lokal
```bash
npm install
node server.js
# Server: http://localhost:3000
```

### Container (Docker **oder** Podman)
**Dockerfile (minimal)**
```dockerfile
FROM node:latest
WORKDIR /usr/src/app
RUN npm init -y && npm install express body-parser
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**Build & Run**
```bash
# Docker
docker build -t rdf-formular .
docker run --rm -p 3000:3000   -v "$PWD/rdf-formular/data:/usr/src/app/rdf-formular/data"   rdf-formular

# Podman
podman build -t rdf-formular .
podman run --rm -p 3000:3000   -v "$PWD/rdf-formular/data:/usr/src/app/rdf-formular/data"   rdf-formular
```
