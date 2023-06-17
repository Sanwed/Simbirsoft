const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
  (year % 100 === 0 && year % 400 === 0);
const getFebDays = (year) => isLeapYear(year) ? 29 : 28;

const calendar = document.querySelector('.calendar');
const mainScreen = document.querySelector('.main-screen');

calendar.onmousedown = function (e) {
  if (e.target.closest('.calendar__wrapper')) {
    return;
  }
  
  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
  
  const coords = getCoords(calendar);
  const shiftX = e.pageX - coords.left;
  const shiftY = e.pageY - coords.top;
  
  moveAt(e);
  mainScreen.appendChild(calendar);
  
  function moveAt(e) {
    calendar.style.left = e.pageX - shiftX + 'px';
    calendar.style.top = e.pageY - shiftY + 'px';
  }
  
  document.onmousemove = function (e) {
    moveAt(e);
  }
  
  calendar.onmouseup = function () {
    document.onmousemove = null;
    calendar.onmouseup = null;
  }
  
  calendar.ondragstart = function () {
    return false;
  };
}

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const monthPicker = document.querySelector('#month-picker');
const generateCalendar = (month, year) => {
  const calendarDays = document.querySelector('.calendar__days');
  calendarDays.innerHTML = '';
  const calendarHeaderYear = document.querySelector('#year');
  const daysOfMonth = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  
  let currentDate = new Date();
  monthPicker.textContent = months[month];
  calendarHeaderYear.textContent = year;
  
  let firstDay = new Date(year, month);
  for (let i = 1; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
    let day = document.createElement('div');
    
    if (i >= firstDay.getDay()) {
      day.innerHTML = `${i - firstDay.getDay() + 1}`;
      
      if (i - firstDay.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendarDays.appendChild(day);
  }
};

const monthList = calendar.querySelector('.month-list');
months.forEach((e, index) => {
  const month = document.createElement('div');
  month.innerHTML = e;
  
  monthList.append(month);
  month.addEventListener('click', () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
  });
});

const preYearButton = document.querySelector('#pre-year');
const nextYearButton = document.querySelector('#next-year');

preYearButton.addEventListener('click', () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
});

nextYearButton.addEventListener('click', () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
});

let currentDate = new Date();
let currentMonth = {value: currentDate.getMonth()};
let currentYear = {value: currentDate.getFullYear()};
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-format');
const todayShowDate = document.querySelector('.date-format');

const currentShowDate = new Date();
const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const currentDateFormat = new Intl.DateTimeFormat('ru', showCurrentDateOption).format(currentShowDate);
todayShowDate.textContent = currentDateFormat;

setInterval(() => {
  const timer = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  todayShowTime.textContent = new Intl.DateTimeFormat('ru', option).format(timer);
}, 0);