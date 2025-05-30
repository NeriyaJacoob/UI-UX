import React from "react";
import IDE from "../components/IDE";
import { useNavigate } from "react-router-dom";

const Practice = () => {
    const navigate = useNavigate();
  return (
    <div className="section">
      <h2>🧪 תרגול מעשי</h2>
      <p style={{ marginBottom: "20px" }}>
        למשל גנרי `with open("tmp/block_ransom", "w")` נסה לכתוב אנטי־וירוס שיזהה ויחסום את ההדבקה
      </p>
      <IDE />
        
        <br></br>
        <button   className="btn bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg mt-4"
 onClick={() => {
  fetch("http://127.0.0.1:5000/antivirus/clear", { method: "POST" })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(() => alert("שגיאה במחיקת אנטי וירוס"));
}}>
🧹 הסר אנטי וירוס
</button>
        <br></br>

<button className="btn" onClick={() => navigate("/")}>
          ⬅️ חזרה לתוכן הראשי
        </button>

    </div>
  );
};

export default Practice;
