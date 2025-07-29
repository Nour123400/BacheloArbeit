document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("gesamtSwsTabelle");
  const addBtn = document.getElementById("gesamtSwsAddBtn");

  let spalten = ["Vorlesung", "Seminar", "Praktikum"];
  let zeilen = [];

  // Tabelle initial erstellen
  const table = document.createElement("table");
  table.border = "1";
  table.style.borderCollapse = "collapse";
  container.appendChild(table);

  function renderTable() {
    table.innerHTML = "";

    // 1. Kopfzeile
    const header = table.insertRow();
    const firstCell = document.createElement("th");
    firstCell.innerText = "";
    header.appendChild(firstCell);
    spalten.forEach(spalte => {
      const th = document.createElement("th");
      th.innerText = spalte;
      header.appendChild(th);
    });

    // 2. Inhalt
    zeilen.forEach((zeile, rowIndex) => {
      const row = table.insertRow();
      const cellLabel = row.insertCell();
      cellLabel.innerText = zeile.label;

      spalten.forEach((spalte, colIndex) => {
        const cell = row.insertCell();
        const input = document.createElement("input");
        input.name = `z${rowIndex}_s${colIndex}`;
        input.style.width = "120px";
        input.style.fontWeight = "bold";

        if (zeile.typ === "number") {
          input.type = "number";
          input.min = "0";
          input.value = zeile.werte[colIndex] || 0;
          input.addEventListener("input", updateGesamtSWS);
        } else {
          input.type = "text";
          input.value = zeile.werte[colIndex] || "";
        }

        zeile.inputs[colIndex] = input;
        cell.appendChild(input);
      });

      // Entfernen-Button
      const delCell = row.insertCell();
      const delBtn = document.createElement("button");
      delBtn.innerText = "🗑️";
      delBtn.onclick = () => {
        zeilen.splice(rowIndex, 1);
        renderTable();
        updateGesamtSWS();
      };
      delCell.appendChild(delBtn);
    });

    // Gesamtzeile (unten)
    let gesamtRow = table.querySelector("#gesamtRow");
    if (!gesamtRow) {
      gesamtRow = table.insertRow();
      gesamtRow.id = "gesamtRow";
      const cell = gesamtRow.insertCell();
      cell.colSpan = spalten.length + 1;
      cell.innerHTML = `<strong>Gesamt SWS:</strong> <span id="gesamtSwsWert">0</span>`;
    }
  }

  function updateGesamtSWS() {
    const swsZeile = zeilen.find(z => z.label.toLowerCase().includes("sws"));
    if (!swsZeile) return;

    const sum = swsZeile.inputs.reduce((acc, input) => acc + (parseInt(input.value) || 0), 0);
    document.getElementById("gesamtSwsWert").innerText = sum;
  }

  // Neue Zeile hinzufügen
  addBtn.addEventListener("click", function () {
    const label = prompt("Zeilenbeschriftung (z. B. 'davon SWS', 'Raumanforderung', ...):");
    if (!label) return;

    const typ = confirm("Sollen die Zellen Zahlen (SWS) sein?") ? "number" : "text";

    zeilen.push({
      label,
      typ,
      werte: Array(spalten.length).fill(""),
      inputs: []
    });

    renderTable();
  });

  // Erste Standardzeilen (wie im Bild)
  zeilen = [
    { label: "davon SWS", typ: "number", werte: [2, 2, 0], inputs: [] },
    { label: "Raumanforderung", typ: "text", werte: ["Gu, Li, Tr", "Z423, Z430", ""], inputs: [] },
    { label: "Technikanforderung (Campus – Bereich)", typ: "text", werte: ["Beamer/WLAN", "", ""], inputs: [] }
  ];

  renderTable();
  updateGesamtSWS();
});
