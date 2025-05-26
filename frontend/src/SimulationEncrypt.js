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
      <p>סימולציה של הצפנת תיקייה ע&quot;י AES-256.</p>
<p>
  הקבצים מוצפנים חלקית (למשל רק ההתחלה שלהם), מה שמספיק כדי לשבש את הקריאה בהם. זו שיטה נפוצה כדי לחסוך זמן אך עדיין להזיק.
</p>
<p>
  🎯 <b>משימת התלמיד:</b> לבנות אנטי־וירוס שמזהה פתיחות קבצים מרובות או שינוי תוכן בינארי.
</p>

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
