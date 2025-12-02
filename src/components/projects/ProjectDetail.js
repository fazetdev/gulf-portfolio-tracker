import React, { useState, useEffect } from 'react';
import './Projects.css';
import {
  getCategoryProgress,
  updateCategoryProgress,
  initializeProjectProgress,
  getDocumentation,
//   addDocumentation,
//   getAiPrompts,
//   addAiPrompt
} from '../../utils/localStorage';

function ProjectDetail({ projectId }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoryProgress, setCategoryProgress] = useState({});
  const [showProgressInput, setShowProgressInput] = useState(null);
  const [progressValue, setProgressValue] = useState('');
  const [documentation, setDocumentation] = useState({});
  const [aiPrompts, setAiPrompts] = useState({});
  const [completedFeatures, setCompletedFeatures] = useState({});
  const [activeTab, setActiveTab] = useState('features'); // 'features', 'notes', 'prompts', 'milestones'

  // Project data
  const getProjectData = () => {
    const projectsData = {
      'bayt-elite': {
        name: 'Bayt Elite',
        tagline: 'The Sales Machine for Gulf Real Estate Developers',
        description: 'A comprehensive sales enablement platform for Gulf real estate developers targeting remote Nigerian investors. Features include dynamic payment calculators with Hijri timelines, prayer/Qibla integration, and virtual property tours.',
        color: '#1e3a8a',
        categories: [
          {
            id: 'trust-transparency',
            title: 'Trust & Transparency Engine',
            description: 'Building confidence through financial clarity and regulatory compliance',
            features: [
              'Dynamic Payment Calculator: Slider-based with real-time visual payment timeline',
              'Complete Financial Breakdown: Shows construction milestones, service fees, VAT, registration costs',
              'Hijri/Gregorian Dual Timeline: All construction phases in both calendars',
              'Regulatory Compliance Badges: Visual indicators for RERA approval, escrow status',
              '"No Hidden Fees" Guarantee Display'
            ],
            phase: 'Phase 1',
            priority: 'High'
          },
          {
            id: 'cultural-intelligence',
            title: 'Cultural Intelligence System',
            description: 'Understanding and respecting Gulf lifestyle and religious practices',
            features: [
              'Integrated Prayer Times & Qibla: Using Aladhan API with property-specific direction',
              '"View from Prayer Room" Feature: One-click orientation to Qibla with balcony vista',
              'Ramadan/Eid Ready: Special viewing modes and financing options for Islamic months',
              'Family-Centric Layout Highlights: Emphasis on private family areas, maid\'s room, guest reception flow'
            ],
            phase: 'Phase 1',
            priority: 'High'
          },
          {
            id: 'immersive-experience',
            title: 'Immersive Experience Suite',
            description: 'Virtual property experience for remote buyers',
            features: [
              '360° Virtual Tour: Interactive walkthrough with hotspot explanations',
              'Sun Path & Shade Simulation: Visualizes sunlight through property at different times',
              'Seasonal View Preview: Shows property during "green season" vs. summer',
              'VR-Ready Mode: Google Cardboard compatible for premium experience',
              'Neighborhood Context Map: Highlights nearby mosques, schools, clinics'
            ],
            phase: 'Phase 2',
            priority: 'Medium'
          },
          {
            id: 'sales-acceleration',
            title: 'Sales Acceleration Tools',
            description: 'Features that directly help close deals',
            features: [
              'One-Click WhatsApp Connect: Pre-filled messages for agents/developers',
              'Shareable PDF Generator: Customized payment plan + property snapshots',
              '"Save & Compare" Dashboard: For buyers evaluating multiple units',
              'Mortgage Calculator Integration: Pre-approved bank rates from UAE/Saudi lenders',
              'Virtual Consultation Scheduler: Integrated with agent calendars'
            ],
            phase: 'Phase 2',
            priority: 'High'
          },
          {
            id: 'developer-backend',
            title: 'Developer/Agent Backend (MVP)',
            description: 'Analytics and management tools for business users',
            features: [
              'Lead Intelligence Dashboard: Tracks user interactions with properties',
              'PDF Download Analytics: Which plans are shared most frequently',
              '"Hot Lead" Notifications: When users spend >5 mins on calculator or tour',
              'Comparative Analytics: Shows which features drive most engagement'
            ],
            phase: 'Phase 3',
            priority: 'Medium'
          },
          {
            id: 'market-enhancements',
            title: 'Market-Specific Enhancements',
            description: 'Gulf market specific features and compliance',
            features: [
              '"Golden Visa" Eligibility Checker: For UAE properties',
              'Tawtheeq/Rental Yield Calculator: For investment properties',
              'Power/Water Consumption Estimates: Based on property size',
              '"Summer Ready" Features: Highlights chiller systems, pool cooling'
            ],
            phase: 'Phase 3',
            priority: 'Low'
          }
        ]
      },
      'tawasul-ai': {
        name: 'Tawasul AI',
        tagline: 'Arabic-English Communication Intelligence',
        description: 'AI-powered communication assistant specializing in Arabic-English translation with Gulf cultural context. Includes voice recognition, dialect detection, and business communication templates.',
        color: '#0d9488',
        categories: [
          {
            id: 'core-features',
            title: 'Core Features',
            description: 'Basic AI functionality and translation',
            features: ['Details coming soon...'],
            phase: 'Phase 1',
            priority: 'High'
          }
        ]
      },
      'zimam-delivery': {
        name: 'Zimam Delivery',
        tagline: 'Gulf-Focused Delivery Management System',
        description: 'Delivery and logistics platform optimized for Gulf market challenges: extreme heat, complex addressing, Ramadan schedules, and cash-on-delivery preferences.',
        color: '#7c3aed',
        categories: [
          {
            id: 'core-features',
            title: 'Core Features',
            description: 'Delivery and logistics features',
            features: ['Details coming soon...'],
            phase: 'Phase 1',
            priority: 'High'
          }
        ]
      },
      'al-multaqa': {
        name: 'Al-Multaqa Dashboard',
        tagline: 'Business Intelligence for Gulf Markets',
        description: 'Dashboard providing actionable insights for businesses operating in Gulf markets. Tracks market trends, consumer behavior, and regulatory changes specific to Saudi, UAE, Qatar, etc.',
        color: '#dc2626',
        categories: [
          {
            id: 'core-features',
            title: 'Core Features',
            description: 'Business intelligence and analytics',
            features: ['Details coming soon...'],
            phase: 'Phase 1',
            priority: 'High'
          }
        ]
      }
    };
    
    return projectsData[projectId];
  };

  const projectData = getProjectData();

  // Initialize data
  useEffect(() => {
    if (projectData && projectData.categories) {
      initializeProjectProgress(projectId, projectData.categories);
      
      // Load progress for each category
      const progressData = {};
      projectData.categories.forEach(category => {
        progressData[category.id] = getCategoryProgress(projectId, category.id);
      });
      setCategoryProgress(progressData);
      
      // Load documentation and AI prompts
      const docsData = {};
      const promptsData = {};
      projectData.categories.forEach(category => {
        docsData[category.id] = getDocumentation(projectId, category.id);
        promptsData[category.id] = getAiPrompts(projectId, category.id);
      });
      setDocumentation(docsData);
      setAiPrompts(promptsData);
    }
  }, [projectId, projectData]);

  if (!projectData) {
    return <div className="project-not-found">Project not found</div>;
  }

  const totalFeatures = projectData.categories.reduce((sum, cat) => sum + cat.features.length, 0);
  const avgProgress = Math.round(
    Object.values(categoryProgress).reduce((a, b) => a + b, 0) / 
    (projectData.categories.length || 1)
  );

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleProgressUpdate = (categoryId) => {
    const value = parseInt(progressValue);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      updateCategoryProgress(projectId, categoryId, value);
      setCategoryProgress(prev => ({
        ...prev,
        [categoryId]: value
      }));
      setShowProgressInput(null);
      setProgressValue('');
    }
  };

  const handleProgressClick = (categoryId, currentProgress) => {
    setShowProgressInput(categoryId);
    setProgressValue(currentProgress.toString());
  };

  const toggleFeatureCompletion = (categoryId, featureIndex) => {
    const key = `${categoryId}_${featureIndex}`;
    setCompletedFeatures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getAllNotes = () => {
    const allNotes = [];
    Object.keys(documentation).forEach(categoryId => {
      documentation[categoryId].forEach(note => {
        allNotes.push({
          ...note,
          categoryId
        });
      });
    });
    return allNotes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  // Get all AI prompts
  const getAllPrompts = () => {
    const allPrompts = [];
    Object.keys(aiPrompts).forEach(categoryId => {
      aiPrompts[categoryId].forEach(prompt => {
        allPrompts.push({
          ...prompt,
          categoryId
        });
      });
    });
    return allPrompts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  return (
    <div className="project-detail-page">
      <div className="project-header-detail" style={{ backgroundColor: projectData.color }}>
        <h1>{projectData.name}</h1>
        <p className="project-tagline-detail">{projectData.tagline}</p>
        <div className="project-overview-detail">
          <p>{projectData.description}</p>
          <div className="project-stats">
            <div className="project-stat">
              <span className="stat-number">{projectData.categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="project-stat">
              <span className="stat-number">{totalFeatures}</span>
              <span className="stat-label">Features</span>
            </div>
            <div className="project-stat">
              <span className="stat-number">{avgProgress}%</span>
              <span className="stat-label">Avg Progress</span>
            </div>
          </div>
        </div>
      </div>

      <div className="project-tabs">
        <button 
          className={`project-tab ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features & Progress
        </button>
        <button 
          className={`project-tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Documentation Notes
        </button>
        <button 
          className={`project-tab ${activeTab === 'prompts' ? 'active' : ''}`}
          onClick={() => setActiveTab('prompts')}
        >
          AI Prompts
        </button>
        <button 
          className={`project-tab ${activeTab === 'milestones' ? 'active' : ''}`}
          onClick={() => setActiveTab('milestones')}
        >
          Milestones
        </button>
      </div>

      {activeTab === 'features' && (
        <div className="feature-categories-detail">
          <h2>Feature Categories</h2>
          <p className="section-description">
            Track progress for each feature category. Click progress bars to update completion percentage.
          </p>
          
          {projectData.categories.map((category) => (
            <div key={category.id} className="category-card-detail">
              <div className="category-header-detail" onClick={() => toggleCategory(category.id)}>
                <div className="category-title-detail">
                  <h3>{category.title}</h3>
                  <div className="category-meta-detail">
                    <span className="phase-badge">{category.phase}</span>
                    <span className="priority-badge" style={{ 
                      backgroundColor: category.priority === 'High' ? '#ef4444' : 
                                     category.priority === 'Medium' ? '#f59e0b' : '#10b981' 
                    }}>
                      {category.priority}
                    </span>
                  </div>
                </div>
                <div className="category-progress-detail">
                  {showProgressInput === category.id ? (
                    <div className="progress-input-container" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={progressValue}
                        onChange={(e) => setProgressValue(e.target.value)}
                        className="progress-input"
                        placeholder="0-100"
                      />
                      <button 
                        className="progress-save-btn"
                        onClick={() => handleProgressUpdate(category.id)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="progress-clickable"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgressClick(category.id, categoryProgress[category.id] || 0);
                      }}
                    >
                      <div className="progress-bar small">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${categoryProgress[category.id] || 0}%`, 
                            backgroundColor: projectData.color 
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {categoryProgress[category.id] || 0}%
                      </span>
                    </div>
                  )}
                </div>
                <button className="category-toggle-detail">
                  {expandedCategory === category.id ? '−' : '+'}
                </button>
              </div>
              
              {expandedCategory === category.id && (
                <div className="category-content-detail">
                  <p className="category-description">{category.description}</p>
                  
                  <div className="features-list">
                    <h4>Features:</h4>
                    <ul>
                      {category.features.map((feature, index) => {
                        const featureKey = `${category.id}_${index}`;
                        const isCompleted = completedFeatures[featureKey];
                        return (
                          <li key={index} className="feature-item">
                            <input
                              type="checkbox"
                              checked={isCompleted || false}
                              onChange={() => toggleFeatureCompletion(category.id, index)}
                              className="feature-checkbox"
                            />
                            <span className={isCompleted ? 'feature-text completed' : 'feature-text'}>
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="notes-tab">
          <h2>Documentation Notes</h2>
          <p className="section-description">
            Your notes and documentation for this project.
          </p>
          {getAllNotes().length > 0 ? (
            <div className="notes-list">
              {getAllNotes().map((note) => (
                <div key={note.id} className="note-card">
                  <p>{note.content}</p>
                  <div className="note-meta">
                    <span className="note-date">
                      {new Date(note.timestamp).toLocaleDateString()}
                    </span>
                    <span className="note-category">
                      Category: {note.categoryId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No notes yet. Add some documentation!</p>
          )}
        </div>
      )}

      {activeTab === 'prompts' && (
        <div className="prompts-tab">
          <h2>AI Prompts</h2>
          <p className="section-description">
            Useful AI prompts and responses for this project.
          </p>
          {getAllPrompts().length > 0 ? (
            <div className="prompts-list">
              {getAllPrompts().map((prompt) => (
                <div key={prompt.id} className="prompt-card">
                  <div className="prompt-question">
                    <strong>Prompt:</strong>
                    <p>{prompt.prompt}</p>
                  </div>
                  {prompt.response && (
                    <div className="prompt-answer">
                      <strong>Response:</strong>
                      <p>{prompt.response}</p>
                    </div>
                  )}
                  <div className="prompt-meta">
                    <span className="prompt-date">
                      {new Date(prompt.timestamp).toLocaleDateString()}
                    </span>
                    <span className="prompt-category">
                      Category: {prompt.categoryId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No AI prompts saved yet.</p>
          )}
        </div>
      )}

      {activeTab === 'milestones' && (
        <div className="milestones-tab">
          <h2>Project Milestones</h2>
          <p className="section-description">
            Track major milestones and achievements for this project.
          </p>
          <p className="empty-state">Milestone tracking coming soon...</p>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
