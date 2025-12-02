import React from 'react';
import './Prompts.css';

function PromptItem({ prompt, onDelete }) {
  return (
    <div className="prompt-item">
      <div className="prompt-content">
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
          <span className="prompt-project">{prompt.project}</span>
          <span className="prompt-category">{prompt.category}</span>
        </div>
      </div>
      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(prompt.id)}>
          ×
        </button>
      )}
    </div>
  );
}

export default PromptItem;
