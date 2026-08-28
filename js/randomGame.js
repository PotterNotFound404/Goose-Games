// GooseGames Random Game Picker Component
import { buildGames } from './data.js';
import { attachCover } from './ui.js';
import { formatPrice } from './utils.js';
import { getTranslation, getLanguage, localizeGameTitle, localizeCategory, localizeGameDescription } from './i18n.js';
import { addToCart } from './cart.js';

let allGamesList = [];

export function initRandomGame() {
  allGamesList = buildGames();
  if (document.getElementById('randomGameModal')) return;

  const modal = document.createElement('div');
  modal.id = 'randomGameModal';
  modal.className = 'goose-modal-overlay';
  modal.innerHTML = `
    <div class="goose-modal-content random-modal-content">
      <button class="modal-close-btn" id="closeRandomBtn" type="button">&times;</button>
      <h2 data-i18n="randomTitle">${getTranslation('randomTitle')}</h2>
      <p class="modal-sub" data-i18n="randomSub">${getTranslation('randomSub')}</p>

      <div id="randomDisplay" class="random-card-slot">
        <!-- Selected game card dynamically rendered here -->
      </div>

      <div class="random-actions">
        <button id="rollAgainBtn" class="btn btn-primary" type="button" data-i18n="rollAgain">${getTranslation('rollAgain')}</button>
        <button id="closeRandomModalBtn" class="btn btn-secondary" type="button" data-i18n="close">${getTranslation('close')}</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('closeRandomBtn').addEventListener('click', closeRandomModal);
  document.getElementById('closeRandomModalBtn').addEventListener('click', closeRandomModal);
  document.getElementById('rollAgainBtn').addEventListener('click', pickRandomGame);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeRandomModal();
  });
}

export function openRandomGameModal() {
  initRandomGame();
  const modal = document.getElementById('randomGameModal');
  if (modal) {
    modal.classList.add('open');
    pickRandomGame();
  }
}

export function closeRandomModal() {
  const modal = document.getElementById('randomGameModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function pickRandomGame() {
  const display = document.getElementById('randomDisplay');
  if (!display || !allGamesList.length) return;

  const lang = getLanguage();
  display.classList.add('shuffling');
  display.innerHTML = `<div class="shuffle-loading"><span class="shuffle-goose">🪿</span> <p data-i18n="spinToPick">${getTranslation('spinToPick')}</p></div>`;

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * allGamesList.length);
    const game = allGamesList[randomIndex];

    const locTitle = localizeGameTitle(game.name, lang);
    const locCat = localizeCategory(game.category, lang);
    const locDesc = localizeGameDescription(game.name, game.category, lang);

    display.classList.remove('shuffling');
    display.innerHTML = `
      <div class="random-game-card">
        <div class="random-cover">
          <span class="fallback-emoji">${game.emoji}</span>
          <img alt="${locTitle} cover">
          ${game.dealType ? `<div class="tag deal">${game.dealType}</div>` : ''}
        </div>
        <div class="random-info">
          <div class="cat-tag">${locCat}</div>
          <h3>${locTitle}</h3>
          <div class="stars">${'★'.repeat(Math.round(game.rating/1.2))}${'☆'.repeat(5-Math.round(game.rating/1.2))} (${game.rating})</div>
          <div class="price-row">
            <div class="price large">${formatPrice(game.price)}</div>
            ${game.oldPrice ? `<div class="price-old">${formatPrice(game.oldPrice)}</div>` : ''}
          </div>
          <p class="desc">${locDesc}</p>
          <div class="actions">
            <button class="btn btn-primary" id="randomAddCartBtn" type="button" data-i18n="addToCart">${getTranslation('addToCart')}</button>
            <a href="detail.html?id=${game.id}" class="btn btn-secondary" data-i18n="viewDetails">${getTranslation('viewDetails')}</a>
          </div>
        </div>
      </div>
    `;

    const img = display.querySelector('img');
    attachCover(img, game.name, game.emoji);

    display.querySelector('#randomAddCartBtn')?.addEventListener('click', () => {
      addToCart(game, 1, '', game.price);
      const btn = display.querySelector('#randomAddCartBtn');
      btn.textContent = getTranslation('added');
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = getTranslation('addToCart');
        btn.classList.remove('added');
      }, 1200);
    });

  }, 350);
}
