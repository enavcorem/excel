// ===== download: כפתור הורדה לקובץ של תחנה =====
// כמו בלומדת XLOOKUP.
// { type: 'download', file: 'תחנה 1 - מבצע בסופר.xlsx', label: '...', note: '...' }
//
// הקבצים יושבים ב-downloads/ שליד index.html, ונבנים מ-tools/xlsx/.
// הפתרונות *לא* שם בכוונה: הם בתיקייה נפרדת למורה, מחוץ לאתר.

import { el, esc } from './shared.js';

export function renderDownload(block) {
  const wrap = el('div', 'block pv-download');
  const a = el('a', 'pv-download-btn');
  a.href = 'downloads/' + encodeURIComponent(block.file);
  a.setAttribute('download', block.file);
  a.innerHTML = `
    <span class="pv-download-icon">⬇️</span>
    <span class="pv-download-text">
      <span class="pv-download-label">${esc(block.label || block.file)}</span>
      <span class="pv-download-note">${esc(block.note || 'קובץ אקסל · נפתח גם בגוגל שיטס')}</span>
    </span>`;
  wrap.appendChild(a);
  return wrap;
}
