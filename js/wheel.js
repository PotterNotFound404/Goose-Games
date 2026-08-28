// GooseGames Spin the Wheel Feature
import { getTranslation } from './i18n.js';

let isSpinning = false;
let currentRotation = 0;

const SECTORS = [
  { labelKey: 'reward5Off', code: 'HONK5', color: '#fec810', text: '#111827' },
  { labelKey: 'reward10Off', code: 'HONK10', color: '#10b981', text: '#ffffff' },
  { labelKey: 'reward15Off', code: 'HONK15', color: '#3b82f6', text: '#ffffff' },
  { labelKey: 'rewardFreeShip', code: 'FREEGOOSE', color: '#8b5cf6', text: '#ffffff' },
  { labelKey: 'rewardMystery', code: 'MYSTERY20', color: '#ec4899', text: '#ffffff' },
  { labelKey: 'rewardNoWin', code: null, color: '#4b5563', text: '#ffffff' }
];
const WON_CODES_KEY = 'goosegames_won_codes_v1';
const LAST_SPIN_KEY = 'goosegames_last_spin_v1';

function hasSpunToday(){
  return localStorage.getItem(LAST_SPIN_KEY) === new Date().toISOString().slice(0, 10);
}

export function initSpinWheel() {
  if (document.getElementById('wheelModal')) return;

  const modal = document.createElement('div');
  modal.id = 'wheelModal';
  modal.className = 'goose-modal-overlay';
  modal.innerHTML = `
    <div class="goose-modal-content wheel-modal-content">
      <button class="modal-close-btn" id="closeWheelBtn" type="button">&times;</button>
      <h2 data-i18n="wheelTitle">${getTranslation('wheelTitle')}</h2>
      <p class="modal-sub" data-i18n="wheelSub">${getTranslation('wheelSub')}</p>
      
      <div class="wheel-container">
        <div class="wheel-pointer">▼</div>
        <canvas id="wheelCanvas" width="340" height="340"></canvas>
      </div>
      <div class="wheel-legend">${SECTORS.map(sector => `<span><i style="background:${sector.color}"></i>${getTranslation(sector.labelKey)}</span>`).join('')}</div>

      <div class="wheel-actions">
        <button id="spinWheelBtn" class="btn btn-primary btn-large" type="button" data-i18n="spinButton">${getTranslation('spinButton')}</button>
      </div>

      <div id="wheelResult" class="wheel-result" style="display:none;"></div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('closeWheelBtn').addEventListener('click', closeWheel);
  document.getElementById('spinWheelBtn').addEventListener('click', spinWheel);
  if(hasSpunToday()) {
    const spinButton = document.getElementById('spinWheelBtn');
    spinButton.disabled = true;
    spinButton.textContent = getTranslation('spinAgainTomorrow');
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeWheel();
  });

  drawWheel();
}

export function openWheel() {
  initSpinWheel();
  const modal = document.getElementById('wheelModal');
  if (modal) {
    modal.classList.add('open');
    drawWheel();
  }
}

export function closeWheel() {
  const modal = document.getElementById('wheelModal');
  if (modal && !isSpinning) {
    modal.classList.remove('open');
  }
}

function drawWheel(rotationAngle = 0) {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const numSectors = SECTORS.length;
  const arc = (2 * Math.PI) / numSectors;
  const radius = canvas.width / 2 - 10;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotationAngle);

  for (let i = 0; i < numSectors; i++) {
    const angle = i * arc;
    const sector = SECTORS[i];

    // Sector slice
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, angle, angle + arc);
    ctx.lineTo(0, 0);
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#1e2730';
    ctx.stroke();

    // Sector text
    ctx.save();
    ctx.fillStyle = sector.text;
    ctx.font = '800 11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.rotate(angle + arc / 2);
    const label = getTranslation(sector.labelKey);
    ctx.fillText(label, radius - 15, 5);
    ctx.restore();
  }

  // Draw central goose button cap
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, 2 * Math.PI);
  ctx.fillStyle = '#1e2730';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#fec810';
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '20px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🪿', 0, 2);

  ctx.restore();
}

function spinWheel() {
  if (isSpinning || hasSpunToday()) return;
  isSpinning = true;
  localStorage.setItem(LAST_SPIN_KEY, new Date().toISOString().slice(0, 10));

  const spinBtn = document.getElementById('spinWheelBtn');
  const resultEl = document.getElementById('wheelResult');
  spinBtn.disabled = true;
  spinBtn.textContent = getTranslation('spinning');
  resultEl.style.display = 'none';

  const numSectors = SECTORS.length;
  const selectedIndex = Math.floor(Math.random() * numSectors);

  // Calculate rotation target
  const sectorAngle = (2 * Math.PI) / numSectors;
  // Pointer is at top (-Math.PI / 2)
  const targetSectorCenter = selectedIndex * sectorAngle + sectorAngle / 2;
  const extraRounds = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;
  const finalAngle = extraRounds + (Math.PI * 3 / 2 - targetSectorCenter);

  const startAngle = currentRotation % (2 * Math.PI);
  const totalChange = finalAngle - startAngle;
  const duration = 4500; // 4.5s spin duration
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const easedProgress = easeOutCubic(progress);

    currentRotation = startAngle + totalChange * easedProgress;
    drawWheel(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      spinBtn.disabled = true;
      spinBtn.textContent = getTranslation('spinAgainTomorrow');
      showResult(SECTORS[selectedIndex]);
    }
  }

  requestAnimationFrame(animate);
}

function showResult(sector) {
  const resultEl = document.getElementById('wheelResult');
  if (!resultEl) return;

  const label = getTranslation(sector.labelKey);

  if (sector.code) {
    const wonCodes = JSON.parse(localStorage.getItem(WON_CODES_KEY) || '[]');
    if(!wonCodes.includes(sector.code)) wonCodes.push(sector.code);
    localStorage.setItem(WON_CODES_KEY, JSON.stringify(wonCodes));
    resultEl.innerHTML = `
      <div class="result-badge win">🎉 ${getTranslation('congrats')}</div>
      <h3>${getTranslation('wheelResult')} <span>${label}</span></h3>
      <p>${getTranslation('useDiscountCode')} Code: <strong class="code">${sector.code}</strong></p>
      <p class="wheel-code-note">Saved for checkout.</p>
    `;
  } else {
    resultEl.innerHTML = `
      <div class="result-badge no-win">🪿 Honk!</div>
      <h3>${label}</h3>
      <p>${getTranslation('spinAgainTomorrow')}</p>
    `;
  }

  resultEl.style.display = 'block';
}
