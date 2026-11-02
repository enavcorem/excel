// ===== fn-card: כרטיס פונקציה =====
// התבנית הקבועה של הלומדה: למה צריך אותה (איזו בעיה היא פותרת), מה היא
// עושה, מתי משתמשים בה (מילות המפתח שמופיעות בשאלה), התחביר — כתוב כמו
// בדף הנוסחאות, וכל ארגומנט בצבע משלו — ואיפה נכשלים.
// "איך בטבלה" לא כאן — הוא בבלוק steps שבא אחרי הכרטיס.
//
// {
//   type: 'fn-card',
//   name: 'COUNTIF',
//   why: 'כדי לא לספור ביד 200 שורות',          // למה? (רשות, מומלץ)
//   what: 'סופרת כמה תאים עומדים בתנאי',
//   when: ['כמה תלמידות…', 'מספר ה…'],         // מילות מפתח בשאלה
//   syntax: '=COUNTIF(range, criteria)',
//   args: [['range', 'איפה בודקים'], ['criteria', 'מה התנאי']],
//   fails: ['תנאי בלי מירכאות', ...],          // איפה נכשלים (רשות, עד 3)
//   note: 'שורה קטנה בסוף (רשות)',
// }

import { el, esc, colorFormula } from './shared.js';

export function renderFnCard(block) {
  const card = el('div', 'block fn-card');
  card.appendChild(el('div', 'fn-card-name', esc(block.name)));
  if (block.why) {
    card.appendChild(el('div', 'fn-card-why', `<span class="fn-card-label">למה?</span> ${block.why}`));
  }
  if (block.what) {
    const label = block.why ? '<span class="fn-card-label">מה היא עושה?</span> ' : '';
    card.appendChild(el('div', 'fn-card-what', label + block.what));
  }

  if (block.when && block.when.length) {
    const w = el('div', 'fn-card-when');
    w.appendChild(el('span', 'fn-card-label', 'מתי? כשבשאלה כתוב:'));
    block.when.forEach((k) => w.appendChild(el('span', 'fn-chip', esc(k))));
    card.appendChild(w);
  }

  if (block.syntax) {
    card.appendChild(el('div', 'fn-card-syntax', colorFormula(block.syntax, block.args)));
  }

  if (block.args && block.args.length) {
    const list = el('ul', 'fn-card-args');
    block.args.forEach((a, i) => {
      list.appendChild(el('li', null,
        `<span class="fn-a${(i % 4) + 1} fn-arg-name">${esc(a[0])}</span> ${a[1]}`));
    });
    card.appendChild(list);
  }

  if (block.fails && block.fails.length) {
    const f = el('div', 'fn-card-fails');
    f.appendChild(el('span', 'fn-card-label', '⚠️ איפה נכשלים?'));
    const ul = el('ul');
    block.fails.forEach((x) => ul.appendChild(el('li', null, x)));
    f.appendChild(ul);
    card.appendChild(f);
  }

  if (block.note) card.appendChild(el('div', 'fn-card-note', block.note));
  return card;
}
