let lesendeZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("lesendeAddBtn").addEventListener("click", addLesendeRow);
  addLesendeRow(); // <-- Fügt sofort die erste Zeile hinzu!
});

function addLesendeRow() {
  const tableDiv = document.getElementById("lesendeTabelle");

  if (!document.getElementById("lesendeTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;width:100%;" id="lesendeTable">
        <tr>
          <th>Fakultät – Bereich / Titel, Name</th>
          <th>Seminargruppe</th>
          <th>Erläuterung</th>
          <th> </th>
        </tr>
      </table>
    `;
  }

  lesendeZaehler++;
  const table = document.getElementById("lesendeTable");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td><input name="lesende_fakultaet_${lesendeZaehler}" style="width:99%;font-weight:bold"></td>
    <td><input name="lesende_gruppe_${lesendeZaehler}" style="width:99%;font-weight:bold"></td>
    <td><input name="lesende_erklaerung_${lesendeZaehler}" style="width:99%;font-weight:bold"></td>
    <td><button type="button" onclick="removeLesendeRow(this)">🗑️</button></td>
  `;
}

function removeLesendeRow(btn) {
  const table = document.getElementById("lesendeTable");
  if (table.rows.length <= 2) return; // 1 Header + 1 Datenzeile => nicht löschen!
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
}

