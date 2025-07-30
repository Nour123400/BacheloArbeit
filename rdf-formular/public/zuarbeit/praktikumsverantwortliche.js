let praktikumZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("praktikumAddBtn").addEventListener("click", addPraktikumRow);
  addPraktikumRow(); // immer mit einer Zeile starten
});

function addPraktikumRow() {
  const tableDiv = document.getElementById("praktikumTabelle");

  if (!document.getElementById("praktikumTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;width:100%;" id="praktikumTable">
        <tr>
          <th>Fakultät – Bereich / Titel, Name</th>
          <th>Seminargruppe</th>
          <th>Erläuterung</th>
          <th></th>
        </tr>
      </table>
    `;
  }

  praktikumZaehler++;
  const table = document.getElementById("praktikumTable");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td><input name="praktikum_fakultaet_${praktikumZaehler}" style="width:99%;font-weight:bold"></td>
    <td><input name="praktikum_gruppe_${praktikumZaehler}" style="width:99%;font-weight:bold"></td>
    <td><input name="praktikum_erklaerung_${praktikumZaehler}" style="width:99%;font-weight:bold"></td>
    <td><button type="button" onclick="removePraktikumRow(this)">🗑️</button></td>
  `;
}

function removePraktikumRow(btn) {
  const table = document.getElementById("praktikumTable");
  if (table.rows.length <= 2) return; // 1 Header + 1 Datenzeile => nicht löschen!
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
}
