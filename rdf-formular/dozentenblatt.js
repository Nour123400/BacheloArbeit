const path = require('path');
const fs = require('fs');

function saveDozentenblatt(data) {
  const id = Date.now();
  const prefix = `@prefix ex: <http://example.org/htwk#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/data/> .

`;

  // Hauptblock
  let turtle = `
:Dozentenblatt_${id} a ex:Dozentenblatt ;
  ex:abgabeterminDS "${data.abgabetermin || ""}"^^xsd:date ;
  ex:eingangDS "${data.eingang || ""}" ;
  // ex:hochschule "${data.hochschule || ""}" ;
  ex:semester "${data.semester || ""}" ;
  ex:titel "${data.titel || ""}" ;
  ex:vorname "${data.vorname || ""}" ;
  ex:name "${data.name || ""}" ;
  ex:email "${data.email || ""}" ;
  ex:telefon "${data.telefon || ""}" ;
  ex:arbeitszeit "${data.arbeitszeit || ""}" ;
  ex:fakultaet "${data.fakultaet || ""}" ;
  ex:studiengang "${data.studiengang || ""}" ;
  ex:modulnummer "${data.modulnummer || ""}" ;
  ex:modulbezeichnung "${data.modulbezeichnung || ""}" ;
  ex:lehrveranstaltungsnummer "${data.lvnummer || ""}" ;
  ex:lehrveranstaltungsbezeichnung "${data.lvname || ""}" ;
  ex:gesamtSWS ${data.sws || 0} ;
  ex:vorlesungSWS ${data.vl || 0} ;
  ex:seminarSWS ${data.sem || 0} ;
  ex:praktikumSWS ${data.prak || 0} ;
  ex:dozent "${data.dozent || ""}" ;
  ex:bemerkung "${data.bemerkung || ""}" ;
  ex:unterschriftProfessor "${data.prof || ""}" ;
  ex:unterschriftDekan "${data.dekan || ""}"`;

  // Sammelt alle vorhandenen einsatz_* Einträge (egal wie nummeriert)
  const einsaetze = Object.keys(data)
    .filter(key => key.startsWith('einsatz_fakstg_') && data[key] !== "")
    .map(key => {
      const nr = key.replace('einsatz_fakstg_', '');
      return {
        nr,
        fakstg: data[`einsatz_fakstg_${nr}`],
        fsgruppen: data[`einsatz_fsgruppen_${nr}`],
        modul: data[`einsatz_modul_${nr}`],
        sws_v: data[`einsatz_sws_v_${nr}`] || 0,
        sws_s: data[`einsatz_sws_s_${nr}`] || 0,
        sws_p: data[`einsatz_sws_p_${nr}`] || 0,

        digital: data[`einsatz_digital_${nr}`],
        bemerkung: data[`einsatz_bemerkung_${nr}`]
      };
    })
    .sort((a, b) => parseInt(a.nr) - parseInt(b.nr));

  let einsatzTriples = '';
  let einsatzRefs = [];

  einsaetze.forEach((eintrag, index) => {
    const eid = `${id}_einsatz${eintrag.nr}`;
    einsatzRefs.push(`:Einsatz_${eid}`);
    einsatzTriples += `
:Einsatz_${eid} a ex:Einsatz ;
  ex:lfd "${index + 1}" ;
  ex:fakStg "${eintrag.fakstg || ""}" ;
  ex:fsGruppen "${eintrag.fsgruppen || ""}" ;
  ex:modul "${eintrag.modul || ""}" ;
  ex:swsV ${eintrag.sws_v || 0} ;
  ex:swsS ${eintrag.sws_s || 0} ;
  ex:swsP ${eintrag.sws_p || 0} ;
  ex:digital "${eintrag.digital || ""}" ;
  ex:bemerkung "${eintrag.bemerkung || ""}" ;
  ex:zugeordnetZu :Dozentenblatt_${id} .\n`;
  });
  if (einsatzRefs.length > 0) {
    turtle += ` ;
  ex:einsatz ${einsatzRefs.join(', ')}`;
  }
  turtle += " .\n";
  turtle = turtle + einsatzTriples;

  // FEHLTE in deinem Snippet, ist aber wichtig!
  const dirPath = path.join(__dirname, 'data');
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const filePath = path.join(dirPath, 'dozentenblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveDozentenblatt };
