let gesamtSwsZaehler = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("gesamtSwsAddBtn").addEventListener("click", addGesamtSwsRow);
});

function addGesamtSwsRow() {
  const tableDiv = document.getElementById("gesamtSwsTabelle");

  if (!document.getElementById("gesamtSwsTable")) {
    tableDiv.innerHTML = `
      <table border="1" style="border-collapse:collapse;" id="gesamtSwsTable">
        <tr>
          <th rowspan="2">lfd</th>
          <th rowspan="2">Bezeichnung</th>
          <th colspan="3">SWS (Einzelstudent)</th>
          <th rowspan="2">Raumanforderung</th>
          <th rowspan="2">Technik</th>
          <th rowspan="2">Campus/Bereich</th>
          <th rowspan="2">🗑️</th>
        </tr>
        <tr>
          <th>V</th>
          <th>S</th>
          <th>P</th>
        </tr>
      </table>
    `;
  }

  const table = document.getElementById("gesamtSwsTable");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td></td>
    <td><input name="sws_bezeichnung_" style="width:120px"></td>
    <td><input name="sws_v_" type="number" min="0" style="width:40px"></td>
    <td><input name="sws_s_" type="number" min="0" style="width:40px"></td>
    <td><input name="sws_p_" type="number" min="0" style="width:40px"></td>
    <td><input name="sws_raum_" type="text" style="width:100px"></td>
    <td><input name="sws_technik_" type="text" style="width:100px"></td>
    <td><input name="sws_campus_" type="text" style="width:100px"></td>
    <td><button type="button" onclick="removeGesamtSwsRow(this)">🗑️</button></td>
  `;

  renumberGesamtSwsRows();
}

function removeGesamtSwsRow(btn) {
  const row = btn.closest('tr');
  row.remove();
  renumberGesamtSwsRows();
}

function renumberGesamtSwsRows() {
  const table = document.getElementById("gesamtSwsTable");
  if (!table) return;

  let nummer = 1;
  for (let i = 2; i < table.rows.length; i++) {
    const row = table.rows[i];
    row.cells[0].textContent = nummer;
    row.querySelector('input[name^="sws_bezeichnung_"]').name = "sws_bezeichnung_" + nummer;
    row.querySelector('input[name^="sws_v_"]').name = "sws_v_" + nummer;
    row.querySelector('input[name^="sws_s_"]').name = "sws_s_" + nummer;
    row.querySelector('input[name^="sws_p_"]').name = "sws_p_" + nummer;
    row.querySelector('input[name^="sws_raum_"]').name = "sws_raum_" + nummer;
    row.querySelector('input[name^="sws_technik_"]').name = "sws_technik_" + nummer;
    row.querySelector('input[name^="sws_campus_"]').name = "sws_campus_" + nummer;
    nummer++;
  }
}
