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
  ex:fachart "${data.fachart || ""}"`;

  // ========== 1. Dynamische Gesamt-SWS-Einträge ==========
  const gesamtSwsEintraege = Object.keys(data)
    .filter(key => key.startsWith('sws_bezeichnung_') && data[key] !== "")
    .map(key => {
      const nr = key.replace('sws_bezeichnung_', '');
      return {
        nr,
        bezeichnung: data[`sws_bezeichnung_${nr}`],
        sws_v: data[`sws_v_${nr}`] || 0,
        sws_s: data[`sws_s_${nr}`] || 0,
        sws_p: data[`sws_p_${nr}`] || 0,
        raum: data[`sws_raum_${nr}`] || "",
        technik: data[`sws_technik_${nr}`] || "",
        campus: data[`sws_campus_${nr}`] || ""
      };
    })
    .sort((a, b) => parseInt(a.nr) - parseInt(b.nr));

  let swsTriples = '';
  let swsRefs = [];

  gesamtSwsEintraege.forEach((eintrag, index) => {
    const sid = `${id}_sws${eintrag.nr}`;
    swsRefs.push(`:GesamtSWS_${sid}`);
    swsTriples += `
:GesamtSWS_${sid} a ex:GesamtSWS ;
  ex:lfd "${index + 1}" ;
  ex:bezeichnung "${eintrag.bezeichnung}" ;
  ex:swsV ${eintrag.sws_v} ;
  ex:swsS ${eintrag.sws_s} ;
  ex:swsP ${eintrag.sws_p} ;
  ex:raum "${eintrag.raum}" ;
  ex:technik "${eintrag.technik}" ;
  ex:campus "${eintrag.campus}" ;
  ex:zugeordnetZu :Zuarbeitsblatt_${id} .\n`;
  });

  if (swsRefs.length > 0) {
    turtle += ` ;
  ex:gesamtSWS ${swsRefs.join(', ')}`;
  }

  turtle += " .\n";
  turtle += swsTriples;

  // ========== 2. Datei schreiben ==========
  const dirPath = path.join(__dirname, 'data');
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const filePath = path.join(dirPath, 'zuarbeitsblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveZuarbeitsblatt };
