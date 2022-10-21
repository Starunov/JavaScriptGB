const basketCountEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const basket = {};

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});


document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.closest('.addToCart')) {
    return;
  }
  const featuredItemEl = event.target.closest('.featuredItem');
  const id = +featuredItemEl.dataset.id;
  const name = featuredItemEl.dataset.name;
  const price = +featuredItemEl.dataset.price;
  addToCart(id, name, price);
  basketCountEl.textContent = getCountProducts().toString();
  basketTotalValueEl.textContent = getTotalPrice().toFixed(2).toString();
  drawBasketProduct(id);
});

function addToCart(id, name, price) {
  if (!basket[id]) {
    basket[id] = { id, name, price, count: 0 }
  }
  basket[id].count++;
}

function getCountProducts() {
  return Object.values(basket).reduce((accum, prod) => accum + prod.count, 0);
}

function getTotalPrice() {
  return Object.values(basket)
    .reduce((accum, prod) => accum + prod.count * prod.price, 0);
}

function drawBasketProduct(id) {
  const productRowEl = document.querySelector(`.basketRow[data-id="${id}"`);

  if (!productRowEl) {
    drawNewBasketProduct(id);
    return;
  }
  productRowEl.querySelector('.basketRow__count')
    .textContent = basket[id].count.toString();
  productRowEl.querySelector('.basketRow__totalPrice')
    .textContent = (basket[id].count * basket[id].price).toFixed(2);
}

function drawNewBasketProduct(id) {
  const newRow = `
    <div class="basketRow" data-id="${id}">
      <div>${basket[id].name}</div>
      <div class="basketRow__count">${basket[id].count}</div>
      <div>${basket[id].price}</div>
      <div class="basketRow__totalPrice">${basket[id].count * basket[id].price}</div>
    </div>
  `;
  basketTotalEl.insertAdjacentHTML("beforebegin", newRow);
}