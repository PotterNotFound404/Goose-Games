import { CATEGORIES, SUBCATS } from './data.js';
import { loadCart, cartSubtotal } from './cart.js';
import { initCartUI } from './ui.js';
import { formatPrice } from './utils.js';
import { getLanguage, setLanguage, applyLocalization, localizeCategory, getTranslation } from './i18n.js';
import { initMagneticCursor, initGlowEffects, initCursorTrail } from './effects.js';
import { initChatbot } from './chatbot.js';
import { openWheel, initSpinWheel } from './wheel.js';
import { openRandomGameModal, initRandomGame } from './randomGame.js';
import { openSettings, initSettingsSystem, applyContrastMode, toggleContrastMode } from './settings.js';
import { initJokeGenerator } from './jokes.js';

export function getQueryParam(name){
  return new URLSearchParams(window.location.search).get(name) || '';
}

export function loadFragment(path, containerId){
  const container = document.getElementById(containerId);
  if(!container) return Promise.resolve();
  return fetch(path).then(r=>r.text()).then(html=>{ container.innerHTML = html; });
}

export async function loadLayout(onCheckout){
  await Promise.all([
    loadFragment('header.html', 'siteHeader'),
    loadFragment('footer.html', 'siteFooter'),
    loadFragment('cart.html', 'siteCart')
  ]);

  setupTheme();
  ensureFavicon();
  setLanguage(getLanguage());
  applyLocalization();
  renderCategoryNav();
  attachHeaderEvents();
  initJokeGenerator();
  loadCart();

  initCartUI(() => {
    sessionStorage.setItem('goosegames_checkout_total', formatPrice(cartSubtotal()));
    onCheckout?.();
  });

  // Initialize Interactive Effects & Features
  initMagneticCursor();
  initGlowEffects();
  initCursorTrail();
  initChatbot();
  initSpinWheel();
  initRandomGame();
  initSettingsSystem();
}

function setupTheme(){
  document.documentElement.setAttribute('data-theme', 'dark');
  applyContrastMode();
}

function ensureFavicon(){
  const existing = document.querySelector('link[rel="icon"]');
  if(existing){
    existing.href = 'favicon.svg';
    existing.type = 'image/svg+xml';
    return;
  }
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = 'favicon.svg';
  document.head.appendChild(link);
}

function renderCategoryNav(){
  const nav = document.getElementById('categoryNav');
  const select = document.getElementById('filterCategory');
  if(!nav || !select) return;
  nav.innerHTML = '';
  select.innerHTML = `<option value="">${getTranslation('searchAll')}</option>`;

  const lang = getLanguage();

  Object.keys(CATEGORIES).forEach(cat => {
    const locCat = localizeCategory(cat, lang);
    const item = document.createElement('div');
    item.className = 'cat-item';
    const subLinks = SUBCATS.map(sub => {
      const isUnder20 = sub === 'Under $20';
      const q = isUnder20 ? 'under20' : sub;
      return `<a href="search.html?category=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}">${sub}</a>`;
    }).join('');
    item.innerHTML = `<a href="search.html?category=${encodeURIComponent(cat)}">${locCat} ▾</a>
      <div class="megamenu">
        <div class="mm-title">${locCat}</div>
        ${subLinks}
      </div>`;
    nav.appendChild(item);

    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = locCat;
    select.appendChild(opt);
  });

  const communityItem = document.createElement('div');
  communityItem.className = `cat-item cat-community${document.body?.dataset.page === 'community' ? ' current-page' : ''}`;
  communityItem.innerHTML = `<a href="community.html">${getTranslation('communityGames')}</a><button class="header-joke-btn" id="randomJokeHeaderBtn" type="button" title="${getTranslation('randomJokeBtn')}" aria-label="${getTranslation('randomJokeBtn')}">${getTranslation('randomJokeBtn')}</button>`;
  nav.appendChild(communityItem);
}

function attachHeaderEvents(){
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const filterCategory = document.getElementById('filterCategory');
  const languageToggle = document.getElementById('languageToggle');
  const contrastToggle = document.getElementById('contrastToggle');
  const accountBtn = document.getElementById('accountBtn');

  const randomGameBtn = document.getElementById('randomGameHeaderBtn');
  const spinWheelBtn = document.getElementById('spinWheelHeaderBtn');
  const settingsBtn = document.getElementById('settingsHeaderBtn');

  if(searchInput){
    searchInput.addEventListener('keydown', e => {
      if(e.key === 'Enter') executeSearch();
    });
  }
  if(searchBtn) searchBtn.addEventListener('click', executeSearch);
  if(filterCategory) filterCategory.addEventListener('change', executeSearch);

  if(languageToggle) {
    languageToggle.value = getLanguage();
    languageToggle.addEventListener('change', e => {
      setLanguage(e.target.value);
      renderCategoryNav();
    });
  }

  if(contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      const isContrast = document.body.classList.contains('contrast-mode');
      toggleContrastMode(!isContrast);
    });
  }

  if(accountBtn) accountBtn.addEventListener('click', () => window.location.href = 'account.html');
  if(randomGameBtn) randomGameBtn.addEventListener('click', openRandomGameModal);
  if(spinWheelBtn) spinWheelBtn.addEventListener('click', openWheel);
  if(settingsBtn) settingsBtn.addEventListener('click', openSettings);

  // Auto-hide header when scrolling down, show when scrolling up
  const headerEl = document.querySelector('header.main');
  let lastY = window.scrollY;
  let ticking = false;
  function onScroll(){
    const y = window.scrollY;
    if(!ticking){
      window.requestAnimationFrame(()=>{
        if(!headerEl) return;
        if(y < 60 || y < lastY){
          headerEl.classList.remove('header-hidden');
          headerEl.classList.add('header-visible');
        } else {
          headerEl.classList.remove('header-visible');
          headerEl.classList.add('header-hidden');
        }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
}

function executeSearch(){
  const term = (document.getElementById('searchInput')?.value || '').trim();
  const cat = document.getElementById('filterCategory')?.value || '';
  const params = new URLSearchParams();
  if(term) params.set('q', term);
  if(cat) params.set('category', cat);
  window.location.href = `search.html?${params.toString()}`;
}

// Global listener for language changes
window.addEventListener('languageChanged', () => {
  renderCategoryNav();
  applyLocalization();
  if(document.body?.dataset.page === 'community') {
    document.title = `${getTranslation('communityGames')} - GooseGames`;
  }
});
