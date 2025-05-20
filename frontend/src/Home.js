import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
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
  </div>
);
