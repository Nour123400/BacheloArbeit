let modules = [];
let filtered = [];
let selectedModulnummer = null;

window.addEventListener('DOMContentLoaded', function () {
  fetch('/api/module')
    .then(res => {
      if (!res.ok) throw new Error("Datei nicht gefunden!");
      return res.json();
    })
    .then(json => {
      modules = json;
      filtered = [...modules];
      showModuleList();
    })
    .catch(err => {
      alert("Konnte Module nicht laden:\n" + err);
    });
});

document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  filtered = modules.filter(m =>
    (m.Modulnummer && m.Modulnummer.toLowerCase().includes(q)) ||
    (m.Modulbezeichnung && m.Modulbezeichnung.toLowerCase().includes(q))
  );
  showModuleList();
});

function showModuleList() {
  const ul = document.createElement('ul');
  filtered.forEach((mod) => {
    const li = document.createElement('li');
    li.textContent = mod.Modulnummer + (mod.Modulbezeichnung ? " – " + mod.Modulbezeichnung : "");
    li.onclick = () => editModule(mod.Modulnummer);
    if (selectedModulnummer === mod.Modulnummer) li.classList.add('active');
    ul.appendChild(li);
  });
  document.getElementById('moduleList').innerHTML = '';
  document.getElementById('moduleList').appendChild(ul);
}

function editModule(modulnummer) {
  selectedModulnummer = modulnummer;
  const mod = filtered.find(m => m.Modulnummer === modulnummer);
  const form = document.getElementById('editForm');
  document.getElementById('moduleForm').style.display = 'block';
  form.Modulnummer.value = mod.Modulnummer || '';
  form.Modulbezeichnung.value = mod.Modulbezeichnung || '';
  form.Fakultät.value = mod.Fakultät || '';
  form.Niveau.value = mod.Niveau || 'Bachelor';
  form.Fachsemester.value = mod.Fachsemester || '1';
  form.Dauer.value = mod.Dauer || '1 Semester';
  form.Turnus.value = mod.Turnus || 'Wintersemester';
  form.Anrede.value = mod.Modulverantwortliche?.Anrede || '';
  form.Vorname.value = mod.Modulverantwortliche?.Vorname || '';
  form.Nachname.value = mod.Modulverantwortliche?.Nachname || '';
  form.Workload.value = mod.Workload || '';
  form.SWS_V.value = mod.Lehrveranstaltungen?.SWS_V || '';
  form.SWS_S.value = mod.Lehrveranstaltungen?.SWS_S || '';
  form.SWS_P.value = mod.Lehrveranstaltungen?.SWS_P || '';
  form.SWS_gesamt.value = mod.Lehrveranstaltungen?.SWS_gesamt || '';
  form.Modultyp.value = mod.Modultyp || 'PF';
  form.Aufteilung.value = mod.Lehrveranstaltungen?.Aufteilung ? JSON.stringify(mod.Lehrveranstaltungen.Aufteilung, null, 2) : '';
  form.Charakter.value = mod.CharakterLehrveranstaltung ? JSON.stringify(mod.CharakterLehrveranstaltung, null, 2) : '';
  form.ZusammenMit.value = (mod.ZusammenMit || []).join(', ');
  form.Teilnehmerzahlen.value = mod.Teilnehmerzahlen ? JSON.stringify(mod.Teilnehmerzahlen, null, 2) : '';
  form.Verwendbarkeit.value = mod.Verwendbarkeit ? JSON.stringify(mod.Verwendbarkeit, null, 2) : '';
  document.querySelector('#moduleForm h2').textContent = 'Modul bearbeiten';
  showModuleList();
}

