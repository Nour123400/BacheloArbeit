let sperrzeitZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("sperrzeitAddBtn").addEventListener("click", addSperrzeitRow);
});

function addSperrzeitRow() {
  const tableDiv = document.getElementById("sperrzeitTabelle");

  if (!document.getElementById("sperrzeitTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;width:100%;" id="sperrzeitTable">
        <tr>
          <th colspan="3">Zeitangabe</th>
          <th rowspan="2">Begründung</th>
          <th rowspan="2"></th>
        </tr>
        <tr>
          <th>Wochen<br><span style="font-weight:normal;">aw/gw/uw</span></th>
          <th>Wochentag<br><span style="font-weight:normal;">Mo/Di/Mi/Do/Fr</span></th>
          <th>Uhrzeit<br><span style="font-weight:normal;">Bis/Ab</span></th>
        </tr>
      </table>
    `;
  }

  sperrzeitZaehler++;
  const table = document.getElementById("sperrzeitTable");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td>
      <select name="sperrzeit_wochen_${sperrzeitZaehler}">
        <option value="">– wählen –</option>
        <option value="aw">aw</option>
        <option value="gw">gw</option>
        <option value="uw">uw</option>
      </select>
    </td>
    <td>
      <select name="sperrzeit_wochentag_${sperrzeitZaehler}">
        <option value="">– wählen –</option>
        <option value="Mo">Mo</option>
        <option value="Di">Di</option>
        <option value="Mi">Mi</option>
        <option value="Do">Do</option>
        <option value="Fr">Fr</option>
      </select>
    </td>
    <td>
      <select name="sperrzeit_bisab_${sperrzeitZaehler}">
        <option value="">– wählen –</option>
        <option value="Bis 07:00">Bis 07:00</option>
        <option value="Bis 08:00">Bis 08:00</option>
        <option value="Bis 09:00">Bis 09:00</option>
        <option value="Ab 15:00">Ab 15:00</option>
        <option value="Ab 16:00">Ab 16:00</option>
        <option value="Ab 17:00">Ab 17:00</option>
        <!-- Oder nutze zeitOptionen() wie vorher für mehr Flexibilität -->
      </select>
    </td>
    <td>
      <input name="sperrzeit_begruendung_${sperrzeitZaehler}" style="width:98%">
    </td>
    <td>
      <button type="button" onclick="removeSperrzeitRow(this)">🗑️</button>
    </td>
  `;
}

function removeSperrzeitRow(btn) {
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
}
