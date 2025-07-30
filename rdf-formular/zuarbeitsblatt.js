const path = require('path');
const fs = require('fs');

function saveZuarbeitsblatt(data) {
  const id = Date.now();
  const prefix = `@prefix ex: <http://example.org/htwk#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/data/> .

`;

  // Hauptobjekt
  let turtle = `
:Zuarbeitsblatt_${id} a ex:Zuarbeitsblatt ;
  ex:abgabeterminDS "${data.abgabetermin || ""}"^^xsd:date ;
  ex:eingangDS "${data.eingang || ""}" ;
  ex:semester "${data.semester || ""}" ;
  ex:fakultaet "${data.fakultaet || ""}" ;
  ex:studiengang "${data.studiengang || ""}" ;
  ex:fachsemester ${data.fachsemester || 0} ;
  ex:gruppen "${data.gruppen || ""}" ;
  ex:anzahlStudierendeGruppen ${data.anzahlStudierendeGruppen || 0} ;
  ex:modulnummer "${data.modulnummer || ""}" ;
  ex:modulbezeichnung "${data.modulbezeichnung || ""}" ;
  ex:teilmodulnummer "${data.teilmodulnummer || ""}" ;
  ex:teilmodulbezeichnung "${data.teilmodulbezeichnung || ""}" ;
  ex:fachart "${data.fachart || ""}" ;
  ex:swsV ${data.sws_v || 0} ;
  ex:swsS ${data.sws_s || 0} ;
  ex:swsP ${data.sws_p || 0} ;
  ex:raumV "${data.raum_v || ""}" ;
  ex:raumS "${data.raum_s || ""}" ;
  ex:raumP "${data.raum_p || ""}" ;
  ex:technikV "${data.technik_v || ""}" ;
  ex:technikS "${data.technik_s || ""}" ;
  ex:technikP "${data.technik_p || ""}" .
`;


  // --- Lesende-Zeilen sammeln und als Tripel ergänzen ---
  const lesende = Object.keys(data)
    .filter(key => key.startsWith('lesende_fakultaet_') && data[key] !== "")
    .map(key => {
      const nr = key.replace('lesende_fakultaet_', '');
      return {
        nr,
        fakultaet: data[`lesende_fakultaet_${nr}`],
        gruppe: data[`lesende_gruppe_${nr}`],
        erklaerung: data[`lesende_erklaerung_${nr}`]
      };
    })
    .sort((a, b) => parseInt(a.nr) - parseInt(b.nr));

  let lesendeTriples = '';
  let lesendeRefs = [];
  lesende.forEach((eintrag, index) => {
    const ref = `:Lesende_${id}_${index+1}`;
    lesendeRefs.push(ref);
    lesendeTriples += `
${ref} a ex:Lesende ;
  ex:fakultaet "${eintrag.fakultaet}" ;
  ex:gruppe "${eintrag.gruppe}" ;
  ex:erklaerung "${eintrag.erklaerung}" ;
  ex:zugeordnetZu :Zuarbeitsblatt_${id} .
`;
  });

  // Optional: Die Lesende-Zeilen als Property im Blatt referenzieren
  if (lesendeRefs.length > 0) {
    turtle += `\n:Zuarbeitsblatt_${id} ex:lesende ${lesendeRefs.join(", ")} .\n`;
  }
  turtle += lesendeTriples;

  // ========== Datei schreiben ==========
  const dirPath = path.join(__dirname, 'data');
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const filePath = path.join(dirPath, 'zuarbeitsblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveZuarbeitsblatt };
