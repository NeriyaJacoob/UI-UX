import { useNavigate } from "react-router-dom";
import React from "react";

import "../styles/attack-stages.css";

const stages = [
  { title: "החדירה למערכת", img: "/images/Untitled.jpeg", path: "/theory/injection" },
  { title: "הדבקה", img: "/images/infect.jpg", path: "/theory/infection" },
  { title: "תקיפה", img: "/images/attack.jpg", path: "/theory/attack" },
  { title: "דרישת כופר", img: "/images/ransom.jpg", path: "/theory/ransom" }
];

const Theory = () => {
  const navigate = useNavigate();

  return (
  <div>
    <div className="diagram-container">
      {stages.map((stage, i) => (
        <React.Fragment key={stage.title}>
          {i !== 0 && (
            <img
              src="/images/arrow.jpg"
              alt="arrow"
              className="arrow-icon"
            />
          )}
          <div className="stage-card">
            <img src={stage.img} alt={stage.title} className="stage-icon" />
            <div className="stage-title">{stage.title}</div>
            <button className="stage-button" onClick={() => navigate(stage.path)}>
              סיכונים
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>

    <div className="ransomware-info">
      <h2>🔐 מהי תוכנת כופר?</h2>
      <p>
        תוכנת כופר (Ransomware) היא נוזקה שמצפינה את הקבצים במחשב הקורבן ודורשת תשלום (בדרך כלל במטבעות קריפטוגרפיים)
        בתמורה למפתח הפענוח. לעיתים, הכופרה גם מאיימת להדליף מידע רגיש אם לא יבוצע תשלום.
      </p>

      <h2>🎯 מטרת הלומדה</h2>
      <p>
        הלומדה נבנתה כדי ללמד אותך כיצד Ransomware פועל בשלבים — חדירה, הדבקה, תקיפה ודרישת כופר — ולתת לך כלים לזהות,
        להבין, ולבלום כל שלב בתהליך. בכל שלב תוכל לקרוא, לצפות בסימולציות, ולבצע תרגול מעשי.
      </p>

      <h2>🚀 איך להפעיל משימות בהצלחה?</h2>
      <ul>
        <li>📘 קרא היטב את ההסבר התיאורטי בכל שלב</li>
        <li>💣 עבור לסימולציה כדי לראות את ההתקפה מתבצעת</li>
        <li>🧪 נסה לזהות ולהגיב במצב תרגול (למשל לזהות קובץ נגוע או לחסום אותו)</li>
        <li>📊 בסוף, עבור לסיכום כדי לראות את הביצועים שלך ולקבל המלצות</li>
      </ul>
    </div>
    <button className="btn" onClick={() => navigate("/")}>
  ⬅️ חזרה לתוכן העניינים
</button>

  </div>
);

};

export default Theory;
