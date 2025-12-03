import React, { useState, useEffect } from 'react';
import NoteForm from '../components/Notes/NoteForm';
import NoteItem from '../components/Notes/NoteItem';
import PromptForm from '../components/Prompts/PromptForm';
import PromptItem from '../components/Prompts/PromptItem';
import './ProjectPage.css';
import { Storage } from '../utils/Storage';

function BaytElite({ onBack }) {
  const [activeTab, setActiveTab] = useState('features');
  const [notes, setNotes] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const features = [
    { id: 1, name: 'Dynamic Payment Calculator', completed: false },
    { id: 2, name: 'Complete Financial Breakdown', completed: false },
    { id: 3, name: 'Hijri/Gregorian Dual Timeline', completed: false },
    { id: 4, name: 'Regulatory Compliance Badges', completed: false },
    { id: 5, name: '"No Hidden Fees" Guarantee Display', completed: false },
    { id: 6, name: 'Integrated Prayer Times & Qibla', completed: false },
    { id: 7, name: '"View from Prayer Room" Feature', completed: false },
    { id: 8, name: 'Ramadan/Eid Ready', completed: false },
    { id: 9, name: 'Family-Centric Layout Highlights', completed: false },
    { id: 10, name: '360° Virtual Tour', completed: false },
    { id: 11, name: 'Sun Path & Shade Simulation', completed: false },
    { id: 12, name: 'Seasonal View Preview', completed: false },
    { id: 13, name: 'VR-Ready Mode', completed: false },
    { id: 14, name: 'Neighborhood Context Map', completed: false },
    { id: 15, name: 'One-Click WhatsApp Connect', completed: false },
    { id: 16, name: 'Shareable PDF Generator', completed: false },
    { id: 17, name: '"Save & Compare" Dashboard', completed: false },
    { id: 18, name: 'Mortgage Calculator Integration', completed: false },
    { id: 19, name: 'Virtual Consultation Scheduler', completed: false },
    { id: 20, name: 'Lead Intelligence Dashboard', completed: false },
    { id: 21, name: 'PDF Download Analytics', completed: false },
    { id: 22, name: '"Hot Lead" Notifications', completed: false },
    { id: 23, name: 'Comparative Analytics', completed: false },
    { id: 24, name: '"Golden Visa" Eligibility Checker', completed: false },
    { id: 25, name: 'Tawtheeq/Rental Yield Calculator', completed: false },
    { id: 26, name: 'Power/Water Consumption Estimates', completed: false },
    { id: 27, name: '"Summer Ready" Features', completed: false }
  ];

  const [completedFeatures, setCompletedFeatures] = useState(
    features.reduce((acc, feature) => {
      acc[feature.id] = feature.completed;
      return acc;
    }, {})
  );

  useEffect(() => {
    setNotes(Storage.getNotesByProject('bayt-elite'));
    setPrompts(Storage.getPromptsByProject('bayt-elite'));
    setMilestones(Storage.getMilestonesByProject('bayt-elite'));
  }, []);

  const toggleFeature = (id) => {
    setCompletedFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveNote = (newNote) => {
    const saved = Storage.saveNote({ ...newNote, project: 'bayt-elite' });
    setNotes(prev => [...prev, saved]);
  };

  const handleSavePrompt = (newPrompt) => {
    const saved = Storage.savePrompt({ ...newPrompt, project: 'bayt-elite' });
    setPrompts(prev => [...prev, saved]);
  };

  const handleSaveMilestone = (newMilestone) => {
    const saved = Storage.saveMilestone({ ...newMilestone, project: 'bayt-elite' });
    setMilestones(prev => [...prev, saved]);
  };

  const handleDeleteNote = (id) => {
    Storage.deleteNote(id);
    setNotes(Storage.getNotesByProject('bayt-elite'));
  };

  const handleDeletePrompt = (id) => {
    Storage.deletePrompt(id);
    setPrompts(Storage.getPromptsByProject('bayt-elite'));
  };

  const handleDeleteMilestone = (id) => {
    Storage.deleteMilestone(id);
    setMilestones(Storage.getMilestonesByProject('bayt-elite'));
  };

  const completedCount = Object.values(completedFeatures).filter(Boolean).length;
  const totalFeatures = features.length;

  return (
    <div className="project-page">
      <header className="project-header" style={{ backgroundColor: '#1e3a8a' }}>
        <h1>🏠 Bayt Elite</h1>
        <p className="tagline">Complete Sales Enablement Platform for Gulf Developers</p>
      </header>

      <div className="project-tabs">
        <button className={`tab ${activeTab==='features'?'active':''}`} onClick={()=>setActiveTab('features')}>📋 Features</button>
        <button className={`tab ${activeTab==='notes'?'active':''}`} onClick={()=>setActiveTab('notes')}>📝 Notes ({notes.length})</button>
        <button className={`tab ${activeTab==='prompts'?'active':''}`} onClick={()=>setActiveTab('prompts')}>🤖 AI Prompts ({prompts.length})</button>
        <button className={`tab ${activeTab==='milestones'?'active':''}`} onClick={()=>setActiveTab('milestones')}>🎯 Milestones ({milestones.length})</button>
        <button className={`tab ${activeTab==='progress'?'active':''}`} onClick={()=>setActiveTab('progress')}>📊 Progress</button>
      </div>

      <div className="project-content">
        {activeTab==='features' && (
          <div className="section">
            <h2>📋 Core Features</h2>
            <div className="features-list">
              {features.map(f=>(
                <div key={f.id} className="feature-item">
                  <input type="checkbox" checked={completedFeatures[f.id]||false} onChange={()=>toggleFeature(f.id)} />
                  <span className={completedFeatures[f.id]?'completed':''}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='notes' && (
          <div className="section">
            <h2>📝 Project Notes</h2>
            <NoteForm project="bayt-elite" category="general" onSave={handleSaveNote} />
            <div className="notes-list">
              {notes.length>0 ? notes.map(n=>(
                <NoteItem key={n.id} note={n} onDelete={handleDeleteNote}/>
              )):<p className="empty-state">No notes yet.</p>}
            </div>
          </div>
        )}

        {activeTab==='prompts' && (
          <div className="section">
            <h2>🤖 AI Prompts</h2>
            <PromptForm project="bayt-elite" category="general" onSave={handleSavePrompt} />
            <div className="prompts-list">
              {prompts.length>0 ? prompts.map(p=>(
                <PromptItem key={p.id} prompt={p} onDelete={handleDeletePrompt}/>
              )):<p className="empty-state">No AI prompts yet.</p>}
            </div>
          </div>
        )}

        {activeTab==='milestones' && (
          <div className="section">
            <h2>🎯 Project Milestones</h2>
            <NoteForm project="bayt-elite" category="milestone" onSave={handleSaveMilestone} />
            <div className="notes-list">
              {milestones.length>0 ? milestones.map(m=>(
                <NoteItem key={m.id} note={m} onDelete={handleDeleteMilestone}/>
              )):<p className="empty-state">No milestones yet.</p>}
            </div>
          </div>
        )}

        {activeTab==='progress' && (
          <div className="section">
            <h2>📊 Project Progress</h2>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(completedCount/totalFeatures)*100}%`, backgroundColor:'#1e3a8a' }}></div>
              </div>
              <p>{completedCount}/{totalFeatures} features completed ({Math.round((completedCount/totalFeatures)*100)}%)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BaytElite;
