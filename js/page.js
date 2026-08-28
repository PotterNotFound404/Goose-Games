import { loadLayout, getQueryParam } from './common.js';
import { buildGames } from './data.js';
import { renderGrid, renderPaginatedGrid, buildMarquee, initStickyFlock, initAbundanceScene, startTimers, attachCover, buildCard, settleCoversAndPrune } from './ui.js';
import { showPageLoader, updateLoaderProgress, hidePageLoader } from './loader.js';
import { addToCart, cartSubtotal } from './cart.js';
import { formatPrice, timeLeftStr, isEmojiOnly } from './utils.js';
import { getTranslation, localizeGameTitle, localizeCategory, localizeGameDescription } from './i18n.js';

const COMMUNITY_PROJECTS = [
  {
    id: 1308292936,
    title: 'Unread',
    creator: 'PotterNotFound404',
    type: 'game',
    vibe: 'Narrative game',
    description: 'A school project packed with mini-games, animated cutscenes, and a cyber-bullying story that keeps shifting between genres. It starts like a straightforward assignment, then keeps opening into something stranger, denser, and more emotionally loaded than the first glimpse suggests. The structure jumps between moments, the pacing keeps you guessing, and every section feels like it is building toward a bigger idea than just a single level or a single joke. It has that homemade Scratch energy, but there is real ambition underneath it, the kind that sticks with you because it is trying to do more than simply entertain for a minute. There are small details tucked into the transitions, tiny changes in tone, and enough narrative friction that it stops feeling like a simple game and starts feeling like a personal project with layers. The more you sit with it, the more it reveals about the way it is framing pressure, conflict, and the awkwardness of being seen. That extra depth is exactly why it deserves more than a quick glance.',
    image: 'https://cdn2.scratch.mit.edu/get_image/project/1308292936_480x360.png',
    url: 'https://scratch.mit.edu/projects/1308292936/',
    fullscreenUrl: 'https://scratch.mit.edu/projects/1308292936/embed',
    stats: { views: 32, loves: 2, favorites: 1 }
  },
  {
    id: 850880325,
    title: 'The Completely Normal Platformer - Part 1',
    creator: 'PotterNotFound404',
    type: 'game',
    vibe: 'Album piece',
    description: 'The opener in the platformer album. Narrator battles, hidden links, and a weirdly confident tone set the whole mood.',
    image: 'https://cdn2.scratch.mit.edu/get_image/project/850880325_480x360.png',
    url: 'https://scratch.mit.edu/projects/850880325/',
    fullscreenUrl: 'https://scratch.mit.edu/projects/850880325/embed',
    stats: { views: 436, loves: 33, favorites: 28 }
  },
  {
    id: 863681892,
    title: 'The Completely Normal Platformer - Part 2',
    creator: 'PotterNotFound404',
    type: 'game',
    vibe: 'Album piece',
    description: 'The sequel keeps the narrator chaos going with more platforming and a bigger sense of escalation.',
    image: 'https://cdn2.scratch.mit.edu/get_image/project/863681892_480x360.png',
    url: 'https://scratch.mit.edu/projects/863681892/',
    fullscreenUrl: 'https://scratch.mit.edu/projects/863681892/embed',
    stats: { views: 169, loves: 9, favorites: 10 }
  },
  {
    id: 890736191,
    title: 'The Completely Normal Platformer - Part 3',
    creator: 'PotterNotFound404',
    type: 'game',
    vibe: 'Album piece',
    description: 'Part 3 pushes the joke harder and asks you to pay attention in the middle of the chaos.',
    image: 'https://cdn2.scratch.mit.edu/get_image/project/890736191_480x360.png',
    url: 'https://scratch.mit.edu/projects/890736191/',
    fullscreenUrl: 'https://scratch.mit.edu/projects/890736191/embed',
    stats: { views: 136, loves: 10, favorites: 11 }
  },
  {
    id: 1194658465,
    title: 'The Completely Normal Platformer - Part 4',
    creator: 'PotterNotFound404',
    type: 'game',
    vibe: 'Sneak peek',
    description: 'A sneak peek chapter in the album, short and teasing, like a hidden track before the final release.',
    image: 'https://cdn2.scratch.mit.edu/get_image/project/1194658465_480x360.png',
    url: 'https://scratch.mit.edu/projects/1194658465/',
    fullscreenUrl: 'https://scratch.mit.edu/projects/1194658465/embed',
    stats: { views: 11, loves: 0, favorites: 0 }
  },
  {
    id: 864617620,
    title: 'Scribble - An Animation',
    creator: 'PotterNotFound404',
    type: 'animation',
    vibe: 'Animation',
    description: 'A clean little animation entry with unfinished energy and a sketchbook feel.',
    image: 'https://cdn2.scratch.mit.edu/get_image/project/864617620_480x360.png',
    url: 'https://scratch.mit.edu/projects/864617620/',
    fullscreenUrl: 'https://scratch.mit.edu/projects/864617620/embed',
    stats: { views: 25, loves: 3, favorites: 3 }
  },
  {
    id: 859317247,
    title: 'The Bounce Simulator',
    creator: 'PotterNotFound404',
    type: 'game',
    vibe: 'Simulator',
    description: 'A bounce-driven simulator with upgrades, duplication, trails, and the kind of loop that turns into a challenge.',
    image: 'https://cdn2.scratch.mit.edu/get_image/project/859317247_480x360.png',
    url: 'https://scratch.mit.edu/projects/859317247/',
    fullscreenUrl: 'https://scratch.mit.edu/projects/859317247/embed',
    stats: { views: 62, loves: 2, favorites: 2 }
  }
];

