import React, { useState, useEffect } from 'react';
import NoteForm from '../components/Notes/NoteForm';
import NoteItem from '../components/Notes/NoteItem';
import PromptForm from '../components/Prompts/PromptForm';
import PromptItem from '../components/Prompts/PromptItem';
import { Storage } from '../utils/Storage';
import './ProjectPage.css';

function TawasulAIPage() {
  const [activeTab, setActiveTab] = useState('features');
  const [notes, setNotes] = useState([]);
  const [prompts, setPrompts] = useState([]);

  const features = [
    { id: 1, name: 'Unified Inbox Interface (Mock Data, Real UX)', completed: true },
    { id: 2, name: 'AI Reply Generator (Simulated Integration)', completed: false },
    { id: 3, name: 'Dual-Language Reply Panel (Signature Gulf Feature)', completed: false },
    { id: 4, name: 'Canned Responses Library (CRM Lite)', completed: false },
    { id: 5, name: 'Contact + Interaction History Sidebar', completed: false },
    { id: 6, name: 'Smart Inbox Filters', completed: false },
    { id: 7, name: '"Next Actions" Quick Buttons', completed: false },
    { id: 8, name: 'Mini Dashboard (Analytics Preview)', completed: false },
    { id: 9, name: 'Multi-Channel Sender Name + Status', completed: false },
    { id: 10, name: 'Settings Page (Professional Touch)', completed: false },
    { id: 11, name: 'User Journey Simulation (Industry Dialogues)', completed: false },
    { id: 12, name: 'Voice Message → Text Mock Button', completed: false },
    { id: 13, name: 'Auto-Translate Button', completed: false },
    { id: 14, name: 'Response Tone Selector', completed: false }
  ];

  const [completedFeatures, setCompletedFeatures] = useState(
    features.reduce((acc, feature) => {
      acc[feature.id] = feature.completed;
      return acc;
    }, {})
  );

  useEffect(() => {
    setNotes(Storage.getNotesByProject('tawasul-ai'));
    setPrompts(Storage.getPromptsByProject('tawasul-ai'));
  }, []);

  const toggleFeature = (id) => {
    setCompletedFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveNote = (newNote) => {
    const saved = Storage.saveNote({ ...newNote, project: 'tawasul-ai' });
    setNotes(prev => [...prev, saved]);
  };

  const handleSavePrompt = (newPrompt) => {
    const saved = Storage.savePrompt({ ...newPrompt, project: 'tawasul-ai' });
    setPrompts(prev => [...prev, saved]);
  };

  const handleDeleteNote = (noteId) => {
    Storage.deleteNote(noteId);
    setNotes(Storage.getNotesByProject('tawasul-ai'));
  };

  const handleDeletePrompt = (promptId) => {
    Storage.deletePrompt(promptId);
    setPrompts(Storage.getPromptsByProject('tawasul-ai'));
  };

  const completedCount = Object.values(completedFeatures).filter(Boolean).length;
  const totalFeatures = features.length;

  return (
    <div className="project-page">
      <header className="project-header" style={{ backgroundColor: '#0d9488' }}>
        <h1>🤖 Tawasul AI</h1>
        <p className="tagline">"The Bilingual Inbox That Saves 10 Hours Weekly"</p>

        <p className="project-description">
          AI-powered communication assistant for Gulf businesses. Unified inbox across WhatsApp, 
          Instagram, Email with bilingual (Arabic-English) AI replies.
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
            <h2>🎯 Core Features</h2>

            <div className="features-list">
              {features.map(feature => (
                <div key={feature.id} className="feature-item">
                  <input
                    type="checkbox"
                    checked={completedFeatures[feature.id] || false}
                    onChange={() => toggleFeature(feature.id)}
                  />
                  <span className={completedFeatures[feature.id] ? 'completed' : ''}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="feature-categories">
              <h3>🔥 Key Impact Features:</h3>
              <ul>
                <li><strong>Unified Inbox:</strong> All channels in one place</li>
                <li><strong>Bilingual AI Replies:</strong> Arabic/English generation</li>
                <li><strong>Canned Responses:</strong> Gulf-specific templates</li>
                <li><strong>CRM Sidebar:</strong> Contact history & notes</li>
                <li><strong>Smart Filters:</strong> Hot leads, needs follow-up</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="section">
            <h2>📝 Project Notes</h2>

            <NoteForm 
              project="tawasul-ai"
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
                <p className="empty-state">No notes yet. Add some documentation!</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="section">
            <h2>🤖 AI Prompts</h2>

            <PromptForm 
              project="tawasul-ai"
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
                <p className="empty-state">No AI prompts saved yet.</p>
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
                    <span className="stat-label">Features Completed:</span>
                    <span className="stat-value">{completedCount}/{totalFeatures}</span>
                  </div>

                  <div className="progress-stat">
                    <span className="stat-label">Completion:</span>
                    <span className="stat-value">
                      {Math.round((completedCount / totalFeatures) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: \`\${(completedCount / totalFeatures) * 100}%\`,
                        backgroundColor: '#0d9488'
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="next-steps">
                <h3>Next Steps:</h3>
                <ul>
                  <li>Implement dual-language reply panel</li>
                  <li>Build canned responses library</li>
                  <li>Add CRM sidebar functionality</li>
                  <li>Create smart inbox filters</li>
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TawasulAIPage;
