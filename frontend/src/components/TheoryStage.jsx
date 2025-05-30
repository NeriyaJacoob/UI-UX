import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "החדירה למערכת",
    description: "בשלב זה, תוכנת הכופר חודרת למחשב הקורבן באמצעות נקודות תורפה, הורדות מזויפות או שימוש בסיסמאות גנובות.",
    risks: [
      "גישה מרחוק דרך RDP פתוח",
      "קבצי התקנה חשודים באימיילים",
      "תוספים זדוניים לדפדפן"
    ]
  },
  {
    title: "הדבקה",
    description: "בשלב זה הקובץ הנגוע פועל ומתחיל לשכפל את עצמו, לקבוע התמדה ולעקוף הגנות בסיסיות.",
    risks: [
      "הרצת קובץ ללא אימות חתימה",
      "גישה להרשאות ניהול",
      "אנטי וירוס כבוי או מוסר"
    ]
  },
  {
    title: "תקיפה",
    description: "הכופר מצפין את הקבצים, משבית תהליכים קריטיים ואף מוחק גיבויים.",
    risks: [
      "הצפנת קבצי מערכת וגיבויים",
      "חסימת גישה לכלים חיוניים",
      "מחיקת Shadow Copies"
    ]
  },
  {
    title: "דרישת כופר",
    description: "הכופר מציג דרישת תשלום (בדרך כלל בקריפטו) לשחרור הקבצים.",
    risks: [
      "הפסד מידע רגיש",
      "הדלפת מידע אם לא משולמת דרישה",
      "חוסר ודאות לגבי שחזור הקבצים"
    ]
  }
];

const TheoryStage = ({ stageIndex = 0 }) => {
  const navigate = useNavigate();
  const section = sections?.[stageIndex];

  if (!section) return <div>שגיאה: שלב לא קיים</div>;

  const { title, description, risks } = section;


  return (
  <div className="section">
    <h2>{title}</h2>
    <p>{description}</p>
    <h3>סיכונים עיקריים:</h3>
    <ul>
      {risks.map((risk, i) => (
        <li key={i}>{risk}</li>
      ))}
    </ul>

    {/* ✨ תוכן חכם נוסף לשלב החדירה */}
    {stageIndex === 0 && (
      <div className="attack-methods">
        <h3>🧠 שיטות חדירה נפוצות שכדאי לזהות:</h3>
        <p>כדי לאתר חדירה בתחילתה, חשוב להכיר את הטכניקות הנפוצות:</p>
        <ul>
          <li><strong>פישינג באימייל:</strong> שליחת קובץ ZIP או DOC עם קוד זדוני</li>
          <li><strong>RDP פתוח:</strong> פורטים פתוחים ללא אימות חזק</li>
          <li><strong>ניצול פרצות (Exploits):</strong> שימוש ב־SMB, פרצות ישנות (EternalBlue)</li>
          <li><strong>התחזות לעדכון:</strong> כמו NotPetya שזייף עדכון תוכנה</li>
          <li><strong>מאקרו ב־Word:</strong> פתיחת מסמך שמפעיל סקריפט</li>
          <li><strong>USB נגוע:</strong> הדבקה דרך התקנים פיזיים</li>
        </ul>
        <p className="hint">🔒 בשלב המעשי תצטרך לזהות ניסיונות כאלה ולחסום אותם.</p>
      </div>
    )}
    {stageIndex === 1 && (
  <div className="attack-methods">
    <h3>🧬 איך כופרה שורדת במערכת:</h3>
    <p>לאחר החדירה, התוקף מבצע מהלכים להעמקת הנוכחות:</p>
    <ul>
      <li>✅ יצירת משימות מתוזמנות (Scheduled Tasks) להרצה אוטומטית</li>
      <li>✅ הוספת קובץ ל־Startup או Registry</li>
      <li>✅ שכפול לקבצים תמימים או מוסתרים</li>
      <li>✅ התחזות לתהליכים לגיטימיים (svchost, explorer)</li>
      <li>✅ עקיפת אנטי-וירוס באמצעות obfuscation או packing</li>
    </ul>
    <p className="hint">🔒 בשלב המעשי תידרש לזהות תהליך חריג או קובץ שמנסה להתמיד — בדיוק כך נראית הדבקה.</p>
  </div>
)}
{stageIndex === 2 && (
  <div className="attack-methods">
    <h3>🧨 שלב ההצפנה והפגיעה:</h3>
    <p>בשלב זה הכופרה פועלת בפועל — לרוב בשקט:</p>
    <ul>
      <li>✅ סריקת תיקיות וקבצים לפי סיומות נפוצות</li>
      <li>✅ הצפנת כל קובץ באמצעות AES או RSA (לפעמים גם ChaCha)</li>
      <li>✅ מחיקת קבצי גיבוי (`.bak`, `shadow copies`, `restore points`)</li>
      <li>✅ עצירת שירותים חשובים כמו מסדי נתונים, אנטי וירוס, או קבצי Office פתוחים</li>
    </ul>
    <p className="hint">🔒 ככל שתזהה את ההצפנה מהר יותר — כך תוכל למנוע אובדן מידע.</p>
  </div>
)}
{stageIndex === 3 && (
  <div className="attack-methods">
    <h3>💸 הצגת הדרישה והשליטה בקורבן:</h3>
    <p>בשלב הסופי, המטרה ברורה — להפעיל לחץ פסיכולוגי ולשלוט במידע:</p>
    <ul>
      <li>✅ יצירת קובץ README בכל תיקייה עם הוראות תשלום</li>
      <li>✅ הצגת מסך נעילה (lockscreen) שמונע גישה רגילה למחשב</li>
      <li>✅ שימוש ב־Tor או dark web ליצירת קשר עם התוקף</li>
      <li>✅ במקרים מתקדמים: הדלפת מידע אם הקורבן לא משלם</li>
    </ul>
    <p className="hint">🔒 אל תסמוך על התוקף — גם אחרי תשלום אין הבטחה לשחזור. הפתרון הוא הגנה מראש.</p>
  </div>
)}


    <button className="btn" onClick={() => navigate("/theory")}>⬅️ חזרה</button>
  </div>
);
};


export default TheoryStage;
