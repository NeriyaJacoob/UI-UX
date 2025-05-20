import React from "react";
import IDE from "./IDE";  // ודא שהנתיב נכון
import { useNavigate } from "react-router-dom";

const Practice = () => {
    const navigate = useNavigate();
  return (
    <div className="section">
      <h2>🧪 תרגול מעשי</h2>
      <p style={{ marginBottom: "20px" }}>
        למשל גנרי `with open("/tmp/block_ransom", "w")` נסה לכתוב אנטי־וירוס שיזהה ויחסום את ההדבקה
      </p>
      <IDE />
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️ חזרה לתוכן הראשי
        </button>
    </div>
  );
};

export default Practice;
