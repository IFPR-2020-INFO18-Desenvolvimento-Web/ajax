const button = document.querySelector('#timeout');
// button.addEventListener('click', () => {
//   console.log('Clicou!');
// });

console.log('ANTES');

setTimeout(() => {
  console.log('Resultado assíncrono no futuro.');
}, 2000);

console.log('DEPOIS');

button.addEventListener('click', () => {
  setTimeout(() => {
    console.log('Clicou no botão 3 segundos atrás.');
  }, 3000);
});

/////////////////////////////////////////

const buttonInterval = document.querySelector('#interval');
const divContagem = document.querySelector('#contagem');

buttonInterval.addEventListener('click', () => {
  let contagem = 0;
  divContagem.textContent = contagem;
  const interval = setInterval(() => {
    divContagem.textContent = ++contagem;
    if (contagem >= 1000) {
      clearInterval(interval);
    }
  }, 10);
});
