// ===== sheet: גיליון אקסל קטן עם שורת נוסחאות =====
// "איך זה נראה": התלמידה רואה את הנוסחה בשורת הנוסחאות ואת התוצאה בתא,
// כמו באקסל. הגיליון מימין לשמאל, כמו אקסל בעברית (A בצד ימין).
//
// {
//   type: 'sheet',
//   header: ['שם', 'ציון', 'סטטוס'],     // שורה 1 (רשות)
//   rows: [['נועה', '82', 'עבר'], ...],   // מתחילות בשורה 2 אם יש header
//   formula: { cell: 'C2', text: '=IF(B2>=55,"עבר","נכשל")' },  // רשות
//   marks: { C2: 'result', B2: 'input', 'B2:B6': 'range', B4: 'bad' },  // רשות
//   (בלומדת הפיבוט: ערך שמתחיל ב-' מוצג כטקסט, מימין, בלי ה-')
//   wrap: ['F'],                        // עמודות עם טקסט ארוך (עמודת "הסבר") — שוברות שורה
//   caption: 'טקסט קצר מתחת לגיליון',     // רשות, HTML
// סימונים: result (תוצאה), input, range, bad (שגוי), fix (צהוב — "סימנתי ותיקנתי" בטיוב)
// }

import { el, esc, colLetter } from './shared.js';

// מפרק "B2:B6" לרשימת כתובות. כתובת בודדת מחזירה את עצמה.
function expand(ref) {
  const m = /^([A-Z])(\d+):([A-Z])(\d+)$/.exec(ref);
  if (!m) return [ref];
  const out = [];
  for (let c = m[1].charCodeAt(0); c <= m[3].charCodeAt(0); c++) {
    for (let r = +m[2]; r <= +m[4]; r++) out.push(String.fromCharCode(c) + r);
  }
  return out;
}

export function renderSheet(block) {
  const wrap = el('div', 'block fn-sheet-wrap');

  if (block.formula) {
    const bar = el('div', 'fn-formula-bar');
    bar.innerHTML = `<span class="fn-namebox">${esc(block.formula.cell)}</span>`
      + '<span class="fn-fx">fx</span>'
      + `<span class="fn-formula-text">${esc(block.formula.text)}</span>`;
    wrap.appendChild(bar);
  }

  const marks = {};
  Object.entries(block.marks || {}).forEach(([ref, cls]) => {
    expand(ref).forEach((addr) => { marks[addr] = cls; });
  });
  if (block.formula && !marks[block.formula.cell]) marks[block.formula.cell] = 'result';

  const all = block.header ? [block.header, ...(block.rows || [])] : (block.rows || []);
  const width = Math.max(...all.map((r) => r.length));

  const scroller = el('div', 'fn-sheet-scroll');
  const t = el('table', 'fn-sheet');
  const thead = el('thead');
  const htr = el('tr');
  htr.appendChild(el('th', 'fn-corner'));
  for (let c = 0; c < width; c++) htr.appendChild(el('th', null, colLetter(c)));
  thead.appendChild(htr);
  t.appendChild(thead);

  const tbody = el('tbody');
  all.forEach((row, r) => {
    const tr = el('tr');
    tr.appendChild(el('th', 'fn-rownum', String(r + 1)));
    for (let c = 0; c < width; c++) {
      const addr = colLetter(c) + (r + 1);
      const cls = ['fn-cell'];
      if (block.header && r === 0) cls.push('fn-head');
      if (marks[addr]) cls.push('m-' + marks[addr]);
      if (block.wrap && block.wrap.includes(colLetter(c))) cls.push('fn-wrap');
      let v = String(row[c] ?? '');
      // גיליון RTL: מספר ותאריך אמיתי לימין, טקסט לועזי לשמאל (נבדק בצילום 7.11). זה גם רמז:
      // "תאריך" שמיושר לשמאל הוא בעצם טקסט.
      // תאריך (03/09/2026), שעה (14:30), אחוז (10%) ומספר עם פסיק אלפים (1,250)
      // הם מספרים באקסל, ולכן גם הם לימין.
      // בלומדת הפיבוט: תא שמתחיל ב-' הוא טקסט (כמו באקסל), וה-' לא מוצג.
      // כך מראים "תאריך ששמור כטקסט": '05/03/2026 מוצג מימין.
      const forcedText = v.startsWith("'");
      if (forcedText) v = v.slice(1);
      const t = v.trim();
      const isNum = !forcedText && t !== '' && (
        !isNaN(Number(t.replace(/,/g, '')))
        || /^-?[\d,]+(\.\d+)?\s?[%₪]$/.test(t)
        || /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}( \d{1,2}:\d{2})?$/.test(t)
        || /^\d{1,2}:\d{2}(:\d{2})?$/.test(t));
      if (isNum && !(block.header && r === 0)) cls.push('fn-num');
      // 7.11: נבדק בצילום מאקסל בעברית (גיליון RTL): מספר ותאריך נצמדים לימין,
      // טקסט בלי אותיות עבריות (למשל '05.01.2025 או YEAR) נצמד לשמאל, TRUE/FALSE ושגיאות במרכז.
      else if (/^(TRUE|FALSE|#[A-Z0-9/!?]+)$/.test(t)) cls.push('fn-center');
      else if (t !== '' && !/[֐-׿]/.test(t)) cls.push('fn-latin');
      tr.appendChild(el('td', cls.join(' '), esc(v)));
    }
    tbody.appendChild(tr);
  });
  t.appendChild(tbody);
  scroller.appendChild(t);
  wrap.appendChild(scroller);

  if (block.caption) wrap.appendChild(el('div', 'fn-sheet-caption', block.caption));
  return wrap;
}