const ALL_GAMES = buildGames().filter(game => !isEmojiOnly(game.name) && !/^cyberpunk 2077$/i.test(game.name));
const pageName = document.body.dataset.page;
const USER_REVIEWS_KEY = 'goosegames_user_reviews_v1';

if(pageName === 'index') showPageLoader();

async function init(){
  await loadLayout(() => window.location.href = 'checkout.html');
  if(pageName === 'search') initSearch();
  if(pageName === 'deals') initDeals();
  if(pageName === 'account') initAccount();
  if(pageName === 'checkout') initCheckout();
  if(pageName === 'community') initCommunityPage();
  if(pageName === 'index') initHome();
  if(pageName === 'detail') initDetail();
  startTimers(ALL_GAMES);
}

async function initHome(){
  try {
    updateLoaderProgress(12);

    document.querySelector('.hero h1')?.classList.add('display');
    const dealsGrid = document.getElementById('dealsGrid');
    const dealsSection = document.getElementById('dealsSection');
    if(!dealsGrid) return;

    updateLoaderProgress(28);
    const deals = ALL_GAMES.filter(g => g.dealType).slice(0, 24);
    dealsGrid.innerHTML = '';
    const cards = deals.map(g => buildCard(g, addToCart));
    cards.forEach(c => dealsGrid.appendChild(c));
    updateLoaderProgress(48);

    const unique = [];
    const seen = new Set();
    for(const g of ALL_GAMES){ if(!seen.has(g.name)){ seen.add(g.name); unique.push(g); } if(unique.length>=40) break; }
    buildMarquee('marquee1', unique.slice(0, 20));
    buildMarquee('marquee2', unique.slice(20, 40));
    updateLoaderProgress(62);

    initStickyFlock(unique.slice(0, 40));

    const abundancePool = [];
    const abundanceSeen = new Set();
    for(const g of ALL_GAMES){
      if(!abundanceSeen.has(g.name)){ abundanceSeen.add(g.name); abundancePool.push(g); }
      if(abundancePool.length >= 140) break;
    }
    initAbundanceScene(abundancePool);
    updateLoaderProgress(78);

    await settleCoversAndPrune(cards);
    updateLoaderProgress(94);

    document.getElementById('dealsHeroBtn')?.addEventListener('click', ()=> dealsSection?.scrollIntoView({behavior:'smooth'}));
    document.getElementById('startExploreBtn')?.addEventListener('click', ()=> window.location.href = 'search.html');
    document.getElementById('viewDealsLink')?.addEventListener('click', ()=> dealsSection?.scrollIntoView({behavior:'smooth'}));
    document.getElementById('dealsAllLink')?.addEventListener('click', e=>{ e.preventDefault(); dealsSection?.scrollIntoView({behavior:'smooth'}); });

    updateLoaderProgress(100);
  } finally {
    hidePageLoader();
  }
}

function renderCommunitySection(){
  const featured = document.getElementById('communityFeatured');
  const album = document.getElementById('communityAlbumTrack');
  if(!featured || !album) return;

  const featuredProjects = COMMUNITY_PROJECTS.filter(project => project.id !== 850880325 && project.id !== 863681892 && project.id !== 890736191 && project.id !== 1194658465);
  featured.innerHTML = '';
  featuredProjects.forEach(project => featured.appendChild(buildCommunityCard(project, project.type === 'animation' ? 'Animation' : 'Game')));

  const albumProjects = COMMUNITY_PROJECTS.filter(project => [850880325, 863681892, 890736191, 1194658465].includes(project.id));
  album.innerHTML = '';
  albumProjects.forEach((project, index) => album.appendChild(buildCommunityAlbumCard(project, index + 1)));

  wireCommunityModal();
}

function initCommunityPage(){
  document.title = `${getTranslation('communityGames')} - GooseGames`;
  renderCommunitySection();
  initCommunityEasterEgg();
  const expandLink = document.getElementById('communityExpandLink');
  if(expandLink) expandLink.href = 'community.html';
}

