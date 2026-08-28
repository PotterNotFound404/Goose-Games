const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.IGDB_CLIENT_ID || '';
const CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET || '';
let tokenCache = { token: null, expiresAt: 0 };

const CACHE_DIR = path.join('/tmp', 'cover-cache');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function requestJson(url, options = {}) {
  return fetch(url, options).then(async (response) => ({
    status: response.status,
    body: await response.json().catch(() => null),
  }));
}

async function getToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) throw new Error('Missing IGDB environment variables');
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60000) return tokenCache.token;

  const response = await requestJson(
    `https://id.twitch.tv/oauth2/token?client_id=${encodeURIComponent(CLIENT_ID)}&client_secret=${encodeURIComponent(CLIENT_SECRET)}&grant_type=client_credentials`,
    { method: 'POST' }
  );
  if (!response.body?.access_token) throw new Error('Failed to get Twitch token');
  tokenCache = {
    token: response.body.access_token,
    expiresAt: Date.now() + response.body.expires_in * 1000,
  };
  return tokenCache.token;
}

exports.handler = async (event) => {
  const name = event.queryStringParameters?.name;

  if (!name) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'missing name' }),
    };
  }

  try {
    const token = await getToken();
    const query = `search "${name.replace(/"/g, '\\"')}"; fields name,cover.image_id; limit 1;`;
    const response = await requestJson('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: query,
    });
    const imageId = response.body?.[0]?.cover?.image_id;
    const url = imageId ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg` : null;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url }),
    };
  } catch (error) {
    console.error('Cover function failed:', error.message);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url: null, error: 'Cover service unavailable' }),
    };
  }
};
