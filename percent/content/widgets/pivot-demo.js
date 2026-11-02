// ===== pivot-demo: טבלת ציר חיה =====
// המקביל ל-xlookup-demo: בלוק שהתלמידה (או המורה על המקרן) לוחצת בו,
// ורואה מה אקסל עושה. שלושה מצבים:
//
// 1. mode: 'percent' — "הצג ערכים כ". כפתורים: סכום / % מסכום כולל /
//    % מסכום עמודה / % מסכום שורה. התאים שבהם יוצא 100% מודגשים — שם יושב
//    "השלם". לחיצה על תא מראה את החישוב: החלק (התא) חלקי השלם (תא אחר,
//    שגם הוא מסומן). זה כל הסיפור של הפרק: לשאול "מתוך מה?".
//    {
//      type: 'pivot-demo', mode: 'percent',
//      valueLabel: 'הכנסות',            // "סכום של הכנסות"
//      rowsLabel: 'טעם', colsLabel: 'סניף',
//      rowKeys: ['וניל', 'שוקולד'], colKeys: ['צפון', 'דרום'],
//      values: [[120, 80], [200, 100]],  // שורה לכל rowKey, לפי סדר colKeys
//      views: ['sum', 'total', 'col', 'row'],   // רשות
//      start: 'sum',                             // רשות
//      questions: { total: '...', col: '...', row: '...' },  // רשות: איזו שאלה כל תצוגה עונה
//      unit: '₪',                                // רשות, ליד הסכומים
//    }
//
// 2. mode: 'dates' — קיבוץ תאריכים. כפתורים: ימים / חודשים / רבעונים / שנים /
//    שנים + חודשים. תאריך שאינו yyyy-mm-dd נחשב טקסט ("תאריך שבור"): הוא מוצג
//    מימין, וכל קיבוץ נחסם עד שמתקנים אותו (כפתור 🩹, אם הוגדר fix).
//    {
//      type: 'pivot-demo', mode: 'dates', valueLabel: 'הכנסות',
//      records: [['2025-01-14', 320], ['03.04.2025', 150], ...],
//      groups: ['days', 'months', 'quarters', 'years', 'years-months'],  // רשות
//      fix: { from: '03.04.2025', to: '2025-04-03' },                    // רשות
//    }
//
// 3. mode: 'years' — השוואה בין שנים. החודשים (או הרבעונים) בשורות, השנים
//    בעמודות. כפתורים: סכום / % הפרש מ... (השנה הקודמת). השנה הראשונה ריקה —
//    אין לה "קודם". לחיצה על תא מראה (חדש − ישן) ÷ ישן.
//    { type: 'pivot-demo', mode: 'years', valueLabel: 'הזמנות', by: 'quarters' | 'months',
//      records: [['2025-01-14', 320], ...] }
//
// הכותרות והשמות כמו באקסל בעברית: "תוויות שורה", "סכום כולל", "סכום של ...",
// חודשים ינו–דצמ, רבעונים "רבע1". צבעים — רק מחלקות, הטוקנים ב-pivot.css.

import { el, esc } from './shared.js';

const MONTHS = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'];

const VIEW_LABEL = {
  sum: 'סכום',
  total: '% מסכום כולל',
  col: '% מסכום עמודה',
  row: '% מסכום שורה',
};

const GROUP_LABEL = {
  days: 'ימים (בלי קיבוץ)',
  months: 'חודשים',
  quarters: 'רבעונים',
  years: 'שנים',
  'years-months': 'שנים + חודשים',
};

function fmtNum(n, unit) {
  const s = Math.round(n * 100) / 100;
  const txt = s.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return unit ? `${txt} ${unit}` : txt;
}

function fmtPct(x) {
  if (x === null || !Number.isFinite(x)) return '';
  return (x * 100).toFixed(2) + '%';
}

function parseIso(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s));
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCMonth() !== mo - 1) return null;   // 31.04 לא קיים
  return { y, m: mo, d };
}

function dmy(p) {
  return `${String(p.d).padStart(2, '0')}/${String(p.m).padStart(2, '0')}/${p.y}`;
}

