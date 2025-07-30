let planungsKalenderZaehler = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("planungsKalenderAddBtn").addEventListener("click", addPlanungsKalenderRow);
  addPlanungsKalenderRow(); // Immer mit einer Zeile starten
});

function addPlanungsKalenderRow() {
  const container = document.getElementById("planungsKalender");
  const wochen = [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,39];

  let table = document.getElementById("planungsKalenderTable");
  if (!table) {
    // Neu erzeugen!
    table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.id = "planungsKalenderTable";

    // Header
    const headRow = table.insertRow();
    wochen.forEach(w => {
      const th = document.createElement("th");
      th.textContent = w;
      headRow.appendChild(th);
    });
    const thName = document.createElement("th");
    thName.textContent = "Name";
    headRow.appendChild(thName);

    container.innerHTML = ""; // leeren!
    container.appendChild(table);
  }

  // Hauptzeile
  planungsKalenderZaehler++;
  const zeilenId = planungsKalenderZaehler;

  const row1 = table.insertRow(-1);
  row1.setAttribute("data-id", zeilenId);

  wochen.forEach(w => {
    const td = row1.insertCell();
    if (w === 39) {
      td.rowSpan = 2;
      td.innerHTML = `<div style="font-size:smaller;">Prüfung</div><input type="checkbox" name="kw_pruefung_${zeilenId}">`;
      td.style.minWidth = "50px";
    } else {
      td.innerHTML = `<input type="checkbox" name="kw_${w}_${zeilenId}">`;
    }
  });

  const nameTd = row1.insertCell();
  nameTd.rowSpan = 2;
  nameTd.innerHTML = `
    <input name="planungs_name_${zeilenId}" style="width:90px">
    <button type="button" onclick="removePlanungsKalenderRow(this)">🗑️</button>
  `;

  // 2. Zeile
  const row2 = table.insertRow(-1);
  row2.setAttribute("data-id", zeilenId);

  wochen.forEach(w => {
    if (w === 39) return; // schon oben
    const td = row2.insertCell();
    td.innerHTML = `<input type="text" name="kwtxt_${w}_${zeilenId}" style="width:32px;">`;
  });
}

function removePlanungsKalenderRow(btn) {
  const cell = btn.closest('td');
  const tr = btn.closest('tr');
  const table = document.getElementById("planungsKalenderTable");

  // Nur löschen wenn mind. 2 Datensätze (jeweils 2 Zeilen pro Datensatz)
  let datensatzRows = Array.from(table.querySelectorAll('tr[data-id]'));
  let uniqueIds = [...new Set(datensatzRows.map(r => r.getAttribute('data-id')))];

  if (uniqueIds.length <= 1) return; // Nie die letzte entfernen!

  // aktuelle ID ermitteln
  const zeilenId = tr.getAttribute('data-id');
  // Beide Zeilen zu diesem Datensatz entfernen
  datensatzRows.filter(r => r.getAttribute('data-id') === zeilenId)
    .forEach(row => row.parentNode.removeChild(row));
}

// für Inline-Buttons global machen:
window.removePlanungsKalenderRow = removePlanungsKalenderRow;
