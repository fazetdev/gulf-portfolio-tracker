import React, { useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';
import '../components/projects/Projects.css';

function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="projects-page">
      <div className="page-header">
        <h2>My Gulf Market Projects</h2>
        <p className="page-description">
          Four strategically designed projects targeting specific Gulf market opportunities.
          Each includes detailed feature breakdowns, milestones, and documentation.
        </p>
      </div>

      <div className="projects-container">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedProject === project.id}
            onToggle={toggleProject}
          />
        ))}
      </div>

      <div className="projects-stats">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h4>Strategic Focus</h4>
            <p>Each project targets a specific Gulf market gap</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h4>Market Validation</h4>
            <p>Features validated against Gulf cultural & business needs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <h4>Scalable Architecture</h4>
            <p>Modular design for phased implementation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
