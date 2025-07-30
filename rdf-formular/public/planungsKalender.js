document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("planungsKalender");
  const wochen = [
    15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,39
  ];
  // Header Row
  let html = '<table border="1" style="border-collapse:collapse;text-align:center;"><tr>';
  wochen.forEach(w => html += `<th>${w}</th>`);
  html += `<th>Name</th></tr>`;

  // Data Row (Checkboxen)
  html += '<tr>';
  wochen.forEach((w,i) => {
    if(w === 39){
      html += `<td rowspan="2" style="min-width:50px;">
        <div style="font-size:smaller;">Prüfung</div>
        <input type="checkbox" name="kw_pruefung">
      </td>`;
    } else {
      html += `<td><input type="checkbox" name="kw_${w}"></td>`;
    }
  });
  html += '<td rowspan="2"><input name="planungs_name" style="width:90px"></td></tr>';

  // Data Row 2 (Freitext z.B. X oder Text, leer)
  html += '<tr>';
  wochen.forEach((w,i) => {
    if(w === 39) return; // schon oben
    html += `<td><input type="text" name="kwtxt_${w}" style="width:32px;"></td>`;
  });
  html += '</tr>';

  html += '</table>';
  container.innerHTML = html;
});
