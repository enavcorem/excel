// פרק 1, יחידה 8: לבנות ולתקן תאריך (DATE, TIME, DATEVALUE, TIMEVALUE) וסיכום. מחליפה את שקף 12 ושקף 14 במצגת. גיליון 8.
// הצילום dt-ch1-formula-date.png: =DATE(LEFT(A2,4),MID(A2,5,2),RIGHT(A2,2)) על 20250105 ← 05/01/2025.
// מחושב: DATE(2025,3,7) = 07/03/2025 · TIME(9,30,0) = 0.3958333 · 20251231 → 31/12/2025 · DATEVALUE("2025-05-07") = 45784.
// השקף "אפליקטיבי" (16) לא כאן: זו תחנה 2 בפרק 2.

import { task } from './dt-task.js';

export default {
  title: 'לבנות ולתקן תאריך',
  slides: [
    // ---------- DATE ו-TIME ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h1>לבנות תאריך משלושה מספרים 🧱</h1>
          <p>יש לך שנה בתא אחד, חודש בשני, ויום בשלישי. איך הופכים אותם לתאריך אחד אמיתי? עם <span class="ltr dt-code">DATE</span>. ולשעה, עם <span class="ltr dt-code">TIME</span>:</p>
          <div class="dt-fns">
            <div class="dt-fn"><span class="dt-fn-emoji">📆</span><span><code>DATE(year, month, day)</code><small>שנה, חודש, יום ← תאריך</small></span></div>
            <div class="dt-fn"><span class="dt-fn-emoji">🕐</span><span><code>TIME(hour, minute, second)</code><small>שעה, דקות, שניות ← שעה</small></span></div>
          </div>
          <p><b>הסדר ב-DATE הוא שנה, חודש, יום</b>, כלומר ההפך מהכתיבה אצלנו.</p>`,
        },
        {
          type: 'sheet',
          header: ['שנה', 'חודש', 'יום', 'תאריך'],
          rows: [['2025', '3', '7', '07/03/2025']],
          formula: { cell: 'D2', text: '=DATE(A2,B2,C2)' },
          caption: 'שימי לב: 3 הוא החודש (מרץ), ו-7 הוא היום. התוצאה מוצגת כיום/חודש/שנה.',
        },
        {
          type: 'sheet',
          header: ['שעה', 'דקות', 'שניות', 'שעה בתא'],
          rows: [['9', '30', '0', '0.3958']],
          formula: { cell: 'D2', text: '=TIME(A2,B2,C2)' },
          caption: 'בעיצוב "כללי" רואים את השבר: 9:30 הן 9.5 ÷ 24 = 0.3958 (יחידה 2).',
        },
      ],
      question: {
        type: 'mc',
        prompt: 'בטבלה הראשונה: A2 = 2025, B2 = 3 ו-C2 = 7. מה התאריך שתחזיר =DATE(A2,B2,C2)?',
        options: [
          { text: '7 במרץ 2025, כלומר 07/03/2025', correct: true },
          { text: '3 ביולי 2025, כלומר 03/07/2025', correct: false, hint: 'הסדר ב-DATE הוא שנה, חודש, יום. 3 הוא החודש (מרץ), ו-7 הוא היום.' },
          { text: '2025 במרץ 7', correct: false, hint: 'השנה היא הארגומנט הראשון והיא נכנסת לתאריך כשנה, ולא כיום.' },
          { text: 'שגיאה, כי המספרים נמצאים בתאים נפרדים', correct: false, hint: 'לזה בדיוק DATE קיימת: לקחת מספרים מתאים נפרדים ולבנות מהם תאריך.' },
        ],
      },
    },

    // ---------- לתקן רצף ספרות ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h2>לתקן רצף ספרות: 20250105 ← 05/01/2025 🔧</h2>
          <p>ביחידה 4 ראינו ש-<span class="ltr">20250105</span> הוא מספר, אבל לא תאריך. כדי לתקן אותו <b>חותכות</b> ממנו שנה, חודש ויום, ובונות תאריך:</p>
          <ul class="dt-facts">
            <li><span class="ltr dt-code">LEFT(A2,4)</span> ← 2025 (4 התווים הראשונים)</li>
            <li><span class="ltr dt-code">MID(A2,5,2)</span> ← 01 (שני תווים, מהתו החמישי)</li>
            <li><span class="ltr dt-code">RIGHT(A2,2)</span> ← 05 (שני התווים האחרונים)</li>
          </ul>`,
        },
        {
          type: 'shot',
          src: 'dt-ch1-formula-date.png',
          alt: 'אקסל בעברית: בתא A2 רצף הספרות 20250105, ובתא B2 התאריך 05/01/2025. בשורת הנוסחאות =DATE(LEFT(A2,4),MID(A2,5,2),RIGHT(A2,2))',
          caption: 'שלוש הפונקציות בתוך DATE: שנה, חודש, יום.',
        },
        {
          type: 'text',
          html: '<p>ועכשיו אתן, על רצף אחר:</p>',
        },
        {
          type: 'sheet',
          header: ['רצף ספרות', 'תאריך'],
          rows: [['20251231', '']],
          caption: 'הרצף 20251231: ארבע ספרות שנה, שתיים חודש ושתיים יום.',
        },
      ],
      question: {
        type: 'mc',
        prompt: 'בתא A2 הרצף 20251231. איזו נוסחה בונה ממנו תאריך?',
        options: [
          { text: '=DATE(LEFT(A2,4),MID(A2,5,2),RIGHT(A2,2))', correct: true },
          { text: '=DATE(RIGHT(A2,2),MID(A2,5,2),LEFT(A2,4))', correct: false, hint: 'הסדר הפוך. DATE מצפה לשנה, חודש, יום, ולכן השנה (LEFT) היא הראשונה.' },
          { text: '=DATE(LEFT(A2,2),MID(A2,3,2),RIGHT(A2,4))', correct: false, hint: 'השנה היא 4 ספרות מההתחלה, לא 2. ככה היא תיחתך לא נכון.' },
          { text: '=DATE(A2)', correct: false, hint: 'DATE צריכה שלושה ארגומנטים נפרדים. את הרצף צריך קודם לחתוך.' },
        ],
      },
    },

    // ---------- DATEVALUE ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h2>מטקסט לתאריך: DATEVALUE ו-TIMEVALUE 🔄</h2>
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

    // ---------- משימה בגיליון ----------
    {
      blocks: [
        task(8, 'א–ו', 'בונות תאריך מתוך שנה, חודש ויום, מתקנות רצף ספרות, בונות שעה, ומפעילות DATEVALUE ו-TIMEVALUE. בשורה האחרונה (ו) אין בדיקה: מה יצא אצלך? אחרי כל שורה בודקות את ה-✔.'),
        {
          type: 'sheet',
          header: ['שעה', 'דקות', 'שניות', 'TIME'],
          rows: [['14', '15', '0', '']],
          formula: { cell: 'D2', text: '=TIME(A2,B2,C2)' },
          caption: 'בעיצוב "כללי". זה כמו שורה ג.',
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

    // ---------- סיכום ----------
    {
      blocks: [
        {
          type: 'text',
          html: `<h2>סיכום ודגשים 🧠</h2>
          <p><img class="dt-gif" src="content/img/ppt-gif-practice.gif" alt="" loading="lazy">מה לקחת מהפרק:</p>
          <ul class="dt-facts">
            <li>🔢 אקסל שומר תאריך ושעה <b>כמספרים</b>. תאריך הוא מספר שלם, ושעה היא שבר של יממה.</li>
            <li>⌨️ <b>הקלדה נכונה</b> (לוכסנים, מקפים, נקודתיים). בדיקה מהירה: מספר נצמד לימין, וטקסט שנראה כמו תאריך נצמד לשמאל.</li>
            <li>🎨 <b>עיצוב משנה רק את התצוגה</b>, לא את הערך.</li>
            <li>🩹 תאריך שבור? <b>ISNUMBER</b> מגלה, ו-DATE, חפש והחלף ו-DATEVALUE מתקנים.</li>
            <li>✂️ <b>YEAR, MONTH, DAY, WEEKDAY, TEXT</b> שולפות חלקים ושמות.</li>
            <li>🎂 <b>TODAY ו-NOW</b> נותנות את הרגע הנוכחי, ומאפשרות לספור ימים.</li>
            <li>📊 <b>תאריך אמיתי</b> הוא התנאי לקיבוץ אוטומטי בטבלת ציר, וזה הפרק הבא.</li>
          </ul>
          <p><b>תמיד בדקו את הנתונים שלכם!</b> 🔍</p>`,
        },
      ],
    },
  ],
};
