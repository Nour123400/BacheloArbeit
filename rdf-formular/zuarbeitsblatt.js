const path = require('path');
const fs = require('fs');

function saveZuarbeitsblatt(data) {
  const id = Date.now();
  const prefix = `@prefix ex: <http://example.org/htwk#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/data/> .

`;

  // Hilfsfunktion für Checkboxen
  function getWunschTag(d, tag, typ) {
    return d[`wunschtag_${tag}_${typ}`] === 'on';
  }

  const turtle = `
:Zuarbeitsblatt_${id} a ex:Zuarbeitsblatt ;
  ex:abgabeterminDS "${data.abgabetermin || ""}"^^xsd:date ;
  ex:eingangDS "${data.eingang || ""}" ;
  ex:hochschule "${data.hochschule || ""}" ;
  ex:semester "${data.semester || ""}" ;
  ex:titel "${data.titel || ""}" ;
  ex:vorname "${data.vorname || ""}" ;
  ex:name "${data.name || ""}" ;
  ex:email "${data.email || ""}" ;
  ex:telefon "${data.telefon || ""}" ;
  ex:fakultaet "${data.fakultaet || ""}" ;
  ex:studiengang "${data.studiengang || ""}" ;
  ex:fachsemester ${data.fachsemester || 0} ;
  ex:gruppe "${data.gruppe || ""}" ;
  ex:modulnummer "${data.modulnummer || ""}" ;
  ex:modulbezeichnung "${data.modulbezeichnung || ""}" ;
  ex:lehrveranstaltungsnummer "${data.lvnummer || ""}" ;
  ex:lehrveranstaltungsbezeichnung "${data.lvname || ""}" ;
  ex:teilmodul "${data.teilmodul || ""}" ;
  ex:dozent "${data.dozent || ""}" ;
  ex:realeSWS_V ${data.realeSWS_V || 0} ;
  ex:realeSWS_S ${data.realeSWS_S || 0} ;
  ex:realeSWS_P ${data.realeSWS_P || 0} ;
  ex:realeSWS ${data.realeSWS || 0} ;
  ex:digitalAnteil "${data.digital_anteil || ""}" ;
  ex:bemerkung """${data.bemerkung || ""}""" ;
  ex:wunschtag_montag_D ${getWunschTag(data, "montag", "D")} ;
  ex:wunschtag_montag_F ${getWunschTag(data, "montag", "F")} ;
  ex:wunschtag_dienstag_D ${getWunschTag(data, "dienstag", "D")} ;
  ex:wunschtag_dienstag_F ${getWunschTag(data, "dienstag", "F")} ;
  ex:wunschtag_mittwoch_D ${getWunschTag(data, "mittwoch", "D")} ;
  ex:wunschtag_mittwoch_F ${getWunschTag(data, "mittwoch", "F")} ;
  ex:wunschtag_donnerstag_D ${getWunschTag(data, "donnerstag", "D")} ;
  ex:wunschtag_donnerstag_F ${getWunschTag(data, "donnerstag", "F")} ;
  ex:wunschtag_freitag_D ${getWunschTag(data, "freitag", "D")} ;
  ex:wunschtag_freitag_F ${getWunschTag(data, "freitag", "F")} ;
  ex:sperrzeit_wochentag "${data.sperr_wochentag || ""}" ;
  ex:sperrzeit_von "${data.sperr_von || ""}" ;
  ex:sperrzeit_bis "${data.sperr_bis || ""}" ;
  ex:sperrzeit_begruendung "${data.sperr_begruendung || ""}" ;
  ex:hinweisSemesterplanung """${data.hinweis_semester || ""}""" ;
  ex:hinweisRueckgabe """${data.hinweis_rueckgabe || ""}""" ;
  ex:unterschrift "${data.unterschrift || ""}" .
`;

  const filePath = path.join(__dirname, 'data', 'zuarbeitsblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveZuarbeitsblatt };
