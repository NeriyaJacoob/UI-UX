import { useEffect, useState } from "react";
import "./styles/Summary.css";

const Summary = () => {
  const [logs, setLogs] = useState("טוען...");
  
  const [stats, setStats] = useState({
  theory_completed: false,
  quiz_score: 0,
  simulations_blocked: [],
  detection_accuracy: 0,
  theory_progress_percent: 0
});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/summary/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs);
        setStats(data.stats);
      })
      .catch(() => setLogs("❌ שגיאה בטעינת הלוגים"));
  }, []);

  const clearLogs = () => {
    fetch("http://127.0.0.1:5000/summary/clear", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setLogs("");
          alert("🗑️ הלוגים נמחקו בהצלחה");
        } else {
          alert("❌ שגיאה במחיקת הלוג: " + data.message);
        }
      })
      .catch(() => alert("❌ שגיאה בתקשורת עם השרת"));
  };

  return (
    <div className="summaryContainer">
      <div className="summarySection">
        <h3>📊 סטטיסטיקות למידה</h3>
        {stats && (
          <>
            <div className="summaryItem">
              <span>📊 התקדמות בתיאוריה:</span>
              <span>{stats.theory_progress_percent}%</span>
            </div>
            <div className="summaryItem">
              <span>📝 ציון במבדק:</span>
              <span>{stats.quiz_score}%</span>
            </div>
            <div className="summaryItem">
              <span>🛡️ סימולציות שנחסמו:</span>
              <span>{(stats.simulations_blocked?.length > 0) ? stats.simulations_blocked.join(", ") : "❌ לא"}</span>

            </div>
            <div className="summaryItem">
              <span>🎯 אחוז דיוק בזיהוי:</span>
              <span>{stats.detection_accuracy}%</span>
            </div>
          </>
        )}
      </div>

      <div className="summarySection">
        <h3>🧾 היסטוריית סימולציות</h3>
        <div className="logList">
          {logs.split('\n').filter(Boolean).map((line, i) => {
  let bgColor = "#eee";
  let textColor = "#333";

  if (line.startsWith("[SUCCESS]")) {
    bgColor = "#d0f5e4";
    textColor = "#006644";
  } else if (line.startsWith("[FAIL]")) {
    bgColor = "#ffd6d6";
    textColor = "#990000";
  } else if (line.startsWith("[SYSTEM]")) {
    bgColor = "#fff4cc";
    textColor = "#996600";
  }

  return (
    <div
      key={i}
      className="logCard"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {line}
    </div>
  );
})}


        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button className="btn bg-red-700 hover:bg-red-800 text-white" onClick={clearLogs}>
            🗑️ מחק היסטוריה
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
