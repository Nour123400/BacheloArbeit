let einsatzZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("einsatzAddBtn").addEventListener("click", addEinsatzRow);
});

function addEinsatzRow() {
  const tableDiv = document.getElementById("einsatzTabelle");

  // Tabelle mit Header erzeugen, falls noch nicht vorhanden
  if (!document.getElementById("einsatzTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;" id="einsatzTable">
        <tr>
          <th>lfd</th>
          <th>Fak/Stg</th>
          <th>FS-Gruppen</th>
          <th>Modul</th>
          <th>reale SWS</th>
          <th>digital</th>
          <th>Bemerkung</th>
          <th>Löschen</th>
        </tr>
      </table>
    `;
  }

  // Neue Zeile mit leeren Eingabefeldern
  const table = document.getElementById("einsatzTable");
  const row = table.insertRow(-1);

  // Wir geben erstmal Platzhalter-IDs, die später korrekt nummeriert werden
  row.innerHTML = `
    <td></td>
    <td><input name="einsatz_fakstg_" style="width:90px"></td>
    <td><input name="einsatz_fsgruppen_" style="width:90px"></td>
    <td><input name="einsatz_modul_" style="width:70px"></td>
    <td><input name="einsatz_realesws_" type="number" min="0" style="width:60px"></td>
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

  // Überspringe Kopfzeile
  let nummer = 1;
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    // lfd-Nummer setzen
    row.cells[0].textContent = nummer;

    // Felder-Name sauber durchnummerieren
    row.querySelector('input[name^="einsatz_fakstg_"]').name = "einsatz_fakstg_" + nummer;
    row.querySelector('input[name^="einsatz_fsgruppen_"]').name = "einsatz_fsgruppen_" + nummer;
    row.querySelector('input[name^="einsatz_modul_"]').name = "einsatz_modul_" + nummer;
    row.querySelector('input[name^="einsatz_realesws_"]').name = "einsatz_realesws_" + nummer;
    row.querySelector('select[name^="einsatz_digital_"]').name = "einsatz_digital_" + nummer;
    row.querySelector('input[name^="einsatz_bemerkung_"]').name = "einsatz_bemerkung_" + nummer;

    nummer++;
  }
}
