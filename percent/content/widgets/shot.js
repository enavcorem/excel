// ===== shot: צילום מסך מאקסל בעברית =====
// לפעולות של תפריטים וחלונות, שהגיליון המדומה לא יכול להראות.
// הקבצים יושבים ב-content/img/, ומה שמופיע בכל צילום מתועד ב-content/img/README.md.
// אם הקובץ עוד לא קיים מוצג מלבן "צילום בדרך", כדי שהיחידה לא תישבר.
//
// {
//   type: 'shot',
//   src: 'ch2-remove-duplicates.png',   // שם הקובץ ב-content/img/
//   alt: 'חלון הסרת כפילויות',          // חובה: מה רואים בצילום
//   caption: 'טקסט קצר מתחת (רשות, HTML)',
//   size: 'small',                       // רשות: small = חלון קטן, לא נמתח לכל הרוחב
// }

import { el, esc } from './shared.js';

export function shotFigure(src, alt, caption, size) {
  const fig = el('figure', 'fn-shot' + (size === 'small' ? ' fn-shot-small' : ''));
  const img = document.createElement('img');
  img.src = 'content/img/' + src;
  img.alt = alt || '';
  img.loading = 'lazy';
  img.addEventListener('error', () => {
    img.replaceWith(el('div', 'fn-shot-missing', `📷 צילום בדרך: ${esc(alt || src)}`));
  });
  fig.appendChild(img);
  if (caption) fig.appendChild(el('figcaption', null, caption));
  return fig;
}

export function renderShot(block) {
  const wrap = el('div', 'block');
  wrap.appendChild(shotFigure(block.src, block.alt, block.caption, block.size));
  return wrap;
}
