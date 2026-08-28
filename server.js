// GooseGames local server
// Run with: node server.js
// Then open http://localhost:3000

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Load environment variables from .env file if present
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const parts = trimmed.split('=');
          const key = parts[0].trim();
          let value = parts.slice(1).join('=').trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      });
    } catch (_) {}
  }
}
loadEnv();

const CLIENT_ID = process.env.IGDB_CLIENT_ID || '';
const CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET || '';

const PORT = process.env.PORT || 3000;

let tokenCache = { token: null, expiresAt: 0 };
const coverCache = new Map(); // name -> url or null
const pendingCache = new Map(); // name -> in-flight Promise (dedupe simultaneous requests for same name)
const CACHE_DIR = path.join(__dirname, 'cover-cache');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function getCachePath(name){
  const safe = name.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
  return path.join(CACHE_DIR, `${safe}.json`);
}

function loadCoverCache(){
  try {
    const files = fs.readdirSync(CACHE_DIR).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      try{
        const payload = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, file), 'utf8'));
        if(payload && payload.name && typeof payload.url !== 'undefined'){
          coverCache.set(payload.name, payload.url);
        }
      }catch(_){}
    });
  } catch(_) {}
}

function saveCoverCache(name, url){
  try{
    const filePath = getCachePath(name);
    fs.writeFileSync(filePath, JSON.stringify({ name, url }), 'utf8');
  }catch(_){}
}

loadCoverCache();

// Simple request queue so we never exceed IGDB's ~4 requests/sec limit
const queue = [];
const MAX_PER_SECOND = 4;
const MIN_GAP_MS = Math.ceil(1000 / MAX_PER_SECOND) + 15; // small safety buffer
let lastDispatch = 0;

function enqueue(task) {
  return new Promise((resolve, reject) => {
    queue.push({ task, resolve, reject });
    pump();
  });
}

function pump() {
  if (queue.length === 0) return;
  const now = Date.now();
  const wait = Math.max(0, MIN_GAP_MS - (now - lastDispatch));
  setTimeout(() => {
    if (queue.length === 0) return;
    const { task, resolve, reject } = queue.shift();
    lastDispatch = Date.now();
    task().then(resolve).catch(reject).finally(pump);
  }, wait);
}

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Missing IGDB_CLIENT_ID or IGDB_CLIENT_SECRET in environment variables.');
  }
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60000) {
    return tokenCache.token;
  }
  const params = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  const result = await httpsRequest({
    hostname: 'id.twitch.tv',
    path: `/oauth2/token?${params}`,
    method: 'POST',
  });
  if (!result.body || !result.body.access_token) {
    throw new Error('Failed to get Twitch token: ' + JSON.stringify(result.body));
  }
  tokenCache.token = result.body.access_token;
  tokenCache.expiresAt = Date.now() + result.body.expires_in * 1000;
  return tokenCache.token;
}

