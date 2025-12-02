import React, { useState } from 'react';
import './Prompts.css';

function PromptForm({ project, category, onSave }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      const newPrompt = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        prompt: prompt.trim(),
        response: response.trim(),
        project,
        category
      };
      onSave(newPrompt);
      setPrompt('');
      setResponse('');
    }
  };

  return (
    <form className="prompt-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>AI Prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="3"
          className="prompt-textarea"
          required
        />
      </div>
      
      <div className="form-group">
        <label>AI Response (Optional):</label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter the AI's response..."
          rows="4"
          className="response-textarea"
        />
      </div>
      
      <button type="submit" className="save-prompt-btn">
        Save Prompt
      </button>
    </form>
  );
}

export default PromptForm;
