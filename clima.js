const buttonVerificarLondres = document.querySelector('.verificar-londres');
const buttonVerificarSanFrancisco = document.querySelector('.verificar-san');
const divClima = document.querySelector('.clima');
const proxy = 'https://cors-anywhere.herokuapp.com/';
const urlBase = 'https://www.metaweather.com';

const verificarClima = (local, funcao) => {
  axios.get(`${proxy}${urlBase}/api/location/${local}`).then(response => {
    funcao(response.data);
  });
};

buttonVerificarLondres.addEventListener('click', () => {
  verificarClima('44418', clima => {
    mostrarClima(clima.consolidated_weather, clima.title);
  });
});

buttonVerificarSanFrancisco.addEventListener('click', () => {
  verificarClima('2487956', clima => {
    mostrarClima(clima.consolidated_weather, clima.title);
  });
});

const mostrarClima = (climaProximosDias, local) => {
  divClima.innerHTML = `<div><strong>Local:</strong> ${local}</div>`;

  for (const clima of climaProximosDias) {
    divClima.innerHTML += `
      <div class="dia">
        <div><img class="clima-geral" src="${urlBase}/static/img/weather/png/${clima.weather_state_abbr}.png"></div>
        <div><strong>Data:</strong> ${clima.applicable_date}</div>
        <div><strong>Temperatura Atual:</strong> ${clima.the_temp}</div>
        <div><strong>Temperatura Mínima:</strong> ${clima.min_temp}</div>
        <div><strong>Temperatura Máxima:</strong> ${clima.max_temp}</div>
        <div><strong>Clima geral:</strong> ${clima.weather_state_name}</div>
      </div>
  `;
  }
};