function initCommunityEasterEgg(){
  const avatar = document.querySelector('.community-hero-avatar');
  if(!avatar || document.getElementById('communityEasterEgg')) return;

  let audioContext;
  const getAudioContext = () => {
    if(!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if(audioContext.state === 'suspended') audioContext.resume();
    return audioContext;
  };
  const tone = (frequency, duration, start, type = 'sine', volume = .05, slideTo = frequency) => {
    const context = getAudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), start + duration);
    gain.gain.setValueAtTime(.001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .015);
    gain.gain.exponentialRampToValueAtTime(.001, start + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + .02);
  };
  const playLaunchSound = () => {
    const context = getAudioContext();
    const now = context.currentTime;
    tone(420, .16, now, 'sine', .07, 760);
    tone(620, .22, now + .07, 'triangle', .045, 980);
    [880, 1175, 1480].forEach((frequency, index) => tone(frequency, .16, now + .2 + index * .07, 'triangle', .035));
  };
  const playCheer = () => {
    const context = getAudioContext();
    const now = context.currentTime;
    [523, 659, 784, 1047].forEach((frequency, index) => tone(frequency, .28, now + index * .08, 'triangle', .045));
    tone(1047, .42, now + .32, 'sine', .055, 1175);
  };
  const playWhoosh = direction => {
    const context = getAudioContext();
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sawtooth';
    const rising = direction === 'ltr';
    oscillator.frequency.setValueAtTime(rising ? 110 : 720, now);
    oscillator.frequency.exponentialRampToValueAtTime(rising ? 720 : 110, now + .56);
    gain.gain.setValueAtTime(.001, now);
    gain.gain.exponentialRampToValueAtTime(.055, now + .08);
    gain.gain.exponentialRampToValueAtTime(.001, now + .56);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + .58);
  };

  const overlay = document.createElement('div');
  overlay.id = 'communityEasterEgg';
  overlay.className = 'community-easter-egg';
  overlay.innerHTML = `
    <div class="community-easter-confetti" aria-hidden="true"></div>
    <div class="community-easter-names" aria-live="polite">
      <div class="community-easter-name first-name">Sivesh Krishan Thota</div>
      <div class="community-easter-name aka-line">aka</div>
      <div class="community-easter-name goose-handle">notsosillygoose</div>
      <div class="community-easter-name aka-line">aka</div>
      <div class="community-easter-name final-handle">PotterNotFound404</div>
    </div>
    <div class="community-easter-goose" aria-hidden="true">🪿</div>
  `;
  document.body.appendChild(overlay);

  const confetti = overlay.querySelector('.community-easter-confetti');
  for(let index = 0; index < 52; index++){
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 28}vw`);
    piece.style.animationDelay = `${Math.random() * .9}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confetti.appendChild(piece);
  }

  let closeTimer;
  const open = () => {
    clearTimeout(closeTimer);
    playLaunchSound();
    overlay.classList.remove('active');
    overlay.querySelectorAll('.community-easter-name').forEach(name => {
      name.classList.remove('visible', 'wiping', 'wiped', 'wipe-right');
      name.style.clipPath = '';
    });
    overlay.querySelector('.community-easter-goose')?.classList.remove('sweep', 'sweep-ltr', 'sweep-rtl', 'start-rtl');
    overlay.querySelectorAll('.community-easter-confetti i').forEach(piece => { piece.style.animation = 'none'; });
    void overlay.offsetWidth;
    overlay.querySelectorAll('.community-easter-confetti i').forEach((piece, index) => {
      piece.style.animation = `easterConfetti 2.8s linear forwards ${index % 9 * 0.1}s`;
    });
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const nameRevealInterval = 550;
    const goose = overlay.querySelector('.community-easter-goose');
    const names = [...overlay.querySelectorAll('.community-easter-name')];
    overlay.querySelectorAll('.community-easter-name').forEach((name, index) => {
      setTimeout(() => name.classList.add('visible'), 180 + (index * nameRevealInterval));
    });
    setTimeout(playCheer, 180 + (names.length * nameRevealInterval) + 120);
    const sweepDuration = 560;
    const wipeDuration = 240;
    const wipeLine = (name, direction) => {
      name.classList.add('wiping');
      name.style.clipPath = 'inset(0 0 0 0)';
      const startedAt = performance.now();
      const step = now => {
        const progress = Math.min(1, (now - startedAt) / wipeDuration);
        const covered = `${progress * 100}%`;
        name.style.clipPath = direction === 'ltr'
          ? `inset(0 0 0 ${covered})`
          : `inset(0 ${covered} 0 0)`;
        if(progress < 1) requestAnimationFrame(step);
        else name.classList.add('wiped');
      };
      requestAnimationFrame(step);
    };
    const finalNameDelay = 180 + ((names.length - 1) * nameRevealInterval);
    const firstSweepStart = finalNameDelay + 1000;
    names.forEach((name, index) => {
      const sweepStart = firstSweepStart + (index * sweepDuration);
      const wipeDelay = sweepStart + 385;
      setTimeout(() => {
        playWhoosh(index % 2 === 0 ? 'ltr' : 'rtl');
        const lineRect = name.getBoundingClientRect();
        goose.style.top = `${lineRect.top + (lineRect.height / 2)}px`;
        goose.classList.add('reset');
        goose.classList.remove('sweep', 'sweep-ltr', 'sweep-rtl', 'start-rtl');
        if(index % 2 !== 0) goose.classList.add('start-rtl');
        void goose.offsetWidth;
        goose.classList.remove('reset');
        goose.classList.add('sweep', index % 2 === 0 ? 'sweep-ltr' : 'sweep-rtl');
      }, sweepStart);
      setTimeout(() => {
        wipeLine(name, index % 2 === 0 ? 'ltr' : 'rtl');
      }, wipeDelay);
    });
    closeTimer = setTimeout(() => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }, 9000);
  };
  avatar.addEventListener('click', open);
}

