// GooseGames Settings & Accessibility Manager
import { getTranslation, getLanguage, setLanguage } from './i18n.js';
import { setMagneticEnabled, setCursorTrailEnabled } from './effects.js';

const STORAGE_CONTRAST = 'goosegames_contrast_v1';
const STORAGE_MAGNETIC = 'goosegames_magnetic_v1';
const STORAGE_TRAIL = 'goosegames_trail_v1';

export function initSettingsSystem() {
  applyContrastMode();
  if (document.getElementById('settingsModal')) return;

  const modal = document.createElement('div');
  modal.id = 'settingsModal';
  modal.className = 'goose-modal-overlay';
  modal.innerHTML = `
    <div class="goose-modal-content settings-modal-content">
      <button class="modal-close-btn" id="closeSettingsBtn" type="button">&times;</button>
      <h2 data-i18n="settingsTitle">${getTranslation('settingsTitle')}</h2>

      <div class="settings-group">
        <label for="settingsLangSelect" data-i18n="langSelect">${getTranslation('langSelect')}</label>
        <select id="settingsLangSelect" class="settings-control">
          <option value="en">English (EN)</option>
          <option value="fr">Français (FR)</option>
          <option value="es">Español (ES)</option>
          <option value="de">Deutsch (DE)</option>
        </select>
      </div>

      <div class="settings-group toggle-group">
        <div>
          <strong data-i18n="highContrast">${getTranslation('highContrast')}</strong>
          <p class="sub">Increases text readability and element borders</p>
        </div>
        <label class="switch">
          <input type="checkbox" id="contrastToggleSwitch">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="settings-group toggle-group">
        <div>
          <strong data-i18n="magneticCursor">${getTranslation('magneticCursor')}</strong>
          <p class="sub">Subtly pulls cursor toward interactive buttons</p>
        </div>
        <label class="switch">
          <input type="checkbox" id="magneticToggleSwitch">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="settings-group toggle-group">
        <div>
          <strong data-i18n="cursorTrail">${getTranslation('cursorTrail')}</strong>
          <p class="sub">Golden particle trail following mouse movement</p>
        </div>
        <label class="switch">
          <input type="checkbox" id="trailToggleSwitch">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="settings-actions">
        <button id="closeSettingsModalBtn" class="btn btn-primary" type="button" data-i18n="close">${getTranslation('close')}</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('closeSettingsBtn').addEventListener('click', closeSettings);
  document.getElementById('closeSettingsModalBtn').addEventListener('click', closeSettings);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSettings();
  });

  bindSettingsControls();
}

function bindSettingsControls() {
  const langSelect = document.getElementById('settingsLangSelect');
  const contrastSwitch = document.getElementById('contrastToggleSwitch');
  const magneticSwitch = document.getElementById('magneticToggleSwitch');
  const trailSwitch = document.getElementById('trailToggleSwitch');

  if (langSelect) {
    langSelect.value = getLanguage();
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  if (contrastSwitch) {
    contrastSwitch.checked = localStorage.getItem(STORAGE_CONTRAST) === '1';
    contrastSwitch.addEventListener('change', (e) => {
      toggleContrastMode(e.target.checked);
    });
  }

  if (magneticSwitch) {
    magneticSwitch.checked = localStorage.getItem(STORAGE_MAGNETIC) !== '0';
    magneticSwitch.addEventListener('change', (e) => {
      setMagneticEnabled(e.target.checked);
    });
  }

  if (trailSwitch) {
    trailSwitch.checked = localStorage.getItem(STORAGE_TRAIL) === '1';
    trailSwitch.addEventListener('change', (e) => {
      setCursorTrailEnabled(e.target.checked);
    });
  }
}

export function openSettings() {
  initSettingsSystem();
  const modal = document.getElementById('settingsModal');
  if (modal) {
    bindSettingsControls();
    modal.classList.add('open');
  }
}

export function closeSettings() {
  const modal = document.getElementById('settingsModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

export function applyContrastMode() {
  const enabled = localStorage.getItem(STORAGE_CONTRAST) === '1';
  document.documentElement.classList.toggle('contrast-mode', enabled);
  document.body.classList.toggle('contrast-mode', enabled);
}

export function toggleContrastMode(enabled) {
  localStorage.setItem(STORAGE_CONTRAST, enabled ? '1' : '0');
  applyContrastMode();
}
