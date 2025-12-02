import React, { useState, useEffect } from 'react';
import NoteItem from '../components/Notes/NoteItem';
import PromptItem from '../components/Prompts/PromptItem';
import { Storage } from '../utils/Storage';
import './LibraryPage.css';

function LibraryPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState([]);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    setNotes(Storage.getNotes());
    setPrompts(Storage.getPrompts());
  }, []);

  const handleDeleteNote = (noteId) => {
    Storage.deleteNote(noteId);
    setNotes(Storage.getNotes());
  };

  const handleDeletePrompt = (promptId) => {
    Storage.deletePrompt(promptId);
    setPrompts(Storage.getPrompts());
  };

  return (
    <div className="library-page">
      <header className="library-header">
        <h1>📚 Knowledge Library</h1>
        <p>All your saved notes, AI prompts, and learnings in one place</p>
      </header>

      <div className="library-tabs">
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
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Statistics
        </button>
      </div>

      <div className="library-content">
        {activeTab === 'notes' && (
          <div className="notes-library">
            <h2>Saved Notes</h2>
            {notes.length > 0 ? (
              <div className="items-list">
                {notes.map(note => (
                  <NoteItem 
                    key={note.id} 
                    note={note}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-state">No notes saved yet.</p>
            )}
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="prompts-library">
            <h2>AI Prompts</h2>
            {prompts.length > 0 ? (
              <div className="items-list">
                {prompts.map(prompt => (
                  <PromptItem 
                    key={prompt.id} 
                    prompt={prompt}
                    onDelete={handleDeletePrompt}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-state">No AI prompts saved yet.</p>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-library">
            <h2>Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{notes.length}</div>
                <div className="stat-label">Total Notes</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{prompts.length}</div>
                <div className="stat-label">AI Prompts</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {new Set(notes.map(n => n.project)).size}
                </div>
                <div className="stat-label">Projects with Notes</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {notes.length > 0 
                    ? Math.round(notes.reduce((sum, n) => sum + n.content.length, 0) / notes.length)
                    : 0
                  }
                </div>
                <div className="stat-label">Avg Note Length</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
