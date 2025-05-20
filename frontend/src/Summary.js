import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';

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
      <pre style={{ background: "#1a1a1a", padding: "20px", borderRadius: "8px", textAlign: "left", direction: "ltr", color: "#ccc" }}>
        {logs}
      </pre>
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️ חזרה לתוכן הראשי
        </button>
    </div>
  );
};
export default Summary;
