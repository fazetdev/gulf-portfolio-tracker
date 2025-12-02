import React, { useState, useEffect } from 'react';
import './Projects.css';
import Modal from '../shared/Modal';
import {
  getCategoryProgress,
  updateCategoryProgress,
  initializeProjectProgress,
  getDocumentation,
  addDocumentation,
  getAiPrompts,
  addAiPrompt
} from '../../utils/localStorage';

function ProjectCard({ project, isExpanded, onToggle }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoryProgress, setCategoryProgress] = useState({});
  const [showProgressInput, setShowProgressInput] = useState(null);
  const [progressValue, setProgressValue] = useState('');
  const [documentation, setDocumentation] = useState({});
  const [aiPrompts, setAiPrompts] = useState({});
  
  // Modal states
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  // Form states
  const [noteContent, setNoteContent] = useState('');
  const [promptContent, setPromptContent] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDesc, setMilestoneDesc] = useState('');

  // Function to get project-specific data
  const getProjectDetails = (projectId) => {
    const projectsData = {
      'bayt-elite': {
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
        categories: [
          {
            id: 'core-features',
            title: 'Core AI Features',
            description: 'Basic AI functionality and translation',
            features: ['Details coming soon...'],
            phase: 'Phase 1',
            priority: 'High'
          }
        ]
      },
      'zimam-delivery': {
        categories: [
          {
            id: 'core-features',
            title: 'Delivery System Features',
            description: 'Core delivery and logistics features',
            features: ['Details coming soon...'],
            phase: 'Phase 1',
            priority: 'High'
          }
        ]
      },
      'al-multaqa': {
        categories: [
          {
            id: 'core-features',
            title: 'Dashboard Features',
            description: 'Business intelligence and analytics',
            features: ['Details coming soon...'],
            phase: 'Phase 1',
            priority: 'High'
          }
        ]
      }
    };
    
    return projectsData[projectId] || { categories: [] };
  };

  const projectDetails = getProjectDetails(project.id);
  const totalFeatures = projectDetails.categories.reduce((sum, cat) => sum + cat.features.length, 0);

  // Initialize localStorage data when component mounts
  useEffect(() => {
    if (isExpanded) {
      initializeProjectProgress(project.id, projectDetails.categories);
      
      // Load progress for each category
      const progressData = {};
      projectDetails.categories.forEach(category => {
        progressData[category.id] = getCategoryProgress(project.id, category.id);
      });
      setCategoryProgress(progressData);
      
      // Load documentation and AI prompts
      const docsData = {};
      const promptsData = {};
      projectDetails.categories.forEach(category => {
        docsData[category.id] = getDocumentation(project.id, category.id);
        promptsData[category.id] = getAiPrompts(project.id, category.id);
      });
      setDocumentation(docsData);
      setAiPrompts(promptsData);
    }
  }, [isExpanded, project.id, projectDetails.categories]);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleProgressUpdate = (categoryId) => {
    const value = parseInt(progressValue);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      updateCategoryProgress(project.id, categoryId, value);
      setCategoryProgress(prev => ({
        ...prev,
        [categoryId]: value
      }));
      setShowProgressInput(null);
      setProgressValue('');
      
      // Force project progress refresh
      setTimeout(() => {
        onToggle(project.id); // Close and reopen to refresh
        setTimeout(() => onToggle(project.id), 100);
      }, 300);
    }
  };

  const handleProgressClick = (categoryId, currentProgress) => {
    setShowProgressInput(categoryId);
    setProgressValue(currentProgress.toString());
  };

  const getDocumentationCount = (categoryId) => {
    return documentation[categoryId]?.length || 0;
  };

  const getAiPromptsCount = (categoryId) => {
    return aiPrompts[categoryId]?.length || 0;
  };

  // Feature completion toggles
  const [completedFeatures, setCompletedFeatures] = useState({});

  const toggleFeatureCompletion = (categoryId, featureIndex) => {
    const key = `${categoryId}_${featureIndex}`;
    setCompletedFeatures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Modal handlers
  const openNoteModal = (categoryId) => {
    setCurrentCategory(categoryId);
    setNoteContent('');
    setShowNoteModal(true);
  };

  const openPromptModal = (categoryId) => {
    setCurrentCategory(categoryId);
    setPromptContent('');
    setPromptResponse('');
    setShowPromptModal(true);
  };

  const openMilestoneModal = (categoryId) => {
    setCurrentCategory(categoryId);
    setMilestoneTitle('');
    setMilestoneDesc('');
    setShowMilestoneModal(true);
  };

  const handleSaveNote = () => {
    if (noteContent.trim() && currentCategory) {
      addDocumentation(project.id, currentCategory, noteContent);
      
      // Refresh documentation
      const updatedDocs = getDocumentation(project.id, currentCategory);
      setDocumentation(prev => ({
        ...prev,
        [currentCategory]: updatedDocs
      }));
      
      setShowNoteModal(false);
      setNoteContent('');
    }
  };

  const handleSavePrompt = () => {
    if (promptContent.trim() && currentCategory) {
      addAiPrompt(project.id, currentCategory, promptContent, promptResponse);
      
      // Refresh AI prompts
      const updatedPrompts = getAiPrompts(project.id, currentCategory);
      setAiPrompts(prev => ({
        ...prev,
        [currentCategory]: updatedPrompts
      }));
      
      setShowPromptModal(false);
      setPromptContent('');
      setPromptResponse('');
    }
  };

  const handleSaveMilestone = () => {
    if (milestoneTitle.trim() && currentCategory) {
      // Save milestone logic here
      console.log('Saving milestone:', { project: project.id, category: currentCategory, title: milestoneTitle, desc: milestoneDesc });
      setShowMilestoneModal(false);
      setMilestoneTitle('');
      setMilestoneDesc('');
    }
  };

  return (
    <>
      <div className={`project-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="project-summary" onClick={() => onToggle(project.id)}>
          <div className="project-header">
            <div className="project-title-section">
              <h3>{project.name}</h3>
              <span className="project-status" style={{ backgroundColor: project.color }}>
                {project.status}
              </span>
            </div>
            <div className="project-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                ></div>
              </div>
              <span className="progress-text">{project.progress}%</span>
            </div>
            <button className="toggle-btn">
              {isExpanded ? '−' : '+'}
            </button>
          </div>
          
          {!isExpanded && (
            <p className="project-description">{project.description}</p>
          )}
        </div>

        {isExpanded && (
          <div className="project-details">
            <div className="project-overview">
              <h4>Project Overview</h4>
              <p>{project.description}</p>
              <div className="project-meta">
                <span className="meta-item">
                  <strong>Target Market:</strong> {project.market}
                </span>
                <span className="meta-item">
                  <strong>Priority:</strong> {project.priority}
                </span>
                <span className="meta-item">
                  <strong>Total Features:</strong> {totalFeatures}
                </span>
                <span className="meta-item">
                  <strong>Categories:</strong> {projectDetails.categories.length}
                </span>
              </div>
            </div>

            <div className="feature-categories">
              <h4>Feature Categories</h4>
              <p className="category-instruction">
                Click on progress bars to update your completion percentage
              </p>
              {projectDetails.categories.map((category) => (
                <div key={category.id} className="category-card">
                  <div 
                    className="category-header"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="category-title">
                      <h5>{category.title}</h5>
                      <div className="category-meta">
                        <span className="phase-badge">{category.phase}</span>
                        <span className="priority-badge" style={{ 
                          backgroundColor: category.priority === 'High' ? '#ef4444' : 
                                         category.priority === 'Medium' ? '#f59e0b' : '#10b981' 
                        }}>
                          {category.priority}
                        </span>
                        <span className="feature-count">{category.features.length} features</span>
                      </div>
                      <p className="category-description">{category.description}</p>
                    </div>
                    <div className="category-progress">
                      {showProgressInput === category.id ? (
                        <div className="progress-input-container">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={progressValue}
                            onChange={(e) => setProgressValue(e.target.value)}
                            className="progress-input"
                            placeholder="0-100"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button 
                            className="progress-save-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProgressUpdate(category.id);
                            }}
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
                                backgroundColor: project.color 
                              }}
                            ></div>
                          </div>
                          <span className="progress-text">
                            {categoryProgress[category.id] || 0}%
                          </span>
                        </div>
                      )}
                    </div>
                    <button className="category-toggle">
                      {expandedCategory === category.id ? '−' : '+'}
                    </button>
                  </div>
                  
                  {expandedCategory === category.id && (
                    <div className="category-details">
                      <div className="category-features">
                        <h6>Features:</h6>
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
                      
                      <div className="category-stats">
                        <div className="stat-badge">
                          <span className="stat-label">Documentation:</span>
                          <span className="stat-value">{getDocumentationCount(category.id)} notes</span>
                        </div>
                        <div className="stat-badge">
                          <span className="stat-label">AI Prompts:</span>
                          <span className="stat-value">{getAiPromptsCount(category.id)} saved</span>
                        </div>
                        <div className="stat-badge">
                          <span className="stat-label">Features Done:</span>
                          <span className="stat-value">
                            {Object.keys(completedFeatures).filter(key => 
                              key.startsWith(`${category.id}_`)).length}/{category.features.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className="category-actions">
                        <button 
                          className="action-btn small"
                          onClick={() => openNoteModal(category.id)}
                        >
                          Add Note
                        </button>
                        <button 
                          className="action-btn small"
                          onClick={() => openPromptModal(category.id)}
                        >
                          Add AI Prompt
                        </button>
                        <button 
                          className="action-btn small"
                          onClick={() => openMilestoneModal(category.id)}
                        >
                          Add Milestone
                        </button>
                      </div>

                      {/* Show existing notes and prompts */}
                      {documentation[category.id]?.length > 0 && (
                        <div className="existing-notes">
                          <h6>Recent Notes:</h6>
                          <div className="notes-list">
                            {documentation[category.id].slice(-2).map((note, idx) => (
                              <div key={note.id} className="note-item">
                                <p>{note.content}</p>
                                <small>{new Date(note.timestamp).toLocaleDateString()}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="project-instructions">
              <h5>How to use this tracker:</h5>
              <ol>
                <li><strong>Update Progress:</strong> Click on any progress bar to update completion percentage</li>
                <li><strong>Check Features:</strong> Click checkboxes next to features as you complete them</li>
                <li><strong>Save Data:</strong> All progress is automatically saved to localStorage</li>
                <li><strong>Add Documentation:</strong> Use "Add Note" to document your learnings and decisions</li>
                <li><strong>Save AI Prompts:</strong> Use "Add AI Prompt" to save useful prompts and responses</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Note Modal */}
      <Modal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        title="Add Documentation Note"
      >
        <div className="form-group">
          <label>Note:</label>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Document your learnings, decisions, or research..."
            rows="4"
            className="form-textarea"
          />
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowNoteModal(false)}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSaveNote}>
            Save Note
          </button>
        </div>
      </Modal>

      {/* AI Prompt Modal */}
      <Modal
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        title="Save AI Prompt"
      >
        <div className="form-group">
          <label>Your Prompt:</label>
          <textarea
            value={promptContent}
            onChange={(e) => setPromptContent(e.target.value)}
            placeholder="Enter the prompt you used..."
            rows="3"
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>AI Response (Optional):</label>
          <textarea
            value={promptResponse}
            onChange={(e) => setPromptResponse(e.target.value)}
            placeholder="Enter the AI's response..."
            rows="4"
            className="form-textarea"
          />
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowPromptModal(false)}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSavePrompt}>
            Save Prompt
          </button>
        </div>
      </Modal>

      {/* Milestone Modal */}
      <Modal
        isOpen={showMilestoneModal}
        onClose={() => setShowMilestoneModal(false)}
        title="Add Milestone"
      >
        <div className="form-group">
          <label>Milestone Title:</label>
          <input
            type="text"
            value={milestoneTitle}
            onChange={(e) => setMilestoneTitle(e.target.value)}
            placeholder="e.g., 'Calculator MVP Complete'"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={milestoneDesc}
            onChange={(e) => setMilestoneDesc(e.target.value)}
            placeholder="Describe what was accomplished..."
            rows="3"
            className="form-textarea"
          />
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowMilestoneModal(false)}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSaveMilestone}>
            Save Milestone
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ProjectCard;
