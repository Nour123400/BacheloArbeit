let einsatzZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("einsatzAddBtn").addEventListener("click", addEinsatzRow);
});

function addEinsatzRow() {
  const tableDiv = document.getElementById("einsatzTabelle");

  // Tabelle mit 2 Kopfzeilen (Gruppierung für "Reale SWS")
  if (!document.getElementById("einsatzTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;" id="einsatzTable">
        <tr>
          <th rowspan="2">lfd</th>
          <th rowspan="2">Fak/Stg</th>
          <th rowspan="2">FS-Gruppen</th>
          <th rowspan="2">Modul</th>
          <th colspan="3">Reale SWS (Präsenz)</th>
          <th rowspan="2">digital</th>
          <th rowspan="2">Bemerkung</th>
          <th rowspan="2">Löschen</th>
        </tr>
        <tr>
          <th>V</th>
          <th>S</th>
          <th>P</th>
        </tr>
      </table>
    `;
  }

  const table = document.getElementById("einsatzTable");
  // Datenzeile immer am Ende einfügen
  const row = table.insertRow(-1);

  // Exakt 10 Spalten für die Datenzeile!
  row.innerHTML = `
    <td></td>
    <td><input name="einsatz_fakstg_" style="width:90px"></td>
    <td><input name="einsatz_fsgruppen_" style="width:90px"></td>
    <td><input name="einsatz_modul_" style="width:70px"></td>
    <td><input name="einsatz_sws_v_" type="number" min="0" style="width:40px"></td>
    <td><input name="einsatz_sws_s_" type="number" min="0" style="width:40px"></td>
    <td><input name="einsatz_sws_p_" type="number" min="0" style="width:40px"></td>
    <td>
      <select name="einsatz_digital_">
        <option value=""></option>
        <option value="ja">ja</option>
        <option value="nein">nein</option>
      </select>
    </td>
    <td><input name="einsatz_bemerkung_" style="width:100px"></td>
    <td><button type="button" onclick="removeEinsatzRow(this)">🗑️</button></td>
  `;
  renumberEinsatzRows();
}

function removeEinsatzRow(btn) {
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
  renumberEinsatzRows();
}

function renumberEinsatzRows() {
  const table = document.getElementById("einsatzTable");
  if (!table) return;

  let nummer = 1;
  // WICHTIG: fange bei i = 2 an (weil: zwei Kopfzeilen)!
  for (let i = 2; i < table.rows.length; i++) {
    const row = table.rows[i];
    row.cells[0].textContent = nummer;
    row.querySelector('input[name^="einsatz_fakstg_"]').name = "einsatz_fakstg_" + nummer;
    row.querySelector('input[name^="einsatz_fsgruppen_"]').name = "einsatz_fsgruppen_" + nummer;
    row.querySelector('input[name^="einsatz_modul_"]').name = "einsatz_modul_" + nummer;
    row.querySelector('input[name^="einsatz_sws_v_"]').name = "einsatz_sws_v_" + nummer;
    row.querySelector('input[name^="einsatz_sws_s_"]').name = "einsatz_sws_s_" + nummer;
    row.querySelector('input[name^="einsatz_sws_p_"]').name = "einsatz_sws_p_" + nummer;
    row.querySelector('select[name^="einsatz_digital_"]').name = "einsatz_digital_" + nummer;
    row.querySelector('input[name^="einsatz_bemerkung_"]').name = "einsatz_bemerkung_" + nummer;
    nummer++;
  }
}
