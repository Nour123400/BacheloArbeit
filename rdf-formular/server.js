const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Modul-Daten bereitstellen (Dropdown & Autovervollständigung)
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

// Formular speichern: Typ entscheidet, welche TTL!
app.post('/submit', (req, res) => {
  const d = req.body;
  const type = req.query.type || 'dozent';
  const id = Date.now();

  let prefix, turtle, fileName;

  if (type === 'dozent') {
    prefix = `@prefix ex: <http://example.org/htwk#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/data/> .

`;
    fileName = 'dozentenblatt.ttl';

    turtle = `
:Dozentenblatt_${id} a ex:Dozentenblatt ;
  ex:abgabeterminDS "${d.abgabetermin || ""}"^^xsd:date ;
  ex:eingangDS "${d.eingang || ""}" ;
  ex:hochschule "${d.hochschule || ""}" ;
  ex:semester "${d.semester || ""}" ;
  ex:titel "${d.titel || ""}" ;
  ex:vorname "${d.vorname || ""}" ;
  ex:name "${d.name || ""}" ;
  ex:email "${d.email || ""}" ;
  ex:telefon "${d.telefon || ""}" ;
  ex:arbeitszeit "${d.arbeitszeit || ""}" ;
  ex:fakultaet "${d.fakultaet || ""}" ;
  ex:studiengang "${d.studiengang || ""}" ;
  ex:modulnummer "${d.modulnummer || ""}" ;
  ex:modulbezeichnung "${d.modulbezeichnung || ""}" ;
  ex:lehrveranstaltungsnummer "${d.lvnummer || ""}" ;
  ex:lehrveranstaltungsbezeichnung "${d.lvname || ""}" ;
  ex:gesamtSWS ${d.sws || 0} ;
  ex:vorlesungSWS ${d.vl || 0} ;
  ex:seminarSWS ${d.sem || 0} ;
  ex:praktikumSWS ${d.prak || 0} ;
  ex:dozent "${d.dozent || ""}" ;
  ex:bemerkung "${d.bemerkung || ""}" ;
  ex:unterschriftProfessor "${d.prof || ""}" ;
  ex:unterschriftDekan "${d.dekan || ""}" .
`;

  } else if (type === 'zuarbeit') {
    prefix = `@prefix ex: <http://example.org/htwk#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/data/> .

`;

    fileName = 'zuarbeitsblatt.ttl';

    // Hilfsfunktion für die Tage-Checkboxen
    function getWunschTag(d, tag, typ) {
      return d[`wunschtag_${tag}_${typ}`] === 'on';
    }

    turtle = `
:Zuarbeitsblatt_${id} a ex:Zuarbeitsblatt ;
  ex:abgabeterminDS "${d.abgabetermin || ""}"^^xsd:date ;
  ex:eingangDS "${d.eingang || ""}" ;
  ex:hochschule "${d.hochschule || ""}" ;
  ex:semester "${d.semester || ""}" ;
  ex:titel "${d.titel || ""}" ;
  ex:vorname "${d.vorname || ""}" ;
  ex:name "${d.name || ""}" ;
  ex:email "${d.email || ""}" ;
  ex:telefon "${d.telefon || ""}" ;
  ex:fakultaet "${d.fakultaet || ""}" ;
  ex:studiengang "${d.studiengang || ""}" ;
  ex:fachsemester ${d.fachsemester || 0} ;
  ex:gruppe "${d.gruppe || ""}" ;
  ex:modulnummer "${d.modulnummer || ""}" ;
  ex:modulbezeichnung "${d.modulbezeichnung || ""}" ;
  ex:lehrveranstaltungsnummer "${d.lvnummer || ""}" ;
  ex:lehrveranstaltungsbezeichnung "${d.lvname || ""}" ;
  ex:teilmodul "${d.teilmodul || ""}" ;
  ex:dozent "${d.dozent || ""}" ;
  ex:realeSWS_V ${d.realeSWS_V || 0} ;
  ex:realeSWS_S ${d.realeSWS_S || 0} ;
  ex:realeSWS_P ${d.realeSWS_P || 0} ;
  ex:realeSWS ${d.realeSWS || 0} ;
  ex:digitalAnteil "${d.digital_anteil || ""}" ;
  ex:bemerkung """${d.bemerkung || ""}""" ;
  ex:wunschtag_montag_D ${getWunschTag(d, "montag", "D")} ;
  ex:wunschtag_montag_F ${getWunschTag(d, "montag", "F")} ;
  ex:wunschtag_dienstag_D ${getWunschTag(d, "dienstag", "D")} ;
  ex:wunschtag_dienstag_F ${getWunschTag(d, "dienstag", "F")} ;
  ex:wunschtag_mittwoch_D ${getWunschTag(d, "mittwoch", "D")} ;
  ex:wunschtag_mittwoch_F ${getWunschTag(d, "mittwoch", "F")} ;
  ex:wunschtag_donnerstag_D ${getWunschTag(d, "donnerstag", "D")} ;
  ex:wunschtag_donnerstag_F ${getWunschTag(d, "donnerstag", "F")} ;
  ex:wunschtag_freitag_D ${getWunschTag(d, "freitag", "D")} ;
  ex:wunschtag_freitag_F ${getWunschTag(d, "freitag", "F")} ;
  ex:sperrzeit_wochentag "${d.sperr_wochentag || ""}" ;
  ex:sperrzeit_von "${d.sperr_von || ""}" ;
  ex:sperrzeit_bis "${d.sperr_bis || ""}" ;
  ex:sperrzeit_begruendung "${d.sperr_begruendung || ""}" ;
  ex:hinweisSemesterplanung """${d.hinweis_semester || ""}""" ;
  ex:hinweisRueckgabe """${d.hinweis_rueckgabe || ""}""" ;
  ex:unterschrift "${d.unterschrift || ""}" .
`;

  } else {
    res.status(400).send('Ungültiger Formular-Typ!');
    return;
  }

  // Schreibe Datei
  const filePath = path.join(__dirname, 'data', fileName);
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
  res.send('<h2>✅ RDF gespeichert!</h2><a href="/">Zurück zur Auswahl</a>');
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft unter http://localhost:${PORT}`);
});
