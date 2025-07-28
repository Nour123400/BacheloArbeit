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
  //ex:hochschule "${data.hochschule || ""}" ;
  ex:semester "${data.semester || ""}" ;
  ex:titel "${data.titel || ""}" ;
  ex:vorname "${data.vorname || ""}" ;
  ex:name "${data.name || ""}" ;
  ex:email "${data.email || ""}" ;
  ex:telefon "${data.telefon || ""}" ;
  ex:fakultaet "${data.fakultaet || ""}" ;
  ex:studiengang "${data.studiengang || ""}" ;
  ex:fachsemester ${data.fachsemester || 0} ;
`;

  const filePath = path.join(__dirname, 'data', 'zuarbeitsblatt.ttl');
  const fileExists = fs.existsSync(filePath);
  const content = (fileExists ? '' : prefix) + turtle + '\n';

  fs.appendFileSync(filePath, content);
}

module.exports = { saveZuarbeitsblatt };