function buildCommunityCard(project, typeLabel){
  const card = document.createElement('article');
  card.className = 'community-card';
  card.innerHTML = `
    <div class="community-card-media">
      <img src="${project.image}" alt="${project.title}">
      <span class="community-chip">${typeLabel}</span>
      <button class="community-fs" type="button">⤢</button>
    </div>
    <div class="community-card-body">
      <div class="community-meta">${project.creator} • ${project.vibe}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="community-stats">${project.stats.views} views • ${project.stats.loves} loves • ${project.stats.favorites} favs</div>
      <div class="community-actions">
        <button class="btn btn-primary" type="button">${getTranslation('playProject')}</button>
        <a class="btn btn-secondary" href="${project.url}" target="_blank" rel="noreferrer">${getTranslation('openScratchShort')}</a>
      </div>
    </div>
  `;
  const open = () => openCommunityModal(project);
  card.querySelector('.community-fs')?.addEventListener('click', open);
  card.querySelector('.btn-primary')?.addEventListener('click', open);
  card.querySelector('.community-card-media')?.addEventListener('click', open);
  card.querySelector('.btn-secondary')?.addEventListener('click', event => event.stopPropagation());
  return card;
}

function buildCommunityAlbumCard(project, index){
  const card = document.createElement('article');
  card.className = 'community-album-card';
  card.innerHTML = `
    <div class="album-rank">${index}</div>
    <img src="${project.image}" alt="${project.title}">
    <div class="album-copy">
      <h4>${project.title}</h4>
      <p>${project.description}</p>
    </div>
  `;
  card.addEventListener('click', () => openCommunityModal(project));
  return card;
}

function wireCommunityModal(){
  const modal = document.getElementById('communityModal');
  if(!modal || modal.dataset.wired === '1') return;
  modal.dataset.wired = '1';
  const closeBtn = document.getElementById('communityModalClose');
  closeBtn?.addEventListener('click', closeCommunityModal);
  modal.addEventListener('click', e => {
    if(e.target === modal) closeCommunityModal();
  });
}

function openCommunityModal(project){
  const modal = document.getElementById('communityModal');
  const frame = document.getElementById('communityModalFrame');
  const title = document.getElementById('communityModalTitle');
  const desc = document.getElementById('communityModalDesc');
  const link = document.getElementById('communityModalLink');
  if(!modal || !frame || !title || !desc || !link) return;
  modal.classList.add('open', 'show');
  frame.src = project.fullscreenUrl.endsWith('/') ? project.fullscreenUrl : `${project.fullscreenUrl}/`;
  frame.setAttribute('allow', 'autoplay; fullscreen; clipboard-write; gamepad');
  title.textContent = project.title;
  desc.textContent = `${project.creator} • ${project.vibe} • ${project.description}`;
  link.href = project.url;
  document.body.style.overflow = 'hidden';
}

function closeCommunityModal(){
  const modal = document.getElementById('communityModal');
  const frame = document.getElementById('communityModalFrame');
  if(!modal || !frame) return;
  modal.classList.remove('open', 'show');
  frame.src = 'about:blank';
  document.body.style.overflow = '';
}

function renderSection(container, games){
  const list = games || ALL_GAMES;
  if(typeof container === 'string') container = document.getElementById(container);
  if(!container) return;
  renderPaginatedGrid(container, list, 36);
}

