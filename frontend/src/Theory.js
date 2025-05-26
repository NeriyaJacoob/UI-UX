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

const TheoryStage = ({ stageIndex }) => {
  const navigate = useNavigate();
  const { title, description, risks } = sections[stageIndex];

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
      <button className="btn" onClick={() => navigate("/theory")}>⬅️ חזרה</button>
    </div>
  );
};

export default TheoryStage;
