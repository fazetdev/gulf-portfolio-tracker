import React from 'react';
import './Layout.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>🇸🇦 Gulf Portfolio Journey</h1>
        <p>Documenting my 4-project journey to master Gulf market development</p>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">4</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">🇳🇬 → 🇸🇦</span>
            <span className="stat-label">Perspective</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Focus</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
