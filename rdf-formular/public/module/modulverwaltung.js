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
  form.Niveau.value = mod.Niveau || '';
  form.Fachsemester.value = mod.Fachsemester || '';
  form.Dauer.value = mod.Dauer || '';
  form.Turnus.value = mod.Turnus || '';
  form.Anrede.value = mod.Modulverantwortliche?.Anrede || '';
  form.Vorname.value = mod.Modulverantwortliche?.Vorname || '';
  form.Nachname.value = mod.Modulverantwortliche?.Nachname || '';
  form.Workload.value = mod.Workload || '';
  form.SWS_V.value = mod.Lehrveranstaltungen?.SWS_V || 0;
  form.SWS_S.value = mod.Lehrveranstaltungen?.SWS_S || 0;
  form.SWS_P.value = mod.Lehrveranstaltungen?.SWS_P || 0;
  form.SWS_gesamt.value = mod.Lehrveranstaltungen?.SWS_gesamt || 0;
  // Neue Felder:
  form.Modultyp.value = mod.Modultyp || '';
  form.Aufteilung.value = mod.Lehrveranstaltungen?.Aufteilung ? JSON.stringify(mod.Lehrveranstaltungen.Aufteilung, null, 2) : '';
  form.Charakter.value = mod.CharakterLehrveranstaltung ? JSON.stringify(mod.CharakterLehrveranstaltung, null, 2) : '';
  form.ZusammenMit.value = (mod.ZusammenMit || []).join(', ');
  form.Teilnehmerzahlen.value = mod.Teilnehmerzahlen ? JSON.stringify(mod.Teilnehmerzahlen, null, 2) : '';
  form.Verwendbarkeit.value = mod.Verwendbarkeit ? JSON.stringify(mod.Verwendbarkeit, null, 2) : '';
  showModuleList();
}

function saveModule() {
  if (!selectedModulnummer) return;
  const form = document.getElementById('editForm');
  const mod = modules.find(m => m.Modulnummer === selectedModulnummer);
  mod.Modulnummer = form.Modulnummer.value;
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
  // Neue Felder:
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
  // Auch in filtered updaten, falls gesucht wurde:
  const fIdx = filtered.findIndex(m => m.Modulnummer === mod.Modulnummer);
  if (fIdx >= 0) filtered[fIdx] = { ...mod };
  // Änderungen auf Server speichern:
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
        alert('Änderung gespeichert!');
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
