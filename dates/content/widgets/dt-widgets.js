// ===== ווידג'טים של לומדת התאריכים (שייכים לקורס, לא למנוע) =====
//   day-axis    — "ציר ימים": תאריך ← מספר סידורי ומספר ← תאריך, עם הימים שמסביב
//   day-bar     — "פס יממה": שעה ← שבר של יממה (0:00 עד 24:00)
//   bday-count  — "ספירה ליום הולדת": מחשב חי לפי התאריך של היום (TODAY), לא נשמר
// החישוב כאן זהה למה שאקסל עושה: 1/1/1900 = 1 (כולל "29/2/1900" שאקסל המציא).
// כל החישובים ב-UTC, כדי ששעון קיץ לא יזיז יום.

import { registerBlockRenderer } from '../../js/engine/blocks.js';
import { el } from './shared.js';

const DAY = 86400000;
const BASE = Date.UTC(1899, 11, 30);
const MIN_N = 1;
const MAX_N = 73415; // 31/12/2100

function serial(y, m, d) {
  const u = Date.UTC(y, m - 1, d);
  let n = Math.round((u - BASE) / DAY);
  if (u < Date.UTC(1900, 2, 1)) n -= 1; // אקסל סופר את "29/2/1900" שלא היה
  return n;
}
function fromSerial(n) {
  if (n === 60) return null; // היום שלא היה
  const u = BASE + (n < 60 ? n + 1 : n) * DAY;
  const d = new Date(u);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
}
const p2 = (x) => String(x).padStart(2, '0');
const fmt = (o) => `${p2(o.d)}/${p2(o.m)}/${o.y}`;
const isoOf = (o) => `${o.y}-${p2(o.m)}-${p2(o.d)}`;
function parseIso(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  return m ? { y: +m[1], m: +m[2], d: +m[3] } : null;
}
function todayParts() {
  const t = new Date();
  return { y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate() };
}
const num = (n) => n.toLocaleString('en-US');

// ---------- ציר ימים ----------
function renderDayAxis(block) {
  const wrap = el('div', 'block dt-widget dt-axis');
  const start = parseIso(block.start) || { y: 2025, m: 1, d: 5 };
  wrap.innerHTML = `
    <div class="dt-widget-title">🔢 ציר ימים: תאריך הוא מספר</div>
    <div class="dt-axis-inputs">
      <label class="dt-field">תאריך<input type="date" class="dt-in-date" min="1900-01-01" max="2100-12-31"></label>
      <label class="dt-field">או מספר סידורי<input type="number" class="dt-in-num" min="${MIN_N}" max="${MAX_N}" step="1"></label>
    </div>
    <div class="dt-arrow-card"><span class="dt-from ltr"></span><span class="dt-arrow">←</span><span class="dt-to ltr"></span></div>
    <div class="dt-strip" aria-label="הימים שסביב התאריך"></div>
    <div class="dt-presets">נסי: <button type="button" data-p="1900-01-01">1/1/1900</button><button type="button" data-p="2000-01-01">1/1/2000</button><button type="button" data-p="today">היום</button></div>
    <div class="dt-warn" hidden></div>`;
  const inDate = wrap.querySelector('.dt-in-date');
  const inNum = wrap.querySelector('.dt-in-num');
  const from = wrap.querySelector('.dt-from');
  const to = wrap.querySelector('.dt-to');
  const strip = wrap.querySelector('.dt-strip');
  const warn = wrap.querySelector('.dt-warn');

  function show(n) {
    const o = fromSerial(n);
    warn.hidden = true;
    if (!o) {
      from.textContent = '29/02/1900';
      to.textContent = '60';
      warn.hidden = false;
      warn.textContent = 'ב-1900 לא היה 29 בפברואר. אקסל טעה, ושמר את הטעות כדי להיות תואם לתוכנה ישנה. לא תיתקלי בזה בחיים.';
    } else {
      from.textContent = fmt(o);
      to.textContent = num(n);
      inDate.value = isoOf(o);
    }
    inNum.value = n;
    strip.innerHTML = '';
    for (let k = n - 2; k <= n + 2; k++) {
      if (k < MIN_N) continue;
      const od = fromSerial(k);
      strip.appendChild(el('div', 'dt-strip-cell' + (k === n ? ' is-now' : ''),
        `<span class="dt-strip-num ltr">${num(k)}</span><span class="dt-strip-date ltr">${od ? fmt(od) : '—'}</span>`));
    }
  }
  inDate.addEventListener('input', () => {
    const o = parseIso(inDate.value);
    if (o) show(serial(o.y, o.m, o.d));
  });
  inNum.addEventListener('input', () => {
    const n = Math.round(Number(inNum.value));
    if (n >= MIN_N && n <= MAX_N) show(n);
  });
  wrap.querySelectorAll('.dt-presets button').forEach((b) => b.addEventListener('click', () => {
    const o = b.dataset.p === 'today' ? todayParts() : parseIso(b.dataset.p);
    show(serial(o.y, o.m, o.d));
  }));
  show(serial(start.y, start.m, start.d));
  return wrap;
}

