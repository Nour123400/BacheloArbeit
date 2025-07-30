let seminarleiterZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("seminarleiterAddBtn").addEventListener("click", addSeminarleiterRow);
  addSeminarleiterRow(); // Start mit einer Zeile
});

function addSeminarleiterRow() {
  const tableDiv = document.getElementById("seminarleiterTabelle");

  if (!document.getElementById("seminarleiterTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;width:100%;" id="seminarleiterTable">
        <tr>
          <th>Fakultät – Bereich / Titel, Name</th>
          <th>Seminargruppe</th>
          <th>Erläuterung</th>
          <th> </th>
        </tr>
      </table>
    `;
  }

  seminarleiterZaehler++;
  const table = document.getElementById("seminarleiterTable");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td><input name="seminarleiter_fakultaet_${seminarleiterZaehler}" style="width:99%;font-weight:bold"></td>
    <td><input name="seminarleiter_gruppe_${seminarleiterZaehler}" style="width:99%;font-weight:bold"></td>
    <td><input name="seminarleiter_erklaerung_${seminarleiterZaehler}" style="width:99%;font-weight:bold"></td>
    <td><button type="button" onclick="removeSeminarleiterRow(this)">🗑️</button></td>
  `;
}

function removeSeminarleiterRow(btn) {
  const table = document.getElementById("seminarleiterTable");
  // Prüfe, wie viele Datenzeilen es gibt (nicht die Kopfzeile)
  if (table.rows.length > 2) { // 1 Kopfzeile + min. 1 Datenzeile
    const row = btn.closest('tr');
    row.parentNode.removeChild(row);
  }
}

