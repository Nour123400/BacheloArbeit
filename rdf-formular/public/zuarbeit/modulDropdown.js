let moduleData = [];

document.addEventListener('DOMContentLoaded', function() {
  // Modul-Liste laden
  fetch('/api/module')
    .then(res => res.json())
    .then(data => {
      moduleData = data;
      const select = document.getElementById('modulDropdown');
      data.forEach(modul => {
        const opt = document.createElement('option');
        opt.value = modul.Modulnummer;
        opt.textContent = modul.Modulnummer + " – " + modul.Modulbezeichnung;
        select.appendChild(opt);
      });
    });

  document.getElementById('modulDropdown').addEventListener('change', function() {
    const nummer = this.value;
    const mod = moduleData.find(m => m.Modulnummer === nummer);
    if (!mod) return;

    // Die wichtigsten Felder automatisch befüllen:
    document.querySelector('[name="modulnummer"]').value = mod.Modulnummer || '';
    document.querySelector('[name="modulbezeichnung"]').value = mod.Modulbezeichnung || '';
    document.querySelector('[name="fakultaet"]').value = mod.Fakultät || '';
    document.querySelector('[name="fachsemester"]').value = mod.Fachsemester || '';
    document.querySelector('[name="studiengang"]').value = (mod.ZusammenMit || []).join(', ');
    document.querySelector('[name="fachart"]').value = (mod.Modultyp === "PF" ? "Pflichtmodul" : "Wahlpflichtmodul") || '';
    // SWS ausfüllen
    if (mod.Lehrveranstaltungen) {
      document.querySelector('[name="sws_v"]').value = mod.Lehrveranstaltungen.SWS_V || 0;
      document.querySelector('[name="sws_s"]').value = mod.Lehrveranstaltungen.SWS_S || 0;
      document.querySelector('[name="sws_p"]').value = mod.Lehrveranstaltungen.SWS_P || 0;
    }
  });
});
