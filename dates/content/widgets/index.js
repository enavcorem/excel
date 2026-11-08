// ===== רישום הבלוקים הייחודיים ללומדת פיבוט מתקדם =====
// המנוע מייבא את הקובץ הזה תמיד, פעם אחת לפני הניתוב הראשון. אל תמחקי אותו.
// צבעים של הקורס — טוקנים על :root ב-pivot.css, לא inline.
//
// מאיפה הבלוקים:
//   sheet, fn-card, steps, shot, operators — הועתקו מלומדת ארגז הכלים (התבנית הפדגוגית)
//   download                               — כמו בלומדת XLOOKUP (כפתור הורדה לתחנה)
//   pivot-demo                             — חדש: טבלת ציר חיה, המקביל ל-xlookup-demo

import { registerBlockRenderer } from '../../js/engine/blocks.js';

import { renderSheet } from './sheet.js';
import { renderFnCard } from './fn-card.js';
import { renderSteps } from './steps.js';
import { renderShot } from './shot.js';
import { renderDownload } from './download.js';
import { renderPivotDemo } from './pivot-demo.js';
import { enlargeOperators } from './operators.js';
import './dt-widgets.js'; // day-axis, day-bar, bday-count (נרשמים בתוך הקובץ)

registerBlockRenderer('sheet', renderSheet);
registerBlockRenderer('fn-card', renderFnCard);
registerBlockRenderer('steps', renderSteps);
registerBlockRenderer('shot', renderShot);
registerBlockRenderer('download', renderDownload);
registerBlockRenderer('pivot-demo', renderPivotDemo);

// רק בדפדפן (validate-content טוען את הקובץ הזה גם ב-Node)
if (typeof document !== 'undefined') enlargeOperators();
