import { getTranslation } from './i18n.js';

export function formatPrice(value){
  return `$${value.toFixed(2)}`;
}
export function isEmojiOnly(value){
  if(!value || typeof value !== 'string') return false;
  const stripped = value.replace(/\s+/g,'');
  if(!stripped) return false;
  return [...stripped].every(char => /\p{Emoji}/u.test(char));
}
export function timeLeftStr(ms){
  if(ms <= 0) return getTranslation('endingSoon');
  const h = Math.floor(ms/3600000);
  const m = Math.floor((ms%3600000)/60000);
  const s = Math.floor((ms%60000)/1000);
  return `${getTranslation('endsIn')} ${h}h ${m}m ${s}s`;
}
export function throttle(fn, wait){
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if(now - last > wait){
      last = now;
      fn(...args);
    }
  };
}
