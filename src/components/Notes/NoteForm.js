import React, { useState } from 'react';
import './Notes.css';

function NoteForm({ project, category, onSave }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      const newNote = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        content: content.trim(),
        project,
        category
      };
      onSave(newNote);
      setContent('');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        rows="3"
        className="note-textarea"
      />
      <button type="submit" className="save-note-btn">
        Save Note
      </button>
    </form>
  );
}

export default NoteForm;
