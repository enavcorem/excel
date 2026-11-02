// מבחן פרק 1: אחוזים. topic על כל שאלה מזין את "נושאים לחיזוק" ואת לוח המורה.
// מספרים חדשים, לא מהיחידות. 27.10: ירדו "35% מ-60" ומע"מ 177. נשארו 7 שאלות, 3 מספריות ועגולות, בלי מחשבון.
// בדיקה: 18/24 = 75%, 21/30 = 70%. 500 × 0.8 × 0.9 = 360. 72 / 0.9 = 80.
// בדיקה: (200 − 250) / 250 = −20%. 0.15 × 100 = 15 → בעיצוב % = 1500%.

export default {
  title: 'מבחן פרק: אחוזים',
  passMark: 70,
  questions: [
    {
      type: 'mc',
      topic: 'השוואה הוגנת',
      prompt: 'בכיתה א 18 מתוך 24 תלמידות עברו את הבוחן. בכיתה ב עברו 21 מתוך 30. באיזו כיתה אחוז ההצלחה גבוה יותר?',
      options: [
        { text: 'בכיתה א: 75% מול 70%', correct: true },
        { text: 'בכיתה ב, כי עברו בה יותר תלמידות', correct: false },
        { text: 'אי אפשר להשוות, כי מספר התלמידות שונה', correct: false },
        { text: 'אותו אחוז בשתיהן', correct: false },
      ],
      explanation: 'משווים חלק ÷ שלם: 18 ÷ 24 = 75%, ו-21 ÷ 30 = 70%. מספר מוחלט גבוה יותר לא אומר אחוז גבוה יותר.',
    },
    {
      type: 'mc',
      topic: 'הנחה בצעד אחד',
      prompt: 'המחיר בתא B4, ואחוז ההנחה בתא C4 (מעוצב כאחוז). איזו נוסחה מחזירה את המחיר אחרי ההנחה?',
      options: [
        { text: '<span class="ltr">=B4*C4</span>', correct: false },
        { text: '<span class="ltr">=B4-C4</span>', correct: false },
        { text: '<span class="ltr">=B4*(1-C4)</span>', correct: true },
        { text: '<span class="ltr">=B4*(C4-1)</span>', correct: false },
      ],
      explanation: 'אחרי הנחה משלמים את מה שנשאר: <span class="ltr">1-C4</span>. <span class="ltr">B4*C4</span> הוא גובה ההנחה, ו-<span class="ltr">B4-C4</span> מוריד שבר של שקל.',
    },
    {
      type: 'numeric',
      topic: 'הנחות ברצף',
      prompt: 'אוזניות עולות 500 ₪. יש עליהן 20% הנחה, ובקופה עוד 10% הנחה על המחיר החדש. כמה משלמים?',
      answer: 360,
      explanation: 'ההנחה השנייה על המחיר אחרי הראשונה: <span class="ltr">500 × 0.8 = 400</span>, ואז <span class="ltr">400 × 0.9 = 360</span>. זו הנחה כוללת של 28%, לא 30%.',
    },
    {
      type: 'numeric',
      topic: 'מחיר לפני הנחה',
      prompt: 'שילמת 72 ₪ אחרי 10% הנחה. מה היה המחיר המקורי?',
      answer: 80,
      explanation: '72 הם 90% מהמחיר המקורי. אחורה מחלקים: <span class="ltr">72 ÷ 0.9 = 80</span>.',
    },
    {
      type: 'numeric',
      topic: 'שינוי באחוזים',
      prompt: 'מספר המשתתפות בחוג ירד מ-250 ל-200. בכמה אחוז השתנה? (ירידה כותבים עם מינוס)',
      answer: -20,
      explanation: '<span class="ltr">(200 − 250) ÷ 250 = −20%</span>. מחלקים בערך הישן.',
    },
    {
      type: 'mc',
      topic: 'עיצוב אחוזים',
      prompt: 'בתא כתוב <span class="ltr">=B2/$B$10*100</span>, והתוצאה היא 15. אחר כך עיצבו את התא כאחוזים. מה יוצג?',
      options: [
        { text: '15%', correct: false },
        { text: '1500%', correct: true },
        { text: '0.15%', correct: false },
        { text: '15', correct: false },
      ],
      explanation: 'עיצוב אחוזים כופל ב-100 בתצוגה. התא שומר 15, ולכן מוצג 1500%. או כפול 100, או עיצוב אחוזים — לא שניהם.',
    },
    {
      type: 'mc',
      topic: 'חלק יחסי וקיבוע',
      prompt: 'ההכנסות בתאים B2:B7, והסה"כ בתא B8. איזו נוסחה כותבים ב-C2 וגוררים למטה, כדי לקבל את החלק של כל שורה מהסה"כ?',
      options: [
        { text: '<span class="ltr">=B2/B8</span>', correct: false },
        { text: '<span class="ltr">=B2/$B$8</span>', correct: true },
        { text: '<span class="ltr">=$B$2/B8</span>', correct: false },
        { text: '<span class="ltr">=B2*$B$8</span>', correct: false },
      ],
      explanation: 'החלק זז עם השורה, והשלם קבוע. בלי <span class="ltr">$</span> הסה"כ יזוז לתא ריק, ויופיע <span class="ltr">#DIV/0!</span>.',
    },
  ],
};
