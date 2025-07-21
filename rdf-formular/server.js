const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// API: Modulstandardwerte abrufen
app.get('/modul/:modulnummer', (req, res) => {
  const modulnummer = req.params.modulnummer;
  const configPath = path.join(__dirname, 'config', 'module_config.json');
  const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const modul = configData[modulnummer];
  if (modul) {
    res.json(modul);
  } else {
    res.status(404).json({ error: 'Modul nicht gefunden' });
  }
});

// Daten speichern als RDF/Turtle
app.post('/submit', (req, res) => {
  const d = req.body;
  const id = Date.now();

  const prefix = `@prefix ex: <http://example.org/htwk#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/data/> .

`;

  const turtle = `
:Formular_${id} a ex:Lehrplanung ;
  ex:modulnummer "${d.modulnummer}" ;
  ex:modulbezeichnung "${d.modulbezeichnung}" ;
  ex:lehrveranstaltungsnummer "${d.lvnummer}" ;
  ex:lehrveranstaltungsbezeichnung "${d.lvname}" ;
  ex:gesamtSWS ${d.sws} ;
  ex:vorlesungSWS ${d.vl} ;
  ex:seminarSWS ${d.sem} ;
  ex:praktikumSWS ${d.prak} ;
  ex:dozent "${d.dozent}" ;
  ex:gruppe "${d.gruppe}" ;
  ex:technikAnforderung "${d.technik}" ;
  ex:raumAnforderung "${d.raum}" ;
  ex:campusBereich "${d.campus}" .
`;

  const filePath = path.join(__dirname, 'data', 'eintraege.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
  res.send('<h2>✅ RDF gespeichert!</h2><a href="/">Zurück zum Formular</a>');
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft unter http://localhost:${PORT}`);
});
