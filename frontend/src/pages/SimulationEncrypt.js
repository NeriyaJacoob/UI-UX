import React, { useState } from "react";
import { Link } from "react-router-dom";


const SimulationEncrypt = () => {
  const [folder, setFolder] = useState("");

  const encrypt = async () => {
    if (!folder) return alert("📁 נא למלא נתיב");
    try {
      const res = await fetch("http://127.0.0.1:5000/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder })
      });
      const data = await res.json();
      alert(`✅ הוצפן: ${data.folder}`);
    } catch {
      alert("❌ שגיאה בהצפנה");
    }
  };

  return (
    <div className="section">
      <h2>🛡️ הצפנת קבצים</h2>
      <div className="simulation-info">
  <h3>🧠 מטרת הסימולציה</h3>
  <p>
    לדמות תהליך הצפנה של תיקייה במחשב הקורבן – בדיוק כפי שכופרה אמיתית מבצעת.
    ההצפנה מבוצעת חלקית (למשל על 4KB ראשונים בכל קובץ), כדי לשבש גישה במהירות.
  </p>

  <h3>🔐 על חשיבות המפתח</h3>
  <p>
    מפתח ההצפנה הוא הלב של התהליך. אם התוקף שומר אותו זמנית בזיכרון או בקובץ זמני – ניתן לעיתים "לגנוב" אותו
    ולפענח את הקבצים גם בלי לשלם.
  </p>

  <h3>📉 חולשות אפשריות של כופרות</h3>
  <ul>
    <li>מפתח שנשאר בזיכרון ה־RAM</li>
    <li>קובץ זמני שלא נמחק</li>
    <li>תיעוד בלוגים של הפעולה</li>
  </ul>

  <h3>🎯 משימת התלמיד</h3>
  <p>
    לזהות בזמן אמת מתי תהליך מתחיל לגשת לקבצים רבים, לבצע הצפנה, או להטעין מפתח לזיכרון.
    פיתוח אנטי־וירוס שיכול לעצור את זה לפני שההצפנה מתבצעת לגמרי.
  </p>
</div>


      <input
        type="text"
        placeholder="📁 נתיב תיקייה"
        value={folder}
        onChange={e => setFolder(e.target.value)}
      />
      <button className="btn" onClick={encrypt}>🚀 הפעל הצפנה</button>
      <br />
      <button className="btn bg-green-700 hover:bg-green-800 text-white mt-4" onClick={() => {
  fetch("http://127.0.0.1:5000/decrypt", { method: "POST" })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(() => alert("❌ שגיאה בפיענוח הקבצים"));
}}>
🔓 פענח קבצים
</button>
<br /><br />
      <Link to="/simulation">
        <button className="btn" style={{ marginTop: "30px" }}>⬅️ חזרה לסימולציות</button>
      </Link>
    </div>
  );
};

export default SimulationEncrypt;
