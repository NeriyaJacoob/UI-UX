import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Simulation.css";

const Simulation = () => {
  const navigate = useNavigate();

  return (
    <div className="section">
      <h2>💣 סימולציות תקיפה</h2>
      <p className="marginBottom20">
        בחר סימולציה כדי לצפות בדוגמה ולהתמודד עם המשימה:
      </p>

      <div className="buttonsContainer">
        <button className="btn" onClick={() => navigate("/simulation/encrypt")}>
          🛡️ הצפנת קבצים
        </button>
        <button className="btn" onClick={() => navigate("/simulation/ransom")}>
          💣 דרישת כופר
        </button>
        <button className="btn" onClick={() => navigate("/simulation/infection")}>
          🧬 הדבקת קבצים
        </button>
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️ חזרה לתוכן הראשי
        </button>
      </div>
    </div>
  );
};

export default Simulation;
