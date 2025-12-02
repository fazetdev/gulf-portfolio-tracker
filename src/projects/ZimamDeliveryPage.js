import React, { useState, useEffect } from 'react';
import NoteForm from "../components/Notes/NoteForm";
import NoteItem from "../components/Notes/NoteItem";
import PromptForm from "../components/Prompts/PromptForm";
import PromptItem from "../components/Prompts/PromptItem";
import { Storage } from "../utils/Storage";
import './ProjectPage.css';

function ZimamDeliveryPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('features');
  const [notes, setNotes] = useState([]);
  const [prompts, setPrompts] = useState([]);
  
  // CORE FEATURES from your spec
  const coreFeatures = [
    { id: 1, name: 'Address Memory System (The Hero Feature)', category: 'core', completed: true },
    { id: 2, name: 'Tap map → Drop a Pin', category: 'core', completed: true },
    { id: 3, name: 'Attach notes to addresses', category: 'core', completed: true },
    { id: 4, name: 'Add optional photos (gate, parking, landmark)', category: 'core', completed: false },
    { id: 5, name: 'Mark addresses as Favorite / Frequent Stop', category: 'core', completed: false },
    { id: 6, name: 'Tag addresses by Day/Route', category: 'core', completed: false },
    { id: 7, name: 'Daily Wallet (Instant Income Tracker)', category: 'core', completed: false },
    { id: 8, name: 'Auto-calculate daily/weekly/monthly profit', category: 'core', completed: false },
    { id: 9, name: 'Income trend chart', category: 'core', completed: false },
    { id: 10, name: 'Delivery Logbook (Delivery Diary)', category: 'core', completed: false },
    { id: 11, name: 'Filter by day/area/platform', category: 'core', completed: false },
    { id: 12, name: 'Super Mobile-First UX (Thumb-Optimized)', category: 'core', completed: false },
    { id: 13, name: 'Big buttons for one-hand use', category: 'core', completed: false },
    { id: 14, name: 'Sticky bottom navigation', category: 'core', completed: false },
    { id: 15, name: 'Dark mode for night work', category: 'core', completed: false }
  ];

  // PREMIUM FEATURES
  const premiumFeatures = [
    { id: 16, name: 'Route History (Last 7 Days Map Path)', category: 'premium', completed: false },
    { id: 17, name: 'Quick Notes System (One-tap notes)', category: 'premium', completed: false },
    { id: 18, name: 'Photo Receipts System', category: 'premium', completed: false },
    { id: 19, name: 'Proof of delivery photos', category: 'premium', completed: false }
  ];

  // WOW-FACTOR FEATURES
  const wowFeatures = [
    { id: 20, name: 'Arabic + English Switch (Bilingual UI)', category: 'wow', completed: false },
    { id: 21, name: 'RTL support for Arabic', category: 'wow', completed: false },
    { id: 22, name: 'Offline-First Mode', category: 'wow', completed: false },
    { id: 23, name: 'IndexedDB/LocalStorage caching', category: 'wow', completed: false },
    { id: 24, name: '"Peak Hours Alerts" (Mock Logic)', category: 'wow', completed: false }
  ];

  const allFeatures = [...coreFeatures, ...premiumFeatures, ...wowFeatures];
  
  const [completedFeatures, setCompletedFeatures] = useState(
    allFeatures.reduce((acc, feature) => {
      acc[feature.id] = feature.completed;
      return acc;
    }, {})
  );

  useEffect(() => {
    setNotes(Storage.getNotesByProject('zimam-delivery'));
    setPrompts(Storage.getPromptsByProject('zimam-delivery'));
  }, []);

  const toggleFeature = (id) => {
    setCompletedFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveNote = (newNote) => {
    const saved = Storage.saveNote({ ...newNote, project: 'zimam-delivery' });
    setNotes(prev => [...prev, saved]);
  };

  const handleSavePrompt = (newPrompt) => {
    const saved = Storage.savePrompt({ ...newPrompt, project: 'zimam-delivery' });
    setPrompts(prev => [...prev, saved]);
  };

  const handleDeleteNote = (noteId) => {
    Storage.deleteNote(noteId);
    setNotes(Storage.getNotesByProject('zimam-delivery'));
  };

  const handleDeletePrompt = (promptId) => {
    Storage.deletePrompt(promptId);
    setPrompts(Storage.getPromptsByProject('zimam-delivery'));
  };

  const completedCount = Object.values(completedFeatures).filter(Boolean).length;
  const totalFeatures = allFeatures.length;

  // Quick notes examples for delivery drivers
  const _quickNotes = [
    "Call customer on arrival",
    "No parking available",
    "Gate code: ####",
    "Fragile items",
    "Use back entrance",
    "Ask for security",
    "Leave at reception"
  ];

  return (
    <div className="project-page">
      <header className="project-header" style={{ backgroundColor: '#7c3aed' }}>
        <h1>🚚 Zimam Delivery</h1>
        <p className="tagline">"The Daily Companion for GCC Delivery Drivers"</p>
        <p className="project-description">
          Delivery and logistics platform optimized for Gulf market challenges.
          Target: Talabat, Jahez, Careem, Noon Food, freelance delivery drivers.
        </p>
        
        <div className="project-stats">
          <div className="project-stat">
            <span className="stat-number">{completedCount}/{totalFeatures}</span>
            <span className="stat-label">Features</span>
          </div>
          <div className="project-stat">
            <span className="stat-number">{notes.length}</span>
            <span className="stat-label">Notes</span>
          </div>
          <div className="project-stat">
            <span className="stat-number">{prompts.length}</span>
            <span className="stat-label">AI Prompts</span>
          </div>
          <div className="project-stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Sections</span>
          </div>
        </div>
      </header>

      <div className="project-tabs">
        <button 
          className={`tab ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          🎯 Features
        </button>
        <button 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          📝 Notes ({notes.length})
        </button>
        <button 
          className={`tab ${activeTab === 'prompts' ? 'active' : ''}`}
          onClick={() => setActiveTab('prompts')}
        >
          🤖 AI Prompts ({prompts.length})
        </button>
        <button 
          className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📊 Progress
        </button>
      </div>

      <div className="project-content">
        {activeTab === 'features' && (
          <div className="section">
            <h2>🔥 A. CORE FEATURES (NON-NEGOTIABLE)</h2>
            <p className="section-description">
              These MUST be in the project for it to look serious, useful, and Gulf-ready.
            </p>
            
            <div className="features-list">
              {coreFeatures.map(feature => (
                <div key={feature.id} className="feature-item">
                  <input
                    type="checkbox"
                    checked={completedFeatures[feature.id] || false}
                    onChange={() => toggleFeature(feature.id)}
                  />
                  <div className="feature-details">
                    <span className={completedFeatures[feature.id] ? 'completed' : ''}>
                      {feature.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-sub">
              <h3>⚡ B. PREMIUM FEATURES (PROFESSIONAL)</h3>
              <div className="features-list">
                {premiumFeatures.map(feature => (
                  <div key={feature.id} className="feature-item">
                    <input
                      type="checkbox"
                      checked={completedFeatures[feature.id] || false}
                      onChange={() => toggleFeature(feature.id)}
                    />
                    <div className="feature-details">
                      <span className={completedFeatures[feature.id] ? 'completed' : ''}>
                        {feature.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-sub">
              <h3>🚀 C. WOW-FACTOR FEATURES (GAME-CHANGING)</h3>
              <div className="features-list">
                {wowFeatures.map(feature => (
                  <div key={feature.id} className="feature-item">
                    <input
                      type="checkbox"
                      checked={completedFeatures[feature.id] || false}
                      onChange={() => toggleFeature(feature.id)}
                    />
                    <div className="feature-details">
                      <span className={completedFeatures[feature.id] ? 'completed' : ''}>
                        {feature.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="section">
            <h2>📝 Project Notes</h2>
            <NoteForm 
              project="zimam-delivery"
              category="general"
              onSave={handleSaveNote}
            />
            
            <div className="notes-list">
              {notes.length > 0 ? (
                notes.map(note => (
                  <NoteItem 
                    key={note.id} 
                    note={note}
                    onDelete={handleDeleteNote}
                  />
                ))
              ) : (
                <p className="empty-state">No notes yet. Add documentation about delivery challenges!</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="section">
            <h2>🤖 AI Prompts</h2>
            <PromptForm 
              project="zimam-delivery"
              category="general"
              onSave={handleSavePrompt}
            />
            
            <div className="prompts-list">
              {prompts.length > 0 ? (
                prompts.map(prompt => (
                  <PromptItem 
                    key={prompt.id} 
                    prompt={prompt}
                    onDelete={handleDeletePrompt}
                  />
                ))
              ) : (
                <p className="empty-state">No AI prompts saved yet. Save prompts for delivery optimization!</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="section">
            <h2>📊 Project Progress</h2>
            <div className="progress-section">
              <div className="progress-info">
                <div className="progress-stats">
                  <div className="progress-stat">
                    <span className="stat-label">Total Features:</span>
                    <span className="stat-value">{totalFeatures}</span>
                  </div>
                  <div className="progress-stat">
                    <span className="stat-label">Completed:</span>
                    <span className="stat-value">{completedCount}</span>
                  </div>
                  <div className="progress-stat">
                    <span className="stat-label">Completion Rate:</span>
                    <span className="stat-value">
                      {Math.round((completedCount / totalFeatures) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="next-steps">
                <h3>🥇 Most Impressive Features to Build:</h3>
                <ol>
                  <li><strong>Address Memory System</strong> (with notes + photos + saved locations)</li>
                  <li><strong>Daily Wallet</strong> (profit calculator + monthly trend)</li>
                  <li><strong>Delivery Logbook</strong> (with filters)</li>
                  <li><strong>Bilingual UI</strong> (Arabic + English)</li>
                  <li><strong>Offline-first mode</strong></li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZimamDeliveryPage;
