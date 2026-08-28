const GOOSE_JOKES = [
  "Why did the goose cross the road? To honk at the daily deals.",
  "What do you call a goose who loves RPGs? A role-playing waterfowl.",
  "Honk if you read terms and conditions. (Nobody honked.)",
  "Geese don't buy games — they migrate to better prices.",
  "I told my goose about Steam sales. It migrated to your cart.",
  "What's a goose's favourite genre? Fowl-play adventures.",
  "This loader is slower than a goose in a traffic jam.",
  "Breaking news: local goose rates this storefront 5 honks out of 5.",
  "Why don't geese pre-order? They prefer to wing it.",
  "A goose walks into a bar. The bartender says, 'Honk responsibly.'",
  "Goose tip: add to cart now, regret nothing later.",
  "If loading takes too long, blame the goose. Always blame the goose.",
  "What game do geese speedrun? Untitled Goose Game, obviously.",
  "Honk once for indie gems. Honk twice for AAA blockbusters.",
  "The flock is assembling your game library. Please stand by.",
];

let jokeTimer = null;
let jokeIndex = 0;
let overlayEl = null;

function ensureOverlay(){
  if(overlayEl) return overlayEl;
  overlayEl = document.createElement('div');
  overlayEl.id = 'pageLoader';
  overlayEl.className = 'loader-overlay';
  overlayEl.innerHTML = `
    <div class="loader-goose">🪿</div>
    <div class="loader-text" id="loaderJoke">${GOOSE_JOKES[0]}</div>
    <div class="loader-bar"><div class="loader-bar-fill" id="loaderBarFill"></div></div>
    <div class="loader-sub" id="loaderSub">Waddling through the catalogue…</div>
  `;
  document.body.prepend(overlayEl);
  return overlayEl;
}

function rotateJokes(){
  const jokeEl = document.getElementById('loaderJoke');
  if(!jokeEl) return;
  jokeIndex = (jokeIndex + 1) % GOOSE_JOKES.length;
  jokeEl.style.opacity = '0';
  setTimeout(() => {
    jokeEl.textContent = GOOSE_JOKES[jokeIndex];
    jokeEl.style.opacity = '1';
  }, 180);
}

export function showPageLoader(){
  ensureOverlay();
  overlayEl.classList.remove('hide');
  jokeIndex = 0;
  const jokeEl = document.getElementById('loaderJoke');
  if(jokeEl){
    jokeEl.textContent = GOOSE_JOKES[0];
    jokeEl.style.opacity = '1';
    jokeEl.style.transition = 'opacity .2s ease';
  }
  updateLoaderProgress(4);
  clearInterval(jokeTimer);
  jokeTimer = setInterval(rotateJokes, 2800);
}

export function updateLoaderProgress(pct){
  const fill = document.getElementById('loaderBarFill');
  if(fill){
    fill.style.animation = 'none';
    fill.style.width = `${Math.max(4, Math.min(100, pct))}%`;
    fill.style.transform = 'none';
  }
  const sub = document.getElementById('loaderSub');
  if(sub){
    if(pct >= 90) sub.textContent = 'Almost ready to honk…';
    else if(pct >= 55) sub.textContent = 'Fetching game covers…';
    else sub.textContent = 'Waddling through the catalogue…';
  }
}

export function hidePageLoader(){
  updateLoaderProgress(100);
  clearInterval(jokeTimer);
  jokeTimer = null;
  if(!overlayEl) return;
  overlayEl.classList.add('hide');
  setTimeout(() => overlayEl?.remove(), 520);
  overlayEl = null;
}
