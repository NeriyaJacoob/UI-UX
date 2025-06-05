import React from "react";
import { Link } from "react-router-dom";
import "./styles/SimulationRansom.css";


const SimulationRansom = () => {
  const triggerRansom = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/test-ransom", { method: "POST" });
      const data = await res.json();
      alert(data.status || data.error);
    } catch {
      alert("❌ שגיאה בהרצת דרישת הכופר");
    }
  };

  return (
    <div className="section">
      <h2>💣 דרישת כופר</h2>
      <p>מציג דרישת כופר ואת הקוד הגרפי.</p>
      <p>
  לאחר הצפנה מוצגת הודעת כופר גרפית במסך מלא, כדי להלחיץ את המשתמש לשלם. זו התנהגות שכיחה של תוכנות כופר בעולם האמיתי.
</p>
<p>
  🎯 <b>משימת התלמיד:</b> לזהות תהליך עם GUI חשוד או קובץ שמפעיל ממשק גרפי לאחר שינוי בהרשאות.
</p>

      <button className="btn" onClick={triggerRansom}>▶️ הפעל דרישה</button>
      <br /><br />
      <Link to="/simulation">
        <button className="btn returnBtn">⬅️ חזרה לסימולציות</button>
      </Link>
    </div>
  );
};

export default SimulationRansom;
