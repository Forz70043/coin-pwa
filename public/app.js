const API_URL = 'http://localhost:3001/coins';

document.getElementById('coin-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const id = form.dataset.id;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  const response = await fetch(url, {
    method: method,
    body: formData
  });
  
  const result = await response.json();
  alert(id ? 'Coin updated' : 'Coin saved');
  form.reset();
  delete form.dataset.id;
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
    
    
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => populateFormForEdit(coin);
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteCoin(coin.id);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

async function deleteCoin(id) {
  if (confirm('Are you sure you want to delete this coin?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadCoins();
  }
}


function populateFormForEdit(coin) {
  const form = document.getElementById('coin-form');
  form.dataset.id = coin.id; // Save ID for PUT

  form.type.value = coin.type;
  form.country.value = coin.country;
  form.year.value = coin.year;
  form.denomination.value = coin.denomination;
  form.mint_mark.value = coin.mint_mark;
  form.material.value = coin.material;
  form.grade.value = coin.grade;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


window.addEventListener('load', () => {
  loadCoins();

  // Registra service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
});