async function fetchCoverOnce(name, attempt = 0) {
  const cached = coverCache.get(name);
  if(typeof cached !== 'undefined') return cached;
  const token = await getToken();
  const body = `search "${name.replace(/"/g, '\\"')}"; fields name,cover.image_id; limit 1;`;

  const result = await httpsRequest(
    {
      hostname: 'api.igdb.com',
      path: '/v4/games',
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    body
  );

  // IGDB returns 429 if rate limit is exceeded — back off and retry
  if (result.status === 429 && attempt < 2) {
    await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
    return fetchCoverOnce(name, attempt + 1);
  }

  let url = null;
  if (Array.isArray(result.body) && result.body[0] && result.body[0].cover && result.body[0].cover.image_id) {
    const imageId = result.body[0].cover.image_id;
    url = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
  }
  coverCache.set(name, url);
  saveCoverCache(name, url);
  return url;
}

async function fetchCover(name) {
  if (coverCache.has(name)) return coverCache.get(name);
  if (pendingCache.has(name)) return pendingCache.get(name);

  const promise = enqueue(() => fetchCoverOnce(name))
    .then((url) => {
      coverCache.set(name, url);
      pendingCache.delete(name);
      return url;
    })
    .catch((err) => {
      pendingCache.delete(name);
      throw err;
    });

  pendingCache.set(name, promise);
  return promise;
}

function localChatReply(message, lang = 'en') {
  const text = String(message || '').toLowerCase();
  const replies = {
    en: {
      joke: "Honk honk: why did the goose buy a stealth game? It wanted to go under-quack.",
      deals: "For deals, check Today's Goose Deals on the home page. Good quick picks: action adventures, cozy indies, and multiplayer games with sale badges.",
      rpg: "Try Elden Ring if you want challenge, The Witcher 3 if you want story, or Zelda if you want open-world exploration.",
      cart: "Open the cart from the top-right cart bubble. From there you can review items, remove games, or head to checkout.",
      default: "I can help with game picks, deals, cart questions, editions, or Scratch community games. Tell me what mood you want and I’ll point you somewhere good."
    },
    fr: {
      joke: "Coin-coin : pourquoi l’oie adore les jeux d’infiltration ? Pour passer incognito sans se faire plumer.",
      deals: "Pour les offres, regardez les Offres du Jour sur l’accueil. Les badges de réduction montrent les meilleurs choix.",
      rpg: "Essayez Elden Ring pour le défi, The Witcher 3 pour l’histoire, ou Zelda pour l’exploration.",
      cart: "Ouvrez le panier avec la bulle en haut à droite pour modifier vos jeux ou passer au paiement.",
      default: "Je peux aider avec les jeux, offres, panier, éditions ou projets Scratch. Dites-moi l’ambiance que vous voulez."
    },
    es: {
      joke: "Cuac cuac: ¿por qué el ganso compró un juego de sigilo? Para pasar desapercibido sin perder plumas.",
      deals: "Para ofertas, mira Ofertas de Hoy en la página principal. Los badges de descuento marcan las mejores opciones.",
      rpg: "Prueba Elden Ring si quieres reto, The Witcher 3 si quieres historia, o Zelda si quieres exploración.",
      cart: "Abre el carrito con la burbuja de arriba a la derecha para revisar juegos o ir al pago.",
      default: "Puedo ayudar con juegos, ofertas, carrito, ediciones o proyectos Scratch. Dime qué estilo buscas."
    },
    de: {
      joke: "Schnatter: Warum kaufte die Gans ein Stealth-Spiel? Damit sie undercover schnattern kann.",
      deals: "Für Angebote schau auf der Startseite bei den heutigen Goose-Deals. Rabatt-Badges zeigen die besten Picks.",
      rpg: "Probier Elden Ring für Herausforderung, The Witcher 3 für Story oder Zelda für Erkundung.",
      cart: "Öffne den Warenkorb über die Blase oben rechts, um Spiele zu prüfen oder zur Kasse zu gehen.",
      default: "Ich helfe bei Spielen, Angeboten, Warenkorb, Editionen oder Scratch-Projekten. Sag mir einfach die Stimmung."
    }
  };
  const pack = replies[replies[lang] ? lang : 'en'];
  if (text.includes('joke') || text.includes('blague') || text.includes('broma') || text.includes('witz')) return pack.joke;
  if (text.includes('deal') || text.includes('sale') || text.includes('offre') || text.includes('oferta') || text.includes('angebot')) return pack.deals;
  if (text.includes('rpg') || text.includes('role') || text.includes('rol')) return pack.rpg;
  if (text.includes('cart') || text.includes('checkout') || text.includes('panier') || text.includes('carrito') || text.includes('warenkorb')) return pack.cart;
  return pack.default;
}

// Gemini AI Chatbot integration endpoint
async function handleChatRequest(req, res) {
  let bodyData = '';
  req.on('data', chunk => (bodyData += chunk));
  req.on('end', async () => {
    try {
      const payload = JSON.parse(bodyData || '{}');
      const userMessage = payload.message || '';
      const history = Array.isArray(payload.history) ? payload.history : [];
      const lang = payload.lang || 'en';
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ reply: localChatReply(userMessage, lang), source: 'local' }));
      }

      if (!userMessage.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Message cannot be empty.' }));
      }

      const contents = history.map(item => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const geminiBody = JSON.stringify({
        system_instruction: {
          parts: [{
            text: "You are GooseGames Assistant, a friendly gaming assistant for GooseGames. Help users discover games, explain details, and recommend titles. Be useful and concise: answer in 2-4 short sentences or up to 3 brief bullets, staying under 70 words. Use light Markdown only when it improves readability."
          }]
        },
        contents: contents
      });

      // Query Gemini API, but keep a local fallback so the storefront never shows an ugly traffic failure.
      const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
      const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(geminiBody)
        }
      };

      const geminiRes = await httpsRequest(options, geminiBody);

      if (geminiRes.status === 200 && geminiRes.body && geminiRes.body.candidates && geminiRes.body.candidates[0]) {
        const replyText = geminiRes.body.candidates[0].content?.parts?.[0]?.text || "Honk! I couldn't process that response.";
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ reply: replyText }));
      } else {
        console.error('Gemini API Error Status:', geminiRes.status, geminiRes.body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ reply: localChatReply(userMessage, lang), source: 'local' }));
      }

    } catch (err) {
      console.error('Chat endpoint error:', err);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ reply: localChatReply('', 'en'), source: 'local' }));
    }
  });
}

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsed = new URL(req.url, `http://localhost:${PORT}`);

  if (parsed.pathname === '/api/cover') {
    const name = parsed.searchParams.get('name');
    if (!name) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'missing name' }));
    }
    try {
      const url = await fetchCover(name);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ name, url }));
    } catch (err) {
      console.error('Cover fetch failed for', name, err.message);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ name, url: null, error: err.message }));
    }
    return;
  }

  if (parsed.pathname === '/api/chat' && req.method === 'POST') {
    return handleChatRequest(req, res);
  }

  // Static file serving
  const pathname = decodeURIComponent(parsed.pathname);
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`GooseGames running at http://localhost:${PORT}`);
  console.log('IGDB credentials loaded — testing token exchange...');
  getToken()
    .then(() => console.log('✓ IGDB token OK, covers will load live.'))
    .catch((e) => console.error('✗ IGDB token failed:', e.message, '— site will fall back to placeholder art.'));
  
  if (process.env.GEMINI_API_KEY) {
    console.log('✓ Gemini API key loaded for GooseGames Chatbot.');
  } else {
    console.warn('⚠️ GEMINI_API_KEY is missing. AI Chatbot endpoint requires GEMINI_API_KEY.');
  }
});
