document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("gesamtSwsTabelle");

  const spalten = ["Vorlesung", "Seminar", "Praktikum"];
  const zeilen = [
    { label: "davon SWS", typ: "number", namen: ["sws_v", "sws_s", "sws_p"], werte: [2, 2, 0] },
    { label: "Raumanforderung", typ: "text", namen: ["raum_v", "raum_s", "raum_p"], werte: ["Gu, Li, Tr", "Z423, Z430", ""] },
    { label: "Technikanforderung (Campus – Bereich)", typ: "text", namen: ["technik_v", "technik_s", "technik_p"], werte: ["Beamer/WLAN", "", ""] }
  ];

  const table = document.createElement("table");
  table.border = "1";
  table.style.borderCollapse = "collapse";

  // Kopfzeile
  const headerRow = table.insertRow();
  const headerCell = document.createElement("td");
  headerCell.colSpan = 4;
  headerCell.innerHTML = `<strong>Gesamt SWS (bezogen auf einen Beispiel-Studenten):</strong> <span id="gesamtSwsWert">0</span>`;
  headerRow.appendChild(headerCell);

  // Spaltenüberschriften
  const spaltenRow = table.insertRow();
  spaltenRow.insertCell(); // leer
  spalten.forEach(s => {
    const th = document.createElement("th");
    th.textContent = s;
    spaltenRow.appendChild(th);
  });

  // Inhalte
  zeilen.forEach((zeile, zIndex) => {
    const row = table.insertRow();
    const labelCell = row.insertCell();
    labelCell.textContent = zeile.label;

    zeile.namen.forEach((feldName, sIndex) => {
      const cell = row.insertCell();
      const input = document.createElement("input");
      input.name = feldName;
      input.style.width = "120px";
      input.style.fontWeight = "bold";
      input.value = zeile.werte[sIndex];

      input.type = zeile.typ === "number" ? "number" : "text";
      if (zeile.typ === "number") {
        input.min = 0;
        input.addEventListener("input", updateGesamtSws);
      }

      cell.appendChild(input);
    });
  });

  container.appendChild(table);
  updateGesamtSws();

  function updateGesamtSws() {
    const v = parseInt(document.querySelector('[name="sws_v"]').value) || 0;
    const s = parseInt(document.querySelector('[name="sws_s"]').value) || 0;
    const p = parseInt(document.querySelector('[name="sws_p"]').value) || 0;
    document.getElementById("gesamtSwsWert").textContent = v + s + p;
  }
});
