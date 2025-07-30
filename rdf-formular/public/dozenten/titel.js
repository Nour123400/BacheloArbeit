const titelListe = [
  "", // kein Titel
  "Prof.",
  "Prof. Dr.",
  "Prof. Dr. med.",
  "Prof. Dr. med. dent.",
  "Prof. Dr. rer. nat.",
  "Prof. Dr. rer. pol.",
  "Prof. Dr. rer. oec.",
  "Prof. Dr. rer. soc.",
  "Prof. Dr.-Ing.",
  "Prof. Dr. jur.",
  "Prof. Dr. phil.",
  "Prof. Dr. habil.",
  "Prof. Dr. oec.",
  "Prof. Dr. agr.",
  "Prof. Dr. theol.",
  "Prof. Dr. vet. med.",
  "Prof. Dr. rer. agr.",
  "Prof. Dr. rer. medic.",
  "Prof. Dipl.-Ing.",
  "Prof. Mag.",
  "Prof. Mag. rer. nat.",
  "Priv.-Doz. Dr.",
  "Priv.-Doz. Dr. habil.",
  "Dr.",
  "Dr. h.c.",
  "Dr. med.",
  "Dr. med. dent.",
  "Dr. med. vet.",
  "Dr. rer. nat.",
  "Dr. rer. pol.",
  "Dr. rer. oec.",
  "Dr. rer. soc.",
  "Dr. rer. agr.",
  "Dr. jur.",
  "Dr. phil.",
  "Dr.-Ing.",
  "Dr. theol.",
  "Dr. oec.",
  "Dr. agr.",
  "Dr. habil.",
  "Dipl.-Ing.",
  "Dipl.-Wirt.-Ing.",
  "Dipl.-Kfm.",
  "Dipl.-Soz.-Päd.",
  "Dipl.-Psych.",
  "Dipl.-Volksw.",
  "Dipl.-Betriebsw.",
  "Dipl.-Biol.",
  "Mag.",
  "Mag. rer. nat.",
  "Mag. theol.",
  "B. Sc.",
  "B. A.",
  "M. Sc.",
  "M. A.",
  "M. Eng.",
  "M. Ed.",
  "M. Med.",
  "MBA",
  "LL.B.",
  "LL.M.",
  "Ass. jur.",
  "Ass. iur.",
  "Staatsexamen",
  "B. Eng.",
  "M. Arch.",
  "B. Ed.",
  "Dipl.-Päd.",
  "Dr. rer. medic.",
  "Ph.D.",
  "D.Phil.",
  "MD",
  "D.Sc.",
  "D.Litt.",
  "D.Eng.",
  "Dr. sc. agr.",
  "Dr. sc. hum.",
  "Dr. sc. nat."
  // Du kannst beliebig erweitern!
];

function fillTitelList(selectId = "titel", list = titelListe) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = ""; // Vorherige Einträge löschen
  list.forEach(titel => {
    const opt = document.createElement('option');
    opt.value = titel;
    opt.textContent = titel;
    select.appendChild(opt);
  });
}

document.addEventListener('DOMContentLoaded', () => fillTitelList());
