const calculateData = {
  inputDay: document.querySelector(".input-day"),
  inputMonth: document.querySelector(".input-month"),
  inputYear: document.querySelector(".input-year"),
  btnAdd: document.querySelector(".btn-add"),

  dateBirth() {
    const dayBirth = parseInt(this.inputDay.value);
    const monthBirth = parseInt(this.inputMonth.value);
    const yearBirth = parseInt(this.inputYear.value);

    if (
      isNaN(dayBirth) ||
      isNaN(monthBirth) ||
      isNaN(yearBirth) ||
      dayBirth <= 0 ||
      monthBirth <= 0 ||
      yearBirth <= 0 ||
      monthBirth > 12 ||
      dayBirth > 31 ||
      dayBirth > this.daysInMonth(monthBirth, yearBirth)
    ) {
      alert("Por favor, insira uma data válida.");
      return;
    }

    const dataBirth = { dayBirth, monthBirth, yearBirth };
    this.dateNow(dataBirth);
  },

  dateNow(dataBirth) {
    const data = new Date();
    const dayNow = data.getDate();
    const monthNow = data.getMonth() + 1;
    const yearNow = data.getFullYear();

    const dataNow = { dayNow, monthNow, yearNow };
    this.calculate(dataBirth, dataNow);
  },

  calculate(dataBirth, dataNow) {
    let day = dataNow.dayNow - dataBirth.dayBirth;
    let month = dataNow.monthNow - dataBirth.monthBirth;
    let age = dataNow.yearNow - dataBirth.yearBirth;

    if (day < 0) {
      month--;
      day += this.daysInMonth(dataNow.monthNow - 1, dataNow.yearNow);
    }

    if (month < 0) {
      age--;
      month += 12;
    }

    const informYear = document.querySelector(".inform-year");
    const informMonth = document.querySelector(".inform-month");
    const informDay = document.querySelector(".inform-day");

    informYear.innerHTML = age;
    informMonth.innerHTML = month;
    informDay.innerHTML = day;
  },

  daysInMonth(month, year) {
    if (month === 2) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    }

    const monthsWith30Days = [4, 6, 9, 11];
    if (monthsWith30Days.includes(month)) {
      return 30;
    }

    return 31;
  },

  init() {
    this.dateBirth();
  },
};

calculateData.btnAdd.addEventListener("click", () => calculateData.init());