// ---------- פס יממה ----------
function trimFrac(x) {
  return String(Math.round(x * 1e6) / 1e6);
}
function renderDayBar(block) {
  const wrap = el('div', 'block dt-widget dt-daybar');
  const withDate = parseIso(block.date);
  const startMin = Number.isFinite(block.minutes) ? block.minutes : 9 * 60 + 30;
  wrap.innerHTML = `
    <div class="dt-widget-title">⏰ פס יממה: שעה היא חלק מיום</div>
    <div class="dt-bar"><div class="dt-bar-fill"></div></div>
    <div class="dt-bar-ticks ltr"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
    <input type="range" class="dt-range" min="0" max="1440" step="5" value="${startMin}" aria-label="שעה ביממה">
    <div class="dt-arrow-card"><span class="dt-from ltr"></span><span class="dt-arrow">←</span><span class="dt-to ltr"></span></div>
    <div class="dt-note-small dt-bar-note"></div>`;
  const range = wrap.querySelector('.dt-range');
  const fill = wrap.querySelector('.dt-bar-fill');
  const from = wrap.querySelector('.dt-from');
  const to = wrap.querySelector('.dt-to');
  const note = wrap.querySelector('.dt-bar-note');
  function upd() {
    const mins = Number(range.value);
    const frac = mins / 1440;
    fill.style.width = (frac * 100) + '%';
    from.textContent = mins === 1440 ? '24:00' : `${p2(Math.floor(mins / 60))}:${p2(mins % 60)}`;
    to.textContent = trimFrac(frac);
    if (withDate) {
      const n = serial(withDate.y, withDate.m, withDate.d);
      note.innerHTML = `ביחד עם התאריך ${fmt(withDate)}: <b class="ltr dt-code">${n + frac === n ? n : (n + frac).toFixed(6).replace(/0+$/, '')}</b>`;
    } else {
      note.textContent = `${mins} דקות מתוך 1,440 דקות ביממה.`;
    }
  }
  range.addEventListener('input', upd);
  upd();
  return wrap;
}

// ---------- ספירה ליום הולדת ----------
function renderBdayCount(block) {
  const wrap = el('div', 'block dt-widget dt-bday');
  const b0 = parseIso(block.birthday) || { y: 2009, m: 3, d: 15 };
  wrap.innerHTML = `
    <div class="dt-widget-title">🎂 כמה ימים נשארו עד יום ההולדת?</div>
    <label class="dt-field">יום ההולדת שלך (השנה לא משנה)<input type="date" class="dt-in-date" value="${isoOf(b0)}"></label>
    <table class="dt-calc"><tbody></tbody></table>
    <div class="dt-bday-result"></div>
    <div class="dt-note-small">מחושב עכשיו לפי השעון של המחשב. מחר התוצאה תהיה אחרת, וזה בדיוק הרעיון של <span class="ltr dt-code">TODAY()</span>. התאריך שלך לא נשמר.</div>`;
  const inDate = wrap.querySelector('.dt-in-date');
  const tbody = wrap.querySelector('tbody');
  const res = wrap.querySelector('.dt-bday-result');
  function upd() {
    const b = parseIso(inDate.value);
    if (!b) return;
    const t = todayParts();
    const nT = serial(t.y, t.m, t.d);
    const nThis = serial(t.y, b.m, b.d);
    const nNext = serial(t.y + 1, b.m, b.d);
    const passed = nThis < nT;
    const diffNaive = nThis - nT;
    const diffRight = (passed ? nNext : nThis) - nT;
    const thisO = fromSerial(nThis) || { y: t.y, m: 3, d: 1 };
    const nextO = fromSerial(nNext) || { y: t.y + 1, m: 3, d: 1 };
    tbody.innerHTML = `
      <tr><th>היום</th><td><span class="ltr dt-code">=TODAY()</span></td><td class="ltr">${fmt(t)}</td><td class="ltr">${num(nT)}</td></tr>
      <tr><th>יום ההולדת, השנה</th><td><span class="ltr dt-code">=DATE(YEAR(TODAY()),${b.m},${b.d})</span></td><td class="ltr">${fmt(thisO)}</td><td class="ltr">${num(nThis)}</td></tr>
      <tr class="${passed ? 'is-bad' : ''}"><th>ההפרש</th><td><span class="ltr dt-code">=יום ההולדת - היום</span></td><td colspan="2" class="ltr">${diffNaive}</td></tr>`;
    if (passed) {
      res.className = 'dt-bday-result is-bad';
      res.innerHTML = `יום ההולדת של השנה כבר עבר, ולכן יצא <b class="ltr">${diffNaive}</b>. צריך את יום ההולדת של <b>שנה הבאה</b>:
        <div class="dt-fix"><span class="ltr dt-code">=DATE(YEAR(TODAY())+1,${b.m},${b.d})-TODAY()</span> ← <b class="ltr">${num(diffRight)}</b> ימים (${fmt(nextO)})</div>`;
    } else if (diffRight === 0) {
      res.className = 'dt-bday-result is-good';
      res.innerHTML = '🎉 היום יום ההולדת שלך! נשארו <b>0</b> ימים.';
    } else {
      res.className = 'dt-bday-result is-good';
      res.innerHTML = `יום ההולדת עוד לא הגיע השנה, והנוסחה עובדת: <b class="ltr">${num(diffRight)}</b> ימים. ⏳<br><span class="dt-note-small">נסי תאריך שכבר עבר השנה, ותראי מה יוצא.</span>`;
    }
  }
  inDate.addEventListener('input', upd);
  upd();
  return wrap;
}

registerBlockRenderer('day-axis', renderDayAxis);
registerBlockRenderer('day-bar', renderDayBar);
registerBlockRenderer('bday-count', renderBdayCount);
