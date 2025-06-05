import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import "./styles/Summary.css";

const Summary = () => {
  const [logs, setLogs] = useState("טוען...");
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://127.0.0.1:5000/summary/logs")
      .then(res => res.json())
      .then(data => setLogs(data.logs))
      .catch(() => setLogs("❌ שגיאה בטעינת הלוגים"));
  }, []);

  return (
    <div className="section">
      <h2>📊 סיכום וסטטיסטיקות שימוש</h2>
<div className="logsBox">
    {logs.split('\n').filter(Boolean).map((line, i) => {
    let color = "#ccc"; // ברירת מחדל
    if (line.startsWith("[SUCCESS]")) color = "lightgreen";
    else if (line.startsWith("[FAIL]")) color = "salmon";
    else if (line.startsWith("[SYSTEM]")) color = "gold";

    return <p key={i} className="logLine" style={{ color }}>{line}</p>;
  })}
</div>

      <button className="btn bg-red-700 hover:bg-red-800 text-white mt-4" onClick={() => {
  fetch("http://127.0.0.1:5000/summary/clear", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        setLogs(""); // נקה את התצוגה
        alert("🗑️ הלוגים נמחקו בהצלחה");
      } else {
        alert("❌ שגיאה במחיקת הלוג: " + data.message);
      }
    })
    .catch(() => alert("❌ שגיאה בתקשורת עם השרת"));
}}>
🗑️ מחק היסטוריה
</button>
<br></br>
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️ חזרה לתוכן הראשי
        </button>
    </div>
  );
};
export default Summary;
