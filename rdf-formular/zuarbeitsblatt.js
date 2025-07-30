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
  ex:technikP "${data.technik_p || ""}"
.`;

  // ========== 2. Datei schreiben ==========
  const dirPath = path.join(__dirname, 'data');
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const filePath = path.join(dirPath, 'zuarbeitsblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveZuarbeitsblatt };
