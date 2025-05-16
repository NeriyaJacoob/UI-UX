import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// עמודים שונים
import { useEffect, useState } from 'react';



const Theory = () => {
  const [text, setText] = useState("טוען תוכן...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/content/theory")
      .then(res => res.json())
      .then(data => setText(data.text))
      .catch(() => setText("❌ שגיאה בטעינת תוכן"));
  }, []);

  return (
    <div className="section">
      {text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
    </div>
  );
};
const Simulation = () => {
  const [folder, setFolder] = useState('');
  const [key, setKey] = useState('');

  const encrypt = async () => {
    if (!folder) return alert("📁 יש להזין נתיב תיקייה");
    try {
      const res = await fetch("http://127.0.0.1:5000/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder })
      });
      const data = await res.json();
      alert(`✅ הצפנה בוצעה על ${data.folder}`);
    } catch {
      alert("❌ שגיאה בעת הצפנה");
    }
  };

  const decrypt = async () => {
    if (!folder || !key) return alert("🛑 יש להזין גם תיקייה וגם מפתח");
    try {
      const res = await fetch("http://127.0.0.1:5000/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, key })
      });
      const data = await res.json();
      alert(`🔓 פיענוח בוצע על ${data.folder}`);
    } catch {
      alert("❌ שגיאה בעת פיענוח");
    }
  };

  return (
    <div className="section">
      <h2>💣 סימולציית תקיפה</h2>
      <input
        type="text"
        placeholder="📁 נתיב תיקייה"
        value={folder}
        onChange={e => setFolder(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <input
        type="text"
        placeholder="🔑 מפתח HEX לפיענוח"
        value={key}
        onChange={e => setKey(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "20px" }}
      />
      <br />
      <button className="btn" onClick={encrypt}>🛡 הפעל הצפנה</button>
      <button className="btn" onClick={decrypt} style={{ marginRight: "10px" }}>🔓 הפעל פיענוח</button>
    </div>
  );
};
const Practice = () => {
  const [folder, setFolder] = useState('');
  const [key, setKey] = useState('');
  const [log, setLog] = useState('');

  const handleEncrypt = async () => {
    if (!folder) return alert("📁 נא למלא נתיב תיקייה");
    try {
      const res = await fetch("http://127.0.0.1:5000/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder })
      });
      const data = await res.json();
      setLog(`✅ הצפנה הושלמה על ${data.folder}`);
    } catch {
      setLog("❌ שגיאה בהצפנה");
    }
  };

  const handleDecrypt = async () => {
    if (!folder || !key) return alert("🔑 יש להזין מפתח ותיקייה");
    try {
      const res = await fetch("http://127.0.0.1:5000/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, key })
      });
      const data = await res.json();
      setLog(`🔓 פיענוח הושלם על ${data.folder}`);
    } catch {
      setLog("❌ שגיאה בפיענוח");
    }
  };

  return (
    <div className="section">
      <h2>🧪 תרגול מעשי</h2>

      <input
        type="text"
        placeholder="📁 נתיב לתיקייה"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <input
        type="text"
        placeholder="🔑 מפתח HEX לפיענוח"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "20px" }}
      />
      <br />
      <button className="btn" onClick={handleEncrypt}>💣 הצפן</button>
      <button className="btn" onClick={handleDecrypt} style={{ marginRight: "10px" }}>🔓 פענח</button>

      {log && <div style={{ marginTop: "30px", color: "#66ff99" }}>{log}</div>}
    </div>
  );
};
const Tools = () => {
  const [key, setKey] = useState('');

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

      {key && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ wordBreak: "break-all", color: "#66ffcc" }}>{key}</p>
          <button className="btn" onClick={copyToClipboard}>📋 העתק</button>
        </div>
      )}
    </div>
  );
};
const Summary = () => {
  const [logs, setLogs] = useState("טוען...");

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
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>🧠 לומדת סימולציות Ransomware – <span className="highlight">ByteMe</span></h1>
        </header>

        <nav className="menu">
          <Link to="/theory"><button className="btn">📘 תיאוריה כללית</button></Link>
          <Link to="/simulation"><button className="btn">💣 סימולציות</button></Link>
          <Link to="/practice"><button className="btn">🧪 תרגול מעשי</button></Link>
          <Link to="/tools"><button className="btn">🛠 כלים נוספים</button></Link>
          <Link to="/summary"><button className="btn">📊 סיכום וסטטיסטיקות</button></Link>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/theory" element={<Theory />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/" element={<div className="welcome">👋 ברוכים הבאים ללומדת ByteMe</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
