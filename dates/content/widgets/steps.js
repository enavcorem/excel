// ===== steps: "איך עושים את זה בטבלה" — צעדים ממוספרים =====
// פעולה אחת בכל צעד, במשפט קצר: איפה לוחצות, מה מקלידות, מה רואות.
// אפשר לצרף לצעד צילום מסך (shot) מ-content/img/.
//
// {
//   type: 'steps',
//   title: 'איך עושים את זה בטבלה',      // רשות
//   items: [
//     'בוחרות את התא <b>E2</b>',
//     { text: 'נתונים ← הסר כפילויות', shot: 'ch2-remove-duplicates.png', alt: 'חלון הסרת כפילויות' },
//   ],
// }

import { el } from './shared.js';
import { shotFigure } from './shot.js';

export function renderSteps(block) {
  const box = el('div', 'block fn-steps');
  box.appendChild(el('div', 'fn-steps-title', block.title || '🖱️ איך עושים את זה בטבלה'));
  const ol = el('ol', 'fn-steps-list');
  (block.items || []).forEach((item) => {
    const it = typeof item === 'string' ? { text: item } : item;
    const li = el('li', null);
    li.appendChild(el('div', 'fn-step-text', it.text));
    if (it.shot) li.appendChild(shotFigure(it.shot, it.alt, null, it.size || 'small'));
    ol.appendChild(li);
  });
  box.appendChild(ol);
  return box;
}
