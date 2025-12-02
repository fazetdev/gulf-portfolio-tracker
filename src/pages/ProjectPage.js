import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectDetail from '../components/projects/ProjectDetail';

function ProjectPage() {
  const { projectId } = useParams();
  
  return (
    <div className="project-page">
      <header className="project-page-header">
        <Link to="/" className="back-button">← Back to Projects</Link>
        <h1>Project Details</h1>
      </header>
      
      <main>
        <ProjectDetail projectId={projectId} />
      </main>
    </div>
  );
}

export default ProjectPage;
