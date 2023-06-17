const api = '931cf3d3525f90196b6b7b4984b71e9e';
const city = 'Dimitrovgrad';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${api}`;

fetch(url, {
  method: 'GET'
})
  .then((res) => {
    if(!res.ok) {
      throw new Error();
    }
    return res.json();
  })
  .then((data) => {
    document.querySelector('#temperature').textContent = Math.floor(data.main.temp) + ' °C';
    document.querySelector('#humidity').textContent = Math.floor(data.main.humidity) + ' %';
  })
  .catch(() => {
    document.querySelector('.weather__data').textContent = 'Произошла ошибка';
  });