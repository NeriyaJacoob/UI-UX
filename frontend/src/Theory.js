import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Theory = () => {
  const [text, setText] = useState("טוען תוכן...");
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://127.0.0.1:5000/content/theory")
      .then(res => res.json())
      .then(data => setText(data.text))
      .catch(() => setText("❌ שגיאה בטעינת תוכן"));
  }, []);

  return (
    <div className="section">
      {text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️ חזרה לתוכן הראשי
        </button>
    </div>
  );
};
export default Theory;
