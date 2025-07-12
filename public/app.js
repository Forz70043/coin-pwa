const API_URL = 'http://localhost:3001/coins';

document.getElementById('coin-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    type: form.type.value,
    country: form.country.value,
    year: parseInt(form.year.value),
    denomination: form.denomination.value,
    mint_mark: form.mint_mark.value,
    material: form.material.value,
    grade: form.grade.value,
    image: form.image.value
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

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
    li.textContent = `${coin.year} ${coin.country} - ${coin.denomination}`;
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
