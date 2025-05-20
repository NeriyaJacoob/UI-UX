// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

import Home from './Home';
import Theory from './Theory';
import Practice from './Practice';
import Simulation from './Simulation';
import Tools from './Tools';
import Summary from './Summary';
import SimulationEncrypt from './SimulationEncrypt';
import SimulationRansom from './SimulationRansom';
import SimulationInfection from './SimulationInfection';





function App() {
  const location = useLocation();
  const isMainMenu = location.pathname === "/";

  return (
    <div className="container">
      <header>
        <h1>
          לומדת סימולציות Ransomware – <span className="highlight">ByteMe</span>
        </h1>
      </header>

      {/* תפריט ראשי – רק בעמוד הבית */}
      {isMainMenu && (
        <nav className="menu">
          <Link to="/theory"><button className="btn">📘 תיאוריה כללית</button></Link>
          <Link to="/simulation"><button className="btn">💣 סימולציות</button></Link>
          <Link to="/practice"><button className="btn">🧪 תרגול מעשי</button></Link>
          <Link to="/tools"><button className="btn">🛠 כלים נוספים</button></Link>
          <Link to="/summary"><button className="btn">📊 סיכום וסטטיסטיקות</button></Link>
        </nav>
      )}

      {/* תוכן העמודים */}
      <main className="content">
        <Routes>
          <Route path="/" element={<></>} /> {/* ריק – רק תפריט מוצג */}
          <Route path="/theory" element={<Theory />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/simulation/encrypt" element={<SimulationEncrypt />} />
          <Route path="/simulation/ransom" element={<SimulationRansom />} />
          <Route path="/simulation/infection" element={<SimulationInfection />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
