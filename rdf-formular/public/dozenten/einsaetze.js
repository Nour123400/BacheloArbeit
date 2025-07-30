let einsatzZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("einsatzAddBtn").addEventListener("click", addEinsatzRow);
  addEinsatzRow(); // ← sorgt dafür, dass immer eine Zeile am Start ist!
});

function addEinsatzRow() {
  const tableDiv = document.getElementById("einsatzTabelle");

  // Tabelle mit 2 Kopfzeilen (Gruppierung für "Reale SWS")
  if (!document.getElementById("einsatzTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;" id="einsatzTable">
        <tr>
          <th rowspan="2">lfd</th>
          <th rowspan="2">Fakultät</th>
          <th rowspan="2">Stg.</th>
          <th rowspan="2">FS</th>
          <th rowspan="2">Gruppe</th>
          <th rowspan="2">Modulnr.</th>
          <th rowspan="2">Modulname</th>
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
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td></td>
    <td><input name="einsatz_fakultaet_" style="width:80px"></td>
    <td><input name="einsatz_stg_" style="width:60px"></td>
    <td><input name="einsatz_fs_" style="width:35px"></td>
    <td><input name="einsatz_gruppe_" style="width:70px"></td>
    <td><input name="einsatz_modulnr_" style="width:70px"></td>
    <td><input name="einsatz_modulname_" style="width:120px"></td>
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
  const table = document.getElementById("einsatzTable");
  // Damit immer mindestens eine Zeile bleibt:
  if (table.rows.length <= 3) return; // 2 Kopfzeilen + 1 Datenzeile → nicht löschen
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
  renumberEinsatzRows();
}

function renumberEinsatzRows() {
  const table = document.getElementById("einsatzTable");
  if (!table) return;

  let nummer = 1;
  for (let i = 2; i < table.rows.length; i++) { // 2 Headerzeilen
    const row = table.rows[i];
    row.cells[0].textContent = nummer;
    row.querySelector('input[name^="einsatz_fakultaet_"]').name = "einsatz_fakultaet_" + nummer;
    row.querySelector('input[name^="einsatz_stg_"]').name = "einsatz_stg_" + nummer;
    row.querySelector('input[name^="einsatz_fs_"]').name = "einsatz_fs_" + nummer;
    row.querySelector('input[name^="einsatz_gruppe_"]').name = "einsatz_gruppe_" + nummer;
    row.querySelector('input[name^="einsatz_modulnr_"]').name = "einsatz_modulnr_" + nummer;
    row.querySelector('input[name^="einsatz_modulname_"]').name = "einsatz_modulname_" + nummer;
    row.querySelector('input[name^="einsatz_sws_v_"]').name = "einsatz_sws_v_" + nummer;
    row.querySelector('input[name^="einsatz_sws_s_"]').name = "einsatz_sws_s_" + nummer;
    row.querySelector('input[name^="einsatz_sws_p_"]').name = "einsatz_sws_p_" + nummer;
    row.querySelector('select[name^="einsatz_digital_"]').name = "einsatz_digital_" + nummer;
    row.querySelector('input[name^="einsatz_bemerkung_"]').name = "einsatz_bemerkung_" + nummer;
    nummer++;
  }
}