function addModule() {
  selectedModulnummer = null;
  const form = document.getElementById('editForm');
  document.getElementById('moduleForm').style.display = 'block';

  // Werte wie gefordert vorbelegen
  form.Modulnummer.value = '';
  form.Modulnummer.placeholder = 'z.B. C114';

  form.Modulbezeichnung.value = '';
  form.Modulbezeichnung.placeholder = 'z.B. Modellierung';

  form.Fakultät.value = 'FIM-INF';
  form.Fakultät.placeholder = '';

  form.Niveau.value = 'Bachelor';

  form.Fachsemester.value = '1';
  form.Fachsemester.placeholder = '';

  form.Dauer.value = '1 Semester';
  form.Dauer.placeholder = '';

  form.Turnus.value = 'Wintersemester';

  form.Anrede.value = '';
  form.Anrede.placeholder = 'z.B. Fr. Prof.';

  form.Vorname.value = '';
  form.Vorname.placeholder = 'z.B. Thomas';

  form.Nachname.value = '';
  form.Nachname.placeholder = 'z.B. Riechert';

  form.Workload.value = '';
  form.Workload.placeholder = 'z.B. 150';

  form.SWS_V.value = '';
  form.SWS_V.placeholder = 'z.B. 4';
  form.SWS_S.value = '';
  form.SWS_S.placeholder = 'z.B. 2';
  form.SWS_P.value = '';
  form.SWS_P.placeholder = 'z.B. 0';
  form.SWS_gesamt.value = '';
  form.SWS_gesamt.placeholder = 'z.B. 6';

  form.Modultyp.value = 'PF';

  form.Aufteilung.value = '';
  form.Aufteilung.placeholder = '[{ "Typ":"Vorlesung", "Dozent":"Fr. Prof. Schwarz", "Gruppen":"25INB-1+2+3", "Gruppenanzahl":1 }]';

  form.Charakter.value = JSON.stringify({ "Durchführung": "Präsenz", "Sprache": "Deutsch" }, null, 2);
  form.Charakter.placeholder = '';

  form.ZusammenMit.value = 'INB, MIB';
  form.ZusammenMit.placeholder = '';

  form.Teilnehmerzahlen.value = '';
  form.Teilnehmerzahlen.placeholder = '{"Gesamt":180,"INB_Seminare":{"Gruppen":3,"TeilnehmerProGruppe":40}}';

  form.Verwendbarkeit.value = '';
  form.Verwendbarkeit.placeholder = '{"Studiengang":"INB"}';

  document.querySelector('#moduleForm h2').textContent = 'Neues Modul anlegen';
  showModuleList();
}

function saveModule() {
  const form = document.getElementById('editForm');
  const modulnummer = form.Modulnummer.value.trim();
  if (!modulnummer) {
    alert("Modulnummer darf nicht leer sein!");
    return;
  }
  let mod = modules.find(m => m.Modulnummer === modulnummer);
  let isNew = !mod;

  if (isNew) {
    mod = {};
  }

  mod.Modulnummer = modulnummer;
  mod.Modulbezeichnung = form.Modulbezeichnung.value;
  mod.Fakultät = form.Fakultät.value;
  mod.Niveau = form.Niveau.value;
  mod.Fachsemester = form.Fachsemester.value;
  mod.Dauer = form.Dauer.value;
  mod.Turnus = form.Turnus.value;
  mod.Modulverantwortliche = {
    "Anrede": form.Anrede.value,
    "Vorname": form.Vorname.value,
    "Nachname": form.Nachname.value
  };
  mod.Workload = Number(form.Workload.value);
  mod.Lehrveranstaltungen = {
    "SWS_V": Number(form.SWS_V.value),
    "SWS_S": Number(form.SWS_S.value),
    "SWS_P": Number(form.SWS_P.value),
    "SWS_gesamt": Number(form.SWS_gesamt.value)
  };
  mod.Modultyp = form.Modultyp.value || '';
  try {
    mod.Lehrveranstaltungen.Aufteilung = JSON.parse(form.Aufteilung.value || '[]');
  } catch {
    alert("Lehrkraft & Gruppeneinteilung muss ein gültiges JSON sein!");
    return;
  }
  try {
    mod.CharakterLehrveranstaltung = JSON.parse(form.Charakter.value || '{}');
  } catch {
    alert("Charakter der Lehrveranstaltung muss ein gültiges JSON sein!");
    return;
  }
  mod.ZusammenMit = form.ZusammenMit.value.split(',').map(s => s.trim()).filter(Boolean);
  try {
    mod.Teilnehmerzahlen = JSON.parse(form.Teilnehmerzahlen.value || '{}');
  } catch {
    alert("Teilnehmerzahlen muss ein gültiges JSON sein!");
    return;
  }
  try {
    mod.Verwendbarkeit = JSON.parse(form.Verwendbarkeit.value || '{}');
  } catch {
    alert("Verwendbarkeit muss ein gültiges JSON sein!");
    return;
  }

  if (isNew) {
    modules.push(mod);
    filtered = [...modules];
  } else {
    const idx = modules.findIndex(m => m.Modulnummer === modulnummer);
    if (idx >= 0) modules[idx] = mod;
    const fIdx = filtered.findIndex(m => m.Modulnummer === modulnummer);
    if (fIdx >= 0) filtered[fIdx] = { ...mod };
  }

  fetch('/api/module', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(modules)
  })
    .then(res => res.json())
    .then(resp => {
      if (resp.success) {
        showModuleList();
        document.getElementById('moduleForm').style.display = 'none';
        selectedModulnummer = null;
        alert(isNew ? 'Modul hinzugefügt!' : 'Änderung gespeichert!');
      } else {
        alert('Speichern fehlgeschlagen: ' + resp.error);
      }
    })
    .catch(err => {
      alert('Fehler beim Speichern:\n' + err);
    });
}

function cancelEdit() {
  document.getElementById('moduleForm').style.display = 'none';
  selectedModulnummer = null;
  showModuleList();
}
