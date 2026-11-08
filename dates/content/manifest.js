// ===== מקור האמת היחיד למבנה הקורס =====
// כל פרק ויחידה מוגדרים כאן פעם אחת. גם מפת המסלול וגם לוגיקת הנעילה
// קוראות מהרשימה הזאת בלבד. להוספת יחידה: אובייקט חדש ל-units + קובץ
// תוכן תחת content/chX/. אין צורך לגעת בשום קובץ אחר.
//
// 27.10: נוצרה מפיצול "פיבוט מתקדם" לשלוש לומדות באתר אחד (excel/):
// percent (אחוזים) · dates (תאריכים) · pivot (כלים לפיבוט ומשימה מסכמת).

// ⚠️ מזהה הקורס. ממנו נגזרים מפתחות ה-localStorage של התלמידות
// ('dates_data_v3' ו-'dates_current_key_v3'). שינוי הערך כאן
// אחרי שתלמידות כבר נכנסו = התקדמות שנראית להן כאילו נמחקה.
export const COURSE_ID = 'dates';

export const COURSE = {
  title: 'תאריכים',
  icon: '📅',
  welcome: {
    f: 'ברוכה הבאה ללומדת התאריכים! תאריך הוא מספר, ופיבוט שמקבץ לבד 📅',
    m: 'ברוך הבא ללומדת התאריכים! תאריך הוא מספר, ופיבוט שמקבץ לבד 📅',
  },
  finaleText: 'סיימת את לומדת התאריכים. פירוק, חישוב, תיקון תאריך שבור וקיבוץ בפיבוט בכיס 📅',
  teacherTitle: '📅 לוח מורה — תאריכים',

  // מצב כיתה, כמו ב-XLOOKUP: ?class=1 על מחשב המורה פותח את כל היחידות
  // ומסתיר XP, לשיעור פרונטלי בגבעול. ?class=0 מכבה. הקישור לתלמידות רגיל.
  classMode: true,
};

// אין אתגרי פטור (כמו ב-XLOOKUP). הנעילה לפי הסדר.
// התחנות הן יחידות lab בתוך הפרקים, עם כפתור הורדה לקובץ התרגול (נבנה ב-excel/_xlsx).
export const CHAPTERS = [
  {
    id: 'dt-ch1',
    number: 1,
    title: 'תאריכים',
    icon: '📅',
    colorVar: 'chapter-1',
    units: [
      // 7.11: פרק 1 נבנה מחדש על המצגת "שליטה בזמן" (הסבר ← משימה בגיליון ← שאלה). מזהים חדשים: אף תלמידה עוד לא עבדה עליו.
      { id: 'dt-ch1-u0', title: 'למה תאריכים? והאקסל שלנו', type: 'lesson', icon: '🗺️', estMinutes: 4, modulePath: 'ch1/ch1-u0-why.js' },
      { id: 'dt-ch1-u1', title: 'תאריך הוא מספר', type: 'lesson', icon: '🔢', estMinutes: 7, modulePath: 'ch1/ch1-u1-date-is-number.js' },
      { id: 'dt-ch1-u2', title: 'שעה היא חלק מיום', type: 'lesson', icon: '⏰', estMinutes: 7, modulePath: 'ch1/ch1-u2-time.js' },
      { id: 'dt-ch1-u3', title: 'להקליד נכון ולעצב', type: 'lesson', icon: '⌨️', estMinutes: 7, modulePath: 'ch1/ch1-u3-entry.js' },
      { id: 'dt-ch1-u4', title: 'תאריך שבור, ותאריכים לפני 1900', type: 'lesson', icon: '🩹', estMinutes: 9, modulePath: 'ch1/ch1-u4-broken.js' },
      { id: 'dt-ch1-u5', title: 'לפרק תאריך לחלקים', type: 'lesson', icon: '✂️', estMinutes: 7, modulePath: 'ch1/ch1-u5-parts.js' },
      { id: 'dt-ch1-u6', title: 'שם החודש במילים', type: 'lesson', icon: '🔤', estMinutes: 6, modulePath: 'ch1/ch1-u6-text.js' },
      { id: 'dt-ch1-u7', title: 'היום ועכשיו: ספירה ליום הולדת', type: 'lesson', icon: '🎂', estMinutes: 8, modulePath: 'ch1/ch1-u7-today.js' },
      { id: 'dt-ch1-u8', title: 'לבנות ולתקן תאריך', type: 'lesson', icon: '🧱', estMinutes: 8, modulePath: 'ch1/ch1-u8-build.js' },
      { id: 'dt-ch1-lab', title: 'תחנה 1: בלשית הזמן', type: 'lab', icon: '🕵️', estMinutes: 15, modulePath: 'ch1/ch1-lab-detective.js' },
      { id: 'dt-ch1-quiz', title: 'מבחן פרק: תאריכים', type: 'quiz', icon: '📝', estMinutes: 12, modulePath: 'ch1/ch1-quiz.js' },
    ],
  },
  {
    id: 'dt-ch2',
    number: 2,
    title: 'תאריכים בפיבוט',
    icon: '🗓️',
    colorVar: 'chapter-2',
    units: [
      { id: 'dt-ch2-u1', title: 'קיבוץ לשנים, רבעונים וחודשים', type: 'lesson', icon: '📦', estMinutes: 7, modulePath: 'ch2/ch2-u1-grouping.js' },
      { id: 'dt-ch2-u2', title: 'תאריך אחד שבור חוסם הכול', type: 'lesson', icon: '🚧', estMinutes: 5, modulePath: 'ch2/ch2-u2-blocked.js' },
      // 2.11: בקשת המורה, אפשרויות הסינון לפי שנים בפיבוט.
      { id: 'dt-ch2-filter', title: 'לסנן לפי שנה', type: 'lesson', icon: '🗓️', estMinutes: 6, modulePath: 'ch2/ch2-u4-year-filter.js' },
      { id: 'dt-ch2-u3', title: 'השוואה בין שנים: % הפרש מ...', type: 'lesson', icon: '↕️', estMinutes: 8, modulePath: 'ch2/ch2-u3-diff-from.js' },
      { id: 'dt-ch2-lab', title: 'תחנה 2: מתי לפרסם?', type: 'lab', icon: '⏰', estMinutes: 15, modulePath: 'ch2/ch2-lab-when-to-post.js' },
      { id: 'dt-ch2-quiz', title: 'מבחן מסכם: תאריכים בפיבוט', type: 'quiz', icon: '🏆', estMinutes: 8, modulePath: 'ch2/ch2-quiz.js', isGrandFinale: true },
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
