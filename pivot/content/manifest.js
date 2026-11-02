// ===== מקור האמת היחיד למבנה הקורס =====
// כל פרק ויחידה מוגדרים כאן פעם אחת. גם מפת המסלול וגם לוגיקת הנעילה
// קוראות מהרשימה הזאת בלבד. להוספת יחידה: אובייקט חדש ל-units + קובץ
// תוכן תחת content/chX/. אין צורך לגעת בשום קובץ אחר.
//
// 27.10: נוצרה מפיצול "פיבוט מתקדם" לשלוש לומדות באתר אחד (excel/):
// percent (אחוזים) · dates (תאריכים) · pivot (כלים לפיבוט ומשימה מסכמת).

// ⚠️ מזהה הקורס. ממנו נגזרים מפתחות ה-localStorage של התלמידות
// ('pivot_data_v3' ו-'pivot_current_key_v3'). שינוי הערך כאן
// אחרי שתלמידות כבר נכנסו = התקדמות שנראית להן כאילו נמחקה.
export const COURSE_ID = 'pivot';

export const COURSE = {
  title: 'פיבוט מתקדם',
  icon: '🥧',
  welcome: {
    f: 'ברוכה הבאה לפיבוט מתקדם! מסננים, שדה מחושב, ומשימה מסכמת על הקיוסק 🥧',
    m: 'ברוך הבא לפיבוט מתקדם! מסננים, שדה מחושב, ומשימה מסכמת על הקיוסק 🥧',
  },
  finaleText: 'סיימת את פיבוט מתקדם. אחוזים, תאריכים וכלים לפיבוט, הכול בכיס 🥧',
  teacherTitle: '🥧 לוח מורה — פיבוט מתקדם',

  // מצב כיתה, כמו ב-XLOOKUP: ?class=1 על מחשב המורה פותח את כל היחידות
  // ומסתיר XP, לשיעור פרונטלי בגבעול. ?class=0 מכבה. הקישור לתלמידות רגיל.
  classMode: true,
};

// הלומדה הזו באה אחרי האחוזים והתאריכים: המבחן המסכם שואל על שלושתן.
// אין אתגרי פטור (כמו ב-XLOOKUP). הנעילה לפי הסדר.
// התחנות הן יחידות lab בתוך הפרקים, עם כפתור הורדה לקובץ התרגול (נבנה ב-excel/_xlsx).
export const CHAPTERS = [
  {
    id: 'pv-ch1',
    number: 1,
    title: 'כלים לפיבוט',
    icon: '🎛️',
    colorVar: 'chapter-1',
    units: [
      { id: 'pv-ch1-u1', title: 'מסננים וכלי פריסה (Slicer)', type: 'lesson', icon: '🎚️', estMinutes: 6, modulePath: 'ch1/ch1-u1-slicers.js' },
      { id: 'pv-ch1-u2', title: 'שדה מחושב', type: 'lesson', icon: '🧪', estMinutes: 7, modulePath: 'ch1/ch1-u2-calculated-field.js' },
      { id: 'pv-ch1-quiz', title: 'מבחן פרק: כלים לפיבוט', type: 'quiz', icon: '📝', estMinutes: 6, modulePath: 'ch1/ch1-quiz.js' },
    ],
  },
  {
    id: 'pv-ch2',
    number: 2,
    title: 'משימה מסכמת ומבחן',
    icon: '🏆',
    colorVar: 'chapter-2',
    units: [
      { id: 'pv-ch2-mission', title: 'משימה מסכמת: הקיוסק של בית הספר', type: 'lab', icon: '🥪', estMinutes: 35, modulePath: 'ch2/ch2-mission.js' },
      { id: 'pv-ch2-final', title: 'מבחן מסכם', type: 'quiz', icon: '🏆', estMinutes: 12, modulePath: 'ch2/ch2-final.js', isGrandFinale: true },
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
