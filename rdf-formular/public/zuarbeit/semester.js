function getCurrentSemester() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  if (month >= 4 && month <= 9) {
    return `Sommersemester ${year}`;
  } else if (month >= 10) {
    const wsJahr1 = year;
    const wsJahr2 = (year + 1).toString().slice(-2);
    return `Wintersemester ${wsJahr1}/${wsJahr2}`;
  } else {
    const wsJahr1 = year - 1;
    const wsJahr2 = year.toString().slice(-2);
    return `Wintersemester ${wsJahr1}/${wsJahr2}`;
  }
}

function fillSemesterList(selectId = 'semester', yearsBack = 5, yearsForward = 10) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const startYear = currentYear - yearsBack;
  const endYear = currentYear + yearsForward;
  const semesterList = [];

  for (let y = startYear; y <= endYear; y++) {
    // Sommersemester
    semesterList.push(`Sommersemester ${y}`);
    // Wintersemester y/y+1
    const wsJahr2 = (y + 1).toString().slice(-2);
    semesterList.push(`Wintersemester ${y}/${wsJahr2}`);
  }

  const select = document.getElementById(selectId);
  if (!select) return;
  const currentSemester = getCurrentSemester();
  semesterList.forEach(sem => {
    const opt = document.createElement('option');
    opt.value = sem;
    opt.textContent = sem;
    if (sem === currentSemester) opt.selected = true;
    select.appendChild(opt);
  });
}

document.addEventListener('DOMContentLoaded', () => fillSemesterList());
