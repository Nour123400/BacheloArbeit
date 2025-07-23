const path = require('path');
const fs = require('fs');

function saveDozentenblatt(data) {
  const id = Date.now();
  const prefix = `@prefix ex: <http://example.org/htwk#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/data/> .

`;
  const turtle = `
:Dozentenblatt_${id} a ex:Dozentenblatt ;
  ex:abgabeterminDS "${data.abgabetermin || ""}"^^xsd:date ;
  ex:eingangDS "${data.eingang || ""}" ;
  ex:hochschule "${data.hochschule || ""}" ;
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
  ex:unterschriftDekan "${data.dekan || ""}" .
`;

  const filePath = path.join(__dirname, 'data', 'dozentenblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveDozentenblatt };
