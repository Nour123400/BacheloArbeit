let hinweisZaehler = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("hinweisAddBtn").addEventListener("click", addHinweisRow);
});

function addHinweisRow() {
  const tableDiv = document.getElementById("hinweisTabelle");

  if (!document.getElementById("hinweisTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;width:100%" id="hinweisTable">
        <tr>
          <th>Bei Bedarf vom Dozenten auszufüllen</th>
          <th>Nur vom Dekanat / Studienamt auszufüllen!</th>
        </tr>
        <tr>
          <td><strong>Wichtige Hinweise zur Semesterplanung:</strong><br>Keine Sperrzeiten!!!</td>
          <td><strong>Hinweise bei Rückgabe an den Dozenten:</strong></td>
        </tr>
      </table>
    `;
  }

  hinweisZaehler++;
  const table = document.getElementById("hinweisTable");
  const row = table.insertRow(-1);

  // Je Zeile: zwei Felder (wie bei den Einsätzen)
  row.innerHTML = `
    <td><input name="hinweis_dozent_${hinweisZaehler}" style="width:98%"></td>
    <td><input name="hinweis_dekanat_${hinweisZaehler}" style="width:98%"></td>
    <td><button type="button" onclick="removeHinweisRow(this)">🗑️</button></td>
  `;
}

function removeHinweisRow(btn) {
  const row = btn.closest('tr');
  row.parentNode.removeChild(row);
  // Hinweis: Kopfzeilen bleiben immer erhalten!
  // Optional: Zähler zurücksetzen, falls du ganz leer willst (hier nicht zwingend nötig)
}
