// ===== מקור האמת היחיד למבנה הקורס =====
// כל פרק ויחידה מוגדרים כאן פעם אחת. גם מפת המסלול וגם לוגיקת הנעילה
// קוראות מהרשימה הזאת בלבד. להוספת יחידה: אובייקט חדש ל-units + קובץ
// תוכן תחת content/chX/. אין צורך לגעת בשום קובץ אחר.
//
// 27.10: נוצרה מפיצול "פיבוט מתקדם" לשלוש לומדות באתר אחד (excel/):
// percent (אחוזים) · dates (תאריכים) · pivot (כלים לפיבוט ומשימה מסכמת).

// ⚠️ מזהה הקורס. ממנו נגזרים מפתחות ה-localStorage של התלמידות
// ('percent_data_v3' ו-'percent_current_key_v3'). שינוי הערך כאן
// אחרי שתלמידות כבר נכנסו = התקדמות שנראית להן כאילו נמחקה.
export const COURSE_ID = 'percent';

export const COURSE = {
  title: 'אחוזים',
  icon: '🧮',
  welcome: {
    f: 'ברוכה הבאה ללומדת האחוזים! רענון קצר, ואז אחוזים בפיבוט 🧮',
    m: 'ברוך הבא ללומדת האחוזים! רענון קצר, ואז אחוזים בפיבוט 🧮',
  },
  finaleText: 'סיימת את לומדת האחוזים. "הצג ערכים כ" בכיס 🧮',
  teacherTitle: '🧮 לוח מורה — אחוזים',

  // מצב כיתה, כמו ב-XLOOKUP: ?class=1 על מחשב המורה פותח את כל היחידות
  // ומסתיר XP, לשיעור פרונטלי בגבעול. ?class=0 מכבה. הקישור לתלמידות רגיל.
  classMode: true,
};

