import React from "react";
import { Link } from "react-router-dom";
import MatrixBackground from "../components/MatrixBackground";

const SimulationInfection = () => {
  const triggerInfection = async () => {
  try {
    // שלב 1: הרצת האנטי וירוס
    await fetch("http://127.0.0.1:5000/run-antivirus", { method: "POST" });

    // שלב 2: הרצת סימולציית הדבקה
    const res = await fetch("http://127.0.0.1:5000/infection", { method: "POST" });
    const data = await res.json();

    alert(data.status || data.error);
  } catch {
    alert("❌ שגיאה בהרצת הדבקה");
  }
};


  return (
    <div className="relative overflow-hidden min-h-screen text-white">
      <MatrixBackground />

      <div className="relative z-10 section">
        <h2>🦠 סימולציית הדבקה</h2>

        <p>
          הקוד מחפש קבצים קיימים (כגון `.py` או `.sh`) ומוסיף אליהם קוד הרצה של תוכנה זדונית...
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
    </div>
  );
};

export default SimulationInfection;
