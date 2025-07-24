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
  ex:fakultaet "${data.fakultaet || ""}"`;

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

  // Hinweise sammeln (analog zu einsaetze)
  const hinweise = Object.keys(data)
    .filter(key => key.startsWith('hinweis_dozent_') && data[key] !== "")
    .map(key => {
      const nr = key.replace('hinweis_dozent_', '');
      return {
        nr,
        dozent: data[`hinweis_dozent_${nr}`],
        dekanat: data[`hinweis_dekanat_${nr}`]
     };
    })
    .sort((a, b) => parseInt(a.nr) - parseInt(b.nr));

  let hinweisTriples = '';
  let hinweisRefs = [];

  hinweise.forEach((eintrag, index) => {
    const hid = `${id}_hinweis${eintrag.nr}`;
    hinweisRefs.push(`:Hinweis_${hid}`);
    hinweisTriples += `
  :Hinweis_${hid} a ex:Hinweis ;
    ex:lfd "${index + 1}" ;
    ex:dozentHinweis "${eintrag.dozent || ""}" ;
    ex:dekanatHinweis "${eintrag.dekanat || ""}" ;
    ex:zugeordnetZu :Dozentenblatt_${id} .\n`;  
  });

  // Optional: Wenn du die Hinweise als Referenz an das Blatt hängen willst, z.B. als ex:hinweis
  if (hinweisRefs.length > 0) {
   turtle += ` ;
   ex:hinweis ${hinweisRefs.join(', ')}`;
  }
  turtle += " .\n";
  turtle += hinweisTriples;  // an das Turtle anhängen

  
    // Einsatzzeiten sammeln (analog zu einsaetze)
  const einsatzzeiten = Object.keys(data)
    .filter(key => key.startsWith('einsatzzeit_wochen_') && data[key] !== "")
    .map(key => {
      const nr = key.replace('einsatzzeit_wochen_', '');
      return {
        nr,
        wochen: data[`einsatzzeit_wochen_${nr}`],
        wochentag: data[`einsatzzeit_wochentag_${nr}`],
        uhrzeit: data[`einsatzzeit_uhrzeit_${nr}`],
        anmerkung: data[`einsatzzeit_anmerkung_${nr}`]
     };
    })
    .sort((a, b) => parseInt(a.nr) - parseInt(b.nr));

  let einsatzzeitTriples = '';
  let einsatzzeitRefs = [];

  einsatzzeiten.forEach((eintrag, index) => {
    const eid = `${id}_einsatzzeit${eintrag.nr}`;
    einsatzzeitRefs.push(`:Einsatzzeit_${eid}`);
    einsatzzeitTriples += `
  :Einsatzzeit_${eid} a ex:Einsatzzeit ;
    ex:lfd "${index + 1}" ;
    ex:wochen "${eintrag.wochen || ""}" ;
    ex:wochentag "${eintrag.wochentag || ""}" ;
    ex:uhrzeit "${eintrag.uhrzeit || ""}" ;
    ex:anmerkung "${eintrag.anmerkung || ""}" ;
    ex:zugeordnetZu :Dozentenblatt_${id} .\n`;
  });

  if (einsatzzeitRefs.length > 0) {
   turtle += ` ;
   ex:einsatzzeit ${einsatzzeitRefs.join(', ')}`;
  }
  turtle += " .\n";
  turtle += einsatzzeitTriples;

  // FEHLTE in deinem Snippet, ist aber wichtig!
  const dirPath = path.join(__dirname, 'data');
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const filePath = path.join(dirPath, 'dozentenblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveDozentenblatt };
