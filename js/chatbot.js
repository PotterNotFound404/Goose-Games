// GooseGames AI Chatbot Component
import { getTranslation, getLanguage } from './i18n.js';
import { buildGames } from './data.js';
import { getCover } from './covers.js';

let chatHistory = [];
let isOpen = false;

export function initChatbot() {
  if (document.getElementById('gooseChatWidget')) return;

  // Create floating widget container
  const widget = document.createElement('div');
  widget.id = 'gooseChatWidget';
  widget.className = 'goose-chat-widget';
  widget.innerHTML = `
    <div class="chat-intro" id="chatIntro" role="status">
      <button class="chat-intro-close" id="chatIntroClose" type="button" aria-label="Dismiss assistant introduction">&times;</button>
      <strong>Meet your GooseGames AI</strong>
      <span>Ask for a game pick, deal, or recommendation.</span>
    </div>
    <button id="chatToggleBtn" class="chat-toggle-btn" type="button" aria-label="Open GooseGames Assistant">
      <span class="chat-icon">🤖</span>
      <span class="chat-badge" id="chatBadge">AI</span>
    </button>
    <div id="chatPanel" class="chat-panel" aria-hidden="true">
      <div class="chat-header">
        <div class="chat-header-info">
          <span class="chat-avatar">🤖</span>
          <div>
            <div class="chat-title" data-i18n="chatHeaderTitle">${getTranslation('chatHeaderTitle')}</div>
            <div class="chat-sub" data-i18n="chatHeaderSub">${getTranslation('chatHeaderSub')}</div>
            <span class="chat-status-flair">24/7 AI Chatbot</span>
          </div>
        </div>
        <button id="chatCloseBtn" class="chat-close-btn" type="button" aria-label="Close Chat" data-i18n-title="close">&times;</button>
      </div>
      <div class="chat-body" id="chatBody">
        <div class="chat-message assistant">
          <div class="message-content" data-i18n="chatWelcome">${getTranslation('chatWelcome')}</div>
        </div>
      </div>
      <div class="chat-recommendations">
        <div class="chat-section-label">Try asking the assistant</div>
        <div class="chat-recommendation-list" id="chatRecommendations"></div>
      </div>
      <div class="chat-quick-prompts">
        <button class="quick-btn" type="button" data-prompt="deals" data-i18n="quickDeals">🔥 Today's Deals</button>
        <button class="quick-btn" type="button" data-prompt="rpg" data-i18n="quickRpg">🎮 Recommend RPG</button>
        <button class="quick-btn" type="button" data-prompt="joke" data-i18n="quickJoke">🪿 Goose Joke</button>
      </div>
      <form class="chat-footer" id="chatForm">
        <input type="text" id="chatInput" data-i18n-placeholder="chatPlaceholder" placeholder="${getTranslation('chatPlaceholder')}" autocomplete="off" required>
        <button type="submit" id="chatSubmit" data-i18n="chatSend">${getTranslation('chatSend')}</button>
      </form>
    </div>
  `;

  document.body.appendChild(widget);
  renderRecommendations(widget.querySelector('#chatRecommendations'));
  const chatIntro = widget.querySelector('#chatIntro');
  const dismissIntro = () => {
    chatIntro.classList.remove('visible');
    localStorage.setItem('goosegames_chat_intro_seen', '1');
  };
  if(localStorage.getItem('goosegames_chat_intro_seen') !== '1') setTimeout(() => chatIntro.classList.add('visible'), 700);
  widget.querySelector('#chatIntroClose').addEventListener('click', dismissIntro);

  const toggleBtn = document.getElementById('chatToggleBtn');
  const closeBtn = document.getElementById('chatCloseBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const quickBtns = widget.querySelectorAll('.quick-btn');

  toggleBtn.addEventListener('click', toggleChat);
  toggleBtn.addEventListener('click', dismissIntro);
  closeBtn.addEventListener('click', closeChat);

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    sendMessage(text);
    chatInput.value = '';
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt;
      if (prompt === 'deals') sendMessage("What are today's best game deals?");
      else if (prompt === 'rpg') sendMessage("Can you recommend a great RPG game?");
      else if (prompt === 'joke') sendMessage("Tell me a funny goose game joke!");
      else sendMessage(btn.textContent);
    });
  });

  // Re-localize dynamically on language change
  window.addEventListener('languageChanged', () => {
    const current = getLanguage();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = getTranslation(key, current);
      if (value) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = value;
        else el.innerHTML = value;
      }
    });
  });
}