function buttons(parent, items, onPick) {
  const bar = el('div', 'pv-demo-views');
  const btns = items.map(([key, label]) => {
    const b = el('button', 'pv-demo-view', esc(label));
    b.type = 'button';
    b.dataset.key = key;
    b.addEventListener('click', () => onPick(key));
    bar.appendChild(b);
    return b;
  });
  parent.appendChild(bar);
  return (key) => btns.forEach((b) => b.classList.toggle('is-on', b.dataset.key === key));
}

// =====================================================================
// 1. אחוזים: "הצג ערכים כ"
// =====================================================================
function renderPercent(block, wrap) {
  const {
    valueLabel = 'ערך', rowsLabel = 'שורות', colsLabel = 'עמודות',
    rowKeys = [], colKeys = [], values = [],
    views = ['sum', 'total', 'col', 'row'], start = 'sum', unit = '',
  } = block;
  const q = {
    total: `מתוך <b>כל</b> ה${esc(valueLabel)}, איזה חלק יש בכל תא?`,
    col: `בתוך כל <b>${esc(colsLabel)}</b> לחוד: איך הוא מתחלק בין ה${esc(rowsLabel)}?`,
    row: `בתוך כל <b>${esc(rowsLabel)}</b> לחוד: איך הוא מתחלק בין ה${esc(colsLabel)}?`,
    ...(block.questions || {}),
  };

  const R = rowKeys.length;
  const C = colKeys.length;
  // v(i, j): i,j מספר או 'T' (סכום כולל)
  const rowTot = values.map((r) => r.reduce((a, b) => a + (+b || 0), 0));
  const colTot = colKeys.map((_, j) => values.reduce((a, r) => a + (+r[j] || 0), 0));
  const grand = rowTot.reduce((a, b) => a + b, 0);
  const v = (i, j) => {
    if (i === 'T' && j === 'T') return grand;
    if (i === 'T') return colTot[j];
    if (j === 'T') return rowTot[i];
    return +values[i][j] || 0;
  };
  // השלם של כל תא, לפי התצוגה: [i, j] של התא שמחלקים בו
  function wholeOf(view, i, j) {
    if (view === 'total') return ['T', 'T'];
    if (view === 'col') return j === 'T' ? ['T', 'T'] : ['T', j];
    if (view === 'row') return i === 'T' ? ['T', 'T'] : [i, 'T'];
    return null;
  }

  let view = start;
  let picked = null;   // [i, j]

  const setOn = buttons(wrap, views.map((k) => [k, VIEW_LABEL[k]]), (k) => { view = k; picked = null; draw(); });

  const qBox = el('div', 'pv-demo-question');
  wrap.appendChild(qBox);

  const scroller = el('div', 'pv-demo-scroll');
  const table = el('table', 'pv-demo-table');
  scroller.appendChild(table);
  wrap.appendChild(scroller);

  const narration = el('div', 'pv-demo-narration');
  narration.setAttribute('aria-live', 'polite');
  wrap.appendChild(narration);

  const label = (i, j) => {
    const r = i === 'T' ? 'סכום כולל' : rowKeys[i];
    const c = j === 'T' ? 'סכום כולל' : colKeys[j];
    return { r, c };
  };

  function explain(i, j) {
    const val = v(i, j);
    const { r, c } = label(i, j);
    const where = `${esc(r)} · ${esc(c)}`;
    if (view === 'sum') {
      narration.innerHTML = `<b>${where}:</b> ${fmtNum(val, unit)}. זה סכום רגיל. כדי לראות חלק מתוך שלם, בחרו אחת מתצוגות האחוזים.`;
      return;
    }
    const [wi, wj] = wholeOf(view, i, j);
    const whole = v(wi, wj);
    const w = label(wi, wj);
    narration.innerHTML = `<b>${where}:</b> החלק הוא <span class="pv-part">${fmtNum(val, unit)}</span>,
      והשלם הוא <span class="pv-whole">${fmtNum(whole, unit)}</span> (${esc(w.r)} · ${esc(w.c)}).
      <span class="ltr pv-calc">${fmtNum(val)} ÷ ${fmtNum(whole)} = ${fmtPct(whole ? val / whole : null)}</span>`;
  }

  function cell(i, j) {
    const val = v(i, j);
    let text;
    if (view === 'sum') text = fmtNum(val, unit);
    else {
      const [wi, wj] = wholeOf(view, i, j);
      const whole = v(wi, wj);
      text = fmtPct(whole ? val / whole : null);
    }
    const isTotal = i === 'T' || j === 'T';
    const td = el('td', 'pv-num' + (isTotal ? ' pv-tot' : ''), esc(text));
    if (view !== 'sum') {
      const [wi, wj] = wholeOf(view, i, j);
      if (wi === i && wj === j) td.classList.add('is-100');
    }
    if (picked) {
      if (picked[0] === i && picked[1] === j) td.classList.add('is-part');
      if (view !== 'sum') {
        const [wi, wj] = wholeOf(view, picked[0], picked[1]);
        if (wi === i && wj === j && !(picked[0] === i && picked[1] === j)) td.classList.add('is-whole');
      }
    }
    td.tabIndex = 0;
    td.setAttribute('role', 'button');
    const pick = () => { picked = [i, j]; draw(); explain(i, j); };
    td.addEventListener('click', pick);
    td.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    return td;
  }

  function draw() {
    setOn(view);
    qBox.innerHTML = view === 'sum'
      ? `סכומים רגילים. לחצו על תצוגת אחוזים, ואז על תא כלשהו.`
      : `<b>השאלה שהתצוגה הזו עונה עליה:</b> ${q[view]}<br><span class="pv-100-key">100%</span> מסמן איפה יושב השלם.`;
    table.innerHTML = '';
    const thead = el('thead');
    const tr1 = el('tr');
    tr1.appendChild(el('th', 'pv-corner', `סכום של ${esc(valueLabel)}`));
    tr1.appendChild(el('th', 'pv-collabel', `תוויות עמודה (${esc(colsLabel)})`));
    for (let j = 1; j < C; j++) tr1.appendChild(el('th', 'pv-blank'));
    tr1.appendChild(el('th', 'pv-blank'));
    thead.appendChild(tr1);
    const tr2 = el('tr');
    tr2.appendChild(el('th', 'pv-rowlabel', `תוויות שורה (${esc(rowsLabel)})`));
    colKeys.forEach((k) => tr2.appendChild(el('th', 'pv-key', esc(k))));
    tr2.appendChild(el('th', 'pv-key pv-tot', 'סכום כולל'));
    thead.appendChild(tr2);
    table.appendChild(thead);

    const tbody = el('tbody');
    for (let i = 0; i < R; i++) {
      const tr = el('tr');
      tr.appendChild(el('th', 'pv-key', esc(rowKeys[i])));
      for (let j = 0; j < C; j++) tr.appendChild(cell(i, j));
      tr.appendChild(cell(i, 'T'));
      tbody.appendChild(tr);
    }
    const trT = el('tr', 'pv-tot-row');
    trT.appendChild(el('th', 'pv-key pv-tot', 'סכום כולל'));
    for (let j = 0; j < C; j++) trT.appendChild(cell('T', j));
    trT.appendChild(cell('T', 'T'));
    tbody.appendChild(trT);
    table.appendChild(tbody);
    if (!picked) narration.innerHTML = 'לחצו על תא בטבלה כדי לראות את החישוב שלו.';
  }

  draw();
}

