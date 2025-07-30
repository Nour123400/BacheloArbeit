let einsatzzeitZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("einsatzzeitAddBtn").addEventListener("click", addEinsatzzeitRow);
  addEinsatzzeitRow(); // <-- damit die erste Zeile direkt sichtbar ist!
});

function addEinsatzzeitRow() {
  const tableDiv = document.getElementById("einsatzzeitTabelle");

  if (!document.getElementById("einsatzzeitTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;width:100%;" id="einsatzzeitTable">
        <tr>
          <th colspan="4">Zeitangabe</th>
          <th rowspan="2">Anmerkung</th>
          <th rowspan="2"></th>
        </tr>
        <tr>
          <th>Wochen<br><span style="font-weight:normal;">aw/gw/uw</span></th>
          <th>Wochentag<br><span style="font-weight:normal;">Mo/Di/Mi/Do/Fr</span></th>
          <th>Von</th>
          <th>Bis</th>
        </tr>
      </table>
    `;
  }

  einsatzzeitZaehler++;
  const table = document.getElementById("einsatzzeitTable");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td>
      <select name="einsatzzeit_wochen_${einsatzzeitZaehler}">
        <option value="">– wählen –</option>
        <option value="aw">aw</option>
        <option value="gw">gw</option>
        <option value="uw">uw</option>
      </select>
    </td>
    <td>
      <select name="einsatzzeit_wochentag_${einsatzzeitZaehler}">
        <option value="">– wählen –</option>
        <option value="Mo">Mo</option>
        <option value="Di">Di</option>
        <option value="Mi">Mi</option>
        <option value="Do">Do</option>
        <option value="Fr">Fr</option>
      </select>
    </td>
    <td>
      <select name="einsatzzeit_von_${einsatzzeitZaehler}">
        ${zeitOptionen()}
      </select>
    </td>
    <td>
      <select name="einsatzzeit_bis_${einsatzzeitZaehler}">
        ${zeitOptionen()}
      </select>
    </td>
    <td>
      <input name="einsatzzeit_anmerkung_${einsatzzeitZaehler}" style="width:98%">
    </td>
    <td>
      <button type="button" onclick="removeEinsatzzeitRow(this)">🗑️</button>
    </td>
  `;
}

function zeitOptionen() {
  // 07:00 bis 20:00, alle 15 Minuten
  let html = `<option value="">– wählen –</option>`;
  for (let h = 7; h <= 20; h++) {
    for (let m of [0, 15, 30, 45]) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      html += `<option value="${hh}:${mm}">${hh}:${mm}</option>`;
    }
  }
  return html;
}

function removeEinsatzzeitRow(btn) {
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
}
