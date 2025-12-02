import React, { useState, useEffect } from 'react';
import NoteForm from '../components/Notes/NoteForm';
import NoteItem from '../components/Notes/NoteItem';
import PromptForm from "../components/Prompts/PromptForm";
import PromptItem from "../components/Prompts/PromptItem";
import { Storage } from '../utils/Storage';
import './ProjectPage.css';

function AlMultaqaPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('features');
  const [notes, setNotes] = useState([]);
  const [prompts, setPrompts] = useState([]);
  
  // CORE FEATURES (Must-Haves)
  const coreFeatures = [
    { id: 1, name: 'Visual Appointment Scheduler (Weekly Calendar View)', category: 'core', completed: true },
    { id: 2, name: 'Drag-and-Drop Appointment Rescheduling', category: 'core', completed: true },
    { id: 3, name: 'Service Duration Logic (Auto-expands time)', category: 'core', completed: true },
    { id: 4, name: 'Staff Assignment (Choose stylist/barber/beautician)', category: 'core', completed: false },
    { id: 5, name: 'Conflict Alerts (Double-booking warnings)', category: 'core', completed: false },
    { id: 6, name: 'Color Coding (Green=Confirmed, Yellow=Pending, Red=Overdue)', category: 'core', completed: false },
    { id: 7, name: 'Customer & Payment Tracker (CRM + Payments)', category: 'core', completed: false },
    { id: 8, name: 'Customer Profiles (Name, phone, service history, spending)', category: 'core', completed: false },
    { id: 9, name: 'Payment Status Tracking (Paid/Partially Paid/Pending)', category: 'core', completed: false },
    { id: 10, name: 'Invoice History (Services booked + cost)', category: 'core', completed: false },
    { id: 11, name: 'Outstanding Payments Widget', category: 'core', completed: false },
    { id: 12, name: 'Visit Frequency Indicator', category: 'core', completed: false },
    { id: 13, name: 'At-a-Glance Analytics Dashboard', category: 'core', completed: false },
    { id: 14, name: 'Weekly Revenue Line Chart', category: 'core', completed: false },
    { id: 15, name: 'Top Services Analysis', category: 'core', completed: false },
    { id: 16, name: 'New Customers This Week Counter', category: 'core', completed: false },
    { id: 17, name: 'Most Booked Staff Member', category: 'core', completed: false },
    { id: 18, name: 'Peak Hours Summary', category: 'core', completed: false }
  ];

  // GULF-SPECIFIC ENHANCEMENTS
  const gulfFeatures = [
    { id: 19, name: 'Arabic-First, English-Second UI', category: 'gulf', completed: false },
    { id: 20, name: 'Fully RTL Compatible Layout', category: 'gulf', completed: false },
    { id: 21, name: 'Instant Language Toggle', category: 'gulf', completed: false },
    { id: 22, name: 'Prayer-Time–Aware Scheduling', category: 'gulf', completed: false },
    { id: 23, name: 'Auto-block time during Salah breaks', category: 'gulf', completed: false },
    { id: 24, name: '"Close during prayer time" toggle', category: 'gulf', completed: false },
    { id: 25, name: 'Prayer slots on daily schedule', category: 'gulf', completed: false },
    { id: 26, name: 'Female-Only or Family-Only Mode', category: 'gulf', completed: false },
    { id: 27, name: '"Ladies Salon Mode" toggle', category: 'gulf', completed: false },
    { id: 28, name: 'Appointments by gender filtering', category: 'gulf', completed: false },
    { id: 29, name: 'WhatsApp Business Integration', category: 'gulf', completed: false },
    { id: 30, name: 'One-click confirmation messages', category: 'gulf', completed: false },
    { id: 31, name: 'Pre-filled Arabic/English messages', category: 'gulf', completed: false },
    { id: 32, name: 'Staff Language Listings (Filipino, Urdu/Hindi, Arabic, English)', category: 'gulf', completed: false }
  ];

  // SIGNATURE FEATURES (Portfolio Differentiators)
  const signatureFeatures = [
    { id: 33, name: '"Smart Suggestions" Engine', category: 'signature', completed: false },
    { id: 34, name: 'Analyzes customer frequency/staff availability/peak hours', category: 'signature', completed: false },
    { id: 35, name: 'Suggests discounts for inactive customers', category: 'signature', completed: false },
    { id: 36, name: 'Recommends staffing adjustments for busy slots', category: 'signature', completed: false },
    { id: 37, name: '"Repeat Customer Booster" System', category: 'signature', completed: false },
    { id: 38, name: 'Tracks visit count & missed appointments', category: 'signature', completed: false },
    { id: 39, name: 'Suggests loyalty points & rewards', category: 'signature', completed: false },
    { id: 40, name: '"Service Load Meter" Analysis', category: 'signature', completed: false },
    { id: 41, name: 'Shows profitability per service (Time vs Revenue)', category: 'signature', completed: false },
    { id: 42, name: '"Room/Chair Utilization Map"', category: 'signature', completed: false },
    { id: 43, name: 'Real-time chair/room occupancy status', category: 'signature', completed: false },
    { id: 44, name: 'Visual map of salon/barbershop layout', category: 'signature', completed: false }
  ];

  const allFeatures = [...coreFeatures, ...gulfFeatures, ...signatureFeatures];
  
  const [completedFeatures, setCompletedFeatures] = useState(
    allFeatures.reduce((acc, feature) => {
      acc[feature.id] = feature.completed;
      return acc;
    }, {})
  );

  useEffect(() => {
    setNotes(Storage.getNotesByProject('al-multaqa'));
    setPrompts(Storage.getPromptsByProject('al-multaqa'));
  }, []);

  const toggleFeature = (id) => {
    setCompletedFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveNote = (newNote) => {
    const saved = Storage.saveNote({ ...newNote, project: 'al-multaqa' });
    setNotes(prev => [...prev, saved]);
  };

  const handleSavePrompt = (newPrompt) => {
    const saved = Storage.savePrompt({ ...newPrompt, project: 'al-multaqa' });
    setPrompts(prev => [...prev, saved]);
  };

  const handleDeleteNote = (noteId) => {
    Storage.deleteNote(noteId);
    setNotes(Storage.getNotesByProject('al-multaqa'));
  };

  const handleDeletePrompt = (promptId) => {
    Storage.deletePrompt(promptId);
    setPrompts(Storage.getPromptsByProject('al-multaqa'));
  };

  const completedCount = Object.values(completedFeatures).filter(Boolean).length;
  const totalFeatures = allFeatures.length;

  // Prayer times for Gulf
  const prayerTimes = [
    "Fajr: 5:00 AM",
    "Dhuhr: 12:30 PM", 
    "Asr: 3:45 PM",
    "Maghrib: 6:15 PM",
    "Isha: 8:00 PM"
  ];

  // Salon services example
  const salonServices = [
    { name: "Haircut", time: "45 min", revenue: "80 AED", profitability: "High" },
    { name: "Facial", time: "60 min", revenue: "120 AED", profitability: "High" },
    { name: "Massage", time: "90 min", revenue: "150 AED", profitability: "Medium" },
    { name: "Blow Dry", time: "60 min", revenue: "45 AED", profitability: "Low" },
    { name: "Manicure", time: "30 min", revenue: "50 AED", profitability: "High" }
  ];

  return (
    <div className="project-page">
      <header className="project-header" style={{ backgroundColor: '#dc2626' }}>
        <h1>📊 Al-Multaqa Dashboard</h1>
        <p className="tagline">"The Operational Brain for Salons, Clinics, Barbershops, Spas & Home Services in the Gulf"</p>
        <p className="project-description">
          Business intelligence dashboard optimized for Gulf service businesses. 
          Combines appointment scheduling, CRM, payments, and Gulf-specific features.
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
            <span className="stat-label">Categories</span>
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
          <>
            <div className="section">
              <h2>🔵 1. CORE FEATURES (Must-Haves)</h2>
              <p className="section-description">
                Industry standard features that solve the biggest headaches for Gulf service businesses.
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
                      {feature.id === 1 && (
                        <div className="feature-subitems">
                          <small>• Visual blocks for appointments → shows free & busy slots instantly</small>
                          <small>• No double-booking calendar</small>
                        </div>
                      )}
                      {feature.id === 7 && (
                        <div className="feature-subitems">
                          <small>• Simple CRM + payments overview</small>
                          <small>• Shows loyalty patterns clearly</small>
                        </div>
                      )}
                      {feature.id === 13 && (
                        <div className="feature-subitems">
                          <small>• Instant business overview with Chart.js visualizations</small>
                          <small>• Key metrics at a glance</small>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h2>🟢 2. GULF-SPECIFIC ENHANCEMENTS (Competitive Edge)</h2>
              <p className="section-description">
                Features that make this dashboard feel "made for the Gulf" 🇸🇦 🇦🇪 🇶🇦
              </p>
              
              <div className="features-list">
                {gulfFeatures.map(feature => (
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
                      {feature.id === 19 && (
                        <div className="feature-subitems">
                          <small>• Fully RTL compatible</small>
                          <small>• Arabic labels styled for Gulf readability (bigger, bolder, clean)</small>
                        </div>
                      )}
                      {feature.id === 22 && (
                        <div className="feature-subitems">
                          <small>• Blocks time automatically during Salah breaks</small>
                          <small>• Shows prayer slots on the daily schedule</small>
                          <small>• For Muslim-majority staff/businesses</small>
                        </div>
                      )}
                      {feature.id === 26 && (
                        <div className="feature-subitems">
                          <small>• Gulf-specific salon rules: Female staff only, Private service areas</small>
                          <small>• Appointments by gender</small>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="prayer-times-box">
                  <h4>🕌 Sample Prayer Times (Gulf):</h4>
                  <div className="prayer-times-list">
                    {prayerTimes.map((time, idx) => (
                      <div key={idx} className="prayer-time">{time}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>🟣 3. SIGNATURE FEATURES (Portfolio Differentiators)</h2>
              <p className="section-description">
                These features will blow minds and set you apart from any developer in the region.
              </p>
              
              <div className="features-list">
                {signatureFeatures.map(feature => (
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
                      {feature.id === 33 && (
                        <div className="feature-subitems">
                          <small>• Using simple logic — NOT AI</small>
                          <small>• Analyzes: customer frequency, staff availability, peak hours</small>
                          <small>• Suggests: "15% discount for Sara. She hasn't visited in 6 weeks."</small>
                          <small>• Suggests: "Your busiest slot is Fridays 4–7 PM, add 1 extra staff."</small>
                        </div>
                      )}
                      {feature.id === 40 && (
                        <div className="feature-subitems">
                          <h5>Service Load Meter Example:</h5>
                          <div className="service-table">
                            <table>
                              <thead>
                                <tr>
                                  <th>Service</th>
                                  <th>Avg Time</th>
                                  <th>Revenue</th>
                                  <th>Profitability</th>
                                </tr>
                              </thead>
                              <tbody>
                                {salonServices.map((service, idx) => (
                                  <tr key={idx}>
                                    <td>{service.name}</td>
                                    <td>{service.time}</td>
                                    <td>{service.revenue}</td>
                                    <td>
                                      <span className={`profitability-${service.profitability.toLowerCase()}`}>
                                        {service.profitability}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'notes' && (
          <div className="section">
            <h2>📝 Project Notes</h2>
            <NoteForm 
              project="al-multaqa"
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
                <p className="empty-state">No notes yet. Add insights about Gulf service businesses!</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="section">
            <h2>🤖 AI Prompts</h2>
            <PromptForm 
              project="al-multaqa"
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
                <p className="empty-state">No AI prompts saved yet. Save prompts for business optimization!</p>
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
                        width: `${(completedCount / totalFeatures) * 100}%`, 
                        backgroundColor: '#dc2626' 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="category-progress">
                  <h3>Progress by Category:</h3>
                  <div className="category-bars">
                    <div className="category-bar">
                      <span className="category-label">Core Features:</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ 
                          width: `${(coreFeatures.filter(f => completedFeatures[f.id]).length / coreFeatures.length) * 100}%` 
                        }}></div>
                      </div>
                      <span className="category-percent">
                        {Math.round((coreFeatures.filter(f => completedFeatures[f.id]).length / coreFeatures.length) * 100)}%
                      </span>
                    </div>
                    <div className="category-bar">
                      <span className="category-label">Gulf Features:</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ 
                          width: `${(gulfFeatures.filter(f => completedFeatures[f.id]).length / gulfFeatures.length) * 100}%`,
                          backgroundColor: '#10b981'
                        }}></div>
                      </div>
                      <span className="category-percent">
                        {Math.round((gulfFeatures.filter(f => completedFeatures[f.id]).length / gulfFeatures.length) * 100)}%
                      </span>
                    </div>
                    <div className="category-bar">
                      <span className="category-label">Signature Features:</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ 
                          width: `${(signatureFeatures.filter(f => completedFeatures[f.id]).length / signatureFeatures.length) * 100}%`,
                          backgroundColor: '#8b5cf6'
                        }}></div>
                      </div>
                      <span className="category-percent">
                        {Math.round((signatureFeatures.filter(f => completedFeatures[f.id]).length / signatureFeatures.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="next-steps">
                <h3>🌟 Summary - What This Project Includes:</h3>
                <ul>
                  <li><strong>Scheduling:</strong> Visual calendar, drag-and-drop, conflict alerts</li>
                  <li><strong>CRM:</strong> Customer profiles, payment tracking, loyalty patterns</li>
                  <li><strong>Payments:</strong> Invoice history, outstanding payments</li>
                  <li><strong>Gulf Customizations:</strong> Prayer-time aware, Arabic-first UI, WhatsApp integration</li>
                  <li><strong>Business Analytics:</strong> Revenue charts, service profitability, peak hours</li>
                  <li><strong>Smart Suggestions:</strong> Customer retention, staffing optimization</li>
                  <li><strong>Salon Operations:</strong> Chair utilization, service load analysis</li>
                </ul>
                <p className="highlight">
                  <strong>This is more than a project — It's a portfolio killer.</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlMultaqaPage;