function initSearch(){
  const query = getQueryParam('q').trim();
  const category = getQueryParam('category');
  const title = document.getElementById('searchTitle');
  const subtitle = document.getElementById('searchSubtitle');
  const grid = document.getElementById('searchGrid');

  const scoreGame = (game, q, cat) => {
    if(!q && !cat) return 10;
    let score = 0;
    const name = game.name.toLowerCase();
    const qq = q.toLowerCase();
    const wantsUnder20 = qq.includes('under20') || qq.includes('under $20') || qq.includes('under 20') || qq.includes('$20');
    if(wantsUnder20 && (game.price || game.basePrice || 0) <= 20) score += 220;
    if(wantsUnder20 && (game.price || game.basePrice || 0) > 20) score -= 120;
    if(cat && game.category === cat) score += 50;
    if(qq && name === qq) score += 200;
    if(qq && name.startsWith(qq)) score += 150;
    if(qq && name.includes(qq)) score += 100;
    if(qq){
      const toks = qq.split(/\s+/).filter(Boolean);
      toks.forEach(t => {
        if(game.tags && game.tags.some(tag => tag.toLowerCase().includes(t))) score += 60;
        if(game.category.toLowerCase().includes(t)) score += 20;
      });
    }
    if(game.dealType && qq && game.dealType.toLowerCase().includes(qq)) score += 30;
    score += Math.round(parseFloat(game.rating || 4) * 2);
    return score;
  };

  const filtered = ALL_GAMES.filter(g => {
    const qq = (query || '').toLowerCase();
    const wantsUnder20 = qq.includes('under20') || qq.includes('under $20') || qq.includes('under 20') || qq.includes('$20');
    return !wantsUnder20 || (g.price || g.basePrice || 0) <= 20;
  });
  const scored = filtered.map(g => ({g, s: scoreGame(g, query || '', category || '')})).filter(x => x.s > 0).sort((a,b) => b.s - a.s).map(x => x.g);
  title.textContent = query ? `${getTranslation('searchResultsFor')} "${query}"` : getTranslation('searchAll');
  subtitle.textContent = category ? `${getTranslation('searchCategory')} ${localizeCategory(category)}` : getTranslation('readyToShopSub');

  if(scored.length === 0){
    // find related games by token match in name or tags
    const tokens = (query || '').toLowerCase().split(/\s+/).filter(Boolean);
    const related = ALL_GAMES.filter(g => tokens.some(t => g.name.toLowerCase().includes(t) || (g.tags && g.tags.some(tag => tag.toLowerCase().includes(t))))).slice(0,8);
    grid.innerHTML = `<p style="color:var(--text-dim)">${getTranslation('noResults')}</p>`;
    if(related.length > 0){
      const heading = document.createElement('div');
      heading.className = 'section-head';
      heading.innerHTML = `<h3 style="margin:12px 0 8px;">${getTranslation('relatedGames')}</h3>`;
      grid.parentNode.insertBefore(heading, grid);
      renderPaginatedGrid(grid, related, 24);
    }
  } else {
    renderPaginatedGrid(grid, scored, 36);
  }
}

