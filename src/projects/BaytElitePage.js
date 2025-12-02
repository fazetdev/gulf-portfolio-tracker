import React, { useState } from 'react';
import './ProjectPage.css';

function BaytElitePage({ onBack }) {
  const [progress, setProgress] = useState(25);
  const [features, setFeatures] = useState([
    { id: 1, name: 'Dynamic Payment Calculator', completed: false },
    { id: 2, name: 'Hijri/Gregorian Timeline', completed: false },
    { id: 3, name: 'Prayer Times Integration', completed: false },
    { id: 4, name: 'Virtual Property Tour', completed: false }
  ]);

  const toggleFeature = (id) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, completed: !f.completed } : f
    ));
  };

  return (
    <div className="project-page">
      <header className="project-header" style={{ backgroundColor: '#1e3a8a' }}>
        <h1>🏠 Bayt Elite</h1>
        <p className="tagline">The Sales Machine for Gulf Real Estate Developers</p>
      </header>

      <div className="project-content">
        <div className="section">
          <h2>📋 Features</h2>
          <div className="features-list">
            {features.map(feature => (
              <div key={feature.id} className="feature-item">
                <input
                  type="checkbox"
                  checked={feature.completed}
                  onChange={() => toggleFeature(feature.id)}
                />
                <span className={feature.completed ? 'completed' : ''}>
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>📊 Progress</h2>
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%`, backgroundColor: '#1e3a8a' }}
              ></div>
            </div>
            <div className="progress-controls">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>📝 Notes</h2>
          <textarea 
            className="notes-input"
            placeholder="Add your notes here..."
            rows="4"
          />
          <button className="save-btn">Save Note</button>
        </div>
      </div>
    </div>
  );
}

export default BaytElitePage;
