let einsatzzeitZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("einsatzzeitAddBtn").addEventListener("click", addEinsatzzeitRow);
});

function addEinsatzzeitRow() {
  const tableDiv = document.getElementById("einsatzzeitTabelle");

  if (!document.getElementById("einsatzzeitTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;width:100%;" id="einsatzzeitTable">
        <tr>
          <th colspan="3">Zeitangabe</th>
          <th rowspan="2">Anmerkung</th>
        </tr>
        <tr>
          <th>Wochen<br><span style="font-weight:normal;">aw/gw/uw</span></th>
          <th>Wochentag<br><span style="font-weight:normal;">Mo/Di/Mi/Do/Fr</span></th>
          <th>Uhrzeit<br><span style="font-weight:normal;">Ab/Bis</span></th>
        </tr>
      </table>
    `;
  }

  einsatzzeitZaehler++;
  const table = document.getElementById("einsatzzeitTable");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td><input name="einsatzzeit_wochen_${einsatzzeitZaehler}" style="width:60px" placeholder="aw/gw/uw"></td>
    <td><input name="einsatzzeit_wochentag_${einsatzzeitZaehler}" style="width:80px" placeholder="Mo/Di/…"></td>
    <td><input name="einsatzzeit_uhrzeit_${einsatzzeitZaehler}" style="width:80px" placeholder="08:00-12:00"></td>
    <td>
      <input name="einsatzzeit_anmerkung_${einsatzzeitZaehler}" style="width:98%">
      <button type="button" onclick="removeEinsatzzeitRow(this)">🗑️</button>
    </td>
  `;
}

function removeEinsatzzeitRow(btn) {
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
  // Optional: Tabelle löschen, wenn keine Zeilen mehr da sind
  // (nicht notwendig, bleibt wie bei Einsätzen auch einfach leer)
}