function initDetail(){
  const detailId = parseInt(getQueryParam('id'), 10);
  const game = ALL_GAMES.find(item => item.id === detailId);
  const container = document.getElementById('detailContainer');
  if(!container){ return; }
  if(!game){
    container.innerHTML = `<section class="section"><div class="section-head"><h2>${getTranslation('gameNotFound')}</h2><a href="index.html">${getTranslation('returnHome')}</a></div><p style="color:var(--text-dim); margin-top:14px;">${getTranslation('gameNotFoundMessage')}</p></section>`;
    return;
  }

  const locTitle = localizeGameTitle(game.name);
  const locCat = localizeCategory(game.category);
  const locDesc = localizeGameDescription(game.name, game.category);

  const uniqueEditions = Array.from(new Set(game.editions));
  const localizeEdition = (edition) => {
    const lower = edition.toLowerCase();
    if(lower === 'standard edition') return getTranslation('standardEdition');
    if(lower.includes('edition')) return edition.replace(/edition/i, getTranslation('editionText'));
    return edition;
  };
  const editionsHtml = uniqueEditions.map((edition, index) => `<option value="${edition}" ${index===0? 'selected':''}>${localizeEdition(edition)}</option>`).join('');
  container.innerHTML = `
    <section class="section game-detail">
      <div class="detail-hero">
        <div class="detail-media">
          <div class="detail-image">
            <img alt="${locTitle} cover">
          </div>
        </div>
        <div class="detail-summary">
          <div class="detail-badge ${game.dealType ? 'deal' : ''}">${game.dealType || getTranslation('newRelease')}</div>
          <h1>${locTitle}</h1>
          <div class="game-detail-meta">${locCat} • ${game.platforms.join(' / ')}</div>
          <div class="detail-rating">${'★'.repeat(Math.round(game.rating/1.2))}${'☆'.repeat(5-Math.round(game.rating/1.2))} <span>${game.rating} ${getTranslation('reviewScore')}</span> • ${game.reviewCount} ${getTranslation('reviewsCount')}</div>
          <p class="detail-splash">${game.summary}</p>
          <div class="detail-actions">
            <button class="btn btn-primary" id="detailAddBtn" type="button">${getTranslation('addToCart')}</button>
            <button class="btn btn-secondary btn-buy" id="detailBuyBtn" type="button">${getTranslation('buyNow')}</button>
          </div>
          <div class="edition-options"><label for="editionSelect">${getTranslation('chooseEdition')}</label><select id="editionSelect">${editionsHtml}</select></div>
          <div class="detail-price-box">
            <div class="price-row">
              <div class="price large" id="detailPrice">${formatPrice(game.price)}</div>
              ${game.oldPrice ? `<div class="price-old" id="detailOldPrice">${formatPrice(game.oldPrice)}</div>` : ''}
            </div>
            ${game.endsAt ? `<div class="timer" data-ends="${game.endsAt}">${timeLeftStr(game.endsAt - Date.now())}</div>` : ''}
          </div>
          <p class="detail-description">${locDesc}</p>
        </div>
      </div>
      <div class="game-main">
        <div>
          <div class="review-summary">
            <div class="summary-block"><strong>${game.rating} / 5</strong><p>${getTranslation('reviewSummary')} ${game.reviewCount} ${getTranslation('reviewsCount')}.</p></div>
            <div class="summary-block"><strong>${uniqueEditions.length}</strong><p>${getTranslation('editionOptions')}</p></div>
          </div>
          <section class="review-composer" aria-labelledby="reviewComposerTitle">
            <h3 id="reviewComposerTitle">Write a review</h3>
            <form id="reviewForm">
              <div class="review-form-grid">
                <label>Name<input id="reviewAuthor" name="author" maxlength="40" required></label>
                <label>Rating<select id="reviewRating" name="rating"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label>
              </div>
              <label>Headline<input id="reviewHeadline" name="headline" maxlength="80" required></label>
              <label>Your review<textarea id="reviewBody" name="body" maxlength="600" rows="4" required></textarea></label>
              <div class="review-form-actions"><button class="btn btn-primary" id="reviewSubmit" type="submit">Publish review</button><button class="btn btn-secondary" id="reviewCancel" type="button" hidden>Cancel</button></div>
            </form>
          </section>
          <div class="review-list" id="detailReviewList"></div>
        </div>
        <aside class="detail-sidebar">
          <div class="buy-panel">
            <div class="price-row">
              <div class="price large">${formatPrice(game.price)}</div>
              ${game.oldPrice ? `<div class="price-old">${formatPrice(game.oldPrice)}</div>` : ''}
            </div>
            <div class="detail-buy-actions">
              <button class="btn btn-primary" id="detailAddBtnSide" type="button">${getTranslation('addToCart')}</button>
              <button class="btn btn-secondary btn-buy" id="detailBuyBtnSide" type="button">${getTranslation('buyNow')}</button>
            </div>
            <div class="detail-note">${getTranslation('securePurchase')}</div>
          </div>
        </aside>
      </div>
    </section>
  `;

  const coverImage = container.querySelector('.detail-image img');
  attachCover(coverImage, game.name, game.emoji);

  // Render stable seeded reviews together with this browser's saved review.
  const reviewList = container.querySelector('#detailReviewList');
  const reviewForm = container.querySelector('#reviewForm');
  if(reviewList && reviewForm){
    const readUserReviews = () => {
      try { return JSON.parse(localStorage.getItem(USER_REVIEWS_KEY) || '{}'); } catch(_) { return {}; }
    };
    const writeUserReviews = reviews => localStorage.setItem(USER_REVIEWS_KEY, JSON.stringify(reviews));
    const escapeReview = value => String(value).replace(/[&<>"']/g, match => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[match]));
    const userReviews = readUserReviews();
    let editingId = null;

    const renderReviews = () => {
    reviewList.innerHTML = '';
      const saved = userReviews[game.id] || [];
      [...saved, ...game.reviews].slice(0, 8).forEach(r => {
      const ratingStars = '★'.repeat(Math.round(r.rating)) + '☆'.repeat(5 - Math.round(r.rating));
      const rc = document.createElement('article');
      rc.className = 'review-card';
      rc.innerHTML = `
        <div class="review-header">
          <div class="review-rating">${ratingStars}</div>
          <div class="review-score">${r.rating.toFixed(1)}</div>
        </div>
        <div class="review-meta">${getTranslation('reviewBy')} ${escapeReview(r.author)} • ${escapeReview(r.date)}${r.userReview ? ' • Your review' : ''}</div>
        <h3>${escapeReview(r.headline)}</h3>
        <p>${escapeReview(r.body)}</p>
        ${r.userReview ? `<div class="review-actions"><button type="button" class="review-edit" data-review-id="${r.id}">Edit</button><button type="button" class="review-delete" data-review-id="${r.id}">Delete</button></div>` : ''}
      `;
      reviewList.appendChild(rc);
      });
      reviewList.querySelectorAll('.review-edit').forEach(button => button.addEventListener('click', () => {
        const review = (userReviews[game.id] || []).find(item => item.id === button.dataset.reviewId);
        if(!review) return;
        editingId = review.id;
        reviewForm.author.value = review.author;
        reviewForm.rating.value = review.rating;
        reviewForm.headline.value = review.headline;
        reviewForm.body.value = review.body;
        reviewForm.querySelector('#reviewSubmit').textContent = 'Save changes';
        reviewForm.querySelector('#reviewCancel').hidden = false;
        reviewForm.scrollIntoView({behavior:'smooth', block:'center'});
      }));
      reviewList.querySelectorAll('.review-delete').forEach(button => button.addEventListener('click', () => {
        if(!window.confirm('Delete your review?')) return;
        userReviews[game.id] = (userReviews[game.id] || []).filter(item => item.id !== button.dataset.reviewId);
        writeUserReviews(userReviews);
        renderReviews();
      }));
    };
    renderReviews();

    const resetReviewForm = () => {
      editingId = null;
      reviewForm.reset();
      reviewForm.querySelector('#reviewSubmit').textContent = 'Publish review';
      reviewForm.querySelector('#reviewCancel').hidden = true;
    };
    reviewForm.querySelector('#reviewCancel').addEventListener('click', resetReviewForm);
    reviewForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(reviewForm);
      const saved = userReviews[game.id] || [];
      const review = {
        id: editingId || `user-${Date.now()}`,
        userReview: true,
        author: formData.get('author').trim(),
        rating: Number(formData.get('rating')),
        headline: formData.get('headline').trim(),
        body: formData.get('body').trim(),
        date: new Date().toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})
      };
      userReviews[game.id] = editingId ? saved.map(item => item.id === editingId ? {...item, ...review} : item) : [review, ...saved];
      writeUserReviews(userReviews);
      resetReviewForm();
      renderReviews();
    });
  }

  // edition buttons replaced by a select dropdown above
  // edition select handling
  const editionSelect = container.querySelector('#editionSelect');
  function editionModifier(ed){
    if(!ed) return 0;
    if(ed.toLowerCase().includes('collector')) return 25;
    if(ed.toLowerCase().includes('deluxe')) return 10;
    if(ed.toLowerCase().includes('ultimate')) return 15;
    if(ed.toLowerCase().includes('complete')) return 12;
    if(ed.toLowerCase().includes('anniversary')) return 8;
    if(ed.toLowerCase().includes('remaster')) return 5;
    return 0;
  }
  const detailPriceEl = container.querySelector('#detailPrice');
  const detailOldEl = container.querySelector('#detailOldPrice');
  function refreshEditionPrice(){
    const ed = editionSelect?.value || '';
    const mod = editionModifier(ed);
    const base = game.basePrice || game.price || 0;
    const newPrice = parseFloat((base + mod).toFixed(2));
    if(detailPriceEl) detailPriceEl.textContent = formatPrice(newPrice);
    if(detailOldEl && game.oldPrice) detailOldEl.textContent = formatPrice(game.oldPrice + mod);
  }
  editionSelect?.addEventListener('change', refreshEditionPrice);
  refreshEditionPrice();

  const addBtn = document.getElementById('detailAddBtn');
  const buyBtn = document.getElementById('detailBuyBtn');
  addBtn?.addEventListener('click', () => {
    const selected = editionSelect?.value || '';
    const base = game.basePrice || game.price || 0;
    const price = parseFloat((base + editionModifier(selected)).toFixed(2));
    addToCart(game, 1, selected, price);
    addBtn.textContent = getTranslation('added');
    addBtn.classList.add('added');
    setTimeout(()=>{
      addBtn.textContent = getTranslation('addToCart');
      addBtn.classList.remove('added');
    }, 1200);
  });
  buyBtn?.addEventListener('click', () => {
    const selected = editionSelect?.value || '';
    const base = game.basePrice || game.price || 0;
    const price = parseFloat((base + editionModifier(selected)).toFixed(2));
    addToCart(game, 1, selected, price);
    window.location.href = 'checkout.html';
  });

  const addBtnSide = document.getElementById('detailAddBtnSide');
  const buyBtnSide = document.getElementById('detailBuyBtnSide');
  addBtnSide?.addEventListener('click', () => {
    const selected = editionSelect?.value || '';
    const base = game.basePrice || game.price || 0;
    const price = parseFloat((base + editionModifier(selected)).toFixed(2));
    addToCart(game, 1, selected, price);
    addBtnSide.textContent = getTranslation('added');
    addBtnSide.classList.add('added');
    setTimeout(()=>{
      addBtnSide.textContent = getTranslation('addToCart');
      addBtnSide.classList.remove('added');
    }, 1200);
  });
  buyBtnSide?.addEventListener('click', () => {
    const selected = editionSelect?.value || '';
    const base = game.basePrice || game.price || 0;
    const price = parseFloat((base + editionModifier(selected)).toFixed(2));
    addToCart(game, 1, selected, price);
    window.location.href = 'checkout.html';
  });
}

