import { getCart, loadCart, cartCount, addToCart, updateCartItem, removeCartItem, clearCart, renderCartMini, renderCartSummary } from './cart.js';
import { formatPrice, timeLeftStr } from './utils.js';
import { buildGames } from './data.js';
import { getTranslation, localizeGameTitle } from './i18n.js';

const COVER_TIMEOUT_MS = 12000;

let elements = {};

function bindCartElements(){
  elements = {
      drawerOverlay: document.getElementById('drawerOverlay'),
      cartDrawer: document.getElementById('cartDrawer'),
      drawerBody: document.getElementById('drawerBody'),
      drawerFoot: document.getElementById('drawerFoot'),
      subtotalAmt: document.getElementById('subtotalAmt'),
      cartCount: document.getElementById('cartCount'),
      cartBtn: document.getElementById('cartBtn'),
      closeDrawer: document.getElementById('closeDrawer'),
      checkoutBtn: document.getElementById('checkoutBtn'),
      checkoutOverlay: document.getElementById('checkoutOverlay'),
  };
}

export function initCartUI(onCheckout){
  loadCart();
  bindCartElements();
  renderCart();
  // also listen for a global event dispatched from header fragment
  window.addEventListener('openCartDrawer', openDrawer);
  window.addEventListener('cartChanged', renderCart);
  window.addEventListener('storage', event => {
    if(event.key !== 'goosegames_cart_v1') return;
    loadCart();
    renderCart();
  });
  // create a persistent fixed cart bubble at top-right as a separate component
  if(!document.getElementById('cartFixed')){
    const fixed = document.createElement('div');
    fixed.id = 'cartFixed';
    fixed.className = 'cart-fixed';
    fixed.innerHTML = '🛒<span class="cart-count" id="cartCountFixed">0</span>';
    document.body.appendChild(fixed);
    fixed.addEventListener('click', toggleDrawer);
    renderCart();
  }
  if(elements.closeDrawer) elements.closeDrawer.addEventListener('click', closeDrawerFn);
  if(elements.drawerOverlay) elements.drawerOverlay.addEventListener('click', closeDrawerFn);
  if(elements.checkoutBtn) elements.checkoutBtn.addEventListener('click', () => {
    if(getCart().length === 0) return;
    closeDrawerFn();
    onCheckout();
  });
  const clearBtn = document.getElementById('clearCartBtn');
  if(clearBtn) clearBtn.addEventListener('click', ()=>{ clearCart(); renderCart(); });
}

export function renderCart(){
  renderCartMini(elements.drawerBody, {
    onQtyChange: () => renderCart(),
    onRemove: () => renderCart()
  });
  renderCartSummary(elements.subtotalAmt);
  if(elements.cartCount) elements.cartCount.textContent = cartCount();
  const fixedCount = document.getElementById('cartCountFixed');
  if(fixedCount) fixedCount.textContent = cartCount();
  elements.drawerFoot.style.display = getCart().length === 0 ? 'none' : 'block';
}

export function openDrawer(){
  renderCart();
  // visual bubble transform: create a floating bubble that expands into the drawer
  const anim = document.createElement('div');
  anim.className = 'cart-bubble-anim';
  anim.innerHTML = elements.cartBtn ? elements.cartBtn.innerHTML : '🛒';
  document.body.appendChild(anim);
  // force reflow then expand
  // small delay to ensure CSS transition
  requestAnimationFrame(()=>{
    anim.classList.add('expand');
  });
  // after expand animation, show the actual drawer and overlay
  setTimeout(()=>{
    elements.cartDrawer.classList.add('show');
    elements.drawerOverlay.classList.add('show');
    // remove anim element after drawer is visible
    setTimeout(()=>{ anim.remove(); }, 400);
  }, 420);
}

function toggleDrawer(){
  if(elements.cartDrawer?.classList.contains('show')) closeDrawerFn();
  else openDrawer();
}

export function closeDrawerFn(){
  elements.cartDrawer.classList.remove('show');
  elements.drawerOverlay.classList.remove('show');
}

