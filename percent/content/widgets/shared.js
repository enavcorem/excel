// ===== עזרים משותפים לבלוקים של ארגז הכלים =====
// שייך לקורס, לא למנוע.

export function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// 0 → A, 1 → B ... (מספיק לגיליונות הקטנים של הלומדה)
export function colLetter(i) {
  return String.fromCharCode(65 + i);
}

// צובע ארגומנטים בתוך נוסחה: כל ארגומנט ב-args מקבל את הצבע של המקום
// שלו ברשימה (fn-a1..fn-a4). אותו צבע מופיע גם בהסבר שמתחת, כך שהתלמידה
// רואה איזה חלק בנוסחה מתאים לאיזה הסבר.
// ההחלפה היא בבת אחת (regex אחד) כדי שארגומנט כמו "range" לא ייצבע
// שוב בתוך "sum_range" שכבר נצבע.
export function colorFormula(text, args = []) {
  const names = args.map((a) => a[0]).filter(Boolean);
  if (!names.length) return esc(text);
  const sorted = [...names].sort((a, b) => b.length - a.length);
  const re = new RegExp(sorted.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  let out = '';
  let last = 0;
  text.replace(re, (m, idx) => {
    out += esc(text.slice(last, idx));
    out += `<span class="fn-a${(names.indexOf(m) % 4) + 1}">${esc(m)}</span>`;
    last = idx + m.length;
    return m;
  });
  return out + esc(text.slice(last));
}