function initDeals(){
  const grid = document.getElementById('dealsGrid');
  if(!grid) return;
  renderSection(grid, ALL_GAMES.filter(g=>g.dealType));
}

function initAccount(){
  const loginSubmit = document.getElementById('loginSubmit');
  const loginError = document.getElementById('loginError');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  loginSubmit?.addEventListener('click', ()=>{
    if(!loginEmail.value.trim() || !loginPassword.value.trim()){
      loginError.style.display='block';
      return;
    }
    loginError.style.display='none';
    window.location.href = 'index.html';
  });
}

function initCheckout(){
  if(document.title !== getTranslation('checkoutTitle')) {
    document.title = getTranslation('checkoutTitle');
  }
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutEmpty = document.getElementById('checkoutEmpty');
  const checkoutSuccess = document.getElementById('checkoutSuccess');
  const total = document.getElementById('checkoutTotal');
  const payBtn = document.getElementById('payBtn');
  const checkoutError = document.getElementById('checkoutError');
  const checkoutPanel = document.querySelector('.checkout-panel');
  const promoCode = document.getElementById('promoCode');
  const promoMessage = document.getElementById('promoMessage');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  let appliedPromo = localStorage.getItem('goosegames_applied_promo_v1') || '';
  const promoValues = { HONK5: .05, HONK10: .10, HONK15: .15, FREEGOOSE: .10, MYSTERY20: .20 };

  const refreshTotal = () => {
    const discount = promoValues[appliedPromo] || 0;
    const discounted = cartSubtotal() * (1 - discount);
    if(total) total.textContent = formatPrice(discounted);
    if(promoCode) promoCode.value = appliedPromo;
  };
  refreshTotal();
  applyPromoBtn?.addEventListener('click', () => {
    const value = promoCode?.value.trim().toUpperCase() || '';
    if(!promoValues[value]){
      if(promoMessage) { promoMessage.textContent = 'That code is not valid yet.'; promoMessage.className = 'promo-invalid'; }
      return;
    }
    const wonCodes = JSON.parse(localStorage.getItem('goosegames_won_codes_v1') || '[]');
    if(!wonCodes.includes(value)){
      if(promoMessage) { promoMessage.textContent = 'Spin the wheel to win this code first.'; promoMessage.className = 'promo-invalid'; }
      return;
    }
    appliedPromo = value;
    localStorage.setItem('goosegames_applied_promo_v1', value);
    if(promoMessage) { promoMessage.textContent = `${value} applied.`; promoMessage.className = 'promo-valid'; }
    refreshTotal();
  });
  if(cartSubtotal() === 0){
    checkoutEmpty.style.display = 'block';
    checkoutForm.style.display = 'none';
  } else {
    checkoutEmpty.style.display = 'none';
    checkoutForm.style.display = 'block';
  }
  payBtn?.addEventListener('click', ()=>{
    const fields = ['ccName','ccNumber','ccExpiry','ccCvv','ccAddress'];
    const allFilled = fields.every(id => document.getElementById(id)?.value.trim().length > 0);
    if(!allFilled){
      if(checkoutError) checkoutError.style.display='block';
      return;
    }
    checkoutError.style.display='none';
    runCheckoutCinematic(checkoutPanel, checkoutForm, checkoutSuccess, payBtn);
  });
}