export function buildCard(game, addToCartHandler){
  const card = document.createElement('div');
  card.className = 'card';
  const locTitle = localizeGameTitle(game.name);
  const addBtnText = getTranslation('addToCart');
  let tagHtml = '';
  if(game.dealType === '50% OFF' || game.dealType === '10% OFF') tagHtml = `<div class="tag deal">${game.dealType}</div>`;
  else if(game.dealType === '2 FOR $20') tagHtml = `<div class="tag">2 FOR $20</div>`;
  let limitedHtml = '';
  if(game.endsAt) limitedHtml = `<div class="tag limited" style="top:8px;right:8px;left:auto;">LIMITED DEAL</div>`;
  let timerHtml = game.endsAt ? `<div class="timer" data-ends="${game.endsAt}">${timeLeftStr(game.endsAt - Date.now())}</div>` : '';
  card.innerHTML = `
    <div class="cover">
      <span class="fallback-emoji">${game.emoji}</span>
      <img alt="${locTitle} cover">
      ${tagHtml}${limitedHtml}${timerHtml}
    </div>
    <div class="card-body">
      <div class="name">${locTitle}</div>
      <div class="stars">${'★'.repeat(Math.round(game.rating/1.2))}${'☆'.repeat(5-Math.round(game.rating/1.2))} <span style="color:var(--text-dim)">(${game.rating})</span></div>
      <div class="price-row">
        <div class="price">${formatPrice(game.price)}</div>
        ${game.oldPrice ? `<div class="price-old">${formatPrice(game.oldPrice)}</div>` : ''}
      </div>
      <div class="qty-add">
        <button class="qty-btn" data-action="decrease" type="button">−</button>
        <span class="qty-display">1</span>
        <button class="qty-btn" data-action="increase" type="button">+</button>
        <button class="add-btn">${addBtnText}</button>
      </div>
    </div>
  `;

  const img = card.querySelector('img');
  card._coverPromise = attachCover(img, game.name, game.emoji);
  card._coverPromise.then(result => {
    if(result?.failed) card.remove();
  });
  const qtyDisplay = card.querySelector('.qty-display');
  const qtyButtons = card.querySelectorAll('.qty-btn');
  let qty = 1;
  qtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if(btn.dataset.action === 'increase') qty = Math.min(10, qty + 1);
      else qty = Math.max(1, qty - 1);
      qtyDisplay.textContent = qty;
    });
  });
  const addBtn = card.querySelector('.add-btn');
  addBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    // pass current displayed price as override so listings use game.price
    addToCartHandler(game, qty, '', (game.price || game.basePrice || 0));
    addBtn.textContent = getTranslation('added');
    addBtn.classList.add('added');
    setTimeout(()=>{
      addBtn.textContent = getTranslation('addToCart');
      addBtn.classList.remove('added');
    }, 1200);
  });

  card.addEventListener('click', event => {
    if(event.target.closest('.add-btn') || event.target.closest('.qty-btn')) return;
    if(!event.target.closest('button')){
      window.location.href = `detail.html?id=${game.id}`;
    }
  });
  return card;
}

