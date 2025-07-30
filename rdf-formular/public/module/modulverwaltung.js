let modules = [];
let filtered = [];
let selectedIdx = null;

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
      document.getElementById('downloadBtn').style.display = 'inline-block';
    })
    .catch(err => {
      alert("Konnte Module nicht laden:\n" + err);
    });
});


document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  filtered = modules.filter(m =>
    (m.Modulnummer && m.Modulnummer.toLowerCase().includes(q)) ||
    (m.Fakultät && m.Fakultät.toLowerCase().includes(q))
  );
  showModuleList();
});

function showModuleList() {
  const ul = document.createElement('ul');
  filtered.forEach((mod, i) => {
    const li = document.createElement('li');
    li.textContent = mod.Modulnummer + (mod.Fakultät ? " – " + mod.Fakultät : "");
    li.onclick = () => editModule(i);
    if (selectedIdx === i) li.classList.add('active');
    ul.appendChild(li);
  });
  document.getElementById('moduleList').innerHTML = '';
  document.getElementById('moduleList').appendChild(ul);
}

function editModule(i) {
  selectedIdx = i;
  const mod = filtered[i];
  document.getElementById('moduleForm').style.display = 'block';
  document.getElementById('editForm').Modulnummer.value = mod.Modulnummer || '';
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
}

function saveModule() {
  if (selectedIdx == null) return;
  const form = document.getElementById('editForm');
  const mod = filtered[selectedIdx];

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
  // Sync in der Hauptliste
  const origIdx = modules.findIndex(m => m.Modulnummer === mod.Modulnummer);
  if (origIdx >= 0) modules[origIdx] = {...mod};
  showModuleList();
  document.getElementById('moduleForm').style.display = 'none';
  selectedIdx = null;
}

function cancelEdit() {
  document.getElementById('moduleForm').style.display = 'none';
  selectedIdx = null;
}

function downloadJSON() {
  const blob = new Blob([JSON.stringify(modules, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "module_bearbeitet.json";
  a.click();
  URL.revokeObjectURL(url);
}
