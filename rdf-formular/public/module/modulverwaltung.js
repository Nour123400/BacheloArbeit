let modules = [];
let filtered = [];
let selectedModulnummer = null; // eindeutige Auswahl

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
    li.onclick = () => editModule(mod.Modulnummer); // eindeutig per Nummer
    if (selectedModulnummer === mod.Modulnummer) li.classList.add('active');
    ul.appendChild(li);
  });
  document.getElementById('moduleList').innerHTML = '';
  document.getElementById('moduleList').appendChild(ul);
}

function editModule(modulnummer) {
  selectedModulnummer = modulnummer;
  const mod = filtered.find(m => m.Modulnummer === modulnummer);
  document.getElementById('moduleForm').style.display = 'block';
  document.getElementById('editForm').Modulnummer.value = mod.Modulnummer || '';
  document.getElementById('editForm').Modulbezeichnung.value = mod.Modulbezeichnung || '';
  document.getElementById('editForm').Fakultät.value = mod.Fakultät || '';
  document.getElementById('editForm').Niveau.value = mod.Niveau || '';
  document.getElementById('editForm').Fachsemester.value = mod.Fachsemester || '';
  document.getElementById('editForm').Dauer.value = mod.Dauer || '';
  document.getElementById('editForm').Turnus.value = mod.Turnus || '';
  document.getElementById('editForm').Anrede.value = mod.Modulverantwortliche?.Anrede || '';
  document.getElementById('editForm').Vorname.value = mod.Modulverantwortliche?.Vorname || '';
  document.getElementById('editForm').Nachname.value = mod.Modulverantwortliche?.Nachname || '';
  document.getElementById('editForm').Workload.value = mod.Workload || '';
  document.getElementById('editForm').SWS_V.value = mod.Lehrveranstaltungen?.SWS_V || 0;
  document.getElementById('editForm').SWS_S.value = mod.Lehrveranstaltungen?.SWS_S || 0;
  document.getElementById('editForm').SWS_P.value = mod.Lehrveranstaltungen?.SWS_P || 0;
  document.getElementById('editForm').SWS_gesamt.value = mod.Lehrveranstaltungen?.SWS_gesamt || 0;
  document.getElementById('editForm').Verwendbarkeit.value = JSON.stringify(mod.Verwendbarkeit, null, 2);
  showModuleList(); // Markierung immer aktuell!
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
  try {
    mod.Verwendbarkeit = JSON.parse(form.Verwendbarkeit.value);
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
  showModuleList(); // Markierung entfernen
}
