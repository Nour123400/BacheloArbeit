const fakultaetListe = [
  "",           // Kein Eintrag / Bitte wählen
  "FAS",        // Fakultät Architektur und Sozialwissenschaften
  "FB",         // Fakultät Bauwesen
  "FDIT",       // Fakultät Digitale Transformation
  "FIM-INF",        // Fakultät Informatik und Medien
  "FING",       // Fakultät Ingenieurwissenschaften
  "FWW",        // Fakultät Wirtschaftswissenschaften
  "HSZ",        // Hochschulsportzentrum
  "MNZ",        // Medien- und Nachrichtenzentrum
  "Gast",       // Gastdozent
  "HonProf"     // Honorarprofessor
];

function fillFakultaetList(selectId = "fakultaet", list = fakultaetListe) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = "";
  list.forEach(fak => {
    const opt = document.createElement("option");
    opt.value = fak;
    opt.textContent = fak;
    if (fak === "FIM-INF") {
      opt.selected = true; // <-- FIM-INF wird vorausgewählt
    }
    select.appendChild(opt);
  });
}


document.addEventListener("DOMContentLoaded", () => fillFakultaetList());
