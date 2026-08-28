// GooseGames Interactive Visual Effects System
// Features: Magnetic Cursor, Card & Button Glow Effects, Canvas Cursor Trail

const STORAGE_MAGNETIC = 'goosegames_magnetic_v1';
const STORAGE_TRAIL = 'goosegames_trail_v1';

let isTouchDevice = false;
let prefersReducedMotion = false;

function checkCapabilities() {
  isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ==========================================
// 1. MAGNETIC CURSOR EFFECT
// ==========================================
let magneticEnabled = true;
let magneticTarget = null;
let magneticFrame = null;

function resetMagneticTarget(target) {
  if (!target) return;
  target.style.transform = '';
  target.style.boxShadow = '';
  target.style.transition = 'transform 0.3s ease-out';
}

function updateMagneticTarget(target, clientX, clientY) {
  if (!target || !magneticEnabled) return;

  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const offsetX = clientX - centerX;
  const offsetY = clientY - centerY;
  const maxDistance = Math.max(rect.width, rect.height) * 0.55;
  const distance = Math.hypot(offsetX, offsetY);
  const influence = Math.max(0, 1 - (distance / maxDistance));

  const translateX = offsetX * 0.035 * influence;
  const translateY = offsetY * 0.035 * influence;
  const tiltX = Math.max(-7, Math.min(7, -(offsetY / Math.max(rect.height, 1)) * 10));
  const tiltY = Math.max(-9, Math.min(9, (offsetX / Math.max(rect.width, 1)) * 12));
  const shadowX = Math.max(-18, Math.min(18, offsetX * 0.08));
  const shadowY = Math.max(-22, Math.min(22, offsetY * 0.08));
  const blur = 18 + (influence * 18);
  const shadowAlpha = 0.12 + (influence * 0.2);

  target.style.transform = `perspective(900px) translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${1 + influence * 0.012}, ${1 + influence * 0.012}, 1)`;
  target.style.boxShadow = `${shadowX}px ${shadowY}px ${blur}px rgba(0, 0, 0, ${shadowAlpha})`;
  target.style.transition = 'transform 0.14s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.14s cubic-bezier(0.25, 1, 0.5, 1)';
  magneticTarget = target;
}

export function initMagneticCursor() {
  checkCapabilities();
  magneticEnabled = localStorage.getItem(STORAGE_MAGNETIC) !== '0';
  if (isTouchDevice || prefersReducedMotion) return;

  const selector = '.card, .marquee-card, .flock-card, .abundance-tile, .community-card, .community-album-card';

  document.addEventListener('pointermove', (e) => {
    if (!magneticEnabled) return;
    const nextTarget = e.target.closest ? e.target.closest(selector) : null;

    if (magneticFrame) cancelAnimationFrame(magneticFrame);
    magneticFrame = requestAnimationFrame(() => {
      magneticFrame = null;
      if (!nextTarget) {
        if (magneticTarget) {
          resetMagneticTarget(magneticTarget);
          magneticTarget = null;
        }
        return;
      }

      updateMagneticTarget(nextTarget, e.clientX, e.clientY);
    });
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    if (magneticTarget) {
      resetMagneticTarget(magneticTarget);
      magneticTarget = null;
    }
  }, { passive: true });
}

export function setMagneticEnabled(enabled) {
  magneticEnabled = !!enabled;
  localStorage.setItem(STORAGE_MAGNETIC, enabled ? '1' : '0');
  if (!enabled) {
    document.querySelectorAll('.card, .marquee-card, .flock-card, .abundance-tile, .community-card, .community-album-card').forEach(el => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  }
}

// ==========================================
// 2. INTERACTIVE GLOW EFFECTS
// ==========================================
let glowFrame = null;

export function initGlowEffects() {
  if (isTouchDevice || prefersReducedMotion) return;

  document.addEventListener('pointermove', (e) => {
    if (glowFrame) return;

    glowFrame = requestAnimationFrame(() => {
      glowFrame = null;
      const cards = document.querySelectorAll('.card, .hero-cta-card, .buy-panel, .abundance-tile, .review-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          card.classList.add('glow-active');
        } else {
          card.classList.remove('glow-active');
        }
      });
    });
  }, { passive: true });
}

// ==========================================
// 3. CURSOR TRAIL EFFECT (Canvas-based)
// ==========================================
let trailEnabled = false;
let canvas, ctx;
let particles = [];
let animFrameId = null;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 1.2;
    this.speedY = (Math.random() - 0.5) * 1.2 - 0.4;
    this.life = 1;
    this.decay = Math.random() * 0.03 + 0.02;
    this.color = Math.random() > 0.3 ? '#fec810' : '#ffffff';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw(context) {
    context.save();
    context.globalAlpha = Math.max(0, this.life);
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

function initCanvas() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.id = 'cursorTrailCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function renderTrail() {
  if (!ctx || !trailEnabled) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw(ctx);
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  if (trailEnabled && (particles.length > 0 || animFrameId)) {
    animFrameId = requestAnimationFrame(renderTrail);
  }
}

let lastSpawn = 0;
function onMouseMove(e) {
  if (!trailEnabled) return;
  const now = Date.now();
  if (now - lastSpawn > 25) { // throttled spawn for performance
    lastSpawn = now;
    particles.push(new Particle(e.clientX, e.clientY));
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(renderTrail);
    }
  }
}

export function initCursorTrail() {
  checkCapabilities();
  trailEnabled = localStorage.getItem(STORAGE_TRAIL) === '1' && !isTouchDevice && !prefersReducedMotion;
  if (trailEnabled) {
    initCanvas();
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }
}

export function setCursorTrailEnabled(enabled) {
  checkCapabilities();
  if (isTouchDevice || prefersReducedMotion) enabled = false;
  trailEnabled = !!enabled;
  localStorage.setItem(STORAGE_TRAIL, enabled ? '1' : '0');

  if (enabled) {
    initCanvas();
    if (canvas) canvas.style.display = 'block';
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  } else {
    if (canvas) canvas.style.display = 'none';
    window.removeEventListener('mousemove', onMouseMove);
    particles = [];
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }
}
