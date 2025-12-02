import React from 'react';
import './HomePage.css';

function HomePage({ onSelectProject }) {
  const projects = [
    { id: 'bayt-elite', name: 'Bayt Elite', icon: '🏠', color: '#1e3a8a', description: 'Real Estate Sales Machine' },
    { id: 'tawasul-ai', name: 'Tawasul AI', icon: '🤖', color: '#0d9488', description: 'Arabic-English AI Assistant' },
    { id: 'zimam-delivery', name: 'Zimam Delivery', icon: '🚚', color: '#7c3aed', description: 'Gulf Delivery System' },
    { id: 'al-multaqa', name: 'Al-Multaqa', icon: '📊', color: '#dc2626', description: 'Business Intelligence Dashboard' }
  ];

  return (
    <div className="home-page">
      <header className="hero">
        <h1>🇸🇦 Gulf Market Portfolio</h1>
        <p className="tagline">Building 4 strategic projects for maximum Gulf market impact</p>
      </header>

      <div className="projects-grid">
        {projects.map(project => (
          <div 
            key={project.id}
            className="project-card"
            style={{ borderColor: project.color }}
            onClick={() => onSelectProject(project.id)}
          >
            <div className="project-icon" style={{ backgroundColor: project.color }}>
              {project.icon}
            </div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button className="view-btn">View Details →</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="instructions">
        <p>Click any project to view detailed tracking, documentation, and progress.</p>
      </footer>
    </div>
  );
}

export default HomePage;
