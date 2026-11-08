// פרק 1, יחידה 5: לפרק תאריך לחלקים. מחליפה את שקף 11 של המצגת (ארגז הכלים) ואת היחידה הישנה ch1-u2-parts. גיליון 5.
// הצילום dt-ch1-parts.png: 05/01/2025 ← YEAR 2025, MONTH 1, DAY 5, WEEKDAY 1 (ראשון = 1).
// מחושב: 07/05/2025 הוא רביעי (WEEKDAY = 4), החודש 5 והיום 7. 08/01/2025 הוא רביעי (4).
// התוספות של המורה, שלא במצגת: WEEKDAY ועמודת עזר.

import { task } from './dt-task.js';

export default {
  title: 'לפרק תאריך לחלקים',
  slides: [
    // ---------- YEAR MONTH DAY ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h1>מתאריך אחד לשלושה חלקים ✂️</h1>
          <p>לפעמים צריך רק <b>את השנה</b>, או רק <b>את החודש</b>: כדי למיין, לסנן או לקבץ. שלוש פונקציות שולפות חלק מהתאריך:</p>
          <div class="dt-fns">
            <div class="dt-fn"><span class="dt-fn-emoji">📆</span><span><code>YEAR</code><small>השנה</small></span></div>
            <div class="dt-fn"><span class="dt-fn-emoji">🗓️</span><span><code>MONTH</code><small>החודש, כמספר 1–12</small></span></div>
            <div class="dt-fn"><span class="dt-fn-emoji">📌</span><span><code>DAY</code><small>היום בחודש</small></span></div>
          </div>
          <p>כל אחת מקבלת תא עם תאריך ומחזירה <b>מספר</b>.</p>`,
        },
        {
          type: 'shot',
          src: 'dt-ch1-parts.png',
          alt: 'אקסל בעברית: בתא A2 התאריך 05/01/2025, ובתאים שלידו YEAR נותנת 2025, MONTH נותנת 1, DAY נותנת 5 ו-WEEKDAY נותנת 1. בשורת הנוסחאות =WEEKDAY(A2)',
          caption: 'התאריך 05/01/2025 ושלוש הפונקציות. שימי לב: MONTH נותנת <b>1</b> (ינואר) ו-DAY נותנת <b>5</b>.',
        },
        {
          type: 'text',
          html: '<p>עכשיו אתן, על תאריך אחר:</p>',
        },
        {
          type: 'sheet',
          header: ['תאריך', 'MONTH'],
          rows: [['07/05/2025', '']],
          formula: { cell: 'B2', text: '=MONTH(A2)' },
        },
      ],
      question: {
        type: 'numeric',
        prompt: 'בתא A2 התאריך 07/05/2025 (יום/חודש/שנה). מה תחזיר =MONTH(A2)?',
        answer: 5,
        hint: 'אצלנו הסדר הוא יום/חודש/שנה: 7 הוא היום, ו-5 הוא החודש (מאי).',
      },
    },

    // ---------- WEEKDAY ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h2>איזה יום בשבוע? 🗓️</h2>
          <p><span class="ltr dt-code">WEEKDAY</span> מחזירה מספר בין 1 ל-7: <b>1 = יום ראשון</b>, 2 = שני, ועד 7 = שבת. (הצילום הקודם: 05/01/2025 הוא יום ראשון, ולכן 1.)</p>`,
        },
        {
          type: 'table',
          headers: ['מספר', '1', '2', '3', '4', '5', '6', '7'],
          rows: [['היום', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']],
        },
        {
          type: 'sheet',
          header: ['תאריך', 'WEEKDAY'],
          rows: [['05/01/2025', '1']],
          formula: { cell: 'B2', text: '=WEEKDAY(A2)' },
          caption: '05/01/2025 הוא יום ראשון. מי שרוצה את <b>שם היום</b> ולא מספר, תשתמש ב-TEXT (יחידה 6).',
        },
      ],
      question: {
        type: 'numeric',
        prompt: 'לפי הטבלה: 05/01/2025 הוא יום ראשון (1). איזה מספר תחזיר WEEKDAY ל-08/01/2025, שלושה ימים אחרי?',
        answer: 4,
        hint: 'ראשון הוא 1, שני 2, שלישי 3, רביעי 4. שלושה ימים אחרי ראשון.',
      },
    },

    // ---------- שעה ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h2>וגם מהשעה ⏱️</h2>
          <p>אותו רעיון לשעות: <span class="ltr dt-code">HOUR</span> (שעה), <span class="ltr dt-code">MINUTE</span> (דקות) ו-<span class="ltr dt-code">SECOND</span> (שניות).</p>
          <div class="dt-fns">
            <div class="dt-fn"><span class="dt-fn-emoji">🕐</span><span><code>HOUR</code><small>השעה, 0–23</small></span></div>
            <div class="dt-fn"><span class="dt-fn-emoji">🕑</span><span><code>MINUTE</code><small>הדקות, 0–59</small></span></div>
            <div class="dt-fn"><span class="dt-fn-emoji">🕒</span><span><code>SECOND</code><small>השניות, 0–59</small></span></div>
          </div>`,
        },
        {
          type: 'sheet',
          header: ['שעה', 'HOUR', 'MINUTE', 'SECOND'],
          rows: [['14:35:50', '14', '35', '50']],
          formula: { cell: 'C2', text: '=MINUTE(A2)' },
        },
      ],
      question: {
        type: 'numeric',
        prompt: 'בתא A2 השעה 16:45:30. מה תחזיר =MINUTE(A2)?',
        answer: 45,
        hint: 'MINUTE מחזירה רק את חלק הדקות. 16 הן השעות, ו-30 השניות.',
      },
    },

    // ---------- למה לפרק + משימה ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h2>עמודת עזר: להפוך תאריך לשאלה 🔎</h2>
          <p>רוצות לדעת <b>כמה אירועים היו ביוני</b>, בכל השנים? מוסיפות עמודת עזר עם <span class="ltr dt-code">=MONTH(A2)</span>, ומסננות אותה ל-6.</p>`,
        },
        {
          type: 'sheet',
          header: ['תאריך האירוע', 'חודש'],
          rows: [['05/06/2024', '6'], ['11/06/2025', '6'], ['03/01/2025', '1'], ['20/06/2026', '6'], ['14/09/2025', '9']],
          formula: { cell: 'B2', text: '=MONTH(A2)' },
          caption: 'עמודה B היא עמודת העזר.',
        },
        task(5, 'א–ה', 'מפרקות תאריך לשנה, חודש ויום, מוצאות איזה יום בשבוע הוא, ומפרקות שעה. אחרי כל שורה בודקות את ה-✔.'),
      ],
      question: {
        type: 'numeric',
        prompt: 'לפי הטבלה: אחרי שמסננות את עמודת החודש ל-6, כמה אירועים נשארים?',
        answer: 3,
        hint: 'סופרות כמה פעמים מופיע 6 בעמודה B.',
      },
    },
  ],
};
