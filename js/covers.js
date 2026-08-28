const coverCache = new Map();

export function normalizeName(n){
  if(!n) return '';
  // strip edition parentheticals like "(Remastered)" or "(Game of the Year Edition)"
  let s = n.replace(/\s*\([^\)]*\)/g, '');
  // take primary title before colon if subtitle exists (e.g. "Uncharted 4: A Thief's End" -> "Uncharted 4")
  if(s.includes(':')) s = s.split(':')[0];
  // remove extra punctuation
  s = s.replace(/["'’—––]/g, '').trim();
  return s;
}

export async function getCover(name){
  if (!name) return null;
  const key = name.toLowerCase().trim();
  if(coverCache.has(key)) return coverCache.get(key);

  const queryName = normalizeName(name) || name;
  try {
    const res = await fetch(`/api/cover?name=${encodeURIComponent(queryName)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.url) {
        coverCache.set(key, data.url);
        return data.url;
      }
    }
  } catch (err) {
    // Network or server offline - fallback to null
  }

  return null;
}
