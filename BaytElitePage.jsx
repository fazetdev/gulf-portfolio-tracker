import React, { useState } from 'react';
import './ProjectPage.css';

function BaytElitePage({ onBack }) {
  const [progress, setProgress] = useState(20);

  // Full feature list from your spec
  const [features, setFeatures] = useState([
    // 1. Trust + Transparency
    { id: 1, name: 'Dynamic Payment Calculator', completed: false },
    { id: 2, name: 'Complete Financial Breakdown', completed: false },
    { id: 3, name: 'Hijri/Gregorian Dual Timeline', completed: false },
    { id: 4, name: 'Regulatory Compliance Badges (RERA/Escrow)', completed: false },
    { id: 5, name: '"No Hidden Fees" Guarantee Display', completed: false },

    // 2. Cultural Intelligence
    { id: 6, name: 'Prayer Times + Qibla Integration', completed: false },
    { id: 7, name: '"View From Prayer Room" Mode', completed: false },
    { id: 8, name: 'Ramadan/Eid Viewing + Financing', completed: false },
    { id: 9, name: 'Family-Centric Layout Highlights', completed: false },

    // 3. Immersive Experience
    { id: 10, name: '360° Virtual Tour', completed: false },
    { id: 11, name: 'Sun Path + Shade Simulation', completed: false },
    { id: 12, name: 'Seasonal View Preview', completed: false },
    { id: 13, name: 'VR-Ready Mode (Cardboard)', completed: false },
    { id: 14, name: 'Neighborhood Context Map', completed: false },

    // 4. Sales Acceleration
    { id: 15, name: 'One-Click WhatsApp Connect', completed: false },
    { id: 16, name: 'PDF Generator (Payment Plan + Photos)', completed: false },
    { id: 17, name: '"Save & Compare" Dashboard', completed: false },
    { id: 18, name: 'Mortgage Calculator (UAE/KSA Banks)', completed: false },
    { id: 19, name: 'Virtual Consultation Scheduler', completed: false },

    // 5. Developer Backend
    { id: 20, name: 'Lead Intelligence Dashboard', completed: false },
    { id: 21, name: 'PDF Download Analytics', completed: false },
    { id: 22, name: '"Hot Lead" Notifications', completed: false },
    { id: 23, name: 'Comparative Engagement Analytics', completed: false },

    // 6. Market-Specific Tools
    { id: 24, name: 'Golden Visa Eligibility Checker', completed: false },
    { id: 25, name: 'Tawtheeq / Rental Yield Calculator', completed: false },
    { id: 26, name: 'Power / Water Consumption Estimates', completed: false },
    { id: 27, name: '"Summer Ready" Cooling Features', completed: false }
  ]);

  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const toggleFeature = (id) => {
    setFeatures(features.map(f =>
      f.id === id ? { ...f, completed: !f.completed } : f
    ));
  };

  const saveNote = () => {
    if (notes.trim() !== "") {
      setSavedNotes([...savedNotes, notes]);
      setNotes("");
    }
  };

  return (
    <div className="project-page">

      <header className="project-header" style={{ backgroundColor: '#1e3a8a' }}>
        <h1>🏠 Bayt Elite</h1>
        <p className="tagline">Complete Sales Enablement Platform for Gulf Real Estate Developers</p>
      </header>

      <div className="project-content">
        
        {/* FEATURES */}
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

        {/* PROGRESS */}
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

        {/* MILESTONES SECTION */}
        <div className="section">
          <h2>🏗️ Milestones</h2>
          <ul>
            <li>UI components structure</li>
            <li>Payment engine + financial breakdown</li>
            <li>APIs: Prayer Times, Qibla, Mortgages</li>
            <li>Virtual tours + sun/shade simulation</li>
            <li>Backend analytics (MVP)</li>
          </ul>
        </div>

        {/* AI PROMPT LIBRARY */}
        <div className="section">
          <h2>🤖 AI Prompts</h2>
          <p>Development prompts you can use during building:</p>
          <ul>
            <li>“Generate React code for a dual Hijri/Gregorian timeline using moment-hijri.”</li>
            <li>“Write a mortgage calculation function for UAE bank standards.”</li>
            <li>“Create a JSON structure for a 360° virtual tour hotspot system.”</li>
            <li>“Design a lead intelligence dashboard UI in React.”</li>
          </ul>
        </div>

        {/* NOTES */}
        <div className="section">
          <h2>📝 Notes</h2>
          <textarea
            className="notes-input"
            placeholder="Add your notes here..."
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button className="save-btn" onClick={saveNote}>Save Note</button>

          <div className="saved-notes">
            {savedNotes.map((n, i) => (
              <p key={i} className="saved-note">• {n}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default BaytElitePage;

