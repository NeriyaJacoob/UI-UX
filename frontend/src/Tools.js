import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const [key, setKey] = useState('');
  const navigate = useNavigate();


  const generateKey = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/generate-key");
      const data = await res.json();
      setKey(data.key);
    } catch {
      setKey("❌ שגיאה ביצירת מפתח");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    alert("🔑 מפתח הועתק");
  };

  return (
    <div className="section">
      <h2>🔐 יצירת מפתח הצפנה</h2>
      <button className="btn" onClick={generateKey}>🎲 צור מפתח חדש (AES-256)</button>
      <br/>
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️ חזרה לתוכן הראשי
        </button>
      {key && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ wordBreak: "break-all", color: "#66ffcc" }}>{key}</p>
          <button className="btn" onClick={copyToClipboard}>📋 העתק</button>
        </div>
      )}
    </div>
  );
};
export default Tools;
