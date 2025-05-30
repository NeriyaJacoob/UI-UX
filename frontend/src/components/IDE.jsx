import React, { useState, useEffect } from "react";

export default function IDE() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/antivirus/code")  // חדש
      .then(res => res.text())
      .then(text => setCode(text));
  }, []);

 const runCode = async () => {
  try {
    // שלב 1: שמור את הקוד הנוכחי
    await fetch("http://127.0.0.1:5000/save-antivirus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    // שלב 2: הרץ את הקובץ
    const res = await fetch("http://127.0.0.1:5000/run-antivirus", {
      method: "POST",
    });
    const data = await res.json();
    setOutput(data.result || data.error || "אין פלט");
  } catch {
    setOutput("❌ שגיאה בהרצה");
  }
};


  return (
    <div style={{ display: "flex", height: "500px", border: "1px solid #555", borderRadius: "10px", overflow: "hidden" }}>
      <textarea
  value={code}
  onChange={e => setCode(e.target.value)}  // הוסף זאת
  style={{
    width: "50%", background: "#1e1e1e", color: "#d4d4d4", fontFamily: "monospace",
    padding: "15px", fontSize: "16px", border: "none", outline: "none"
  }}
/>

      <div style={{ width: "50%", background: "#000", color: "#00ff88", padding: "15px", fontFamily: "monospace", fontSize: "16px" }}>
        <div style={{ marginBottom: "10px", color: "#fff" }}>
          <button onClick={runCode} style={{ background: "#28a745", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            ▶️ הרץ אנטי וירוס
          </button>
        </div>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
