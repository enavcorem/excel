// ===== הגדלת הסימנים * ו-^ בנוסחאות =====
// בגופן של הלומדה הכוכבית והחזקה קטנות וגבוהות, וקשה לראות אותן בתוך נוסחה.
// הנוסחאות מופיעות בהרבה מקומות (טקסט, sheet, שורת הנוסחה, אפשרויות תשובה של המנוע),
// לכן במקום לגעת בכל אחד מהם עוטפים כל * ו-^ שנכנס לדף ב-<span class="fn-op">.
// התו עצמו לא משתנה, כך שהעתקה של נוסחה נותנת בדיוק את מה שמקלידים באקסל.

const OPS = /[*^]/;
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'OPTION']);

function wrapText(node) {
  const text = node.nodeValue;
  if (!OPS.test(text)) return;
  const parent = node.parentNode;
  if (!parent || SKIP.has(parent.nodeName) || parent.classList?.contains('fn-op')) return;
  const frag = document.createDocumentFragment();
  for (const part of text.split(/([*^])/)) {
    if (!part) continue;
    if (part === '*' || part === '^') {
      const span = document.createElement('span');
      span.className = 'fn-op';
      span.textContent = part;
      frag.appendChild(span);
    } else {
      frag.appendChild(document.createTextNode(part));
    }
  }
  parent.replaceChild(frag, node);
}

function scan(root) {
  if (root.nodeType === Node.TEXT_NODE) { wrapText(root); return; }
  if (root.nodeType !== Node.ELEMENT_NODE || SKIP.has(root.nodeName)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(wrapText);
}

export function enlargeOperators() {
  scan(document.body);
  new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach(scan);
  }).observe(document.body, { childList: true, subtree: true });
}