// אין אתגרי פטור (כמו ב-XLOOKUP). הנעילה לפי הסדר.
// התחנות הן יחידות lab בתוך הפרקים, עם כפתור הורדה לקובץ התרגול (נבנה ב-excel/_xlsx).
export const CHAPTERS = [
  {
    id: 'pc-ch1',
    number: 1,
    title: 'אחוזים, רענון',
    icon: '🧮',
    colorVar: 'chapter-1',
    // 27.10: פרק 1 נלמד מהמצגת "חישובי אחוזים באקסל" ומ"דף חישוב - אחוזים", ולא בלומדה.
    // המעברים בין הלומדה לאקסל היו מסובכים מדי. נשאר רק המבחן, כבדיקה בלוח המורה.
    // קובצי היחידות נשארו ב-ch1/. כדי להחזיר יחידה, מחזירים את השורה שלה.
    // { id: 'pc-ch1-u1', title: 'השוואה הוגנת', type: 'lesson', icon: '⚖️', estMinutes: 5, modulePath: 'ch1/ch1-u1-fair-compare.js' },
    // { id: 'pc-ch1-u2', title: 'הנחה: קדימה ואחורה', type: 'lesson', icon: '🏷️', estMinutes: 8, modulePath: 'ch1/ch1-u2-discount.js' },
    // { id: 'pc-ch1-u3', title: 'שינוי באחוזים, ומע"מ', type: 'lesson', icon: '📈', estMinutes: 7, modulePath: 'ch1/ch1-u3-change.js' },
    // { id: 'pc-ch1-u4', title: 'חלק יחסי באקסל', type: 'lesson', icon: '🧩', estMinutes: 7, modulePath: 'ch1/ch1-u4-share-excel.js' },
    // { id: 'pc-ch1-lab', title: 'תחנה 1: מבצע בסופר', type: 'lab', icon: '🛒', estMinutes: 15, modulePath: 'ch1/ch1-lab-supermarket.js' },
    // 2.11: בקשת המורה. תקציר המצגת בתוך הלומדה (עם דף החישוב והסרטונים כרשות), ואז המבחנון.
    // 4.11: התקציר ירד. ביחידה נשארו רק דף החישוב והסרטונים (אותו id).
    units: [
      { id: 'pc-ch1-slides', title: 'דף החישוב והסרטונים', type: 'lesson', icon: '📗', estMinutes: 15, modulePath: 'ch1/ch1-u0-slides.js' },
      { id: 'pc-ch1-quiz', title: 'מבחנון: אחוזים', type: 'quiz', icon: '📝', estMinutes: 7, modulePath: 'ch1/ch1-quiz.js' },
    ],
  },
  {
    id: 'pc-ch2',
    number: 2,
    title: 'אחוזים בפיבוט',
    icon: '🥧',
    colorVar: 'chapter-2',
    // 4.11: בקשת המורה, "חסר הלמה". נוספה יחידת פתיחה (קליעות, הרבה שורות, שלוש מנהלות ברשת
    // הגלידה). ביחידות 1–3 לכל מנהלת שורת "למה". ב-3 נוסף סיכום הפיצה. בלי הפניות למצגת.
    // מסחר מודרני (דף העבודה של המורה) מופיע רק בתחנה 2: הקדמה, בחירת תצוגה, ואז מספרים מהאקסל.
    // אינסטגרם הפכה לאתגר ⭐ (bonus, לא חוסם את המבחן).
    units: [
      { id: 'pc-ch2-u0', title: 'למה אחוזים, ולמה פיבוט?', type: 'lesson', icon: '🏀', estMinutes: 5, modulePath: 'ch2/ch2-u0-why.js' },
      { id: 'pc-ch2-u1', title: 'מסכומים לאחוזים', type: 'lesson', icon: '🥧', estMinutes: 6, modulePath: 'ch2/ch2-u1-of-total.js' },
      { id: 'pc-ch2-u2', title: 'איפה ה-100%?', type: 'lesson', icon: '🎯', estMinutes: 7, modulePath: 'ch2/ch2-u2-column-row.js' },
      { id: 'pc-ch2-u3', title: 'איזה אחוז עונה על השאלה?', type: 'lesson', icon: '❓', estMinutes: 8, modulePath: 'ch2/ch2-u3-which-percent.js' },
      { id: 'pc-ch2-u4', title: 'אחוז מכמות או אחוז מכסף', type: 'lesson', icon: '💰', estMinutes: 5, modulePath: 'ch2/ch2-u4-count-vs-money.js' },
      { id: 'pc-ch2-sales', title: 'תחנה 2: מסחר מודרני', type: 'lab', icon: '🛍️', estMinutes: 25, modulePath: 'ch2/ch2-lab-sales.js' },
      { id: 'pc-ch2-lab', title: 'אתגר ⭐ מי מנצח באינסטגרם', type: 'bonus', icon: '📸', estMinutes: 15, modulePath: 'ch2/ch2-lab-instagram.js' },
      { id: 'pc-ch2-quiz', title: 'מבחן מסכם: אחוזים בפיבוט', type: 'quiz', icon: '🏆', estMinutes: 8, modulePath: 'ch2/ch2-quiz.js', isGrandFinale: true },
    ],
  },
];

// ===== עזרי מניפסט =====
// לוגיקה גנרית שלא תלויה בקורס. המנוע מייבא את הפונקציות האלה מהמניפסט,
// ולכן הן חייבות להיות מיוצאות מכאן בכל לומדה. new-course.mjs מוסיף אותן
// אוטומטית — אין צורך לכתוב או לערוך אותן ביד.

export function getFlatUnits() {
  const flat = [];
  CHAPTERS.forEach(ch => {
    ch.units.forEach(u => {
      flat.push({ ...u, chapterId: ch.id, chapterNumber: ch.number, chapterTitle: ch.title, colorVar: ch.colorVar });
    });
  });
  return flat;
}

export function findUnit(unitId) {
  return getFlatUnits().find(u => u.id === unitId) || null;
}

export function findChapter(chapterId) {
  return CHAPTERS.find(ch => ch.id === chapterId) || null;
}

// היחידה שבאה מיד אחרי unitId ברצף הכולל (לא לפי שם, לפי הסדר במניפסט) —
// null אם זו היחידה האחרונה בקורס (המבחן המסכם).
export function getNextUnit(unitId) {
  const flat = getFlatUnits();
  const idx = flat.findIndex(u => u.id === unitId);
  if (idx === -1 || idx === flat.length - 1) return null;
  return flat[idx + 1];
}

// הפרק שבא מיד אחרי chapterId — null אם זה הפרק האחרון.
export function getNextChapter(chapterId) {
  const idx = CHAPTERS.findIndex(ch => ch.id === chapterId);
  if (idx === -1 || idx === CHAPTERS.length - 1) return null;
  return CHAPTERS[idx + 1];
}
