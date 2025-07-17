const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const data = req.body;

  const timestamp = Date.now();
  const turtle = `
:LV_${data.modulnummer}_${timestamp} a ex:Lehrveranstaltung ;
  ex:modulnummer "${data.modulnummer}" ;
  ex:modulbezeichnung "${data.modulbezeichnung}" ;
  ex:bezeichnung "${data.bezeichnung}" ;
  ex:gesamtSWS ${data.sws} ;
  ex:dozent "${data.dozent}" ;
  ex:gruppe "${data.gruppe}" ;
  ex:technikAnforderung "${data.technik}" .
`;

  const prefix = `@prefix ex: <http://example.org/htwk#> .\n@prefix : <http://example.org/data/> .\n\n`;
  const filePath = path.join(__dirname, 'data', 'eintraege.ttl');

  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);

  res.send('<h2>✅ RDF gespeichert!</h2><a href="/">Zurück zum Formular</a>');
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft unter http://localhost:${PORT}`);
});