// =====================================================================
// 2. קיבוץ תאריכים
// =====================================================================
function renderDates(block, wrap) {
  const {
    valueLabel = 'ערך', records = [],
    groups = ['days', 'months', 'quarters', 'years', 'years-months'],
    start = 'days', unit = '',
  } = block;
  let fixed = false;
  let group = start;

  const setOn = buttons(wrap, groups.map((k) => [k, GROUP_LABEL[k]]), (k) => { group = k; draw(); });

  const scroller = el('div', 'pv-demo-scroll');
  const table = el('table', 'pv-demo-table pv-demo-narrow');
  scroller.appendChild(table);
  wrap.appendChild(scroller);

  const narration = el('div', 'pv-demo-narration');
  narration.setAttribute('aria-live', 'polite');
  wrap.appendChild(narration);

  const actions = el('div', 'pv-demo-actions');
  wrap.appendChild(actions);
  let fixBtn = null;
  if (block.fix) {
    fixBtn = el('button', 'btn btn-ghost', `🩹 לתקן את ${esc(block.fix.from)} לתאריך אמיתי`);
    fixBtn.type = 'button';
    fixBtn.addEventListener('click', () => { fixed = true; draw(); });
    actions.appendChild(fixBtn);
  }

  const recs = () => records.map(([d, val]) => {
    const raw = (fixed && block.fix && d === block.fix.from) ? block.fix.to : d;
    return { raw, p: parseIso(raw), val: +val || 0 };
  });

  function row(labelHtml, val, cls = '') {
    const tr = el('tr', cls);
    tr.appendChild(el('th', 'pv-key', labelHtml));
    tr.appendChild(el('td', 'pv-num', esc(fmtNum(val, unit))));
    return tr;
  }

  function draw() {
    setOn(group);
    if (fixBtn) fixBtn.style.display = fixed ? 'none' : '';
    const rs = recs();
    const broken = rs.filter((r) => !r.p);
    table.innerHTML = '';
    const thead = el('thead');
    const htr = el('tr');
    htr.appendChild(el('th', 'pv-rowlabel', 'תוויות שורה'));
    htr.appendChild(el('th', 'pv-corner', `סכום של ${esc(valueLabel)}`));
    thead.appendChild(htr);
    table.appendChild(thead);
    const tbody = el('tbody');
    table.appendChild(tbody);
    const total = rs.reduce((a, r) => a + r.val, 0);

    if (group !== 'days' && broken.length) {
      // אקסל מסרב לקבץ: נשארים בתצוגת הימים, ומסמנים את האשם
      group = 'days';
      setOn(group);
      wrap.classList.add('pv-shake');
      setTimeout(() => wrap.classList.remove('pv-shake'), 500);
      narration.innerHTML = `<b class="pv-bad-text">⛔ אקסל לא מקבץ.</b> בעמודה יש ערך שהוא <b>טקסט</b> ולא תאריך:
        <span class="ltr">${broken.map((b) => esc(b.raw)).join(', ')}</span>. מספיק תא אחד כזה, והקיבוץ נחסם לכל העמודה.`;
      drawDays(tbody, rs);
      tbody.appendChild(row('סכום כולל', total, 'pv-tot-row'));
      return;
    }

    if (group === 'days') {
      drawDays(tbody, rs);
      narration.innerHTML = broken.length
        ? 'כל תאריך הוא שורה. שימו לב לשורה שבסוף הרשימה. נסו לקבץ לחודשים.'
        : 'כל תאריך הוא שורה. הרבה שורות, וקשה לראות מגמה. נסו לקבץ.';
    } else if (group === 'months' || group === 'quarters' || group === 'years') {
      const keyOf = (p) => (group === 'months' ? p.m : group === 'quarters' ? Math.ceil(p.m / 3) : p.y);
      const nameOf = (k) => (group === 'months' ? MONTHS[k - 1] : group === 'quarters' ? `רבע${k}` : String(k));
      const sums = new Map();
      rs.forEach((r) => sums.set(keyOf(r.p), (sums.get(keyOf(r.p)) || 0) + r.val));
      [...sums.keys()].sort((a, b) => a - b).forEach((k) => tbody.appendChild(row(esc(nameOf(k)), sums.get(k))));
      const years = new Set(rs.map((r) => r.p.y));
      if (group === 'years') narration.innerHTML = 'כל שנה היא שורה אחת.';
      else if (years.size > 1) {
        narration.innerHTML = `<b>שימו לב:</b> בנתונים יש ${years.size} שנים, אבל קיבצנו רק ל${group === 'months' ? 'חודשים' : 'רבעונים'}.
          לכן השורה ${group === 'months' ? '"ינו"' : '"רבע1"'} מחברת יחד את ${group === 'months' ? 'ינואר' : 'הרבעון הראשון'} של ${[...years].sort().join(' ושל ')}. רוצות לראות כל שנה לחוד? מסמנים גם "שנים".`;
      } else narration.innerHTML = `כל ${group === 'months' ? 'חודש' : 'רבעון'} הוא שורה אחת. הסכום הכולל לא השתנה.`;
    } else if (group === 'years-months') {
      const byYear = new Map();
      rs.forEach((r) => {
        if (!byYear.has(r.p.y)) byYear.set(r.p.y, new Map());
        const m = byYear.get(r.p.y);
        m.set(r.p.m, (m.get(r.p.m) || 0) + r.val);
      });
      [...byYear.keys()].sort().forEach((y) => {
        const m = byYear.get(y);
        const sub = [...m.values()].reduce((a, b) => a + b, 0);
        tbody.appendChild(row(`⊟ ${y}`, sub, 'pv-group-row'));
        [...m.keys()].sort((a, b) => a - b).forEach((k) => tbody.appendChild(row(esc(MONTHS[k - 1]), m.get(k), 'pv-sub-row')));
      });
      narration.innerHTML = 'עכשיו כל שנה לחוד, ובתוכה החודשים. השורה של השנה היא הסכום של החודשים שלה.';
    }
    tbody.appendChild(row('סכום כולל', total, 'pv-tot-row'));
  }

  function drawDays(tbody, rs) {
    const good = rs.filter((r) => r.p).sort((a, b) => (a.p.y - b.p.y) || (a.p.m - b.p.m) || (a.p.d - b.p.d));
    const sums = new Map();
    good.forEach((r) => { const k = dmy(r.p); sums.set(k, (sums.get(k) || 0) + r.val); });
    sums.forEach((val, k) => {
      const tr = row(`<span class="pv-date">${esc(k)}</span>`, val);
      tbody.appendChild(tr);
    });
    rs.filter((r) => !r.p).forEach((r) => {
      const tr = row(`<span class="pv-text-date">${esc(r.raw)}</span>`, r.val, 'pv-broken-row');
      tbody.appendChild(tr);
    });
  }

  draw();
}