function renderRecommendations(container) {
  if (!container) return;
  const seen = new Set();
  const games = buildGames().filter(game => {
    if (seen.has(game.name)) return false;
    seen.add(game.name);
    return true;
  }).slice(0, 3);

  games.forEach(game => {
    const button = document.createElement('button');
    button.className = 'chat-recommendation';
    button.type = 'button';
    button.innerHTML = `<span class="chat-recommendation-cover"><span>${game.emoji}</span><img alt=""></span><span class="chat-recommendation-name">${escapeHtml(game.name)}</span>`;
    button.addEventListener('click', () => sendMessage(`Tell me about ${game.name}`));
    const image = button.querySelector('img');
    getCover(game.name).then(url => {
      if (!url) return;
      image.src = url;
      image.addEventListener('load', () => image.classList.add('loaded'), { once: true });
    });
    container.appendChild(button);
  });
}

function toggleChat() {
  isOpen ? closeChat() : openChat();
}

function openChat() {
  isOpen = true;
  const panel = document.getElementById('chatPanel');
  if (panel) {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.getElementById('chatInput')?.focus();
  }
}

function closeChat() {
  isOpen = false;
  const panel = document.getElementById('chatPanel');
  if (panel) {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }
}

async function sendMessage(text) {
  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;

  // Append User message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'chat-message user';
  userMsgEl.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
  chatBody.appendChild(userMsgEl);

  chatHistory.push({ role: 'user', text });

  // Show thinking indicator
  const thinkingEl = document.createElement('div');
  thinkingEl.className = 'chat-message assistant thinking';
  thinkingEl.id = 'chatThinking';
  thinkingEl.innerHTML = `<div class="message-content"><span>🤖</span> <span class="dots"><i>.</i><i>.</i><i>.</i></span></div>`;
  chatBody.appendChild(thinkingEl);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        history: chatHistory.slice(-8), // Send recent history context
        lang: getLanguage()
      })
    });

    thinkingEl.remove();

    if (!response.ok) {
      throw new Error(`Server status ${response.status}`);
    }

    const data = await response.json();
    const replyText = shortenReply(cleanBotReply(data.reply || getLocalChatReply(text), text));

    // Append Assistant response
    const assistantMsgEl = document.createElement('div');
    assistantMsgEl.className = 'chat-message assistant';
    assistantMsgEl.innerHTML = `<div class="message-content">${formatMarkdownText(replyText)}</div>`;
    chatBody.appendChild(assistantMsgEl);
    assistantMsgEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    chatHistory.push({ role: 'model', text: replyText });

  } catch (err) {
    thinkingEl.remove();
    const errorMsgEl = document.createElement('div');
    errorMsgEl.className = 'chat-message assistant error';
    errorMsgEl.innerHTML = `<div class="message-content">${formatMarkdownText(getLocalChatReply(text))}</div>`;
    chatBody.appendChild(errorMsgEl);
    errorMsgEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}

function shortenReply(text) {
  const value = String(text || '').trim();
  if(value.length <= 420) return value;
  const clipped = value.slice(0, 420);
  const boundary = Math.max(clipped.lastIndexOf('. '), clipped.lastIndexOf('! '), clipped.lastIndexOf('? '));
  return `${clipped.slice(0, boundary > 180 ? boundary + 1 : 420).trim()}...`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[match]);
}

