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

// Module als ganzes Array zurückgeben (API!)
app.get('/api/module', (req, res) => {
  const configPath = path.join(__dirname, 'config', 'INB_module.json');
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(JSON.parse(data));
  });
});

// Optional: Änderungen speichern (API)
app.post('/api/module', express.json(), (req, res) => {
  const configPath = path.join(__dirname, 'config', 'INB_module.json');
  fs.writeFile(configPath, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
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