// =====================================================================
// 3. השוואה בין שנים: % הפרש מ...
// =====================================================================
function renderYears(block, wrap) {
  const { valueLabel = 'ערך', records = [], by = 'quarters', unit = '' } = block;
  let view = 'sum';
  let picked = null;
  const setOn = buttons(wrap, [['sum', 'סכום'], ['diff', '% הפרש מ... (הקודם)']], (k) => { view = k; picked = null; draw(); });

  const recs = records.map(([d, val]) => ({ p: parseIso(d), val: +val || 0 })).filter((r) => r.p);
  const years = [...new Set(recs.map((r) => r.p.y))].sort();
  const keyOf = (p) => (by === 'months' ? p.m : Math.ceil(p.m / 3));
  const keys = [...new Set(recs.map((r) => keyOf(r.p)))].sort((a, b) => a - b);
  const nameOf = (k) => (by === 'months' ? MONTHS[k - 1] : `רבע${k}`);
  const sum = (k, y) => recs.filter((r) => (k === 'T' || keyOf(r.p) === k) && (y === 'T' || r.p.y === y)).reduce((a, r) => a + r.val, 0);

  const scroller = el('div', 'pv-demo-scroll');
  const table = el('table', 'pv-demo-table');
  scroller.appendChild(table);
  wrap.appendChild(scroller);
  const narration = el('div', 'pv-demo-narration');
  narration.setAttribute('aria-live', 'polite');
  wrap.appendChild(narration);

  function cell(k, yi) {
    const y = yi === 'T' ? 'T' : years[yi];
    let text;
    let cls = 'pv-num' + (k === 'T' || yi === 'T' ? ' pv-tot' : '');
    if (view === 'sum') text = fmtNum(sum(k, y), unit);
    else if (yi === 'T' || yi === 0) { text = ''; cls += ' pv-empty'; }
    else {
      const prev = sum(k, years[yi - 1]);
      const cur = sum(k, y);
      text = prev ? fmtPct((cur - prev) / prev) : '#DIV/0!';
      if (prev && cur < prev) cls += ' pv-neg';
    }
    const td = el('td', cls, esc(text));
    if (picked && picked[0] === k && picked[1] === yi) td.classList.add('is-part');
    if (picked && view === 'diff' && picked[0] === k && picked[1] === yi + 1 && yi !== 'T') td.classList.add('is-whole');
    td.tabIndex = 0;
    td.setAttribute('role', 'button');
    const pick = () => { picked = [k, yi]; draw(); explain(k, yi); };
    td.addEventListener('click', pick);
    td.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    return td;
  }

  function explain(k, yi) {
    const rowName = k === 'T' ? 'סכום כולל' : nameOf(k);
    if (view === 'sum') {
      narration.innerHTML = `<b>${esc(rowName)} · ${yi === 'T' ? 'סכום כולל' : years[yi]}:</b> ${fmtNum(sum(k, yi === 'T' ? 'T' : years[yi]), unit)}.`;
      return;
    }
    if (yi === 'T') { narration.innerHTML = 'בעמודת הסכום הכולל אין "שנה קודמת", ולכן היא ריקה.'; return; }
    if (yi === 0) { narration.innerHTML = `${years[0]} היא השנה הראשונה. אין לה שנה קודמת להשוות אליה, ולכן התא ריק. זה לא שגיאה.`; return; }
    const prev = sum(k, years[yi - 1]);
    const cur = sum(k, years[yi]);
    narration.innerHTML = `<b>${esc(rowName)}:</b> ב-${years[yi]} <span class="pv-part">${fmtNum(cur)}</span>,
      וב-${years[yi - 1]} <span class="pv-whole">${fmtNum(prev)}</span>. מחלקים את ההפרש <b>בשנה הקודמת</b>:
      <span class="ltr pv-calc">(${fmtNum(cur)} − ${fmtNum(prev)}) ÷ ${fmtNum(prev)} = ${fmtPct(prev ? (cur - prev) / prev : null)}</span>`;
  }

  function draw() {
    setOn(view);
    table.innerHTML = '';
    const thead = el('thead');
    const tr1 = el('tr');
    tr1.appendChild(el('th', 'pv-corner', `סכום של ${esc(valueLabel)}`));
    tr1.appendChild(el('th', 'pv-collabel', 'תוויות עמודה (שנים)'));
    for (let j = 1; j <= years.length; j++) tr1.appendChild(el('th', 'pv-blank'));
    thead.appendChild(tr1);
    const tr2 = el('tr');
    tr2.appendChild(el('th', 'pv-rowlabel', `תוויות שורה (${by === 'months' ? 'חודשים' : 'רבעונים'})`));
    years.forEach((y) => tr2.appendChild(el('th', 'pv-key', String(y))));
    tr2.appendChild(el('th', 'pv-key pv-tot', 'סכום כולל'));
    thead.appendChild(tr2);
    table.appendChild(thead);
    const tbody = el('tbody');
    [...keys, 'T'].forEach((k) => {
      const tr = el('tr', k === 'T' ? 'pv-tot-row' : '');
      tr.appendChild(el('th', 'pv-key' + (k === 'T' ? ' pv-tot' : ''), esc(k === 'T' ? 'סכום כולל' : nameOf(k))));
      years.forEach((_, yi) => tr.appendChild(cell(k, yi)));
      tr.appendChild(cell(k, 'T'));
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    if (!picked) {
      narration.innerHTML = view === 'sum'
        ? 'סכומים לכל שנה. כדי לראות בכמה אחוז השתנה כל רבעון, עברו ל"% הפרש מ...".'
        : 'כל תא משווה לאותו רבעון בשנה הקודמת. לחצו על תא כדי לראות את החישוב.';
    }
  }
  draw();
}

export function renderPivotDemo(block) {
  const wrap = el('div', 'block pv-demo');
  if (block.title) wrap.appendChild(el('div', 'pv-demo-title', block.title));
  if (block.mode === 'dates') renderDates(block, wrap);
  else if (block.mode === 'years') renderYears(block, wrap);
  else renderPercent(block, wrap);
  return wrap;
}
