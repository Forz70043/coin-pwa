const API_URL = 'http://localhost:3001/coins';

document.getElementById('coin-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  alert('Moneta salvata con ID: ' + result.id);
  form.reset();
  loadCoins();
});

async function loadCoins() {
  const res = await fetch(API_URL);
  const coins = await res.json();

  const list = document.getElementById('coin-list');
  list.innerHTML = '';

  coins.forEach(coin => {
    const li = document.createElement('li');

    if (coin.image) {
      const img = document.createElement('img');
      img.src = `/uploads/${coin.image}`;
      img.width = 100;
      li.appendChild(img);
    }

    const text = document.createTextNode(`${coin.year} ${coin.country} - ${coin.denomination}`);
    li.appendChild(text);
    list.appendChild(li);
  });
}

window.addEventListener('load', () => {
  loadCoins();

  // Registra service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
});
