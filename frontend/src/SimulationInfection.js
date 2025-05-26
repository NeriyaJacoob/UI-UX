import React from "react";
import { Link } from "react-router-dom";

const SimulationInfection = () => {
  const triggerInfection = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/infection", { method: "POST" });
      const data = await res.json();
      alert(data.status || data.error);
    } catch {
      alert("❌ שגיאה בהרצת הדבקה");
    }
  };

  return (
    <div className="section">
      <h2>🦠 סימולציית הדבקה</h2>

<p>
  הקוד מחפש קבצים קיימים (כגון `.py` או `.sh`) ומוסיף אליהם קוד הרצה של תוכנה זדונית. זה מאפשר לתוקף להסתתר מאחורי קבצים לגיטימיים.
</p>
<p>
  🎯 <b>משימת התלמיד:</b> לבדוק שינויים בקבצים, לחפש חתימות כמו `os.system(...)`, ולחסום הדבקה עתידית.
</p>


      <button className="btn" onClick={triggerInfection}>▶️ הפעל הדבקה</button>

      <br /><br />
      <Link to="/simulation">
        <button className="btn">⬅️ חזרה לרשימת סימולציות</button>
      </Link>
    </div>
  );
};

export default SimulationInfection;
