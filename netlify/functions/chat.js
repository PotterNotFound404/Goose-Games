function localReply(message, lang = 'en') {
  const text = String(message || '').toLowerCase();
  const replies = {
    en: {
      joke: 'Honk honk: why did the goose buy a stealth game? It wanted to go under-quack.',
      deals: "For deals, check Today's Goose Deals on the home page.",
      rpg: 'Try Elden Ring for challenge, The Witcher 3 for story, or Zelda for exploration.',
      cart: 'Open the cart from the top-right cart bubble to review items or check out.',
      default: 'I can help with game picks, deals, cart questions, editions, or Scratch community games.'
    }
  };
  const pack = replies[lang] || replies.en;
  if (/joke|blague|broma|witz/.test(text)) return pack.joke;
  if (/deal|sale|offre|oferta|angebot/.test(text)) return pack.deals;
  if (/rpg|role|rol/.test(text)) return pack.rpg;
  if (/cart|checkout|panier|carrito|warenkorb/.test(text)) return pack.cart;
  return pack.default;
}

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || '{}');
    const message = String(payload.message || '');
    if (!message.trim()) return { statusCode: 400, body: JSON.stringify({ error: 'Message cannot be empty.' }) };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return { statusCode: 200, body: JSON.stringify({ reply: localReply(message, payload.lang), source: 'local' }) };

    const contents = (Array.isArray(payload.history) ? payload.history : []).map((item) => ({
      role: item.role === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });
    const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: 'You are GooseGames Assistant. Recommend games and answer briefly in 2-4 short sentences.' }] },
        contents
      })
    });
    const data = await response.json().catch(() => null);
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!response.ok) console.error('Gemini API error:', response.status, data?.error?.message || 'unknown error');
    return { statusCode: 200, body: JSON.stringify({ reply: reply || localReply(message, payload.lang), source: reply ? 'gemini' : 'local' }) };
  } catch (error) {
    console.error('Chat function failed:', error.message);
    return { statusCode: 200, body: JSON.stringify({ reply: localReply('', 'en'), source: 'local' }) };
  }
};