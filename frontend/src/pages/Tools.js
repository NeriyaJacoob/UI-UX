import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./styles/Tools.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:5000";

const Tools = () => {
  const [key, setKey] = useState('');
  const navigate = useNavigate();


  const generateKey = async () => {
    try {
      const res = await fetch(`${API_BASE}/generate-key`);
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
        <div className="keyContainer">
          <p className="keyText">{key}</p>
          <button className="btn" onClick={copyToClipboard}>📋 העתק</button>
        </div>
      )}
    </div>
  );
};
export default Tools;