function runCheckoutCinematic(panel, form, success, button){
  if(!panel || !form || !success) return;

  if(button){
    button.disabled = true;
    button.textContent = '...';
  }

  panel.classList.remove('checkout-cinematic-out');
  panel.classList.add('checkout-cinematic-in');

  const confettiHost = document.createElement('div');
  confettiHost.className = 'checkout-confetti';
  const colors = ['#FFC93C', '#FF6B35', '#4DA8DA', '#FFFFFF', '#3CB371'];
  const pieces = 42;
  for(let i = 0; i < pieces; i++){
    const piece = document.createElement('span');
    const left = Math.random() * 100;
    const delay = Math.random() * 180;
    const duration = 1100 + Math.random() * 900;
    const size = 8 + Math.random() * 10;
    const drift = (Math.random() - 0.5) * 260;
    const rotate = (Math.random() - 0.5) * 720;
    piece.style.left = `${left}%`;
    piece.style.setProperty('--delay', `${delay}ms`);
    piece.style.setProperty('--duration', `${duration}ms`);
    piece.style.setProperty('--drift', `${drift}px`);
    piece.style.setProperty('--rotate', `${rotate}deg`);
    piece.style.setProperty('--size', `${size}px`);
    piece.style.background = colors[i % colors.length];
    confettiHost.appendChild(piece);
  }
  panel.appendChild(confettiHost);

  const flash = document.createElement('div');
  flash.className = 'checkout-flash';
  panel.appendChild(flash);

  form.classList.add('checkout-form-out');
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
    success.classList.add('checkout-success-show');
  }, 650);

  setTimeout(() => {
    panel.classList.add('checkout-complete');
  }, 900);

  setTimeout(() => {
    confettiHost.remove();
    flash.remove();
    if(button){
      button.disabled = false;
      button.textContent = getTranslation('payNow');
    }
  }, 2400);
}

init();
