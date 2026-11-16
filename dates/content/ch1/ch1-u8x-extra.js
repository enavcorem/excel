// פרק 1, יחידת העשרה ⭐ אחרי יחידה 8 (16.11): TIME, ‏DATEVALUE ו-TIMEVALUE. גיליון 8, שורות ג–ו.
// הוצאו מיחידה 8 כי הן לא בסילבוס (פונקציות תאריך בי': YEAR, MONTH, DAY, WEEKDAY, HOUR, MINUTE, DATE, TODAY, NOW).
// type: 'bonus' במניפסט: לא חוסמת את מבחן הפרק.
// מחושב: TIME(9,30,0) = 0.3958333 · TIME(14,15,0) = 0.59375 · DATEVALUE("2025-05-07") = 45784.

import { taskSlide } from './dt-task.js';

export default {
  title: '⭐ העשרה: TIME ו-DATEVALUE',
  slides: [
    // ---------- TIME ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h1>⭐ העשרה: לבנות שעה עם TIME 🕐</h1>
          <p>יחידת העשרה, לא חובה. ביחידה 8 בנינו תאריך עם <span class="ltr dt-code">DATE</span>. באותה דרך <span class="ltr dt-code">TIME</span> בונה שעה משלושה מספרים:</p>
          <div class="dt-fns">
            <div class="dt-fn"><span class="dt-fn-emoji">🕐</span><span><code>TIME(hour, minute, second)</code><small>שעה, דקות, שניות ← שעה</small></span></div>
          </div>`,
        },
        {
          type: 'sheet',
          header: ['שעה', 'דקות', 'שניות', 'שעה בתא'],
          rows: [['9', '30', '0', '0.3958']],
          formula: { cell: 'D2', text: '=TIME(A2,B2,C2)' },
          caption: 'בעיצוב "כללי" רואים את השבר: 9:30 הן 9.5 ÷ 24 = 0.3958 (יחידה 2).',
        },
        {
          type: 'sheet',
          header: ['שעה', 'דקות', 'שניות', 'TIME'],
          rows: [['14', '15', '0', '']],
          formula: { cell: 'D2', text: '=TIME(A2,B2,C2)' },
          caption: 'ועכשיו אתן, בעיצוב "כללי". זה כמו שורה ג בגיליון 8.',
        },
      ],
      question: {
        type: 'numeric',
        prompt: 'לפי הטבלה: מה תחזיר =TIME(A2,B2,C2) בעיצוב "כללי"? (עגלי לארבע ספרות אחרי הנקודה)',
        answer: 0.5938,
        tolerance: 0.001,
        hint: '14 שעות ו-15 דקות הן 14.25 שעות. חלקי 24 שעות ביממה.',
      },
    },


    // ---------- DATEVALUE ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h2>⭐ מטקסט לתאריך: DATEVALUE ו-TIMEVALUE 🔄</h2>
          <p>כשתאריך או שעה כתובים <b>כטקסט</b> בצורה שאקסל יודע לקרוא, אפשר להפוך אותם למספר בבת אחת:</p>
          <ul class="dt-facts">
            <li><span class="ltr dt-code">DATEVALUE(date_text)</span> ← טקסט של תאריך ← מספר סידורי</li>
            <li><span class="ltr dt-code">TIMEVALUE(time_text)</span> ← טקסט של שעה ← שבר של יממה</li>
          </ul>`,
        },
        {
          type: 'sheet',
          header: ['טקסט', 'התוצאה'],
          rows: [["'2025-05-07", '45784'], ["'09:30", '0.3958']],
          caption: 'A2 הוא טקסט של תאריך, ו-A3 טקסט של שעה. בעמודה B: DATEVALUE ו-TIMEVALUE מחזירות מספר.',
        },
        {
          type: 'trap',
          title: 'מוקש: התוצאה תלויה בהגדרות האזוריות',
          body: `<p>האם <span class="ltr">"06/03/2025"</span> הוא 6 במרץ או 3 ביוני? <b>DATEVALUE תקרא את זה לפי הגדרות המחשב</b>. באקסל ישראלי: 6 במרץ. באקסל אמריקאי: 3 ביוני. ולפעמים (למשל 15/01/2025 בהגדרות אמריקאיות) תהיה שגיאה <span class="ltr">#VALUE!</span>.</p>
          <p>הכי בטוח: טקסט בצורה <span class="ltr">שנה-חודש-יום</span> (2025-05-07), שנקראת אותו דבר כמעט תמיד.</p>`,
        },
      ],
      question: {
        type: 'mc',
        prompt: 'לפי מה שהוסבר: למה DATEVALUE על "06/03/2025" יכולה לתת תוצאות שונות במחשבים שונים?',
        options: [
          { text: 'כי היא קוראת את הטקסט לפי ההגדרות האזוריות של המחשב', correct: true },
          { text: 'כי DATEVALUE לא עובדת על מספרים', correct: false, hint: 'הטקסט הוא טקסט, וזה בדיוק מה ש-DATEVALUE מקבלת. הבעיה היא בפירוש של 06/03.' },
          { text: 'כי אקסל משנה את הערכים באקראי', correct: false, hint: 'אין אקראיות. אותו מחשב ייתן תמיד אותה תוצאה. מחשבים עם הגדרות שונות נותנים תוצאות שונות.' },
          { text: 'כי DATEVALUE מחזירה תמיד את התאריך של היום', correct: false, hint: 'זו TODAY. DATEVALUE מחזירה את התאריך שכתוב בטקסט.' },
        ],
      },
    },

    // ---------- עכשיו לאקסל ----------
    taskSlide(8, 'ג–ו', 'בונות שעה עם TIME, ומפעילות DATEVALUE ו-TIMEVALUE. בשורה האחרונה (ו) אין בדיקה: מה יצא אצלך?'),
  ],
};