function emojiDataUrl(emoji){
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='704'><foreignObject width='100%' height='100%'><div xmlns='http://www.w3.org/1999/xhtml' style='font-size:96px;display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#203242,#1e2730);color:white;'>${emoji}</div></foreignObject></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function attachCover(imgEl, name, emojiFallback='🎮', options = {}){
  const { allowEmoji = true, timeoutMs = COVER_TIMEOUT_MS } = options;

  const applyEmoji = () => {
    if(!allowEmoji) return { hasCover: false, failed: true };
    imgEl.src = emojiDataUrl(emojiFallback);
    imgEl.classList.add('loaded');
    return { hasCover: false, fallback: true, failed: true };
  };

  const work = () => import('./covers.js').then(mod => {
    imgEl.dataset.coverStarted = 'true';
    return mod.getCover(name).then(url => {
      if(!url) return applyEmoji();

      return new Promise(resolve => {
        let settled = false;
        const finish = (result) => {
          if(settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(result);
        };
        const timer = setTimeout(() => finish(applyEmoji()), timeoutMs);

        imgEl.src = url;
        imgEl.onload = () => {
          imgEl.classList.add('loaded');
          const fallback = imgEl.closest('.cover, .detail-image, .abundance-tile, .flock-card')?.querySelector('.fallback-emoji, .abundance-fallback');
          if(fallback) fallback.style.display = 'none';
          finish({ hasCover: true, url });
        };
        imgEl.onerror = () => {
          imgEl.onerror = null;
          finish(applyEmoji());
        };
      });
    });
  }).catch(() => applyEmoji());

  return new Promise(resolve => {
    let started = false;
    let timer;
    let observer;
    const start = () => {
      if(started) return;
      started = true;
      observer?.disconnect();
      timer = setTimeout(() => resolve(applyEmoji()), timeoutMs);
      work().then(result => {
        clearTimeout(timer);
        resolve(result);
      });
    };
    if(typeof IntersectionObserver === 'undefined') start();
    else {
      observer = new IntersectionObserver(entries => {
        if(entries.some(entry => entry.isIntersecting)) setTimeout(start, 1000);
      }, { rootMargin: '600px 0px' });
      observer.observe(imgEl);
    }
    const onVisibilityChange = () => {
      if(document.hidden) return;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      setTimeout(start, 1000);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
  });
}

export async function settleCoversAndPrune(cards){
  const settled = Promise.all(
    cards.map(card => card._coverPromise || Promise.resolve({ hasCover: true, fallback: true }))
  );
  return Promise.race([
    settled,
    new Promise(resolve => setTimeout(() => resolve([]), 1500))
  ]);
}

export function pruneElementOnCoverFail(el, promise){
  promise.then(result => {
    if(result?.failed) el.remove();
  });
}

export function startTimers(games){
  setInterval(()=>{
    document.querySelectorAll('.timer[data-ends]').forEach(t=>{
      const ends = parseInt(t.dataset.ends,10);
      t.textContent = timeLeftStr(ends - Date.now());
    });
    if(games){
      const refreshed = refreshExpiredDeals(games);
      if(refreshed){
        document.querySelectorAll('.grid').forEach(async grid=>{
          if(grid.id === 'dealsGrid'){
            grid.innerHTML = '';
            const cards = games.filter(g=>g.dealType).slice(0, 24).map(game => buildCard(game, addToCart));
            cards.forEach(card => grid.appendChild(card));
            await settleCoversAndPrune(cards);
          }
        });
      }
    }
  }, 1000);
}

function refreshExpiredDeals(games){
  let changed = false;
  games.forEach(game=>{
    if(game.dealType && game.endsAt && game.endsAt <= Date.now()){
      game.endsAt = Date.now() + (1000*60*60*(2 + Math.random()*18));
      if(Math.random() < 0.4){
        const r = Math.random();
        game.dealType = r < 0.33 ? '50% OFF' : r < 0.66 ? '10% OFF' : '2 FOR $20';
      }
      changed = true;
    }
  });
  return changed;
}

function buildMarqueeCard(game){
  const mini = document.createElement('div');
  mini.className = 'card marquee-card';
  mini.innerHTML = `<div class="cover"><span class="fallback-emoji">${game.emoji}</span><img alt="${game.name}"></div><div class="card-body"><div class="name">${game.name}</div></div>`;
  attachCover(mini.querySelector('img'), game.name, game.emoji, { allowEmoji: true });
  return mini;
}


export function buildMarquee(elId, games){
  const track = document.getElementById(elId);
  if(!track || !games.length) return;
  track.innerHTML = '';

  const pool = [...games];
  while(pool.length < 14) pool.push(...games);

  const cardCount = Math.max(10, Math.min(18, Math.ceil(window.innerWidth / 180)));
  const buildSet = (startIndex = 0) => {
    const set = document.createElement('div');
    set.className = 'marquee-set';
    for(let i = 0; i < cardCount; i++){
      set.appendChild(buildMarqueeCard(pool[(startIndex + i) % pool.length]));
    }
    return set;
  };

  const setA = buildSet(0);
  const setB = buildSet(Math.floor(cardCount / 2));
  track.appendChild(setA);
  track.appendChild(setB);

  const duration = Math.max(32, Math.round((cardCount * 180) / 42));
  track.style.setProperty('--marquee-duration', `${duration}s`);
}

export function renderPaginatedGrid(container, games, pageSize = 48){
  if(typeof container === 'string') container = document.getElementById(container);
  if(!container) return;
  container.innerHTML = '';
  const total = games.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  let currentPage = 1;

  const renderPage = (page) => {
    container.innerHTML = '';
    const start = (page - 1) * pageSize;
    const slice = games.slice(start, start + pageSize);
    const cards = slice.map(g => buildCard(g, addToCart));
    cards.forEach(c => container.appendChild(c));
    settleCoversAndPrune(cards);
    renderPager();
  };

  const renderPager = () => {
    // remove existing pager
    const existing = container.parentNode.querySelector('.pager');
    if(existing) existing.remove();
    const pager = document.createElement('div');
    pager.className = 'pager';
    const prev = document.createElement('button'); prev.className='btn btn-secondary'; prev.textContent='‹ Prev';
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', ()=>{ if(currentPage>1){ currentPage--; renderPage(currentPage); } });
    pager.appendChild(prev);

    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);
    for(let p = startPage; p <= endPage; p++){
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      if(p === currentPage) btn.classList.add('active');
      btn.textContent = p.toString();
      btn.addEventListener('click', ()=>{ currentPage = p; renderPage(currentPage); });
      pager.appendChild(btn);
    }

    const next = document.createElement('button'); next.className='btn btn-secondary'; next.textContent='Next ›';
    next.disabled = currentPage === totalPages;
    next.addEventListener('click', ()=>{ if(currentPage<totalPages){ currentPage++; renderPage(currentPage); } });
    pager.appendChild(next);

    pager.style.display = 'flex';
    pager.style.justifyContent = 'center';
    pager.style.gap = '8px';
    pager.style.marginTop = '18px';
    container.parentNode.appendChild(pager);
  };

  renderPage(currentPage);
}

export function initStickyFlock(games){
  const flockTop = document.getElementById('flockTop');
  const flockBottom = document.getElementById('flockBottom');
  const stickyScene = document.getElementById('stickyScene');
  const flockText = document.getElementById('flockText');
  const buildFlock = (el, items) => {
    items.forEach(g=>{
      const c = document.createElement('div');
      c.className = 'flock-card';
      c.innerHTML = `<img alt="${g.name}">`;
      attachCover(c.querySelector('img'), g.name, g.emoji);
      el.appendChild(c);
    });
  };
  buildFlock(flockTop, games.slice(0,7));
  buildFlock(flockBottom, games.slice(7,14));
  const onScrollFlock = () => {
    const rect = stickyScene.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    let progress = (-rect.top) / total;
    progress = Math.max(0, Math.min(1, progress));
    const offset = (1-progress) * (window.innerWidth*0.9 + 400);
    flockTop.style.transform = `translateX(${-offset}px) translateY(-50%)`;
    flockBottom.style.transform = `translateX(${offset}px) translateY(-50%)`;
    flockText.style.opacity = progress < 0.08 ? progress/0.08 : 1;
    flockText.querySelector('small').textContent = progress > 0.92
      ? getTranslation('flockBannerSubFinal')
      : getTranslation('flockBannerSub');
  };
  window.addEventListener('scroll', onScrollFlock);
  window.addEventListener('resize', onScrollFlock);
  onScrollFlock();
}

export function initAbundanceScene(games){
  const field = document.getElementById('abundanceField');
  if(!field || !games.length) return;
  field.innerHTML = '';

  const sizes = ['sm', 'md', 'lg', 'xl'];
  const picked = [...games].sort(() => Math.random() - 0.5).slice(0, Math.min(32, games.length));
  const slots = [];
  for(let row = 0; row < 5; row++){
    for(let col = 0; col < 8; col++){
      const x = 3 + (col * 13.2);
      const y = 5 + (row * 20);
      const size = sizes[(row + col) % sizes.length];
      const rot = ((row * 17) + (col * 11)) % 28 - 14;
      slots.push({ x, y, size, rot });
    }
  }

  picked.forEach((g, i) => {
    const slot = slots[i % slots.length];
    const jitterX = (Math.random() - 0.5) * 5;
    const jitterY = (Math.random() - 0.5) * 4;
    const tile = document.createElement('div');
    tile.className = `abundance-tile ${slot.size}`;
    tile.style.left = `${slot.x + jitterX}%`;
    tile.style.top = `${slot.y + jitterY}%`;
    tile.style.animationDelay = `${(i * 0.35) % 5}s`;
    tile.style.animationDuration = `${8 + (i % 5)}s`;
    tile.style.setProperty('--ab-rot', `${slot.rot + (Math.random() - 0.5) * 6}deg`);
    tile.innerHTML = `<span class="abundance-fallback">${g.emoji}</span><img alt="${g.name}">`;
    const coverPromise = attachCover(tile.querySelector('img'), g.name, g.emoji, { allowEmoji: true });
    pruneElementOnCoverFail(tile, coverPromise);
    field.appendChild(tile);
  });
}

export function renderGrid(gridId, titleId, games, category){
  const grid = document.getElementById(gridId);
  const title = document.getElementById(titleId);
  if(!grid || !title) return;
  title.textContent = category ? `${category} ${getTranslation('gamesLabel')}` : getTranslation('popularRightNow');
  renderPaginatedGrid(grid, games, 36);
}
