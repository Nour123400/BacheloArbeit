let einsatzZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("einsatzAddBtn").addEventListener("click", addEinsatzRow);
});

function addEinsatzRow() {
  einsatzZaehler++;
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

  row.innerHTML = `
    <td>${einsatzZaehler}</td>
    <td><input name="einsatz_fakstg_${einsatzZaehler}" style="width:90px"></td>
    <td><input name="einsatz_fsgruppen_${einsatzZaehler}" style="width:90px"></td>
    <td><input name="einsatz_modul_${einsatzZaehler}" style="width:70px"></td>
    <td><input name="einsatz_realesws_${einsatzZaehler}" type="number" min="0" style="width:60px"></td>
    <td>
      <select name="einsatz_digital_${einsatzZaehler}">
        <option value=""></option>
        <option value="ja">ja</option>
        <option value="nein">nein</option>
      </select>
    </td>
    <td><input name="einsatz_bemerkung_${einsatzZaehler}" style="width:100px"></td>
    <td><button type="button" onclick="removeEinsatzRow(this)">🗑️</button></td>
  `;
}

function removeEinsatzRow(btn) {
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
}
