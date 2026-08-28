import { formatPrice } from './utils.js';
import { getTranslation } from './i18n.js';
import { getCover } from './covers.js';

const cartKey = 'goosegames_cart_v1';
const cartState = { items: [] };

export function loadCart(){
  try{
    const stored = localStorage.getItem(cartKey);
    if(stored) cartState.items = JSON.parse(stored);
  }catch(_){}
  return cartState.items;
}

export function saveCart(){
  localStorage.setItem(cartKey, JSON.stringify(cartState.items));
  window.dispatchEvent(new CustomEvent('cartChanged', { detail: { count: cartCount() } }));
}

export function getCart(){
  return cartState.items;
}

export function cartCount(){
  return cartState.items.reduce((sum,item)=>sum+item.qty,0);
}

export function addToCart(game, qty, edition, priceOverride){
  const key = `${game.id}::${edition || ''}`;
  const existing = cartState.items.find(item=>item.key === key);
  const priceToUse = typeof priceOverride === 'number' ? priceOverride : (game.price || game.basePrice || 0);
  if(existing) existing.qty += qty;
  else cartState.items.push({ key, id: game.id, edition: edition || '', name: game.name, price: priceToUse, qty, emoji: game.emoji });
  saveCart();
}

export function updateCartItem(key, qty){
  const item = cartState.items.find(i=>i.key===key);
  if(!item) return;
  item.qty = qty;
  if(item.qty <= 0) cartState.items = cartState.items.filter(i=>i.key!==key);
  saveCart();
}

export function removeCartItem(key){
  cartState.items = cartState.items.filter(i=>i.key!==key);
  saveCart();
}

export function clearCart(){
  cartState.items = [];
  saveCart();
}

export function cartSubtotal(){
  return cartState.items.reduce((sum,item)=>sum+item.price*item.qty,0);
}

export function renderCartMini(container, {onQtyChange, onRemove}){
  container.innerHTML = '';
  if(cartState.items.length === 0){
    container.innerHTML = `<div class="empty-cart"><div class="big">🪹</div><p>${getTranslation('cartEmpty')}</p></div>`;
    return;
  }
  cartState.items.forEach(item=>{
    const line = document.createElement('div');
    line.className = 'cart-line';
    line.innerHTML = `
      <div class="mini-cover"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">${item.emoji}</span><img alt="${item.name}"></div>
      <div class="meta" data-key="${item.key}">
        <div class="n">${item.name} ${item.edition ? `<small class=\"edition\">— ${item.edition}</small>` : ''}</div>
        <div class="ctrl">
          <button class="qty-btn" data-action="decrease" data-key="${item.key}">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" data-action="increase" data-key="${item.key}">+</button>
          <span class="per-price">${formatPrice(item.price)} ${getTranslation('each')}</span>
          <span class="line-total">${formatPrice(item.price * item.qty)}</span>
        </div>
        <button class="remove" data-key="${item.key}">${getTranslation('remove')}</button>
      </div>
    `;
    const coverImage = line.querySelector('.mini-cover img');
    getCover(item.name).then(url => {
      if(!url || !coverImage.isConnected) return;
      coverImage.addEventListener('load', () => coverImage.classList.add('loaded'), { once: true });
      coverImage.src = url;
    });
    const qtyButtons = line.querySelectorAll('.qty-btn');
    qtyButtons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const key = btn.dataset.key;
        const action = btn.dataset.action;
        const existing = cartState.items.find(i=>i.key===key);
        if(!existing) return;
        const newQty = action === 'increase' ? existing.qty + 1 : existing.qty - 1;
        updateCartItem(key, newQty);
        onQtyChange();
      });
    });
    line.querySelector('.remove').addEventListener('click', ()=>{
      const key = line.querySelector('.remove').dataset.key;
      removeCartItem(key);
      onRemove();
    });
    container.appendChild(line);
  });
}

export function renderCartSummary(subtotalElement){
  subtotalElement.textContent = formatPrice(cartSubtotal());
}