function formatMarkdownText(text) {
  let html = escapeHtml(text);
  html = html.replace(/^###\s+(.+)$/gm, '<strong class="chat-heading">$1</strong>');
  html = html.replace(/^##\s+(.+)$/gm, '<strong class="chat-heading">$1</strong>');
  html = html.replace(/^(?:[-*])\s+(.+)$/gm, '<span class="chat-list-item">• $1</span>');
  // Simple bold formatting (**bold**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Simple line breaks
  html = html.replace(/\n/g, '<br>');
  return html;
}

function cleanBotReply(reply, originalText = '') {
  if (!reply || /experiencing high traffic|try asking again/i.test(reply)) {
    return getLocalChatReply(originalText);
  }
  return reply;
}

function getLocalChatReply(text) {
  const msg = String(text || '').toLowerCase();
  const lang = getLanguage();
  const packs = {
    en: {
      joke: "Honk honk: why did the goose buy a stealth game? It wanted to go under-quack.",
      deals: "Check Today's Goose Deals on the home page. Look for sale badges and start with cozy indies, action adventures, or multiplayer picks.",
      rpg: "Try Elden Ring for challenge, The Witcher 3 for story, or Zelda for open-world exploration.",
      cart: "Use the cart bubble in the top-right to review games, remove items, or jump into checkout.",
      default: "I can help with game picks, deals, the cart, editions, or community Scratch games. Tell me your mood and I’ll point you somewhere good."
    },
    fr: {
      joke: "Coin-coin : pourquoi l’oie adore les jeux d’infiltration ? Pour passer incognito sans se faire plumer.",
      deals: "Regardez les Offres du Jour sur l’accueil. Les badges de réduction montrent les meilleurs choix.",
      rpg: "Essayez Elden Ring pour le défi, The Witcher 3 pour l’histoire, ou Zelda pour l’exploration.",
      cart: "Utilisez la bulle du panier en haut à droite pour modifier vos jeux ou passer au paiement.",
      default: "Je peux aider avec les jeux, offres, panier, éditions ou projets Scratch. Dites-moi l’ambiance voulue."
    },
    es: {
      joke: "Cuac cuac: ¿por qué el ganso compró un juego de sigilo? Para pasar desapercibido sin perder plumas.",
      deals: "Mira Ofertas de Hoy en la página principal. Los badges de descuento marcan buenas opciones.",
      rpg: "Prueba Elden Ring si quieres reto, The Witcher 3 si quieres historia, o Zelda si quieres exploración.",
      cart: "Usa la burbuja del carrito arriba a la derecha para revisar juegos o ir al pago.",
      default: "Puedo ayudar con juegos, ofertas, carrito, ediciones o proyectos Scratch. Dime qué estilo buscas."
    },
    de: {
      joke: "Schnatter: Warum kaufte die Gans ein Stealth-Spiel? Damit sie undercover schnattern kann.",
      deals: "Schau auf der Startseite bei den heutigen Goose-Deals. Rabatt-Badges zeigen gute Picks.",
      rpg: "Probier Elden Ring für Herausforderung, The Witcher 3 für Story oder Zelda für Erkundung.",
      cart: "Nutze die Warenkorb-Blase oben rechts, um Spiele zu prüfen oder zur Kasse zu gehen.",
      default: "Ich helfe bei Spielen, Angeboten, Warenkorb, Editionen oder Scratch-Projekten. Sag mir die Stimmung."
    }
  };
  const pack = packs[lang] || packs.en;
  if (msg.includes('joke') || msg.includes('blague') || msg.includes('broma') || msg.includes('witz')) return pack.joke;
  if (msg.includes('deal') || msg.includes('sale') || msg.includes('offre') || msg.includes('oferta') || msg.includes('angebot')) return pack.deals;
  if (msg.includes('rpg') || msg.includes('role') || msg.includes('rol')) return pack.rpg;
  if (msg.includes('cart') || msg.includes('checkout') || msg.includes('panier') || msg.includes('carrito') || msg.includes('warenkorb')) return pack.cart;
  return pack.default;
}
