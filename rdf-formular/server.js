const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { saveDozentenblatt } = require('./dozentenblatt');
const { saveZuarbeitsblatt } = require('./zuarbeitsblatt');

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

// Formular speichern: Typ entscheidet, welche Funktion!
app.post('/submit', (req, res) => {
  const d = req.body;
  const type = req.query.type || 'dozent';

  if (type === 'dozent') {
    saveDozentenblatt(d);
  } else if (type === 'zuarbeit') {
    saveZuarbeitsblatt(d);
  } else {
    res.status(400).send('Ungültiger Formular-Typ!');
    return;
  }

  res.send('<h2>✅ RDF gespeichert!</h2><a href="/">Zurück zur Auswahl</a>');
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft unter http://localhost:${PORT}`);
});
